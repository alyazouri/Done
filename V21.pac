// ═══════════════════════════════════════════════════════════════════════
//  PUBG JORDAN LEGENDARY v27.0 — DOMESTIC OMEGA PAC
//  iPad Pro / iOS PAC Only
//  الهدف:
//  - PUBG فقط عبر بروكسيات أردنية
//  - منع DIRECT Leak للعبة
//  - Matchmaking / Lobby Jordan Bias
//  - تغطية جميع مودات PUBG Mobile
//  - Anti-Hop / Anti-Pool Leak خارج الأردن قدر الإمكان داخل حدود PAC
//  - Browsing عادي DIRECT
// ═══════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════
//  CONFIG
// ═══════════════════════════════════════════════════════════════════════

var CFG = {
    // يمنع أي DIRECT لحركة PUBG المعروفة
    NO_DIRECT_FOR_PUBG: true,

    // كل البروكسيات المستخدمة يجب أن تكون من IP أردني
    PROXY_EXIT_JORDAN_ONLY: true,

    // إذا فعلتها true، أي PUBG hostname يتحول لـ IP غير أردني سيتم حظره.
    // تحذير: قد يكسر الدخول أو البحث لأن سيرفرات PUBG غالباً ليست داخل الأردن فعلياً.
    HARD_LOCK_JORDAN_DESTINATION: false,

    // تحديثات وملفات CDN للعبة:
    // false = تمر عبر بروكسي أردني أيضاً لمنع التسريب
    // true = DIRECT للتحميل الأسرع
    ALLOW_CDN_DIRECT: false,

    // إذا لم نجد مسار أردني آمن، نغلق بدل DIRECT
    FAIL_CLOSED: true,

    // عدد خيارات fallback الأردنية فقط
    MAX_PROXY_FALLBACKS: 4,

    // كاش DNS
    DNS_CACHE_TTL: 12000,
    DNS_CACHE_MAX: 90,

    // كاش اختيار البروكسي حسب المود
    STICKY_TTL: 180000,

    // تقليل الحمل على iPad
    LIGHT_MODE: true
};


// ═══════════════════════════════════════════════════════════════════════
//  JORDAN PROXY POOL — فقط مخارج أردنية
// ═══════════════════════════════════════════════════════════════════════

var PROXY_POOL = {
    ORANGE_A: { ip: "46.185.129.122", port: 443, carrier: "ORANGE", rank: 1 },
    ORANGE_B: { ip: "46.185.130.44",  port: 443, carrier: "ORANGE", rank: 2 },
    ZAIN_A:   { ip: "79.173.248.71",  port: 443, carrier: "ZAIN",   rank: 1 },
    ZAIN_B:   { ip: "176.29.15.200",  port: 443, carrier: "ZAIN",   rank: 2 },
    UMNIAH_A: { ip: "82.212.88.100",  port: 443, carrier: "UMNIAH", rank: 1 },
    ST_A:     { ip: "94.230.12.50",   port: 443, carrier: "ST",     rank: 2 }
};

var BLOOD = {
    DIR: "DIRECT",
    BLK: "PROXY 0.0.0.0:80"
};


// ═══════════════════════════════════════════════════════════════════════
//  JORDAN IP DATABASE
// ═══════════════════════════════════════════════════════════════════════

var JO_NETS = [
    ["46.185.128.0", "20"],  // Orange Jordan
    ["46.185.144.0", "21"],
    ["79.173.192.0", "18"],  // Zain Jordan
    ["79.173.240.0", "21"],
    ["82.212.0.0",   "16"],  // Umniah Jordan
    ["82.212.64.0",  "19"],
    ["176.28.0.0",   "17"],
    ["176.29.0.0",   "16"],
    ["188.247.0.0",  "16"],
    ["188.247.0.0",  "20"],
    ["62.72.160.0",  "19"],
    ["94.127.208.0", "21"],
    ["94.230.0.0",   "16"],
    ["94.230.0.0",   "17"],
    ["91.106.0.0",   "16"],
    ["37.220.0.0",   "16"],
    ["176.203.0.0",  "16"],
    ["109.237.192.0","20"],
    ["178.20.184.0", "21"]
];

var CLOUD_FOREIGN_NETS = [
    ["104.16.0.0",    "12"], // Cloudflare
    ["172.64.0.0",    "13"],
    ["188.114.96.0",  "20"],
    ["162.158.0.0",   "15"],
    ["198.41.128.0",  "17"],
    ["141.101.64.0",  "18"],
    ["108.162.192.0", "18"],
    ["173.245.48.0",  "20"],

    ["13.224.0.0",    "14"], // AWS / CloudFront
    ["99.84.0.0",     "16"],
    ["3.0.0.0",       "8"],
    ["52.84.0.0",     "15"],
    ["54.192.0.0",    "16"],

    ["151.101.0.0",   "16"], // Fastly
    ["199.232.0.0",   "16"]
];


// ═══════════════════════════════════════════════════════════════════════
//  PUBG DOMAINS
// ═══════════════════════════════════════════════════════════════════════

var PUBG_KEYS = [
    "pubgmobile",
    "pubgm",
    "pubg",
    "tencent",
    "lightspeed",
    "levelinfinite",
    "igamecj",
    "myapp",
    "qq",
    "igame",
    "gcloud",
    "tmgp",
    "bsgame",
    "minisite",
    "garena_pubg",
    "battlegrounds",
    "pubgstudio",
    "proximabeta"
];

var DIRECT_KEYS = [
    "apple",
    "icloud",
    "google",
    "gstatic",
    "googleapis",
    "youtube",
    "facebook",
    "instagram",
    "whatsapp",
    "telegram",
    "twitter",
    "x.com",
    "tiktok",
    "netflix",
    "spotify",
    "discord",
    "github",
    "microsoft",
    "windows",
    "android"
];


// ═══════════════════════════════════════════════════════════════════════
//  PUBG MODES — تغطية واسعة
// ═══════════════════════════════════════════════════════════════════════

var MODES = {
    LOBBY: {
        sig: [
            "lobby","queue","matchmake","matchmaking","waiting_room",
            "room_list","team","invite","friend","presence","party",
            "region","serverlist","server_list"
        ],
        priority: 10,
        target: 10,
        strategy: "LOBBY_JO"
    },

    AUTH: {
        sig: [
            "auth","login","account","openid","session","token",
            "passport","security","verify","anticheat"
        ],
        priority: 9,
        target: 15,
        strategy: "AUTH_JO"
    },

    RANKED: {
        sig: [
            "ranked","rank","conqueror","ace","master","diamond",
            "platinum","crown","gold","silver","bronze","rating",
            "season","leaderboard","rp_"
        ],
        priority: 10,
        target: 12,
        strategy: "CRITICAL_JO"
    },

    CLASSIC: {
        sig: [
            "classic","erangel","miramar","sanhok","vikendi","livik",
            "karakin","rondo","deston","map","match","session","room"
        ],
        priority: 9,
        target: 15,
        strategy: "GAME_JO"
    },

    TDM: {
        sig: [
            "tdm","team_death","deathmatch","arena","warehouse",
            "ruins","facility","shooting_range","school_tdm"
        ],
        priority: 9,
        target: 12,
        strategy: "CRITICAL_JO"
    },

    PAYLOAD: {
        sig: [
            "payload","payload2","helicop","heli_","rocket",
            "airstrike","vehicle_heavy","payload_mode"
        ],
        priority: 8,
        target: 22,
        strategy: "GAME_JO"
    },

    METRO: {
        sig: [
            "metro","metro_royale","underworld","faction",
            "underground","dark_zone","metro_match","metro_rank"
        ],
        priority: 8,
        target: 18,
        strategy: "GAME_JO"
    },

    ARCADE: {
        sig: [
            "arcade","minizone","mini_zone","sniper_training",
            "war_mode","quick_match","quickmatch","funmatch"
        ],
        priority: 6,
        target: 25,
        strategy: "LIGHT_JO"
    },

    EVOGROUND: {
        sig: [
            "evoground","infection","zombie","undead","rage_gear",
            "evo_match","survive","panzerfaust"
        ],
        priority: 7,
        target: 22,
        strategy: "GAME_JO"
    },

    CLAN: {
        sig: [
            "clan","guild","clanwar","clan_war","domination",
            "territory","conquest","clan_match","alliance"
        ],
        priority: 8,
        target: 18,
        strategy: "GAME_JO"
    },

    IGNITION: {
        sig: [
            "ignition","mission_ignition","titan","robot","mecha",
            "titan_mode","robot_rumble","project_titan"
        ],
        priority: 8,
        target: 15,
        strategy: "CRITICAL_JO"
    },

    SYNC: {
        sig: [
            "sync","realtime","gsvr","gamesvr","relay","battle",
            "burst","udp_relay","node","game_svr"
        ],
        priority: 10,
        target: 12,
        strategy: "CRITICAL_JO"
    },

    TRAINING: {
        sig: [
            "training","training_mode","training_ground","tutorial",
            "practice","aim_training","bot_match","practice_range"
        ],
        priority: 1,
        target: 999,
        strategy: "SAFE_JO"
    },

    CDN_PATCH: {
        sig: [
            "cdn","patch","update","resource","download","asset",
            "pkg","apk","obb","version","hotfix"
        ],
        priority: 1,
        target: 999,
        strategy: "CDN_JO"
    }
};

var MODE_ORDER = [
    "LOBBY","AUTH","RANKED","TDM","SYNC","IGNITION","CLAN",
    "METRO","CLASSIC","PAYLOAD","EVOGROUND","ARCADE",
    "CDN_PATCH","TRAINING"
];


// ═══════════════════════════════════════════════════════════════════════
//  DNS CACHE + PING ENGINE
// ═══════════════════════════════════════════════════════════════════════

var DNS_CACHE = {};
var DNS_KEYS = [];

var PING = {
    history: [],
    maxHistory: 10,
    killThreshold: 45,

    record: function(ms, mode) {
        var est = Math.round(ms * 0.55 + 3);

        if (this.history.length >= this.maxHistory) {
            this.history.shift();
        }

        this.history.push({
            dns: ms,
            estimated: est,
            mode: mode || "DEFAULT",
            t: now()
        });

        return est;
    },

    avg: function() {
        var n = this.history.length;
        if (n === 0) return 999;

        var start = n > 5 ? n - 5 : 0;
        var sum = 0;
        var c = 0;

        for (var i = start; i < n; i++) {
            sum += this.history[i].estimated;
            c++;
        }

        return c ? Math.round(sum / c) : 999;
    },

    best: function() {
        if (this.history.length === 0) return 999;

        var b = 999;
        for (var i = 0; i < this.history.length; i++) {
            if (this.history[i].estimated < b) b = this.history[i].estimated;
        }

        return b;
    },

    healthy: function(mode) {
        var m = MODES[mode];
        var target = m ? m.target : 18;
        return this.avg() <= target;
    },

    kill: function() {
        return this.history.length >= 3 && this.avg() >= this.killThreshold;
    },

    status: function(mode) {
        var m = MODES[mode];
        var target = m ? m.target : 18;
        var a = this.avg();

        if (a === 999) return "COLD";
        if (a <= target * 0.7) return "ULTRA";
        if (a <= target) return "GOOD";
        if (a <= target * 1.5) return "FAIR";
        return "BAD";
    }
};


// ═══════════════════════════════════════════════════════════════════════
//  STICKY ROUTING — ثبات اختيار البروكسي للمود
// ═══════════════════════════════════════════════════════════════════════

var STICKY = {};

function stickyGet(key) {
    var e = STICKY[key];
    if (!e) return null;
    if (now() - e.t > CFG.STICKY_TTL) {
        delete STICKY[key];
        return null;
    }
    return e.v;
}

function stickySet(key, val) {
    STICKY[key] = { v: val, t: now() };
}


// ═══════════════════════════════════════════════════════════════════════
//  DOMESTIC GUARD — منع خروج pool/proxy خارج الأردن
// ═══════════════════════════════════════════════════════════════════════

var DOMESTIC_GUARD = {
    isJordanIP: function(ip) {
        return inRanges(ip, JO_NETS);
    },

    isCloudForeign: function(ip) {
        return inRanges(ip, CLOUD_FOREIGN_NETS);
    },

    proxyAllowed: function(proxyName) {
        var p = PROXY_POOL[proxyName];
        if (!p) return false;

        if (CFG.PROXY_EXIT_JORDAN_ONLY && !this.isJordanIP(p.ip)) {
            return false;
        }

        return true;
    },

    destinationAllowed: function(ip) {
        if (!ip) return true;

        if (CFG.HARD_LOCK_JORDAN_DESTINATION) {
            return this.isJordanIP(ip);
        }

        return true;
    },

    safeChain: function(names) {
        var out = "";
        var count = 0;

        for (var i = 0; i < names.length; i++) {
            var name = names[i];
            var p = PROXY_POOL[name];

            if (!p) continue;
            if (!this.proxyAllowed(name)) continue;

            if (out !== "") out += "; ";
            out += "PROXY " + p.ip + ":" + p.port;

            count++;
            if (count >= CFG.MAX_PROXY_FALLBACKS) break;
        }

        if (out !== "") {
            if (CFG.FAIL_CLOSED) return out + "; " + BLOOD.BLK;
            return out + "; DIRECT";
        }

        return CFG.FAIL_CLOSED ? BLOOD.BLK : BLOOD.DIR;
    }
};


// ═══════════════════════════════════════════════════════════════════════
//  JORDAN MATCHMAKING BIAS
// ═══════════════════════════════════════════════════════════════════════

var JO_BIAS = {
    jordanHostSignals: [
        "jo","jordan","amman","irbid","zarqa","aqaba","salt",
        "me","middleeast","mena","arab","gcc"
    ],

    scoreHost: function(host) {
        var h = host.toLowerCase();
        var s = 0;

        for (var i = 0; i < this.jordanHostSignals.length; i++) {
            if (h.indexOf(this.jordanHostSignals[i]) !== -1) {
                s += 10;
            }
        }

        return s;
    },

    carrierBoost: function(ip) {
        var c = getCarrier(ip);

        if (c === "ORANGE") return 18;
        if (c === "ZAIN") return 16;
        if (c === "UMNIAH") return 14;
        if (c === "ST") return 10;

        return 0;
    }
};


// ═══════════════════════════════════════════════════════════════════════
//  CONNECTION PROFILE
// ═══════════════════════════════════════════════════════════════════════

var CONNECT = {
    type: function() {
        var a = PING.avg();

        if (a <= 15) return "5G_OR_FIBER";
        if (a <= 35) return "WIFI";
        if (a <= 70) return "ADSL";
        return "WEAK";
    },

    boost: function() {
        var t = this.type();

        if (t === "5G_OR_FIBER") return 20;
        if (t === "WIFI") return 12;
        if (t === "ADSL") return 5;

        return -10;
    }
};


// ═══════════════════════════════════════════════════════════════════════
//  MAIN SCORING
// ═══════════════════════════════════════════════════════════════════════

function neuralScore(ip, host, port, dn, mode) {
    var s = 0;
    var m = MODES[mode];

    if (m) {
        s += m.priority * 5;
    } else {
        s += 20;
    }

    // DNS speed
    if (dn.dt <= 10) s += 25;
    else if (dn.dt <= 25) s += 20;
    else if (dn.dt <= 50) s += 12;
    else if (dn.dt <= 90) s += 5;
    else s -= 10;

    // Ping health
    if (PING.healthy(mode)) s += 18;
    else s -= 20;

    var status = PING.status(mode);
    if (status === "ULTRA") s += 15;
    else if (status === "BAD") s -= 25;

    // Jordan destination bias
    if (ip && DOMESTIC_GUARD.isJordanIP(ip)) {
        s += 35;
        s += JO_BIAS.carrierBoost(ip);
    }

    // Foreign cloud penalty, not hard block unless HARD_LOCK enabled
    if (ip && DOMESTIC_GUARD.isCloudForeign(ip)) {
        s -= 15;
    }

    // Jordan / MENA host pattern
    s += JO_BIAS.scoreHost(host);

    // Connection profile
    s += CONNECT.boost();

    // Port sensitivity
    if (port === 443) s += 5;
    if (port >= 10000 && port <= 10050) s += 10;
    if (port >= 7000 && port <= 7010) s += 8;

    // Kill switch pressure
    if (PING.kill()) s -= 35;

    if (s < 0) return 0;
    if (s > 100) return 100;

    return Math.round(s);
}


// ═══════════════════════════════════════════════════════════════════════
//  PROXY SELECTOR
// ═══════════════════════════════════════════════════════════════════════

function selectStrategy(mode, score, ip, port) {
    var m = MODES[mode];
    var strategy = m ? m.strategy : "GAME_JO";
    var carrier = getCarrier(ip);
    var conn = CONNECT.type();

    // Hard destination lock
    if (!DOMESTIC_GUARD.destinationAllowed(ip)) {
        return BLOOD.BLK;
    }

    // Kill switch: غير المسار لكن ابقَ داخل الأردن
    if (PING.kill()) {
        if (carrier === "ORANGE") {
            return DOMESTIC_GUARD.safeChain(["ZAIN_A", "UMNIAH_A", "ORANGE_B", "ST_A"]);
        }
        if (carrier === "ZAIN") {
            return DOMESTIC_GUARD.safeChain(["ORANGE_A", "UMNIAH_A", "ZAIN_B", "ST_A"]);
        }
        if (carrier === "UMNIAH") {
            return DOMESTIC_GUARD.safeChain(["ORANGE_A", "ZAIN_A", "ST_A", "ORANGE_B"]);
        }

        return DOMESTIC_GUARD.safeChain(["ORANGE_A", "ZAIN_A", "UMNIAH_A", "ST_A"]);
    }

    // CDN / Patch
    if (strategy === "CDN_JO") {
        if (CFG.ALLOW_CDN_DIRECT) return BLOOD.DIR;
        return DOMESTIC_GUARD.safeChain(["ZAIN_A", "ORANGE_B", "ORANGE_A", "UMNIAH_A"]);
    }

    // Training
    if (strategy === "SAFE_JO") {
        if (CFG.NO_DIRECT_FOR_PUBG) {
            return DOMESTIC_GUARD.safeChain(["ORANGE_A", "ZAIN_A", "UMNIAH_A"]);
        }
        return BLOOD.DIR;
    }

    // Lobby / Matchmaking — Jordan Bias قوي
    if (strategy === "LOBBY_JO") {
        var stickyLobby = stickyGet("LOBBY");
        if (stickyLobby) return stickyLobby;

        var lobbyChain;
        if (conn === "5G_OR_FIBER") {
            lobbyChain = DOMESTIC_GUARD.safeChain(["ORANGE_A", "ZAIN_A", "ORANGE_B", "UMNIAH_A"]);
        } else if (conn === "WIFI") {
            lobbyChain = DOMESTIC_GUARD.safeChain(["ZAIN_A", "ORANGE_A", "UMNIAH_A", "ST_A"]);
        } else {
            lobbyChain = DOMESTIC_GUARD.safeChain(["UMNIAH_A", "ZAIN_A", "ORANGE_B", "ORANGE_A"]);
        }

        stickySet("LOBBY", lobbyChain);
        return lobbyChain;
    }

    // Auth / Login — ثبات وأمان
    if (strategy === "AUTH_JO") {
        return DOMESTIC_GUARD.safeChain(["ORANGE_A", "ZAIN_A", "UMNIAH_A", "ST_A"]);
    }

    // Critical modes: Ranked / TDM / Sync / Ignition
    if (strategy === "CRITICAL_JO") {
        if (carrier === "ORANGE" || score >= 85) {
            return DOMESTIC_GUARD.safeChain(["ORANGE_A", "ZAIN_A", "ORANGE_B", "UMNIAH_A"]);
        }

        if (carrier === "ZAIN") {
            return DOMESTIC_GUARD.safeChain(["ZAIN_A", "ORANGE_A", "UMNIAH_A", "ST_A"]);
        }

        return DOMESTIC_GUARD.safeChain(["ORANGE_A", "ZAIN_A", "UMNIAH_A", "ORANGE_B"]);
    }

    // Light modes
    if (strategy === "LIGHT_JO") {
        if (score >= 70) {
            return DOMESTIC_GUARD.safeChain(["ZAIN_A", "ORANGE_A", "UMNIAH_A"]);
        }

        return DOMESTIC_GUARD.safeChain(["ORANGE_A", "ZAIN_A"]);
    }

    // Standard game
    if (strategy === "GAME_JO") {
        if (score >= 90) {
            return DOMESTIC_GUARD.safeChain(["ORANGE_A", "ZAIN_A", "UMNIAH_A", "ST_A"]);
        }

        if (score >= 75) {
            return DOMESTIC_GUARD.safeChain(["ZAIN_A", "ORANGE_A", "ORANGE_B", "UMNIAH_A"]);
        }

        if (score >= 55) {
            return DOMESTIC_GUARD.safeChain(["UMNIAH_A", "ZAIN_A", "ORANGE_A"]);
        }

        return DOMESTIC_GUARD.safeChain(["ORANGE_A", "ZAIN_A"]);
    }

    // Default safe Jordan route
    return DOMESTIC_GUARD.safeChain(["ORANGE_A", "ZAIN_A", "UMNIAH_A", "ST_A"]);
}


// ═══════════════════════════════════════════════════════════════════════
//  MAIN PAC
// ═══════════════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
    if (!host) return BLOOD.DIR;

    var h = host.toLowerCase();

    // Localhost / LAN
    if (isPlainHostName(host)) return BLOOD.DIR;

    if (isIPv4(host)) {
        if (isInNet(host, "10.0.0.0", "255.0.0.0") ||
            isInNet(host, "172.16.0.0", "255.240.0.0") ||
            isInNet(host, "192.168.0.0", "255.255.0.0") ||
            isInNet(host, "127.0.0.0", "255.0.0.0")) {
            return BLOOD.DIR;
        }
    }

    // Browsing / non PUBG = DIRECT
    if (isDirectDomain(h) && !isPUBG(h)) {
        return BLOOD.DIR;
    }

    if (!isPUBG(h)) {
        return BLOOD.DIR;
    }

    // PUBG starts here: no direct leak
    var dn = fastDNS(host);
    var ip = dn.ip;
    var mode = dn.mode;
    var port = getPort(url);

    // IPv6 داخل PAC غير قابل للتحقق بـ isInNet، لذلك مع hard lock نغلقه
    if (ip && ip.indexOf(":") !== -1 && CFG.HARD_LOCK_JORDAN_DESTINATION) {
        return BLOOD.BLK;
    }

    if (CFG.HARD_LOCK_JORDAN_DESTINATION && ip && !DOMESTIC_GUARD.isJordanIP(ip)) {
        return BLOOD.BLK;
    }

    var score = neuralScore(ip, h, port, dn, mode);
    return selectStrategy(mode, score, ip, port);
}


// ═══════════════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════════════

function now() {
    return (new Date()).getTime();
}

function isIPv4(ip) {
    if (!ip) return false;
    if (ip.indexOf(":") !== -1) return false;

    var p = ip.split(".");
    if (p.length !== 4) return false;

    for (var i = 0; i < 4; i++) {
        var n = parseInt(p[i], 10);
        if (isNaN(n) || n < 0 || n > 255) return false;
    }

    return true;
}

function maskFromCIDR(c) {
    c = String(c);

    if (c === "8")  return "255.0.0.0";
    if (c === "9")  return "255.128.0.0";
    if (c === "10") return "255.192.0.0";
    if (c === "11") return "255.224.0.0";
    if (c === "12") return "255.240.0.0";
    if (c === "13") return "255.248.0.0";
    if (c === "14") return "255.252.0.0";
    if (c === "15") return "255.254.0.0";
    if (c === "16") return "255.255.0.0";
    if (c === "17") return "255.255.128.0";
    if (c === "18") return "255.255.192.0";
    if (c === "19") return "255.255.224.0";
    if (c === "20") return "255.255.240.0";
    if (c === "21") return "255.255.248.0";
    if (c === "22") return "255.255.252.0";
    if (c === "23") return "255.255.254.0";
    if (c === "24") return "255.255.255.0";
    if (c === "25") return "255.255.255.128";
    if (c === "26") return "255.255.255.192";
    if (c === "27") return "255.255.255.224";
    if (c === "28") return "255.255.255.240";
    if (c === "29") return "255.255.255.248";
    if (c === "30") return "255.255.255.252";
    if (c === "31") return "255.255.255.254";
    if (c === "32") return "255.255.255.255";

    return "255.255.0.0";
}

function inRanges(ip, ranges) {
    if (!ip) return false;
    if (!isIPv4(ip)) return false;

    for (var i = 0; i < ranges.length; i++) {
        var base = ranges[i][0];
        var cidr = ranges[i][1];
        var mask = maskFromCIDR(cidr);

        if (isInNet(ip, base, mask)) {
            return true;
        }
    }

    return false;
}

function containsAny(h, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (h.indexOf(arr[i]) !== -1) {
            return true;
        }
    }

    return false;
}

function isPUBG(h) {
    return containsAny(h, PUBG_KEYS);
}

function isDirectDomain(h) {
    return containsAny(h, DIRECT_KEYS);
}

function detectMode(host) {
    var h = host.toLowerCase();

    for (var i = 0; i < MODE_ORDER.length; i++) {
        var name = MODE_ORDER[i];
        var m = MODES[name];

        if (!m) continue;

        for (var j = 0; j < m.sig.length; j++) {
            if (h.indexOf(m.sig[j]) !== -1) {
                return name;
            }
        }
    }

    return "CLASSIC";
}

function fastDNS(host) {
    var e = DNS_CACHE[host];

    if (e && now() - e.t <= CFG.DNS_CACHE_TTL) {
        return e;
    }

    var t0 = now();
    var ip = dnsResolve(host);
    var dt = now() - t0;
    var mode = detectMode(host);

    var r = {
        ip: ip,
        dt: dt,
        mode: mode,
        ok: !!ip,
        t: now()
    };

    if (DNS_KEYS.length >= CFG.DNS_CACHE_MAX) {
        var old = DNS_KEYS.shift();
        delete DNS_CACHE[old];
    }

    DNS_CACHE[host] = r;
    DNS_KEYS.push(host);

    PING.record(dt, mode);

    return r;
}

function getPort(url) {
    var m = url.match(/^[a-zA-Z]+:\/\/[^\/:]+:(\d+)/);
    if (m) return parseInt(m[1], 10);

    if (url.indexOf("https://") === 0) return 443;
    if (url.indexOf("http://") === 0) return 80;

    return 443;
}

function getCarrier(ip) {
    if (!ip || !isIPv4(ip)) return "UNKNOWN";

    if (isInNet(ip, "46.185.128.0", "255.255.128.0")) return "ORANGE";
    if (isInNet(ip, "79.173.192.0", "255.255.192.0")) return "ZAIN";
    if (isInNet(ip, "176.29.0.0", "255.255.0.0")) return "ZAIN";
    if (isInNet(ip, "176.28.0.0", "255.255.128.0")) return "ZAIN";
    if (isInNet(ip, "82.212.0.0", "255.255.0.0")) return "UMNIAH";
    if (isInNet(ip, "94.230.0.0", "255.255.0.0")) return "ST";

    return "OTHER";
}
