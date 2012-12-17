var dirImg = "res/";
var dirMusic = "res/Music/";

//image
var s_loading = dirImg + "loading.png";
var s_menu = dirImg + "menu.png";
var s_logo = dirImg + "logo.png";
var s_cocos2dhtml5 = dirImg + "cocos2d-html5.png";
var s_gameOver = dirImg + "gameOver.png";
var s_menuTitle = dirImg + "menuTitle.png";
var s_flare = dirImg + "flare.jpg";
var s_explosion = dirImg + "explosion.png";
var s_arial14 = dirImg + "arial-14.png";
var s_arial14_fnt = dirImg + "arial-14.fnt";
var s_gameplay = dirImg + "gameplaypack.png";
var s_textureOpaquePack = dirImg + "textureOpaquePack.png";
var s_textureTransparentPack = dirImg + "textureTransparentPack.png";

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
var s_explosion_plist = dirImg + "explosion.plist";
var s_game_paly_plist = dirImg + "gameplaypack.plist";
var s_textureOpaquePack_plist = dirImg + "textureOpaquePack.plist";
var s_textureTransparentPack_plist = dirImg + "textureTransparentPack.plist";

var g_ressources = [
    //image
    {type:"image", src:s_loading},
    {type:"image", src:s_menu},
    {type:"image", src:s_logo},
    {type:"image", src:s_cocos2dhtml5},
    {type:"image", src:s_gameOver},
    {type:"image", src:s_menuTitle},
    {type:"image", src:s_flare},
    {type:"image", src:s_explosion},
    {type:"image", src:s_arial14},
    {type:"image", src:s_textureOpaquePack},
    {type:"image", src:s_textureTransparentPack},

    //tmx
    {type:"tmx", src:s_level01},

    //plist
    {type:"plist", src:s_explosion_plist},
    {type:"plist", src:s_textureOpaquePack_plist},
    {type:"plist", src:s_textureTransparentPack_plist},

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
