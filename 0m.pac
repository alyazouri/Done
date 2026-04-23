// =================== إعدادات البروكسي =====================
// سلسلة تحوّل تلقائي: إذا فشل الأول → الثاني → الثالث فوراً
var PM = "PROXY 86.108.14.128:20001";   // بروكسي المباريات المخصص
var P1 = "PROXY 86.108.95.108:80";      // بروكسي أساسي 1
var P2 = "PROXY 86.108.14.128:9030";    // بروكسي أساسي 2

var PROXY_MATCH = PM + "; " + P1 + "; " + P2;   // مباريات → أسرع بروكسي أولاً
var PROXY_MAIN  = P1 + "; " + P2 + "; " + PM;   // لوبي → حمولة متوازنة
var DIRECT      = "DIRECT";
var BLOCK       = "PROXY 0.0.0.0:0";

// =================== ذاكرة تخزين DNS =====================
// يحفظ نتائج حل أسماء المضيفين لتخطي عمليات DNS المتكررة
// التأثير: تسريع كبير في الاستجابة — لا إعادة حل لنفس المضيف
var _dnsCache = {};

function resolveFast(host) {
  if (_dnsCache[host]) return _dnsCache[host];
  var result = "";
  try { result = dnsResolve(host); } catch(e) {}
  if (result) _dnsCache[host] = result;
  return result;
}

// =================== حالة الجلسة =========================
// قفل على خادم المباريات: يمنع تبديل البروكسي أثناء اللعب الفعلي
// هذا يقلل الـ Ping Spikes ويمنع الانقطاع المفاجئ
var SESSION = {
  matchIP4: null,       // عنوان IPv4 المحدد للمباراة
  matchIP6: null,       // شبكة /48 IPv6 المحددة للمباراة
  matchHost: null,      // اسم المضيف المحدد
  lobbyNet6: null       // شبكة اللوبي IPv6
};

var _reqCount = 0;

// =================== نطاقات IP أردنية ====================
// تغطية شاملة لجميع مزودي الخدمة في الأردن

// ── Orange Jordan (AS8376) ── 7 نطاقات ──
function _isOrange4(ip) {
  return (
    isInNet(ip, "86.108.0.0",   "255.255.0.0")    ||   // 86.108.0.0/16
    isInNet(ip, "176.28.0.0",   "255.255.128.0")  ||   // 176.28.0.0/17
    isInNet(ip, "176.29.0.0",   "255.255.0.0")    ||   // 176.29.0.0/16
    isInNet(ip, "188.247.0.0",  "255.255.0.0")    ||   // 188.247.0.0/16
    isInNet(ip, "178.20.184.0", "255.255.248.0")  ||   // 178.20.184.0/21
    isInNet(ip, "213.139.0.0",  "255.255.0.0")    ||   // 213.139.0.0/16
    isInNet(ip, "82.212.0.0",   "255.255.0.0")         // 82.212.0.0/16
  );
}

// ── Zain Jordan (AS48832) ── 4 نطاقات ──
function _isZain4(ip) {
  return (
    isInNet(ip, "37.32.0.0",   "255.254.0.0")    ||   // 37.32.0.0/15
    isInNet(ip, "37.140.0.0",  "255.255.0.0")    ||   // 37.140.0.0/16
    isInNet(ip, "46.32.0.0",   "255.255.0.0")    ||   // 46.32.0.0/16
    isInNet(ip, "188.123.0.0", "255.255.192.0")        // 188.123.0.0/18
  );
}

// ── Umniah (AS47887) ── 2 نطاق ──
function _isUmniah4(ip) {
  return (
    isInNet(ip, "91.106.0.0",  "255.255.0.0")    ||   // 91.106.0.0/16
    isInNet(ip, "185.27.0.0",  "255.255.252.0")        // 185.27.0.0/22
  );
}

function isJordanIPv4(ip) {
  if (!ip || ip.indexOf(":") !== -1) return false;
  return _isOrange4(ip) || _isZain4(ip) || _isUmniah4(ip);
}

// ── أردن IPv6 — تغطية واسعة ──
function isJordanIPv6(ip) {
  if (!ip || ip.indexOf(":") === -1) return false;
  return (
    ip.indexOf("2a01:9700:") === 0 ||     // Orange Jordan
    ip.indexOf("2a02:5500:") === 0 ||     // Zain Jordan
    ip.indexOf("2a00:c920:") === 0 ||     // أردن عام
    ip.indexOf("2a02:2770:") === 0 ||     // مزودون آخرون
    ip.indexOf("2a10:9700:") === 0        // Orange JO جديد
  );
}

function isJordan(ip) {
  return isJordanIPv4(ip) || isJordanIPv6(ip);
}

// =================== كشف نطاقات PUBG ====================
// قائمة شاملة لجميع خدمات PUBG / Tencent / Krafton
var PUBG_LIST = [
  "pubgmobile",  "pubgm",        "pubg",          "tencent",
  "krafton",     "lightspeed",   "levelinfinite",  "timi",
  "proximabeta", "qcloud",       "tencentgames",   "igamecj",
  "igamecdn",    "tencentyun",   "gcloud",         "gcloudstatic",
  "myapp",       "qpic",         "gtimg",          "gamecdn",
  "pvp",         "matchmaking",  "gameserver",     "battleground",
  "snssdk",      "byteimg",      "bytedance",      "ttdownloader"
];

function isPUBG(host, url) {
  var s = (host + "|" + url).toLowerCase();
  for (var i = 0, len = PUBG_LIST.length; i < len; i++) {
    if (s.indexOf(PUBG_LIST[i]) !== -1) return true;
  }
  return false;
}

// =================== كشف خوادم المباريات ================

// ── Match IPv6 — 6 نطاقات /48 ──
function isMatchNet6(ip) {
  if (!ip || ip.indexOf(":") === -1) return false;
  return (
    ip.indexOf("2a01:9700:42") === 0 ||
    ip.indexOf("2a01:9700:43") === 0 ||
    ip.indexOf("2a01:9700:44") === 0 ||
    ip.indexOf("2a01:9700:45") === 0 ||
    ip.indexOf("2a01:9700:46") === 0 ||
    ip.indexOf("2a01:9700:47") === 0
  );
}

// ── Match IPv4 — نطاقات أردنية معروفة ──
function isMatchNet4(ip) {
  if (!ip || ip.indexOf(":") !== -1) return false;
  return (
    isInNet(ip, "86.108.0.0",   "255.255.0.0")    ||
    isInNet(ip, "176.28.0.0",   "255.255.128.0")  ||
    isInNet(ip, "176.29.0.0",   "255.255.0.0")    ||
    isInNet(ip, "188.247.0.0",  "255.255.0.0")    ||
    isInNet(ip, "82.212.0.0",   "255.255.0.0")    ||
    isInNet(ip, "213.139.0.0",  "255.255.0.0")
  );
}

// =================== كشف خوادم اللوبي ==================

function isLobbyNet6(ip) {
  if (!ip || ip.indexOf(":") === -1) return false;
  return ip.indexOf("2a01:9700:") === 0;
}

function isLobbyNet4(ip) {
  if (!ip || ip.indexOf(":") !== -1) return false;
  return isJordanIPv4(ip);
}

// =================== أنماط URL ==========================

// ── حرج: المباريات واللعب الفعلي (كل أوضاع اللعب) ──
var CRITICAL = /match|battle|classic|ranked|arena|tdm|payload|metro|royale|erangel|livik|miramar|sanhok|vikendi|karakin|nusa|rondo|fpp|tpp|squad|duo|solo|quickmatch|ingame|gamesvr|relay|deathmatch|war|infection|domination|zombie|wow|worldofwonder|aftermath|evo|evoground|coldfront|library|hangar|training|practice|cheer|park|arcade|special|event|mode|tdm|payload|br|royalepass|rp/i;

// ── لوبي: القوائم والمتجر والتحديثات والملف الشخصي ──
var LOBBY = /lobby|matchmaking|queue|login|auth|region|gateway|session|profile|inventory|store|catalog|patch|update|cdn|config|social|friend|clan|guild|reward|mission|pass|season|rank|tier|badge|crate|spin|luck|draw|shop|redeem|gift|notification|chat|voice|avatar|title|frame|emote|spray|skin|outfit|vehicle|weapon/i;

// =================== الدالة الرئيسية ====================
function FindProxyForURL(url, host) {

  // ── إعادة ضبط تلقائية للجلسة (كل 600 طلب) ──
  // تمنع الجمود وتضمن تحديث بيانات الخوادم
  _reqCount++;
  if (_reqCount > 600) {
    SESSION.matchIP4  = null;
    SESSION.matchIP6  = null;
    SESSION.matchHost = null;
    SESSION.lobbyNet6 = null;
    _reqCount = 0;
    _dnsCache = {};
  }

  // ── تخطي العناوين البسيطة (بدن نقطة) ──
  if (isPlainHostName(host)) return DIRECT;

  // ── تخطي أي شيء ليس PUBG ──
  if (!isPUBG(host, url)) return DIRECT;

  // ── حل DNS مع التخزين المؤقت (أسرع بكثير) ──
  var ip   = resolveFast(host);
  var data = (host + url).toLowerCase();
  var isCritical  = CRITICAL.test(data);
  var isLobbyReq  = LOBBY.test(data);

  // ══════════════════════════════════════════════════════
  //  MATCH — المباريات واللعب الفعلي
  //  → بروكسي مخصص فائق السرعة + قفل الجلسة
  //  → أي طلب مباريات يذهب للبروكسي المخصص دائماً
  // ══════════════════════════════════════════════════════
  if (isCritical) {
    if (ip) {
      var isIPv6 = (ip.indexOf(":") !== -1);

      // ── خادم مباريات IPv6 معروف → قفل ──
      if (isIPv6 && isMatchNet6(ip)) {
        var net48 = ip.split(":").slice(0, 4).join(":");
        if (!SESSION.matchIP6) {
          SESSION.matchIP6 = net48;
          SESSION.matchHost = host;
        }
        return PROXY_MATCH;
      }

      // ── خادم مباريات IPv4 معروف → قفل ──
      if (!isIPv6 && isMatchNet4(ip)) {
        if (!SESSION.matchIP4) {
          SESSION.matchIP4 = ip;
          SESSION.matchHost = host;
        }
        return PROXY_MATCH;
      }
    }
    // ── طلب مباراة (حتى بدون DNS) → وجّه دائماً ──
    return PROXY_MATCH;
  }

  // ══════════════════════════════════════════════════════
  //  LOBBY — القوائم والمتجر والتحديثات
  //  → بروكسي أساسي (حمولة متوازنة بين البروكسيين)
  // ══════════════════════════════════════════════════════
  if (isLobbyReq) {
    if (ip) {
      var isIPv6 = (ip.indexOf(":") !== -1);

      if (isIPv6 && isLobbyNet6(ip)) {
        var net48 = ip.split(":").slice(0, 3).join(":");
        if (!SESSION.lobbyNet6 || SESSION.lobbyNet6 !== net48) {
          SESSION.lobbyNet6 = net48;
        }
        return PROXY_MAIN;
      }

      if (!isIPv6 && isLobbyNet4(ip)) {
        return PROXY_MAIN;
      }
    }
    // ── طلب لوبي (حتى بدون DNS) → وجّه دائماً ──
    return PROXY_MAIN;
  }

  // ══════════════════════════════════════════════════════
  //  أي طلب PUBG آخر — تأثير شبكي شامل ومحكم
  //  → لا طلب PUBG يمر بدون بروكسي أبداً
  //  → هذا يضمن أن IP أردني يظهر دائماً للسيرفر
  // ══════════════════════════════════════════════════════
  return PROXY_MAIN;
}
