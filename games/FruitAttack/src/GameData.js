var gNotification = cc.NotificationCenter.getInstance();
var gSpriteFrameCache = cc.spriteFrameCache;

var gSharedEngine = cc.audioEngine;

var MUSIC_BACKGROUND  = "audio/musicByFoxSynergy.mp3";
var EFFECT_BUTTON_CHICK  = "audio/effect_buttonClick.ogg";
var EFFECT_GAME_FAIL  = "audio/effect_game_fail.ogg";
var EFFECT_GAME_WIN  = "audio/effect_game_pass.ogg";
var EFFECT_PATTERN_UN_SWAP  = "audio/effect_unswap.ogg";
var EFFECT_PATTERN_CLEAR  = "audio/effect_clearPattern.ogg";
var EFFECT_PATTERN_BOMB  = "audio/effect_bombPattern.ogg";
var EFFECT_TIME_WARN  = "audio/effect_timewarning.ogg";

var g_ressources = [
    "res/background.jpg",
    "res/logo.png",

    "res/btn/btnStartGameDown.png",
    "res/btn/btnStartGameNor.png",

    "res/ProgressBarFront.png",
    "res/ProgressBarBack.png",

    "res/baseResource.png" ,
    "res/baseResource.plist",
    "res/PatternBg.png",

    "resultLayer/star.png",
    "resultLayer/btnResultRestart.png",
    "resultLayer/btnResultRestartDown.png",

    MUSIC_BACKGROUND,
    EFFECT_BUTTON_CHICK,
    EFFECT_GAME_FAIL,
    EFFECT_GAME_WIN,
    EFFECT_PATTERN_UN_SWAP,
    EFFECT_PATTERN_CLEAR,
    EFFECT_PATTERN_BOMB,
    EFFECT_TIME_WARN
];

var gScoreData = {lastScore:0,bestScore:0};

var eGameMode = {
    Invalid : -1,
    Challenge:0,
    Timer:1,
    Count:2
};
var gGameMode = eGameMode.Challenge;

gScoreData.setLastScore = function(score){
    var sys = cc.sys;
    this.lastScore = score;

    if (score > this.bestScore)
    {
        this.bestScore = score;
        sys.localStorage.setItem('bestScore',this.bestScore);
    }
    sys.localStorage.setItem('lastScore',this.lastScore);
};

gScoreData.initData = function(){
    var sys = cc.sys;
    if( sys.localStorage.getItem('gameData') == null){
        sys.localStorage.setItem('bestScore','0');
        sys.localStorage.setItem('lastScore','0');

        sys.localStorage.setItem('gameData',33) ;
        return;
    }

    this.bestScore = parseInt(sys.localStorage.getItem('bestScore'));
};

