// ============================================================
//  PUBG MOBILE — JORDAN LOCK v9.1
//  Main Proxies: 86.108.95.108:443 + 86.108.76.192:8080
//  Match Proxy:  86.108.14.128:20001
//  Jordan CIDR IPv4 + IPv6
//  All Modes Covered
// ============================================================

var PROXY_MAIN = "PROXY 86.108.95.108:443; PROXY 86.108.76.192:8080";
var PROXY_MATCH = "PROXY 86.108.14.128:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ============================================================
//  SESSION STATE
// ============================================================
var SESSION = {
  matchNet4: null,
  matchNet6: null,
  matchHost: null,
  lobbyNet:  null
};

// ============================================================
//  PUBG SERVER DOMAINS
// ============================================================
var PUBG_DOMAINS = [
  "pubgmobile", "pubgm", "pubg", "tencent", "krafton",
  "lightspeed", "levelinfinite", "timi", "proximabeta",
  "qcloud", "tencentgames", "igamecj", "igamecdn"
];

// ============================================================
//  JORDAN CIDR RANGES — IPv4 (Orange Jordan AS8376)
// ============================================================
function isJordanIPv4(ip) {
  if (!ip || ip.indexOf(":") !== -1) return false;
  return (
    isInNet(ip, "176.28.0.0",   "255.255.128.0") ||
    isInNet(ip, "176.29.0.0",   "255.255.0.0")   ||
    isInNet(ip, "188.247.0.0",  "255.255.0.0")   ||
    isInNet(ip, "86.108.0.0",   "255.255.0.0")   ||
    isInNet(ip, "178.20.184.0", "255.255.248.0")
  );
}

// ============================================================
//  JORDAN IPv6 — Orange Jordan AS8376
// ============================================================
function isJordanIPv6(ip) {
  if (!ip || ip.indexOf(":") === -1) return false;
  return (
    ip.indexOf("2a01:9700:1b05:") === 0 ||
    ip.indexOf("2a01:9700:17e")  === 0 ||
    ip.indexOf("2a01:9700:1c")   === 0
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
//  MATCH SERVER — IPv6 /48
// ============================================================
function isMatchIPv6(ip) {
  if (!ip || ip.indexOf(":") === -1) return false;
  return (
    ip.indexOf("2a01:9700:4200:") === 0 ||
    ip.indexOf("2a01:9700:4300:") === 0
  );
}

// ============================================================
//  MATCH SERVER — IPv4
// ============================================================
function isMatchIPv4(ip) {
  if (!ip || ip.indexOf(":") !== -1) return false;
  return (
    isInNet(ip, "86.108.0.0",   "255.255.0.0")   ||
    isInNet(ip, "176.28.0.0",   "255.255.128.0") ||
    isInNet(ip, "176.29.0.0",   "255.255.0.0")   ||
    isInNet(ip, "188.247.0.0",  "255.255.0.0")
  );
}

// ============================================================
//  LOBBY SERVER — IPv6
// ============================================================
function isLobbyIPv6(ip) {
  if (!ip || ip.indexOf(":") === -1) return false;
  if (ip.indexOf("2a01:9700:") !== 0) return false;
  var val = parseInt(ip.charAt(9), 16) * 16 + parseInt(ip.charAt(10), 16);
  return (val >= 0x10 && val <= 0x90);
}

// ============================================================
//  LOBBY SERVER — IPv4
// ============================================================
function isLobbyIPv4(ip) {
  if (!ip || ip.indexOf(":") !== -1) return false;
  return (
    isInNet(ip, "86.108.0.0",   "255.255.0.0")   ||
    isInNet(ip, "176.28.0.0",   "255.255.128.0") ||
    isInNet(ip, "176.29.0.0",   "255.255.0.0")   ||
    isInNet(ip, "188.247.0.0",  "255.255.0.0")   ||
    isInNet(ip, "178.20.184.0", "255.255.248.0")
  );
}

// ============================================================
//  CRITICAL — All Match Modes
// ============================================================
var CRITICAL = /match|battle|classic|ranked|arena|tdm|payload|metro|royale|erangel|livik|miramar|sanhok|vikendi|karakin|nusa|rondo|fpp|tpp|squad|duo|solo|quickmatch|ingame|gamesvr|relay|team|deathmatch|war|infection|domination|zombie|wow|worldofwonder|aftermath|mode|event|special|training|practice|cheer|park|arcade|evo|evoground|coldfront|library|hangar/i;

// ============================================================
//  LOBBY — Everything Else PUBG
// ============================================================
var LOBBY = /lobby|matchmaking|queue|login|auth|region|gateway|session|profile|inventory|store|catalog|patch|update|cdn|config|social|friend|clan|guild|reward|mission|pass|season|rank|tier|badge|crate|spin|luck|draw|shop|redeem|gift|notification|chat|voice/i;

// ============================================================
//  MAIN — FindProxyForURL
// ============================================================
function FindProxyForURL(url, host) {

  // --- Resolve IP ---
  var ip = "";
  try { ip = dnsResolve(host); } catch(e) {}

  // --- Skip non-PUBG ---
  if (isPlainHostName(host)) return DIRECT;
  if (!isPUBG(host, url))    return DIRECT;

  // --- Must have IP ---
  if (!ip) return BLOCK;

  var isIPv6 = (ip.indexOf(":") !== -1);
  var isIPv4 = !isIPv6;
  var data   = (host + url).toLowerCase();
  var isCrit = CRITICAL.test(data);
  var isLob  = LOBBY.test(data);

  // ============================================================
  //  MATCH LOCK → بروكسي المباريات فقط
  // ============================================================
  if (isCrit) {
    if (isIPv6 && isMatchIPv6(ip)) {
      var net64 = ip.split(":").slice(0, 4).join(":");
      if (!SESSION.matchNet6) {
        SESSION.matchNet6 = net64;
        SESSION.matchHost = host;
        return PROXY_MATCH;
      }
      if (net64 !== SESSION.matchNet6) return BLOCK;
      return PROXY_MATCH;
    }
    if (isIPv4 && isMatchIPv4(ip)) {
      if (!SESSION.matchNet4) {
        SESSION.matchNet4 = ip;
        SESSION.matchHost = host;
        return PROXY_MATCH;
      }
      if (ip !== SESSION.matchNet4) return BLOCK;
      return PROXY_MATCH;
    }
    return BLOCK;
  }

  // ============================================================
  //  LOBBY → البروكسيين الأساسيين (بدون ستوب)
  // ============================================================
  if (isLob) {
    if (isIPv6 && isLobbyIPv6(ip)) {
      var net48 = ip.split(":").slice(0, 3).join(":");
      if (!SESSION.lobbyNet || SESSION.lobbyNet !== net48) {
        SESSION.lobbyNet = net48;
      }
      return PROXY_MAIN;
    }
    if (isIPv4 && isLobbyIPv4(ip)) {
      return PROXY_MAIN;
    }
  }

  // ============================================================
  //  JORDAN PEER BIAS → البروكسيين الأساسيين
  // ============================================================
  if (isJordanAny(ip)) return PROXY_MAIN;

  return BLOCK;
}
