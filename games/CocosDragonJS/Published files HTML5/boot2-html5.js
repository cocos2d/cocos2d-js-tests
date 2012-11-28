var CCBMainScene = cc.Scene.extend({
    ctor:function () {
        this._super();
        //these variables will be declared as global variable
        audioEngine = cc.AudioEngine.getInstance();
        director = cc.Director.getInstance();

        var node = cc.BuilderReader.load("MainMenuScene.ccbi");

        this.addChild(node);
        this.setPosition(cc.p(0, 0));
    }
});
