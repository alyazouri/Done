// ═══════════════════════════════════════════════════════════════════════
//  PUBG JORDAN LEGENDARY v28.0 — ULTIMATE DOMESTIC OMEGA PAC
//  iPad Pro / iOS Advanced PAC System
//  
//  المميزات الجديدة:
//  ✅ نظام AI متقدم لاختيار المسار الأمثل
//  ✅ Jordan-First Routing مع Smart Fallback
//  ✅ Advanced Health Monitoring
//  ✅ Multi-Layer Security System
//  ✅ Dynamic Load Balancing
//  ✅ Enhanced Lobby Lock للماتشات الأردنية
//  ✅ Adaptive Performance Tuning
//  ✅ Real-time Quality Scoring
// ═══════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════
//  ADVANCED CONFIG
// ═══════════════════════════════════════════════════════════════════════

var CFG = {
    // Security Layer
    NO_DIRECT_FOR_PUBG: true,
    PROXY_EXIT_JORDAN_ONLY: true,
    FAIL_CLOSED: true,
    
    // Smart Lock System (بدل Hard Lock الثابت)
    SMART_DESTINATION_LOCK: true,
    LOCK_GRACE_PERIOD: 45000,        // 45 ثانية grace period
    
    // Performance
    MAX_PROXY_FALLBACKS: 5,
    DNS_CACHE_TTL: 15000,
    DNS_CACHE_MAX: 120,
    STICKY_TTL: 240000,              // 4 دقائق
    
    // Advanced Features
    ENABLE_LOAD_BALANCING: true,
    ENABLE_HEALTH_CHECK: true,
    ENABLE_ADAPTIVE_ROUTING: true,
    
    // CDN Strategy
    ALLOW_CDN_DIRECT: false,
    CDN_PREFER_JORDAN: true,
    
    // Debug & Monitoring
    PERFORMANCE_MODE: "BALANCED",    // AGGRESSIVE | BALANCED | SAFE
    LIGHT_MODE: false
};


// ═══════════════════════════════════════════════════════════════════════
//  TIMING & SESSION MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════

var SESSION = {
    start: (new Date()).getTime(),
    requestCount: 0,
    pubgRequests: 0,
    
    age: function() {
        return (new Date()).getTime() - this.start;
    },
    
    isWarmup: function() {
        return this.age() < CFG.LOCK_GRACE_PERIOD;
    },
    
    isEstablished: function() {
        return this.pubgRequests >= 10;
    }
};


// ═══════════════════════════════════════════════════════════════════════
//  ENHANCED JORDAN PROXY POOL
// ═══════════════════════════════════════════════════════════════════════

var PROXY_POOL = {
    // Tier 1: Premium Jordan Proxies
    ORANGE_PRIME: {
        ip: "94.127.211.6",
        port: 20001,
        carrier: "ORANGE",
        tier: 1,
        reliability: 95,
        avgPing: 12,
        maxLoad: 100
    },
    
    ORANGE_ALPHA: {
        ip: "149.200.136.6",
        port: 443,
        carrier: "ORANGE",
        tier: 1,
        reliability: 93,
        avgPing: 15,
        maxLoad: 100
    },
    
    ZAIN_PRIME: {
        ip: "109.237.193.187",
        port: 80,
        carrier: "ZAIN",
        tier: 1,
        reliability: 92,
        avgPing: 14,
        maxLoad: 90
    },
    
    UMNIAH_PRIME: {
        ip: "212.35.85.26",
        port: 80,
        carrier: "UMNIAH",
        tier: 1,
        reliability: 90,
        avgPing: 16,
        maxLoad: 85
    },
    
    // Tier 2: Backup Jordan Proxies
    ZAIN_BETA: {
        ip: "79.173.192.10",
        port: 8080,
        carrier: "ZAIN",
        tier: 2,
        reliability: 85,
        avgPing: 20,
        maxLoad: 70
    },
    
    ORANGE_BETA: {
        ip: "46.185.128.5",
        port: 3128,
        carrier: "ORANGE",
        tier: 2,
        reliability: 88,
        avgPing: 18,
        maxLoad: 75
    },
    
    // Tier 3: Emergency Fallback (محدود الاستخدام)
    REGIONAL_BACKUP: {
        ip: "188.247.66.133",
        port: 80,
        carrier: "REGIONAL",
        tier: 3,
        reliability: 70,
        avgPing: 35,
        maxLoad: 50
    }
};

var BLOOD = {
    DIR: "DIRECT",
    BLK: "PROXY 0.0.0.0:80; PROXY 127.0.0.1:1"
};


// ═══════════════════════════════════════════════════════════════════════
//  PROXY HEALTH TRACKER
// ═══════════════════════════════════════════════════════════════════════

var HEALTH = {};

function initHealth() {
    for (var name in PROXY_POOL) {
        HEALTH[name] = {
            uses: 0,
            failures: 0,
            lastUse: 0,
            load: 0,
            status: "READY"
        };
    }
}

function updateHealth(name, success) {
    if (!HEALTH[name]) return;
    
    HEALTH[name].uses++;
    HEALTH[name].lastUse = now();
    
    if (!success) {
        HEALTH[name].failures++;
    }
    
    // Calculate load percentage
    var proxy = PROXY_POOL[name];
    if (proxy) {
        HEALTH[name].load = Math.min(100, (HEALTH[name].uses / proxy.maxLoad) * 100);
        
        // Update status
        if (HEALTH[name].failures > 5) {
            HEALTH[name].status = "DEGRADED";
        } else if (HEALTH[name].load > 90) {
            HEALTH[name].status = "CONGESTED";
        } else {
            HEALTH[name].status = "HEALTHY";
        }
    }
}

function getProxyHealth(name) {
    return HEALTH[name] || { status: "UNKNOWN", load: 100 };
}

initHealth();


// ═══════════════════════════════════════════════════════════════════════
//  COMPREHENSIVE JORDAN IP DATABASE
// ═══════════════════════════════════════════════════════════════════════

var JO_NETS = [
    // Orange Jordan
    ["46.185.128.0", "20"],
    ["46.185.144.0", "21"],
    ["94.127.208.0", "20"],
    ["149.200.136.0", "22"],
    
    // Zain Jordan
    ["79.173.192.0", "18"],
    ["79.173.240.0", "21"],
    ["109.237.192.0", "20"],
    ["176.28.0.0", "17"],
    ["176.29.0.0", "16"],
    
    // Umniah Jordan
    ["82.212.0.0", "16"],
    ["82.212.64.0", "19"],
    ["212.35.64.0", "19"],
    
    // Jordan Telecom / Government
    ["188.247.0.0", "16"],
    ["62.72.160.0", "19"],
    ["94.230.0.0", "16"],
    ["91.106.0.0", "16"],
    ["37.220.0.0", "16"],
    ["176.203.0.0", "16"],
    ["178.20.184.0", "21"]
];

var CLOUD_FOREIGN_NETS = [
    // Cloudflare
    ["104.16.0.0", "12"],
    ["172.64.0.0", "13"],
    ["188.114.96.0", "20"],
    ["162.158.0.0", "15"],
    
    // AWS / CloudFront
    ["13.224.0.0", "14"],
    ["99.84.0.0", "16"],
    ["52.84.0.0", "15"],
    ["54.192.0.0", "16"],
    
    // Fastly
    ["151.101.0.0", "16"],
    ["199.232.0.0", "16"],
    
    // Akamai (partial)
    ["23.0.0.0", "8"],
    ["104.64.0.0", "10"]
];

var MENA_FRIENDLY_NETS = [
    // UAE
    ["5.0.0.0", "11"],
    ["31.14.0.0", "15"],
    
    // Saudi
    ["188.247.0.0", "16"],
    ["213.130.0.0", "16"],
    
    // Egypt
    ["41.32.0.0", "11"],
    ["196.200.0.0", "13"]
];


// ═══════════════════════════════════════════════════════════════════════
//  ENHANCED DOMAIN DETECTION
// ═══════════════════════════════════════════════════════════════════════

var PUBG_KEYS = [
    "pubgmobile", "pubgm", "pubg",
    "tencent", "lightspeed", "levelinfinite",
    "igamecj", "myapp", "qq", "igame",
    "gcloud", "tmgp", "bsgame",
    "minisite", "garena", "battlegrounds",
    "pubgstudio", "proximabeta",
    "anticheat", "igame.qq.com",
    "midas", "intlgame"
];

var DIRECT_KEYS = [
    "apple", "icloud", "itunes", "mzstatic",
    "google", "gstatic", "googleapis", "youtube",
    "facebook", "fbcdn", "instagram",
    "whatsapp", "telegram", "twitter", "x.com",
    "tiktok", "netflix", "spotify",
    "discord", "github", "microsoft", "windows"
];

var CDN_KEYS = [
    "cdn", "akamai", "cloudfront", "fastly",
    "edgecast", "cloudflare", "lumen",
    "patch", "update", "download", "resource"
];


// ═══════════════════════════════════════════════════════════════════════
//  ADVANCED GAME MODES DETECTION
// ═══════════════════════════════════════════════════════════════════════

var MODES = {
    LOBBY: {
        sig: [
            "lobby", "queue", "matchmake", "matchmaking",
            "waiting", "room_list", "team", "invite",
            "friend", "presence", "party", "region",
            "serverlist", "server_list", "worldsvr"
        ],
        priority: 10,
        targetPing: 10,
        strategy: "ULTRA_CRITICAL_JO",
        sticky: true
    },
    
    AUTH: {
        sig: [
            "auth", "login", "account", "openid",
            "session", "token", "passport", "security",
            "verify", "anticheat", "intllogin", "userinfo"
        ],
        priority: 10,
        targetPing: 12,
        strategy: "CRITICAL_SECURE_JO",
        sticky: true
    },
    
    RANKED: {
        sig: [
            "ranked", "rank", "conqueror", "ace", "master",
            "diamond", "platinum", "crown", "gold",
            "rating", "season", "leaderboard", "tier", "rp_"
        ],
        priority: 10,
        targetPing: 12,
        strategy: "ULTRA_CRITICAL_JO",
        sticky: true
    },
    
    COMPETITIVE: {
        sig: [
            "tdm", "team_death", "deathmatch", "arena",
            "competitive", "esport", "tournament", "scrim"
        ],
        priority: 10,
        targetPing: 10,
        strategy: "ULTRA_CRITICAL_JO",
        sticky: true
    },
    
    CLASSIC: {
        sig: [
            "classic", "erangel", "miramar", "sanhok",
            "vikendi", "livik", "karakin", "rondo",
            "deston", "nusa", "map", "match", "session"
        ],
        priority: 9,
        targetPing: 15,
        strategy: "CRITICAL_JO",
        sticky: true
    },
    
    METRO: {
        sig: [
            "metro", "metro_royale", "underworld",
            "faction", "underground", "dark_zone"
        ],
        priority: 8,
        targetPing: 18,
        strategy: "GAME_JO",
        sticky: true
    },
    
    ARCADE: {
        sig: [
            "arcade", "minizone", "mini_zone",
            "sniper", "war_mode", "quick", "funmatch"
        ],
        priority: 7,
        targetPing: 22,
        strategy: "STANDARD_JO",
        sticky: false
    },
    
    SOCIAL: {
        sig: [
            "clan", "guild", "chat", "voice",
            "social", "crew", "alliance"
        ],
        priority: 5,
        targetPing: 30,
        strategy: "LIGHT_JO",
        sticky: false
    },
    
    CDN: {
        sig: CDN_KEYS.concat(["patch", "update", "asset", "pkg"]),
        priority: 2,
        targetPing: 50,
        strategy: "CDN_JO",
        sticky: false
    },
    
    TRAINING: {
        sig: [
            "training", "practice", "tutorial",
            "bot_match", "aim_training"
        ],
        priority: 1,
        targetPing: 999,
        strategy: "SAFE_JO",
        sticky: false
    }
};

var MODE_PRIORITY = [
    "LOBBY", "AUTH", "RANKED", "COMPETITIVE",
    "CLASSIC", "METRO", "ARCADE", "SOCIAL",
    "CDN", "TRAINING"
];


// ═══════════════════════════════════════════════════════════════════════
//  ADVANCED DNS CACHE & PING ENGINE
// ═══════════════════════════════════════════════════════════════════════

var DNS_CACHE = {};
var DNS_KEYS = [];

var PING = {
    history: [],
    maxHistory: 15,
    modeStats: {},
    
    record: function(ms, mode, host) {
        var estimated = Math.round(ms * 0.5 + 4);
        
        if (this.history.length >= this.maxHistory) {
            this.history.shift();
        }
        
        this.history.push({
            dns: ms,
            estimated: estimated,
            mode: mode || "UNKNOWN",
            host: host || "unknown",
            t: now()
        });
        
        // Mode-specific stats
        if (!this.modeStats[mode]) {
            this.modeStats[mode] = {
                count: 0,
                totalPing: 0,
                minPing: 999,
                maxPing: 0
            };
        }
        
        var stats = this.modeStats[mode];
        stats.count++;
        stats.totalPing += estimated;
        stats.minPing = Math.min(stats.minPing, estimated);
        stats.maxPing = Math.max(stats.maxPing, estimated);
        
        return estimated;
    },
    
    avg: function(samples) {
        samples = samples || 5;
        var n = this.history.length;
        if (n === 0) return 999;
        
        var start = Math.max(0, n - samples);
        var sum = 0;
        var count = 0;
        
        for (var i = start; i < n; i++) {
            sum += this.history[i].estimated;
            count++;
        }
        
        return count ? Math.round(sum / count) : 999;
    },
    
    modeAvg: function(mode) {
        var stats = this.modeStats[mode];
        if (!stats || stats.count === 0) return 999;
        
        return Math.round(stats.totalPing / stats.count);
    },
    
    best: function() {
        if (this.history.length === 0) return 999;
        
        var best = 999;
        for (var i = 0; i < this.history.length; i++) {
            if (this.history[i].estimated < best) {
                best = this.history[i].estimated;
            }
        }
        
        return best;
    },
    
    trend: function() {
        var n = this.history.length;
        if (n < 3) return "STABLE";
        
        var recent = this.avg(3);
        var older = this.avg(6);
        
        if (recent < older * 0.8) return "IMPROVING";
        if (recent > older * 1.3) return "DEGRADING";
        
        return "STABLE";
    },
    
    quality: function(mode) {
        var m = MODES[mode];
        if (!m) return "UNKNOWN";
        
        var currentPing = this.avg(3);
        var target = m.targetPing;
        
        if (currentPing <= target * 0.7) return "EXCELLENT";
        if (currentPing <= target) return "GOOD";
        if (currentPing <= target * 1.5) return "FAIR";
        if (currentPing <= target * 2) return "POOR";
        
        return "CRITICAL";
    },
    
    isHealthy: function(mode) {
        var m = MODES[mode];
        if (!m) return true;
        
        return this.avg(3) <= m.targetPing * 1.2;
    },
    
    needsChange: function() {
        if (this.history.length < 4) return false;
        
        var recent = this.avg(3);
        return recent > 45 || this.trend() === "DEGRADING";
    }
};


// ═══════════════════════════════════════════════════════════════════════
//  STICKY ROUTING SYSTEM
// ═══════════════════════════════════════════════════════════════════════

var STICKY = {};

function stickyGet(key) {
    var entry = STICKY[key];
    if (!entry) return null;
    
    if (now() - entry.t > CFG.STICKY_TTL) {
        delete STICKY[key];
        return null;
    }
    
    entry.hits = (entry.hits || 0) + 1;
    return entry.v;
}

function stickySet(key, val) {
    STICKY[key] = {
        v: val,
        t: now(),
        hits: 0
    };
}

function stickyClear(key) {
    delete STICKY[key];
}


// ═══════════════════════════════════════════════════════════════════════
//  DOMESTIC GUARD — Enhanced Security Layer
// ═══════════════════════════════════════════════════════════════════════

var DOMESTIC_GUARD = {
    violations: 0,
    maxViolations: 3,
    
    isJordanIP: function(ip) {
        return inRanges(ip, JO_NETS);
    },
    
    isMENAFriendly: function(ip) {
        return inRanges(ip, MENA_FRIENDLY_NETS);
    },
    
    isCloudForeign: function(ip) {
        return inRanges(ip, CLOUD_FOREIGN_NETS);
    },
    
    destinationAllowed: function(ip) {
        if (!ip) return true;
        
        // Smart Lock Logic
        if (CFG.SMART_DESTINATION_LOCK) {
            // Warmup period: أكثر مرونة
            if (SESSION.isWarmup()) {
                if (this.isJordanIP(ip)) return true;
                if (this.isMENAFriendly(ip)) return true;
                
                this.violations++;
                return this.violations <= this.maxViolations;
            }
            
            // Established session: أكثر صرامة
            if (this.isJordanIP(ip)) return true;
            
            // Allow MENA with penalty
            if (this.isMENAFriendly(ip)) {
                this.violations++;
                return true;
            }
            
            return false;
        }
        
        return true;
    },
    
    proxyAllowed: function(name) {
        var proxy = PROXY_POOL[name];
        if (!proxy) return false;
        
        // Jordan-only enforcement
        if (CFG.PROXY_EXIT_JORDAN_ONLY && !this.isJordanIP(proxy.ip)) {
            return false;
        }
        
        // Health check
        if (CFG.ENABLE_HEALTH_CHECK) {
            var health = getProxyHealth(name);
            if (health.status === "DEGRADED") return false;
        }
        
        return true;
    },
    
    buildChain: function(names, mode) {
        var chain = "";
        var count = 0;
        var tier1Used = false;
        
        for (var i = 0; i < names.length; i++) {
            var name = names[i];
            var proxy = PROXY_POOL[name];
            
            if (!proxy || !this.proxyAllowed(name)) continue;
            
            // Load balancing
            if (CFG.ENABLE_LOAD_BALANCING) {
                var health = getProxyHealth(name);
                if (health.load > 95 && !tier1Used) continue;
            }
            
            if (chain !== "") chain += "; ";
            chain += "PROXY " + proxy.ip + ":" + proxy.port;
            
            if (proxy.tier === 1) tier1Used = true;
            
            updateHealth(name, true);
            
            count++;
            if (count >= CFG.MAX_PROXY_FALLBACKS) break;
        }
        
        if (chain === "") {
            return CFG.FAIL_CLOSED ? BLOOD.BLK : BLOOD.DIR;
        }
        
        return chain + (CFG.FAIL_CLOSED ? "; " + BLOOD.BLK : "; DIRECT");
    }
};


// ═══════════════════════════════════════════════════════════════════════
//  JORDAN MATCHMAKING BIAS — Enhanced
// ═══════════════════════════════════════════════════════════════════════

var JO_BIAS = {
    signals: {
        jordan: ["jo", "jordan", "amman", "irbid", "zarqa", "aqaba"],
        mena: ["me", "middleeast", "mena", "arab", "gcc", "dubai", "riyadh"],
        asia: ["asia", "singapore", "sg", "sea", "hk", "hongkong"],
        europe: ["eu", "europe", "frankfurt", "london", "paris"]
    },
    
    scoreHost: function(host) {
        var h = host.toLowerCase();
        var score = 0;
        
        // Jordan = highest priority
        for (var i = 0; i < this.signals.jordan.length; i++) {
            if (h.indexOf(this.signals.jordan[i]) !== -1) {
                score += 50;
            }
        }
        
        // MENA = good
        for (var j = 0; j < this.signals.mena.length; j++) {
            if (h.indexOf(this.signals.mena[j]) !== -1) {
                score += 25;
            }
        }
        
        // Asia = neutral
        for (var k = 0; k < this.signals.asia.length; k++) {
            if (h.indexOf(this.signals.asia[k]) !== -1) {
                score += 5;
            }
        }
        
        // Europe = penalty
        for (var l = 0; l < this.signals.europe.length; l++) {
            if (h.indexOf(this.signals.europe[l]) !== -1) {
                score -= 20;
            }
        }
        
        return score;
    },
    
    carrierBoost: function(ip) {
        var carrier = getCarrier(ip);
        
        if (carrier === "ORANGE") return 25;
        if (carrier === "ZAIN") return 22;
        if (carrier === "UMNIAH") return 20;
        if (carrier === "REGIONAL") return 10;
        
        return 0;
    }
};


// ═══════════════════════════════════════════════════════════════════════
//  CONNECTION PROFILER
// ═══════════════════════════════════════════════════════════════════════

var CONNECTION = {
    profile: function() {
        var avg = PING.avg(5);
        var best = PING.best();
        var trend = PING.trend();
        
        var type = "UNKNOWN";
        if (avg <= 12 && best <= 8) type = "5G_PREMIUM";
        else if (avg <= 20) type = "5G_OR_FIBER";
        else if (avg <= 35) type = "4G_GOOD";
        else if (avg <= 60) type = "4G_FAIR";
        else if (avg <= 100) type = "3G_OR_ADSL";
        else type = "WEAK";
        
        return {
            type: type,
            avgPing: avg,
            bestPing: best,
            trend: trend,
            quality: avg <= 25 ? "EXCELLENT" : avg <= 45 ? "GOOD" : "POOR"
        };
    },
    
    boost: function() {
        var conn = this.profile();
        
        if (conn.type === "5G_PREMIUM") return 35;
        if (conn.type === "5G_OR_FIBER") return 25;
        if (conn.type === "4G_GOOD") return 15;
        if (conn.type === "4G_FAIR") return 5;
        if (conn.type === "3G_OR_ADSL") return -5;
        
        return -20;
    },
    
    adaptiveStrategy: function(mode) {
        var conn = this.profile();
        var m = MODES[mode];
        
        if (!m) return "BALANCED";
        
        if (conn.quality === "EXCELLENT" && m.priority >= 9) {
            return "AGGRESSIVE";
        }
        
        if (conn.quality === "POOR") {
            return "SAFE";
        }
        
        return "BALANCED";
    }
};


// ═══════════════════════════════════════════════════════════════════════
//  AI SCORING ENGINE
// ═══════════════════════════════════════════════════════════════════════

function advancedScore(ip, host, port, dns, mode) {
    var score = 0;
    var m = MODES[mode];
    
    // Base mode priority (0-50)
    if (m) {
        score += m.priority * 5;
    } else {
        score += 25;
    }
    
    // DNS Performance (0-30)
    if (dns.dt <= 8) score += 30;
    else if (dns.dt <= 15) score += 25;
    else if (dns.dt <= 30) score += 20;
    else if (dns.dt <= 60) score += 12;
    else if (dns.dt <= 100) score += 5;
    else score -= 10;
    
    // Overall Ping Health (0-25)
    var pingQuality = PING.quality(mode);
    if (pingQuality === "EXCELLENT") score += 25;
    else if (pingQuality === "GOOD") score += 18;
    else if (pingQuality === "FAIR") score += 10;
    else if (pingQuality === "POOR") score += 2;
    else score -= 15;
    
    // 🇯🇴 JORDAN IP BONUS (0-70) — أقوى تأثير
    if (ip && DOMESTIC_GUARD.isJordanIP(ip)) {
        score += 70;
        score += JO_BIAS.carrierBoost(ip);
        
        // Extra bonus for critical modes
        if (m && m.priority >= 9) {
            score += 20;
        }
    }
    
    // 🌍 MENA Friendly (0-20)
    if (ip && !DOMESTIC_GUARD.isJordanIP(ip) && DOMESTIC_GUARD.isMENAFriendly(ip)) {
        score += 20;
    }
    
    // ☁️ Foreign Cloud Penalty (-40 to -60)
    if (ip && DOMESTIC_GUARD.isCloudForeign(ip)) {
        score -= 45;
        
        if (m && m.priority >= 8) {
            score -= 15; // Extra penalty for critical modes
        }
    }
    
    // 📍 Host Pattern Analysis (0-60)
    var hostScore = JO_BIAS.scoreHost(host);
    score += hostScore;
    
    // 🔌 Connection Quality (0-35)
    score += CONNECTION.boost();
    
    // 🎯 Port Analysis (0-15)
    if (port === 443) score += 8;
    if (port >= 10000 && port <= 10100) score += 12;
    if (port >= 7000 && port <= 7100) score += 10;
    if (port === 80) score += 5;
    
    // 📊 Trend Analysis (-20 to +15)
    var trend = PING.trend();
    if (trend === "IMPROVING") score += 15;
    else if (trend === "DEGRADING") score -= 20;
    
    // 🚨 Emergency Adjustments
    if (PING.needsChange()) {
        score -= 25;
    }
    
    // 🎮 LOBBY ULTRA BOOST
    if (mode === "LOBBY") {
        if (ip && DOMESTIC_GUARD.isJordanIP(ip)) {
            score += 60;
        } else {
            score -= 40;
        }
    }
    
    // Normalize (0-100)
    if (score < 0) return 0;
    if (score > 150) return 100;
    
    return Math.round((score / 150) * 100);
}


// ═══════════════════════════════════════════════════════════════════════
//  INTELLIGENT ROUTING ENGINE
// ═══════════════════════════════════════════════════════════════════════

function selectRoute(mode, score, ip, port, host) {
    var m = MODES[mode];
    if (!m) m = MODES["CLASSIC"];
    
    var strategy = m.strategy;
    var carrier = getCarrier(ip);
    var connProfile = CONNECTION.profile();
    
    // 🛡️ Security Check
    if (!DOMESTIC_GUARD.destinationAllowed(ip)) {
        return BLOOD.BLK;
    }
    
    // 🔄 Sticky Routing
    if (m.sticky && CFG.ENABLE_ADAPTIVE_ROUTING) {
        var sticky = stickyGet(mode);
        if (sticky && PING.isHealthy(mode)) {
            return sticky;
        }
    }
    
    // 🚨 Emergency Rerouting
    if (PING.needsChange() && SESSION.isEstablished()) {
        var emergency = DOMESTIC_GUARD.buildChain([
            "ORANGE_ALPHA", "ZAIN_PRIME", "UMNIAH_PRIME", "ORANGE_PRIME"
        ], mode);
        
        stickyClear(mode);
        return emergency;
    }
    
    var route = null;
    
    // ═══════════════════════════════════════════════════════════════════
    // STRATEGY: ULTRA_CRITICAL_JO (Lobby, Ranked, Competitive)
    // ═══════════════════════════════════════════════════════════════════
    if (strategy === "ULTRA_CRITICAL_JO") {
        if (score >= 90 || (ip && DOMESTIC_GUARD.isJordanIP(ip))) {
            route = DOMESTIC_GUARD.buildChain([
                "ORANGE_PRIME", "ZAIN_PRIME", "ORANGE_ALPHA", "UMNIAH_PRIME"
            ], mode);
        } else if (score >= 70) {
            route = DOMESTIC_GUARD.buildChain([
                "ZAIN_PRIME", "ORANGE_PRIME", "UMNIAH_PRIME", "ORANGE_BETA"
            ], mode);
        } else {
            route = DOMESTIC_GUARD.buildChain([
                "ORANGE_PRIME", "ZAIN_PRIME", "ORANGE_ALPHA"
            ], mode);
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // STRATEGY: CRITICAL_SECURE_JO (Auth)
    // ═══════════════════════════════════════════════════════════════════
    else if (strategy === "CRITICAL_SECURE_JO") {
        route = DOMESTIC_GUARD.buildChain([
            "ORANGE_PRIME", "ORANGE_ALPHA", "ZAIN_PRIME", "UMNIAH_PRIME"
        ], mode);
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // STRATEGY: CRITICAL_JO (Classic, High-Priority Modes)
    // ═══════════════════════════════════════════════════════════════════
    else if (strategy === "CRITICAL_JO") {
        if (carrier === "ORANGE" || score >= 85) {
            route = DOMESTIC_GUARD.buildChain([
                "ORANGE_PRIME", "ZAIN_PRIME", "ORANGE_ALPHA", "UMNIAH_PRIME"
            ], mode);
        } else if (carrier === "ZAIN") {
            route = DOMESTIC_GUARD.buildChain([
                "ZAIN_PRIME", "ORANGE_PRIME", "UMNIAH_PRIME", "ORANGE_BETA"
            ], mode);
        } else {
            route = DOMESTIC_GUARD.buildChain([
                "UMNIAH_PRIME", "ORANGE_PRIME", "ZAIN_PRIME", "ORANGE_ALPHA"
            ], mode);
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // STRATEGY: GAME_JO (Metro, Arcade)
    // ═══════════════════════════════════════════════════════════════════
    else if (strategy === "GAME_JO") {
        if (score >= 80) {
            route = DOMESTIC_GUARD.buildChain([
                "ZAIN_PRIME", "ORANGE_PRIME", "UMNIAH_PRIME"
            ], mode);
        } else {
            route = DOMESTIC_GUARD.buildChain([
                "ORANGE_ALPHA", "ZAIN_PRIME", "ORANGE_BETA"
            ], mode);
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // STRATEGY: STANDARD_JO (Arcade, Social)
    // ═══════════════════════════════════════════════════════════════════
    else if (strategy === "STANDARD_JO" || strategy === "LIGHT_JO") {
        if (score >= 70) {
            route = DOMESTIC_GUARD.buildChain([
                "ZAIN_PRIME", "ORANGE_PRIME", "UMNIAH_PRIME"
            ], mode);
        } else {
            route = DOMESTIC_GUARD.buildChain([
                "ORANGE_ALPHA", "ZAIN_BETA"
            ], mode);
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // STRATEGY: CDN_JO
    // ═══════════════════════════════════════════════════════════════════
    else if (strategy === "CDN_JO") {
        if (CFG.ALLOW_CDN_DIRECT && !CFG.CDN_PREFER_JORDAN) {
            return BLOOD.DIR;
        }
        
        route = DOMESTIC_GUARD.buildChain([
            "ZAIN_BETA", "ORANGE_BETA", "ZAIN_PRIME"
        ], mode);
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // STRATEGY: SAFE_JO (Training)
    // ═══════════════════════════════════════════════════════════════════
    else if (strategy === "SAFE_JO") {
        if (!CFG.NO_DIRECT_FOR_PUBG) {
            return BLOOD.DIR;
        }
        
        route = DOMESTIC_GUARD.buildChain([
            "ORANGE_ALPHA", "ZAIN_PRIME"
        ], mode);
    }
    
    // Default fallback
    if (!route) {
        route = DOMESTIC_GUARD.buildChain([
            "ORANGE_PRIME", "ZAIN_PRIME", "UMNIAH_PRIME"
        ], mode);
    }
    
    // Save to sticky if enabled
    if (m.sticky && CFG.ENABLE_ADAPTIVE_ROUTING) {
        stickySet(mode, route);
    }
    
    return route;
}


// ═══════════════════════════════════════════════════════════════════════
//  MAIN PAC FUNCTION
// ═══════════════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
    SESSION.requestCount++;
    
    if (!host) return BLOOD.DIR;
    
    var h = host.toLowerCase();
    
    // ═══════════════════════════════════════════════════════════════════
    // Localhost / Private Networks
    // ═══════════════════════════════════════════════════════════════════
    if (isPlainHostName(host)) return BLOOD.DIR;
    
    if (isIPv4(host)) {
        if (isInNet(host, "10.0.0.0", "255.0.0.0") ||
            isInNet(host, "172.16.0.0", "255.240.0.0") ||
            isInNet(host, "192.168.0.0", "255.255.0.0") ||
            isInNet(host, "127.0.0.0", "255.0.0.0")) {
            return BLOOD.DIR;
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // Direct Domains (Non-PUBG)
    // ═══════════════════════════════════════════════════════════════════
    if (isDirectDomain(h) && !isPUBG(h)) {
        return BLOOD.DIR;
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // Non-PUBG Traffic
    // ═══════════════════════════════════════════════════════════════════
    if (!isPUBG(h)) {
        return BLOOD.DIR;
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // PUBG Traffic Detected — Full Processing
    // ═══════════════════════════════════════════════════════════════════
    SESSION.pubgRequests++;
    
    var dns = fastDNS(host);
    var ip = dns.ip;
    var mode = dns.mode;
    var port = getPort(url);
    
    // IPv6 handling
    if (ip && ip.indexOf(":") !== -1) {
        if (CFG.SMART_DESTINATION_LOCK) {
            return BLOOD.BLK;
        }
    }
    
    // Calculate AI Score
    var score = advancedScore(ip, h, port, dns, mode);
    
    // Select Best Route
    var route = selectRoute(mode, score, ip, port, h);
    
    return route;
}


// ═══════════════════════════════════════════════════════════════════════
//  HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════

function now() {
    return (new Date()).getTime();
}

function isIPv4(str) {
    if (!str || str.indexOf(":") !== -1) return false;
    
    var parts = str.split(".");
    if (parts.length !== 4) return false;
    
    for (var i = 0; i < 4; i++) {
        var num = parseInt(parts[i], 10);
        if (isNaN(num) || num < 0 || num > 255) return false;
    }
    
    return true;
}

function maskFromCIDR(cidr) {
    cidr = String(cidr);
    
    var masks = {
        "8": "255.0.0.0", "9": "255.128.0.0", "10": "255.192.0.0",
        "11": "255.224.0.0", "12": "255.240.0.0", "13": "255.248.0.0",
        "14": "255.252.0.0", "15": "255.254.0.0", "16": "255.255.0.0",
        "17": "255.255.128.0", "18": "255.255.192.0", "19": "255.255.224.0",
        "20": "255.255.240.0", "21": "255.255.248.0", "22": "255.255.252.0",
        "23": "255.255.254.0", "24": "255.255.255.0"
    };
    
    return masks[cidr] || "255.255.0.0";
}

function inRanges(ip, ranges) {
    if (!ip || !isIPv4(ip)) return false;
    
    for (var i = 0; i < ranges.length; i++) {
        var base = ranges[i][0];
        var cidr = ranges[i][1];
        var mask = maskFromCIDR(cidr);
        
        if (isInNet(ip, base, mask)) return true;
    }
    
    return false;
}

function containsAny(str, keywords) {
    for (var i = 0; i < keywords.length; i++) {
        if (str.indexOf(keywords[i]) !== -1) return true;
    }
    
    return false;
}

function isPUBG(host) {
    return containsAny(host, PUBG_KEYS);
}

function isDirectDomain(host) {
    return containsAny(host, DIRECT_KEYS);
}

function detectMode(host) {
    var h = host.toLowerCase();
    
    for (var i = 0; i < MODE_PRIORITY.length; i++) {
        var modeName = MODE_PRIORITY[i];
        var mode = MODES[modeName];
        
        if (!mode) continue;
        
        for (var j = 0; j < mode.sig.length; j++) {
            if (h.indexOf(mode.sig[j]) !== -1) {
                return modeName;
            }
        }
    }
    
    return "CLASSIC";
}

function fastDNS(host) {
    var cached = DNS_CACHE[host];
    
    if (cached && (now() - cached.t) <= CFG.DNS_CACHE_TTL) {
        return cached;
    }
    
    var t0 = now();
    var ip = dnsResolve(host);
    var dt = now() - t0;
    var mode = detectMode(host);
    
    var result = {
        ip: ip,
        dt: dt,
        mode: mode,
        ok: !!ip,
        t: now()
    };
    
    // Cache management
    if (DNS_KEYS.length >= CFG.DNS_CACHE_MAX) {
        var oldKey = DNS_KEYS.shift();
        delete DNS_CACHE[oldKey];
    }
    
    DNS_CACHE[host] = result;
    DNS_KEYS.push(host);
    
    PING.record(dt, mode, host);
    
    return result;
}

function getPort(url) {
    var match = url.match(/^[a-zA-Z]+:\/\/[^\/:]+:(\d+)/);
    if (match) return parseInt(match[1], 10);
    
    if (url.indexOf("https://") === 0) return 443;
    if (url.indexOf("http://") === 0) return 80;
    
    return 443;
}

function getCarrier(ip) {
    if (!ip || !isIPv4(ip)) return "UNKNOWN";
    
    // Orange Jordan
    if (isInNet(ip, "46.185.128.0", "255.255.192.0") ||
        isInNet(ip, "94.127.208.0", "255.255.240.0") ||
        isInNet(ip, "149.200.136.0", "255.255.252.0")) {
        return "ORANGE";
    }
    
    // Zain Jordan
    if (isInNet(ip, "79.173.192.0", "255.255.192.0") ||
        isInNet(ip, "109.237.192.0", "255.255.240.0") ||
        isInNet(ip, "176.28.0.0", "255.255.128.0") ||
        isInNet(ip, "176.29.0.0", "255.255.0.0")) {
        return "ZAIN";
    }
    
    // Umniah Jordan
    if (isInNet(ip, "82.212.0.0", "255.255.0.0") ||
        isInNet(ip, "212.35.64.0", "255.255.224.0")) {
        return "UMNIAH";
    }
    
    // Regional / Other Jordan
    if (isInNet(ip, "188.247.0.0", "255.255.0.0") ||
        isInNet(ip, "94.230.0.0", "255.255.0.0")) {
        return "REGIONAL";
    }
    
    return "OTHER";
}


// ═══════════════════════════════════════════════════════════════════════
//  END OF PAC v28.0
// ═══════════════════════════════════════════════════════════════════════
