// ═══════════════════════════════════════════════════════════════════════
//  PUBG JORDAN OMEGA v28.0 — MULTI-COUNTRY PAC
//  iPad Pro / iOS PAC Only
//  الهدف: الأردن + دول جارة (MENA Cluster) لمطابقة أسرع
// ═══════════════════════════════════════════════════════════════════════

var CFG = {
    // true = منع DIRECT لأي حركة PUBG (حماية الـ leak)
    NO_DIRECT_FOR_PUBG: true,

    // ★ التغيير الكبير ★
    // "JO_ONLY" = فقط أردن
    // "MENA_CLUSTER" = أردن + جيران (KSA, UAE, IQ, LB, SY, EG, BH, KW, QA, OM)
    // "ANY_SAFE" = أي بروكسي حتى لو خارج منطقة
    PROXY_EXIT_MODE: "MENA_CLUSTER",

    // Hard lock على وجهة أردني فقط
    HARD_LOCK_JORDAN_DESTINATION: false,

    // CDN = DIRECT أو عبر proxy
    ALLOW_CDN_DIRECT: false,

    FAIL_CLOSED: true,
    MAX_PROXY_FALLBACKS: 5,
    DNS_CACHE_TTL: 12000,
    DNS_CACHE_MAX: 120,
    STICKY_TTL: 180000,
    LIGHT_MODE: true,

    // ★ تفضيل الدول حسب الأولوية للمطابقة ★
    COUNTRY_WEIGHT: {
        "JO": 100,   // أردن = الأول
        "SA": 90,    // السعودية (أكبر pool في MENA)
        "AE": 88,    // الإمارات
        "EG": 80,    // مصر (pool كبير)
        "IQ": 75,    // العراق
        "LB": 72,    // لبنان
        "SY": 70,    // سوريا
        "KW": 68,    // الكويت
        "BH": 65,    // البحرين
        "QA": 63,    // قطر
        "OM": 60,    // عُمان
        "YE": 40,    // اليمن (fallback)
        "OTHER": 10  // أي دولة أخرى
    }
};


// ═══════════════════════════════════════════════════════════════════════
//  🌍 MULTI-COUNTRY PROXY POOL
// ═══════════════════════════════════════════════════════════════════════

var PROXY_POOL = {

    // 🇯🇴 JORDAN — Tier 1 (الأولوية القصوى)
    ORANGE_JO_A: { ip: "149.200.253.140", port: 20001, cc: "JO", carrier: "ORANGE", rank: 1 },
    ORANGE_JO_B: { ip: "185.80.25.22",    port: 443,   cc: "JO", carrier: "ORANGE", rank: 2 },
    ZAIN_JO_A:   { ip: "37.75.144.78",    port: 80,    cc: "JO", carrier: "ZAIN",   rank: 1 },
    ZAIN_JO_B:   { ip: "37.75.144.174",   port: 80,    cc: "JO", carrier: "ZAIN",   rank: 2 },
    UMNIAH_JO_A: { ip: "86.108.95.108",   port: 80,    cc: "JO", carrier: "UMNIAH", rank: 1 },
    ST_JO_A:     { ip: "37.75.144.212",   port: 80,    cc: "JO", carrier: "ST",     rank: 3 },

    // 🇸🇦 SAUDI ARABIA — Tier 2 (أكبر pool في MENA)
    STC_SA_A:    { ip: "196.3.96.23",     port: 8080,  cc: "SA", carrier: "STC",    rank: 1 },
    STC_SA_B:    { ip: "196.3.96.45",     port: 8080,  cc: "SA", carrier: "STC",    rank: 2 },
    ZAIN_SA_A:   { ip: "178.208.135.10",  port: 80,    cc: "SA", carrier: "ZAIN",   rank: 2 },
    MOBILY_SA_A: { ip: "176.29.0.100",    port: 80,    cc: "SA", carrier: "MOBILY", rank: 3 },

    // 🇦🇪 UAE — Tier 2
    DU_AE_A:     { ip: "94.200.192.50",   port: 80,    cc: "AE", carrier: "DU",     rank: 1 },
    ETISALAT_AE_A:{ ip: "86.96.252.10",   port: 8080,  cc: "AE", carrier: "ETISALAT",rank: 1 },
    ETISALAT_AE_B:{ ip: "86.105.128.20",  port: 80,    cc: "AE", carrier: "ETISALAT",rank: 2 },

    // 🇪🇬 EGYPT — Tier 3 (pool كبير جداً)
    WE_EG_A:     { ip: "156.200.48.15",   port: 80,    cc: "EG", carrier: "WE",     rank: 1 },
    ORANGE_EG_A: { ip: "154.182.48.30",   port: 8080,  cc: "EG", carrier: "ORANGE", rank: 2 },
    VODAFONE_EG_A:{ ip: "154.54.128.10",  port: 80,    cc: "EG", carrier: "VODAFONE",rank: 2 },

    // 🇮🇶 IRAQ — Tier 3
    ASIACELL_IQ_A:{ ip: "37.238.160.10",  port: 80,    cc: "IQ", carrier: "ASIACELL",rank: 1 },
    ZAIN_IQ_A:   { ip: "188.98.128.20",   port: 8080,  cc: "IQ", carrier: "ZAIN",   rank: 2 },

    // 🇱🇧 LEBANON — Tier 3
    OGERO_LB_A:  { ip: "62.210.128.15",   port: 80,    cc: "LB", carrier: "OGERO",  rank: 1 },
    ALFA_LB_A:   { ip: "194.55.16.20",    port: 8080,  cc: "LB", carrier: "ALFA",   rank: 2 },

    // 🇰🇼 KUWAIT
    ZAIN_KW_A:   { ip: "194.126.32.10",   port: 80,    cc: "KW", carrier: "ZAIN",   rank: 1 },
    OOREDOO_KW_A:{ ip: "194.158.64.20",   port: 8080,  cc: "KW", carrier: "OOREDOO",rank: 2 },

    // 🇶🇦 QATAR
    OOREDOO_QA_A:{ ip: "194.170.16.10",   port: 80,    cc: "QA", carrier: "OOREDOO",rank: 1 },

    // 🇧🇭 BAHRAIN
    BATELCO_BH_A:{ ip: "194.170.128.15",  port: 80,    cc: "BH", carrier: "BATELCO",rank: 1 },

    // 🇴🇲 OMAN
    OOREDOO_OM_A:{ ip: "194.158.128.10",  port: 80,    cc: "OM", carrier: "OOREDOO",rank: 1 }
};


var BLOOD = {
    DIR: "DIRECT",
    BLK: "PROXY 0.0.0.0:80"
};


// ═══════════════════════════════════════════════════════════════════════
//  🌐 MENA IP DATABASE (الأردن + الجيران)
// ═══════════════════════════════════════════════════════════════════════

var MENA_NETS = {

    // 🇯🇴 Jordan
    JO: [
        ["46.185.128.0",   "20"],
        ["46.185.144.0",   "21"],
        ["79.173.192.0",   "18"],
        ["79.173.240.0",   "21"],
        ["82.212.0.0",     "16"],
        ["82.212.64.0",    "19"],
        ["176.28.0.0",     "17"],
        ["176.29.0.0",     "16"],
        ["188.247.0.0",    "16"],
        ["62.72.160.0",    "19"],
        ["94.127.208.0",   "21"],
        ["94.230.0.0",     "16"],
        ["91.106.0.0",     "16"],
        ["37.220.0.0",     "16"],
        ["176.203.0.0",    "16"],
        ["109.237.192.0",  "20"],
        ["178.20.184.0",   "21"],
        ["37.75.144.0",    "24"],
        ["149.200.253.0",  "24"]
    ],

    // 🇸🇦 Saudi Arabia
    SA: [
        ["196.3.96.0",     "19"],
        ["178.208.0.0",    "16"],
        ["176.28.0.0",     "17"],
        ["176.29.0.0",     "16"],
        ["41.237.0.0",     "16"],
        ["46.21.0.0",      "16"],
        ["83.11.0.0",      "16"],
        ["154.54.0.0",     "16"],
        ["197.162.0.0",    "16"]
    ],

    // 🇦🇪 UAE
    AE: [
        ["86.96.0.0",      "15"],
        ["94.200.192.0",   "18"],
        ["194.165.0.0",    "16"],
        ["178.218.0.0",    "16"],
        ["89.184.0.0",     "16"],
        ["158.169.0.0",    "16"]
    ],

    // 🇪🇬 Egypt
    EG: [
        ["154.182.0.0",    "16"],
        ["154.54.0.0",     "16"],
        ["156.200.0.0",    "16"],
        ["196.205.0.0",    "16"],
        ["41.208.0.0",     "16"],
        ["105.36.0.0",     "14"],
        ["102.0.0.0",      "11"]
    ],

    // 🇮🇶 Iraq
    IQ: [
        ["37.238.160.0",   "19"],
        ["188.98.128.0",   "17"],
        ["193.194.0.0",    "16"],
        ["46.62.0.0",      "16"]
    ],

    // 🇱🇧 Lebanon
    LB: [
        ["62.210.128.0",   "17"],
        ["194.55.0.0",     "16"],
        ["193.188.0.0",    "16"],
        ["188.96.0.0",     "16"]
    ],

    // 🇰🇼 Kuwait
    KW: [
        ["194.126.0.0",    "16"],
        ["194.158.0.0",    "16"],
        ["41.178.0.0",     "16"]
    ],

    // 🇶🇦 Qatar
    QA: [
        ["194.170.0.0",    "16"],
        ["41.174.0.0",     "16"]
    ],

    // 🇧🇭 Bahrain
    BH: [
        ["194.170.128.0",  "17"],
        ["41.178.64.0",    "18"]
    ],

    // 🇴🇲 Oman
    OM: [
        ["194.158.128.0",  "17"],
        ["41.237.128.0",   "17"]
    ]
};


// ═══════════════════════════════════════════════════════════════════════
//  CLOUD / FOREIGN (للعقوبة فقط، لا حظر)
// ═══════════════════════════════════════════════════════════════════════

var CLOUD_FOREIGN_NETS = [
    ["104.16.0.0",    "12"], ["172.64.0.0",    "13"],
    ["188.114.96.0",  "20"], ["162.158.0.0",   "15"],
    ["198.41.128.0",  "17"], ["141.101.64.0",  "18"],
    ["108.162.192.0", "18"], ["173.245.48.0",  "20"],
    ["13.224.0.0",    "14"], ["99.84.0.0",     "16"],
    ["3.0.0.0",       "8"],  ["52.84.0.0",     "15"],
    ["54.192.0.0",    "16"], ["151.101.0.0",   "16"],
    ["199.232.0.0",   "16"]
];


// ═══════════════════════════════════════════════════════════════════════
//  PUBG + MODES (نفس القائمة من v27)
// ═══════════════════════════════════════════════════════════════════════

var PUBG_KEYS = [
    "pubgmobile","pubgm","pubg","tencent","lightspeed",
    "levelinfinite","igamecj","myapp","qq","igame",
    "gcloud","tmgp","bsgame","minisite","battlegrounds",
    "pubgstudio","proximabeta","garena_pubg"
];

var DIRECT_KEYS = [
    "apple","icloud","google","gstatic","googleapis",
    "youtube","facebook","instagram","whatsapp","telegram",
    "twitter","x.com","tiktok","netflix","spotify",
    "discord","github","microsoft","windows","android"
];

// ★ MODES نفسها بالضبط كما في v27 ★
var MODES = { /* ... نفس الكائن الكامل من v27 ... */ };
var MODE_ORDER = [
    "LOBBY","AUTH","RANKED","TDM","SYNC","IGNITION","CLAN",
    "METRO","CLASSIC","PAYLOAD","EVOGROUND","ARCADE",
    "CDN_PATCH","TRAINING"
];


// ═══════════════════════════════════════════════════════════════════════
//  ★ MULTI-COUNTRY DOMESTIC GUARD ★
// ═══════════════════════════════════════════════════════════════════════

var DOMESTIC_GUARD = {

    // تحقق إذا IP من أي دولة في MENA
    isMENA: function(ip) {
        if (!ip || !isIPv4(ip)) return { ok: false, cc: null, score: 0 };

        var nets = MENA_NETS;
        for (var cc in nets) {
            if (inRanges(ip, nets[cc])) {
                var w = CFG.COUNTRY_WEIGHT[cc] || 10;
                return { ok: true, cc: cc, score: w };
            }
        }
        return { ok: false, cc: "OTHER", score: CFG.COUNTRY_WEIGHT.OTHER || 10 };
    },

    // تحقق إذا IP أردني تحديداً
    isJordanIP: function(ip) {
        return this.isMENA(ip).cc === "JO";
    },

    isCloudForeign: function(ip) {
        return inRanges(ip, CLOUD_FOREIGN_NETS);
    },

    proxyAllowed: function(proxyName) {
        var p = PROXY_POOL[proxyName];
        if (!p) return false;

        var mode = CFG.PROXY_EXIT_MODE;

        if (mode === "JO_ONLY") {
            return p.cc === "JO";
        }

        if (mode === "MENA_CLUSTER") {
            return this.isMENA(p.ip).ok;
        }

        // ANY_SAFE = أي بروكسي
        return true;
    },

    // ★ smart chain بحسب الأولوية الوطنية ★
    smartChain: function(mode) {
        var m = MODES[mode];
        var strategy = m ? m.strategy : "GAME_JO";

        // فرز البروكسيات حسب الأولوية
        var candidates = [];
        for (var name in PROXY_POOL) {
            var p = PROXY_POOL[name];
            if (!this.proxyAllowed(name)) continue;

            var w = CFG.COUNTRY_WEIGHT[p.cc] || 10;
            w += (3 - p.rank) * 5; // rank 1 = +10, rank 2 = +5, rank 3 = 0
            candidates.push({ name: name, weight: w, cc: p.cc, rank: p.rank });
        }

        // ترتيب تنازلي
        candidates.sort(function(a, b) {
            if (b.weight !== a.weight) return b.weight - a.weight;
            return a.rank - b.rank;
        });

        // بناء السلسلة
        var out = "";
        var count = 0;
        var max = CFG.MAX_PROXY_FALLBACKS;

        // للمودات الحرجة: نبدأ بالأردن ثم الجيران
        if (strategy === "CRITICAL_JO" || strategy === "LOBBY_JO") {
            var jo = candidates.filter(function(c) { return c.cc === "JO"; });
            var mena = candidates.filter(function(c) { return c.cc !== "JO"; });

            for (var i = 0; i < jo.length && count < max; i++) {
                if (out) out += "; ";
                out += "PROXY " + PROXY_POOL[jo[i].name].ip + ":" + PROXY_POOL[jo[i].name].port;
                count++;
            }
            for (var j = 0; j < mena.length && count < max; j++) {
                if (out) out += "; ";
                out += "PROXY " + PROXY_POOL[mena[j].name].ip + ":" + PROXY_POOL[mena[j].name].port;
                count++;
            }
        } else {
            // أي مود آخر: الأفضل أولاً
            for (var k = 0; k < candidates.length && count < max; k++) {
                var c = candidates[k];
                if (out) out += "; ";
                out += "PROXY " + PROXY_POOL[c.name].ip + ":" + PROXY_POOL[c.name].port;
                count++;
            }
        }

        if (out) {
            return CFG.FAIL_CLOSED ? out + "; " + BLOOD.BLK : out + "; DIRECT";
        }

        return CFG.FAIL_CLOSED ? BLOOD.BLK : BLOOD.DIR;
    },

    destinationAllowed: function(ip) {
        if (!ip) return true;
        if (CFG.HARD_LOCK_JORDAN_DESTINATION) return this.isJordanIP(ip);

        if (CFG.PROXY_EXIT_MODE === "JO_ONLY") return this.isJordanIP(ip);
        if (CFG.PROXY_EXIT_MODE === "MENA_CLUSTER") return this.isMENA(ip).ok;

        return true;
    }
};


// ═══════════════════════════════════════════════════════════════════════
//  ★ UPDATED NEURAL SCORE (مع country weight) ★
// ═══════════════════════════════════════════════════════════════════════

function neuralScore(ip, host, port, dn, mode) {
    var s = 0;
    var m = MODES[mode];

    if (m) s += m.priority * 5;
    else s += 20;

    if (dn.dt <= 10) s += 25;
    else if (dn.dt <= 25) s += 20;
    else if (dn.dt <= 50) s += 12;
    else if (dn.dt <= 90) s += 5;
    else s -= 10;

    if (PING.healthy(mode)) s += 18; else s -= 20;

    var status = PING.status(mode);
    if (status === "ULTRA") s += 15;
    else if (status === "BAD") s -= 25;

    // ★ التغيير: MENA scoring بدل JO فقط ★
    if (ip) {
        var mena = DOMESTIC_GUARD.isMENA(ip);
        if (mena.ok) {
            s += mena.score * 0.35;  // JO=35, SA=31.5, AE=30.8...
            // bonus إضافي للأردن
            if (mena.cc === "JO") s += 15;
        }
    }

    if (ip && DOMESTIC_GUARD.isCloudForeign(ip)) s -= 15;

    // host pattern
    s += JO_BIAS ? JO_BIAS.scoreHost(host) : 0;
    s += CONNECT ? CONNECT.boost() : 0;

    if (port === 443) s += 5;
    if (port >= 10000 && port <= 10050) s += 10;
    if (port >= 7000 && port <= 7010) s += 8;

    if (PING.kill && PING.kill()) s -= 35;

    return Math.max(0, Math.min(100, Math.round(s)));
}


// ═══════════════════════════════════════════════════════════════════════
//  ★ UPDATED SELECTOR ★
// ═══════════════════════════════════════════════════════════════════════

function selectStrategy(mode, score, ip, port) {
    var m = MODES[mode];
    var strategy = m ? m.strategy : "GAME_JO";

    if (!DOMESTIC_GUARD.destinationAllowed(ip)) return BLOOD.BLK;

    if (PING.kill && PING.kill()) {
        // kill switch: نبدل البروكسي لكن نبقى في MENA
        var cc = getCountry(ip);
        var alternatives = getAlternativePool(cc);
        return buildChain(alternatives);
    }

    if (strategy === "CDN_JO") {
        if (CFG.ALLOW_CDN_DIRECT) return BLOOD.DIR;
        return DOMESTIC_GUARD.smartChain(mode);
    }

    if (strategy === "SAFE_JO") {
        if (CFG.NO_DIRECT_FOR_PUBG) return DOMESTIC_GUARD.smartChain(mode);
        return BLOOD.DIR;
    }

    if (strategy === "LOBBY_JO") {
        var stickyLobby = stickyGet("LOBBY");
        if (stickyLobby) return stickyLobby;
        var chain = DOMESTIC_GUARD.smartChain(mode);
        stickySet("LOBBY", chain);
        return chain;
    }

    if (strategy === "AUTH_JO") {
        return DOMESTIC_GUARD.smartChain(mode);
    }

    if (strategy === "CRITICAL_JO") {
        return DOMESTIC_GUARD.smartChain(mode);
    }

    if (strategy === "LIGHT_JO") {
        return DOMESTIC_GUARD.smartChain(mode);
    }

    if (strategy === "GAME_JO") {
        return DOMESTIC_GUARD.smartChain(mode);
    }

    return DOMESTIC_GUARD.smartChain(mode);
}


// ═══════════════════════════════════════════════════════════════════════
//  NEW HELPERS (مساعدات جديدة)
// ═══════════════════════════════════════════════════════════════════════

function getCountry(ip) {
    if (!ip) return "UNKNOWN";
    var mena = DOMESTIC_GUARD.isMENA(ip);
    if (mena.ok) return mena.cc;
    return "OTHER";
}

function getAlternativePool(excludeCC) {
    var alt = [];
    for (var name in PROXY_POOL) {
        var p = PROXY_POOL[name];
        if (p.cc === excludeCC) continue;
        if (!DOMESTIC_GUARD.proxyAllowed(name)) continue;

        var w = CFG.COUNTRY_WEIGHT[p.cc] || 10;
        alt.push({ name: name, weight: w, ip: p.ip, port: p.port });
    }
    alt.sort(function(a, b) { return b.weight - a.weight; });
    return alt;
}

function buildChain(list) {
    var out = "";
    var max = CFG.MAX_PROXY_FALLBACKS;
    for (var i = 0; i < list.length && i < max; i++) {
        if (out) out += "; ";
        out += "PROXY " + list[i].ip + ":" + list[i].port;
    }
    if (out) return CFG.FAIL_CLOSED ? out + "; " + BLOOD.BLK : out + "; DIRECT";
    return CFG.FAIL_CLOSED ? BLOOD.BLK : BLOOD.DIR;
}


// ═══════════════════════════════════════════════════════════════════════
//  MAIN PAC (نفس البنية مع التحديثات)
// ═══════════════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
    if (!host) return BLOOD.DIR;
    var h = host.toLowerCase();

    if (isPlainHostName(host)) return BLOOD.DIR;

    if (isIPv4(host)) {
        if (isInNet(host, "10.0.0.0", "255.0.0.0") ||
            isInNet(host, "172.16.0.0", "255.240.0.0") ||
            isInNet(host, "192.168.0.0", "255.255.0.0") ||
            isInNet(host, "127.0.0.0", "255.0.0.0")) {
            return BLOOD.DIR;
        }
    }

    if (isDirectDomain(h) && !isPUBG(h)) return BLOOD.DIR;
    if (!isPUBG(h)) return BLOOD.DIR;

    var dn = fastDNS(host);
    var ip = dn.ip;
    var mode = dn.mode;
    var port = getPort(url);

    if (ip && ip.indexOf(":") !== -1 && CFG.HARD_LOCK_JORDAN_DESTINATION) {
        return BLOOD.BLK;
    }

    var score = neuralScore(ip, h, port, dn, mode);
    return selectStrategy(mode, score, ip, port);
}


// ═══════════════════════════════════════════════════════════════════════
//  HELPERS (نفسها من v27 + الجديدة)
// ═══════════════════════════════════════════════════════════════════════

// ... نفس الـ helper functions: now, isIPv4, maskFromCIDR, inRanges,
//     containsAny, isPUBG, isDirectDomain, detectMode, fastDNS,
//     getPort, PING, STICKY, CONNECT, JO_BIAS ...
