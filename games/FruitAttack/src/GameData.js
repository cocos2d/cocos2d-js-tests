var gNotification = cc.NotificationCenter.getInstance();
var gSpriteFrameCache = cc.SpriteFrameCache.getInstance();

var gSharedEngine = cc.AudioEngine.getInstance();

var MUSIC_BACKGROUND  = "audio/musicByFoxSynergy.mp3";
var EFFECT_BUTTON_CHICK  = "audio/effect_buttonClick.ogg";
var EFFECT_GAME_FAIL  = "audio/effect_game_fail.ogg";
var EFFECT_GAME_WIN  = "audio/effect_game_pass.ogg";
var EFFECT_PATTERN_UN_SWAP  = "audio/effect_unswap.ogg";
var EFFECT_PATTERN_CLEAR  = "audio/effect_clearPattern.ogg";
var EFFECT_PATTERN_BOMB  = "audio/effect_bombPattern.ogg";
var EFFECT_TIME_WARN  = "audio/effect_timewarning.ogg";

var g_ressources = [
    {src:"res/background.jpg"},
    {src:"res/logo.png"},

    {src:"res/btn/btnStartGameDown.png"},
    {src:"res/btn/btnStartGameNor.png"},

    {src:"res/ProgressBarFront.png"},
    {src:"res/ProgressBarBack.png"},

    {src:"res/baseResource.png"} ,
    {src:"res/baseResource.plist"},
    {src:"res/PatternBg.png"},

    {src:"resultLayer/star.png"},
    {src:"resultLayer/btnResultRestart.png"},
    {src:"resultLayer/btnResultRestartDown.png"},

    {src:MUSIC_BACKGROUND},
    {src:EFFECT_BUTTON_CHICK},
    {src:EFFECT_GAME_FAIL},
    {src:EFFECT_GAME_WIN},
    {src:EFFECT_PATTERN_UN_SWAP},
    {src:EFFECT_PATTERN_CLEAR},
    {src:EFFECT_PATTERN_BOMB},
    {src:EFFECT_TIME_WARN}
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
    this.lastScore = score;

    if (score > this.bestScore)
    {
        this.bestScore = score;
        sys.localStorage.setItem('bestScore',this.bestScore);
    }
    sys.localStorage.setItem('lastScore',this.lastScore);
};

gScoreData.initData = function(){
    if( sys.localStorage.getItem('gameData') == null){
        sys.localStorage.setItem('bestScore','0');
        sys.localStorage.setItem('lastScore','0');

        sys.localStorage.setItem('gameData',33) ;
        return;
    }

    this.bestScore = parseInt(sys.localStorage.getItem('bestScore'));
};

