// ============================================================
//  PROXY CONFIGURATION - بروكسيات الأردن السريعة
// ============================================================
var PROXY_MATCH    = "PROXY 86.108.14.128:20001";      // بروكسي المباريات (أسرع خط)
var PROXY_MAIN     = "PROXY 86.108.95.108:80; PROXY 86.108.14.128:9030"; // بروكسي احتياطي
var PROXY_FALLBACK = "PROXY 86.108.14.128:9030";       // بروكسي ثالث للت redundance
var DIRECT         = "DIRECT";
var BLOCK          = "PROXY 0.0.0.0:0";

// ============================================================
//  PUBG DOMAINS - توسيع قائمة النطاقات
// ============================================================
var PUBG_DOMAINS = [
  "pubgmobile", "pubgm", "pubg", "tencent", "krafton", "igame", 
  "lightspeed", "levelinfinite", "timi", "proximabeta", "qcloud", 
  "tencentgames", "igamecj", "igamecdn", "cloudgame", "antiddos",
  "vmping", "gcloud", "mcloud", "tcloud", "gvacct", "gamedata",
  "appload", "gcloudsvc", "qos", "speedtest"
];

// ============================================================
//  JORDAN ISP RANGES - جميع مزودي الأردن
// ============================================================
function isJordanIPv4(ip) {
  if (!ip || ip.indexOf(":") !== -1) return false;
  return (
    // Orange Jordan (AS8376)
    isInNet(ip, "86.108.0.0",   "255.255.0.0")   ||
    isInNet(ip, "176.28.0.0",   "255.255.128.0") ||
    isInNet(ip, "176.29.0.0",   "255.255.0.0")   ||
    isInNet(ip, "188.247.0.0",  "255.255.0.0")   ||
    isInNet(ip, "178.20.184.0", "255.255.248.0") ||
    isInNet(ip, "185.80.140.0", "255.255.252.0") ||
    // Zain Jordan (AS48832)
    isInNet(ip, "31.186.0.0",   "255.255.0.0")   ||
    isInNet(ip, "213.186.160.0","255.255.224.0") ||
    isInNet(ip, "109.131.64.0", "255.255.192.0") ||
    isInNet(ip, "185.96.160.0", "255.255.252.0") ||
    // Umniah (AS9038)
    isInNet(ip, "37.140.0.0",   "255.255.0.0")   ||
    isInNet(ip, "82.212.0.0",   "255.255.0.0")   ||
    isInNet(ip, "212.118.0.0",  "255.255.224.0") ||
    isInNet(ip, "185.14.224.0", "255.255.252.0")
  );
}

function isJordanIPv6(ip) {
  if (!ip || ip.indexOf(":") === -1) return false;
  var lower = ip.toLowerCase();
  return (
    lower.indexOf("2a01:9700:") === 0 ||  // Orange
    lower.indexOf("2a00:1851:") === 0 ||  // Zain
    lower.indexOf("2a00:1850:") === 0 ||  // Umniah
    lower.indexOf("2a00:6d40:") === 0     // إضافي
  );
}

function isJordanAny(ip) {
  return isJordanIPv4(ip) || isJordanIPv6(ip);
}

// ============================================================
//  PUBG DETECTION - كشف محسن للعبة
// ============================================================
function isPUBG(host, url) {
  var s = (host + " " + url).toLowerCase();
  for (var i = 0; i < PUBG_DOMAINS.length; i++) {
    if (s.indexOf(PUBG_DOMAINS[i]) !== -1) return true;
  }
  // كشف IP addresses مباشرة (PUBG تستخدم IPs مباشرة أحياناً)
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(host)) {
    if (s.indexOf("8080") !== -1 || s.indexOf("17500") !== -1 || s.indexOf("7889") !== -1) return true;
  }
  return false;
}

// ============================================================
//  CONNECTION CLASSIFICATION - تصنيف الاتصالات
// ============================================================
function classifyConnection(host, url) {
  var s = (host + " " + url).toLowerCase();
  
  // المباريات واللعب الفعلي (أولوية قصوى)
  if (/(match|battle|game|ingame|gamesvr|relay|gsvr|tcp|udp|port|1863|17500|7889|10012|17000|20000|20001|30000| HTTPS\/1.1 tunnel)/i.test(s)) 
    return "MATCH";
  
  // ماتش ميكينج والمصنفات (أولوية عالية)
  if (/(matchmaking|ranked|classic|arena|tdm|payload|metro|royale|erangel|livik|miramar|sanhok|vikendi|karakin|nusa|rondo|fpp|tpp|squad|duo|solo|quickmatch)/i.test(s))
    return "RANKED";
  
  // الوبي والدخول (أولوية متوسطة)
  if (/(lobby|login|auth|gateway|session|region|srvgate)/i.test(s))
    return "LOBBY";
  
  // المحتوى والتحديثات (يمكن أن يكون مباشر)
  if (/(cdn|patch|update|download|resource|asset|client|config|version| announcement)/i.test(s))
    return "CDN";
    
  return "OTHER";
}

// ============================================================
//  MAIN FUNCTION - الدالة الرئيسية المحسنة
// ============================================================
function FindProxyForURL(url, host) {
  
  // 1. اتصالات محلية - مباشرة بدون تأخير
  if (isPlainHostName(host) || 
      shExpMatch(host, "localhost") ||
      shExpMatch(host, "*.local") ||
      isInNet(host, "127.0.0.0", "255.0.0.0") ||
      isInNet(host, "10.0.0.0", "255.0.0.0") ||
      isInNet(host, "172.16.0.0", "255.240.0.0") ||
      isInNet(host, "192.168.0.0", "255.255.0.0")) {
    return DIRECT;
  }

  // 2. التحقق السريع من PUBG (قبل DNS)
  if (!isPUBG(host, url)) return DIRECT;

  // 3. حل DNS مع تحسين الأداء
  var ip = "";
  try { 
    ip = dnsResolve(host); 
  } catch(e) {}
  
  // إذا كان المضيف IP بالفعل
  if (!ip && /^\d+\.\d+\.\d+\.\d+$/.test(host)) {
    ip = host;
  }

  // 4. التصنيف الذكي للاتصال
  var connType = classifyConnection(host, url);
  var isJordan = ip ? isJordanAny(ip) : false;

  // ============================================================
  //  STRATEGY: توجيه ذكي بناءً على الأولوية
  // ============================================================

  // أولوية 1: مباريات الأردنيين (أقل بنق + تجميع لاعبين)
  if ((connType === "MATCH" || connType === "RANKED") && isJordan) {
    // استخدام بروكسي المباريات + البروكسي الرئيسي كاحتياطي + مباشر
    return PROXY_MATCH + "; " + PROXY_MAIN + "; " + DIRECT;
  }

  // أولوية 2: مباريات عامة (بروكسي المباريات فقط)
  if (connType === "MATCH" || connType === "RANKED") {
    return PROXY_MATCH + "; " + DIRECT;
  }

  // أولوية 3: لوبي الأردنيين (تجميع اللاعبين)
  if (connType === "LOBBY" && isJordan) {
    // توجيه الوبي عبر البروكسي الرئيسي لضمان تجميع اللاعبين في نفس المنطقة
    return PROXY_MAIN + "; " + PROXY_FALLBACK + "; " + DIRECT;
  }

  // أولوية 4: CDN وتحديثات (مباشر للسرعة)
  if (connType === "CDN") {
    return DIRECT;
  }

  // أولوية 5: أي اتصال أردني آخر للعبة
  if (isJordan) {
    return PROXY_MAIN + "; " + DIRECT;
  }

  // افتراضي: السماح بالمرور المباشر للاتصالات الأخرى
  return DIRECT;
}
