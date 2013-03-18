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
var s_textureOpaquePack_plist = dirImg + "textureOpaquePack.plist";
var s_textureTransparentPack_plist = dirImg + "textureTransparentPack.plist";

var g_mainmenu = [
    {src:s_loading},
    {src:s_menu},
    {src:s_logo},
    {src:s_mainMainMusic},
    {src:s_menuTitle},
    {src:s_textureTransparentPack_plist},
    {src:s_textureTransparentPack}
];

var g_maingame = [
    //image
    {src:s_cocos2dhtml5},
    {src:s_gameOver},
    {src:s_flare},
    {src:s_arial14},
    {src:s_explosion},
    {src:s_textureOpaquePack},

    //tmx
    {src:s_level01},

    //plist
    {src:s_explosion_plist},
    {src:s_textureOpaquePack_plist},

    //music
    {src:s_bgMusic},

    //effect
    {src:s_buttonEffect},
    {src:s_explodeEffect},
    {src:s_fireEffect},
    {src:s_shipDestroyEffect},

    // FNT
    {src:s_arial14_fnt}
];
