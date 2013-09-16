//
// MoonWarriors
//
// Handles the Game Logic
//

STATE_PLAYING = 0;
STATE_GAMEOVER = 1;
MAX_CONTAINT_WIDTH = 40;
MAX_CONTAINT_HEIGHT = 40;

var g_sharedGameLayer;


var GameLayer = cc.Layer.extend({
    _time:null,
    _ship:null,
    _backSky:null,
    _backSkyHeight:0,
    _backSkyRe:null,
    _levelManager:null,
    _tmpScore:0,
    _isBackSkyReload:false,
    _isBackTileReload:false,
    lbScore:null,
    screenRect:null,
    explosionAnimation:[],
    _beginPos:cc.p(0, 0),
    _state:STATE_PLAYING,
    _explosions:null,
    _texOpaqueBatch:null,
    _texTransparentBatch:null,

    init:function () {
        var bRet = false;
        if (this._super()) {

            cc.SpriteFrameCache.getInstance().addSpriteFrames(s_textureOpaquePack_plist);
            cc.SpriteFrameCache.getInstance().addSpriteFrames(s_b01_plist);

            // reset global values
            MW.CONTAINER.ENEMIES = [];
            MW.CONTAINER.ENEMY_BULLETS = [];
            MW.CONTAINER.PLAYER_BULLETS = [];
            MW.CONTAINER.EXPLOSIONS = [];
            MW.CONTAINER.SPARKS = [];
            MW.CONTAINER.HITS = [];
            MW.CONTAINER.BACKSKYS = [];
            MW.CONTAINER.BACKTILEMAPS = [];
            MW.ACTIVE_ENEMIES = 0;

            MW.SCORE = 0;
            MW.LIFE = 4;
            this._state = STATE_PLAYING;

            // OpaqueBatch
            var texOpaque = cc.TextureCache.getInstance().addImage(s_textureOpaquePack);
            this._texOpaqueBatch = cc.SpriteBatchNode.createWithTexture(texOpaque);
            this._texOpaqueBatch.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
            this.addChild(this._texOpaqueBatch);

            // TransparentBatch
            var texTransparent = cc.TextureCache.getInstance().addImage(s_textureTransparentPack);
            this._texTransparentBatch = cc.SpriteBatchNode.createWithTexture(texTransparent);
            this.addChild(this._texTransparentBatch);

            winSize = cc.Director.getInstance().getWinSize();
            this._levelManager = new LevelManager(this);

            this.screenRect = cc.rect(0, 0, winSize.width, winSize.height + 10);

            // score
            this.lbScore = cc.LabelBMFont.create("Score: 0", s_arial14_fnt);
            this.lbScore.setAnchorPoint(cc.p(1, 0));
            this.lbScore.setAlignment(cc.TEXT_ALIGNMENT_RIGHT);
            this.addChild(this.lbScore, 1000);
            this.lbScore.setPosition(winSize.width - 5, winSize.height - 30);

            // ship life
            var life = cc.Sprite.createWithSpriteFrameName("ship01.png");
            life.setScale(0.6);
            life.setPosition(30, 460);
            this._texTransparentBatch.addChild(life, 1, 5);

            // ship Life count
            this._lbLife = cc.LabelTTF.create("0", "Arial", 20);
            this._lbLife.setPosition(60, 463);
            this._lbLife.setColor(cc.c3b(255, 0, 0));
            this.addChild(this._lbLife, 1000);

            // ship
            this._ship = new Ship();
            this._texTransparentBatch.addChild(this._ship, this._ship.zOrder, MW.UNIT_TAG.PLAYER);

            // explosion batch node
            cc.SpriteFrameCache.getInstance().addSpriteFrames(s_explosion_plist);
            var explosionTexture = cc.TextureCache.getInstance().addImage(s_explosion);
            this._explosions = cc.SpriteBatchNode.createWithTexture(explosionTexture);
            this._explosions.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
            this.addChild(this._explosions);
            Explosion.sharedExplosion();

            // accept touch now!

            if (sys.capabilities.hasOwnProperty('keyboard'))
                this.setKeyboardEnabled(true);

            if (sys.capabilities.hasOwnProperty('mouse'))
            /*if ('mouse' in sys.capabilities)*/
                this.setMouseEnabled(true);

            if (sys.capabilities.hasOwnProperty('touches'))
            /*if ('touches' in sys.capabilities)*/
                this.setTouchEnabled(true);

            // schedule
            this.scheduleUpdate();
            this.schedule(this.scoreCounter, 1);

            if (MW.SOUND) {
                cc.AudioEngine.getInstance().playMusic(s_bgMusic_mp3, true);
            }

            bRet = true;

            g_sharedGameLayer = this;

            //pre set
            Bullet.preSet();
            Enemy.preSet();
            HitEffect.preSet();
            SparkEffect.preSet();
            Explosion.preSet();
            BackSky.preSet();
            BackTileMap.preSet();

            this.initBackground();
        }
        return bRet;
    },

    scoreCounter:function () {
        if (this._state == STATE_PLAYING) {
            this._time++;

            var minute = 0 | (this._time / 60);
            var second = this._time % 60;
            minute = minute > 9 ? minute : "0" + minute;
            second = second > 9 ? second : "0" + second;
            var curTime = minute + ":" + second;
            this._levelManager.loadLevelResource(this._time);
        }
    },

    onTouchesMoved:function (touches, event) {
        this.processEvent(touches[0]);
    },

    onMouseDragged:function (event) {
        this.processEvent(event);
    },

    processEvent:function (event) {
        if (this._state == STATE_PLAYING) {
            var delta = event.getDelta();
            var curPos = this._ship.getPosition();
            curPos = cc.pAdd(curPos, delta);
            curPos = cc.pClamp(curPos, cc.POINT_ZERO, cc.p(winSize.width, winSize.height));
            this._ship.setPosition(curPos);
        }
    },

    onKeyDown:function (e) {
        MW.KEYS[e] = true;
    },

    onKeyUp:function (e) {
        MW.KEYS[e] = false;
    },

    update:function (dt) {
        if (this._state == STATE_PLAYING) {
            this.checkIsCollide();
            this.removeInactiveUnit(dt);
            this.checkIsReborn();
            this.updateUI();
        }
    },
    checkIsCollide:function () {
        var selChild, bulletChild;
        // check collide
        var i = 0;
        for (i = 0; i < MW.CONTAINER.ENEMIES.length; i++) {
            selChild = MW.CONTAINER.ENEMIES[i];
            if (!selChild.active)
                continue;

            for (var j = 0; j < MW.CONTAINER.PLAYER_BULLETS.length; j++) {
                bulletChild = MW.CONTAINER.PLAYER_BULLETS[j];
                if (bulletChild.active && this.collide(selChild, bulletChild)) {
                    bulletChild.hurt();
                    selChild.hurt();
                }
            }
            if (this.collide(selChild, this._ship)) {
                if (this._ship.active) {
                    selChild.hurt();
                    this._ship.hurt();
                }
            }
        }

        for (i = 0; i < MW.CONTAINER.ENEMY_BULLETS.length; i++) {
            selChild = MW.CONTAINER.ENEMY_BULLETS[i];
            if (selChild.active && this.collide(selChild, this._ship)) {
                if (this._ship.active) {
                    selChild.hurt();
                    this._ship.hurt();
                }
            }
        }
    },
    removeInactiveUnit:function (dt) {
        var selChild, children = this._texOpaqueBatch.getChildren();
        for (var i in children) {
            selChild = children[i];
            if (selChild && selChild.active) {
                selChild.update(dt);
            }
        }

        var selChild, children = this._texTransparentBatch.getChildren();
        for (var i in children) {
            selChild = children[i];
            if (selChild && selChild.active) {
                selChild.update(dt);
            }
        }


    },
    checkIsReborn:function () {
        if (MW.LIFE > 0 && !this._ship.active) {
            this._ship.born();
        }
        else if (MW.LIFE <= 0 && !this._ship.active) {
            this._state = STATE_GAMEOVER;
            // XXX: needed for JS bindings.
            this._ship = null;
            this.runAction(cc.Sequence.create(
                cc.DelayTime.create(0.2),
                cc.CallFunc.create(this.onGameOver, this)));
        }
    },
    updateUI:function () {
        if (this._tmpScore < MW.SCORE) {
            this._tmpScore += 5;
        }
        this._lbLife.setString(MW.LIFE + '');
        this.lbScore.setString("Score: " + this._tmpScore);
    },
    collide:function (a, b) {
        var pos1 = a.getPosition();
        var pos2 = b.getPosition();
        if (Math.abs(pos1.x - pos2.x) > MAX_CONTAINT_WIDTH || Math.abs(pos1.y - pos2.y) > MAX_CONTAINT_HEIGHT)
            return false;

        var aRect = a.collideRect(pos1);
        var bRect = b.collideRect(pos2);
        return cc.rectIntersectsRect(aRect, bRect);
    },
    initBackground:function () {
        this._backSky = BackSky.getOrCreate();
        this._backSkyHeight = this._backSky.getContentSize().height;

        this.movingBackground();
        this.schedule(this.movingBackground, 3);

        this.moveTileMap();
        this.schedule(this.moveTileMap, 5);
    },
    moveTileMap:function () {
        var backTileMap = BackTileMap.getOrCreate();
        var ran = Math.random();
        backTileMap.setPosition(ran * 320, winSize.height);
        var move = cc.MoveBy.create(ran * 2 + 10, cc.p(0, -winSize.height-240));
        var fun =cc.CallFunc.create(function(){
            backTileMap.destroy();
        },this);
        backTileMap.runAction(cc.Sequence.create(move,fun));
    },
    movingBackground:function () {
        this._backSky.runAction(cc.MoveBy.create(3, cc.p(0, -48)));
        this._backSkyHeight -= 48;

        if (this._backSkyHeight <= winSize.height) {
            if (!this._isBackSkyReload) {
                this._backSkyRe = BackSky.getOrCreate();
                this._backSkyRe.setPosition(0, winSize.height);
                this._isBackSkyReload = true;
            }
            this._backSkyRe.runAction(cc.MoveBy.create(3, cc.p(0, -48)));
        }
        if (this._backSkyHeight <= 0) {
            this._backSkyHeight = this._backSky.getContentSize().height;
            this._backSky.destroy();
            this._backSky = this._backSkyRe;
            this._backSkyRe = null;
            this._isBackSkyReload = false;
        }
    },
    onGameOver:function () {
        var scene = cc.Scene.create();
        scene.addChild(GameOver.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    }
});

GameLayer.create = function () {
    var sg = new GameLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

GameLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = GameLayer.create();
    scene.addChild(layer, 1);
    return scene;
};

GameLayer.prototype.addEnemy = function (enemy, z, tag) {
    this._texTransparentBatch.addChild(enemy, z, tag);
};

GameLayer.prototype.addExplosions = function (explosion) {
    this._explosions.addChild(explosion);
};

GameLayer.prototype.addBulletHits = function (hit, zOrder) {
    this._texOpaqueBatch.addChild(hit, zOrder);
};

GameLayer.prototype.addSpark = function (spark) {
    this._texOpaqueBatch.addChild(spark);
};

GameLayer.prototype.addBullet = function (bullet, zOrder, mode) {
    this._texOpaqueBatch.addChild(bullet, zOrder, mode);
};
