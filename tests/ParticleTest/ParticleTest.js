/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var TAG_LABEL_ATLAS = 1;

var particleSceneIdx = -1;

var ParticleTestScene = TestScene.extend({
    runThisTest:function () {
        particleSceneIdx = -1;

        this.addChild(nextParticleAction());
        director.runScene(this);
    }
});

var particleSceneArr = [
    function () {
        return new DemoFlower();
    },
    function () {
        return new DemoGalaxy();
    },
    function () {
        return new DemoFirework();
    },
    function () {
        return new DemoSpiral();
    },
    function () {
        return new DemoSun();
    },
    function () {
        return new DemoMeteor();
    },
    function () {
        return new DemoFire();
    },
    function () {
        return new DemoSmoke();
    },
    function () {
        return new DemoExplosion();
    },
    function () {
        return new DemoSnow();
    },
    function () {
        return new DemoRain();
    },
    function () {
        return new DemoBigFlower();
    },
    function () {
        return new DemoRotFlower();
    },
    function () {
        return new DemoModernArt();
    },
    function () {
        return new DemoRing();
    },
    function () {
        return new DemoParticleFromFile("BoilingFoam");
    },
    function () {
        return new DemoParticleFromFile("BurstPipe");
    },
    function () {
        return new DemoParticleFromFile("Comet");
    },
    function () {
        return new DemoParticleFromFile("debian");
    },
    function () {
        return new DemoParticleFromFile("ExplodingRing");
    },
    function () {
        return new DemoParticleFromFile("LavaFlow");
    },
    function(){
        return new DemoParticleFromFile("SpinningPeas");
    },
    function () {
        return new DemoParticleFromFile("SpookyPeas");
    },
    function () {
        return new DemoParticleFromFile("Upsidedown");
    },
    function () {
        return new DemoParticleFromFile("Flower");
    },
    function () {
        return new DemoParticleFromFile("Spiral");
    },
    function () {
        return new DemoParticleFromFile("Galaxy");
    },
    function () {
        return new RadiusMode1();
    },
    function () {
        return new RadiusMode2();
    },
    function () {
        return new Issue704();
    },
    function () {
        return new Issue870();
    },
    function () {
        return new DemoParticleFromFile("Phoenix");
    },
    function() {
        return new ParticleResizeTest();
    }
];

if( 'opengl' in sys.capabilities ){
    particleSceneArr.push( function () {
        return new ParallaxParticle();
    });
    particleSceneArr.push(function () {
        return new ParticleBatchTest();
    });
}


var nextParticleAction = function () {
    particleSceneIdx++;
    particleSceneIdx = particleSceneIdx % particleSceneArr.length;
    return particleSceneArr[particleSceneIdx]();
};

var backParticleAction = function () {
    particleSceneIdx--;
    if (particleSceneIdx < 0)
        particleSceneIdx += particleSceneArr.length;

    return particleSceneArr[particleSceneIdx]();
};

var restartParticleAction = function () {
    return particleSceneArr[particleSceneIdx]();
};

var ParticleDemo = BaseTestLayer.extend({
    _emitter:null,
    _background:null,
    _shapeModeButton:null,
    _textureModeButton:null,
    _isPressed:false,

    setColor:function () {
    },

    ctor:function () {
        this._super(cc.color(0,0,0,255), cc.color(98,99,117,255));
        this._isPressed = false;

        this._emitter = null;

        //if ('touches' in sys.capabilities){
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesBegan:function (touches, event) {
/*                    var target = ;
                    target._isPressed = true;*/
                    event.getCurrentTarget()._moveToTouchPoint(touches);
                },
                onTouchesMoved:function (touches, event) {
/*                    if (!this._isPressed)
                        return;*/
                    event.getCurrentTarget()._moveToTouchPoint(touches);
                }
                /*,
                onTouchesEnded:function (touches, event) {
                    event.getCurrentTarget()._isPressed = false;
                }*/
            }, this);
        //} else if ('mouse' in sys.capabilities)
        //    this.setMouseEnabled(true);

        var s = director.getWinSize();

        var freeBtnNormal = cc.Sprite.create(s_MovementMenuItem, cc.rect(0, 23 * 2, 123, 23));
        var freeBtnSelected = cc.Sprite.create(s_MovementMenuItem, cc.rect(0, 23, 123, 23));
        var freeBtnDisabled = cc.Sprite.create(s_MovementMenuItem, cc.rect(0, 0, 123, 23));

        var relativeBtnNormal = cc.Sprite.create(s_MovementMenuItem, cc.rect(123, 23 * 2, 138, 23));
        var relativeBtnSelected = cc.Sprite.create(s_MovementMenuItem, cc.rect(123, 23, 138, 23));
        var relativeBtnDisabled = cc.Sprite.create(s_MovementMenuItem, cc.rect(123, 0, 138, 23));

        var groupBtnNormal = cc.Sprite.create(s_MovementMenuItem, cc.rect(261, 23 * 2, 136, 23));
        var groupBtnSelected = cc.Sprite.create(s_MovementMenuItem, cc.rect(261, 23, 136, 23));
        var groupBtnDisabled = cc.Sprite.create(s_MovementMenuItem, cc.rect(261, 0, 136, 23));

        var selfPoint = this;
        this._freeMovementButton = cc.MenuItemSprite.create(freeBtnNormal, freeBtnSelected, freeBtnDisabled,
            function () {
                selfPoint._emitter.setPositionType(cc.PARTICLE_TYPE_RELATIVE);
                selfPoint._relativeMovementButton.setVisible(true);
                selfPoint._freeMovementButton.setVisible(false);
                selfPoint._groupMovementButton.setVisible(false);
            });
        this._freeMovementButton.x = 10;
        this._freeMovementButton.y = 150;
        this._freeMovementButton.setAnchorPoint(0, 0);

        this._relativeMovementButton = cc.MenuItemSprite.create(relativeBtnNormal, relativeBtnSelected, relativeBtnDisabled,
            function () {
                selfPoint._emitter.setPositionType(cc.PARTICLE_TYPE_GROUPED);
                selfPoint._relativeMovementButton.setVisible(false);
                selfPoint._freeMovementButton.setVisible(false);
                selfPoint._groupMovementButton.setVisible(true);
            });
        this._relativeMovementButton.setVisible(false);
        this._relativeMovementButton.x = 10;
        this._relativeMovementButton.y = 150;
        this._relativeMovementButton.setAnchorPoint(0, 0);

        this._groupMovementButton = cc.MenuItemSprite.create(groupBtnNormal, groupBtnSelected, groupBtnDisabled,
            function () {
                selfPoint._emitter.setPositionType(cc.PARTICLE_TYPE_FREE);
                selfPoint._relativeMovementButton.setVisible(false);
                selfPoint._freeMovementButton.setVisible(true);
                selfPoint._groupMovementButton.setVisible(false);
            });
        this._groupMovementButton.setVisible(false);
        this._groupMovementButton.x = 10;
        this._groupMovementButton.y = 150;
        this._groupMovementButton.setAnchorPoint(0, 0);

        var spriteNormal = cc.Sprite.create(s_shapeModeMenuItem, cc.rect(0, 23 * 2, 115, 23));
        var spriteSelected = cc.Sprite.create(s_shapeModeMenuItem, cc.rect(0, 23, 115, 23));
        var spriteDisabled = cc.Sprite.create(s_shapeModeMenuItem, cc.rect(0, 0, 115, 23));

        this._shapeModeButton = cc.MenuItemSprite.create(spriteNormal, spriteSelected, spriteDisabled,
            function () {
                if (selfPoint._emitter.setDrawMode)
                    selfPoint._emitter.setDrawMode(cc.PARTICLE_TEXTURE_MODE);
                selfPoint._textureModeButton.setVisible(true);
                selfPoint._shapeModeButton.setVisible(false);
            });
        this._shapeModeButton.x = 10;
        this._shapeModeButton.y = 100;
        this._shapeModeButton.setAnchorPoint(0, 0);

        if ('opengl' in sys.capabilities ) {
            // Shape type is not compatible with JSB
            this._shapeModeButton.setEnabled(false);
        }

        var spriteNormal_t = cc.Sprite.create(s_textureModeMenuItem, cc.rect(0, 23 * 2, 115, 23));
        var spriteSelected_t = cc.Sprite.create(s_textureModeMenuItem, cc.rect(0, 23, 115, 23));
        var spriteDisabled_t = cc.Sprite.create(s_textureModeMenuItem, cc.rect(0, 0, 115, 23));

        this._textureModeButton = cc.MenuItemSprite.create(spriteNormal_t, spriteSelected_t, spriteDisabled_t,
            function () {
                if (selfPoint._emitter.setDrawMode)
                    selfPoint._emitter.setDrawMode(cc.PARTICLE_SHAPE_MODE);
                selfPoint._textureModeButton.setVisible(false);
                selfPoint._shapeModeButton.setVisible(true);
            });
        this._textureModeButton.setVisible(false);
        this._textureModeButton.x = 10;
        this._textureModeButton.y = 100;
        this._textureModeButton.setAnchorPoint(0, 0);

        var menu = cc.Menu.create( this._shapeModeButton, this._textureModeButton,
            this._freeMovementButton, this._relativeMovementButton, this._groupMovementButton);

        menu.x = 0;

        menu.y = 0;

        this.addChild(menu, 100);
        //TODO
        var labelAtlas = cc.LabelAtlas.create("0123456789", s_fpsImages, 16, 24, '.');
        this.addChild(labelAtlas, 100, TAG_LABEL_ATLAS);
        labelAtlas.x = s.width - 66;
        labelAtlas.y = 50;

        // moving background
        this._background = cc.Sprite.create(s_back3);
        this.addChild(this._background, 5);
        this._background.x = s.width / 2;
        this._background.y = s.height - 180;

        var move = cc.MoveBy.create(4, cc.p(300, 0));
        var move_back = move.reverse();

        var seq = cc.Sequence.create(move, move_back);
        this._background.runAction(cc.RepeatForever.create(seq));

        this.scheduleUpdate();
    },

    onEnter:function () {
        this._super();

        var pLabel = this.getChildByTag(BASE_TEST_TITLE_TAG);
        pLabel.setString(this.title());
    },
    title:function () {
        return "No title";
    },

    subtitle:function () {
        return "(Tap the Screen)";
    },

    onRestartCallback:function (sender) {
        this._emitter.resetSystem();
    },
    onNextCallback:function (sender) {
        var s = new ParticleTestScene();
        s.addChild(nextParticleAction());
        director.runScene(s);
    },
    onBackCallback:function (sender) {
        var s = new ParticleTestScene();
        s.addChild(backParticleAction());
        director.runScene(s);
    },
    toggleCallback:function (sender) {
        if (this._emitter.getPositionType() == cc.PARTICLE_TYPE_GROUPED)
            this._emitter.setPositionType(cc.PARTICLE_TYPE_FREE);
        else if (this._emitter.getPositionType() == cc.PARTICLE_TYPE_FREE)
            this._emitter.setPositionType(cc.PARTICLE_TYPE_RELATIVE);
        else if (this._emitter.getPositionType() == cc.PARTICLE_TYPE_RELATIVE)
            this._emitter.setPositionType(cc.PARTICLE_TYPE_GROUPED);
    },

    _moveToTouchPoint:function (touches) {
        if (touches.length > 0) {
            var location = touches[0].getLocation();
            var pos = cc.p(0, 0);
            if (this._background) {
                pos = this._background.convertToWorldSpace(cc.p(0, 0));
            }
            this._emitter.x = location.x - pos.x;
	        this._emitter.y = location.y - pos.y;
        }
    },

    onMouseDragged:function (event) {
        var location = event.getLocation();
        var pos = cc.p(0, 0);
        if (this._background) {
            pos = this._background.convertToWorldSpace(cc.p(0, 0));
        }
        this._emitter.x = location.x - pos.x;
	    this._emitter.y = location.y - pos.y;
        return true;
    },
    update:function (dt) {
        if (this._emitter) {
            var atlas = this.getChildByTag(TAG_LABEL_ATLAS);
            atlas.setString(this._emitter.getParticleCount().toFixed(0));
        }
    },
    setEmitterPosition:function () {
        var sourcePos = this._emitter.getSourcePosition();
        if (sourcePos.x === 0 && sourcePos.y === 0)
            this._emitter.x = 200;
            this._emitter.y = 70;
    },
    // automation
    numberOfPendingTests:function() {
        return ( (particleSceneArr.length-1) - particleSceneIdx );
    },

    getTestNumber:function() {
        return particleSceneIdx;
    }
});

var DemoFirework = ParticleDemo.extend({
    onEnter:function () {
        this._super();

        this._emitter = cc.ParticleFireworks.create();
        this._background.addChild(this._emitter, 10);
        var myTexture = cc.TextureCache.getInstance().addImage(s_stars1);
        this._emitter.setTexture(myTexture);
        if (this._emitter.setShapeType)
            this._emitter.setShapeType(cc.PARTICLE_STAR_SHAPE);
        this.setEmitterPosition();
    },
    title:function () {
        return "ParticleFireworks";
    }
});

var DemoFire = ParticleDemo.extend({
    onEnter:function () {
        this._super();

        this._emitter = cc.ParticleFire.create();
        this._background.addChild(this._emitter, 10);

        this._emitter.setTexture(cc.TextureCache.getInstance().addImage(s_fire));//.pvr"];
        if (this._emitter.setShapeType)
            this._emitter.setShapeType(cc.PARTICLE_BALL_SHAPE);

        this.setEmitterPosition();
    },
    title:function () {
        return "ParticleFire";
    }
});

var DemoSun = ParticleDemo.extend({
    onEnter:function () {
        this._super();

        this._emitter = cc.ParticleSun.create();
        this._background.addChild(this._emitter, 10);
        var myTexture = cc.TextureCache.getInstance().addImage(s_fire);
        this._emitter.setTexture(myTexture);
        if (this._emitter.setShapeType)
            this._emitter.setShapeType(cc.PARTICLE_BALL_SHAPE);

        this.setEmitterPosition();
    },
    title:function () {
        return "ParticleSun";
    }
});

var DemoGalaxy = ParticleDemo.extend({
    onEnter:function () {
        this._super();

        this._emitter = cc.ParticleGalaxy.create();
        this._background.addChild(this._emitter, 10);
        var myTexture = cc.TextureCache.getInstance().addImage(s_fire);
        this._emitter.setTexture(myTexture);
        if (this._emitter.setShapeType)
            this._emitter.setShapeType(cc.PARTICLE_BALL_SHAPE);

        this.setEmitterPosition();
    },
    title:function () {
        return "ParticleGalaxy";
    }
});

var DemoFlower = ParticleDemo.extend({
    _title:"ParticleFlower",

    onEnter:function () {
        this._super();

        this._emitter = cc.ParticleFlower.create();
        this._background.addChild(this._emitter, 10);
        var myTexture = cc.TextureCache.getInstance().addImage(s_stars1);
        this._emitter.setTexture(myTexture);

        if (this._emitter.setShapeType)
            this._emitter.setShapeType(cc.PARTICLE_STAR_SHAPE);

        this.setEmitterPosition();
    },
    title:function () {
        return this._title;
    }
});

var DemoBigFlower = ParticleDemo.extend({
    onEnter:function () {
        this._super();

        this._emitter = cc.ParticleSystem.create(50);

        this._background.addChild(this._emitter, 10);
        this._emitter.setTexture(cc.TextureCache.getInstance().addImage(s_stars1));
        if (this._emitter.setShapeType)
            this._emitter.setShapeType(cc.PARTICLE_STAR_SHAPE);

        this._emitter.setDuration(-1);

        // gravity
        this._emitter.setGravity(cc.p(0, 0));

        // angle
        this._emitter.setAngle(90);
        this._emitter.setAngleVar(360);

        // speed of particles
        this._emitter.setSpeed(160);
        this._emitter.setSpeedVar(20);

        // radial
        this._emitter.setRadialAccel(-120);
        this._emitter.setRadialAccelVar(0);

        // tagential
        this._emitter.setTangentialAccel(30);
        this._emitter.setTangentialAccelVar(0);

        // emitter position
        this._emitter.x = 160;
        this._emitter.y = 240;
        this._emitter.setPosVar(cc.p(0, 0));

        // life of particles
        this._emitter.setLife(4);
        this._emitter.setLifeVar(1);

        // spin of particles
        this._emitter.setStartSpin(0);
        this._emitter.setStartSizeVar(0);
        this._emitter.setEndSpin(0);
        this._emitter.setEndSpinVar(0);

        // color of particles
        var startColor = cc.color(128, 128, 128, 255);
        this._emitter.setStartColor(startColor);

        var startColorVar = cc.color(128, 128, 128, 255);
        this._emitter.setStartColorVar(startColorVar);

        var endColor = cc.color(25, 25, 25, 50);
        this._emitter.setEndColor(endColor);

        var endColorVar = cc.color(25, 25, 25, 50);
        this._emitter.setEndColorVar(endColorVar);

        // size, in pixels
        this._emitter.setStartSize(80.0);
        this._emitter.setStartSizeVar(40.0);
        this._emitter.setEndSize(cc.PARTICLE_START_SIZE_EQUAL_TO_END_SIZE);

        // emits per second
        this._emitter.setEmissionRate(this._emitter.getTotalParticles() / this._emitter.getLife());

        // additive
        this._emitter.setBlendAdditive(true);

        this.setEmitterPosition();
    },
    title:function () {
        return "ParticleBigFlower";
    }
});

var DemoRotFlower = ParticleDemo.extend({
    onEnter:function () {
        this._super();

        this._emitter = cc.ParticleSystem.create(("opengl" in sys.capabilities) ? 300 : 150);

        this._background.addChild(this._emitter, 10);
        this._emitter.setTexture(cc.TextureCache.getInstance().addImage(s_stars2));
        if (this._emitter.setShapeType)
            this._emitter.setShapeType(cc.PARTICLE_STAR_SHAPE);

        // duration
        this._emitter.setDuration(-1);

        // gravity
        this._emitter.setGravity(cc.p(0, 0));

        // angle
        this._emitter.setAngle(90);
        this._emitter.setAngleVar(360);

        // speed of particles
        this._emitter.setSpeed(160);
        this._emitter.setSpeedVar(20);

        // radial
        this._emitter.setRadialAccel(-120);
        this._emitter.setRadialAccelVar(0);

        // tagential
        this._emitter.setTangentialAccel(30);
        this._emitter.setTangentialAccelVar(0);

        // emitter position
        this._emitter.x = 160;
        this._emitter.y = 240;
        this._emitter.setPosVar(cc.p(0, 0));

        // life of particles
        this._emitter.setLife(3);
        this._emitter.setLifeVar(1);

        // spin of particles
        this._emitter.setStartSpin(0);
        this._emitter.setStartSpinVar(0);
        this._emitter.setEndSpin(0);
        this._emitter.setEndSpinVar(2000);

        var startColor = cc.color(128, 128, 128, 255);
        this._emitter.setStartColor(startColor);

        var startColorVar = cc.color(128, 128, 128, 255);
        this._emitter.setStartColorVar(startColorVar);

        var endColor = cc.color(25, 25, 25, 50);
        this._emitter.setEndColor(endColor);

        var endColorVar = cc.color(25, 25, 25, 50);
        this._emitter.setEndColorVar(endColorVar);

        // size, in pixels
        this._emitter.setStartSize(30.0);
        this._emitter.setStartSizeVar(0);
        this._emitter.setEndSize(cc.PARTICLE_START_SIZE_EQUAL_TO_END_SIZE);

        // emits per second
        this._emitter.setEmissionRate(this._emitter.getTotalParticles() / this._emitter.getLife());

        // additive
        this._emitter.setBlendAdditive(false);

        this.setEmitterPosition();
    },
    title:function () {
        return "ParticleRotFlower";
    }
});

var DemoMeteor = ParticleDemo.extend({
    onEnter:function () {
        this._super();

        this._emitter = cc.ParticleMeteor.create();
        this._background.addChild(this._emitter, 10);

        this._emitter.setTexture(cc.TextureCache.getInstance().addImage(s_fire));
        if (this._emitter.setShapeType)
            this._emitter.setShapeType(cc.PARTICLE_BALL_SHAPE);

        this.setEmitterPosition();
    },
    title:function () {
        return "ParticleMeteor";
    }
});

var DemoSpiral = ParticleDemo.extend({
    onEnter:function () {
        this._super();

        this._emitter = cc.ParticleSpiral.create();
        this._background.addChild(this._emitter, 10);

        this._emitter.setTexture(cc.TextureCache.getInstance().addImage(s_fire));
        if (this._emitter.setShapeType)
            this._emitter.setShapeType(cc.PARTICLE_BALL_SHAPE);

        this.setEmitterPosition();
    },
    title:function () {
        return "ParticleSpiral";
    }
});

var DemoExplosion = ParticleDemo.extend({
    onEnter:function () {
        this._super();

        this._emitter = cc.ParticleExplosion.create();
        this._background.addChild(this._emitter, 10);

        this._emitter.setTexture(cc.TextureCache.getInstance().addImage(s_stars1));
        if (this._emitter.setShapeType)
            this._emitter.setShapeType(cc.PARTICLE_STAR_SHAPE);

        this._emitter.setAutoRemoveOnFinish(true);

        this.setEmitterPosition();
    },
    title:function () {
        return "ParticleExplosion";
    }
});

var DemoSmoke = ParticleDemo.extend({
    onEnter:function () {
        this._super();

        this._emitter = cc.ParticleSmoke.create();
        this._background.addChild(this._emitter, 10);
        this._emitter.setTexture(cc.TextureCache.getInstance().addImage(s_fire));

        this.setEmitterPosition();
    },
    title:function () {
        return "ParticleSmoke";
    }
});

var DemoSnow = ParticleDemo.extend({
    onEnter:function () {
        this._super();

        this._emitter = cc.ParticleSnow.create();
        this._background.addChild(this._emitter, 10);

        this._emitter.setLife(3);
        this._emitter.setLifeVar(1);

        // gravity
        this._emitter.setGravity(cc.p(0, -10));

        // speed of particles
        this._emitter.setSpeed(130);
        this._emitter.setSpeedVar(30);


        var startColor = this._emitter.getStartColor();
        startColor.r = 0.9;
        startColor.g = 0.9;
        startColor.b = 0.9;
        this._emitter.setStartColor(startColor);

        var startColorVar = this._emitter.getStartColorVar();
        startColorVar.b = 0.1;
        this._emitter.setStartColorVar(startColorVar);

        this._emitter.setEmissionRate(this._emitter.getTotalParticles() / this._emitter.getLife());

        this._emitter.setTexture(cc.TextureCache.getInstance().addImage(s_snow));
        if (this._emitter.setShapeType)
            this._emitter.setShapeType(cc.PARTICLE_STAR_SHAPE);

        this.setEmitterPosition();
    },
    title:function () {
        return "ParticleSnow";
    }
});

var DemoRain = ParticleDemo.extend({
    onEnter:function () {
        this._super();

        this._emitter = cc.ParticleRain.create();
        this._background.addChild(this._emitter, 10);

        this._emitter.setLife(4);

        this._emitter.setTexture(cc.TextureCache.getInstance().addImage(s_fire));
        if (this._emitter.setShapeType)
            this._emitter.setShapeType(cc.PARTICLE_BALL_SHAPE);

        this.setEmitterPosition();
    },
    title:function () {
        return "ParticleRain";
    }
});

var DemoModernArt = ParticleDemo.extend({
    onEnter:function () {
        this._super();

        this._emitter = cc.ParticleSystem.create(("opengl" in sys.capabilities) ? 1000 : 200);

        this._background.addChild(this._emitter, 10);

        var winSize = director.getWinSize();

        // duration
        this._emitter.setDuration(-1);

        // gravity
        this._emitter.setGravity(cc.p(0, 0));

        // angle
        this._emitter.setAngle(0);
        this._emitter.setAngleVar(360);

        // radial
        this._emitter.setRadialAccel(70);
        this._emitter.setRadialAccelVar(10);

        // tagential
        this._emitter.setTangentialAccel(80);
        this._emitter.setTangentialAccelVar(0);

        // speed of particles
        this._emitter.setSpeed(50);
        this._emitter.setSpeedVar(10);

        // life of particles
        this._emitter.setLife(2.0);
        this._emitter.setLifeVar(0.3);

        // emits per frame
        this._emitter.setEmissionRate(this._emitter.getTotalParticles() / this._emitter.getLife());

        // color of particles
        var startColor = cc.color(128, 128, 128, 255);
        this._emitter.setStartColor(startColor);

        var startColorVar = cc.color(128, 128, 128, 255);
        this._emitter.setStartColorVar(startColorVar);

        var endColor = cc.color(25, 25, 25, 50);
        this._emitter.setEndColor(endColor);

        var endColorVar = cc.color(25, 25, 25, 50);
        this._emitter.setEndColorVar(endColorVar);

        // size, in pixels
        this._emitter.setStartSize(1.0);
        this._emitter.setStartSizeVar(1.0);
        this._emitter.setEndSize(32.0);
        this._emitter.setEndSizeVar(8.0);

        // texture
        this._emitter.setTexture(cc.TextureCache.getInstance().addImage(s_fire));
        if (this._emitter.setShapeType)
            this._emitter.setShapeType(cc.PARTICLE_BALL_SHAPE);

        // additive
        this._emitter.setBlendAdditive(false);

        this.setEmitterPosition();
    },
    title:function () {
        return "Varying size";
    }
});

var DemoRing = ParticleDemo.extend({
    onEnter:function () {
        this._super();

        this._emitter = cc.ParticleFlower.create();

        this._background.addChild(this._emitter, 10);

        this._emitter.setTexture(cc.TextureCache.getInstance().addImage(s_stars1));
        if (this._emitter.setShapeType)
            this._emitter.setShapeType(cc.PARTICLE_STAR_SHAPE);

        this._emitter.setLifeVar(0);
        this._emitter.setLife(10);
        this._emitter.setSpeed(100);
        this._emitter.setSpeedVar(0);
        this._emitter.setEmissionRate(10000);

        this.setEmitterPosition();
    },
    title:function () {
        return "Ring Demo";
    }
});

var ParallaxParticle = ParticleDemo.extend({
    onEnter:function () {
        this._super();

        this._background.getParent().removeChild(this._background, true);
        this._background = null;

        //TODO
        var p = cc.ParallaxNode.create();
        this.addChild(p, 5);

        var p1 = cc.Sprite.create(s_back3);
        var p2 = cc.Sprite.create(s_back3);

        p.addChild(p1, 1, cc.p(0.5, 1), cc.p(0, 250));
        p.addChild(p2, 2, cc.p(1.5, 1), cc.p(0, 50));

        this._emitter = cc.ParticleFlower.create();
        this._emitter.setTexture(cc.TextureCache.getInstance().addImage(s_fire));

        p1.addChild(this._emitter, 10);
        this._emitter.x = 250;
        this._emitter.y = 200;

        var par = cc.ParticleSun.create();
        p2.addChild(par, 10);
        par.setTexture(cc.TextureCache.getInstance().addImage(s_fire));

        var move = cc.MoveBy.create(4, cc.p(300, 0));
        var move_back = move.reverse();
        var seq = cc.Sequence.create(move, move_back);
        p.runAction(cc.RepeatForever.create(seq));
    },
    title:function () {
        return "Parallax + Particles";
    }
});

var DemoParticleFromFile = ParticleDemo.extend({
    _title:"",
    ctor:function (filename) {
        this._super();
        this._title = filename;
    },
    onEnter:function () {
        this._super();
        this.setColor(cc.color(0, 0, 0));
        this.removeChild(this._background, true);
        this._background = null;

        this._emitter = cc.ParticleSystem.create(s_resprefix + "Particles/" + this._title + ".plist");
        this.addChild(this._emitter, 10);

        if (this._title == "Flower") {
            if (this._emitter.setShapeType)
                this._emitter.setShapeType(cc.PARTICLE_STAR_SHAPE);
        }//else if( this._title == "Upsidedown"){
        //   this._emitter.setDrawMode(cc.PARTICLE_TEXTURE_MODE);
        //}

        this.setEmitterPosition();
    },

    setEmitterPosition:function () {
        var sourcePos = this._emitter.getSourcePosition();
        if (sourcePos.x === 0 && sourcePos.y === 0)
            this._emitter.x = director.getWinSize().width / 2;
            this._emitter.y = director.getWinSize().height / 2 - 50;
    },

    title:function () {
        return this._title;
    }
});

var RadiusMode1 = ParticleDemo.extend({
    onEnter:function () {
        this._super();

        this.setColor(cc.color(0, 0, 0));
        this.removeChild(this._background, true);
        this._background = null;

        this._emitter = cc.ParticleSystem.create(100);
        this.addChild(this._emitter, 10);
        this._emitter.setTexture(cc.TextureCache.getInstance().addImage(s_starsGrayscale));

        // duration
        this._emitter.setDuration(cc.PARTICLE_DURATION_INFINITY);

        // radius mode
        this._emitter.setEmitterMode(cc.PARTICLE_MODE_RADIUS);

        // radius mode: start and end radius in pixels
        this._emitter.setStartRadius(0);
        this._emitter.setStartRadiusVar(0);
        this._emitter.setEndRadius(160);
        this._emitter.setEndRadiusVar(0);

        // radius mode: degrees per second
        this._emitter.setRotatePerSecond(180);
        this._emitter.setRotatePerSecondVar(0);


        // angle
        this._emitter.setAngle(90);
        this._emitter.setAngleVar(0);

        // emitter position
        var size = director.getWinSize();
        this._emitter.x = size.width / 2;
        this._emitter.y = size.height / 2;
        this._emitter.setPosVar(cc.p(0, 0));

        // life of particles
        this._emitter.setLife(5);
        this._emitter.setLifeVar(0);

        // spin of particles
        this._emitter.setStartSpin(0);
        this._emitter.setStartSpinVar(0);
        this._emitter.setEndSpin(0);
        this._emitter.setEndSpinVar(0);

        // color of particles
        var startColor = cc.color(128, 128, 128, 255);
        this._emitter.setStartColor(startColor);

        var startColorVar = cc.color(128, 128, 128, 255);
        this._emitter.setStartColorVar(startColorVar);

        var endColor = cc.color(25, 25, 25, 50);
        this._emitter.setEndColor(endColor);

        var endColorVar = cc.color(25, 25, 25, 50);
        this._emitter.setEndColorVar(endColorVar);

        // size, in pixels
        this._emitter.setStartSize(32);
        this._emitter.setStartSizeVar(0);
        this._emitter.setEndSize(cc.PARTICLE_START_SIZE_EQUAL_TO_END_SIZE);

        // emits per second
        this._emitter.setEmissionRate(this._emitter.getTotalParticles() / this._emitter.getLife());

        // additive
        this._emitter.setBlendAdditive(false);
    },
    title:function () {
        return "Radius Mode: Spiral";
    }
});

var RadiusMode2 = ParticleDemo.extend({
    onEnter:function () {
        this._super();

        this.setColor(cc.color(0, 0, 0));
        this.removeChild(this._background, true);
        this._background = null;

        this._emitter = cc.ParticleSystem.create(100);
        this.addChild(this._emitter, 10);
        this._emitter.setTexture(cc.TextureCache.getInstance().addImage(s_starsGrayscale));

        // duration
        this._emitter.setDuration(cc.PARTICLE_DURATION_INFINITY);

        // radius mode
        this._emitter.setEmitterMode(cc.PARTICLE_MODE_RADIUS);

        // radius mode: start and end radius in pixels
        this._emitter.setStartRadius(100);
        this._emitter.setStartRadiusVar(0);
        this._emitter.setEndRadius(cc.PARTICLE_START_RADIUS_EQUAL_TO_END_RADIUS);
        this._emitter.setEndRadiusVar(0);

        // radius mode: degrees per second
        this._emitter.setRotatePerSecond(45);
        this._emitter.setRotatePerSecondVar(0);


        // angle
        this._emitter.setAngle(90);
        this._emitter.setAngleVar(0);

        // emitter position
        var size = director.getWinSize();
        this._emitter.x = size.width / 2;
        this._emitter.y = size.height / 2;
        this._emitter.setPosVar(cc.p(0, 0));

        // life of particles
        this._emitter.setLife(4);
        this._emitter.setLifeVar(0);

        // spin of particles
        this._emitter.setStartSpin(0);
        this._emitter.setStartSpinVar(0);
        this._emitter.setEndSpin(0);
        this._emitter.setEndSpinVar(0);

        // color of particles
        var startColor = cc.color(128, 128, 128, 255);
        this._emitter.setStartColor(startColor);

        var startColorVar = cc.color(128, 128, 128, 255);
        this._emitter.setStartColorVar(startColorVar);

        var endColor = cc.color(25, 25, 25, 50);
        this._emitter.setEndColor(endColor);

        var endColorVar = cc.color(25, 25, 25, 50);
        this._emitter.setEndColorVar(endColorVar);

        // size, in pixels
        this._emitter.setStartSize(32);
        this._emitter.setStartSizeVar(0);
        this._emitter.setEndSize(cc.PARTICLE_START_SIZE_EQUAL_TO_END_SIZE);

        // emits per second
        this._emitter.setEmissionRate(this._emitter.getTotalParticles() / this._emitter.getLife());

        // additive
        this._emitter.setBlendAdditive(false);
    },
    title:function () {
        return "Radius Mode: Semi Circle";
    }
});

var Issue704 = ParticleDemo.extend({
    onEnter:function () {
        this._super();

        this.setColor(cc.color(0, 0, 0));
        this.removeChild(this._background, true);
        this._background = null;

        this._emitter = cc.ParticleSystem.create(100);
        this.addChild(this._emitter, 10);
        this._emitter.setTexture(cc.TextureCache.getInstance().addImage(s_fire));
        if (this._emitter.setShapeType)
            this._emitter.setShapeType(cc.PARTICLE_BALL_SHAPE);

        // duration
        this._emitter.setDuration(cc.PARTICLE_DURATION_INFINITY);

        // radius mode
        this._emitter.setEmitterMode(cc.PARTICLE_MODE_RADIUS);

        // radius mode: start and end radius in pixels
        this._emitter.setStartRadius(50);
        this._emitter.setStartRadiusVar(0);
        this._emitter.setEndRadius(cc.PARTICLE_START_RADIUS_EQUAL_TO_END_RADIUS);
        this._emitter.setEndRadiusVar(0);

        // radius mode: degrees per second
        this._emitter.setRotatePerSecond(0);
        this._emitter.setRotatePerSecondVar(0);

        // angle
        this._emitter.setAngle(90);
        this._emitter.setAngleVar(0);

        // emitter position
        var size = director.getWinSize();
        this._emitter.x = size.width / 2;
        this._emitter.y = size.height / 2;
        this._emitter.setPosVar(cc.p(0, 0));

        // life of particles
        this._emitter.setLife(5);
        this._emitter.setLifeVar(0);

        // spin of particles
        this._emitter.setStartSpin(0);
        this._emitter.setStartSpinVar(0);
        this._emitter.setEndSpin(0);
        this._emitter.setEndSpinVar(0);

        // color of particles
        var startColor = cc.color(128, 128, 128, 255);
        this._emitter.setStartColor(startColor);

        var startColorVar = cc.color(128, 128, 128, 255);
        this._emitter.setStartColorVar(startColorVar);

        var endColor = cc.color(25, 25, 25, 50);
        this._emitter.setEndColor(endColor);

        var endColorVar = cc.color(25, 25, 25, 50);
        this._emitter.setEndColorVar(endColorVar);

        // size, in pixels
        this._emitter.setStartSize(16);
        this._emitter.setStartSizeVar(0);
        this._emitter.setEndSize(cc.PARTICLE_START_SIZE_EQUAL_TO_END_SIZE);

        // emits per second
        this._emitter.setEmissionRate(this._emitter.getTotalParticles() / this._emitter.getLife());

        // additive
        this._emitter.setBlendAdditive(false);

        var rot = cc.RotateBy.create(16, 360);
        this._emitter.runAction(cc.RepeatForever.create(rot));
    },
    title:function () {
        return "Issue 704. Free + Rot";
    },
    subtitle:function () {
        return "Emitted particles should not rotate";
    }
});

var Issue870 = ParticleDemo.extend({
    _index:0,
    onEnter:function () {
        this._super();

        this.setColor(cc.color(0, 0, 0));
        this.removeChild(this._background, true);
        this._background = null;

        var system = cc.ParticleSystem.create(s_resprefix + "Particles/SpinningPeas.plist");
        system.setTextureWithRect(cc.TextureCache.getInstance().addImage(s_particles), cc.rect(0, 0, 32, 32));
        this.addChild(system, 10);
        this._emitter = system;
        if (this._emitter.setDrawMode)
            this._emitter.setDrawMode(cc.PARTICLE_TEXTURE_MODE);
        this._emitter.x = director.getWinSize().width / 2;
        this._emitter.y = director.getWinSize().height / 2 - 50;
        this._index = 0;
        this.schedule(this.updateQuads, 2.0);
    },
    title:function () {
        return "Issue 870. SubRect";
    },
    subtitle:function () {
        return "Every 2 seconds the particle should change";
    },
    updateQuads:function (dt) {
        this._index = (this._index + 1) % 4;
        var rect = cc.rect(this._index * 32, 0, 32, 32);
        this._emitter.setTextureWithRect(this._emitter.getTexture(), rect);
    }
});

var ParticleBatchTest = ParticleDemo.extend({
    _index:0,
    onEnter:function () {
        this._super();

        var emitter1 = cc.ParticleSystem.create(s_resprefix + 'Particles/LavaFlow.plist');
        emitter1.setStartColor(cc.color(255, 0, 0, 255));
        var emitter2 = cc.ParticleSystem.create(s_resprefix + 'Particles/LavaFlow.plist');
        emitter2.setStartColor(cc.color(0, 255, 0, 255));
        var emitter3 = cc.ParticleSystem.create(s_resprefix + 'Particles/LavaFlow.plist');
        emitter3.setStartColor(cc.color(0, 0, 255, 255));

        emitter1.x = winSize.width / 1.25;

        emitter1.y = winSize.height / 1.25;
        emitter2.x = winSize.width / 2;
        emitter2.y = winSize.height / 2;
        emitter3.x = winSize.width / 4;
        emitter3.y = winSize.height / 4;

        var batch = cc.ParticleBatchNode.create(emitter1.getTexture());

        batch.addChild(emitter1);
        batch.addChild(emitter2);
        batch.addChild(emitter3);

        this.addChild(batch, 10);

        // to be able to use "reset" button
        this.removeChild(this._background, true);
        this._background = null;
        this._emitter = emitter1;
    },
    title:function () {
        return "Particle Batch Test";
    },
    subtitle:function () {
        return "You should 3 particles. They are batched";
    }
});

var ParticleResizeTest = ParticleDemo.extend({
    _index:0,
    onEnter:function () {
        this._super();

        var emitter1 = cc.ParticleSystem.create( s_resprefix + 'Particles/LavaFlow.plist');
        emitter1.x = winSize.width/2;
        emitter1.y = winSize.height/2;
        this.addChild(emitter1);

        this.schedule( this.onResizeParticle50, 2 );

        // to be able to use "reset" button
        this.removeChild(this._background, true);
        this._background = null;
        this._emitter = emitter1;
    },
    onResizeParticle50:function(dt) {
        this._emitter.setTotalParticles(50);
        this.scheduleOnce( this.onResizeParticle400, 1);
    },
    onResizeParticle400:function(dt) {
        this._emitter.setTotalParticles(400);
    },

    title:function () {
        return "Particle Resize Test";
    },
    subtitle:function () {
        return "In 2 seconds, the emitter should have only 15 particles. Shall not crash.";
    }
});