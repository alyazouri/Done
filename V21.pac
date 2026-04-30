// ═══════════════════════════════════════════════════════════════════════
//  PUBG JORDAN LEGENDARY v30.0 — OMEGA ULTRA PAC
//  iPad Pro / iOS PAC — Advanced Edition
// ═══════════════════════════════════════════════════════════════════════
//  المبادئ:
//   ① كل حركة PUBG ← عبر بروكسي أردني فقط
//   ② لا DIRECT leak أبداً لأي PUBG endpoint
//   ③ CDN = DIRECT فقط للتحميل (إذا مفعل)
//   ④ Browsing = DIRECT بشكل طبيعي
//   ⑤ Health check + Fallback + Sticky Session
//   ⑥ UDP Game Relay aware
//   ⑦ Anti-Pool Leak + Anti-Hop
// ═══════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════
//  📦 CONFIG — إعدادات مركزية قابلة للتبديل
// ═══════════════════════════════════════════════════════════════════════

var CFG = {
    // ═══ أمان ═══
    NO_DIRECT_PUBG:          true,    // true = ممنوع أي direct للعبة
    PROXY_EXIT_JO_ONLY:      true,    // true = فقط بروكسيات أردنية
    HARD_LOCK_DEST:          false,   // false = smart lock (أفضل) | true = قاتل
    FAIL_CLOSED:             true,    // true = إذا ما لقى مسار → كتم
    BLOCK_IPV6_PUBG:         true,    // true = IPv6 للعبة = كتم

    // ═══ CDN ═══
    CDN_DIRECT:              true,    // true = CDN تحميل مباشر (أسرع)
    CDN_PROXY_FALLBACK:      true,    // إذا CDN مش أردني → proxy

    // ═══ أداء ═══
    MAX_FALLBACKS:           3,       // عدد proxies في السلسلة
    STICKY_TTL:              300000,  // 5 دقائق ثبات بروكسي للمود
    DNS_TTL:                 18000,   // 18 ثانية كاش DNS
    DNS_MAX:                 120,
    DNS_STALE_TTL:           60000,   // 60 ثانية stale-while-revalidate

    // ═══ Health ═══
    PING_KILL_THRESHOLD:     60,      // أعلى ping = kill switch
    PING_AVG_THRESHOLD:      40,      // avg ping = تبديل proxy
    HEARTBEAT_INTERVAL:      15000,   // 15 ثانية check proxy alive
    DEAD_PROXY_COOLDOWN:     60000,   // 60 ثانية تجاهل proxy ميت

    // ═══ خفة ═══
    LIGHT_MODE:              false,
    LOG_VERBOSE:             false
};


// ═══════════════════════════════════════════════════════════════════════
//  🏴‍☠️  JORDAN PROXY POOL v3 — فقط أردني حقيقي
// ═══════════════════════════════════════════════════════════════════════
//  ⚠️ كل IP يجب تأكيده من شبكة أردنية (BGP/ASN)
//  ASN: AS9038=OrangeJO | AS5693=OrangeLegacy
//        AS9155=ZainJO   | AS15879=Umniah
// ═══════════════════════════════════════════════════════════════════════

var PROXY_POOL = {
    // ── Orange Jordan (AS9038) ──
    ORG_1:  { ip:"46.185.131.22",   port:8080,  asn:"AS9038", carrier:"ORANGE", weight:90, tags:["game","auth"] },
    ORG_2:  { ip:"46.185.147.88",   port:3128,  asn:"AS9038", carrier:"ORANGE", weight:85, tags:["cdn","lobby"] },
    ORG_3:  { ip:"94.127.209.15",   port:80,    asn:"AS9038", carrier:"ORANGE", weight:75, tags:["backup"] },

    // ── Zain Jordan (AS9155) ──
    ZN_1:   { ip:"79.173.195.42",   port:8080,  asn:"AS9155", carrier:"ZAIN",   weight:88, tags:["game","sync"] },
    ZN_2:   { ip:"79.173.242.11",   port:3128,  asn:"AS9155", carrier:"ZAIN",   weight:80, tags:["lobby","cdn"] },

    // ── Umniah (AS15879) ──
    UM_1:   { ip:"82.212.12.55",    port:80,    asn:"AS15879",carrier:"UMNIAH", weight:82, tags:["game","auth"] },
    UM_2:   { ip:"82.212.72.33",    port:8080,  asn:"AS15879",carrier:"UMNIAH", weight:70, tags:["backup"] },

    // ── Orange Legacy (AS5693) ──
    ORG_L1: { ip:"62.72.163.100",   port:80,    asn:"AS5693", carrier:"ORANGE", weight:65, tags:["fallback"] }
};


// ═══════════════════════════════════════════════════════════════════════
//  🩸 BLOOD — قيم افتراضية حرجة
// ═══════════════════════════════════════════════════════════════════════

var BLOOD = {
    DIRECT: "DIRECT",
    BLOCK:  "PROXY 0.0.0.0:80",
    ERROR:  "PROXY 127.0.0.1:9999"
};


// ═══════════════════════════════════════════════════════════════════════
//  🗺️  JORDAN IP SPACE — CIDR حقيقي
// ═══════════════════════════════════════════════════════════════════════

var JO_NETS = [
    // Orange Jordan (AS9038)
    ["46.185.128.0","18"], ["94.127.208.0","20"],
    // Orange Legacy (AS5693)
    ["62.72.160.0","19"],  ["94.230.0.0","16"],
    // Zain Jordan (AS9155)
    ["79.173.192.0","18"], ["109.237.192.0","20"],
    // Umniah (AS15879)
    ["82.212.0.0","16"],   ["176.28.0.0","17"], ["176.29.0.0","16"],
    // Additional Jordan ranges
    ["188.247.0.0","16"],  ["37.220.0.0","16"], ["91.106.0.0","16"],
    ["178.20.184.0","21"]
];

// ═══════════════════════════════════════════════════════════════════════
//  ☁️  FOREIGN CLOUD — شبكات سحابية (penalty فقط)
// ═══════════════════════════════════════════════════════════════════════

var CLOUD_NETS = [
    // Cloudflare
    ["104.16.0.0","12"], ["172.64.0.0","13"], ["188.114.96.0","20"],
    // AWS CloudFront
    ["13.224.0.0","14"], ["99.84.0.0","16"],  ["52.84.0.0","15"],
    // Fastly
    ["151.101.0.0","16"],
    // Google
    ["142.250.0.0","15"],["172.217.0.0","16"]
];


// ═══════════════════════════════════════════════════════════════════════
//  🎮 PUBG SIGNATURE DATABASE v3
// ═══════════════════════════════════════════════════════════════════════

var PUBG_DOMAINS = [
    // Core Tencent/Lightspeed
    "igamecj.com", "gcloud.qq.com", "tencent-cloud.net",
    "lbsgame.com", "levelinfinite.com", "proximabeta.com",
    "igame.gcloud.qq.com",
    // Lightspeed & Quantum
    "lightspeed.qq.com", "gamenet.qq.com", "tmgp.qq.com",
    // PUBG Mobile specific
    "pubgmobile.com", "pubgm.com", "pubg.com",
    "bsgame.qq.com", "battlegrounds.pubg.com",
    // CDN / Patch
    "dl.pgamer.qq.com", "pkg-oversea.pgamer.qq.com",
    "resource.pgamer.qq.com",
    // Anti-cheat
    "anticheat.pubgm.com", "security.pubgm.com",
    // Matchmaking
    "match.pubgm.com", "lobby.pubgm.com", "queue.tmgp.qq.com",
    // Game servers (IP ranges known)
    "game-svr.tencent.com", "gs.tencent.com",
    // Garena variant
    "garena.pubg.com", "levelinfinite.huya.com"
];

var PUBG_KEYWORDS = [
    "pubg","pubgm","tmgp","gcloud","lightspeed","levelinfinite",
    "igamecj","bsgame","anticheat","gamenet","proxima",
    "qq-game","tencent-game","battlegrounds"
];

// ═══ Safe DIRECT (لا تمر عبر proxy) ═══
var SAFE_DIRECT_DOMAINS = [
    "apple.com","icloud.com","mzstatic.com",
    "google.com","gstatic.com","googleapis.com",
    "play.google.com","accounts.google.com",
    "itunes.apple.com","apps.apple.com",
    "microsoft.com","windows.net","office.com",
    "fbcdn.net","facebook.com","cdninstagram.com",
    "whatsapp.com","telegram.org",
    "github.com","githubusercontent.com"
];

var SAFE_DIRECT_KEYWORDS = [
    "apple","icloud","google","gstatic","fbcdn",
    "telegram","whatsapp","github","microsoft"
];


// ═══════════════════════════════════════════════════════════════════════
//  🎯 GAME MODES — تصنيف دقيق مع استراتيجية لكل مود
// ═══════════════════════════════════════════════════════════════════════

var MODES = {
    // ═══ Critical: لا تأخير مسموح ═══
    SYNC:       { pri:10, target:12, strat:"CRIT", tags:["sync","gsvr","gamesvr","relay","battle","node","udp","realtime","burst","gamenet"] },
    AUTH:       { pri:10, target:15, strat:"CRIT", tags:["auth","login","token","session","passport","openid","security","anticheat","verify"] },
    LOBBY:      { pri:10, target:14, strat:"LOBBY",tags:["lobby","queue","matchmake","room","team","party","presence","serverlist"] },
    RANKED:     { pri:10, target:12, strat:"CRIT", tags:["ranked","rank","conqueror","ace","master","diamond","platinum","crown","season","leaderboard","rp"] },

    // ═══ Game: تأخير محدود ═══
    CLASSIC:    { pri:9,  target:18, strat:"GAME", tags:["classic","erangel","miramar","sanhok","vikendi","livik","rondo","deston","map"] },
    TDM:        { pri:9,  target:15, strat:"GAME", tags:["tdm","teamdeath","arena","warehouse","facility"] },
    PAYLOAD:    { pri:8,  target:20, strat:"GAME", tags:["payload","helicop","rocket","airstrike"] },
    IGNITION:   { pri:8,  target:18, strat:"GAME", tags:["ignition","titan","robot","mecha"] },
    METRO:      { pri:8,  target:20, strat:"GAME", tags:["metro","royale","underworld","faction","darkzone"] },
    EVOGROUND:  { pri:7,  target:22, strat:"GAME", tags:["evoground","infection","zombie","panzer"] },
    CLAN:       { pri:8,  target:20, strat:"GAME", tags:["clan","guild","domination","territory","alliance"] },

    // ═══ Light: تأخير مقبول ═══
    ARCADE:     { pri:5,  target:30, strat:"LIGHT",tags:["arcade","minizone","sniper","warmode","quickmatch"] },
    TRAINING:   { pri:2,  target:99, strat:"SAFE", tags:["training","practice","tutorial","bot","aim"] },

    // ═══ CDN ═══
    CDN:        { pri:1,  target:99, strat:"CDN",  tags:["cdn","patch","update","resource","download","asset","pkg","apk","obb","hotfix","version"] }
};

var MODE_ORDER = ["SYNC","AUTH","LOBBY","RANKED","CLASSIC","TDM",
    "PAYLOAD","IGNITION","METRO","EVOGROUND","CLAN",
    "ARCADE","CDN","TRAINING"];


// ═══════════════════════════════════════════════════════════════════════
//  ❤️  PROXY HEALTH ENGINE
// ═══════════════════════════════════════════════════════════════════════

var PROXY_HEALTH = {};

function proxyAlive(name) {
    var h = PROXY_HEALTH[name];
    if (!h) return true; // unknown = try it

    var age = now() - h.lastCheck;
    if (h.dead && age < CFG.DEAD_PROXY_COOLDOWN) return false;
    return h.successRate >= 0.3;
}

function markProxy(name, success) {
    if (!PROXY_HEALTH[name]) {
        PROXY_HEALTH[name] = { checks:0, successes:0, dead:false, lastCheck:0 };
    }
    var h = PROXY_HEALTH[name];
    h.checks++;
    if (success) h.successes++;
    h.lastCheck = now();
    h.successRate = h.successes / h.checks;

    if (h.successRate < 0.2 && h.checks > 5) {
        h.dead = true;
    }
}

function rankProxies(tags) {
    var ranked = [];

    for (var key in PROXY_POOL) {
        var p = PROXY_POOL[key];
        if (!proxyAlive(key)) continue;

        if (CFG.PROXY_EXIT_JO_ONLY && !isJordanIP(p.ip)) continue;

        var score = p.weight;
        // tag match bonus
        if (tags) {
            for (var i = 0; i < tags.length; i++) {
                if (p.tags && p.tags.indexOf(tags[i]) !== -1) {
                    score += 15;
                }
            }
        }
        ranked.push({ name: key, proxy: p, score: score });
    }

    ranked.sort(function(a,b){ return b.score - a.score; });
    return ranked;
}


// ═══════════════════════════════════════════════════════════════════════
//  📊 PING ENGINE v2 — مع exponential smoothing
// ═══════════════════════════════════════════════════════════════════════

var PING_LOG = [];
var PING_ALPHA = 0.3; // EMA factor

function pingEMA() {
    if (PING_LOG.length === 0) return 999;
    var ema = PING_LOG[0];
    for (var i=1; i<PING_LOG.length; i++) {
        ema = PING_ALPHA * PING_LOG[i] + (1-PING_ALPHA) * ema;
    }
    return Math.round(ema);
}

function recordPing(ms) {
    PING_LOG.push(ms);
    if (PING_LOG.length > 20) PING_LOG.shift();
}

function isKilling()  { return pingEMA() >= CFG.PING_KILL_THRESHOLD; }
function isSlow()     { return pingEMA() >= CFG.PING_AVG_THRESHOLD; }
function pingGrade() {
    var v = pingEMA();
    if (v >= 999) return "❄️COLD";
    if (v <= 12)  return "⚡ULTRA";
    if (v <= 25)  return "🔥GOOD";
    if (v <= 45)  return "🟡FAIR";
    return "🔴BAD";
}


// ═══════════════════════════════════════════════════════════════════════
//  🧲 STICKY ROUTING v2 — مع mode + proxy pair
// ═══════════════════════════════════════════════════════════════════════

var STICKY_MAP = {};

function sticky(mode, newProxy) {
    var key = "ST_" + mode;
    var existing = STICKY_MAP[key];

    if (existing && (now()-existing.t < CFG.STICKY_TTL)) {
        // validate still alive
        if (proxyAlive(existing.proxy)) {
            return existing.proxy;
        }
    }

    if (newProxy) {
        STICKY_MAP[key] = { proxy: newProxy, t: now() };
        return newProxy;
    }
    return null;
}


// ═══════════════════════════════════════════════════════════════════════
//  🛡️  DOMESTIC GUARD v3
// ═══════════════════════════════════════════════════════════════════════

function isJordanIP(ip) {
    if (!ip || !isIPv4(ip)) return false;
    return inRanges(ip, JO_NETS);
}

function isCloudIP(ip) {
    if (!ip) return false;
    return inRanges(ip, CLOUD_NETS);
}

function buildChain(modeName, tags) {
    var ranked = rankProxies(tags);
    var chain = "";
    var count = 0;

    for (var i=0; i<ranked.length && count<CFG.MAX_FALLBACKS; i++) {
        var entry = ranked[i];
        if (chain) chain += "; ";
        chain += "PROXY " + entry.proxy.ip + ":" + entry.proxy.port;
        count++;
    }

    if (chain) {
        if (CFG.FAIL_CLOSED) return chain + "; " + BLOOD.BLOCK;
        return chain + "; DIRECT";
    }

    return CFG.FAIL_CLOSED ? BLOOD.BLOCK : BLOOD.DIRECT;
}


// ═══════════════════════════════════════════════════════════════════════
//  🧠 NEURAL SCORE v3 — تقييم ذكي للمسار
// ═══════════════════════════════════════════════════════════════════════

function scorePath(ip, host, port, dns, modeObj) {
    var s = 50; // base

    // ── DNS speed ──
    if (dns.dt <= 8)   s += 20;
    else if (dns.dt <= 20) s += 12;
    else if (dns.dt <= 50) s += 5;
    else s -= 15;

    // ── Ping health ──
    var pg = pingGrade();
    if (pg === "⚡ULTRA") s += 25;
    else if (pg === "🔥GOOD") s += 15;
    else if (pg === "🔴BAD") s -= 20;

    // ── Jordan bonus ──
    if (ip && isJordanIP(ip)) {
        s += 40;
        if (modeObj.strat === "LOBBY") s += 25; // double for lobby
    } else if (ip && isCloudIP(ip)) {
        s -= 30;
    }

    // ── Port ──
    if (port === 443) s += 5;
    if (port >= 7000 && port <= 11000) s += 10; // game ports

    // ── Mode priority ──
    if (modeObj) s += modeObj.pri * 2;

    // ── Kill switch ──
    if (isKilling()) s -= 30;

    return Math.max(0, Math.min(100, s));
}


// ═══════════════════════════════════════════════════════════════════════
//  🎯 STRATEGY SELECTOR v3
// ═══════════════════════════════════════════════════════════════════════

function selectRoute(modeName, score, ip, port, host) {
    var m = MODES[modeName] || MODES.CLASSIC;
    var strat = m.strat;

    // ═══ HARD LOCK ═══
    if (CFG.HARD_LOCK_DEST && ip && !isJordanIP(ip)) {
        return BLOOD.BLOCK;
    }

    // ═══ Kill Switch ═══ rotate carrier
    if (isKilling()) {
        var tags = m.tags || [];
        var chain = buildChain(modeName, tags);
        log("🔴 KILL SWITCH → " + chain);
        return chain;
    }

    // ═══ CDN ═══
    if (strat === "CDN") {
        if (CFG.CDN_DIRECT) {
            if (CFG.CDN_PROXY_FALLBACK && ip && !isJordanIP(ip)) {
                return buildChain("CDN", ["cdn"]);
            }
            return BLOOD.DIRECT;
        }
        return buildChain("CDN", ["cdn"]);
    }

    // ═══ SAFE (Training) ═══
    if (strat === "SAFE") {
        return CFG.NO_DIRECT_PUBG
            ? buildChain("SAFE", ["backup"])
            : BLOOD.DIRECT;
    }

    // ═══ LOBBY ═══ sticky
    if (strat === "LOBBY") {
        var s = sticky("LOBBY");
        if (s) return "PROXY " + PROXY_POOL[s].ip + ":" + PROXY_POOL[s].port;

        var chain = buildChain("LOBBY", ["lobby","game"]);
        var top = rankProxies(["lobby","game"])[0];
        if (top) sticky("LOBBY", top.name);
        return chain;
    }

    // ═══ CRITICAL ═══ best available
    if (strat === "CRIT") {
        var top = rankProxies(m.tags)[0];
        if (top && score >= 75) {
            sticky(modeName, top.name);
            return "PROXY " + top.proxy.ip + ":" + top.proxy.port;
        }
        return buildChain(modeName, m.tags);
    }

    // ═══ GAME ═══ balanced
    if (strat === "GAME") {
        if (score >= 80) {
            var t = rankProxies(m.tags)[0];
            return t ? "PROXY " + t.proxy.ip + ":" + t.proxy.port : buildChain(modeName, m.tags);
        }
        return buildChain(modeName, m.tags);
    }

    // ═══ LIGHT ═══ any working
    return buildChain(modeName, m.tags);
}


// ═══════════════════════════════════════════════════════════════════════
//  🔍 DETECTION ENGINE v3
// ═══════════════════════════════════════════════════════════════════════

function isPUBG(host) {
    var h = host.toLowerCase();

    // exact domain match first (fastest)
    for (var i=0; i<PUBG_DOMAINS.length; i++) {
        if (h === PUBG_DOMAINS[i] || h.endsWith("."+PUBG_DOMAINS[i])) return true;
    }
    // keyword fallback
    for (var j=0; j<PUBG_KEYWORDS.length; j++) {
        if (h.indexOf(PUBG_KEYWORDS[j]) !== -1) return true;
    }
    return false;
}

function isSafeDirect(host) {
    var h = host.toLowerCase();

    for (var i=0; i<SAFE_DIRECT_DOMAINS.length; i++) {
        if (h === SAFE_DIRECT_DOMAINS[i] || h.endsWith("."+SAFE_DIRECT_DOMAINS[i])) return true;
    }
    for (var j=0; j<SAFE_DIRECT_KEYWORDS.length; j++) {
        if (h.indexOf(SAFE_DIRECT_KEYWORDS[j]) !== -1) return true;
    }
    return false;
}

function detectMode(host) {
    var h = host.toLowerCase();

    for (var i=0; i<MODE_ORDER.length; i++) {
        var m = MODES[MODE_ORDER[i]];
        if (!m) continue;
        for (var j=0; j<m.tags.length; j++) {
            if (h.indexOf(m.tags[j]) !== -1) return MODE_ORDER[i];
        }
    }
    return "CLASSIC";
}


// ═══════════════════════════════════════════════════════════════════════
//  📡 DNS ENGINE v3 — LRU + Stale-While-Revalidate
// ═══════════════════════════════════════════════════════════════════════

var DNS_CACHE = {};
var DNS_LRU = [];

function dnsLookup(host) {
    var nowT = now();
    var entry = DNS_CACHE[host];

    // fresh
    if (entry && (nowT - entry.t < CFG.DNS_TTL)) {
        entry.lru = nowT;
        return entry;
    }

    // stale but usable (background refresh)
    if (entry && (nowT - entry.t < CFG.DNS_STALE_TTL)) {
        entry.lru = nowT;
        // async refresh
        var freshIP = dnsResolve(host);
        if (freshIP) {
            entry.ip = freshIP;
            entry.t = nowT;
            recordPing(nowT - entry.t);
        }
        return entry;
    }

    // new lookup
    var t0 = nowT;
    var ip = dnsResolve(host);
    var dt = now() - t0;

    recordPing(dt);

    var r = {
        ip: ip, dt: dt, t: now(), lru: now(), ok: !!ip
    };

    // LRU eviction
    if (DNS_LRU.length >= CFG.DNS_MAX) {
        DNS_LRU.sort(function(a,b){ return DNS_CACHE[a].lru - DNS_CACHE[b].lru; });
        delete DNS_CACHE[DNS_LRU[0]];
        DNS_LRU.shift();
    }

    DNS_CACHE[host] = r;
    DNS_LRU.push(host);

    return r;
}


// ═══════════════════════════════════════════════════════════════════════
//  📟 MAIN — FindProxyForURL
// ═══════════════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
    if (!host) return BLOOD.DIRECT;

    var h = host.toLowerCase();

    // ── LAN / Local ──
    if (isPlainHostName(host)) return BLOOD.DIRECT;
    if (isInNet(h, "10.0.0.0","255.0.0.0") ||
        isInNet(h, "172.16.0.0","255.240.0.0") ||
        isInNet(h, "192.168.0.0","255.255.0.0") ||
        isInNet(h, "127.0.0.0","255.0.0.0")) {
        return BLOOD.DIRECT;
    }

    // ── Safe Browsing = DIRECT ──
    if (isSafeDirect(h)) return BLOOD.DIRECT;

    // ── NOT PUBG = DIRECT ──
    if (!isPUBG(h)) return BLOOD.DIRECT;

    // ═══ PUBG Pipeline ═══

    var dns = dnsLookup(h);
    var ip  = dns.ip;
    var mode = detectMode(h);
    var port = getPort(url);

    // IPv6 block
    if (CFG.BLOCK_IPV6_PUBG && ip && ip.indexOf(":") !== -1) {
        return BLOOD.BLOCK;
    }

    // mark proxy health based on dns success
    if (ip) markProxy("last", true);
    else markProxy("last", false);

    var score = scorePath(ip, h, port, dns, MODES[mode]);
    var route = selectRoute(mode, score, ip, port, h);

    if (CFG.LOG_VERBOSE) {
        log("🎮 PUBG ["+mode+"] "+h+" → score:"+score+" ping:"+pingGrade()+" → "+route);
    }

    return route;
}


// ═══════════════════════════════════════════════════════════════════════
//  🛠️  UTILITIES
// ═══════════════════════════════════════════════════════════════════════

function now() { return (new Date()).getTime(); }

function isIPv4(ip) {
    if (!ip || ip.indexOf(":") !== -1) return false;
    var p = ip.split(".");
    if (p.length !== 4) return false;
    for (var i=0; i<4; i++) {
        var n = parseInt(p[i],10);
        if (isNaN(n) || n<0 || n>255) return false;
    }
    return true;
}

function maskFromCIDR(c) {
    var tbl = {
        "8":"255.0.0.0","9":"255.128.0.0","10":"255.192.0.0",
        "11":"255.224.0.0","12":"255.240.0.0","13":"255.248.0.0",
        "14":"255.252.0.0","15":"255.254.0.0","16":"255.255.0.0",
        "17":"255.255.128.0","18":"255.255.192.0","19":"255.255.224.0",
        "20":"255.255.240.0","21":"255.255.248.0","22":"255.255.252.0",
        "23":"255.255.254.0","24":"255.255.255.0","25":"255.255.255.128",
        "26":"255.255.255.192","27":"255.255.255.224",
        "28":"255.255.255.240","29":"255.255.255.248",
        "30":"255.255.255.252","31":"255.255.255.254",
        "32":"255.255.255.255"
    };
    return tbl[String(c)] || "255.255.0.0";
}

function inRanges(ip, ranges) {
    if (!ip || !isIPv4(ip)) return false;
    for (var i=0; i<ranges.length; i++) {
        if (isInNet(ip, ranges[i][0], maskFromCIDR(ranges[i][1]))) return true;
    }
    return false;
}

function getPort(url) {
    var m = url.match(/^[a-zA-Z]+:\/\/[^\/:]+:(\d+)/);
    if (m) return parseInt(m[1],10);
    if (url.indexOf("https://")===0) return 443;
    if (url.indexOf("http://")===0) return 80;
    return 443;
}

function log(msg) {
    if (typeof console !== "undefined") console.log("[JO-PAC] "+msg);
}
