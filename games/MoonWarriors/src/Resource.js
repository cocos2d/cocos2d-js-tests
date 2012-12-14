var dirImg = "res/";
var dirMusic = "res/Music/";

//image
var s_bg01 = "bg01.png";
var s_loading = dirImg + "loading.png";
var s_ship01 = dirImg + "ship01.png";
var s_menu = dirImg + "menu.png";
var s_logo = dirImg + "logo.png";
var s_cocos2dhtml5 = dirImg + "cocos2d-html5.png";
var s_gameOver = dirImg + "gameOver.png";
var s_menuTitle = dirImg + "menuTitle.png";
var s_Enemy = dirImg + "Enemy.png";
var s_flare = dirImg + "flare.jpg";
var s_bullet = dirImg + "bullet.png";
var s_explosion = dirImg + "explosion.png";
var s_explode = dirImg + "explode.png";
var s_explode1 = "explode1.png";
var s_explode2= "explode2.png";
var s_explode3 = "explode3.png";
var s_hit = "hit.png";
var s_arial14 = dirImg + "arial-14.png";
var s_arial14_fnt = dirImg + "arial-14.fnt";
var s_gameplay = dirImg + "gameplaypack.png";
var s_tex565pack = dirImg + "tex565pack.png";
var s_tex8888pack = dirImg + "tex8888pack.png";
var s_ship1 = "ship01.png";
var s_ship2 = "ship02.png";
var s_ship3 = "ship03.png";

//music
var s_bgMusic = dirMusic + "bgMusic.mp3";
var s_mainMainMusic = dirMusic + "mainMainMusic.mp3";

//effect
var s_buttonEffect = dirMusic + "buttonEffet.mp3";
var s_explodeEffect = dirMusic + "explodeEffect.mp3";
var s_fireEffect = dirMusic + "fireEffect.mp3";
var s_shipDestroyEffect = dirMusic + "shipDestroyEffect.mp3";

//tmx
var s_level01 = dirImg + "level01.tmx";

//plist
var s_Enemy_plist = dirImg + "Enemy.plist";
var s_explosion_plist = dirImg + "explosion.plist";
var s_bullet_plist = dirImg + "bullet.plist";
var s_explode_plist = dirImg + "explode.plist";
var s_game_paly_plist = dirImg + "gameplaypack.plist";
var s_tex565pack_plist = dirImg + "tex565pack.plist";
var s_tex8888pack_plist = dirImg + "tex8888pack.plist";

var g_ressources = [
    //image
    {type:"image", src:s_bg01},
    {type:"image", src:s_loading},
    {type:"image", src:s_ship01},
    {type:"image", src:s_menu},
    {type:"image", src:s_logo},
    {type:"image", src:s_cocos2dhtml5},
    {type:"image", src:s_gameOver},
    {type:"image", src:s_menuTitle},
    {type:"image", src:s_Enemy},
    {type:"image", src:s_flare},
    {type:"image", src:s_bullet},
    {type:"image", src:s_explode},
    {type:"image", src:s_explosion},
    {type:"image", src:s_explode1},
    {type:"image", src:s_explode2},
    {type:"image", src:s_explode3},
    {type:"image", src:s_hit},
    {type:"image", src:s_arial14},

    //tmx
    {type:"tmx", src:s_level01},

    //plist
    {type:"plist", src:s_Enemy_plist},
    {type:"plist", src:s_explosion_plist},
    {type:"plist", src:s_bullet_plist},
    {type:"plist", src:s_explode_plist},

    //music
    {type:"sound", src:s_bgMusic},
    {type:"sound", src:s_mainMainMusic},

    //effect
    {type:"sound", src:s_buttonEffect},
    {type:"sound", src:s_explodeEffect},
    {type:"sound", src:s_fireEffect},
    {type:"sound", src:s_shipDestroyEffect},

    // FNT
    {type:"fnt", src:s_arial14_fnt}

];
