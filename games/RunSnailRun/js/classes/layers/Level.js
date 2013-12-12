"use strict";
classes.layers.Level = cc.Layer.extend({

    timer : function(sec) {
        return '<p class="count">' + sec + ' </p>'
                + '<p class="sec"> sec remaining</p>';
    },

    ctor : function() {
        tizen.logger.info("classes.layers.Level.ctor()");
        this._super();
        this.addExitAppButton();
        var that = this;
        this.snails = [];
        this.numberOfSnails = 0;
        // keyboard enabled
        this.setKeyboardEnabled(true);
        this.keyboardArrows = {
            left : false,
            right : false,
            up : false,
            down : false
        };

        this.initTiledMap();
        this.initSnails();
        var size = cc.Director.getInstance().getWinSize();

        // Timeout
        var timeDisplayer = document.getElementById("timeLeft");
        timeDisplayer.innerHTML = this.timer(game.config.timeout);

        game.startCountdown(function(time) {
            timeDisplayer.innerHTML = that.timer(game.config.timeout);
        });

        this.scheduleUpdate();
    },

    update : function(dt) {
        var that = this;
        this.moveAndCheckForObstacles(this.hedgehog, dt);
        this.snails.forEach(function(snail) {
            that.moveAndCheckForObstacles(snail, dt);
        });
        this.collisionDetection();
    },

    /**
     * Initializes static sprite as a background
     */
    initBackground : function() {
        this.background = new classes.sprites.Background();
        this.addChild(this.background, -9);
    },

    initTiledMap : function() {
        this.tiledMap = new classes.maps.TiledMeadow();
        this.addChild(this.tiledMap, -8);

        var objectGroup = this.tiledMap.getObjectGroup("hedgehog");
        var startPoint = objectGroup.objectNamed("StartPosition");

        this.hedgehog = new classes.sprites.Hedgehog();
        this.hedgehog.setPosition(new cc.Point(startPoint.x, startPoint.y));
        this.addChild(this.hedgehog, 2);
    },

    initSnails : function() {
        if (this.tiledMap) {
            var objectGroupSnails = this.tiledMap.getObjectGroup("snails");
            var objectSnails = objectGroupSnails.getObjects();
            this.numberOfSnails = objectSnails.length;
            var that = this;
            objectSnails.forEach(function(objectSnail) {
                var snail = new classes.sprites.Snail();
                snail.setPosition(new cc.Point(objectSnail.x, objectSnail.y));
                that.snails.push(snail);
                that.addChild(snail, 1);
            });
        }
    },

    isCollisionInArray : function(item, array) {
        var i;
        for (i = 0; i < array.length; i++) {
            if (cc.rectIntersectsRect(item, array[i])) {
                return true;
            }
        }
        return false;
    },

    moveAndCheckForObstacles : function(object, dt) {
        var newPosition = object.move(dt, this.keyboardArrows);
        var newReactangle = cc.rect(newPosition.x + 2 - object.width / 2,
                newPosition.y + 2 - object.height / 2, object.width - 4,
                object.height - 4);
        if (!this.isCollisionInArray(newReactangle, this.tiledMap.obstacles)) {
            object.setPosition(newPosition);
        }
    },

    onKeyDown : function(key) {
        switch (key) {
        case 37:
            this.keyboardArrows.left = true;
            break;
        case 38:
            this.keyboardArrows.up = true;
            break;
        case 39:
            this.keyboardArrows.right = true;
            break;
        case 40:
            this.keyboardArrows.down = true;
            break;
        default:
            break;
        }
    },

    onKeyUp : function(key) {
        switch (key) {
        case 37:
            this.keyboardArrows.left = false;
            break;
        case 38:
            this.keyboardArrows.up = false;
            break;
        case 39:
            this.keyboardArrows.right = false;
            break;
        case 40:
            this.keyboardArrows.down = false;
            break;
        default:
            break;
        }
    },

    removeCounter : function() {
        var timeDisplayer = document.getElementById("timeLeft");
        timeDisplayer.innerHTML = '';
    },

    collisionDetection : function() {
        var i;
        for (i = 0; i < this.snails.length; i++) {
            if (cc.rectIntersectsRect(this.hedgehog.collideRect(),
                    this.snails[i].collideRect())) {
                /**
                 * TODO: Sound effects temporary turned off
                 */
                // game.getAudio().playEffect("sounds/splat");
                this.removeChild(this.snails[i]);
                this.numberOfSnails--;
                this.snails.splice(i, 1);
                if (this.numberOfSnails === 0) {
                    alert("You win!");
                    game.changeScene(game.getScene('intro'));
                    game.stopCountdown();
                    this.removeCounter();
                }
            }
        }
    },
    removeAllSnails : function() {
        for ( var i = 0; i < this.snails.length; i++) {
            this.removeChild(this.snails[i]);
        }
    }
});