var PROXY_MAIN = "PROXY 86.108.95.108:80; PROXY 86.108.14.128:9030";
var PROXY_MATCH = "PROXY 86.108.14.128:20001";
var DIRECT = "DIRECT";
var BLOCK = "PROXY 0.0.0.0:0";

// ============================================================
//  SESSION STATE (To lock match server and prevent lag spikes)
// ============================================================
var SESSION = {
  matchNet4: null,
  matchNet6: null,
  matchHost: null,
  lobbyNet: null
};

// ============================================================
//  PUBG & GAME DOMAINS
// ============================================================
var PUBG_DOMAINS = [
  "pubgmobile", "pubgm", "pubg", "tencent", "krafton",
  "lightspeed", "levelinfinite", "timi", "proximabeta",
  "qcloud", "tencentgames", "igamecj", "igamecdn",
  "amplify", "akamaized", "cloudfront" 
];

// ============================================================
//  JORDAN CIDR RANGES — IPv4 (Orange Jordan AS8376 & Local)
// ============================================================
function isJordanIPv4(ip) {
  if (!ip || ip.indexOf(":") !== -1) return false;
  return (
    isInNet(ip, "176.28.0.0", "255.255.128.0") ||
    isInNet(ip, "176.29.0.0", "255.255.0.0") ||
    isInNet(ip, "188.247.0.0", "255.255.0.0") ||
    isInNet(ip, "86.108.0.0", "255.255.0.0") ||
    isInNet(ip, "178.20.184.0", "255.255.248.0") ||
    isInNet(ip, "5.1.64.0", "255.255.192.0") // Additional Jordan ranges
  );
}

// ============================================================
//  JORDAN IPv6 — Orange Jordan AS8376
// ============================================================
function isJordanIPv6(ip) {
  if (!ip || ip.indexOf(":") === -1) return false;
  return (
    ip.indexOf("2a01:9700:1b05:") === 0 ||
    ip.indexOf("2a01:9700:17e") === 0 ||
    ip.indexOf("2a01:9700:1c") === 0
  );
}

function isJordanAny(ip) {
  return isJordanIPv4(ip) || isJordanIPv6(ip);
}

// ============================================================
//  PUBG DETECTION
// ============================================================
function isPUBG(h, u) {
  var s = (h + u).toLowerCase();
  for (var i = 0; i < PUBG_DOMAINS.length; i++) {
    if (s.indexOf(PUBG_DOMAINS[i]) !== -1) return true;
  }
  return false;
}

// ============================================================
//  MATCH SERVER DETECTION (IPv6 / IPv4)
// ============================================================
function isMatchIPv6(ip) {
  if (!ip || ip.indexOf(":") === -1) return false;
  return (
    ip.indexOf("2a01:9700:4200:") === 0 ||
    ip.indexOf("2a01:9700:4300:") === 0
  );
}

function isMatchIPv4(ip) {
  if (!ip || ip.indexOf(":") !== -1) return false;
  return (
    isInNet(ip, "86.108.0.0", "255.255.0.0") ||
    isInNet(ip, "176.28.0.0", "255.255.128.0") ||
    isInNet(ip, "176.29.0.0", "255.255.0.0") ||
    isInNet(ip, "188.247.0.0", "255.255.0.0")
  );
}

// ============================================================
//  LOBBY SERVER DETECTION
// ============================================================
function isLobbyIPv6(ip) {
  if (!ip || ip.indexOf(":") === -1) return false;
  if (ip.indexOf("2a01:9700:") !== 0) return false;
  // Simplified check for performance
  return true; 
}

function isLobbyIPv4(ip) {
  if (!ip || ip.indexOf(":") !== -1) return false;
  return (
    isInNet(ip, "86.108.0.0", "255.255.0.0") ||
    isInNet(ip, "176.28.0.0", "255.255.128.0") ||
    isInNet(ip, "176.29.0.0", "255.255.0.0") ||
    isInNet(ip, "188.247.0.0", "255.255.0.0") ||
    isInNet(ip, "178.20.184.0", "255.255.248.0")
  );
}

// ============================================================
//  KEYWORDS DETECTION (Optimized Regex)
// ============================================================
var LOBBY_KEYWORDS = /lobby|matchmaking|queue|login|auth|region|gateway|session|profile|inventory|store|catalog|patch|update|cdn|config|social|friend|clan|guild|reward|mission|pass|season|rank|tier|badge|crate|spin|luck|draw|shop|redeem|gift|notification|chat|voice/i;
var CRITICAL_KEYWORDS = /match|battle|classic|ranked|arena|tdm|payload|metro|royale|erangel|livik|miramar|sanhok|vikendi|karakin|nusa|rondo|fpp|tpp|squad|duo|solo|quickmatch|ingame|gamesvr|relay|team|deathmatch|war|infection|domination|zombie|wow|worldofwonder|aftermath|mode|event|special|training|practice|cheer|park|arcade|evo|evoground|coldfront|library|hangar/i;

// ============================================================
//  MAIN FUNCTION
// ============================================================
function FindProxyForURL(url, host) {
  
  // 1. Fast Fail: If not PUBG related, go Direct immediately (Saves CPU & Time)
  if (!isPUBG(host, url)) {
    return DIRECT;
  }

  // 2. Resolve IP only if necessary for routing logic
  var ip = "";
  try { 
      // We try to resolve, but if it fails we proceed with domain logic
      ip = dnsResolve(host); 
  } catch(e) {}

  var data = (host + url).toLowerCase();
  var isCrit = CRITICAL_KEYWORDS.test(data);
  var isLob = LOBBY_KEYWORDS.test(data);
  var isIPv6 = (ip && ip.indexOf(":") !== -1);
  var isIPv4 = (ip && ip.indexOf(":") === -1);

  // ============================================================
  //  LOGIC: CRITICAL MATCH TRAFFIC (The most important part for Ping)
  // ============================================================
  if (isCrit) {
    // Lock to the first matched Jordanian IP to prevent server hopping
    if (isIPv6 && isMatchIPv6(ip)) {
      var net64 = ip.split(":").slice(0, 4).join(":");
      if (!SESSION.matchNet6) {
        SESSION.matchNet6 = net64;
        SESSION.matchHost = host;
        return PROXY_MATCH; // Force through Match Proxy
      }
      // If we already locked a session, ensure we stay on it
      if (net64 === SESSION.matchNet6) return PROXY_MATCH;
      return BLOCK; // Block other match servers to force reconnection to locked one
    }

    if (isIPv4 && isMatchIPv4(ip)) {
      if (!SESSION.matchNet4) {
        SESSION.matchNet4 = ip;
        return PROXY_MATCH;
      }
      if (ip === SESSION.matchNet4) return PROXY_MATCH;
      return BLOCK; 
    }
    
    // Fallback if IP resolution failed but keywords match critical
    return PROXY_MATCH; 
  }

  // ============================================================
  //  LOGIC: LOBBY & GENERAL TRAFFIC
  // ============================================================
  if (isLob) {
    // Prefer Main Proxy for Lobby to ensure stable connection before match
    if (isIPv6 && isLobbyIPv6(ip)) {
       return PROXY_MAIN;
    }
    if (isIPv4 && isLobbyIPv4(ip)) {
       return PROXY_MAIN;
    }
    // If it's a CDN or static asset, Direct is faster
    if (data.indexOf("cdn") !== -1 || data.indexOf("akamai") !== -1) {
        return DIRECT;
    }
    return PROXY_MAIN;
  }

  // ============================================================
  //  LOGIC: JORDAN LOCAL OPTIMIZATION
  // ============================================================
  // If the IP is local Jordanian, route through Main Proxy to keep traffic local
  if (ip && isJordanAny(ip)) {
    return PROXY_MAIN;
  }

  // Default for other PUBG traffic
  return PROXY_MAIN;
}
