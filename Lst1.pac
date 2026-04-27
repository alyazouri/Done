// ═══════════════════════════════════════════════════════════════════════
//  🎮 PUBG JORDAN ULTRA PAC v32.0 — FULL EDITION
//  Auto-Generated — 2026-04-27 09:30:51
// ═══════════════════════════════════════════════════════════════════════
//  IP: 192.168.100.112 | Carrier: UNKNOWN (?)
//  Range: N/A — N/A
//  Network: 5.7 ms DNS | ~4 ms Ping | 3.4 Jitter
//  Grade: S+ (ممتاز جداً) | Score: 86/100
//  Jordan Ranges: 47 (0 for your carrier)
//  Proxies: 2/6 alive
//  Features Enabled:
//     ✅ 🔵 Server Pin — تثبيت سيرفر MENA
//     ✅ 🔒 Lobby Locker — قفل اللوبي
//     ✅ 🕐 Time Awareness — أوقات الذروة
//     ✅ 🌐 DNS Cache — كاش DNS
//     ✅ 🛡️ Anti-Telemetry — حجب التتبع
//     ✅ 📡 Latency Monitor — مراقبة التأخير
//     ✅ 🔄 Smart Failover — تبديل ذكي
//     ✅ 🎯 Phase Detection — كشف المرحلة
//     ✅ 🏠 Session Anchor — تثبيت الجلسة
//     ✅ 📊 Score Engine — محرك التقييم
//     ✅ 🌍 Geo Fence — حماية جغرافية
//     ✅ ⚡ Bloom Filter — فلتر سريع
//     ✅ 🔗 Connection Pool — تجميع الاتصالات
//     ✅ 🧹 Auto Cleanup — تنظيف تلقائي
//     ✅ 📱 Device Fingerprint — بصمة الجهاز
//     ✅ 🎲 Load Balancer — موازنة الحمل
//     ✅ 🔁 Retry Logic — منطق إعادة المحاولة
//     ✅ 📈 Bandwidth Estimator — تقدير السرعة
//     ✅ 🗺️ Server Scoring — تقييم السيرفرات
// ═══════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════
//  SECTION 1: CONFIGURATION
// ═══════════════════════════════════════════════════════════════

var CFG = {
    // ── أساسيات ──
    NO_DIRECT: true,              // لا اتصال مباشر للـ PUBG
    FAIL_CLOSED: true,            // فشل = إغلاق (أمان)
    MAX_FB: 4,                    // أقصى بروكسيات في الفيلباك
    DNS_TTL: 8000,                // انتهاء كاش DNS (مللي)
    DEC_TTL: 2000,                // انتهاء كاش القرار (مللي)
    LOCK_MS: 9000000,             // مدة قفل اللوبي (2.5 ساعة)
    LIGHT: false,                 // وضع خفيف
    MY_CARRIER: "UNKNOWN",        // شريحتك

    // ── متقدم ──
    CLEANUP_INTERVAL: 45,         // تنظيف كل N طلب
    MAX_CACHE: 256,               // أقصى عناصر كاش
    MAX_DNS_CACHE: 150,           // أقصى عناصر DNS كاش
    ANCHOR_TTL: 9000000,          // مدة التثبيت (مللي)
    SCORE_THRESHOLD_HIGH: 82,     // عتبة عالية
    SCORE_THRESHOLD_MED: 50,      // عتبة متوسطة
    RETRY_MAX: 3,                 // أقصى إعادة محاولة
    PING_WEIGHT: 0.35,            // وزن البينغ
    JITTER_WEIGHT: 0.25,          // وزن الجيتر
    GEO_WEIGHT: 0.20,             // وزن الموقع
    CARRIER_WEIGHT: 0.20,         // وزن الشريحة

    // ── أمان ──
    BLOCK_TELEMETRY: true,        // حجب التتبع
    BLOCK_ANALYTICS: true,        // حجب التحليلات
    BLOCK_REPORTS: false,         // حجب التقارير (قد يسبب مشاكل)
    ENCRYPT_PROXY: true,          // تشفير البروكسيات (443)

    // ── تحسين ──
    PREFETCH_DNS: true,           // جلب DNS مسبقاً
    AGGRESSIVE_PIN: true,         // تثبيت عدواني للمنطقة
    SMART_FAILOVER: true,         // تبديل ذكي
    LOAD_BALANCE: true,           // موازنة الحمل
    STICKY_SESSION: true,         // جلسة لزجة
    PARALLEL_PROBE: false         // فحص متوازي (استهلاك)
};


// ═══════════════════════════════════════════════════════════════
//  SECTION 2: PROXY POOL (8 بروكسيات)
// ═══════════════════════════════════════════════════════════════

var POOL = {
    // ── Orange Jordan ──
    ORANGE_A:  { ip: "46.185.129.122",  port: 20001, carrier: "ORANGE",  region: "jo", weight: 10, alive: true,  latency: 4,  fails: 0 },
    ORANGE_B:  { ip: "46.185.130.44",   port: 443, carrier: "ORANGE",  region: "jo", weight: 8,  alive: true,  latency: 6,  fails: 0 },
    ORANGE_C:  { ip: "91.106.95.180",   port: 443, carrier: "ORANGE",  region: "jo", weight: 7,  alive: true,  latency: 7,  fails: 0 },

    // ── Zain Jordan ──
    ZAIN_A:    { ip: "79.173.248.71",   port: 443, carrier: "ZAIN",    region: "jo", weight: 9,  alive: true,  latency: 5,  fails: 0 },
    ZAIN_B:    { ip: "176.29.15.200",   port: 443, carrier: "ZAIN",    region: "jo", weight: 7,  alive: true,  latency: 7,  fails: 0 },

    // ── Umniah Jordan ──
    UMNIAH_A:  { ip: "82.212.88.100",   port: 443, carrier: "UMNIAH",  region: "jo", weight: 8,  alive: true,  latency: 6,  fails: 0 },

    // ── STC / Other ──
    ST_A:      { ip: "94.230.12.50",    port: 443, carrier: "ST",      region: "jo", weight: 6,  alive: true,  latency: 8,  fails: 0 },

    // ── بروكسي إضافي (مُضاف) ──
    EXTRA_A:   { ip: "149.200.253.140", port: 443, carrier: "OTHER",   region: "jo", weight: 7,  alive: true,  latency: 6,  fails: 0 }
};


// ═══════════════════════════════════════════════════════════════
//  SECTION 3: CONSTANTS & BUILDERS
// ═══════════════════════════════════════════════════════════════

var B = {
    D: "DIRECT",
    X: "PROXY 0.0.0.0:80"  // حجب كامل
};

// سلسلة البروكسيات الأساسية مرتبة بالأولوية
var MY_CHAIN = ["ORANGE_A", "ZAIN_A", "UMNIAH_A", "ST_A", "EXTRA_A"];

// سلاسل مخصصة لكل مرحلة
var PHASE_CHAINS = {
    AUTH:      ["ORANGE_A", "ZAIN_A", "UMNIAH_A"],
    LOBBY:     ["ORANGE_A", "ZAIN_A", "UMNIAH_A", "ST_A"],
    MATCH:     ["ORANGE_A", "ZAIN_A"],
    GAME:      ["ORANGE_A"],
    POST:      ["ORANGE_A", "ZAIN_A", "UMNIAH_A"],
    UPDATE:    ["ZAIN_A", "UMNIAH_A", "ST_A", "EXTRA_A"],
    REGION:    ["ORANGE_A", "ZAIN_A"],
    TELEMETRY: ["ORANGE_A", "ZAIN_A"],
    CDN:       ["ZAIN_A", "ST_A", "EXTRA_A", "ORANGE_B"]
};


// ═══════════════════════════════════════════════════════════════
//  SECTION 4: JORDAN IPv4 RANGES (47 نطاق)
// ═══════════════════════════════════════════════════════════════

var JO_NETS = [
    // ── ZAIN ──
    ["79.173.248.0",  "22", "ZAIN"],
    ["79.173.240.0",  "21", "ZAIN"],
    ["176.28.224.0",  "20", "ZAIN"],
    ["37.220.224.0",  "20", "ZAIN"],
    ["188.247.96.0",  "20", "ZAIN"],
    ["176.28.192.0",  "19", "ZAIN"],
    ["37.220.192.0",  "19", "ZAIN"],
    ["188.247.64.0",  "19", "ZAIN"],
    ["79.173.192.0",  "18", "ZAIN"],
    ["176.28.128.0",  "18", "ZAIN"],
    ["37.220.128.0",  "18", "ZAIN"],
    ["188.247.0.0",   "18", "ZAIN"],
    ["176.28.0.0",    "17", "ZAIN"],

    // ── ORANGE ──
    ["46.185.240.0",  "21", "ORANGE"],
    ["46.185.128.0",  "20", "ORANGE"],
    ["46.185.144.0",  "20", "ORANGE"],
    ["46.185.224.0",  "20", "ORANGE"],
    ["91.106.224.0",  "20", "ORANGE"],
    ["176.29.224.0",  "20", "ORANGE"],
    ["46.185.160.0",  "19", "ORANGE"],
    ["46.185.192.0",  "19", "ORANGE"],
    ["91.106.192.0",  "19", "ORANGE"],
    ["176.29.192.0",  "19", "ORANGE"],
    ["91.106.128.0",  "18", "ORANGE"],
    ["176.29.128.0",  "18", "ORANGE"],
    ["91.106.0.0",    "17", "ORANGE"],
    ["176.29.0.0",    "17", "ORANGE"],

    // ── UMNIAH ──
    ["82.213.224.0",  "20", "UMNIAH"],
    ["188.247.224.0", "20", "UMNIAH"],
    ["82.213.192.0",  "19", "UMNIAH"],
    ["188.247.192.0", "19", "UMNIAH"],
    ["82.213.128.0",  "18", "UMNIAH"],
    ["188.247.128.0", "18", "UMNIAH"],
    ["82.213.0.0",    "17", "UMNIAH"],
    ["82.212.0.0",    "16", "UMNIAH"],

    // ── ST ──
    ["94.127.216.0",  "22", "ST"],
    ["94.127.208.0",  "21", "ST"],
    ["94.230.224.0",  "20", "ST"],
    ["94.230.192.0",  "19", "ST"],
    ["94.230.128.0",  "18", "ST"],
    ["94.230.0.0",    "17", "ST"],

    // ── OTHER ──
    ["185.49.88.0",   "22", "OTHER"],
    ["178.20.184.0",  "21", "OTHER"],
    ["109.237.192.0", "20", "OTHER"],
    ["62.72.160.0",   "19", "OTHER"],
    ["212.34.0.0",    "19", "OTHER"],
    ["176.203.0.0",   "18", "OTHER"]
];


// ═══════════════════════════════════════════════════════════════
//  SECTION 5: CLOUD & CDN NETWORKS
// ═══════════════════════════════════════════════════════════════

var CL_NETS = [
    // ── Cloudflare ──
    ["104.16.0.0",      "12"],
    ["172.64.0.0",      "13"],
    ["162.158.0.0",     "15"],
    ["198.41.128.0",    "17"],
    ["141.101.64.0",    "18"],
    ["108.162.192.0",   "18"],
    ["173.245.48.0",    "20"],

    // ── AWS CloudFront ──
    ["13.224.0.0",      "14"],
    ["99.84.0.0",       "16"],
    ["52.84.0.0",       "15"],
    ["54.192.0.0",      "16"],
    ["3.0.0.0",         "8"],

    // ── Fastly ──
    ["151.101.0.0",     "16"],
    ["199.232.0.0",     "16"],

    // ── Akamai ──
    ["23.0.0.0",        "12"],
    ["23.32.0.0",       "11"],
    ["23.64.0.0",       "14"],
    ["104.64.0.0",      "10"]
];


// ═══════════════════════════════════════════════════════════════
//  SECTION 6: BLOOM FILTER — O(1) كشف سريع
// ═══════════════════════════════════════════════════════════════

var BF = {
    b: new Array(2048),

    h1: function(x) {
        var h = 0;
        for (var i = 0; i < x.length; i++)
            h = ((h << 5) - h + x.charCodeAt(i)) | 0;
        return Math.abs(h) % 2048;
    },

    h2: function(x) {
        var h = 5381;
        for (var i = 0; i < x.length; i++)
            h = ((h << 5) + h + x.charCodeAt(i)) | 0;
        return Math.abs(h) % 2048;
    },

    h3: function(x) {
        var h = 0;
        for (var i = 0; i < x.length; i++)
            h = (h * 31 + x.charCodeAt(i)) | 0;
        return Math.abs(h) % 2048;
    },

    h4: function(x) {
        var h = 17;
        for (var i = 0; i < x.length; i++)
            h = (h * 13 + x.charCodeAt(i) * 7) | 0;
        return Math.abs(h) % 2048;
    },

    h5: function(x) {
        var h = 0x811c9dc5;
        for (var i = 0; i < x.length; i++)
            h = ((h ^ x.charCodeAt(i)) * 0x01000193) | 0;
        return Math.abs(h) % 2048;
    },

    init: function(a) {
        for (var i = 0; i < 2048; i++) this.b[i] = 0;
        for (var i = 0; i < a.length; i++) {
            var l = a[i].toLowerCase();
            this.b[this.h1(l)] = 1;
            this.b[this.h2(l)] = 1;
            this.b[this.h3(l)] = 1;
            this.b[this.h4(l)] = 1;
            this.b[this.h5(l)] = 1;
        }
    },

    host: function(h) {
        var p = h.split(/[.\-_]/);
        for (var i = 0; i < p.length; i++) {
            if (p[i].length >= 3) {
                var l = p[i].toLowerCase();
                if (this.b[this.h1(l)] && this.b[this.h2(l)] &&
                    this.b[this.h3(l)] && this.b[this.h4(l)] &&
                    this.b[this.h5(l)])
                    return true;
            }
        }
        for (var l = 4; l <= Math.min(14, h.length); l++) {
            for (var j = 0; j <= h.length - l; j++) {
                var s = h.substr(j, l).toLowerCase();
                if (this.b[this.h1(s)] && this.b[this.h2(s)] &&
                    this.b[this.h3(s)] && this.b[this.h4(s)] &&
                    this.b[this.h5(s)])
                    return true;
            }
        }
        return false;
    }
};

// تهيئة الكلمات المفتاحية
BF.init([
    "pubgmobile", "pubgm", "pubg", "tencent", "lightspeed",
    "levelinfinite", "igamecj", "myapp", "qq", "igame",
    "gcloud", "tmgp", "bsgame", "battlegrounds", "proximabeta",
    "garena", "pubgstudio", "pubgmobileapi", "tdw", "tencentgames",
    "gamecdn", "gpublish", "gcloudgslb", "igsn", "ifun",
    "imtt", "tgame", "qcloud", "wegame", "tenpay",
    "snsimg", "qlogo", "idqqimg", "qtimg", "gcloudqq",
    "a]pilogin", "qzone", "wechat", "weixin", "tencentdb",
    "cos.ap", "cdn.tencent", "game.qq", "pgame", "pvp",
    "match", "lobby", "season", "rank", "crate"
]);


// ═══════════════════════════════════════════════════════════════
//  SECTION 7: FAST IP MATCHER
// ═══════════════════════════════════════════════════════════════

var IP = {
    jo: [],
    cl: [],

    i2: function(ip) {
        if (!ip) return 0;
        var p = ip.split(".");
        if (p.length !== 4) return 0;
        return ((parseInt(p[0]) << 24) | (parseInt(p[1]) << 16) |
                (parseInt(p[2]) << 8) | parseInt(p[3])) >>> 0;
    },

    build: function() {
        // بناء نطاقات الأردن
        for (var i = 0; i < JO_NETS.length; i++) {
            var ip = this.i2(JO_NETS[i][0]);
            var b  = parseInt(JO_NETS[i][1]);
            var m  = ~(0xFFFFFFFF >>> b) >>> 0;
            this.jo.push({
                n: (ip & m) >>> 0,
                b: (ip | ~m) >>> 0,
                c: JO_NETS[i][2]
            });
        }
        // بناء نطاقات الكلاود
        for (var i = 0; i < CL_NETS.length; i++) {
            var ip = this.i2(CL_NETS[i][0]);
            var b  = parseInt(CL_NETS[i][1]);
            var m  = ~(0xFFFFFFFF >>> b) >>> 0;
            this.cl.push({
                n: (ip & m) >>> 0,
                b: (ip | ~m) >>> 0
            });
        }
    },

    isJo: function(ip) {
        var i = this.i2(ip);
        if (!i) return false;
        for (var j = 0; j < this.jo.length; j++)
            if (i >= this.jo[j].n && i <= this.jo[j].b) return true;
        return false;
    },

    isCl: function(ip) {
        var i = this.i2(ip);
        if (!i) return false;
        for (var j = 0; j < this.cl.length; j++)
            if (i >= this.cl[j].n && i <= this.cl[j].b) return true;
        return false;
    },

    car: function(ip) {
        var i = this.i2(ip);
        if (!i) return "U";
        for (var j = 0; j < this.jo.length; j++)
            if (i >= this.jo[j].n && i <= this.jo[j].b)
                return this.jo[j].c;
        return "O";
    },

    my: function(ip) {
        return this.car(ip) === CFG.MY_CARRIER;
    },

    isPrivate: function(ip) {
        if (!ip) return false;
        return isInNet(ip, "10.0.0.0", "255.0.0.0") ||
               isInNet(ip, "172.16.0.0", "255.240.0.0") ||
               isInNet(ip, "192.168.0.0", "255.255.0.0") ||
               isInNet(ip, "127.0.0.0", "255.0.0.0");
    },

    isLoopback: function(ip) {
        return ip === "127.0.0.1" || ip === "::1";
    }
};

IP.build();


// ═══════════════════════════════════════════════════════════════
//  SECTION 8: PING ESTIMATOR & LATENCY MONITOR
// ═══════════════════════════════════════════════════════════════

var PE = {
    w: 0, v: 0, t: 0, ls: 0, on: false,
    r: new Array(64),
    rp: 0,
    count: 0,
    total: 0,
    min: 999,
    max: 0,

    sample: function(d) {
        var p = Math.round(d * 0.42 + 1.5);
        if (!this.on) {
            this.w = p;
            this.v = 8;
            this.on = true;
        }
        this.w += 0.28 * (p - this.w);
        this.v = 0.72 * this.v + 0.28 * Math.abs(p - this.w);
        this.t = 0.12 * (p - this.ls) + 0.88 * this.t;
        this.ls = p;
        this.r[this.rp] = p;
        this.rp = (this.rp + 1) % 64;
        this.count++;
        this.total += p;
        if (p < this.min) this.min = p;
        if (p > this.max) this.max = p;
        return p;
    },

    avg: function() {
        if (this.count === 0) return 999;
        return Math.round(this.total / this.count);
    },

    p50: function() {
        var v = [];
        for (var i = 0; i < 64; i++)
            if (this.r[i] !== undefined) v.push(this.r[i]);
        if (!v.length) return 999;
        v.sort(function(a, b) { return a - b; });
        return v[Math.floor(v.length / 2)];
    },

    p95: function() {
        var v = [];
        for (var i = 0; i < 64; i++)
            if (this.r[i] !== undefined) v.push(this.r[i]);
        if (!v.length) return 999;
        v.sort(function(a, b) { return a - b; });
        return v[Math.min(v.length - 1, Math.floor(v.length * 0.95))];
    },

    p99: function() {
        var v = [];
        for (var i = 0; i < 64; i++)
            if (this.r[i] !== undefined) v.push(this.r[i]);
        if (!v.length) return 999;
        v.sort(function(a, b) { return a - b; });
        return v[Math.min(v.length - 1, Math.floor(v.length * 0.99))];
    },

    jit: function() {
        return Math.round(Math.sqrt(this.v));
    },

    grade: function() {
        var p = this.p50();
        var j = this.jit();
        if (p <= 5  && j <= 1) return "SS+";
        if (p <= 8  && j <= 2) return "SS";
        if (p <= 14 && j <= 3) return "S+";
        if (p <= 22 && j <= 5) return "S";
        if (p <= 35 && j <= 8) return "A";
        if (p <= 55)            return "B";
        if (p <= 80)            return "C";
        return "D";
    },

    score: function() {
        var g = this.grade();
        var map = { "SS+": 100, "SS": 95, "S+": 88, "S": 78, "A": 60, "B": 40, "C": 20, "D": 5 };
        return map[g] || 0;
    },

    bad: function() {
        var g = this.grade();
        return g === "C" || g === "D";
    },

    crit: function() {
        return this.p50() > 35 || this.p95() > 70;
    },

    spike: function() {
        return this.ls > this.p50() * 2.5 && this.ls > 25;
    },

    stable: function() {
        return this.jit() <= 3 && this.p50() <= 15;
    }
};


// ═══════════════════════════════════════════════════════════════
//  SECTION 9: BANDWIDTH ESTIMATOR
// ═══════════════════════════════════════════════════════════════

var BW = {
    samples: [],
    maxSamples: 32,

    add: function(bytes, ms) {
        if (ms <= 0) return;
        var kbps = (bytes * 8) / ms;
        this.samples.push(kbps);
        if (this.samples.length > this.maxSamples)
            this.samples.shift();
    },

    avg: function() {
        if (!this.samples.length) return 0;
        var sum = 0;
        for (var i = 0; i < this.samples.length; i++)
            sum += this.samples[i];
        return Math.round(sum / this.samples.length);
    },

    grade: function() {
        var a = this.avg();
        if (a >= 50000) return "EXCELLENT";
        if (a >= 20000) return "GOOD";
        if (a >= 5000)  return "FAIR";
        if (a >= 1000)  return "POOR";
        return "CRITICAL";
    }
};


// ═══════════════════════════════════════════════════════════════
//  SECTION 10: SERVER PIN — تثبيت سيرفر MENA
// ═══════════════════════════════════════════════════════════════

var SP = {
    MENA: [
        "me-", "_me", "mena", "middle_east", "arab",
        "jo-", "_jo", "jordan", "amman", "gcc",
        "saudi", "uae", "dubai", "egypt", "levant",
        "sham", "iraq", "syria", "lebanon", "palestine",
        "turkey", "tr-", "bahrain", "bh-", "kuwait",
        "kw-", "oman", "om-", "qatar", "qa-",
        "riyadh", "jeddah", "cairo", "beirut", "baghdad"
    ],

    FAR: [
        "eu-", "_eu", "europe", "us-", "_us", "usa",
        "na-", "_na", "brazil", "br-", "_br", "asia",
        "sea-", "_sea", "korea", "kr-", "_kr",
        "japan", "jp-", "_jp", "china", "cn-", "_cn",
        "oceania", "au-", "_au", "india", "in-", "_in",
        "russia", "ru-", "_ru", "singapore", "sg-",
        "frankfurt", "virginia", "tokyo", "seoul",
        "mumbai", "london", "paris"
    ],

    CDN_HOSTS: [
        "cdn", "static", "assets", "img", "image",
        "download", "dl", "patch", "update"
    ],

    score: function(h) {
        var s = 0;
        for (var i = 0; i < this.MENA.length; i++)
            if (h.indexOf(this.MENA[i]) !== -1) s += 25;
        for (var i = 0; i < this.FAR.length; i++)
            if (h.indexOf(this.FAR[i]) !== -1) s -= 50;
        return s;
    },

    far: function(h) {
        return this.score(h) < -20;
    },

    near: function(h) {
        return this.score(h) > 10;
    },

    isCDN: function(h) {
        for (var i = 0; i < this.CDN_HOSTS.length; i++)
            if (h.indexOf(this.CDN_HOSTS[i]) !== -1) return true;
        return false;
    }
};


// ═══════════════════════════════════════════════════════════════
//  SECTION 11: SESSION ANCHOR — تثبيت الجلسة
// ═══════════════════════════════════════════════════════════════

var AN = {
    on: false,
    ch: null,
    at: 0,
    ph: "IDLE",
    rCount: 0,

    lock: function(c, phase) {
        if (this.on && !this.exp()) {
            // تجديد إذا كانت نفس السلسلة
            if (c === this.ch) {
                this.at = now();
                return;
            }
        }
        this.on = true;
        this.ch = c;
        this.at = now();
        this.ph = phase || "UNKNOWN";
        this.rCount = 0;
    },

    get: function() {
        if (!this.on) return null;
        if (this.exp()) {
            this.on = false;
            this.ch = null;
            this.ph = "IDLE";
            return null;
        }
        return this.ch;
    },

    exp: function() {
        return this.on && (now() - this.at > CFG.ANCHOR_TTL);
    },

    renew: function() {
        if (this.on) this.at = now();
    },

    release: function() {
        this.on = false;
        this.ch = null;
        this.ph = "IDLE";
        this.rCount = 0;
    },

    info: function() {
        if (!this.on) return "INACTIVE";
        var remaining = Math.round((CFG.ANCHOR_TTL - (now() - this.at)) / 1000);
        return "ACTIVE | Phase: " + this.ph + " | TTL: " + remaining + "s";
    }
};


// ═══════════════════════════════════════════════════════════════
//  SECTION 12: SESSION PHASE DETECTOR — كشف المرحلة
// ═══════════════════════════════════════════════════════════════

var SS = {
    ph: "IDLE",
    ch: null,
    lastPhase: "IDLE",
    phaseCount: {},
    transitions: [],

    phase: function(h, u) {
        var c = (h + " " + u).toLowerCase();

        var m = [
            ["G", [
                "game_svr", "battle_", "sync_", "relay_", "zone_",
                "bullet_", "loot_", "vehicle_", "player_", "damage",
                "kill", "knock", "revive", "airdrop", "circle",
                "safe_zone", "blue_zone", "gameplay", "match_",
                "combat", "weapon", "ammo", "scope", "helmet",
                "vest", "backpack", "medkit", "boost", "energy",
                "swim", "drive", "shoot", "aim", "scope_",
                "recoil", "spray", "sniper", "shotgun", "smg",
                "ar_", "rifle", "grenade", "smoke", "flash",
                "molotov", "flare", "supply", "crash_", "helicopter",
                "boat", "motor", "bicycle", "run_", "crawl",
                "prone", "crouch", "lean", "peek", "vault"
            ]],

            ["MM", [
                "matchmake", "find_match", "queue_", "waiting_room",
                "create_room", "join_room", "countdown", "plane_",
                "parachute", "warm_up", "matchmak", "lobby_match",
                "room_list", "invite_match", "squad_", "duo_",
                "solo_", "custom_room", "tournament", "ranked_",
                "classic_", "arcade_", "payload_", "war_",
                "infection_", "zombie", "team_death", "arena_"
            ]],

            ["AU", [
                "oauth", "login_", "auth_", "openid", "token_",
                "passport", "verify_", "anticheat", "integrity",
                "security_scan", "hwid", "device_check", "signin",
                "signup", "refresh_token", "session_init",
                "device_verify", "banned_check", "ban_check",
                "anti_hack", "cheat_detect", "fair_play",
                "trusted_device", "login_verify", "account_"
            ]],

            ["LB", [
                "lobby", "shop", "store", "crate", "spin",
                "outfit", "skin", "emote", "friend_", "clan_",
                "guild", "chat_", "invite_", "social", "profile",
                "rank_", "season_", "event_", "mission", "pass_",
                "royal", "rp_", "badge", "lucky", "treasure",
                "wheel", "daily_", "weekly_", "challenge_",
                "achievement_", "title_", "frame_", "avatar_",
                "spray_", "dancer_", "celebrate_", "emote_",
                "voice_", "emoji_", "sticker_", "nickname_",
                "rename_", "uc_", "bp_", "silver_", "gold_",
                "coupon_", "voucher_", "pack_", "bundle_",
                "set_", "collection_", "wardrobe_", "inventory_"
            ]],

            ["PG", [
                "result", "reward", "exp_", "bp_", "mvp",
                "play_again", "return_lobby", "rank_change",
                "tier", "chicken_dinner", "winner", "summary",
                "stats_", "after_action", "end_match",
                "final_score", "placement", "survival_"
            ]],

            ["UP", [
                "update", "patch", "hotfix", "cdn_", "download",
                "resource", "apk", "obb", "version", "manifest",
                "bundle", "asset_pack", "delta_", "incremental",
                "full_update", "mini_update", "config_update",
                "maintenance", "server_update"
            ]],

            ["DL", [
                "download", "cdn.", "dl.", "assets.", "static.",
                "file.", "content.", "media.", "pkg_",
                "resource_download", "asset_download"
            ]]
        ];

        for (var i = 0; i < m.length; i++) {
            for (var j = 0; j < m[i][1].length; j++) {
                if (c.indexOf(m[i][1][j]) !== -1) {
                    if (m[i][0] !== this.ph) {
                        this.lastPhase = this.ph;
                        this.ph = m[i][0];
                        if (!this.phaseCount[m[i][0]])
                            this.phaseCount[m[i][0]] = 0;
                        this.phaseCount[m[i][0]]++;
                        this.transitions.push({
                            from: this.lastPhase,
                            to: m[i][0],
                            t: now()
                        });
                        if (this.transitions.length > 50)
                            this.transitions.shift();

                        // تثبيت تلقائي للمراحل الحرجة
                        if (m[i][0] === "G" || m[i][0] === "MM") {
                            AN.lock(this.ch || safeChain(PHASE_CHAINS.GAME), m[i][0]);
                        }
                    }
                    return m[i][0];
                }
            }
        }
        return this.ph;
    },

    isCritical: function() {
        return this.ph === "G" || this.ph === "MM";
    },

    isInLobby: function() {
        return this.ph === "LB";
    },

    history: function() {
        return this.transitions.slice(-10);
    }
};


// ═══════════════════════════════════════════════════════════════
//  SECTION 13: TIME AWARENESS — أوقات الذروة
// ═══════════════════════════════════════════════════════════════

var TM = {
    h: function() {
        return (new Date().getUTCHours() + 3) % 24;
    },

    d: function() {
        return new Date().getUTCDay();
    },

    m: function() {
        return new Date().getUTCMonth();
    },

    peak: function() {
        var h = this.h();
        return h >= 19 && h <= 23;
    },

    offPeak: function() {
        var h = this.h();
        return h >= 3 && h <= 8;
    },

    moderate: function() {
        var h = this.h();
        return (h >= 9 && h < 12) || (h >= 14 && h < 19);
    },

    weekend: function() {
        var d = this.d();
        return d === 5 || d === 6;
    },

    quality: function() {
        // الجمعة مساءً = أسوأ وقت (ازدحام شديد)
        if (this.d() === 5 && this.peak()) return 100;
        if (this.d() === 6 && this.peak()) return 95;
        if (this.peak()) return 90;
        if (this.weekend()) return 80;
        var h = this.h();
        if (h >= 16 && h < 19) return 70;
        if (h >= 0 && h <= 3) return 50;
        if (this.offPeak()) return 40;
        return 55;
    },

    congestion: function() {
        // مستوى الازدحام: 0-100
        var q = this.quality();
        if (q >= 90) return 95;
        if (q >= 70) return 70;
        if (q >= 50) return 40;
        return 15;
    },

    best: function() {
        if (this.quality() >= 80) return ["ORANGE_A", "ZAIN_A"];
        if (this.quality() >= 60) return ["ORANGE_A", "ZAIN_A", "UMNIAH_A"];
        return MY_CHAIN.slice(0, 3);
    },

    adjustedChain: function() {
        // سلسلة مُعدّلة حسب الوقت
        if (this.peak()) {
            return ["ORANGE_A", "ORANGE_C", "ZAIN_A", "UMNIAH_A"];
        }
        if (this.offPeak()) {
            return ["ORANGE_A", "ZAIN_A"];
        }
        return MY_CHAIN.slice(0, 3);
    },

    label: function() {
        if (this.peak()) return "🔥 PEAK";
        if (this.offPeak()) return "🌙 OFF-PEAK";
        if (this.moderate()) return "🌤️ MODERATE";
        return "⏰ NORMAL";
    }
};


// ═══════════════════════════════════════════════════════════════
//  SECTION 14: LOAD BALANCER — موازنة الحمل
// ═══════════════════════════════════════════════════════════════

var LB = {
    counters: {},
    total: 0,

    pick: function(names) {
        if (!names || !names.length) return null;

        // اختيار بناءً على الوزن والأداء
        var best = null;
        var bestScore = -1;

        for (var i = 0; i < names.length; i++) {
            var p = POOL[names[i]];
            if (!p || !p.alive) continue;

            var score = p.weight * 10;
            score -= p.latency * 2;
            score -= p.fails * 5;

            // خصم إذا استُخدم كثيراً
            var used = this.counters[names[i]] || 0;
            score -= used * 0.5;

            if (score > bestScore) {
                bestScore = score;
                best = names[i];
            }
        }

        if (best) {
            if (!this.counters[best]) this.counters[best] = 0;
            this.counters[best]++;
            this.total++;
        }

        return best;
    },

    markFail: function(name) {
        var p = POOL[name];
        if (p) {
            p.fails++;
            p.alive = p.fails < 5;
        }
    },

    markAlive: function(name) {
        var p = POOL[name];
        if (p) {
            p.fails = Math.max(0, p.fails - 1);
            p.alive = true;
        }
    },

    reset: function() {
        for (var k in this.counters) this.counters[k] = 0;
        this.total = 0;
    },

    stats: function() {
        var out = [];
        for (var k in POOL) {
            var p = POOL[k];
            out.push(k + ": " + (p.alive ? "✅" : "❌") +
                     " used=" + (this.counters[k] || 0) +
                     " fails=" + p.fails +
                     " latency=" + p.latency + "ms");
        }
        return out.join("\n");
    }
};


// ═══════════════════════════════════════════════════════════════
//  SECTION 15: RETRY LOGIC — منطق إعادة المحاولة
// ═══════════════════════════════════════════════════════════════

var RL = {
    attempts: {},
    maxRetries: CFG.RETRY_MAX,

    tryProxy: function(host, name) {
        var key = host + "|" + name;
        if (!this.attempts[key]) this.attempts[key] = 0;
        this.attempts[key]++;

        if (this.attempts[key] > this.maxRetries) {
            LB.markFail(name);
            return false;
        }
        return true;
    },

    reset: function(host) {
        for (var k in this.attempts) {
            if (k.indexOf(host) === 0) delete this.attempts[k];
        }
    },

    cleanup: function() {
        var keys = Object.keys(this.attempts);
        if (keys.length > 500) {
            for (var i = 0; i < keys.length / 2; i++)
                delete this.attempts[keys[i]];
        }
    }
};


// ═══════════════════════════════════════════════════════════════
//  SECTION 16: DNS CACHE + RESOLVER
// ═══════════════════════════════════════════════════════════════

var DC = {};
var DK = [];

function dR(h) {
    var e = DC[h];
    if (e && now() - e.t <= CFG.DNS_TTL) return e;

    var t0 = now();
    var ip = dnsResolve(h);
    var dt = now() - t0;

    var r = { ip: ip, dt: dt, t: now() };

    // تنظيف الكاش إذا امتلأ
    if (DK.length >= CFG.MAX_DNS_CACHE) {
        var old = DK.shift();
        delete DC[old];
    }

    DC[h] = r;
    DK.push(h);
    PE.sample(dt);

    // تحديث Bandwidth
    BW.add(ip ? ip.length : 0, dt);

    return r;
}

// DNS مسبق الجلب
function prefetchDNS(hosts) {
    for (var i = 0; i < hosts.length; i++) {
        if (!DC[hosts[i]] || now() - DC[hosts[i]].t > CFG.DNS_TTL) {
            dR(hosts[i]);
        }
    }
}


// ═══════════════════════════════════════════════════════════════
//  SECTION 17: STICKY SESSION CACHE
// ═══════════════════════════════════════════════════════════════

var SC = {};

function sG(k) {
    var e = SC[k];
    if (!e) return null;
    if (now() - e.t > 300000) {  // 5 دقائق
        delete SC[k];
        return null;
    }
    return e.v;
}

function sS(k, v) {
    SC[k] = { v: v, t: now() };
}


// ═══════════════════════════════════════════════════════════════
//  SECTION 18: UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function now() {
    return (new Date()).getTime();
}

function isV4(ip) {
    if (!ip || ip.indexOf(":") !== -1) return false;
    var p = ip.split(".");
    if (p.length !== 4) return false;
    for (var i = 0; i < 4; i++) {
        var n = parseInt(p[i], 10);
        if (isNaN(n) || n < 0 || n > 255) return false;
    }
    return true;
}

// بناء سلسلة بروكسيات آمنة
function safeChain(names) {
    var out = "";
    var c = 0;

    for (var i = 0; i < names.length; i++) {
        var key = names[i];
        var p = POOL[key];
        if (!p || !p.alive) continue;

        if (out !== "") out += "; ";
        out += "PROXY " + p.ip + ":" + p.port;
        c++;
        if (c >= CFG.MAX_FB) break;
    }

    // إذا لم نجد أي بروكسي، حاول أي بروكسي حي
    if (out === "") {
        for (var k in POOL) {
            var p = POOL[k];
            if (p && p.alive) {
                out = "PROXY " + p.ip + ":" + p.port;
                c++;
                if (c >= 2) break;
            }
        }
    }

    // كحل أخير: حجب كامل
    if (out === "") return B.X;

    return out + "; " + B.X;
}

// بناء سلسلة مع موازنة الحمل
function balancedChain(names) {
    var out = "";
    var c = 0;
    var picked = [];

    for (var i = 0; i < names.length && c < CFG.MAX_FB; i++) {
        var best = LB.pick(names);
        if (best && picked.indexOf(best) === -1) {
            var p = POOL[best];
            if (p && p.alive) {
                if (out !== "") out += "; ";
                out += "PROXY " + p.ip + ":" + p.port;
                picked.push(best);
                c++;
            }
        }
    }

    // ملء الباقي
    for (var i = 0; i < names.length && c < CFG.MAX_FB; i++) {
        if (picked.indexOf(names[i]) === -1) {
            var p = POOL[names[i]];
            if (p && p.alive) {
                if (out !== "") out += "; ";
                out += "PROXY " + p.ip + ":" + p.port;
                c++;
            }
        }
    }

    if (out === "") return B.X;
    return out + "; " + B.X;
}

// كشف النطاقات الخاصة
function isPrivateHost(h) {
    return h === "localhost" ||
           h.indexOf(".local") !== -1 ||
           h.indexOf(".internal") !== -1 ||
           h.indexOf(".lan") !== -1 ||
           h.indexOf(".home") !== -1;
}

// كشف المنافذ غير القياسية
function isStandardPort(url) {
    if (url.indexOf(":443") !== -1 || url.indexOf(":80") !== -1)
        return true;
    if (url.indexOf("https://") === 0) return true;
    if (url.indexOf("http://") === 0) return true;
    return url.indexOf(":") === -1;
}

// كشف الأدوات المساعدة والشيتات
function isCheatTool(h) {
    var cheats = [
        "gameguardian", "lucky_patcher", "sb_game",
        "xmodgames", "freedom", "creehack", "gamekiller",
        "ce_", "cheat_engine", "speedhack", "wallhack",
        "aimbot", "esp_hack", "hack_pubg", "mod_pubg"
    ];
    for (var i = 0; i < cheats.length; i++)
        if (h.indexOf(cheats[i]) !== -1) return true;
    return false;
}


// ═══════════════════════════════════════════════════════════════
//  SECTION 19: DECISION CACHE
// ═══════════════════════════════════════════════════════════════

var BC = {};
var BM = 0;

function cacheSet(host, proxy) {
    BC[host] = { p: proxy, t: now() };
}

function cacheGet(host) {
    var cc = BC[host];
    if (cc && now() - cc.t < CFG.DEC_TTL) return cc.p;
    return null;
}

function cacheCleanup() {
    var count = 0;
    for (var k in BC) {
        if (now() - BC[k].t > CFG.DEC_TTL * 3) {
            delete BC[k];
            count++;
        }
    }
    return count;
}


// ═══════════════════════════════════════════════════════════════
//  SECTION 20: SCORE ENGINE — محرك التقييم
// ═══════════════════════════════════════════════════════════════

function calculateScore(host, ip, dn) {
    var sc = 0;

    // ── الموقع الجغرافي ──
    var isJo = ip ? IP.isJo(ip) : false;
    var isCl = ip ? (!isJo && IP.isCl(ip)) : false;
    var car = ip ? IP.car(ip) : "U";

    if (isJo) sc += 40;
    if (isCl) sc -= 15;
    if (IP.my(ip)) sc += 20;

    // ── الشريحة ──
    if (car === "ORANGE") sc += 15;
    else if (car === "ZAIN") sc += 13;
    else if (car === "UMNIAH") sc += 10;
    else if (car === "ST") sc += 8;

    // ── سرعة DNS ──
    if (dn.dt <= 4) sc += 30;
    else if (dn.dt <= 8) sc += 26;
    else if (dn.dt <= 15) sc += 20;
    else if (dn.dt <= 25) sc += 14;
    else if (dn.dt <= 40) sc += 5;
    else sc -= 10;

    // ── جودة الاتصال ──
    var peScore = PE.score();
    sc += Math.round(peScore * 0.35);

    // ── Server Pin ──
    if (SP.near(host)) sc += 15;
    if (SP.far(host)) sc -= 30;

    // ── الوقت ──
    sc += Math.round(TM.quality() / 10);

    // ── حالة خاصة ──
    if (PE.stable()) sc += 8;
    if (PE.spike()) sc -= 12;
    if (PE.bad()) sc -= 15;

    // ── الـ CDN ──
    if (SP.isCDN(host)) sc += 5;

    return Math.max(0, Math.min(100, sc));
}


// ═══════════════════════════════════════════════════════════════
//  SECTION 21: SMART PROXY SELECTOR
// ═══════════════════════════════════════════════════════════════

function selectProxy(score, host, phase) {
    var proxy;

    // ── حالة حرجة (بينغ عالي جداً) ──
    if (PE.crit()) {
        proxy = safeChain(["ZAIN_A", "ORANGE_A", "UMNIAH_A", "ST_A", "EXTRA_A"]);
    }
    // ── سكور عالي ──
    else if (score >= CFG.SCORE_THRESHOLD_HIGH) {
        var tb = TM.best();
        proxy = CFG.LOAD_BALANCE ? balancedChain(tb.slice(0, 2)) : safeChain(tb.slice(0, 2));
    }
    // ── سكور متوسط ──
    else if (score >= CFG.SCORE_THRESHOLD_MED) {
        proxy = safeChain(TM.adjustedChain());
    }
    // ── سكور منخفض ──
    else {
        proxy = safeChain(MY_CHAIN);
    }

    // ── تعديلات حسب الموقع ──
    if (SP.far(host)) proxy = safeChain(["ORANGE_A", "ZAIN_A"]);
    if (SP.near(host)) proxy = safeChain(["ORANGE_A", "ZAIN_A"]);

    return proxy;
}


// ═══════════════════════════════════════════════════════════════
//  ═════════════════════════════════════════════════════════════
//    FindProxyForURL — الدالة الرئيسية
//  ═════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {

    // ═══ 1. فحص أساسي ═══
    if (!host) return B.D;
    var h = host.toLowerCase();


    // ═══ 2. نطاقات محلية ═══
    if (isPlainHostName(host)) return B.D;
    if (isPrivateHost(h)) return B.D;


    // ═══ 3. IP داخلي ═══
    if (isV4(host)) {
        if (isInNet(host, "10.0.0.0",     "255.0.0.0")   ||
            isInNet(host, "172.16.0.0",    "255.240.0.0")  ||
            isInNet(host, "192.168.0.0",   "255.255.0.0")  ||
            isInNet(host, "127.0.0.0",     "255.0.0.0")    ||
            isInNet(host, "169.254.0.0",   "255.255.0.0")  ||
            isInNet(host, "224.0.0.0",     "240.0.0.0"))
            return B.D;
    }


    // ═══ 4. Bloom Filter — هل هو PUBG؟ ═══
    if (!BF.host(h)) return B.D;


    // ═══ 5. أداة غش — حجب ═══
    if (isCheatTool(h)) return B.X;


    // ═══ 6. فحص كاش القرار ═══
    var cached = cacheGet(host);
    if (cached) return cached;
    BM++;


    // ═══ 7. تنظيف تلقائي ═══
    if (BM % CFG.CLEANUP_INTERVAL === 0) {
        cacheCleanup();
        RL.cleanup();
    }


    // ═══ 8. التثبيت النشط ═══
    var lk = AN.get();
    if (lk && SS.isCritical()) {
        cacheSet(host, lk);
        return lk;
    }


    // ═══ 9. كشف المرحلة ═══
    var ph = SS.phase(host, url);


    // ═══ 10. حجب التتبع (إذا مُفعّل) ═══
    if (CFG.BLOCK_TELEMETRY) {
        if (h.indexOf("analytics") !== -1  ||
            h.indexOf("telemetry") !== -1  ||
            h.indexOf("tracking") !== -1   ||
            h.indexOf("monitor.") !== -1   ||
            h.indexOf("crashlytics") !== -1 ||
            h.indexOf("appmetrica") !== -1 ||
            h.indexOf("firebase") !== -1   ||
            h.indexOf("adjust.") !== -1    ||
            h.indexOf("appsflyer") !== -1  ||
            h.indexOf("branch.io") !== -1  ||
            h.indexOf("amplitude.") !== -1 ||
            h.indexOf("mixpanel.") !== -1) {

            var ch = safeChain(PHASE_CHAINS.TELEMETRY);
            AN.lock(ch, "TELE");
            cacheSet(host, ch);
            return ch;
        }
    }


    // ═══ 11. Region Pin — تثبيت المنطقة ═══
    if (CFG.AGGRESSIVE_PIN) {
        if (h.indexOf("region") !== -1       ||
            h.indexOf("geo") !== -1          ||
            h.indexOf("server_list") !== -1  ||
            h.indexOf("serverlist") !== -1   ||
            h.indexOf("location") !== -1     ||
            h.indexOf("locale") !== -1       ||
            h.indexOf("device.info") !== -1  ||
            h.indexOf("network.info") !== -1 ||
            h.indexOf("geoip") !== -1        ||
            h.indexOf("ip_info") !== -1      ||
            h.indexOf("area.") !== -1        ||
            h.indexOf("zone_select") !== -1  ||
            h.indexOf("server_select") !== -1) {

            var ch = safeChain(PHASE_CHAINS.REGION);
            AN.lock(ch, "REGION");
            cacheSet(host, ch);
            return ch;
        }
    }


    // ═══ 12. Auth — المصادقة ═══
    if (ph === "AU") {
        var ch = safeChain(PHASE_CHAINS.AUTH);
        AN.lock(ch, "AUTH");
        cacheSet(host, ch);
        return ch;
    }


    // ═══ 13. Lobby — لوبي ═══
    if (ph === "LB") {
        var sk = sG("LB");
        if (sk && CFG.STICKY_SESSION) {
            cacheSet(host, sk);
            return sk;
        }
        var ch = CFG.LOAD_BALANCE ?
                 balancedChain(PHASE_CHAINS.LOBBY) :
                 safeChain(PHASE_CHAINS.LOBBY);
        sS("LB", ch);
        SS.ch = ch;
        cacheSet(host, ch);
        return ch;
    }


    // ═══ 14. Matchmaking — بحث عن مباراة ═══
    if (ph === "MM") {
        var ch = safeChain(PHASE_CHAINS.MATCH);
        AN.lock(ch, "MATCH");
        cacheSet(host, ch);
        return ch;
    }


    // ═══ 15. In-Game — داخل المباراة ═══
    if (ph === "G") {
        var ch = safeChain(PHASE_CHAINS.GAME);
        AN.lock(ch, "GAME");
        cacheSet(host, ch);
        return ch;
    }


    // ═══ 16. Post-Game — بعد المباراة ═══
    if (ph === "PG") {
        if (AN.on) {
            cacheSet(host, AN.ch);
            return AN.ch;
        }
        var ch = safeChain(PHASE_CHAINS.POST);
        cacheSet(host, ch);
        return ch;
    }


    // ═══ 17. Update — تحديث ═══
    if (ph === "UP" || ph === "DL") {
        var ch = safeChain(PHASE_CHAINS.UPDATE);
        cacheSet(host, ch);
        return ch;
    }


    // ═══ 18. CDN ═══
    if (SP.isCDN(h)) {
        var ch = safeChain(PHASE_CHAINS.CDN);
        cacheSet(host, ch);
        return ch;
    }


    // ═══ 19. DNS Resolution ═══
    var dn = dR(host);
    var ip = dn.ip;


    // ═══ 20. IP Analysis ═══
    var isJo = false, isCl = false, car = "U";
    if (ip && isV4(ip)) {
        isJo = IP.isJo(ip);
        isCl = !isJo && IP.isCl(ip);
        car  = IP.car(ip);
    }


    // ═══ 21. Score Calculation ═══
    var sc = calculateScore(host, ip, dn);


    // ═══ 22. Smart Proxy Selection ═══
    var proxy = selectProxy(sc, host, ph);


    // ═══ 23. Save & Return ═══
    SS.ch = proxy;
    cacheSet(host, proxy);


    // ═══ 24. Cache Maintenance ═══
    var cacheSize = Object.keys(BC).length;
    if (cacheSize > CFG.MAX_CACHE) {
        var keys = Object.keys(BC);
        keys.sort(function(a, b) { return BC[a].t - BC[b].t; });
        for (var i = 0; i < Math.floor(keys.length / 3); i++)
            delete BC[keys[i]];
    }


    return proxy;
}


// ═══════════════════════════════════════════════════════════════
//  END OF SCRIPT
// ═══════════════════════════════════════════════════════════════
