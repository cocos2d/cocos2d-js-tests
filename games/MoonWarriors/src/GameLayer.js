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

            cc.SpriteFrameCache.getInstance().addSpriteFrames(res.textureOpaquePack_plist);
            cc.SpriteFrameCache.getInstance().addSpriteFrames(res.b01_plist);

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
            var texOpaque = cc.TextureCache.getInstance().addImage(res.textureOpaquePack_png);
            this._texOpaqueBatch = cc.SpriteBatchNode.create(texOpaque);
            this._texOpaqueBatch.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
            this.addChild(this._texOpaqueBatch);

            // TransparentBatch
            var texTransparent = cc.TextureCache.getInstance().addImage(res.textureTransparentPack_png);
            this._texTransparentBatch = cc.SpriteBatchNode.create(texTransparent);
            this.addChild(this._texTransparentBatch);

            winSize = cc.Director.getInstance().getWinSize();
            this._levelManager = new LevelManager(this);

            this.screenRect = cc.rect(0, 0, winSize.width, winSize.height + 10);

            // score
            this.lbScore = cc.LabelBMFont.create("Score: 0", res.arial_14_fnt);
            this.lbScore.attr({
	            anchor: cc.p(1, 0),
	            x: winSize.width - 5,
	            y: winSize.height - 30
            });
            this.lbScore.setAlignment(cc.TEXT_ALIGNMENT_RIGHT);
            this.addChild(this.lbScore, 1000);

            // ship life
            var life = cc.Sprite.create("frame#ship01.png");
            life.attr({
	            scale: 0.6,
	            x: 30,
	            y: 460
            });
            this._texTransparentBatch.addChild(life, 1, 5);

            // ship Life count
            this._lbLife = cc.LabelTTF.create("0", "Arial", 20);
            this._lbLife.x = 60;
	        this._lbLife.y = 463;
            this._lbLife.setColor(cc.color(255, 0, 0));
            this.addChild(this._lbLife, 1000);

            // ship
            this._ship = new Ship();
            this._texTransparentBatch.addChild(this._ship, this._ship.zOrder, MW.UNIT_TAG.PLAYER);

            // explosion batch node
            cc.SpriteFrameCache.getInstance().addSpriteFrames(res.explosion_plist);
            var explosionTexture = cc.TextureCache.getInstance().addImage(res.explosion_png);
            this._explosions = cc.SpriteBatchNode.create(explosionTexture);
            this._explosions.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
            this.addChild(this._explosions);
            Explosion.sharedExplosion();

            // accept touch now!

/*            if (sys.capabilities.hasOwnProperty('keyboard'))
                this.setKeyboardEnabled(true);

            if (sys.capabilities.hasOwnProperty('mouse'))
            *//*if ('mouse' in sys.capabilities)*//*
                this.setMouseEnabled(true);*/

            if (sys.capabilities.hasOwnProperty('touches')){
                cc.eventManager.addListener({
                    event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                    onTouchesMoved:function (touches, event) {
                        event.getCurrentTarget().processEvent(touches[0]);
                    }
                }, this);
            }

            // schedule
            this.scheduleUpdate();
            this.schedule(this.scoreCounter, 1);

            if (MW.SOUND) {
                cc.AudioEngine.getInstance().playMusic(res.bgMusic_mp3, true);
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
            this._levelManager.loadLevelResource(this._time);
        }
    },

    onMouseDragged:function (event) {
        this.processEvent(event);
    },

    processEvent:function (touch) {
        if (this._state == STATE_PLAYING) {
            var delta = event.getDelta();
            var curPos = cc.p(this._ship.x, this._ship.y);
            curPos = cc.pAdd(curPos, delta);
            curPos = cc.pClamp(curPos, cc.p(0, 0), cc.p(winSize.width, winSize.height));
            this._ship.x = curPos.x;
	        this._ship.y = curPos.y;
	        curPos = null;
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
            this._movingBackground(dt);
        }
    },
    checkIsCollide:function () {
        var selChild, bulletChild;
        // check collide
        var i, locShip =this._ship;
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
            if (this.collide(selChild, locShip)) {
                if (locShip.active) {
                    selChild.hurt();
                    locShip.hurt();
                }
            }
        }

        for (i = 0; i < MW.CONTAINER.ENEMY_BULLETS.length; i++) {
            selChild = MW.CONTAINER.ENEMY_BULLETS[i];
            if (selChild.active && this.collide(selChild, locShip)) {
                if (locShip.active) {
                    selChild.hurt();
                    locShip.hurt();
                }
            }
        }
    },
    removeInactiveUnit:function (dt) {
        var selChild, children = this._texOpaqueBatch.getChildren();
        for (var i in children) {
            selChild = children[i];
            if (selChild && selChild.active)
                selChild.update(dt);
        }

        children = this._texTransparentBatch.getChildren();
        for (i in children) {
            selChild = children[i];
            if (selChild && selChild.active)
                selChild.update(dt);
        }
    },
    checkIsReborn:function () {
        var locShip = this._ship;
        if (MW.LIFE > 0 && !locShip.active) {
            locShip.born();
        } else if (MW.LIFE <= 0 && !locShip.active) {
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
            this._tmpScore += 1;
        }
        this._lbLife.setString(MW.LIFE + '');
        this.lbScore.setString("Score: " + this._tmpScore);
    },
    collide:function (a, b) {
	    var ax = a.x, ay = a.y, bx = b.x, by = b.y;
        if (Math.abs(ax - bx) > MAX_CONTAINT_WIDTH || Math.abs(ay - by) > MAX_CONTAINT_HEIGHT)
            return false;

        var aRect = a.collideRect(ax, ay);
        var bRect = b.collideRect(bx, by);
        return cc.rectIntersectsRect(aRect, bRect);
    },
    initBackground:function () {
        this._backSky = BackSky.getOrCreate();
        this._backSkyHeight = this._backSky.height;

        this.moveTileMap();
        this.schedule(this.moveTileMap, 5);
    },
    moveTileMap:function () {
        var backTileMap = BackTileMap.getOrCreate();
        var ran = Math.random();
        backTileMap.x = ran * 320;
	    backTileMap.y = winSize.height;
        var move = cc.MoveBy.create(ran * 2 + 10, cc.p(0, -winSize.height-240));
        var fun =cc.CallFunc.create(function(){
            backTileMap.destroy();
        },this);
        backTileMap.runAction(cc.Sequence.create(move,fun));
    },

    _movingBackground:function(dt){
        var movingDist = 16 * dt;       // background's moving rate is 16 pixel per second

        var locSkyHeight = this._backSkyHeight, locBackSky = this._backSky;
        var currPosY = locBackSky.y - movingDist;
        var locBackSkyRe = this._backSkyRe;

        if(locSkyHeight + currPosY <= winSize.height){
             if(locBackSkyRe != null)
                throw "The memory is leaking at moving background";
            locBackSkyRe = this._backSky;
            this._backSkyRe = this._backSky;

            //create a new background
            this._backSky = BackSky.getOrCreate();
            locBackSky = this._backSky;
            locBackSky.y = currPosY + locSkyHeight - 2;
        } else
            locBackSky.y = currPosY;

        if(locBackSkyRe){
            //locBackSkyRe
            currPosY = locBackSkyRe.y - movingDist;
            if(currPosY + locSkyHeight < 0){
                locBackSkyRe.destroy();
                this._backSkyRe = null;
            } else
                locBackSkyRe.y = currPosY;
        }
    },

    onGameOver:function () {
        var scene = cc.Scene.create();
        scene.addChild(GameOver.create());
        cc.Director.getInstance().runScene(cc.TransitionFade.create(1.2, scene));
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
