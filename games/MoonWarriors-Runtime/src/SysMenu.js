cc.dumpConfig();

var SysMenu = cc.Layer.extend({
    _ship: null,

    init: function () {
        //this.setKeypadEnabled(true);
        var bRet = false;
        if (this._super()) {

            var writablePath = cc.FileUtils.getInstance().getWritablePath();
            cc.log("writablePath: " + writablePath);

            cc.SpriteFrameCache.getInstance().addSpriteFrames(res.textureTransparentPack_plist);

            winSize = cc.Director.getInstance().getWinSize();
            var sp = cc.Sprite.create(res.loading_png);
            sp.setAnchorPoint(0, 0);
            this.addChild(sp, 0, 1);

            var logo = cc.Sprite.create(res.logo_png);
            logo.setAnchorPoint(0, 0);
            logo.setPosition(0, 250);
            this.addChild(logo, 10, 1);

            var newGameNormal = cc.Sprite.create(res.menu_png, cc.rect(0, 0, 126, 33));
            var newGameSelected = cc.Sprite.create(res.menu_png, cc.rect(0, 33, 126, 33));
            var newGameDisabled = cc.Sprite.create(res.menu_png, cc.rect(0, 33 * 2, 126, 33));

            var gameSettingsNormal = cc.Sprite.create(res.menu_png, cc.rect(126, 0, 126, 33));
            var gameSettingsSelected = cc.Sprite.create(res.menu_png, cc.rect(126, 33, 126, 33));
            var gameSettingsDisabled = cc.Sprite.create(res.menu_png, cc.rect(126, 33 * 2, 126, 33));

            var aboutNormal = cc.Sprite.create(res.menu_png, cc.rect(252, 0, 126, 33));
            var aboutSelected = cc.Sprite.create(res.menu_png, cc.rect(252, 33, 126, 33));
            var aboutDisabled = cc.Sprite.create(res.menu_png, cc.rect(252, 33 * 2, 126, 33));
            var flare = cc.Sprite.create(res.flare_jpg);
            this.addChild(flare);
            flare.setVisible(false);
            var newGame = cc.MenuItemSprite.create(newGameNormal, newGameSelected, newGameDisabled, function () {
                this.onButtonEffect();
                //this.onNewGame();
                flareEffect(flare, this, this.onNewGame);
            }.bind(this));
            var gameSettings = cc.MenuItemSprite.create(gameSettingsNormal, gameSettingsSelected, gameSettingsDisabled, this.onSettings, this);
            var about = cc.MenuItemSprite.create(aboutNormal, aboutSelected, aboutDisabled, this.onAbout, this);

            var menu = cc.Menu.create(newGame, gameSettings, about);
            menu.alignItemsVerticallyWithPadding(10);
            this.addChild(menu, 1, 2);
            menu.setPosition(winSize.width / 2, winSize.height / 2 - 80);
            this.schedule(this.update, 0.1);

            this._ship = cc.Sprite.createWithSpriteFrameName("ship01.png");
            this.addChild(this._ship, 0, 4);
            var pos = cc.p(Math.random() * winSize.width, 0);
            this._ship.setPosition(pos);
            this._ship.runAction(cc.MoveBy.create(2, cc.p(Math.random() * winSize.width, pos.y + winSize.height + 100)));

            // game version
            var versionLabel = cc.LabelTTF.create("version:1.0.2", "Marker Felt", 20);
            this.addChild(versionLabel, 1, 2);
            versionLabel.setPosition(winSize.width - 80, winSize.height - 20);

            if (MW.SOUND) {
                cc.AudioEngine.getInstance().setMusicVolume(0.7);
                cc.AudioEngine.getInstance().playMusic(res.mainMainMusic_mp3, true);
            }

            bRet = true;
        }
        cc.runtime.setOption("network_error_dialog", {
            background: {
                res: "res/dialog_bg.png"
            },
            confirmBtn:{
                normalRes:"res/dialog_confirm_normal.png",
                pressRes:"res/dialog_confirm_press.png",
                text:"",
                position:cc.p(225,25)
            },
            cancelBtn:{
                normalRes:"res/dialog_cancel_normal.png",
                pressRes:"res/dialog_cancel_press.png",
                text:"",
                position:cc.p(75,25)
            },
            messageLabel:{
                text:"网络连接错误哈~~~",
                position:cc.p(160,30),
                dimisions:cc.size(200,15),
                fontSize:20
            }
        });
        cc.runtime.setOption("no_space_error_dialog", {
            background: {
                res: "res/dialog_bg.png"
            },
            confirmBtn:{
                normalRes:"res/dialog_confirm_normal.png",
                pressRes:"res/dialog_confirm_press.png",
                text:"",
                position:cc.p(225,25)
            },
            cancelBtn:{
                normalRes:"res/dialog_cancel_normal.png",
                pressRes:"res/dialog_cancel_press.png",
                text:"",
                position:cc.p(75,25)
            },
            messageLabel:{
                text:"没有空间了额~~~",
                position:cc.p(175,30),
                dimisions:cc.size(200,15),
                fontSize:20
            }
        });
        cc.runtime.setOption("verify_error_dialog", {
            messageLabel:{
                text:"验证失败了额~~~",
                position:cc.p(175,30),
                dimisions:cc.size(200,15),
                fontSize:20
            }
        });
        cc.LoaderLayer.setConfig({
            background: {
                res: "res/loading.png"
            },
            logo: {
                res: "res/logo.png",
                action: null
            },
            title: {
                show:false
            },
            onEnter: function (layer) {
                cc.log("moonwarriors onEnter");
                var label = cc.LabelTTF.create("this is moonwarriors","Arial",22);
                label.setColor(cc.c3b(255,0,0));
                label.setPosition(cc.p(cc.Director.getInstance().getWinSize().width/2,200));
                layer.addChild(label);
            },
            onExit: function (layer) {
                cc.log("moonwarriors onExit");
            },
            tips: {
                color: cc.c3b(255, 0, 0),
                tipsProgress: function (status, loaderlayer) {
                    var statusStr = "runtime正在";
                    if (status.stage == cc.network.preloadstatus.DOWNLOAD) {
                        statusStr += "下载";
                    } else if (status.stage == cc.network.preloadstatus.UNZIP) {
                        statusStr += "解压";
                    }
                    if (status.groupName) {
                        statusStr += status.groupName;
                    }
                    statusStr += " 进度:" + status.percent.toFixed(2) + "%";
                    loaderlayer.getTipsLabel().setString(statusStr);
                }
            }
        });
        return bRet;
    },
    onNewGame: function (pSender) {
        //load resources
        Moon.preload(["gamelayer"], function (isSucces) {
            var scene = cc.Scene.create();
            scene.addChild(GameLayer.create());
            scene.addChild(GameControlMenu.create());
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
        }, this);
    },
    onSettings: function (pSender) {
        Moon.preload(["common"], function (isSucces) {
            this.onButtonEffect();
            var scene = cc.Scene.create();
            scene.addChild(SettingsLayer.create());
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
        }, this);
    },
    onAbout:function (pSender) {
        Moon.preload(["common"], function (isSucces) {
            this.onButtonEffect();
            var scene = cc.Scene.create();
            scene.addChild(AboutLayer.create());
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
        }, this);
    },
    update: function () {
        if (this._ship.getPosition().y > 480) {
            var pos = cc.p(Math.random() * winSize.width, 10);
            this._ship.setPosition(pos);
            this._ship.runAction(cc.MoveBy.create(
                parseInt(5 * Math.random(), 10),
                cc.p(Math.random() * winSize.width, pos.y + 480)));
        }
    },
    onButtonEffect: function () {
        if (MW.SOUND) {
            var s = cc.AudioEngine.getInstance().playEffect(res.buttonEffet_mp3);
        }
    }
});

SysMenu.create = function () {
    var sg = new SysMenu();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

SysMenu.scene = function () {
    var scene = cc.Scene.create();
    var layer = SysMenu.create();
    scene.addChild(layer);
    cc.registerKeyDownEvent(function (keyCode) {
        if (keyCode == cc.KEY.back) {
            var node = cc.Node.create();
            cc.Director.getInstance().getRunningScene().addChild(node);
            quitLayer("确定退出游戏？", function () {
                node.scheduleOnce(function() {
                    cc.log("Oops ....");
                }, 0);
                cc.Director.getInstance().end();
            }, function () {
                cc.log("cancel quit game");
            });
        }
    });
    return scene;
};

var Moon = Moon || {};
Moon.preload = function (resources, selector, target) {
    cc.LoaderLayer.preload(resources, selector, target);
};

var quitLayer = function (tips, confirmcallback, cancelcallback) {
    cc.Dialog.show(tips,confirmcallback,cancelcallback);
}
