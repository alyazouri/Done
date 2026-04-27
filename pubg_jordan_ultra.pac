// ═══════════════════════════════════════════════════════════════
//  PUBG JORDAN ULTRA PAC v31.0
//  AUTO-DISCOVERED • MAX JORDAN PLAYERS • MIN PING
// ═══════════════════════════════════════════════════════════════
//  وقت التوليد: 2026-04-27 09:08:28
//  IP العام:    192.168.100.112
//  الحامل:      UNKNOWN (Unknown)
//  نطاقك:       N/A — N/A
//  DNS:         1.4 ms | Ping: ~3 ms | Jitter: 0.2 ms
//  التقييم:     SS (خارق)
//  النطاقات:    53 أردني (0 لحاملك)
//  البروكسيات:  2/7 نشط
//  السلسلة:     ORANGE_A → ZAIN_A → UMNIAH_A → ST_A
//  وقت الأردن:  9:00
// ═══════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════
//  CONFIG — محسّن حسب شبكتك (grade: SS)
// ═══════════════════════════════════════════════════════

var CFG = {
    // ═══ أساسي ═══
    NO_DIRECT:          true,           // لا DIRECT أبداً للعبة
    FAIL_CLOSED:        true,           // فشل = حظر (لا تسريب)
    MAX_FB:             3,           // أقصى fallback
    DNS_TTL:            8000,    // صلاحية كاش DNS
    DNS_MAX:            120,          // حجم كاش DNS
    DEC_TTL:            2000,     // صلاحية قرار
    STICKY_TTL:         300000,   // صلاحية اللصق

    // ═══ تحسين Ping ═══
    PING_WARN:          35,          // تنبيه ping عالي
    FAST_CHAIN_LEN:     2,              // سلسلة سريعة = بروكسيين فقط
    MED_CHAIN_LEN:      3,              // سلسلة متوسطة
    FULL_CHAIN_LEN:     4,              // سلسلة كاملة

    // ═══ قفل المسار ═══
    LOCK_MS:            9000000,  // مدة قفل المسار

    // ═══ لاعبين أردنيين ═══
    MATCH_BIAS:         true,           // تحيز المباراة للمنطقة
    LOBBY_LOCK:         true,           // قفل اللوبي
    SERVER_PIN:         true,           // تثبيت السيرفر
    REGION_FORCE:       true,           // إجبار المنطقة
    RTT_OPTIMIZE:       true,           // تحسين RTT
    ANTI_DISTANT:       true,           // حظر البعيد

    // ═══ أداء ═══
    LIGHT:              false,
    MY_CARRIER:         "UNKNOWN",
    MY_TIER:            3
};


// ═══════════════════════════════════════════════════════
//  PROXY POOL — مخارج أردنية فقط
// ═══════════════════════════════════════════════════════

var POOL = {
    ORANGE_A: { ip:"46.185.129.122", port:443, carrier:"ORANGE", tier:1 },
    ORANGE_B: { ip:"46.185.130.44", port:443, carrier:"ORANGE", tier:2 },
    ZAIN_A: { ip:"79.173.248.71", port:443, carrier:"ZAIN", tier:1 },
    ZAIN_B: { ip:"176.29.15.200", port:443, carrier:"ZAIN", tier:2 },
    UMNIAH_A: { ip:"82.212.88.100", port:443, carrier:"UMNIAH", tier:1 },
    ST_A: { ip:"94.230.12.50", port:443, carrier:"ST", tier:2 },
    DAMA_A: { ip:"185.49.88.10", port:443, carrier:"DAMA", tier:3 }
};

var B = { D: "DIRECT", X: "PROXY 0.0.0.0:80" };

// سلسلة افتراضية محسّنة لشبكتك
var MY_CHAIN = ["ORANGE_A", "ZAIN_A", "UMNIAH_A", "ST_A"];


// ═══════════════════════════════════════════════════════
//  JORDAN IPv4 RANGES — 53 نطاق مكتشف
//  ★ = نطاق حاملك (UNKNOWN)
// ═══════════════════════════════════════════════════════

var JO_NETS = [
        ["79.173.248.0", "22", "ZAIN"],
        ["46.185.240.0", "21", "ORANGE"],
        ["79.173.240.0", "21", "ZAIN"],
        ["46.185.128.0", "20", "ORANGE"],
        ["46.185.144.0", "20", "ORANGE"],
        ["46.185.224.0", "20", "ORANGE"],
        ["91.106.224.0", "20", "ORANGE"],
        ["176.29.224.0", "20", "ORANGE"],
        ["176.28.224.0", "20", "ZAIN"],
        ["37.220.224.0", "20", "ZAIN"],
        ["188.247.96.0", "20", "ZAIN"],
        ["46.185.160.0", "19", "ORANGE"],
        ["46.185.192.0", "19", "ORANGE"],
        ["91.106.192.0", "19", "ORANGE"],
        ["176.29.192.0", "19", "ORANGE"],
        ["176.28.192.0", "19", "ZAIN"],
        ["37.220.192.0", "19", "ZAIN"],
        ["188.247.64.0", "19", "ZAIN"],
        ["91.106.128.0", "18", "ORANGE"],
        ["176.29.128.0", "18", "ORANGE"],
        ["79.173.192.0", "18", "ZAIN"],
        ["176.28.128.0", "18", "ZAIN"],
        ["37.220.128.0", "18", "ZAIN"],
        ["188.247.0.0", "18", "ZAIN"],
        ["91.106.0.0", "17", "ORANGE"],
        ["176.29.0.0", "17", "ORANGE"],
        ["176.28.0.0", "17", "ZAIN"],
        ["82.213.224.0", "20", "UMNIAH"],
        ["188.247.224.0", "20", "UMNIAH"],
        ["82.213.192.0", "19", "UMNIAH"],
        ["188.247.192.0", "19", "UMNIAH"],
        ["82.213.128.0", "18", "UMNIAH"],
        ["188.247.128.0", "18", "UMNIAH"],
        ["82.213.0.0", "17", "UMNIAH"],
        ["82.212.0.0", "16", "UMNIAH"],
        ["193.188.16.0", "24", "PEGAS"],
        ["185.49.92.0", "23", "DAMA"],
        ["94.127.216.0", "22", "ST"],
        ["185.49.88.0", "22", "DAMA"],
        ["94.127.208.0", "21", "ST"],
        ["109.237.208.0", "21", "LINK"],
        ["178.20.184.0", "21", "DIGITEL"],
        ["94.230.224.0", "20", "ST"],
        ["109.237.192.0", "20", "LINK"],
        ["176.203.96.0", "20", "TE"],
        ["94.230.192.0", "19", "ST"],
        ["178.20.192.0", "19", "DIGITEL"],
        ["176.203.64.0", "19", "TE"],
        ["62.72.160.0", "19", "DHAB"],
        ["212.34.0.0", "19", "PEGAS"],
        ["94.230.128.0", "18", "ST"],
        ["176.203.0.0", "18", "TE"],
        ["94.230.0.0", "17", "ST"]
];


// ═══════════════════════════════════════════════════════
//  CLOUD FOREIGN NETS (تمنع التسريب)
// ═══════════════════════════════════════════════════════

var CL_NETS = [
        ["104.16.0.0", "12"],
        ["172.64.0.0", "13"],
        ["162.158.0.0", "15"],
        ["198.41.128.0", "17"],
        ["141.101.64.0", "18"],
        ["108.162.192.0", "18"],
        ["13.224.0.0", "14"],
        ["99.84.0.0", "16"],
        ["3.0.0.0", "8"],
        ["52.84.0.0", "15"],
        ["54.192.0.0", "16"],
        ["151.101.0.0", "16"],
        ["199.232.0.0", "16"],
        ["104.16.0.0", "12"],
        ["173.245.48.0", "20"]
];


// ═══════════════════════════════════════════════════════
//  BLOOM FILTER — O(1) مطابقة
// ═══════════════════════════════════════════════════════

var BF = {
    b: new Array(1024),
    h1: function(x){var h=0;for(var i=0;i<x.length;i++)h=((h<<5)-h+x.charCodeAt(i))|0;return Math.abs(h)%1024;},
    h2: function(x){var h=5381;for(var i=0;i<x.length;i++)h=((h<<5)+h+x.charCodeAt(i))|0;return Math.abs(h)%1024;},
    h3: function(x){var h=0;for(var i=0;i<x.length;i++)h=(h*31+x.charCodeAt(i))|0;return Math.abs(h)%1024;},
    h4: function(x){var h=17;for(var i=0;i<x.length;i++)h=(h*13+x.charCodeAt(i)*7)|0;return Math.abs(h)%1024;},
    add: function(w){var l=w.toLowerCase();this.b[this.h1(l)]=1;this.b[this.h2(l)]=1;this.b[this.h3(l)]=1;this.b[this.h4(l)]=1;},
    init: function(a){for(var i=0;i<1024;i++)this.b[i]=0;for(var i=0;i<a.length;i++)this.add(a[i]);},
    host: function(h){
        var p=h.split(/[.\-_]/);
        for(var i=0;i<p.length;i++){
            if(p[i].length>=3){
                var l=p[i].toLowerCase();
                if(this.b[this.h1(l)]&&this.b[this.h2(l)]&&this.b[this.h3(l)]&&this.b[this.h4(l)])return true;
            }
        }
        for(var l=4;l<=Math.min(12,h.length);l++)
            for(var j=0;j<=h.length-l;j++){
                var s=h.substr(j,l).toLowerCase();
                if(this.b[this.h1(s)]&&this.b[this.h2(s)]&&this.b[this.h3(s)]&&this.b[this.h4(s)])return true;
            }
        return false;
    }
};
BF.init(["pubgmobile", "pubgm", "pubg", "tencent", "lightspeed", "levelinfinite", "igamecj", "myapp", "qq", "igame", "gcloud", "tmgp", "bsgame", "battlegrounds", "proximabeta", "garena", "pubgstudio"]);


// ═══════════════════════════════════════════════════════
//  FAST IP MATCHER — Bitwise 10x أسرع
// ═══════════════════════════════════════════════════════

var IP = {
    ip2i: function(ip){
        if(!ip)return 0;
        var p=ip.split(".");
        if(p.length!==4)return 0;
        return((parseInt(p[0])<<24)|(parseInt(p[1])<<16)|(parseInt(p[2])<<8)|parseInt(p[3]))>>>0;
    },
    jo: [], cl: [],
    build: function(){
        var jd=[
        ["79.173.248.0", "22", "ZAIN"],
        ["46.185.240.0", "21", "ORANGE"],
        ["79.173.240.0", "21", "ZAIN"],
        ["46.185.128.0", "20", "ORANGE"],
        ["46.185.144.0", "20", "ORANGE"],
        ["46.185.224.0", "20", "ORANGE"],
        ["91.106.224.0", "20", "ORANGE"],
        ["176.29.224.0", "20", "ORANGE"],
        ["176.28.224.0", "20", "ZAIN"],
        ["37.220.224.0", "20", "ZAIN"],
        ["188.247.96.0", "20", "ZAIN"],
        ["46.185.160.0", "19", "ORANGE"],
        ["46.185.192.0", "19", "ORANGE"],
        ["91.106.192.0", "19", "ORANGE"],
        ["176.29.192.0", "19", "ORANGE"],
        ["176.28.192.0", "19", "ZAIN"],
        ["37.220.192.0", "19", "ZAIN"],
        ["188.247.64.0", "19", "ZAIN"],
        ["91.106.128.0", "18", "ORANGE"],
        ["176.29.128.0", "18", "ORANGE"],
        ["79.173.192.0", "18", "ZAIN"],
        ["176.28.128.0", "18", "ZAIN"],
        ["37.220.128.0", "18", "ZAIN"],
        ["188.247.0.0", "18", "ZAIN"],
        ["91.106.0.0", "17", "ORANGE"],
        ["176.29.0.0", "17", "ORANGE"],
        ["176.28.0.0", "17", "ZAIN"],
        ["82.213.224.0", "20", "UMNIAH"],
        ["188.247.224.0", "20", "UMNIAH"],
        ["82.213.192.0", "19", "UMNIAH"],
        ["188.247.192.0", "19", "UMNIAH"],
        ["82.213.128.0", "18", "UMNIAH"],
        ["188.247.128.0", "18", "UMNIAH"],
        ["82.213.0.0", "17", "UMNIAH"],
        ["82.212.0.0", "16", "UMNIAH"],
        ["193.188.16.0", "24", "PEGAS"],
        ["185.49.92.0", "23", "DAMA"],
        ["94.127.216.0", "22", "ST"],
        ["185.49.88.0", "22", "DAMA"],
        ["94.127.208.0", "21", "ST"],
        ["109.237.208.0", "21", "LINK"],
        ["178.20.184.0", "21", "DIGITEL"],
        ["94.230.224.0", "20", "ST"],
        ["109.237.192.0", "20", "LINK"],
        ["176.203.96.0", "20", "TE"],
        ["94.230.192.0", "19", "ST"],
        ["178.20.192.0", "19", "DIGITEL"],
        ["176.203.64.0", "19", "TE"],
        ["62.72.160.0", "19", "DHAB"],
        ["212.34.0.0", "19", "PEGAS"],
        ["94.230.128.0", "18", "ST"],
        ["176.203.0.0", "18", "TE"],
        ["94.230.0.0", "17", "ST"]
        ];
        for(var i=0;i<jd.length;i++){
            var ip=this.ip2i(jd[i][0]);
            var bits=parseInt(jd[i][1]);
            var mask=~(0xFFFFFFFF>>>bits)>>>0;
            this.jo.push({n:(ip&mask)>>>0,b:(ip|~mask)>>>0,c:jd[i][2]});
        }
        var cd=[
        ["104.16.0.0", "12"],
        ["172.64.0.0", "13"],
        ["162.158.0.0", "15"],
        ["198.41.128.0", "17"],
        ["141.101.64.0", "18"],
        ["108.162.192.0", "18"],
        ["13.224.0.0", "14"],
        ["99.84.0.0", "16"],
        ["3.0.0.0", "8"],
        ["52.84.0.0", "15"],
        ["54.192.0.0", "16"],
        ["151.101.0.0", "16"],
        ["199.232.0.0", "16"],
        ["104.16.0.0", "12"],
        ["173.245.48.0", "20"]
        ];
        for(var i=0;i<cd.length;i++){
            var pts=cd[i].split("/");
            var ip=this.ip2i(pts[0]);
            var bits=parseInt(pts[1]);
            var mask=~(0xFFFFFFFF>>>bits)>>>0;
            this.cl.push({n:(ip&mask)>>>0,b:(ip|~mask)>>>0});
        }
    },
    isJo: function(ip){
        var i=this.ip2i(ip);if(!i)return false;
        for(var j=0;j<this.jo.length;j++)
            if(i>=this.jo[j].n&&i<=this.jo[j].b)return true;
        return false;
    },
    isCl: function(ip){
        var i=this.ip2i(ip);if(!i)return false;
        for(var j=0;j<this.cl.length;j++)
            if(i>=this.cl[j].n&&i<=this.cl[j].b)return true;
        return false;
    },
    carrier: function(ip){
        var i=this.ip2i(ip);if(!i)return"U";
        for(var j=0;j<this.jo.length;j++)
            if(i>=this.jo[j].n&&i<=this.jo[j].b)return this.jo[j].c;
        return"O";
    },
    isMyCarrier: function(ip){
        var c=this.carrier(ip);
        return c===CFG.MY_CARRIER;
    },
    isTier1: function(ip){
        var c=this.carrier(ip);
        return c==="ORANGE"||c==="ZAIN";
    }
};
IP.build();


// ═══════════════════════════════════════════════════════
//  PING ESTIMATOR — WEMA + Dead Reckoning
// ═══════════════════════════════════════════════════════

var PE = {
    w:0, v:0, t:0, ls:0, on:false,
    r: new Array(32), rp: 0, sz: 32,
    sample: function(d){
        var p=Math.round(d*0.42+1.5);  // معامل محسّن
        if(!this.on){this.w=p;this.v=8;this.on=true;}
        this.w+=0.28*(p-this.w);
        this.v=0.72*this.v+0.28*Math.abs(p-this.w);
        this.t=0.12*(p-this.ls)+0.88*this.t;
        this.ls=p;
        this.r[this.rp]=p;
        this.rp=(this.rp+1)%this.sz;
        return p;
    },
    p50: function(){
        var v=[];for(var i=0;i<this.sz;i++)if(this.r[i]!==undefined)v.push(this.r[i]);
        if(!v.length)return 999;
        v.sort(function(a,b){return a-b;});
        return v[Math.floor(v.length/2)];
    },
    p95: function(){
        var v=[];for(var i=0;i<this.sz;i++)if(this.r[i]!==undefined)v.push(this.r[i]);
        if(!v.length)return 999;
        v.sort(function(a,b){return a-b;});
        return v[Math.min(v.length-1,Math.floor(v.length*0.95))];
    },
    jitter: function(){return Math.round(Math.sqrt(this.v));},
    grade: function(){
        var p=this.p50(),j=this.jitter();
        if(p<=8&&j<=2)return"SS";
        if(p<=14&&j<=3)return"S+";
        if(p<=22&&j<=5)return"S";
        if(p<=35&&j<=8)return"A";
        if(p<=55)return"B";
        if(p<=80)return"C";
        return"D";
    },
    predict: function(){return Math.max(1,Math.round(this.w+this.t));},
    bad: function(){var g=this.grade();return g==="C"||g==="D";},
    critical: function(){return this.p50()>CFG.PING_WARN||this.p95()>CFG.PING_WARN*2;}
};


// ═══════════════════════════════════════════════════════
//  SERVER PIN ENGINE — تثبيت سيرفر MENA
//  ═══════════════════════════════════════════════════════

var SERVER_PIN = {
    // كلمات تشير لسيرفر قريب (MENA/Jordan/Arab)
    MENA_SIGNALS: [
        "me-","_me","mena","middle_east","arab",
        "jo-","_jo","jordan","amman",
        "gcc","saudi","uae","dubai","egypt",
        "levant","sham","iraq","syria","lebanon",
        "palestine","kwait","bahrain","qatar","oman",
        "yemen","iran","turkey","tr-"
    ],

    // كلمات تشير لسيرفر بعيد (تحظر)
    DISTANT_SIGNALS: [
        "eu-","_eu","europe","us-","_us","usa",
        "na-","_na","brazil","br-","_br",
        "sa-","_sa","south_america",
        "asia","sea-","_sea","korea","kr-","_kr",
        "japan","jp-","_jp","china","cn-","_cn",
        "oceania","au-","_au","australia",
        "india","in-","_in","russia","ru-","_ru",
        "euw","eue","eun","use","usw"
    ],

    score: function(h){
        var score = 0;
        // إشارة MENA = نقاط عالية
        for(var i=0;i<this.MENA_SIGNALS.length;i++)
            if(h.indexOf(this.MENA_SIGNALS[i])!==-1)score+=25;

        // إشارة بعيدة = عقوبة كبيرة
        for(var i=0;i<this.DISTANT_SIGNALS.length;i++)
            if(h.indexOf(this.DISTANT_SIGNALS[i])!==-1)score-=50;

        return score;
    },

    isDistant: function(h){return this.score(h)<-20;},
    isMENA: function(h){return this.score(h)>10;}
};


// ═══════════════════════════════════════════════════════
//  MATCH BIAS — تحيز المباراة للاعبين العرب
//  ═══════════════════════════════════════════════════════

var MATCH_BIAS = {
    // كلمات تدل على matchmaking / server selection
    MM_HOSTS: [
        "match","matchmake","queue","lobby","room",
        "server","region","config","settings",
        "device","network","geo","location",
        "analytics","telemetry","report","monitor",
        "tracking","log.event","presence","online"
    ],

    isMM: function(h){
        for(var i=0;i<this.MM_HOSTS.length;i++)
            if(h.indexOf(this.MM_HOSTS[i])!==-1)return true;
        return false;
    },

    // أفضل بروكسي لطلبات MM
    getMMProxy: function(){
        // دائماً أسرع بروكسي أردني
        return safeChain(["ORANGE_A","ZAIN_A","ZAIN_A","ORANGE_A"]);
    }
};


// ═══════════════════════════════════════════════════════
//  ROUTE ANCHOR — مرساة المسار الخارقة
//  ═══════════════════════════════════════════════════════

var ANCHOR = {
    locked: false, chain: null, primary: null,
    at: 0, reason: "", count: 0,

    lock: function(chain, reason){
        if(this.locked&&!this.expired())return;
        this.locked=true; this.chain=chain;
        this.at=now(); this.reason=reason;
        this.count++;
        var m=chain.match(/PROXY\s+([\d.]+):/);
        if(m)for(var n in POOL)if(POOL[n].ip===m[1]){this.primary=n;break;}
    },

    get: function(){
        if(!this.locked)return null;
        if(this.expired()){this.locked=false;return null;}
        return this.chain;
    },

    expired: function(){
        return this.locked&&(now()-this.at>CFG.LOCK_MS);
    },

    renew: function(){if(this.locked)this.at=now();},
    unlock: function(){this.locked=false;this.chain=null;this.primary=null;},

    // تبديل بروكسي (لكن ابقَ أردني)
    switch: function(reason){
        if(!this.primary)return;
        var alts={
            "ORANGE_A":"ZAIN_A","ORANGE_B":"ZAIN_A",
            "ZAIN_A":"ORANGE_A","ZAIN_B":"ORANGE_A",
            "UMNIAH_A":"ORANGE_A","ST_A":"ORANGE_A"
        };
        var alt=alts[this.primary]||"ORANGE_A";
        var newChain=safeChain([alt,this.primary]);
        this.lock(newChain,"SWITCH_"+reason);
        return newChain;
    }
};


// ═══════════════════════════════════════════════════════
//  SESSION — مراقبة جلسة اللعب
//  ═══════════════════════════════════════════════════════

var SS = {
    ph: "IDLE", ch: null, st: 0, games: 0,

    phase: function(h, u){
        var c=(h+" "+u).toLowerCase();
        var m=[
            ["G", ["game_svr","battle_","sync_","relay_","zone_","bullet_",
                   "loot_","vehicle_","player_","damage","kill","knock",
                   "revive","airdrop","circle","safe_zone","blue_zone"]],
            ["MM", ["matchmake","find_match","queue_","waiting_room",
                    "create_room","join_room","countdown","plane_",
                    "parachute","drop_","warm_up"]],
            ["AU", ["oauth","login_","auth_","openid","token_","passport",
                    "verify_","anticheat","integrity","security_scan",
                    "hwid","device_check","ban_check"]],
            ["LB", ["lobby","shop","store","crate","spin","lucky",
                    "outfit","skin","emote","friend_","clan_","guild",
                    "chat_","invite_","social","profile","rank_","season_",
                    "event_","mission","pass_","royal","rp_","badge"]],
            ["PG", ["result","reward","exp_","bp_","mvp","report",
                    "like","play_again","return_lobby","rank_change","tier"]],
            ["UP", ["update","patch","hotfix","cdn_","download","resource",
                    "apk","obb","version","install"]]
        ];
        for(var i=0;i<m.length;i++)
            for(var j=0;j<m[i][1].length;j++)
                if(c.indexOf(m[i][1][j])!==-1){
                    if(m[i][0]!==this.ph){
                        var old=this.ph;
                        this.ph=m[i][0];

                        // ═══ عند دخول اللعب — أقفل المسار ═══
                        if(m[i][0]==="G"||m[i][0]==="MM"){
                            ANCHOR.lock(
                                SS.ch||safeChain(MY_CHAIN),
                                "PHASE_"+m[i][0]
                            );
                        }

                        // ═══ عداد المباريات ═══
                        if(m[i][0]==="G"&&old!=="G")this.games++;
                    }
                    return m[i][0];
                }
        return this.ph;
    }
};


// ═══════════════════════════════════════════════════════
//  TIME — أوقات الذروة الأردنية
//  ═══════════════════════════════════════════════════════

var TM = {
    h: function(){return(new Date().getUTCHours()+3)%24;},
    d: function(){return new Date().getUTCDay();},
    peak: function(){var h=this.h();return h>=19&&h<=23;},
    night: function(){var h=this.h();return h>=0&&h<=3;},
    morning: function(){var h=this.h();return h>=8&&h<=11;},
    friday: function(){return this.d()===5;},

    // جودة الوقت لمطابقة أردنيين
    quality: function(){
        if(this.friday()&&this.peak())return 100;
        if(this.peak())return 90;
        if(this.friday())return 80;
        var h=this.h();
        if(h>=16&&h<19)return 70;
        if(h>=0&&h<=3)return 50;
        if(this.morning())return 35;
        return 55;
    },

    best: function(){
        if(this.quality()>=80)return ["ORANGE_A","ZAIN_A"];
        return MY_CHAIN.slice(0,CFG.FAST_CHAIN_LEN);
    }
};


// ═══════════════════════════════════════════════════════
//  DNS CACHE + STICKY + HELPERS
//  ═══════════════════════════════════════════════════════

var DC={}, DK=[];
function dR(h){
    var e=DC[h];
    if(e&&now()-e.t<=CFG.DNS_TTL)return e;
    var t0=now();
    var ip=dnsResolve(h);
    var dt=now()-t0;
    var r={ip:ip,dt:dt,t:now()};
    if(DK.length>=CFG.DNS_MAX){var o=DK.shift();delete DC[o];}
    DC[h]=r;DK.push(h);
    PE.sample(dt);
    return r;
}

var SC={};
function sG(k){var e=SC[k];if(!e)return null;if(now()-e.t>CFG.STICKY_TTL){delete SC[k];return null;}return e.v;}
function sS(k,v){SC[k]={v:v,t:now()};}

function now(){return(new Date()).getTime();}
function isV4(ip){
    if(!ip||ip.indexOf(":")!==-1)return false;
    var p=ip.split(".");if(p.length!==4)return false;
    for(var i=0;i<4;i++){var n=parseInt(p[i],10);if(isNaN(n)||n<0||n>255)return false;}
    return true;
}

var MK={"8":"255.0.0.0","9":"255.128.0.0","10":"255.192.0.0","11":"255.224.0.0","12":"255.240.0.0","13":"255.248.0.0","14":"255.252.0.0","15":"255.254.0.0","16":"255.255.0.0","17":"255.255.128.0","18":"255.255.192.0","19":"255.255.224.0","20":"255.255.240.0","21":"255.255.248.0","22":"255.255.252.0","23":"255.255.254.0","24":"255.255.255.0"};

function safeChain(names){
    var out="",c=0;
    for(var i=0;i<names.length;i++){
        var p=POOL[names[i]];if(!p)continue;
        if(out!=="")out+="; ";
        out+="PROXY "+p.ip+":"+p.port;
        c++;if(c>=CFG.MAX_FB)break;
    }
    if(out!=="")return out+"; "+B.X;
    return B.X;
}


// ═══════════════════════════════════════════════════════
//  DECISION CACHE
// ═══════════════════════════════════════════════════════

var BC={}, BH=0, BM=0;


// ═══════════════════════════════════════════════════════
//  FindProxyForURL — الخارقة v31.0
//  ═══════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
    if (!host) return B.D;
    var h = host.toLowerCase();

    // ═══════════════════════════════════════════════
    //  فحص أساسي
    // ═══════════════════════════════════════════════
    if (isPlainHostName(host)) return B.D;
    if (isV4(host)) {
        if (isInNet(host,"10.0.0.0","255.0.0.0")||
            isInNet(host,"172.16.0.0","255.240.0.0")||
            isInNet(host,"192.168.0.0","255.255.0.0")||
            isInNet(host,"127.0.0.0","255.0.0.0")) return B.D;
    }

    // ═══════════════════════════════════════════════
    //  PUBG? (Bloom O(1))
    // ═══════════════════════════════════════════════
    if (!BF.host(h)) return B.D;

    // ═══════════════════════════════════════════════
    //  كاش سريع
    // ═══════════════════════════════════════════════
    var cc = BC[host];
    if (cc && now() - cc.t < CFG.DEC_TTL) { BH++; return cc.p; }
    BM++;

    // ═══════════════════════════════════════════════
    //  مرساة المسار (قفل كامل)
    // ═══════════════════════════════════════════════
    var lk = ANCHOR.get();
    if (lk) { BC[host]={ p:lk, t:now() }; return lk; }

    // ═══════════════════════════════════════════════
    //  كشف المرحلة
    // ═══════════════════════════════════════════════
    var ph = SS.phase(host, url);

    // ═══════════════════════════════════════════════
    //  ══ 1. تحديد المنطقة = أقصى أولوية ══
    // ═══════════════════════════════════════════════
    if (h.indexOf("region")!==-1 || h.indexOf("geo")!==-1 ||
        h.indexOf("server_list")!==-1 || h.indexOf("serverlist")!==-1 ||
        h.indexOf("location")!==-1 || h.indexOf("locale")!==-1 ||
        h.indexOf("matchmaking.region")!==-1 ||
        h.indexOf("config.region")!==-1 ||
        h.indexOf("device.info")!==-1 ||
        h.indexOf("network.info")!==-1) {

        var ch = safeChain(["ORANGE_A","ZAIN_A"]);
        ANCHOR.lock(ch, "REGION_PIN");
        BC[host]={ p:ch, t:now() };
        return ch;
    }

    // ═══════════════════════════════════════════════
    //  ══ 2. التتبع والتحليلات = حماية ══
    // ═══════════════════════════════════════════════
    if (h.indexOf("analytics")!==-1 || h.indexOf("telemetry")!==-1 ||
        h.indexOf("tracking")!==-1 || h.indexOf("monitor")!==-1 ||
        h.indexOf("report")!==-1 || h.indexOf("log.event")!==-1) {

        var ch = safeChain(["ORANGE_A","ZAIN_A"]);
        ANCHOR.lock(ch, "TELEMETRY");
        BC[host]={ p:ch, t:now() };
        return ch;
    }

    // ═══════════════════════════════════════════════
    //  ══ 3. المصادقة = ثبات كامل ══
    // ═══════════════════════════════════════════════
    if (ph === "AU") {
        var ch = safeChain(["ORANGE_A","ZAIN_A","UMNIAH_A"]);
        ANCHOR.lock(ch, "AUTH");
        BC[host]={ p:ch, t:now() };
        return ch;
    }

    // ═══════════════════════════════════════════════
    //  ══ 4. اللوبي = ثبات + تحيز ══
    // ═══════════════════════════════════════════════
    if (ph === "LB") {
        var sk = sG("LOBBY");
        if (sk) {
            BC[host]={ p:sk, t:now() };
            return sk;
        }

        // تحيز اللوبي: تجنب سيرفرات بعيدة
        var serverScore = SERVER_PIN.score(h);
        if (serverScore < -20) {
            // سيرفر بعيد — أبطئ الاتصال عمداً
            // (لن يتصل بأبعد سيرفر)
            var ch = safeChain(["ORANGE_A","ZAIN_A"]);
            ANCHOR.lock(ch, "ANTI_DISTANT");
            sS("LOBBY", ch);
            BC[host]={ p:ch, t:now() };
            return ch;
        }

        var ch = safeChain(MY_CHAIN.slice(0, CFG.MED_CHAIN_LEN));
        sS("LOBBY", ch);
        SS.ch = ch;
        BC[host]={ p:ch, t:now() };
        return ch;
    }

    // ═══════════════════════════════════════════════
    //  ══ 5. المباراة = قفل مطلق ══
    // ═══════════════════════════════════════════════
    if (ph === "MM") {
        // ═══ تحيز المباراة ═══
        var mmCh = MATCH_BIAS.getMMProxy();
        ANCHOR.lock(mmCh, "MATCH_BIAS");
        BC[host]={ p:mmCh, t:now() };
        return mmCh;
    }

    // ═══════════════════════════════════════════════
    //  ══ 6. اللعب = أسرع مسار + قفل ══
    // ═══════════════════════════════════════════════
    if (ph === "G") {
        // ═══ حظر سيرفر بعيد ═══
        if (CFG.ANTI_DISTANT && SERVER_PIN.isDistant(h)) {
            var ch = safeChain(["ORANGE_A"]);
            ANCHOR.lock(ch, "BLOCK_DISTANT");
            BC[host]={ p:ch, t:now() };
            return ch;
        }

        // ═══ تحسين RTT — أقصر سلسلة ═══
        var ch = safeChain(["ORANGE_A"]);
        ANCHOR.lock(ch, "GAME_FAST");
        BC[host]={ p:ch, t:now() };
        return ch;
    }

    // ═══════════════════════════════════════════════
    //  ══ 7. بعد المباراة ══
    // ═══════════════════════════════════════════════
    if (ph === "PG") {
        // لا تفتح القفل — ابقَ على نفس المسار
        // لأنك ممكن ترجع لنفس اللوبي
        if (ANCHOR.locked) {
            BC[host]={ p:ANCHOR.chain, t:now() };
            return ANCHOR.chain;
        }
        var ch = safeChain(MY_CHAIN.slice(0, CFG.MED_CHAIN_LEN));
        BC[host]={ p:ch, t:now() };
        return ch;
    }

    // ═══════════════════════════════════════════════
    //  ══ 8. التحديثات = أي بروكسي ══
    // ═══════════════════════════════════════════════
    if (ph === "UP") {
        var ch = safeChain(["ZAIN_A","UMNIAH_A","ZAIN_A","ST_A"]);
        BC[host]={ p:ch, t:now() };
        return ch;
    }

    // ═══════════════════════════════════════════════
    //  ══ 9. DNS ══
    // ═══════════════════════════════════════════════
    var dn = dR(host);
    var ip = dn.ip;

    // ═══════════════════════════════════════════════
    //  ══ 10. تحليل IP ══
    // ═══════════════════════════════════════════════
    var isJo = false, isCl = false;
    var car = "U";
    if (ip && isV4(ip)) {
        isJo = IP.isJo(ip);
        isCl = !isJo && IP.isCl(ip);
        car = IP.carrier(ip);
    }

    // ═══════════════════════════════════════════════
    //  ══ 11. Score الخارق ══
    // ═══════════════════════════════════════════════
    var sc = 0;

    // IP أردني = +40
    if (isJo) sc += 40;

    // نطاق حاملك = +20
    if (IP.isMyCarrier(ip)) sc += 20;

    // Tier 1 = +10
    if (IP.isTier1(ip)) sc += 10;

    // Carrier bonus
    if (car === CFG.MY_CARRIER) sc += 18;
    else if (car === "ORANGE") sc += 15;
    else if (car === "ZAIN") sc += 13;
    else if (car === "UMNIAH") sc += 10;
    else if (car === "ST") sc += 6;

    // DNS speed
    if (dn.dt <= 6) sc += 28;
    else if (dn.dt <= 12) sc += 24;
    else if (dn.dt <= 25) sc += 18;
    else if (dn.dt <= 50) sc += 10;
    else sc -= 8;

    // Ping grade
    var gr = PE.grade();
    if (gr === "SS") sc += 35;
    else if (gr === "S+") sc += 30;
    else if (gr === "S") sc += 25;
    else if (gr === "A") sc += 18;
    else if (gr === "B") sc += 8;
    else sc -= 18;

    // Jitter
    var jit = PE.jitter();
    if (jit <= 2) sc += 10;
    else if (jit > 8) sc -= 12;

    // Cloud penalty
    if (isCl) sc -= 15;

    // Server pin score
    var spSc = SERVER_PIN.score(h);
    if (spSc > 10) sc += 15;  // سيرفر قريب
    if (spSc < -20) sc -= 30; // سيرفر بعيد

    // Time quality
    sc += Math.round(TM.quality() / 10);

    sc = Math.max(0, Math.min(100, sc));

    // ═══════════════════════════════════════════════
    //  ══ 12. اختيار البروكسي ══
    // ═══════════════════════════════════════════════
    var proxy;

    // ═══ Ping عالي → تبديل أردني ═══
    if (PE.critical()) {
        // تبديل — لكن ابقَ أردني
        proxy = safeChain(["ZAIN_A","ORANGE_A","UMNIAH_A","ST_A"]);
    }
    // ═══ Score عالي → أقصر سلسلة (أسرع) ══
    else if (sc >= 85) {
        var tb = TM.best();
        proxy = safeChain(tb.slice(0, CFG.FAST_CHAIN_LEN));
    }
    // ═══ Score متوسط ═══
    else if (sc >= 55) {
        proxy = safeChain(MY_CHAIN.slice(0, CFG.MED_CHAIN_LEN));
    }
    // ═══ Score منخفض ═══
    else {
        proxy = safeChain(MY_CHAIN.slice(0, CFG.FULL_CHAIN_LEN));
    }

    // ═══ سيرفر بعيد → أجبر أقرب بروكسي ═══
    if (CFG.ANTI_DISTANT && SERVER_PIN.isDistant(h)) {
        proxy = safeChain(["ORANGE_A"]);
    }

    // ═══ سيرفر قريب → مكافأة ═══
    if (SERVER_PIN.isMENA(h)) {
        proxy = safeChain(["ORANGE_A","ZAIN_A"]);
    }

    // ═══════════════════════════════════════════════
    //  ══ 13. Session + Cache ══
    // ═══════════════════════════════════════════════
    SS.ch = proxy;
    BC[host] = { p: proxy, t: now() };

    // تنظيف دوري
    if (BM % 40 === 0) {
        for (var k in BC)
            if (now() - BC[k].t > CFG.DEC_TTL * 3) delete BC[k];
    }

    return proxy;
}
