"use strict";
classes.scenes.Intro = cc.Scene.extend({
    ctor : function() {
        this._super();
        this.introLayer = new classes.layers.Intro();
        this.addChild(this.introLayer);
    }
});