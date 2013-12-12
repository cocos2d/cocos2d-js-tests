"use strict";
classes.sprites.Hedgehog = cc.Sprite
        .extend({
            width : 30,
            height : 30,
            speed : 300,
            ctor : function() {
                this._super();
                tizen.logger.info("classes.sprites.Hedgehog.ctor()");
                this.initWithFile("images/hedgehog.png");
                this.setPosition(new cc.Point(game.getWindowSize().width / 2,
                        game.getWindowSize().height / 2));

            },
            move : function(dt, keyboardArrows) {
                var pos = this.getPosition();
                /**
                 * TODO: Axis are inverted for different types of devices.
                 *
                 */
                if (keyboardArrows.left) {
                    pos.x = pos.x - this.speed * dt;
                }
                if (keyboardArrows.right) {
                    pos.x = pos.x + this.speed * dt;
                }
                if (keyboardArrows.up) {
                    pos.y = pos.y + this.speed * dt;
                }
                if (keyboardArrows.down) {
                    pos.y = pos.y - this.speed * dt;
                }

                pos.x = pos.x - (sensors.getBeta() / 4);
                pos.y = pos.y - (sensors.getGamma() / 5);

                if (pos.x < this.width / 2) {
                    pos.x = this.width / 2;
                } else if (pos.x > (game.getWindowSize().width - this.width / 2)) {
                    pos.x = (game.getWindowSize().width - this.width / 2);
                }
                if (pos.y < this.height / 2) {
                    pos.y = this.height / 2;
                } else if (pos.y > (game.getWindowSize().height - this.height / 2)) {
                    pos.y = (game.getWindowSize().height - this.height / 2);
                }
                return new cc.Point(pos.x, pos.y);
            },
            collideRect : function() {
                var a = this.getContentSize();
                var p = this.getPosition();
                return cc.rect(p.x - a.width / 2, p.y - a.height / 2, a.width,
                        a.height);
            }
        });