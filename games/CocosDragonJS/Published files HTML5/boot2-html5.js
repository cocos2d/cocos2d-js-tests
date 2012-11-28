var CCBMainScene = cc.Scene.extend({
    ctor:function () {
        this._super();
        //these variables will be declared as global variable
        audioEngine = cc.AudioEngine.getInstance();
        director = cc.Director.getInstance();

        gWinSize = cc.Director.getInstance().getWinSize();
        gScaleFactor;
        if (gWinSize.width <= 320)
            gScaleFactor = 1;
        else
            gScaleFactor = 2;

        var node = cc.BuilderReader.load("MainMenuScene.ccbi");

        this.addChild(node);
        this.setPosition(cc.p(0, 0));
    }
});
