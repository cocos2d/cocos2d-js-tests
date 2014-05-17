"use strict";
classes.sprites.Snail = cc.Sprite
        .extend({
            width : 30,
            height : 30,
            x : 0,
            y : 0,
            vx : Math.random() - 0.5,
            vy : Math.random() - 0.5,
            ctor : function() {
                this._super();
                this.initWithFile("images/snail.png");
            },
            move : function() {
                var DAMP = 0.99;

                this.x = this.getPosition().x;
                this.y = this.getPosition().y;

                this.vx += Math.random() * 0.5 - 0.25;
                this.vy += Math.random() * 0.5 - 0.25;

                var newx = this.x + this.vx;
                var newy = this.y + this.vy;

                this.x += this.vx;
                this.y += this.vy;

                this.vx *= DAMP;
                this.vy *= DAMP;

                this.vx = this.x < 50 ? this.vx * -1 : this.x > 1200 ? this.vx
                        * -1 : this.vx;
                this.vy = this.y < 50 ? this.vy * -1 : this.y > 600 ? this.vy
                        * -1 : this.vy;
                this.x = this.x < 0 ? game.getWindowSize().width
                        : this.x > game.getWindowSize().width ? 0 : this.x;
                this.y = this.y < 0 ? game.getWindowSize().height
                        : this.y > game.getWindowSize().height ? 0 : this.y;

                return new cc.Point(this.x, this.y);

            },
            collideRect : function() {
                var a = this.getContentSize();
                var p = this.getPosition();
                return cc.rect(p.x - a.width / 2, p.y - a.height / 2, a.width,
                        a.height);
            }
        });