"use strict";
classes.Application = cc.Application.extend({
    config : document.ccConfig,
    ctor : function(scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.setup(this.config['tag']);
        cc.AppController.shareAppController().didFinishLaunchingWithOptions();
    },
    applicationDidFinishLaunching : function() {
        var that = this;
        // initialize director
        var director = cc.Director.getInstance();

        // enable High Resource Mode(2x, such as iphone4) and maintains low
        // resource on other devices.
        // director->enableRetinaDisplay(true);

        // turn on display FPS
        director.setDisplayStats(this.config['showFPS']);

        // set FPS. the default value is 1.0/60 if you don't call this
        director.setAnimationInterval(1.0 / this.config['frameRate']);

        // create a scene. it's an autorelease object

        // load resources and run
        cc.Loader.preload(game.config.resources, function() {
            var startSceneInstance = new that.startScene();
            director.replaceScene(startSceneInstance);
            game.setScene('intro', startSceneInstance);
        });

        return true;
    }
});