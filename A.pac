// ===== PUBG low-latency PAC (bypass for your best IPv4 ranges) =====

function isIP(s) {
  return /^[0-9]{1,3}(?:\.[0-9]{1,3}){3}$/.test(s);
}

function isGameIP(ip) {
  return (
    isInNet(ip, "178.20.184.0", "255.255.248.0") || // /21
    isInNet(ip, "176.28.128.0", "255.255.128.0") || // /17
    isInNet(ip, "46.32.96.0",  "255.255.224.0") ||  // /19
    isInNet(ip, "94.142.32.0",  "255.255.224.0")    // /19
  );
}

function FindProxyForURL(url, host) {
  if (!host) return "DIRECT";

  // local
  if (host == "localhost" || shExpMatch(host, "*.local")) return "DIRECT";
  if (host == "127.0.0.1" || host == "0.0.0.0") return "DIRECT";

  var ip = null;

  if (isIP(host)) {
    ip = host;
  } else {
    try { ip = dnsResolve(host); } catch (e) { ip = null; }
  }

  if (ip && isGameIP(ip)) return "DIRECT";

  // default: use fastest/open proxy you listed (no auth)
  return "PROXY 80.90.160.39:80";
}
