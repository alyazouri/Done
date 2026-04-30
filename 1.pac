function FindProxyForURL(url, host) {

    var PROXY = "PROXY 109.237.193.187:443";

    // =========================================================
    // 1. استثناء صور البروفايل (تقريبي حسب الامتداد)
    // =========================================================
    if (
        shExpMatch(url, "*.jpg*")  ||
        shExpMatch(url, "*.jpeg*") ||
        shExpMatch(url, "*.png*")  ||
        shExpMatch(url, "*.webp*")
    ) {
        return "DIRECT";
    }
    
    return PROXY;
}
