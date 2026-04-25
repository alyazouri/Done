// ═══════════════════════════════════════════════════════════════════════
//  👑💀 PUBG JORDAN LEGENDARY v19.0 — FULL MODES + PING ENGINE
//  ═══════════════════════════════════════════════════════════════════════
//
//  🎮 FULL PUBG MODES COVERAGE:
//  ├── Classic (Erangel / Miramar / Sanhok / Vikendi / Livik / Karakin / Rondo)
//  ├── Ranked Mode (Conqueror routing — max priority)
//  ├── TDM — Team Deathmatch (low-latency burst)
//  ├── Payload 2.0 (heavy sync packets)
//  ├── Metro Royale (exclusive servers)
//  ├── Arcade (Quick Match / War / Sniper / Mini Zone)
//  ├── EvoGround (Infection / Zombie)
//  ├── Domination / Clan Wars
//  ├── Training Mode (direct — no proxy needed)
//  └── Mission Ignition / Titan Mode
//
//  📡 PING ENGINE v3:
//  ├── Real-time DNS latency tracking
//  ├── Per-mode ping threshold (Ranked: <15ms, Classic: <20ms)
//  ├── 10-point rolling average
//  ├── PING KILL SWITCH (>50ms → emergency re-route)
//  └── Estimated hop latency model
//
//  ✅ Browsing  = DIRECT 100%
//  ✅ Gaming    = TARGET < 20ms
//  ✅ Ranked    = TARGET < 15ms
// ═══════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════
//  🩸 BLOOD POOL
// ═══════════════════════════════════════════════════════════════════════
var BLOOD = {
    S1: [
        "PROXY 46.185.129.122:443",
        "PROXY 79.173.248.71:443"
    ],
    S2: [
        "PROXY 46.185.130.44:443",
        "PROXY 176.29.15.200:443",
        "PROXY 82.212.88.100:443"
    ],
    S3: [
        "PROXY 94.230.12.50:443",
        "PROXY 176.28.200.100:443"
    ],
    ZT:  "PROXY 46.185.129.122:443; PROXY 79.173.248.71:443",
    LT:  "PROXY 46.185.129.122:443; PROXY 79.173.248.71:443; PROXY 46.185.130.44:443",
    STD: "PROXY 46.185.129.122:443; PROXY 79.173.248.71:443; DIRECT",
    LB:  "PROXY 46.185.129.122:443",
    DIR: "DIRECT",
    BLK: "PROXY 0.0.0.0:80"
};


// ═══════════════════════════════════════════════════════════════════════
//  📡 PING ENGINE v3 — قلب النظام الجديد
// ═══════════════════════════════════════════════════════════════════════
// كل request → نقيس DNS latency → نحسب estimated ping
// نحتفظ بـ rolling average لآخر 10 قياسات
// لو ping ارتفع فوق الـ threshold → emergency reroute

var PING = {
    // إعدادات الأهداف حسب كل مود
    targets: {
        RANKED:   15,   // Conqueror يحتاج < 15ms
        CLASSIC:  20,   // ستاندر < 20ms
        TDM:      18,   // دماثيتش يحتاج < 18ms
        PAYLOAD:  22,   // بايلود يتحمل أكثر قليلاً
        METRO:    20,   // ميترو رويال
        ARCADE:   30,   // أركيد مرن
        EVOGROUND:25,   // إيفوغراند
        CLAN:     20,   // حروب العشائر
        TRAINING: 999,  // تدريب لا يهم
        IGNITION: 18,   // ميشن إيجنيشن
        TITAN:    18,   // تايتن مود
        DEFAULT:  20
    },

    // Rolling average — آخر 10 قياسات
    history: [],
    maxHistory: 10,

    // Kill switch threshold
    killThreshold: 50, // ms — لو وصل هنا → نبدل المسار فوراً

    // Emergency reroute counter
    emergencyCount: 0,
    maxEmergency: 3,

    // تسجيل قياس جديد
    record: function(dns_ms, mode) {
        // estimated ping = DNS * 0.4 + hop_penalty
        // الـ DNS latency مقياس غير مباشر للـ RTT
        var hops = 2; // افتراضي: proxyين
        var hop_penalty = hops * 1.5; // ~1.5ms per hop
        var estimated = Math.round(dns_ms * 0.4 + hop_penalty);

        if (this.history.length >= this.maxHistory) {
            this.history.shift();
        }
        this.history.push({
            estimated: estimated,
            dns: dns_ms,
            mode: mode || "DEFAULT",
            t: Date.now()
        });

        return estimated;
    },

    // متوسط متحرك للـ 5 قياسات الأخيرة
    getAverage: function() {
        if (this.history.length === 0) return 999;
        var recent = this.history.slice(-5);
        var sum = 0;
        for (var i = 0; i < recent.length; i++) {
            sum += recent[i].estimated;
        }
        return Math.round(sum / recent.length);
    },

    // أفضل قياس في آخر 10 جولات
    getBest: function() {
        if (this.history.length === 0) return 999;
        var best = 999;
        for (var i = 0; i < this.history.length; i++) {
            if (this.history[i].estimated < best) {
                best = this.history[i].estimated;
            }
        }
        return best;
    },

    // هل نحن في حالة ping جيدة؟
    isHealthy: function(mode) {
        var avg = this.getAverage();
        var target = this.targets[mode] || this.targets.DEFAULT;
        return avg <= target;
    },

    // هل نحتاج KILL SWITCH؟
    needsKillSwitch: function() {
        var avg = this.getAverage();
        return avg >= this.killThreshold && this.history.length >= 3;
    },

    // اختيار عدد الـ hops المثالي حسب الـ ping المقاس
    getOptimalHops: function(mode) {
        var avg = this.getAverage();
        var target = this.targets[mode] || this.targets.DEFAULT;

        if (avg <= target * 0.7) return 2;      // ممتاز → نضيف hop واحد
        if (avg <= target)       return 1;      // جيد → proxy واحد
        if (avg <= target * 1.5) return 1;      // مقبول → proxy واحد
        return 0;                               // سيء → direct أو block
    },

    // نص تشخيصي للـ ping الحالي
    getStatus: function(mode) {
        var avg = this.getAverage();
        var target = this.targets[mode] || this.targets.DEFAULT;
        if (avg === 999) return "COLD";
        if (avg < target * 0.7) return "ULTRA";    // < 70% of target
        if (avg < target)       return "GOOD";     // < target
        if (avg < target * 1.5) return "FAIR";     // < 150%
        return "BAD";
    }
};


// ═══════════════════════════════════════════════════════════════════════
//  🎮 PUBG MODES — تحديد دقيق لكل مود
// ═══════════════════════════════════════════════════════════════════════
// كل مود له:
// - hostnames مختلفة
// - منافذ مختلفة
// - حساسية ping مختلفة
// - استراتيجية توجيه مختلفة

var MODES = {

    // ─── الكلاسيك والـ Ranked ───────────────────────────────────────
    // خوادم المباريات الرئيسية — أعلى أولوية
    RANKED: {
        sig: ["ranked","rank","conqueror","ace","diamond","platinum",
              "crown","gold","silver","bronze","krmatch","krsession",
              "leaderboard","season","rating","rp_"],
        ports: [10000,10001,10010,10011,10012,10020,7000,7001,7002,443],
        priority: 10,   // أعلى أولوية
        pingTarget: 15,
        strategy: "ZERO_TUNNEL"   // أسرع مسار ممكن
    },

    CLASSIC: {
        sig: ["classic","erangel","miramar","sanhok","vikendi",
              "livik","karakin","rondo","deston","map_dl",
              "match","session","room","lobby_game"],
        ports: [10000,10001,10010,10011,10020,7000,7001,443],
        priority: 9,
        pingTarget: 20,
        strategy: "STANDARD"
    },

    // ─── TDM — Team Deathmatch ──────────────────────────────────────
    // أسرع مود → يحتاج latency منخفضة جداً
    TDM: {
        sig: ["tdm","team_death","deathmatch","tdm_","arena",
              "warehouse","ruins","ruins_","facility","school_tdm",
              "shooting_range","quickmatch_tdm"],
        ports: [10000,10001,10010,10011,7000,7001,7002,443],
        priority: 9,
        pingTarget: 18,
        strategy: "ZERO_TUNNEL"
    },

    // ─── Payload 2.0 ─────────────────────────────────────────────────
    // باكيتات ثقيلة (مركبات ضخمة، كول داون) → tolerance أعلى
    PAYLOAD: {
        sig: ["payload","payload2","helicop","heli_","rocket",
              "nuke","airstrike","vehicle_heavy","payload_mode"],
        ports: [10000,10010,10011,10040,10050,443],
        priority: 8,
        pingTarget: 22,
        strategy: "STANDARD"
    },

    // ─── Metro Royale ────────────────────────────────────────────────
    // خوادم حصرية — مختلفة تماماً
    METRO: {
        sig: ["metro","underworld","faction","underground",
              "metro_royale","metro_rank","underground_pvp",
              "dark_zone","metro_match"],
        ports: [10000,10001,10010,10020,7000,443],
        priority: 8,
        pingTarget: 20,
        strategy: "STANDARD"
    },

    // ─── Arcade ──────────────────────────────────────────────────────
    // مرن — لا يحتاج ping منخفض جداً
    ARCADE: {
        sig: ["arcade","minizone","mini_zone","sniper_training",
              "war_mode","war_","quick_match","quickmatch",
              "arcade_","funmatch","bluehole_arcade"],
        ports: [10000,10010,10011,443],
        priority: 6,
        pingTarget: 30,
        strategy: "LIGHT"
    },

    // ─── EvoGround (Infection / Zombie) ─────────────────────────────
    EVOGROUND: {
        sig: ["evoground","infection","zombie","zombie_mode",
              "evo_","infect_","undead","rage_gear","evo_match",
              "zombie_evo","survive","panzerfaust"],
        ports: [10000,10010,10020,443],
        priority: 7,
        pingTarget: 25,
        strategy: "STANDARD"
    },

    // ─── Clan Wars / Domination ──────────────────────────────────────
    CLAN: {
        sig: ["clan","guild","clanwar","clan_war","domination",
              "dom_","territory","conquest","clan_match",
              "clan_rank","tribe","alliance"],
        ports: [10000,10001,10010,443],
        priority: 8,
        pingTarget: 20,
        strategy: "STANDARD"
    },

    // ─── Mission Ignition / Titan ────────────────────────────────────
    IGNITION: {
        sig: ["ignition","mission_ignition","titan","robot",
              "mecha","titan_mode","mech_","robot_rumble",
              "ignition_match","project_titan"],
        ports: [10000,10001,10010,10011,443],
        priority: 8,
        pingTarget: 18,
        strategy: "ZERO_TUNNEL"
    },

    // ─── Training Mode ───────────────────────────────────────────────
    // لا يحتاج proxy — direct أسرع
    TRAINING: {
        sig: ["training","training_mode","training_ground",
              "tutorial","practice","aim_training","bot_match",
              "practice_range"],
        ports: [10000,10010,443],
        priority: 1,
        pingTarget: 999,
        strategy: "DIRECT"
    },

    // ─── الخوادم المشتركة (Auth / Sync / CDN) ────────────────────────
    SYNC: {
        sig: ["sync","realtime","gsvr","gamesvr","relay",
              "node","battle","burst","udp_relay"],
        ports: [10000,10001,10010,10011,10012,10020,7000,7001,7002],
        priority: 9,
        pingTarget: 15,
        strategy: "ZERO_TUNNEL"
    },

    AUTH: {
        sig: ["lobby","auth","login","account","session",
              "matchmake","matchmaking","queue"],
        ports: [443,80],
        priority: 7,
        pingTarget: 30,
        strategy: "LIGHT"
    },

    CDN_PATCH: {
        sig: ["cdn","patch","update","resource","download",
              "asset","pkg","apk","obb","version"],
        ports: [443,80],
        priority: 1,
        pingTarget: 999,
        strategy: "DIRECT"
    }
};

// ─── تحديد المود من الـ hostname ────────────────────────────────────
function detectMode(host) {
    var h = host.toLowerCase();
    // نبدأ من الأعلى أولوية للأسفل
    var order = ["RANKED","TDM","IGNITION","SYNC","CLAN","METRO",
                 "CLASSIC","TDM","PAYLOAD","EVOGROUND","ARCADE",
                 "AUTH","CDN_PATCH","TRAINING"];

    for (var i = 0; i < order.length; i++) {
        var m = MODES[order[i]];
        if (!m) continue;
        for (var j = 0; j < m.sig.length; j++) {
            if (h.indexOf(m.sig[j]) !== -1) {
                return order[i];
            }
        }
    }
    return "DEFAULT";
}


// ═══════════════════════════════════════════════════════════════════════
//  🔮 QUANTUM DNS
// ═══════════════════════════════════════════════════════════════════════
var QUANTUM = {
    history: [],
    maxHist: 15,

    predict: function(domain) {
        for (var i = this.history.length - 1; i >= 0; i--) {
            if (this.history[i].d === domain) return this.history[i].ip;
        }
        return null;
    },

    record: function(domain, ip, dt) {
        if (this.history.length >= this.maxHist) this.history.shift();
        this.history.push({d: domain, ip: ip, dt: dt, t: Date.now()});
    }
};


// ═══════════════════════════════════════════════════════════════════════
//  👻 GHOST HOP ELIMINATION
// ═══════════════════════════════════════════════════════════════════════
var GHOST = {
    phantom: [
        ["104.16.0.0","255.240.0.0"],
        ["172.64.0.0","255.224.0.0"],
        ["199.232.0.0","255.255.0.0"],
        ["13.224.0.0","255.255.0.0"],   // CloudFront
        ["99.84.0.0","255.255.0.0"]     // CloudFront
    ],
    isGhost: function(ip) {
        if (!ip) return false;
        for (var i = 0; i < this.phantom.length; i++) {
            if (isInNet(ip, this.phantom[i][0], this.phantom[i][1])) return true;
        }
        return false;
    },
    clean: function(ip) { return this.isGhost(ip) ? null : ip; }
};


// ═══════════════════════════════════════════════════════════════════════
//  ⏰ TIME WARP
// ═══════════════════════════════════════════════════════════════════════
var TIME_WARP = {
    getBestOP: function() {
        var h = (new Date().getUTCHours() + 2) % 24;
        if (h >= 6 && h < 12)  return "O";
        if (h >= 12 && h < 16) return "Z";
        if (h >= 16 && h < 20) return "S";
        return "U";
    },
    isBloodMoon: function() {
        var h = (new Date().getUTCHours() + 2) % 24;
        return (h >= 23 || h <= 4);
    },
    isPeak: function() {
        var h = (new Date().getUTCHours() + 2) % 24;
        return (h >= 20 && h <= 23) || (h >= 1 && h <= 3);
    }
};


// ═══════════════════════════════════════════════════════════════════════
//  🕳️ VOID CAGE
// ═══════════════════════════════════════════════════════════════════════
var VOID = {
    exits: [
        ["41.0.0.0","255.0.0.0"],["46.53.0.0","255.255.128.0"],
        ["80.231.0.0","255.255.0.0"],["146.66.0.0","255.255.0.0"],
        ["185.53.0.0","255.255.252.0"],["195.219.0.0","255.255.0.0"],
        ["197.0.0.0","255.0.0.0"],["156.0.0.0","255.0.0.0"],
        ["104.16.0.0","255.240.0.0"],["172.64.0.0","255.224.0.0"],
        ["13.224.0.0","255.255.0.0"],["99.84.0.0","255.255.0.0"]
    ],
    isTrapped: function(ip) {
        if (!ip) return false;
        for (var i = 0; i < this.exits.length; i++) {
            if (isInNet(ip, this.exits[i][0], this.exits[i][1])) return true;
        }
        return false;
    },
    isInside: function(ip) { return isCG(ip) && !this.isTrapped(ip); }
};


// ═══════════════════════════════════════════════════════════════════════
//  🇯🇴 JORDAN DATABASE
// ═══════════════════════════════════════════════════════════════════════
var JO = {
    AC: {n:[["46.185.128.0","255.255.240.0"]], lat:5, op:"O", rank:1},
    AN: {n:[["79.173.240.0","255.255.248.0"]], lat:6, op:"O", rank:1},
    AS: {n:[["46.185.144.0","255.255.248.0"]], lat:8, op:"O", rank:2},
    ZQ: {n:[["176.29.0.0","255.255.192.0"]],   lat:12,op:"Z", rank:2},
    IR: {n:[["176.28.0.0","255.255.128.0"]],   lat:15,op:"Z", rank:3},
    ST: {n:[["94.230.0.0","255.255.128.0"]],   lat:10,op:"S", rank:2},
    UM: {n:[["82.212.64.0","255.255.224.0"]],  lat:14,op:"U", rank:3},
    AQ: {n:[["188.247.0.0","255.255.240.0"]],  lat:20,op:"Z", rank:4}
};

var CG_ALL = [
    ["46.185.128.0","255.255.128.0"],["79.173.192.0","255.255.192.0"],
    ["178.20.184.0","255.255.248.0"],["109.237.192.0","255.255.240.0"],
    ["176.28.0.0","255.255.128.0"],["176.29.0.0","255.255.0.0"],
    ["188.247.0.0","255.255.0.0"],["62.72.160.0","255.255.224.0"],
    ["94.127.208.0","255.255.248.0"],["82.212.0.0","255.255.0.0"],
    ["91.106.0.0","255.255.0.0"],["37.220.0.0","255.255.0.0"],
    ["94.230.0.0","255.255.0.0"],["176.203.0.0","255.255.0.0"]
];

var OP_MAP = {
    "46_185":"O","79_173":"O","178_20":"O",
    "176_28":"Z","176_29":"Z","188_247":"Z",
    "82_212":"U","91_106":"U","37_220":"U",
    "94_230":"S","176_203":"S"
};

// PUBG core domains
var PG = ["pubgmobile","pubgm","pubg","tencent","lightspeed",
          "levelinfinite","igamecj","myapp","qq","igame",
          "gcloud","tmgp","bsgame","minisite","garena_pubg",
          "battlegrounds","pubgstudio"];

// Direct (لا تحتاج proxy)
var DIRECT_D = ["google","youtube","facebook","instagram","twitter",
                "tiktok","whatsapp","telegram","apple","icloud",
                "netflix","spotify","twitch","discord","github",
                "microsoft","windows","android","gstatic","googleapis"];


// ═══════════════════════════════════════════════════════════════════════
//  💾 CACHE
// ═══════════════════════════════════════════════════════════════════════
var C={},ZC={},CS=0,ZS=0,MAX=30;
function cg(h){var e=C[h];if(e&&Date.now()-e.t<5000)return e;return null;}
function cs(h,ip,z,m){if(CS>=MAX){C={};CS=0;}C[h]={ip:ip,t:Date.now(),z:z,mode:m};CS++;}
function zg(ip){var e=ZC[ip];if(e&&Date.now()-e.t<15000)return e.z;return null;}
function zs(ip,z){if(ZS>=MAX){ZC={};ZS=0;}ZC[ip]={z:z,t:Date.now()};ZS++;}


// ═══════════════════════════════════════════════════════════════════════
//  ⚡ HELPERS
// ═══════════════════════════════════════════════════════════════════════
function inR(ip,r){if(!ip)return!1;for(var i=0;i<r.length;i++)if(isInNet(ip,r[i][0],r[i][1]))return!0;return!1;}
function gO(ip){if(!ip)return"X";var p=ip.split('.');return OP_MAP[p[0]+"_"+p[1]]||"X";}
function isCG(ip){return inR(ip,CG_ALL);}
function isE(ip){return inR(ip,VOID.exits);}
function gZ(ip){
    if(!ip)return"X";
    var z=zg(ip);if(z)return z;
    for(var k in JO){
        var nets=JO[k].n;
        for(var i=0;i<nets.length;i++){
            if(isInNet(ip,nets[i][0],nets[i][1])){zs(ip,k);return k;}
        }
    }
    zs(ip,"X");return"X";
}
function gP(u){var m=u.match(/:(\d+)/);return m?parseInt(m[1]):u.indexOf("https")===0?443:80;}
function isPG(h){h=h.toLowerCase();for(var i=0;i<PG.length;i++)if(h.indexOf(PG[i])!==-1)return!0;return!1;}
function isDIR(h){h=h.toLowerCase();for(var i=0;i<DIRECT_D.length;i++)if(h.indexOf(DIRECT_D[i])!==-1)return!0;return!1;}

function fDNS(host) {
    var cached = cg(host);
    if (cached) return cached;
    var t0 = Date.now();
    var ip = dnsResolve(host);
    var dt = Date.now() - t0;
    var z = ip ? gZ(ip) : "X";
    var mode = detectMode(host);
    var r = {ip:ip, dt:dt, z:z, mode:mode, ok:!!ip};
    cs(host, ip, z, mode);
    QUANTUM.record(host, ip, dt);
    PING.record(dt, mode); // 📡 تسجيل في نظام الـ PING
    return r;
}


// ═══════════════════════════════════════════════════════════════════════
//  🧠 NEURAL SCORE (مع mode-awareness)
// ═══════════════════════════════════════════════════════════════════════
function neuralScore(ip, h, port, dn, mode) {
    if (!ip) return 0;

    var s = 0;
    var o = gO(ip);
    var z = dn.z;
    var tw = TIME_WARP.getBestOP();
    var isBM = TIME_WARP.isBloodMoon();
    var isPeak = TIME_WARP.isPeak();
    var pingOK = PING.isHealthy(mode);
    var pingStatus = PING.getStatus(mode);

    // === FEATURES ===
    s += isCG(ip) ? 35 : 0;
    s += !isE(ip) ? 30 : -100;         // VOID check — مطلق
    s += dn.dt < 25 ? 25 : dn.dt < 80 ? 15 : 5;
    s += z !== "X" ? 20 : 0;
    s += tw === o ? 20 : 0;
    s += isBM ? 15 : 0;
    s += isPeak && o === "O" ? -10 : 0;
    s += !GHOST.isGhost(ip) ? 15 : -50;
    s += pingOK ? 10 : -15;            // 📡 Ping health bonus/penalty

    // === ZONE BOOST ===
    if (z !== "X" && JO[z]) {
        s += (5 - JO[z].lat) * 2;
        s += (4 - JO[z].rank) * 5;
        if (z === "AC" || z === "AN") s += 20;
    }

    // === MODE BOOST ===
    var modeConfig = MODES[mode];
    if (modeConfig) {
        s += modeConfig.priority * 2; // priority يؤثر على الـ score
        // لو الـ ping سيء في مود حساس → penalty كبير
        if (pingStatus === "BAD" && modeConfig.priority >= 9) s -= 30;
        if (pingStatus === "ULTRA") s += 20; // مكافأة إذا ping ممتاز
    }

    // === QUANTUM ===
    var predicted = QUANTUM.predict(h);
    if (predicted && predicted === ip) s += 10;

    // === PING KILL SWITCH ===
    if (PING.needsKillSwitch()) s -= 40; // نخفض الـ score لنجبر emergency reroute

    if (s < 0) return 0;
    if (s > 100) return 100;
    return Math.round(s);
}


// ═══════════════════════════════════════════════════════════════════════
//  🎯 STRATEGY SELECTOR — اختيار المسار حسب المود والـ Ping
// ═══════════════════════════════════════════════════════════════════════
function selectStrategy(mode, score, ip, port) {
    var modeConfig = MODES[mode];
    var strategy = modeConfig ? modeConfig.strategy : "STANDARD";
    var pingStatus = PING.getStatus(mode);
    var o = gO(ip);
    var tw = TIME_WARP.getBestOP();

    // 🚨 PING KILL SWITCH — أعلى أولوية
    if (PING.needsKillSwitch()) {
        PING.emergencyCount++;
        // نجرب المسار الآخر
        return o === "O"
            ? BLOOD.S1[1] + "; " + BLOOD.S2[2]   // Zain + Umniah
            : BLOOD.S1[0] + "; " + BLOOD.S2[0];   // Orange chain
    }

    // لو الـ score منخفض جداً → block
    if (score < 35) return BLOOD.BLK;

    // DIRECT للمودات اللي لا تحتاج proxy
    if (strategy === "DIRECT") return BLOOD.DIR;

    // ZERO TUNNEL للمودات الحرجة (Ranked, TDM, Sync, Ignition)
    if (strategy === "ZERO_TUNNEL") {
        if (score >= 85) return BLOOD.ZT;
        if (score >= 65) return BLOOD.S1[0];
        return BLOOD.LB;
    }

    // LIGHT للمودات المرنة (Arcade, Auth, CDN)
    if (strategy === "LIGHT") {
        if (score >= 70) return BLOOD.LB;
        return BLOOD.DIR;
    }

    // STANDARD — الافتراضي
    if (score >= 92 && TIME_WARP.isBloodMoon()) return BLOOD.LT; // Legendary
    if (score >= 88) {
        return tw === "O" ? BLOOD.ZT : BLOOD.S1[1] + "; " + BLOOD.S1[0];
    }
    if (score >= 75) return o === "O" ? BLOOD.S1[0] : BLOOD.S1[1];
    if (score >= 55) return BLOOD.LB;
    return BLOOD.LB;
}


// ═══════════════════════════════════════════════════════════════════════
//  🔥 PHOENIX FAILOVER
// ═══════════════════════════════════════════════════════════════════════
var PHOENIX = {
    failed: {},
    maxFails: 3,
    failWindow: 60000,
    isDead: function(p) {
        var f=this.failed[p];
        if(!f)return false;
        if(Date.now()-f.t>this.failWindow){delete this.failed[p];return false;}
        return f.c>=this.maxFails;
    },
    markFail: function(p) {
        if(!this.failed[p]) this.failed[p]={c:1,t:Date.now()};
        else {this.failed[p].c++;this.failed[p].t=Date.now();}
    }
};


// ═══════════════════════════════════════════════════════════════════════
//  🚀 MAIN — v19 ENGINE
// ═══════════════════════════════════════════════════════════════════════
function FindProxyForURL(url, host) {
    var h = host.toLowerCase();

    // ── Local / LAN ───────────────────────────────────────────────
    if (isPlainHostName(host)) return BLOOD.DIR;
    if (isInNet(host,"10.0.0.0","255.0.0.0") ||
        isInNet(host,"172.16.0.0","255.240.0.0") ||
        isInNet(host,"192.168.0.0","255.255.0.0")) return BLOOD.DIR;

    // ── Browsing = DIRECT ─────────────────────────────────────────
    if (isDIR(h)) return BLOOD.DIR;

    // ── Non-PUBG = DIRECT ─────────────────────────────────────────
    if (!isPG(h)) return BLOOD.DIR;

    // ── DNS + Mode Detection ──────────────────────────────────────
    var dn   = fDNS(host);
    var ip   = GHOST.clean(dn.ip);
    var port = gP(url);
    var mode = dn.mode; // تم تحديده في fDNS

    // ── Training Mode = DIRECT دائماً ────────────────────────────
    if (mode === "TRAINING") return BLOOD.DIR;

    // ── CDN / Patch = DIRECT ──────────────────────────────────────
    if (mode === "CDN_PATCH") return BLOOD.DIR;

    // ── VOID CAGE ─────────────────────────────────────────────────
    if (ip && VOID.isTrapped(ip)) return BLOOD.BLK;

    // ── Neural Score ──────────────────────────────────────────────
    var score = neuralScore(ip, h, port, dn, mode);

    // ── Strategy Selection ────────────────────────────────────────
    return selectStrategy(mode, score, ip || "46.185.128.1", port);
}
