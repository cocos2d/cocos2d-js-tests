"use strict";
classes.sprites.Circle = cc.Sprite.extend({
    _radians : 0,
    ctor : function() {
        this._super();
    },
    draw : function() {
        cc.renderContext.fillStyle = "rgba(255,255,255,1)";
        cc.renderContext.strokeStyle = "rgba(255,255,255,1)";

        if (this._radians < 0) {
            this._radians = 360;
        }
        ;
        cc.drawingUtil.drawCircle(cc.PointZero(), 30, cc
                .DEGREES_TO_RADIANS(this._radians), 60, true);
    },
    myUpdate : function(dt) {
        this._radians -= 6;
    }
});