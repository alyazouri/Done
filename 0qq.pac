// ============================================================
//  PUBG MOBILE - ULTIMATE JORDAN PAC SCRIPT
//  Version: 5.0 Advanced (No Direct / Low Latency)
//  Optimized for: Orange, Zain, Umniah (Jordan)
// ============================================================

// ============================================================
//  PROXY GATEWAYS (Primary & Backup)
// ============================================================
var PROXY_MAIN = "PROXY 86.108.95.108:80; PROXY 86.108.14.128:9030";
var PROXY_MATCH = "PROXY 86.108.14.128:20001";
var PROXY_CDN = "PROXY 86.108.95.108:80; PROXY 86.108.14.128:80";
var BLOCK = "PROXY 0.0.0.0:0";

// ============================================================
//  SESSION LOCK (Prevent Server Switching Mid-Game)
// ============================================================
var SESSION = {
  matchNet4: null,
  matchNet6: null,
  locked: false,
  matchStartTime: 0
};

// ============================================================
//  COMPREHENSIVE PUBG DOMAINS (Excluding Anti-Cheat)
// ============================================================
var PUBG_DOMAINS = [
  // Core Game
  "pubgmobile", "pubgm", "pubg", "tencent", "krafton",
  "lightspeed", "levelinfinite", "timi", "proximabeta",
  "qcloud", "tencentgames", "igamecj", "igamecdn",
  // Services
  "amplify", "akamaized", "cloudfront", "googleapis",
  "facebook", "api-facebook", "graph-facebook",
  "twitter", "api-twitter",
  "youtube", "googlevideo",
  // Game Servers
  "gamesvr", "gameserver", "battle", "match", "lobby",
  "login", "auth", "session", "gateway", "region",
  // Content
  "cdn", "asset", "resource", "patch", "update", "config",
  // Social
  "social", "friend", "clan", "guild", "team", "party",
  // Shop & Items
  "store", "shop", "inventory", "item", "crate", "skin",
  "reward", "mission", "pass", "season", "rank", "tier",
  // Communication
  "chat", "voice", "msg", "notification", "push",
  // Analytics (Non-Critical)
  "log", "analytics", "tracker", "stats", "report"
];

// Anti-Cheat Domains to EXCLUDE (Direct or Block as per request)
var ANTICHEAT_DOMAINS = [
  "anticheat", "security", "protect", "shield", "guard",
  "tpsecurity", "tencentsecurity", "ace", "anti-cheat",
  "verification", "validate", "integrity", "detection"
];

// ============================================================
//  JORDAN IP RANGES - FULL COVERAGE (All ISPs)
// ============================================================
function isJordanIPv4(ip) {
  if (!ip || ip.indexOf(":") !== -1) return false;
  return (
    // Orange Jordan (AS8376)
    isInNet(ip, "86.108.0.0", "255.255.0.0") ||
    isInNet(ip, "176.28.0.0", "255.255.128.0") ||
    isInNet(ip, "176.29.0.0", "255.255.0.0") ||
    isInNet(ip, "188.247.0.0", "255.255.0.0") ||
    isInNet(ip, "178.20.184.0", "255.255.248.0") ||
    // Zain Jordan (AS41692)
    isInNet(ip, "5.1.64.0", "255.255.192.0") ||
    isInNet(ip, "37.236.0.0", "255.255.0.0") ||
    isInNet(ip, "176.116.0.0", "255.255.0.0") ||
    isInNet(ip, "176.116.128.0", "255.255.128.0") ||
    // Umniah (AS35819)
    isInNet(ip, "176.117.0.0", "255.255.0.0") ||
    isInNet(ip, "176.118.0.0", "255.255.0.0") ||
    isInNet(ip, "176.119.0.0", "255.255.0.0") ||
    // Other Jordan Networks
    isInNet(ip, "195.190.124.0", "255.255.255.0") ||
    isInNet(ip, "212.129.32.0", "255.255.224.0") ||
    isInNet(ip, "62.201.128.0", "255.255.192.0") ||
    isInNet(ip, "193.188.128.0", "255.255.192.0") ||
    // Local Loopback & Private (Force Proxy)
    isInNet(ip, "10.0.0.0", "255.0.0.0") ||
    isInNet(ip, "192.168.0.0", "255.255.0.0")
  );
}

function isJordanIPv6(ip) {
  if (!ip || ip.indexOf(":") === -1) return false;
  return (
    ip.indexOf("2a01:9700:") === 0 || // Orange
    ip.indexOf("2a02:cb40:") === 0 || // Zain
    ip.indexOf("2a0e:97c0:") === 0 || // Umniah
    ip.indexOf("2001:67c:") === 0     // Regional
  );
}

function isJordanAny(ip) {
  return isJordanIPv4(ip) || isJordanIPv6(ip);
}

// ============================================================
//  DETECTION FUNCTIONS (Optimized for Speed)
// ============================================================
function isPUBG(h, u) {
  var s = (h + u).toLowerCase();
  for (var i = 0; i < PUBG_DOMAINS.length; i++) {
    if (s.indexOf(PUBG_DOMAINS[i]) !== -1) return true;
  }
  return false;
}

function isAntiCheat(h, u) {
  var s = (h + u).toLowerCase();
  for (var i = 0; i < ANTICHEAT_DOMAINS.length; i++) {
    if (s.indexOf(ANTICHEAT_DOMAINS[i]) !== -1) return true;
  }
  return false;
}

function isMatchIPv4(ip) {
  if (!ip || ip.indexOf(":") !== -1) return false;
  return isJordanIPv4(ip);
}

function isMatchIPv6(ip) {
  if (!ip || ip.indexOf(":") === -1) return false;
  return ip.indexOf("2a01:9700:4") === 0;
}

// ============================================================
//  KEYWORDS - LOBBY & MATCH (Ultra Fast Regex)
// ============================================================
var LOBBY_KEYS = /^(.*)(lobby|login|auth|region|gateway|session|profile|inventory|store|cdn|config|social|friend|clan|party|team|recruit|matching|queue|wait|room|create|join|invite|gift|mail|notice|event|daily|weekly|monthly|season|pass|rank|tier|badge|title|achievement|mission|task|reward|crate|spin|luck|draw|shop|mall|redeem|code|coupon|bonus|login|daily|check|claim|collect|send|receive|transfer|sync|backup|restore|save|load|init|start|end|close|open|update|patch|download|upload|fetch|pull|push|get|post|put|delete|list|search|find|select|choose|pick|confirm|cancel|accept|reject|decline|ignore|block|unblock|mute|unmute|kick|ban|report|appeal|support|help|faq|guide|tutorial|intro|outro|splash|loading|loadingbar|progress|percent|complete|finish|success|fail|error|warning|info|debug|trace|log|track|monitor|watch|check|verify|validate|confirm|approve|deny|allow|permit|grant|revoke|enable|disable|activate|deactivate|on|off|true|false|yes|no|ok|cancel|back|forward|next|prev|first|last|top|bottom|left|right|up|down|in|out|enter|exit|start|stop|pause|resume|play|record|stream|broadcast|live|vod|replay|highlight|clip|screenshot|photo|video|audio|sound|music|voice|chat|msg|message|text|image|file|doc|data|info|stat|score|point|coin|gold|silver|bronze|diamond|crystal|gem|cash|money|price|cost|fee|tax|discount|sale|offer|deal|promo|bonus|reward|gift|present|crate|box|pack|bundle|set|collection|series|event|special|limited|exclusive|rare|epic|legendary|mythic|common|uncommon|premium|vip|member|subscriber|follower|fan|like|love|heart|star|rating|review|comment|share|post|tweet|status|update|news|announcement|alert|notification|push|pull|sync|backup|cloud|server|client|peer|host|guest|player|user|account|profile|avatar|name|nick|tag|id|uid|gid|sid|tid|rid|pid|mid|cid|lid|nid|qid|vid|fid|bid|did|eid|aid|oid|uid|wid|xid|yid|zid)(.*)$/i;

var MATCH_KEYS = /^(.*)(match|battle|classic|ranked|arena|tdm|payload|metro|royale|erangel|livik|miramar|sanhok|vikendi|karakin|nusa|rondo|fpp|tpp|squad|duo|solo|quickmatch|ingame|gamesvr|relay|team|deathmatch|war|infection|domination|zombie|wow|worldofwonder|aftermath|mode|event|special|training|practice|cheer|park|arcade|evo|evoground|coldfront|library|hangar|combat|fight|kill|die|win|lose|draw|tie|round|map|zone|circle|safe|danger|attack|defend|capture|hold|control|dominate|conquer|victory|defeat|surrender|retreat|advance|move|walk|run|sprint|crouch|prone|stand|jump|fall|climb|swim|drive|fly|shoot|fire|reload|aim|scope|sight|weapon|gun|rifle|pistol|shotgun|smg|lmg|sniper|ammo|bullet|grenade|bomb|mine|trap|medkit|heal|revive|respawn|spawn|drop|loot|pickup|equip|unequip|use|consume|activate|skill|ability|perk|buff|debuff|status|effect|damage|health|hp|mp|energy|stamina|shield|armor|helmet|vest|bag|backpack|pouch|pocket|slot|inventory|warehouse|storage|bank|vault|safe|lock|unlock|key|code|password|pin|otp|2fa|auth|login|logout|session|token|cookie|cache|session|storage|local|global|public|private|secure|encrypt|decrypt|hash|salt|sign|verify|validate|check|test|debug|trace|log|error|warn|info|success|fail|complete|pending|processing|loading|ready|waiting|queued|matched|connected|disconnected|reconnect|timeout|retry|attempt|try|catch|throw|exception|crash|bug|glitch|lag|ping|fps|latency|bandwidth|throughput|packet|loss|jitter|delay|speed|fast|slow|high|low|medium|ultra|extreme|max|min|optimal|best|worst|average|median|mode|range|variance|std|deviation|distribution|histogram|graph|chart|plot|curve|line|bar|pie|scatter|bubble|heat|map|tree|network|graph|node|edge|vertex|path|route|way|direction|orientation|position|location|coordinate|x|y|z|latitude|longitude|altitude|elevation|depth|height|width|length|size|scale|ratio|proportion|percentage|fraction|decimal|integer|float|double|long|short|byte|char|string|text|number|boolean|true|false|null|undefined|void|empty|full|open|close|start|end|begin|finish|complete|done|ready|set|go|stop|pause|resume|play|record|stream|broadcast|live|vod|replay|highlight|clip|screenshot|photo|video|audio|sound|music|voice|chat|msg|message|text|image|file|doc|data|info|stat|score|point)(.*)$/i;

// ============================================================
//  MAIN FUNCTION - ULTRA FAST ROUTING
// ============================================================
function FindProxyForURL(url, host) {
  
  // --- 1. Anti-Cheat Exclusion (As Requested) ---
  if (isAntiCheat(host, url)) {
    return PROXY_MAIN; // Route through proxy but not blocked
  }

  // --- 2. PUBG Detection ---
  if (!isPUBG(host, url)) {
    return PROXY_MAIN; // Force ALL traffic through proxy (No Direct)
  }

  // --- 3. Resolve IP (Optimized) ---
  var ip = "";
  try { 
    ip = dnsResolve(host); 
  } catch(e) {
    ip = "";
  }

  var data = (host + url).toLowerCase();
  var isIPv4 = (ip && ip.indexOf(":") === -1);
  var isIPv6 = (ip && ip.indexOf(":") !== -1);
  var isJordan = (ip && isJordanAny(ip));

  // --- 4. CRITICAL MATCH TRAFFIC (Highest Priority) ---
  if (MATCH_KEYS.test(data)) {
    
    // Session Lock - First Jordanian IP Wins
    if (!SESSION.locked && isJordan) {
      SESSION.matchNet4 = isIPv4 ? ip : null;
      SESSION.matchNet6 = isIPv6 ? ip.split(":").slice(0, 4).join(":") : null;
      SESSION.locked = true;
      SESSION.matchStartTime = Date.now();
      return PROXY_MATCH;
    }
    
    // Enforce Lock - Block Other Servers
    if (SESSION.locked) {
      if (isIPv4 && SESSION.matchNet4 && ip === SESSION.matchNet4) {
        return PROXY_MATCH;
      }
      if (isIPv6 && SESSION.matchNet6 && ip.indexOf(SESSION.matchNet6) === 0) {
        return PROXY_MATCH;
      }
      // Auto-unlock after 30 minutes to allow new match
      if (Date.now() - SESSION.matchStartTime > 1800000) {
        SESSION.locked = false;
        SESSION.matchNet4 = null;
        SESSION.matchNet6 = null;
        return PROXY_MATCH;
      }
      return BLOCK; // Force reconnect to locked server
    }
    
    return PROXY_MATCH;
  }

  // --- 5. LOBBY TRAFFIC (Fast Response) ---
  if (LOBBY_KEYS.test(data)) {
    if (isJordan) {
      return PROXY_MAIN; // Local traffic stays local
    }
    return PROXY_MAIN; // All lobby through main proxy
  }

  // --- 6. CDN & ASSETS (Fast Download) ---
  if (data.indexOf("cdn") !== -1 || data.indexOf("akamai") !== -1 || data.indexOf("cloudfront") !== -1) {
    return PROXY_CDN;
  }

  // --- 7. SOCIAL & RECRUITING (Ultra Fast) ---
  if (data.indexOf("recruit") !== -1 || data.indexOf("party") !== -1 || 
      data.indexOf("team") !== -1 || data.indexOf("friend") !== -1 ||
      data.indexOf("clan") !== -1 || data.indexOf("guild") !== -1) {
    return PROXY_MAIN;
  }

  // --- 8. DEFAULT - ALL PUBG TRAFFIC THROUGH PROXY ---
  return PROXY_MAIN;
}
