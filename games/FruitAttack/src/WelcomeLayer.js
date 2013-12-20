var WelcomeLayer = cc.Layer.extend({

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        var bRet = false;
        if (this._super()) {
            var bgSprite = cc.Sprite.create("res/background.jpg");
            bgSprite.setPosition(160,240);
            this.addChild(bgSprite);

            var logoSprite = cc.Sprite.create("res/logo.png");
            logoSprite.setPosition(160,320);
            this.addChild(logoSprite);

            var itemStartGame = cc.MenuItemImage.create(
                "res/btn/btnStartGameNor.png",
                "res/btn/btnStartGameDown.png",
                this.menuCallBack,
                this
            );
            itemStartGame.setPosition(160, 160);

            var menu = cc.Menu.create(itemStartGame);
            menu.setPosition(0,0);
            this.addChild(menu);

            bRet = true;
        }
        return bRet;
    },
    menuCallBack:function(sender){
        gSharedEngine.playEffect(EFFECT_BUTTON_CHICK);
        //gGameMode = eGameMode.Challenge;
        gGameMode = eGameMode.Timer;
        var nextScene = cc.Scene.create();
        var nextLayer = new PatternMatrix;
        nextScene.addChild(nextLayer);
        cc.Director.getInstance().replaceScene(cc.TransitionSlideInT.create(0.4, nextScene));
    }
});

var MyGameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        gScoreData.initData();

        var spriteFrameCache = cc.SpriteFrameCache.getInstance();
        spriteFrameCache.addSpriteFrames("res/baseResource.plist","res/baseResource.png");

        var layer = new WelcomeLayer;
        this.addChild(layer);

        gSharedEngine.setMusicVolume(1);
        gSharedEngine.setEffectsVolume(1);
        gSharedEngine.playMusic(MUSIC_BACKGROUND,true);
    }
});