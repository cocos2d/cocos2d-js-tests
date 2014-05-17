"use strict";
classes.scenes.Level = cc.Scene.extend({
    ctor : function() {
        this._super();
        this.levelLayer = new classes.layers.Level();
        this.addChild(this.levelLayer);
    }
});