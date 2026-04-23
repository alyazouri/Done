// ============================================================
//  PUBG MOBILE - ZERO DIRECT ULTIMATE PAC
//  v6.0 - NO DIRECT ALLOWED / MAX JORDAN COVERAGE
//  الهدف: أقل بنق + أسرع استجابة + تأثير شبكي قهري
//  القاعدة: لا يوجد DIRECT. كل الاتصالات تمر عبر البروكسي.
//  الحماية: لا توجد قواعد منفصلة (لا تدخل مخصص).
// ============================================================

// --- 1. إعدادات البروكسي (عدّل IPs/Ports حسب خوادمك) ---
var PX_MATCH = "PROXY 86.108.14.128:20001";
var PX_MAIN  = "PROXY 86.108.95.108:80; PROXY 86.108.14.128:9030";
var PX_CDN   = "PROXY 86.108.95.108:80";
var PX_FORCE = PX_MAIN; // fallback نهائي - ممنوع DIRECT

// --- 2. نطاقات IP الأردنية (Orange / Zain / Umniah / أفراد) ---
var JOR_RANGES = [
    ["86.108.0.0","255.255.0.0"],   ["176.28.0.0","255.255.128.0"],
    ["176.29.0.0","255.255.0.0"],   ["188.247.0.0","255.255.0.0"],
    ["178.20.184.0","255.255.248.0"],["185.80.120.0","255.255.252.0"],
    ["185.109.184.0","255.255.252.0"],["185.144.96.0","255.255.252.0"],
    ["185.200.212.0","255.255.252.0"],["185.201.12.0","255.255.252.0"],
    ["185.228.240.0","255.255.252.0"],["185.230.192.0","255.255.252.0"],
    ["185.244.128.0","255.255.252.0"],["194.165.128.0","255.255.224.0"],
    ["195.123.192.0","255.255.224.0"],["212.118.0.0","255.255.0.0"],
    ["217.23.0.0","255.255.240.0"], ["109.107.128.0","255.255.128.0"],
    ["94.249.0.0","255.255.0.0"],   ["91.186.224.0","255.255.224.0"],
    ["185.161.228.0","255.255.252.0"],["185.191.212.0","255.255.252.0"],
    ["185.228.236.0","255.255.252.0"],["185.244.132.0","255.255.252.0"],
    ["188.172.0.0","255.255.0.0"],  ["193.188.64.0","255.255.224.0"],
    ["195.158.0.0","255.255.0.0"],  ["212.35.0.0","255.255.224.0"],
    ["217.144.0.0","255.255.240.0"],["188.161.0.0","255.255.0.0"],
    ["185.14.224.0","255.255.252.0"],["185.33.224.0","255.255.252.0"],
    ["185.80.120.0","255.255.252.0"],["185.95.168.0","255.255.252.0"],
    ["185.104.252.0","255.255.252.0"],["185.117.116.0","255.255.252.0"],
    ["185.132.120.0","255.255.252.0"],["185.135.120.0","255.255.252.0"],
    ["185.142.24.0","255.255.252.0"],["185.150.116.0","255.255.252.0"],
    ["185.159.188.0","255.255.252.0"],["185.180.228.0","255.255.252.0"],
    ["185.191.212.0","255.255.252.0"],["185.201.12.0","255.255.252.0"],
    ["185.208.228.0","255.255.252.0"],["185.217.68.0","255.255.252.0"],
    ["185.225.200.0","255.255.252.0"],["185.232.96.0","255.255.252.0"],
    ["185.235.244.0","255.255.252.0"],["185.242.28.0","255.255.252.0"],
    ["185.246.200.0","255.255.252.0"],["185.251.20.0","255.255.252.0"],
    ["185.255.132.0","255.255.252.0"],["188.172.0.0","255.255.0.0"],
    ["193.17.206.0","255.255.255.0"],["193.34.228.0","255.255.252.0"],
    ["193.108.162.0","255.255.254.0"],["193.188.64.0","255.255.224.0"],
    ["193.227.162.0","255.255.254.0"],["194.146.236.0","255.255.252.0"],
    ["194.165.128.0","255.255.224.0"],["195.14.18.0","255.255.254.0"],
    ["195.35.212.0","255.255.252.0"],["195.123.192.0","255.255.224.0"],
    ["195.158.0.0","255.255.0.0"],  ["195.206.224.0","255.255.240.0"],
    ["196.13.104.0","255.255.252.0"],["198.51.100.0","255.255.255.0"],
    ["203.13.32.0","255.255.224.0"],["212.35.0.0","255.255.224.0"],
    ["212.118.0.0","255.255.0.0"],  ["217.23.0.0","255.255.240.0"],
    ["217.144.0.0","255.255.240.0"]
];

var JOR_V6 = [
    "2a01:9700:","2a02:cb80:","2a03:5a00:","2001:16a0:",
    "2a0e:1c80:","2a0f:4a00:","2a10:4a00:","2a11:4a00:"
];

// --- 3. كلمات مفتاحية PUBG (فحص أولي سريع) ---
var PUBG_SIGNS = [
    "pubg","tencent","krafton","lightspeed","levelinfinite",
    "timi","proximabeta","qcloud","tencentgames","igame",
    "gcloud","ieg","qq","wechat","weixin","akamaized",
    "cloudfront","fastly","edgecast","maxcdn"
];

// --- 4. كلمات خوادم المباريات (Game/Match) - أعلى أولوية ---
var MATCH_SIGNS = [
    "gamesvr","gsvr","gserver","relay","match","battle",
    "combat","realtime","sync","node","edge","ingame",
    "play","room","dedicated","zone","bluezone","redzone",
    "airdrop","parachute","land","loot","death","kill",
    "spectate","observer","replay","demo","live","tunnel",
    "gateway","port","roomsvr","battlesvr","zonesvr",
    "physic","move","action","input","state","frame",
    "tick","latency","ping","packet","net","network",
    "conn","connect","udp","tcp","socket","stream",
    "dataflow","hitreg","hitbox","spawn","vehicle",
    "driver","passenger","shoot","fire","reload",
    "scope","aim","ads","crouch","prone","jump",
    "climb","swim","revive","knock","down","eliminate",
    "winner","winnerwinner","chicken","circle","shrink",
    "safezone","playzone","gas","storm","map","mini",
    "radar","compass","marker","ping","tag","spot"
];

// --- 5. كلمات اللوبي والتجنيد (Lobby/Recruit/Social) ---
var LOBBY_SIGNS = [
    "lobby","hall","home","base","camp","lounge","waiting",
    "idle","socialhub","plaza","square","matchmaking",
    "queue","queued","queueing","ready","prepare","start",
    "begin","enter","joinmatch","quickmatch","automatch",
    "matchmake","lobbyready","login","auth","account",
    "user","passport","token","session","region","api",
    "rest","config","setting","profile","inventory",
    "wardrobe","appearance","title","avatar","frame",
    "banner","social","friend","chat","message","mail",
    "inbox","notice","notification","voice","announcement",
    "news","help","support","cs","recruit","recruitment",
    "teamup","findteam","lookingforgroup","lfg","partner",
    "mentor","master","apprentice","disciple","student",
    "teacher","crew","clan","guild","union","alliance",
    "squadup","duoq","teamq","party","group","assemble",
    "gather","invite","join","apply","member","manage",
    "leader","deputy","elder","roster","list","search",
    "recommend","nearby","recent","blacklist","block",
    "follow","fan","like","reputation","popularity",
    "charm","intimacy","relationship","bond","emote",
    "emoji","chatroom","channel","world","country",
    "local","team","duo","squad","solo","soloq"
];

// --- 6. كلمات المتجر والعمليات المالية ---
var SHOP_SIGNS = [
    "shop","store","mall","purchase","recharge","pay",
    "payment","order","transaction","buy","sell","trade",
    "exchange","convert","uc","ag","bp","rp","silver",
    "gold","coin","coupon","voucher","crate","box",
    "chest","spin","luckydraw","draw","lottery",
    "treasure","royalepass","prime","plus","subscription",
    "membership","privilege","benefit","bonus","gift",
    "present","send","receive","wishlist","preview",
    "redeem","code","cdkey","discount","offer","deal",
    "bundle","pack","set","collection","limited",
    "exclusive","rare","legendary","mythic","upgrade",
    "levelup","advance","evolve","combine","fuse",
    "dismantle","recycle","paint","skin","outfit",
    "costume","suit","set","head","face","eye","hair",
    "mask","backpack","helmet","vest","shoe","glove",
    "tattoo","glasses","earring","necklace","badge",
    "logo","banner","icon","emblem","signature","namecard"
];

// --- 7. كلمات الأحداث والمهام والتصنيف ---
var EVENT_SIGNS = [
    "event","activity","mission","task","quest","challenge",
    "achievement","reward","daily","weekly","monthly",
    "season","rank","tier","arena","league","tournament",
    "competition","championship","cup","leaderboard",
    "ranking","stats","statistic","history","record",
    "report","review","summary","result","score","point",
    "rating","mmr","elo","grade","division","promotion",
    "demotion","prize","trophy","medal","badge","honor",
    "glory","fame","star","crown","ace","conqueror",
    "dominator","expert","veteran","rookie","beginner"
];

// --- 8. كلمات التدريب والأوضاع والخرائط ---
var MODE_SIGNS = [
    "training","practice","tutorial","guide","ai","bot",
    "camp","range","cheer","park","worldofwonder","wow",
    "aftermath","mode","special","arcade","evo","evoground",
    "coldfront","library","hangar","zombie","infection",
    "domination","tdm","payload","metro","royale","erangel",
    "livik","miramar","sanhok","vikendi","karakin","nusa",
    "rondo","tpp","fpp","1v1","2v2","4v4","8v8","50v50",
    "war","quick","casual","unranked","custom","create",
    "password","spectator","stream","classic","ranked",
    "quickmatch","arenateam","arenatraining","gun","sniper",
    "shotgun","melee","vehicle","zombiemode","survive",
    "rescue","escort","occupy","conquest","king","ctf",
    "capture","flag","bomb","defuse","search","destroy"
];

// --- 9. كلمات CDN والتحميل والأصول ---
var CDN_SIGNS = [
    "cdn","patch","update","download","resource","asset",
    "client","version","dl","data","static","content",
    "file","zip","apk","obb","manifest","configfile",
    "table","script","shader","texture","model","audio",
    "sound","music","voice","video","cutscene","ui",
    "interface","font","icon","image","picture","bg",
    "background","loading","splash","logo","brand",
    "effect","particle","animation","skeleton","mesh",
    "material","prefab","scene","level","mapdata",
    "localization","translation","lang","locale","ar",
    "en","tr","fr","de","es","ru","kr","jp","th","vn",
    "id","me","sa","ae","eg"
];

// --- 10. دوال مساعدة محسّنة ---
function inJordan(ip) {
    if (!ip) return false;
    if (ip.indexOf(":") !== -1) {
        for (var i = 0; i < JOR_V6.length; i++) {
            if (ip.indexOf(JOR_V6[i]) === 0) return true;
        }
        return false;
    }
    for (var i = 0; i < JOR_RANGES.length; i++) {
        if (isInNet(ip, JOR_RANGES[i][0], JOR_RANGES[i][1])) return true;
    }
    return false;
}

function has(str, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (str.indexOf(arr[i]) !== -1) return true;
    }
    return false;
}

// --- 11. الدالة الرئيسية: FindProxyForURL ---
function FindProxyForURL(url, host) {
    var h = host.toLowerCase();
    var u = url.toLowerCase();
    var all = h + " " + u;

    // ممنوع DIRECT حتى للمحلي - قوة قصوى
    if (isPlainHostName(h)) return PX_MAIN;

    // --- فحص سريع: هل هذا PUBG؟ ---
    var isPubg = false;
    for (var i = 0; i < PUBG_SIGNS.length; i++) {
        if (h.indexOf(PUBG_SIGNS[i]) !== -1) { isPubg = true; break; }
    }
    if (!isPubg) {
        for (var i = 0; i < PUBG_SIGNS.length; i++) {
            if (u.indexOf(PUBG_SIGNS[i]) !== -1) { isPubg = true; break; }
        }
    }

    // حتى لو لم يكن PUBG: لا DIRECT. نمرر عبر PX_MAIN.
    if (!isPubg) return PX_MAIN;

    // ============================================================
    //  أولوية 1: خوادم المباريات (Game Servers) - أقل بنق
    // ============================================================
    if (has(all, MATCH_SIGNS)) return PX_MATCH;

    // ============================================================
    //  أولوية 2: اللوبي + التجنيد + المصادقة + الاجتماعي
    // ============================================================
    if (has(all, LOBBY_SIGNS)) return PX_MAIN;

    // ============================================================
    //  أولوية 3: المتجر والعمليات المالية
    // ============================================================
    if (has(all, SHOP_SIGNS)) return PX_MAIN;

    // ============================================================
    //  أولوية 4: الأحداث والمهام والتصنيف
    // ============================================================
    if (has(all, EVENT_SIGNS)) return PX_MAIN;

    // ============================================================
    //  أولوية 5: التدريب والأوضاع والخرائط
    // ============================================================
    if (has(all, MODE_SIGNS)) return PX_MATCH;

    // ============================================================
    //  أولوية 6: CDN والتحميلات
    // ============================================================
    if (has(all, CDN_SIGNS)) return PX_CDN;

    // ============================================================
    //  أولوية 7: تغطية IP أردني إضافية
    // ============================================================
    var ip = "";
    try { ip = dnsResolve(h); } catch(e) {}
    if (ip && inJordan(ip)) return PX_MAIN;

    // ============================================================
    //  fallback نهائي: أي شيء آخر تابع لـ PUBG
    // ============================================================
    return PX_FORCE;
}
