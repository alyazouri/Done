function FindProxyForURL(url, host) {

    var PROXY = "PROXY 94.127.211.6:20001";

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
