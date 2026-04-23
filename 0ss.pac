// ============================================================
//  PUBG MOBILE - ULTIMATE JORDAN COVERAGE PAC
//  الإصدار: 4.0 - Maximum Jordan Player Coverage
//  الأهداف:
//    1. تغطية 100% من نطاقات IP الأردنية المعروفة
//    2. دعم Orange / Zain / Umniah / STC / أفراد / شركات
//    3. تأثير شبكي قوي مع أقل بنق ممكن
//    4. تنفيذ فوري لأي طلب داخل اللعبة
// ============================================================

// --- إعدادات البروكسي (عدّل حسب خوادمك) ---
var PROXY_MATCH = "PROXY 86.108.14.128:20001";
var PROXY_MAIN  = "PROXY 86.108.95.108:9030; PROXY 37.220.117.38:20001; PROXY 62.72.177.101:9999; PROXY 80.90.167.48:20001; PROXY 46.32.102.48:9030";
var PROXY_CDN   = "PROXY 86.108.95.108:80; DIRECT";
var DIRECT      = "DIRECT";

// ============================================================
//  A. نطاقات PUBG / Tencent / Krafton / MENA
// ============================================================
var PUBG_DOMAINS = [
    "*pubgmobile*", "*pubgm*", "*pubg*", "*tencent*",
    "*krafton*", "*lightspeed*", "*levelinfinite*", "*timi*",
    "*proximabeta*", "*qcloud*", "*tencentgames*",
    "*igamecj*", "*igamecdn*", "*anticheatexpert*", "*ace*",
    "*gcloud*", "*ieg*", "*myapp*", "*qq*", "*wechat*", "*weixin*",
    "*akamaized*", "*cloudfront*", "*fastly*",
    // خوادم المنطقة (MENA / Middle East)
    "*me*", "*mena*", "*ae*", "*sa*", "*tr*", "*eu*",
    "*asia*", "*sea*", "*na*", "*kr*", "*jp*"
];

// ============================================================
//  B. نطاقات IP الأردنية الشاملة (AS8376, AS48832, AS35657, إلخ)
// ============================================================

// --- B1. Orange Jordan (AS8376) ---
var ORANGE_RANGES = [
    ["86.108.0.0",   "255.255.0.0"],   // 86.108.0.0/16
    ["176.28.0.0",   "255.255.128.0"], // 176.28.0.0/17
    ["176.29.0.0",   "255.255.0.0"],   // 176.29.0.0/16
    ["188.247.0.0",  "255.255.0.0"],   // 188.247.0.0/16
    ["178.20.184.0", "255.255.248.0"], // 178.20.184.0/21
    ["185.80.120.0", "255.255.252.0"], // 185.80.120.0/22
    ["185.109.184.0","255.255.252.0"], // 185.109.184.0/22
    ["185.144.96.0", "255.255.252.0"], // 185.144.96.0/22
    ["185.200.212.0","255.255.252.0"], // 185.200.212.0/22
    ["185.201.12.0", "255.255.252.0"], // 185.201.12.0/22
    ["185.228.240.0","255.255.252.0"], // 185.228.240.0/22
    ["185.230.192.0","255.255.252.0"], // 185.230.192.0/22
    ["185.244.128.0","255.255.252.0"], // 185.244.128.0/22
    ["194.165.128.0","255.255.224.0"], // 194.165.128.0/19
    ["195.123.192.0","255.255.224.0"], // 195.123.192.0/19
    ["212.118.0.0",  "255.255.0.0"],   // 212.118.0.0/16 (مشترك مع Umniah)
    ["217.23.0.0",   "255.255.240.0"]  // 217.23.0.0/20
];

// --- B2. Zain Jordan (AS48832 / AS9038) ---
var ZAIN_RANGES = [
    ["109.107.128.0","255.255.128.0"], // 109.107.128.0/18
    ["94.249.0.0",   "255.255.0.0"],   // 94.249.0.0/16
    ["91.186.224.0", "255.255.224.0"], // 91.186.224.0/19
    ["185.161.228.0","255.255.252.0"], // 185.161.228.0/22
    ["185.191.212.0","255.255.252.0"], // 185.191.212.0/22
    ["185.228.236.0","255.255.252.0"], // 185.228.236.0/22
    ["185.244.132.0","255.255.252.0"], // 185.244.132.0/22
    ["188.172.0.0",  "255.255.0.0"],   // 188.172.0.0/16
    ["193.188.64.0", "255.255.224.0"], // 193.188.64.0/19
    ["195.158.0.0",  "255.255.0.0"],   // 195.158.0.0/16
    ["212.35.0.0",   "255.255.224.0"], // 212.35.0.0/19
    ["217.144.0.0",  "255.255.240.0"]  // 217.144.0.0/20
];

// --- B3. Umniah / أخرى (AS35657 / AS47887 / Various) ---
var UMNIAH_RANGES = [
    ["188.161.0.0",  "255.255.0.0"],   // 188.161.0.0/16
    ["185.80.120.0", "255.255.252.0"], // مشترك
    ["185.109.184.0","255.255.252.0"], // مشترك
    ["185.200.212.0","255.255.252.0"], // مشترك
    ["185.228.240.0","255.255.252.0"], // مشترك
    ["185.230.192.0","255.255.252.0"], // مشترك
    ["185.244.128.0","255.255.252.0"], // مشترك
    ["194.165.128.0","255.255.224.0"], // مشترك
    ["212.118.0.0",  "255.255.0.0"],   // مشترك
    ["217.23.0.0",   "255.255.240.0"]  // مشترك
];

// --- B4. نطاقات IPv6 الأردنية (جميع المزودين) ---
var JORDAN_IPV6_PREFIXES = [
    "2a01:9700:1b05:",
    "2a01:9700:17e",
    "2a01:9700:1c",
    "2a01:9700:",      // تغطية عامة لجميع بادئات Orange IPv6
    "2a02:cb80:",      // Zain / أخرى
    "2a03:5a00:",      // Umniah / أخرى
    "2001:16a0:",      // أردنية
    "2a0e:1c80:"       // نطاقات جديدة
];

// ============================================================
//  C. الأنماط السريعة (بدون DNS = أقصى أداء)
// ============================================================

// خوادم المباريات (أعلى أولوية)
var MATCH_PATTERNS = [
    "*gamesvr*", "*gsvr*", "*game*", "*relay*", "*match*",
    "*battle*", "*combat*", "*realtime*", "*sync*", "*node*",
    "*edge*", "*ingame*", "*play*", "*room*", "*dedicated*",
    "*hit*", "*shoot*", "*spawn*", "*vehicle*", "*zone*",
    "*bluezone*", "*redzone*", "*airdrop*", "*parachute*",
    "*land*", "*loot*", "*death*", "*kill*", "*spectate*",
    "*observer*", "*replay*", "*demo*", "*live*",
    "*udp*", "*tcp*", "*gateway*", "*tunnel*"
];

// اللوبي والمصادقة
var LOBBY_PATTERNS = [
    "*lobby*", "*matchmaking*", "*queue*", "*login*", "*auth*",
    "*account*", "*user*", "*passport*", "*token*", "*session*",
    "*region*", "*api*", "*rest*", "*config*", "*setting*",
    "*profile*", "*inventory*", "*store*", "*shop*",
    "*catalog*", "*item*", "*purchase*", "*payment*", "*recharge*",
    "*uc*", "*bp*", "*rp*", "*pass*", "*season*", "*rank*",
    "*tier*", "*badge*", "*mission*", "*event*", "*activity*",
    "*reward*", "*achievement*", "*clan*", "*guild*", "*crew*",
    "*team*", "*friend*", "*social*", "*chat*", "*message*",
    "*mail*", "*inbox*", "*notice*", "*notification*", "*voice*",
    "*announcement*", "*news*", "*help*", "*support*", "*cs*"
];

// التحميلات والـ CDN
var CDN_PATTERNS = [
    "*cdn*", "*patch*", "*update*", "*download*", "*resource*",
    "*asset*", "*client*", "*version*", "*dl*", "*data*",
    "*static*", "*content*", "*file*", "*zip*", "*apk*", "*obb*"
];

// ============================================================
//  D. الدوال المساعدة (محسّنة وشاملة)
// ============================================================

function checkRanges(ip, ranges) {
    for (var i = 0; i < ranges.length; i++) {
        if (isInNet(ip, ranges[i][0], ranges[i][1])) return true;
    }
    return false;
}

function isJordanIPv4(ip) {
    if (!ip || ip.indexOf(":") !== -1) return false;
    return (
        checkRanges(ip, ORANGE_RANGES) ||
        checkRanges(ip, ZAIN_RANGES)   ||
        checkRanges(ip, UMNIAH_RANGES)
    );
}

function isJordanIPv6(ip) {
    if (!ip || ip.indexOf(":") === -1) return false;
    for (var i = 0; i < JORDAN_IPV6_PREFIXES.length; i++) {
        if (ip.indexOf(JORDAN_IPV6_PREFIXES[i]) === 0) return true;
    }
    return false;
}

function isJordanIP(ip) {
    return isJordanIPv4(ip) || isJordanIPv6(ip);
}

function matchAny(host, url, patterns) {
    var str = host + url;
    for (var i = 0; i < patterns.length; i++) {
        if (shExpMatch(str, patterns[i])) return true;
    }
    return false;
}

function isPUBGDomain(host) {
    var h = host.toLowerCase();
    for (var i = 0; i < PUBG_DOMAINS.length; i++) {
        if (shExpMatch(h, PUBG_DOMAINS[i])) return true;
    }
    return false;
}

// ============================================================
//  E. الدالة الرئيسية - FindProxyForURL
// ============================================================

function FindProxyForURL(url, host) {
    var lowerHost = host.toLowerCase();
    var lowerURL  = url.toLowerCase();

    // --- 1. تخطي الشبكة المحلية والحلقات المحلية فوراً ---
    if (isPlainHostName(host) ||
        shExpMatch(host, "*.local") ||
        shExpMatch(host, "*.localhost") ||
        isInNet(host, "10.0.0.0", "255.0.0.0") ||
        isInNet(host, "172.16.0.0", "255.240.0.0") ||
        isInNet(host, "192.168.0.0", "255.255.0.0") ||
        isInNet(host, "127.0.0.0", "255.255.255.0")) {
        return DIRECT;
    }

    // --- 2. هل هذا تابع لـ PUBG Mobile؟ ---
    var isPubg = isPUBGDomain(lowerHost);
    if (!isPubg) {
        for (var k = 0; k < PUBG_DOMAINS.length; k++) {
            if (shExpMatch(lowerURL, PUBG_DOMAINS[k])) { isPubg = true; break; }
        }
    }
    if (!isPubg) return DIRECT;

    // --- 3. حل DNS + تحديد إذا كان IP أردني ---
    var ip = host;
    var looksLikeIP = /^(\d{1,3}\.){3}\d{1,3}$/.test(host) || /:/.test(host);
    if (!looksLikeIP) {
        try { ip = dnsResolve(host); } catch(e) { ip = ""; }
    }
    var isJor = (ip && ip !== "") ? isJordanIP(ip) : false;

    // --- 4. أولوية قصوى: خوادم المباريات (أقل بنق) ---
    if (matchAny(lowerHost, lowerURL, MATCH_PATTERNS)) {
        return PROXY_MATCH;
    }

    // --- 5. اللوبي والمصادقة ---
    if (matchAny(lowerHost, lowerURL, LOBBY_PATTERNS)) {
        return PROXY_MAIN;
    }

    // --- 6. التحميلات ---
    if (matchAny(lowerHost, lowerURL, CDN_PATTERNS)) {
        return PROXY_CDN;
    }

    // --- 7. تغطية شاملة لأي IP أردني ---
    // إذا تم حل DNS وكان IP أردني، نمرر عبر البروكسي الرئيسي
    if (isJor) return PROXY_MAIN;

    // --- 8. fallback ذكي: إذا لم يُحل DNS أو كان غير معروف ---
    // لكنه نطاق PUBG، نمرره عبر البروكسي الرئيسي لتأثير شبكي قوي
    return PROXY_MAIN;
}
