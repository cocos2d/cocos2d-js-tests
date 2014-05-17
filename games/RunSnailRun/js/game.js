"use strict";
var game = (function() {
    var application;
    var initialTimeout;
    var intPtr;
    var audio = cc.AudioEngine.getInstance();
    /**
     * All scenes for the application
     */
    var scenes = {};

    return {

        /**
         * The following config variable is the global game configuration. You
         * can set all the game related values, like sensors or game timeout.
         */
        config : {
            width : 1260,
            height : 660,
            useSensor : true,
            debug : false,
            timeout : 30,
            /**
             * All game multimedia resources
             */
            resources : [ {
                type : "image",
                src : "images/HelloWorld.png"
            }, {
                type : "image",
                src : "images/CloseNormal.png"
            }, {
                type : "image",
                src : "images/CloseSelected.png"
            }, {
                type : "image",
                src : "images/forward.png"
            }, {
                type : "image",
                src : "images/hedgehog.png"
            }, {
                type : "image",
                src : "images/snail.png"
            }, {
                type : "image",
                src : "images/lettuce.png"
            }, {
                type : "image",
                src : "images/ground.png"
            }, {
                type : "effect",
                src : "sounds/splat.mp3"
            }, {
                type : "tmx",
                src : "images/tiledMeadow.tmx"
            }, {
                type : "image",
                src : "images/splash/bg.png"
            }, {
                type : "image",
                src : "images/splash/hedgehog.png"
            }, {
                type : "image",
                src : "images/splash/logo.png"
            }, {
                type : "image",
                src : "images/splash/snail.png"
            } ]
        },

        getScene : function(scene) {
            return scenes[scene];
        },

        setScene : function(name, scene) {
            scenes[name] = scene;
        },

        initialize : function() {
            tizen.logger = tizen.logger({
                logLevel : 3
            });
            tizen.logger.info("game.initialize()");
            tizen.view.getScreenWidth();
            tizen.view.getScreenHeight();
            audio.init("mp3,ogg");
            power.setScreen(power.getPowerState().SCREEN_BRIGHT);
        },
        getRandomXPosition : function() {
            return Math.floor((Math.random() * this.config.width));
        },
        getRandomYPosition : function() {
            return Math.floor((Math.random() * this.config.height));
        },
        changeScene : function(scene) {
            cc.Director.getInstance().replaceScene(
                    cc.TransitionFade.create(1.2, scene));
        },
        getWindowSize : function() {
            return cc.Director.getInstance().getWinSize();
        },
        getAudio : function() {
            return audio;
        },
        start : function() {
            tizen.logger.info("game.start()");
            application = new classes.Application(classes.scenes.Intro);
        },
        stopCountdown : function() {
            clearInterval(intPtr);
            this.getScene('level').levelLayer.removeAllSnails();
            this.config.timeout = initialTimeout;
        },
        startCountdown : function(callback) {
            var that = this;
            initialTimeout = that.config.timeout;
            intPtr = setInterval(function() {
                callback(--that.config.timeout);
                if (that.config.timeout === 0) {
                    that.stopCountdown();
                    alert("Game over... Please try again...");
                    that.getScene('level').levelLayer.removeCounter();
                    that.changeScene(that.getScene('intro'));
                }
            }, 1000);
        }
    };
}());
