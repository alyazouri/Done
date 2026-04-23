// ============================================================
//  PUBG MOBILE - JORDAN & MENA ULTIMATE PAC
//  الإصدار: 3.0 - Ultra Low Ping / High Network Impact
//  الهدف: تقليل البنق - تحسين الاتصال للأردن - استجابة فورية
// ============================================================

// --- إعدادات البروكسي (عدّلها حسب خوادمك الفعلية) ---
// PROXY_MATCH: أقرب/أسرع بروكسي لخوادم اللعب (Game Server) - يجب أن يكون منخفض البنق
// PROXY_MAIN:  البروكسي الأساسي للوبي والمصادقة والخدمات
// PROXY_CDN:   بروكسي التحميلات (يمكن تحمل تأخير بسيط في التحميل مقابل استقرار اللعب)
var PROXY_MATCH = "PROXY 86.108.14.128:20001; DIRECT";
var PROXY_MAIN  = "PROXY 86.108.95.108:80; PROXY 86.108.14.128:9030; DIRECT";
var PROXY_CDN   = "PROXY 86.108.95.108:80; DIRECT";
var DIRECT      = "DIRECT";

// ============================================================
//  A. الأنماط السريعة (بدون DNS = أداء أقصى)
// ============================================================

// أنماط خوادم المباريات (أعلى أولوية - أقل بنق)
var MATCH_PATTERNS = [
    "*gamesvr*", "*gsvr*", "*game*", "*relay*", "*match*",
    "*battle*", "*combat*", "*realtime*", "*sync*", "*node*",
    "*edge*", "*ingame*", "*play*", "*room*", "*dedicated*",
    "*hit*", "*shoot*", "*spawn*", "*vehicle*", "*zone*",
    "*bluezone*", "*redzone*", "*airdrop*", "*parachute*",
    "*land*", "*loot*", "*death*", "*kill*", "*spectate*",
    "*observer*", "*replay*", "*demo*", "*live*"
];

// أنماط اللوبي والمصادقة (أقل حساسية للبنق)
var LOBBY_PATTERNS = [
    "*lobby*", "*matchmaking*", "*queue*", "*login*", "*auth*",
    "*account*", "*user*", "*passport*", "*token*", "*session*",
    "*region*", "*gateway*", "*api*", "*rest*", "*config*",
    "*setting*", "*profile*", "*inventory*", "*store*", "*shop*",
    "*catalog*", "*item*", "*purchase*", "*payment*", "*recharge*",
    "*uc*", "*bp*", "*rp*", "*pass*", "*season*", "*rank*",
    "*tier*", "*badge*", "*mission*", "*event*", "*activity*",
    "*reward*", "*achievement*", "*clan*", "*guild*", "*crew*",
    "*team*", "*friend*", "*social*", "*chat*", "*message*",
    "*mail*", "*inbox*", "*notice*", "*notification*", "*voice*",
    "*announcement*", "*news*", "*help*", "*support*", "*cs*"
];

// أنماط التحميل والـ CDN
var CDN_PATTERNS = [
    "*cdn*", "*patch*", "*update*", "*download*", "*resource*",
    "*asset*", "*client*", "*version*", "*dl*", "*data*",
    "*static*", "*content*", "*file*", "*zip*", "*apk*", "*obb*"
];

// نطاقات PUBG / Tencent / Krafton المعروفة
var PUBG_DOMAINS = [
    "*pubgmobile*", "*pubgm*", "*pubg*", "*tencent*",
    "*krafton*", "*lightspeed*", "*levelinfinite*", "*timi*",
    "*proximabeta*", "*qcloud*", "*tencentgames*",
    "*igamecj*", "*igamecdn*", "*anticheatexpert*", "*ace*",
    "*gcloud*", "*ieg*", "*myapp*", "*qq*", "*wechat*",
    "*weixin*", "*akamaized*", "*cloudfront*", "*fastly*"
];

// ============================================================
//  B. نطاقات IP الأردنية (Orange/Zain/Umniah)
// ============================================================

function isJordanIPv4(ip) {
    if (!ip || ip.indexOf(":") !== -1) return false;
    return (
        isInNet(ip, "86.108.0.0",   "255.255.0.0")   || // Orange Jordan
        isInNet(ip, "176.28.0.0",   "255.255.128.0") || // Orange Jordan
        isInNet(ip, "176.29.0.0",   "255.255.0.0")   || // Orange Jordan
        isInNet(ip, "188.247.0.0",  "255.255.0.0")   || // Orange Jordan
        isInNet(ip, "178.20.184.0", "255.255.248.0") || // Orange Jordan
        isInNet(ip, "109.107.128.0","255.255.128.0") || // Zain Jordan
        isInNet(ip, "94.249.0.0",   "255.255.0.0")   || // Zain Jordan
        isInNet(ip, "212.118.0.0",  "255.255.0.0")   || // Umniah / Other
        isInNet(ip, "195.158.0.0",  "255.255.0.0")      // Other Jordan ranges
    );
}

function isJordanIPv6(ip) {
    if (!ip || ip.indexOf(":") === -1) return false;
    return (
        ip.indexOf("2a01:9700:1b05:") === 0 ||
        ip.indexOf("2a01:9700:17e")  === 0 ||
        ip.indexOf("2a01:9700:1c")   === 0 ||
        ip.indexOf("2a01:9700:")     === 0
    );
}

function isJordanIP(ip) {
    return isJordanIPv4(ip) || isJordanIPv6(ip);
}

// ============================================================
//  C. دوال مساعدة سريعة (محسّنة للـ PAC)
// ============================================================

function matchAny(host, url, patterns) {
    var str = host + url;
    for (var i = 0; i < patterns.length; i++) {
        if (shExpMatch(str, patterns[i])) return true;
    }
    return false;
}

function isPUBGDomain(host) {
    for (var i = 0; i < PUBG_DOMAINS.length; i++) {
        if (shExpMatch(host, PUBG_DOMAINS[i])) return true;
    }
    return false;
}

// ============================================================
//  D. الدالة الرئيسية - FindProxyForURL
// ============================================================

function FindProxyForURL(url, host) {
    var lowerHost = host.toLowerCase();
    var lowerURL  = url.toLowerCase();

    // --- 1. تخطي الشبكة المحلية فوراً (لا تأخير) ---
    if (isPlainHostName(host) ||
        shExpMatch(host, "*.local") ||
        shExpMatch(host, "*.localhost") ||
        isInNet(host, "10.0.0.0", "255.0.0.0") ||
        isInNet(host, "172.16.0.0", "255.240.0.0") ||
        isInNet(host, "192.168.0.0", "255.255.0.0") ||
        isInNet(host, "127.0.0.0", "255.255.255.0")) {
        return DIRECT;
    }

    // --- 2. فحص سريع: هل هذا تابع لـ PUBG Mobile؟ ---
    // إذا لم يكن من نطاقات اللعبة، اخرج مباشرة بدون أي تأخير
    if (!isPUBGDomain(lowerHost)) {
        var isPubgUrl = false;
        for (var k = 0; k < PUBG_DOMAINS.length; k++) {
            if (shExpMatch(lowerURL, PUBG_DOMAINS[k])) { isPubgUrl = true; break; }
        }
        if (!isPubgUrl) return DIRECT;
    }

    // --- 3. حل DNS فقط عند الضرورة (أقل استخدام = أسرع أداء) ---
    var ip = host;
    var looksLikeIP = /^(\d{1,3}\.){3}\d{1,3}$/.test(host) || /^([0-9a-fA-F:]+)$/.test(host);
    if (!looksLikeIP) {
        try { ip = dnsResolve(host); } catch(e) { ip = ""; }
    }
    var isJor = (ip && ip !== "") ? isJordanIP(ip) : false;

    // --- 4. أولوية قصوى: خوادم المباريات (Game / Match / Relay) ---
    // هذه الخطوة تضمن أقل بنق. يتم التوجيه فوراً لبروكسي المباريات.
    if (matchAny(lowerHost, lowerURL, MATCH_PATTERNS)) {
        // إذا كان IP أردني، نمرره عبر PROXY_MATCH مع DIRECT احتياطي
        return isJor ? PROXY_MATCH : PROXY_MATCH;
    }

    // --- 5. اللوبي والمصادقة (Lobby / Auth / Social) ---
    if (matchAny(lowerHost, lowerURL, LOBBY_PATTERNS)) {
        return isJor ? PROXY_MAIN : PROXY_MAIN;
    }

    // --- 6. التحميلات والـ CDN ---
    if (matchAny(lowerHost, lowerURL, CDN_PATTERNS)) {
        return PROXY_CDN;
    }

    // --- 7. أي اتصال آخر تابع لـ PUBG ---
    // تأثير شبكي قوي: جميع حركات PUBM تمر عبر البروكسي الرئيسي
    return isJor ? PROXY_MAIN : PROXY_MAIN;
}
