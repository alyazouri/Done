// ============================================================
// PUBG JORDAN + GULF ULTIMATE v13.0 - SEPARATED PROXIES
// ============================================================
// ✅ بروكسي لوبي مستقل
// ✅ بروكسي مباريات مستقل
// ✅ بروكسي باك أب لوبي مستقل
// ✅ Private IP → DIRECT دائماً
// ✅ أردن أولوية قصوى - لوبي سريع
// ✅ خليج fallback بعد 45 ثانية
// ✅ جميع مودات PUBG Mobile
// ✅ Orange + Zain + Umniah كاملة
// ✅ خليج كامل: KW+UAE+SA+BH+QA+OM+IQ
// ============================================================

// ========== PROXY GROUPS ==========

// 🎮 بروكسي لوبي (2 بروكسي - round-robin)
var LOBBY_PROXY_1 = "PROXY 109.237.193.187:443";
var LOBBY_PROXY_2 = "PROXY 149.200.136.6:443";

// ⚔️ بروكسي مباريات (1 بروكسي)
var MATCH_PROXY   = "PROXY 94.127.211.6:20001";

// 📦 بروكسي باك أب لوبي (3 بروكسي - round-robin)
var BACKUP_PROXY_1 = "PROXY 188.247.66.133:443";
var BACKUP_PROXY_2 = "PROXY 188.123.160.201:443";
var BACKUP_PROXY_3 = "PROXY 212.35.85.26:443";

var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ========== ROUND ROBIN COUNTERS ==========
var lobbyCounter  = 0;
var backupCounter = 0;

function getLobbyProxy() {
  // تبديل بين البروكسيين للوبي
  lobbyCounter = (lobbyCounter + 1) % 2;
  return (lobbyCounter === 0) ? LOBBY_PROXY_1 : LOBBY_PROXY_2;
}

function getBackupProxy() {
  // تبديل بين 3 بروكسي باك أب
  backupCounter = (backupCounter + 1) % 3;
  if (backupCounter === 0) return BACKUP_PROXY_1;
  if (backupCounter === 1) return BACKUP_PROXY_2;
  return BACKUP_PROXY_3;
}

// ============================================================
// ========== SESSION لوبي ==========
// ============================================================

var LOBBY = {
  active:     false,
  startTime:  0,
  waitMS:     45000   // 45 ثانية أردن فقط
};

function initLobby() {
  if (!LOBBY.active) {
    LOBBY.startTime = (new Date()).getTime();
    LOBBY.active    = true;
  }
}

function isJordanWindow() {
  var elapsed = (new Date()).getTime() - LOBBY.startTime;
  return elapsed < LOBBY.waitMS;
}

// ============================================================
// ========== IP UTILS ==========
// ============================================================

function isIPv6(ip) {
  return ip && ip.indexOf(":") !== -1;
}

function isIPv4(ip) {
  return ip && /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip);
}

function expandIPv6(addr) {
  if (!addr || addr.indexOf(":") === -1) return addr;
  if (addr.indexOf("%") !== -1) addr = addr.split("%")[0];
  addr = addr.toLowerCase();
  var parts = addr.split("::");
  var full  = [];
  if (parts.length === 2) {
    var left    = parts[0] ? parts[0].split(":") : [];
    var right   = parts[1] ? parts[1].split(":") : [];
    var missing = 8 - (left.length + right.length);
    full = left;
    for (var i = 0; i < missing; i++) full.push("0000");
    full = full.concat(right);
  } else {
    full = addr.split(":");
  }
  for (var j = 0; j < full.length; j++) {
    while (full[j].length < 4) full[j] = "0" + full[j];
  }
  return full.join(":");
}

// ============================================================
// ========== PRIVATE IP → DIRECT ==========
// ============================================================

function isPrivate(ip) {
  if (isIPv4(ip)) {
    return (
      ip.startsWith("10.")      ||
      ip.startsWith("127.")     ||
      ip.startsWith("169.254.") ||
      ip.startsWith("192.168.") ||
      ip.startsWith("172.16.")  ||
      ip.startsWith("172.17.")  ||
      ip.startsWith("172.18.")  ||
      ip.startsWith("172.19.")  ||
      ip.startsWith("172.20.")  ||
      ip.startsWith("172.21.")  ||
      ip.startsWith("172.22.")  ||
      ip.startsWith("172.23.")  ||
      ip.startsWith("172.24.")  ||
      ip.startsWith("172.25.")  ||
      ip.startsWith("172.26.")  ||
      ip.startsWith("172.27.")  ||
      ip.startsWith("172.28.")  ||
      ip.startsWith("172.29.")  ||
      ip.startsWith("172.30.")  ||
      ip.startsWith("172.31.")  ||
      ip.startsWith("100.64.")  ||
      ip.startsWith("100.65.")  ||
      ip.startsWith("100.66.")  ||
      ip.startsWith("100.67.")  ||
      ip.startsWith("100.68.")  ||
      ip.startsWith("100.69.")  ||
      ip.startsWith("100.70.")  ||
      ip.startsWith("100.71.")  ||
      ip.startsWith("100.72.")  ||
      ip.startsWith("100.73.")  ||
      ip.startsWith("100.74.")  ||
      ip.startsWith("100.75.")  ||
      ip.startsWith("100.76.")  ||
      ip.startsWith("100.77.")  ||
      ip.startsWith("100.78.")  ||
      ip.startsWith("100.79.")  ||
      ip.startsWith("100.80.")  ||
      ip.startsWith("100.81.")  ||
      ip.startsWith("100.82.")  ||
      ip.startsWith("100.83.")  ||
      ip.startsWith("100.84.")  ||
      ip.startsWith("100.85.")  ||
      ip.startsWith("100.86.")  ||
      ip.startsWith("100.87.")  ||
      ip.startsWith("100.88.")  ||
      ip.startsWith("100.89.")  ||
      ip.startsWith("100.90.")  ||
      ip.startsWith("100.91.")  ||
      ip.startsWith("100.92.")  ||
      ip.startsWith("100.93.")  ||
      ip.startsWith("100.94.")  ||
      ip.startsWith("100.95.")  ||
      ip.startsWith("100.96.")  ||
      ip.startsWith("100.97.")  ||
      ip.startsWith("100.98.")  ||
      ip.startsWith("100.99.")  ||
      ip.startsWith("100.100.") ||
      ip.startsWith("100.101.") ||
      ip.startsWith("100.102.") ||
      ip.startsWith("100.103.") ||
      ip.startsWith("100.104.") ||
      ip.startsWith("100.105.") ||
      ip.startsWith("100.106.") ||
      ip.startsWith("100.107.") ||
      ip.startsWith("100.108.") ||
      ip.startsWith("100.109.") ||
      ip.startsWith("100.110.") ||
      ip.startsWith("100.111.") ||
      ip.startsWith("100.112.") ||
      ip.startsWith("100.113.") ||
      ip.startsWith("100.114.") ||
      ip.startsWith("100.115.") ||
      ip.startsWith("100.116.") ||
      ip.startsWith("100.117.") ||
      ip.startsWith("100.118.") ||
      ip.startsWith("100.119.") ||
      ip.startsWith("100.120.") ||
      ip.startsWith("100.121.") ||
      ip.startsWith("100.122.") ||
      ip.startsWith("100.123.") ||
      ip.startsWith("100.124.") ||
      ip.startsWith("100.125.") ||
      ip.startsWith("100.126.") ||
      ip.startsWith("100.127.")
    );
  }
  if (isIPv6(ip)) {
    var ex = expandIPv6(ip);
    return (
      ex.startsWith("fc")    ||
      ex.startsWith("fd")    ||
      ex.startsWith("fe80:") ||
      ex.startsWith("ff00:") ||
      ex === "0000:0000:0000:0000:0000:0000:0000:0001"
    );
  }
  return false;
}

// ============================================================
// ========== JORDAN ==========
// ============================================================

function isJordan(ip) {
  if (isIPv4(ip)) {
    return (
      ip.startsWith("82.212.")     ||
      ip.startsWith("5.21.")       ||
      ip.startsWith("5.22.")       ||
      ip.startsWith("5.23.")       ||
      ip.startsWith("62.3.")       ||
      ip.startsWith("79.173.")     ||
      ip.startsWith("194.126.16.") ||
      ip.startsWith("194.126.17.") ||
      ip.startsWith("194.126.18.") ||
      ip.startsWith("194.126.19.") ||
      ip.startsWith("46.161.56.")  ||
      ip.startsWith("46.161.57.")  ||
      ip.startsWith("46.161.58.")  ||
      ip.startsWith("46.161.59.")  ||
      ip.startsWith("31.9.64.")    ||
      ip.startsWith("31.9.65.")    ||
      ip.startsWith("31.9.66.")    ||
      ip.startsWith("31.9.67.")    ||
      ip.startsWith("31.9.68.")    ||
      ip.startsWith("31.9.69.")    ||
      ip.startsWith("31.9.70.")    ||
      ip.startsWith("31.9.71.")    ||
      ip.startsWith("31.9.72.")    ||
      ip.startsWith("31.9.73.")    ||
      ip.startsWith("31.9.74.")    ||
      ip.startsWith("31.9.75.")    ||
      ip.startsWith("31.9.76.")    ||
      ip.startsWith("31.9.77.")    ||
      ip.startsWith("31.9.78.")    ||
      ip.startsWith("31.9.79.")    ||
      ip.startsWith("178.238.64.") ||
      ip.startsWith("178.238.65.") ||
      ip.startsWith("178.238.66.") ||
      ip.startsWith("178.238.67.") ||
      ip.startsWith("178.238.68.") ||
      ip.startsWith("178.238.69.") ||
      ip.startsWith("178.238.70.") ||
      ip.startsWith("178.238.71.") ||
      ip.startsWith("46.185.")     ||
      ip.startsWith("37.98.")      ||
      ip.startsWith("37.99.")      ||
      ip.startsWith("95.177.")     ||
      ip.startsWith("188.247.")    ||
      ip.startsWith("176.28.")     ||
      ip.startsWith("176.29.")     ||
      ip.startsWith("85.159.192.") ||
      ip.startsWith("85.159.193.") ||
      ip.startsWith("85.159.194.") ||
      ip.startsWith("85.159.195.") ||
      ip.startsWith("85.159.196.") ||
      ip.startsWith("85.159.197.") ||
      ip.startsWith("85.159.198.") ||
      ip.startsWith("85.159.199.") ||
      ip.startsWith("109.224.")    ||
      ip.startsWith("109.225.")    ||
      ip.startsWith("109.226.")    ||
      ip.startsWith("109.227.")    ||
      ip.startsWith("109.228.")    ||
      ip.startsWith("109.229.")    ||
      ip.startsWith("109.230.")    ||
      ip.startsWith("109.231.")    ||
      ip.startsWith("185.22.212.") ||
      ip.startsWith("185.22.213.") ||
      ip.startsWith("185.22.214.") ||
      ip.startsWith("185.22.215.") ||
      ip.startsWith("91.222.196.") ||
      ip.startsWith("91.222.197.") ||
      ip.startsWith("91.222.198.") ||
      ip.startsWith("91.222.199.") ||
      ip.startsWith("91.222.200.") ||
      ip.startsWith("91.222.201.") ||
      ip.startsWith("91.222.202.") ||
      ip.startsWith("91.222.203.") ||
      ip.startsWith("77.246.176.") ||
      ip.startsWith("77.246.177.") ||
      ip.startsWith("77.246.178.") ||
      ip.startsWith("77.246.179.") ||
      ip.startsWith("77.246.180.") ||
      ip.startsWith("77.246.181.") ||
      ip.startsWith("77.246.182.") ||
      ip.startsWith("77.246.183.") ||
      ip.startsWith("212.34.96.")  ||
      ip.startsWith("212.34.97.")  ||
      ip.startsWith("212.34.98.")  ||
      ip.startsWith("212.34.99.")  ||
      ip.startsWith("82.178.")      ||
      ip.startsWith("82.179.")      ||
      ip.startsWith("212.118.")     ||
      ip.startsWith("212.119.")     ||
      ip.startsWith("217.144.")     ||
      ip.startsWith("217.145.")     ||
      ip.startsWith("195.229.40.")  ||
      ip.startsWith("195.229.41.")  ||
      ip.startsWith("195.229.42.")  ||
      ip.startsWith("195.229.43.")  ||
      ip.startsWith("195.229.44.")  ||
      ip.startsWith("195.229.45.")  ||
      ip.startsWith("195.229.46.")  ||
      ip.startsWith("195.229.47.")  ||
      ip.startsWith("212.34.128.")  ||
      ip.startsWith("212.34.129.")  ||
      ip.startsWith("212.34.130.")  ||
      ip.startsWith("212.34.131.")  ||
      ip.startsWith("176.105.144.") ||
      ip.startsWith("176.105.145.") ||
      ip.startsWith("176.105.146.") ||
      ip.startsWith("176.105.147.")
    );
  }
  if (isIPv6(ip)) {
    var ex = expandIPv6(ip);
    return (
      ex.startsWith("2a04:4e42:") ||
      ex.startsWith("2001:df0:")   ||
      ex.startsWith("2001:4d20:")  ||
      ex.startsWith("2001:4d28:")  ||
      ex.startsWith("2a01:9700:")  ||
      ex.startsWith("2a02:00ed:") ||
      ex.startsWith("2a02:00ee:") ||
      ex.startsWith("2a06:e881:") ||
      ex.startsWith("2a05:dfc1:") ||
      ex.startsWith("2a0d:5600:") ||
      ex.startsWith("2a0a:e5c0:") ||
      ex.startsWith("2a0c:b641:") ||
      ex.startsWith("2001:df7:")
    );
  }
  return false;
}

// ============================================================
// ========== GULF ==========
// ============================================================

function isGulf(ip) {
  if (isIPv4(ip)) {
    return (
      ip.startsWith("37.36.")      ||
      ip.startsWith("37.37.")      ||
      ip.startsWith("91.74.")      ||
      ip.startsWith("91.75.")      ||
      ip.startsWith("91.76.")      ||
      ip.startsWith("91.77.")      ||
      ip.startsWith("194.29.32.")  ||
      ip.startsWith("194.29.33.")  ||
      ip.startsWith("194.29.34.")  ||
      ip.startsWith("194.29.35.")  ||
      ip.startsWith("212.32.192.") ||
      ip.startsWith("212.32.193.") ||
      ip.startsWith("212.32.194.") ||
      ip.startsWith("212.32.195.") ||
      ip.startsWith("212.118.64.") ||
      ip.startsWith("212.118.65.") ||
      ip.startsWith("212.118.66.") ||
      ip.startsWith("212.118.67.") ||
      ip.startsWith("78.56.")      ||
      ip.startsWith("78.57.")      ||
      ip.startsWith("78.58.")      ||
      ip.startsWith("78.59.")      ||
      ip.startsWith("94.200.")     ||
      ip.startsWith("94.201.")     ||
      ip.startsWith("94.202.")     ||
      ip.startsWith("94.203.")     ||
      ip.startsWith("213.42.")     ||
      ip.startsWith("213.43.")     ||
      ip.startsWith("195.229.24.") ||
      ip.startsWith("195.229.25.") ||
      ip.startsWith("195.229.26.") ||
      ip.startsWith("195.229.27.") ||
      ip.startsWith("185.87.48.")  ||
      ip.startsWith("185.87.49.")  ||
      ip.startsWith("185.87.50.")  ||
      ip.startsWith("185.87.51.")  ||
      ip.startsWith("81.22.144.")  ||
      ip.startsWith("81.22.145.")  ||
      ip.startsWith("81.22.146.")  ||
      ip.startsWith("81.22.147.")  ||
      ip.startsWith("188.0.")      ||
      ip.startsWith("188.1.")      ||
      ip.startsWith("188.2.")      ||
      ip.startsWith("188.3.")      ||
      ip.startsWith("212.49.")     ||
      ip.startsWith("212.50.")     ||
      ip.startsWith("212.51.")     ||
      ip.startsWith("93.188.")     ||
      ip.startsWith("93.189.")     ||
      ip.startsWith("93.190.")     ||
      ip.startsWith("93.191.")     ||
      ip.startsWith("87.98.128.")  ||
      ip.startsWith("87.98.129.")  ||
      ip.startsWith("87.98.130.")  ||
      ip.startsWith("87.98.131.")  ||
      ip.startsWith("37.205.")     ||
      ip.startsWith("37.206.")     ||
      ip.startsWith("37.207.")     ||
      ip.startsWith("78.95.")      ||
      ip.startsWith("78.96.")      ||
      ip.startsWith("78.97.")      ||
      ip.startsWith("78.98.")      ||
      ip.startsWith("78.99.")      ||
      ip.startsWith("37.239.")     ||
      ip.startsWith("185.46.212.") ||
      ip.startsWith("185.46.213.") ||
      ip.startsWith("185.46.214.") ||
      ip.startsWith("185.46.215.") ||
      ip.startsWith("217.73.")     ||
      ip.startsWith("217.74.")     ||
      ip.startsWith("217.75.")     ||
      ip.startsWith("88.201.")     ||
      ip.startsWith("88.202.")     ||
      ip.startsWith("88.203.")     ||
      ip.startsWith("213.5.224.")  ||
      ip.startsWith("213.5.225.")  ||
      ip.startsWith("213.5.226.")  ||
      ip.startsWith("213.5.227.")  ||
      ip.startsWith("213.5.228.")  ||
      ip.startsWith("213.5.229.")  ||
      ip.startsWith("213.5.230.")  ||
      ip.startsWith("213.5.231.")  ||
      ip.startsWith("79.170.232.") ||
      ip.startsWith("79.170.233.") ||
      ip.startsWith("79.170.234.") ||
      ip.startsWith("79.170.235.") ||
      ip.startsWith("217.19.")     ||
      ip.startsWith("94.56.")      ||
      ip.startsWith("94.57.")      ||
      ip.startsWith("94.58.")      ||
      ip.startsWith("94.59.")      ||
      ip.startsWith("195.180.16.") ||
      ip.startsWith("195.180.17.") ||
      ip.startsWith("195.180.18.") ||
      ip.startsWith("195.180.19.") ||
      ip.startsWith("37.210.")     ||
      ip.startsWith("37.211.")     ||
      ip.startsWith("77.69.224.")  ||
      ip.startsWith("77.69.225.")  ||
      ip.startsWith("77.69.226.")  ||
      ip.startsWith("77.69.227.")  ||
      ip.startsWith("188.135.")    ||
      ip.startsWith("185.93.168.") ||
      ip.startsWith("185.93.169.") ||
      ip.startsWith("185.93.170.") ||
      ip.startsWith("185.93.171.") ||
      ip.startsWith("193.106.24.") ||
      ip.startsWith("193.106.25.") ||
      ip.startsWith("193.106.26.") ||
      ip.startsWith("193.106.27.") ||
      ip.startsWith("37.189.")     ||
      ip.startsWith("37.190.")     ||
      ip.startsWith("37.191.")     ||
      ip.startsWith("37.238.")     ||
      ip.startsWith("37.236.")     ||
      ip.startsWith("37.237.")     ||
      ip.startsWith("78.162.")     ||
      ip.startsWith("78.163.")     ||
      ip.startsWith("213.244.0.")  ||
      ip.startsWith("213.244.1.")  ||
      ip.startsWith("213.244.2.")  ||
      ip.startsWith("213.244.3.")  ||
      ip.startsWith("213.230.")    ||
      ip.startsWith("213.231.")
    );
  }
  if (isIPv6(ip)) {
    var ex = expandIPv6(ip);
    return (
      ex.startsWith("2a02:e680:") ||
      ex.startsWith("2a01:9880:") ||
      ex.startsWith("2a0d:d6c0:") ||
      ex.startsWith("2a0d:d6c8:") ||
      ex.startsWith("2a09:2c80:") ||
      ex.startsWith("2a09:2c88:") ||
      ex.startsWith("2a09:ba80:") ||
      ex.startsWith("2a09:ba88:") ||
      ex.startsWith("2a0d:5987:") ||
      ex.startsWith("2a06:8ec0:") ||
      ex.startsWith("2a06:8ec1:") ||
      ex.startsWith("2a0c:a080:") ||
      ex.startsWith("2a0c:a088:") ||
      ex.startsWith("2a0c:5a80:") ||
      ex.startsWith("2a0c:5a88:") ||
      ex.startsWith("2a0d:1e40:") ||
      ex.startsWith("2a0d:1e48:") ||
      ex.startsWith("2a0d:4480:") ||
      ex.startsWith("2a0d:4488:") ||
      ex.startsWith("2a04:3540:") ||
      ex.startsWith("2a04:3548:") ||
      ex.startsWith("2a0b:8500:") ||
      ex.startsWith("2a0b:8508:")
    );
  }
  return false;
}

// ============================================================
// ========== BLOCK - دول ممنوعة ==========
// ============================================================

function isBlocked(ip) {
  var f = isIPv6(ip) ? expandIPv6(ip) : ip;
  return (
    f.startsWith("2a00:1b20:") ||
    f.startsWith("2a01:5ec0:") ||
    f.startsWith("2a03:3b40:") ||
    f.startsWith("2a06:f900:") ||
    f.startsWith("2a10:3780:") ||
    f.startsWith("2401:4900:") ||
    f.startsWith("2407:aa20:") ||
    f.startsWith("2407:aa40:") ||
    f.startsWith("2407:d000:") ||
    f.startsWith("2405:200:")  ||
    f.startsWith("2405:201:")  ||
    f.startsWith("2406:da14:") ||
    f.startsWith("2400:3c00:") ||
    f.startsWith("2400:4f00:") ||
    f.startsWith("2c0f:f248:") ||
    f.startsWith("2001:16a0:") ||
    f.startsWith("2a00:d080:") ||
    f.startsWith("2a02:4780:") ||
    f.startsWith("2a02:6b8:")  ||
    f.startsWith("2a00:1148:") ||
    f.startsWith("240e:")      ||
    f.startsWith("2402:4e00:") ||
    f.startsWith("2400:3200:") ||
    f.startsWith("2a09:7c40:") ||
    f.startsWith("2a0d:5e40:") ||
    f.startsWith("2a0d:a240:")
  );
}

// ============================================================
// ========== PUBG DETECTION ==========
// ============================================================

function isPUBG(host, url) {
  return /pubg|tencent|krafton|lightspeed|levelinfinite|battlegrounds|gamesvr|matchsvr|lobbysvr|sgame|proxymatch/i.test(host + url);
}

// ============================================================
// ========== LOBBY DETECTION ==========
// ============================================================

function isLobby(host) {
  return /lobby|login|auth|session|gateway|region|matchmaking|queue|profile|inventory|store|shop|catalog|news|event|mission|reward|mail|friends|clan|chat|voice|party|team|config|settings|rank|leaderboard|account|season|pass|token|verify|connect|handshake|init|bootstrap|heartbeat|social|badge|achievement/i.test(host);
}

// ============================================================
// ========== BACKUP LOBBY DETECTION ==========
// ============================================================

function isBackupLobby(host) {
  return /backup|cdn|patch|update|download|assets|resource|bundle|patchsvr|filesvr|storage|cache|sync|version|check|manifest|package|res|sound|texture|map|model|skin|emote|loading/i.test(host);
}

// ============================================================
// ========== MATCH DETECTION ==========
// ============================================================

function isMatch(host) {
  return /match|battle|fight|combat|arena|zone|safezone|kill|damage|shot|bullet|bulletmgr|gamemgr|gamesvr|room|instance|scene|physics|net|tick|sync|state|position|velocity|hit|respawn|revive|spectate|replay|result|score|finish|endgame|spectator|observer|livefeed/i.test(host);
}

// ============================================================
// ========== MAIN ==========
// ============================================================

function FindProxyForURL(url, host) {

  // ===== محلي → مباشر =====
  if (isPlainHostName(host)) return DIRECT;
  if (host === "localhost")  return DIRECT;

  // ===== PUBG فقط =====
  if (!isPUBG(host, url)) return DIRECT;

  // ===== DNS =====
  var ip = "";
  try { ip = dnsResolve(host); }    catch(e)  { ip = ""; }
  if (!ip) {
    try { ip = dnsResolveEx(host); } catch(e2) { ip = ""; }
  }
  if (!ip) return BLOCK;

  // ===== Private → DIRECT =====
  if (isPrivate(ip)) return DIRECT;

  // ===== دول ممنوعة =====
  if (isBlocked(ip)) return BLOCK;

  // ===== تحقق الأردن والخليج =====
  var jo = isJordan(ip);
  var gu = isGulf(ip);

  // ============================================================
  // 📦 باك أب لوبي → بروكسي باك أب فقط
  // ============================================================
  if (isBackupLobby(host)) {
    if (jo) return getBackupProxy();
    if (gu) return getBackupProxy();
    return BLOCK;
  }

  // ============================================================
  // 🎮 لوبي → بروكسي لوبي فقط
  // ============================================================
  if (isLobby(host)) {

    initLobby();

    if (isJordanWindow()) {
      // نافذة الأردن - بلوك أي شي مش أردني
      if (jo) return getLobbyProxy();
      return BLOCK;
    }

    // بعد 45 ثانية - أردن + خليج
    if (jo) return getLobbyProxy();
    if (gu) return getLobbyProxy();
    return BLOCK;
  }

  // ============================================================
  // ⚔️ مباراة → بروكسي مباريات فقط
  // ============================================================
  if (isMatch(host)) {
    if (jo) return MATCH_PROXY;
    if (gu) return MATCH_PROXY;
    return BLOCK;
  }

  // ============================================================
  // ❓ أي PUBG تاني → بروكسي لوبي (default)
  // ============================================================
  if (jo) return getLobbyProxy();
  if (gu) return getLobbyProxy();

  return BLOCK;
}
// ============================================================
// END - PUBG JORDAN + GULF ULTIMATE v13.0 SEPARATED PROXIES
// ============================================================
