var GameResult_ChickMenu = "GameResult_ChickMenu";

var eGameResultMenuTag = {
    Continue :1,
    Restart:2,
    Quit:3
};

var SCORE_MAX = 9999999;

var ResultLayer = cc.Layer.extend({
    mGameScore:0,
    mStarScores:null,
    mIsSucceed:true,
    mIgnoreTouch:false,
    mStarSprites:null,

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        var bRet = false;
        if (this._super()) {
            this.mStarSprites = [];

            var itemRestart =cc.MenuItemImage.create(
                "resultLayer/btnResultRestart.png",
                "resultLayer/btnResultRestartDown.png",
                this.menuCallBack,
                this);
            itemRestart.setTag(eGameResultMenuTag.Restart);
            itemRestart.x = 160;
	        itemRestart.y = 160;

            var resultMenu = cc.Menu.create(itemRestart);
            resultMenu.x = 0;
	        resultMenu.y = 0;
            this.addChild(resultMenu);

            bRet = true;
        }
        return bRet;
    },
    initResultData:function( gameScore, referenceScore, recordScore, isSucceed){
        var bRet = true;
        if(gameScore > SCORE_MAX)
            gameScore = SCORE_MAX;
        else if(gameScore < 0)
            gameScore = 0;

        this.mGameScore = gameScore;

        this.mStarScores = [0,0,0];
        if(referenceScore > 0 && referenceScore<=SCORE_MAX){
            this.mStarScores[0] = gameScore*0.4;
            this.mStarScores[1] = gameScore*0.6;
            this.mStarScores[2] = gameScore*0.8;
        }
        else
            bRet = false;

        this.mIsSucceed = isSucceed;

        for (var starIndex=0; starIndex<3; starIndex++){
            if (this.mStarSprites[starIndex] == null && this.mGameScore > this.mStarScores[starIndex]){
                this.showStar(starIndex);
            }
        }
        if (bRet == false)
            cc.log("GameResult Error");
    },
    showStar:function(starIndex){
        var sprite = this.mStarSprites[starIndex] = cc.Sprite.create("resultLayer/star.png");
	    sprite.scale = 0.1;

        switch(starIndex){
            case 0:
	            sprite.x = 60;
	            sprite.y = 245;
                break;
            case 1:
                sprite.x = 160;
	            sprite.y = 265;
                break;
            case 2:
                sprite.x = 260;
	            sprite.y = 245;
                break;
        }
        this.addChild(this.mStarSprites[starIndex]);

        this.mStarSprites[starIndex].runAction(cc.ScaleTo.create(0.7,1.0,1.0));
        this.mStarSprites[starIndex].runAction(cc.RotateBy.create(0.7,720.0));
    },
    menuCallBack:function(sender){
        gSharedEngine.playEffect(EFFECT_BUTTON_CHICK);
        if (this.mIgnoreTouch == false){
            this.mIgnoreTouch = true;
            switch(sender.getTag()){
                case eGameResultMenuTag.Restart:
                    var nextScene = cc.Scene.create();
                    var nextLayer = new PatternMatrix;
                    nextScene.addChild(nextLayer);
                    var matrixLayer = cc.director.getRunningScene().getChildByTag(111);
                    matrixLayer.clearMsgListener();
	                cc.director.runScene(cc.TransitionSlideInT.create(0.4, nextScene));
                    break;
            }
        }
    }
});
