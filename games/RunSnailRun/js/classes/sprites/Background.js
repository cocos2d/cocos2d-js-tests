"use strict";
classes.sprites.Background = cc.Sprite.extend({
    width : 1280,
    height : 670,
    ctor : function() {
        this._super();
        tizen.logger.info("classes.sprites.Background.ctor()");
        this.initWithFile("images/meadow.jpeg");
        this.setPosition(new cc.Point(game.getWindowSize().width / 2, game
                .getWindowSize().height / 2));
    }
});
