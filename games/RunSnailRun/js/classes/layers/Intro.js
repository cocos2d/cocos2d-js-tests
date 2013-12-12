"use strict";
classes.layers.Intro = cc.Layer
        .extend({
            isMouseDown : false,
            onEnter : function() {
                this._super();
                this.logo.setScale(0.1);
                this.logo.runAction(cc.Sequence.create(cc.EaseElasticOut
                        .create(cc.ScaleTo.create(2, 1, 1), 0.5)));
                setTimeout(function() {
                    var level = new classes.scenes.Level();
                    game.setScene('level', level);
                    game.changeScene(level);
                }, 3000);
            },
            ctor : function() {
                this._super();
                tizen.logger.info("classes.layers.Intro.ctor()");
                var selfPointer = this;
                this.addExitAppButton();

                // Background layer
                // var background = cc.LayerColor.create(new cc.Color4B(0, 0, 0,
                // 255), 1280, 670);
                // ask director the window size
                var size = cc.Director.getInstance().getWinSize();

                var about = cc.MenuItemImage.create("images/forward.png",
                        "images/forward.png", this, function() {
                            var level = new classes.scenes.Level();
                            game.setScene('level', level);
                            game.changeScene(level);
                        });
                var menuNext = cc.Menu.create(about);
                menuNext.setPosition(cc.p(size.width - 100, 350));

                var background = cc.Sprite.create("images/splash/bg.png");
                background.setPosition(new cc.Point(
                        game.getWindowSize().width / 2,
                        game.getWindowSize().height / 2));

                var hedgehog = cc.Sprite.create("images/splash/hedgehog.png");
                hedgehog.setPosition(new cc.Point(
                        200 + game.getWindowSize().width / 2, (game
                                .getWindowSize().height / 2) - 150));

                var snail = cc.Sprite.create("images/splash/snail.png");
                snail.setPosition(new cc.Point(
                        (game.getWindowSize().width / 2) - 200, (game
                                .getWindowSize().height / 2) - 150));

                this.logo = cc.Sprite.create("images/splash/logo.png");
                this.logo.setPosition(new cc.Point(
                        (game.getWindowSize().width / 2) - 100, (game
                                .getWindowSize().height / 2) + 70));

                this.setTouchEnabled(true);

                // adds layers/sprites to this layer in given order
                this.addChild(background, 0);
                // this.addChild(menuNext, 1);
                this.addChild(hedgehog, 3);
                this.addChild(snail, 4);
                this.addChild(this.logo, 2);

                return true;
            },

            adjustSizeForWindow : function() {
                var margin = document.documentElement.clientWidth
                        - document.body.clientWidth;
                if (document.documentElement.clientWidth < cc.originalCanvasSize.width) {
                    cc.canvas.width = cc.originalCanvasSize.width;
                } else {
                    cc.canvas.width = document.documentElement.clientWidth
                            - margin;
                }
                if (document.documentElement.clientHeight < cc.originalCanvasSize.height) {
                    cc.canvas.height = cc.originalCanvasSize.height;
                } else {
                    cc.canvas.height = document.documentElement.clientHeight
                            - margin;
                }

                var xScale = cc.canvas.width / cc.originalCanvasSize.width;
                var yScale = cc.canvas.height / cc.originalCanvasSize.height;
                if (xScale > yScale) {
                    xScale = yScale;
                }
                cc.canvas.width = cc.originalCanvasSize.width * xScale;
                cc.canvas.height = cc.originalCanvasSize.height * xScale;
                var parentDiv = document.getElementById("Cocos2dGameContainer");
                if (parentDiv) {
                    parentDiv.style.width = cc.canvas.width + "px";
                    parentDiv.style.height = cc.canvas.height + "px";
                }
                cc.renderContext.translate(0, cc.canvas.height);
                cc.renderContext.scale(xScale, xScale);
                cc.Director.getInstance().setContentScaleFactor(xScale);
            }
        });