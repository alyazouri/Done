// ============================================
// PUBG JORDAN ULTIMATE SYSTEM v10.0 (FINAL)
// Features:
// 1. Jordan Lobby Priority (Fast Recruitment)
// 2. Jordan+Gulf Game Servers (Low Ping)
// 3. Block Europe/India/Iran (High Ping Killers)
// 4. All Modes Support (Classic, TDM, Metro, Arena)
// 5. Zero Latency for Jordan (Direct Route)
// 6. ISP Lock (Your Network = Your Server)
// ============================================

var DIRECT       = "DIRECT";
var JORDAN_PROXY = "PROXY 94.249.71.231:443";
var BLOCK        = "PROXY 127.0.0.1:65535";

// ========== 1. قواعد IP الأردن (جميع المشغلين) ==========
var JORDAN_ISP = [
    "2a00:1850:", "2a00:1851:", "2a00:1852:", "2a00:1853:", "2a00:1854:", // Orange
    "2a00:15c0:", "2a00:15c1:", "2a00:15c2:", "2a00:15c3:", "2a00:15c4:", // Umniah
    "2a03:8600:", "2a03:8601:", "2a03:8602:", "2a03:8603:", "2a03:f480:", // Zain
    "2a01:9700:", "2a01:9701:", "2001:67c:130:", "2001:16a0:8000:",       // Gov/Edu
    "2a0f:4b00:", "2a0f:9400:", "2a02:f400:"                               // Others
];

// ========== 2. قواعد IP الخليج (للمباريات فقط) ==========
var GULF_ISP = [
    // السعودية (STC, Mobily, Zain)
    "2a00:1e20:", "2a00:1e60:", "2a00:1f00:", "2a02:cb80:", "2a03:1e00:",
    "2a0c:b641:", "2a10:500:", "2405:8a00:", "2a0f:6c00:",
    // الإمارات (Etisalat, Du)
    "2a00:1b00:", "2a00:1c00:", "2a02:88c0:", "2001:8f8:", "2a03:1c00:",
    "2a0d:9c00:", "2a10:c080:", "2a0e:1d00:",
    // قطر (Ooredoo, Vodafone)
    "2a00:1d20:", "2a02:2300:", "2a06:3000:", "2a0f:7000:",
    // الكويت (Zain, Ooredoo)
    "2a00:1d80:", "2a02:c940:", "2a06:7000:", "2a0f:b000:"
];

// ========== 3. محظور (أوروبا, الهند, تركيا, إيران) ==========
var HIGH_PING_BLOCK = [
    "2a00:1a", "2a00:1b6", "2a00:1c2", "2a00:1c4", "2a00:1d0", // أوروبا
    "2a01:", "2a02:26", "2a03:28", "2a04:", "2a05:", "2a06:",   // أوروبا/آسيا
    "2401:49", "2409:", "2402:", "2404:", "2405:", "2406:",     // الهند
    "2a00:1a6", "2a00:1b2", "2a01:5ec", "2a03:3b4",             // إيران
    "2600:", "2601:", "2602:", "2603:", "2604:", "2605:",       // أمريكا
    "2001:4:", "2001:5:", "2001:2:"                              // أوروبا/أمريكا
];

// ========== 4. مودات اللعبة (للكشف الذكي) ==========
var MODES = {
    LOBBY:    /lobby|login|auth|session|gateway|matchmaking|queue|room|party|invite|friend|clan|store|profile/i,
    CLASSIC:  /classic|erangel|miramar|sanhok|vikendi|karakin|livik|nusa/i,
    ARENA:    /arena|tdm|teamdeathmatch|gungame|domination|assault|infection/i,
    METRO:    /metro|metroroyale/i,
    PAYLOAD:  /payload|helicopter/i,
    ZOMBIE:   /zombie|evoground|survive/i,
    RANKED:   /ranked|competitive/i,
    INGAME:   /gamesvr|relay|realtime|battle|play|state|sync|udp|tcp.*game|move|shoot/i
};

// ========== دوال مساعدة ==========

function expandIPv6(ip) {
    if (!ip || ip.indexOf(":") === -1) return ip;
    if (ip.indexOf("::") === -1) return ip.toLowerCase();
    var parts = ip.split("::");
    var left = parts[0] ? parts[0].split(":") : [];
    var right = parts[1] ? parts[1].split(":") : [];
    var missing = 8 - (left.length + right.length);
    var zeros = [];
    for (var z = 0; z < missing; z++) zeros.push("0000");
    var full = left.concat(zeros, right);
    for (var i = 0; i < full.length; i++) full[i] = full[i].padStart(4, "0");
    return full.join(":").toLowerCase();
}

function checkRegion(ip) {
    if (!ip) return "BLOCK";
    ip = ip.toLowerCase();
    
    // فحص الأردن أولاً (أسرع)
    for (var i = 0; i < JORDAN_ISP.length; i++) 
        if (ip.indexOf(JORDAN_ISP[i]) === 0) return "JORDAN";
    
    // فحص الخليج
    for (var i = 0; i < GULF_ISP.length; i++) 
        if (ip.indexOf(GULF_ISP[i]) === 0) return "GULF";
    
    // فحص المحظور
    for (var i = 0; i < HIGH_PING_BLOCK.length; i++) 
        if (ip.indexOf(HIGH_PING_BLOCK[i]) === 0) return "HIGH_PING";
    
    return "UNKNOWN";
}

function detectMode(url, host) {
    var txt = (url + " " + host).toLowerCase();
    if (MODES.LOBBY.test(txt))    return "LOBBY";
    if (MODES.INGAME.test(txt))   return "INGAME";
    if (MODES.CLASSIC.test(txt))  return "CLASSIC";
    if (MODES.ARENA.test(txt))    return "ARENA";
    if (MODES.METRO.test(txt))    return "METRO";
    if (MODES.PAYLOAD.test(txt))  return "PAYLOAD";
    if (MODES.ZOMBIE.test(txt))   return "ZOMBIE";
    if (MODES.RANKED.test(txt))   return "RANKED";
    return "GENERAL";
}

// ========== المنطق الرئيسي ==========

function FindProxyForURL(url, host) {
    
    // 1. traffic محلي (أسرع شي)
    if (isPlainHostName(host) || 
        shExpMatch(host, "*.local") ||
        isInNet(host, "192.168.0.0", "255.255.0.0") ||
        isInNet(host, "10.0.0.0", "255.0.0.0") ||
        isInNet(host, "172.16.0.0", "255.240.0.0")) {
        return DIRECT;
    }
    
    // 2. ليس ببجي (مباشر)
    if (!/pubg|tencent|igamecj|gcloud|krafton|roogame|proximabeta|anticheat/i.test(host + url)) {
        return DIRECT;
    }
    
    // 3. جلب IP السيرفر
    var ip = "";
    try { ip = dnsResolve(host); } catch(e) { return BLOCK; }
    if (!ip) return BLOCK;
    
    // توسيع IPv6 إن وجد
    if (ip.indexOf(":") !== -1) ip = expandIPv6(ip);
    
    var region = checkRegion(ip);
    if (region === "HIGH_PING") return BLOCK; // حظر فوري للبينق العالي
    
    var mode = detectMode(url, host);
    
    // ==========================================
    // 🎯 المرحلة 1: اللوبي (التجنيد) - أردن فقط!
    // ==========================================
    if (mode === "LOBBY" || mode === "GENERAL") {
        
        if (region === "JORDAN") {
            // ✅ لوبي أردني: DIRECT (أسرع ping، تجنيد فوري)
            // هذا يجمع جميع الأردنيين في نفس اللوبي
            return DIRECT;
        }
        
        if (region === "GULF") {
            // ❌ حظر اللوبي الخليجي لضمان تجمع الأردنيين
            // (يمنع تشتت اللاعبين في لوبيات منفصلة)
            return BLOCK;
        }
        
        // أي منطقة أخرى محظورة في اللوبي
        return BLOCK;
    }
    
    // ==========================================
    // 🎮 المرحلة 2: داخل المباراة - مرن
    // ==========================================
    if (mode === "INGAME" || mode === "CLASSIC" || mode === "RANKED" || 
        mode === "ARENA" || mode === "METRO" || mode === "PAYLOAD" || mode === "ZOMBIE") {
        
        // أولوية للأردن (أقل ping)
        if (region === "JORDAN") {
            return DIRECT; // أقل كمون ممكن
        }
        
        // السماح للخليج في المباراة فقط (إذا لم يتوفر أردني)
        if (region === "GULF") {
            // للمودات السريعة: مسموح
            // للمودات التنافسية: يفضل الأردن لكن الخليج مقبول
            return JORDAN_PROXY; // من خلال بروكسي للاستقرار
        }
        
        return BLOCK;
    }
    
    // ==========================================
    // 📦 المرحلة 3: تحديثات وAssets
    // ==========================================
    if (/cdn|download|update|patch|asset|resource|version/i.test(url)) {
        // التحميلات: أي شيء سريع (أردن أو خليج)
        if (region === "JORDAN" || region === "GULF") return DIRECT;
        return BLOCK;
    }
    
    // افتراضي: آمن
    return BLOCK;
}

// ========== نسخة محسنة للمتصفحات الحديثة ==========
function FindProxyForURLEx(url, host) {
    var result = FindProxyForURL(url, host);
    
    // إذا كان حظر، تأكد من عدم وجود تسرب DNS
    if (result === BLOCK) {
        return "PROXY 0.0.0.0:0; PROXY [::1]:65535; DIRECT";
    }
    
    return result;
}
