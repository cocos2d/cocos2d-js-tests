/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org

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

var armatureSceneIdx = -1;

var ArmatureTestScene = TestScene.extend({
    onEnter:function(){
        this._super();
    },
    runThisTest:function () {
        armatureSceneIdx = -1;
        this.addChild(nextArmatureTest());
        director.replaceScene(this);
    },
    onExit:function () {
        this._super();
        cc.ArmatureDataManager.purge();
    }
});

var armatureSceneArr = [
    function () {
        return new TestCSWithSkeleton();
    },
//    function () {
//        return new TestCSWithChariard();
//    },
    function () {
        return new TestCSWithoutSkeleton();
    },
    function () {
        return new TestDragonBones20();
    },
    function () {
        return new TestPerformance();
    },
    function () {
        return new TestChangeZorder();
    },
    function () {
        return new TestAnimationEvent();
    },
    function () {
        return new TestUseMutiplePicture();
    },
    function () {
        return new TestBoundingBox();
    },
    function () {
        return new TestAnchorPoint();
    },
    function () {
        return new TestArmatureNesting();
    },
    function () {
        return new TestParticleDisplay();
    }
];

var nextArmatureTest = function () {
    armatureSceneIdx++;
    armatureSceneIdx = armatureSceneIdx % armatureSceneArr.length;
    return armatureSceneArr[armatureSceneIdx]();
};

var backArmatureTest = function () {
    armatureSceneIdx--;
    if (armatureSceneIdx < 0)
        armatureSceneIdx += armatureSceneArr.length;

    return armatureSceneArr[armatureSceneIdx]();
};

var restartArmatureTest = function () {
    return armatureSceneArr[armatureSceneIdx]();
};
var ArmatureTestLayer = BaseTestLayer.extend({
    ctor:function () {
        if (arguments.length === 0) {
            this._super(cc.c4b(0, 0, 0, 255), cc.c4b(98, 99, 117, 255));
        } else {
            this._super.apply(this, arguments);
        }
    },

    onRestartCallback:function (sender) {
        var s = new ArmatureTestScene();
        s.addChild(restartArmatureTest());
        director.replaceScene(s);
    },

    onNextCallback:function (sender) {
        var s = new ArmatureTestScene();
        s.addChild(nextArmatureTest());
        director.replaceScene(s);
    },

    onBackCallback:function (sender) {
        var s = new ArmatureTestScene();
        s.addChild(backArmatureTest());
        director.replaceScene(s);
    },

    // automation
    numberOfPendingTests:function () {
        return ( (arrayOfSpriteTest.length - 1) - spriteTestIdx );
    },

    getTestNumber:function () {
        return spriteTestIdx;
    }
});

//------------------------------------------------------------------
//
// TestCSWithSkeleton
//
//------------------------------------------------------------------
var TestCSWithSkeleton = ArmatureTestLayer.extend({
    onEnter:function () {
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/armature/Cowboy.ExportJson");
        this._super();
        var armature = cc.Armature.create("Cowboy");
        armature.getAnimation().playByIndex(0);
        armature.setScale(0.2);
        armature.setAnchorPoint(cc.p(0.5, 0.5));
        armature.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        this.addChild(armature);
    },
    title:function () {
        return "Test Export From CocoStudio With Skeleton Effect";
    }
});

//------------------------------------------------------------------
//
// TestCSWithChariard
//
//------------------------------------------------------------------
var TestCSWithChariard = ArmatureTestLayer.extend({
    onEnter:function () {
//                                                  cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/armature/chariard.ExportJson");
        cc.ArmatureDataManager.getInstance().addArmatureFileInfoAsync("res/armature/chariard.ExportJson",this, this.testCallBack);
        this._super();
    },
    title:function () {
        return "Test Export From CocoStudio With Chariard";
    },
    testCallBack:function(time){
        var armature = cc.Armature.create("chariard");
        armature.getAnimation().playByIndex(0);
        armature.setScale(1.5);
        armature.setAnchorPoint(cc.p(0.5, 0.5));
        armature.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        this.addChild(armature);
    }
});

//------------------------------------------------------------------
//
// TestCSWithoutSkeleton
//
//------------------------------------------------------------------
var TestCSWithoutSkeleton = ArmatureTestLayer.extend({
    onEnter:function () {
//        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/armature/TestBone0.png", "res/armature/TestBone0.plist", "res/armature/TestBone.json");
        cc.ArmatureDataManager.getInstance().addArmatureFileInfoAsync("res/armature/TestBone0.png", "res/armature/TestBone0.plist", "res/armature/TestBone.json", this, this.testCallBack);
//        
        this._super();
//        var armature = cc.Armature.create("TestBone");
//        armature.getAnimation().playByIndex(0);
//        armature.setAnchorPoint(cc.p(0.5, 0.5));
//        armature.setScale(0.2);
//        armature.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
//        this.addChild(armature);
    },
    title:function () {
        return "Test Export From CocoStudio Without Skeleton Effect";
    },
    testCallBack:function(time){
        var armature = cc.Armature.create("TestBone");
        armature.getAnimation().playByIndex(0);
        armature.setScale(0.2);
        armature.setAnchorPoint(cc.p(0.5, 0.5));
        armature.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        this.addChild(armature);
    }
});

//------------------------------------------------------------------
//
// TestDragonBones20
//
//------------------------------------------------------------------
var TestDragonBones20 = ArmatureTestLayer.extend({
    onEnter:function () {
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/armature/Dragon.png", "res/armature/Dragon.plist", "res/armature/Dragon.xml");
        this._super();
        var armature = cc.Armature.create("Dragon");
        armature.getAnimation().playByIndex(0);
        armature.getAnimation().setAnimationScale(0.4);
        armature.setScale(0.6);
        armature.setAnchorPoint(cc.p(0.5, 0.5));
        armature.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        this.addChild(armature);
    },

    title:function () {
        return "Test Export From DragonBones version 2.0";
    }
});


//------------------------------------------------------------------
//
// TestPerformance
//
//------------------------------------------------------------------
var TestPerformance = ArmatureTestLayer.extend({
    armatureCount:0,
    times:0,
    onEnter:function () {
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/armature/knight.png", "res/armature/knight.plist", "res/armature/knight.xml");
        this._super();
        this.armatureCount = 0;
        this.times = 0;
        this.scheduleUpdate();
    },
    title:function () {
        return "Test Performance";
    },
    subtitle:function () {
        return "Current CCArmature Count :";
    },
    update:function (delta) {
        this.times += delta;
        if (this.times > 0.25) {
            this.times = 0;
            var armature = new cc.Armature();
            armature.init("Knight_f/Knight");
            armature.getAnimation().playByIndex(0);
            armature.setPosition(cc.p(50 + this.armatureCount * 5, winSize.height / 2));
            armature.setScale(0.6);
            this.armatureCount++;
            this.addChild(armature, this.armatureCount);
            var subTile = this.getChildByTag(BASE_TEST_SUBTITLE_TAG);
            subTile.setString(this.subtitle() + this.armatureCount);
        }
    }
});

//------------------------------------------------------------------
//
// TestChangeZorder
//
//------------------------------------------------------------------
var TestChangeZorder = ArmatureTestLayer.extend({
    currentTag:0,
    onEnter:function () {
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/armature/Cowboy0.png", "res/armature/Cowboy0.plist", "res/armature/Cowboy.json");
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/armature/Dragon.png", "res/armature/Dragon.plist", "res/armature/Dragon.xml");
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/armature/TestBone0.png", "res/armature/TestBone0.plist", "res/armature/TestBone.json");
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/armature/knight.png", "res/armature/knight.plist", "res/armature/knight.xml");
        this._super();
        var armature = null;
        armature = cc.Armature.create("Knight_f/Knight");
        armature.getAnimation().playByIndex(0);
        armature.setPosition(cc.p(winSize.width / 2, winSize.height / 2 - 100));
        armature.setScale(0.6);
        this.addChild(armature, 0, 0);

        armature = cc.Armature.create("TestBone");
        armature.getAnimation().playByIndex(0);
        armature.setScale(0.24);
        armature.setPosition(cc.p(winSize.width / 2, winSize.height / 2 - 100));
        this.addChild(armature, 1, 1);

        armature = cc.Armature.create("Dragon");
        armature.getAnimation().playByIndex(0);
        armature.setPosition(cc.p(winSize.width / 2, winSize.height / 2 - 100));
        armature.setScale(0.6);
        this.addChild(armature, 2, 2);

        this.schedule(this.changeZorder, 1);
    },
    title:function () {
        return "Test Change ZOrder Of Different CCArmature";
    },
    changeZorder:function (dt) {
        var node = this.getChildByTag(this.currentTag);
        node.setZOrder(cc.RANDOM_0_1() * 3);
        this.currentTag++;
        this.currentTag = this.currentTag % 3;
    }

});

//------------------------------------------------------------------
//
// TestAnimationEvent
//
//------------------------------------------------------------------
var TestAnimationEvent = ArmatureTestLayer.extend({
    _armature:null,
    onEnter:function () {
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/armature/Cowboy.ExportJson");
        this._super();
                                                  
        this._armature = cc.Armature.create("Cowboy");
        this._armature.getAnimation().play("Fire");
        this._armature.setScaleX(-0.24);
        this._armature.setScaleY(0.24);
        this._armature.setPosition(cc.p(winSize.width / 2 - 150, winSize.height / 2));
        this._armature.getAnimation().setMovementEventCallFunc(this.animationEvent, this);
        this.addChild(this._armature);
                                                  
    },
    title:function () {
        return "Test Armature Animation Event";
    },
    animationEvent:function (armature, movementType, movementID) {
        if(movementType == 2){
            if (movementID == "Fire") {
                var actionToRight = cc.MoveTo.create(2, cc.p(VisibleRect.right().x - 50, VisibleRect.right().y));
                this._armature.stopAllActions();
                this._armature.runAction(cc.Sequence.create(actionToRight, cc.CallFunc.create(this.callback1, this)));
                this._armature.getAnimation().play("Walk");
                                                  
            }else if(movementID == "FireMax"){
                var actionToLeft = cc.MoveTo.create(2, cc.p(VisibleRect.left().x + 50, VisibleRect.left().y));
                this._armature.stopAllActions();
                this._armature.runAction(cc.Sequence.create(actionToLeft,  cc.CallFunc.create(this.callback2, this)));
                this._armature.getAnimation().play("Walk");
            }
        }
    },
    callback1:function () {
        this._armature.runAction(cc.ScaleTo.create(0.3, 0.24, 0.24));
        this._armature.getAnimation().play("FireMax", 10);
    },
    callback2:function () {
        this._armature.runAction(cc.ScaleTo.create(0.3, -0.24, 0.24));
        this._armature.getAnimation().play("Fire", 10);
    }
});

//------------------------------------------------------------------
//
// TestParticleDisplay
//
//------------------------------------------------------------------
var TestParticleDisplay = ArmatureTestLayer.extend({
    animationID:0,
    armature:null,
    onEnter:function () {
        this._super();
        this.setTouchEnabled(true);

        this.animationID = 0;

        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/armature/robot.png", "res/armature/robot.plist", "res/armature/robot.xml");
        this._super();
        this.armature = cc.Armature.create("robot");
        this.armature.getAnimation().playByIndex(0);
        this.armature.setPosition(VisibleRect.center());
        this.armature.setScale(0.48);
        this.addChild(this.armature);
                                                   
        var p1 = cc.ParticleSystem.create("res/Particles/SmallSun.plist");
        var p2 = cc.ParticleSystem.create("res/Particles/SmallSun.plist");
                                                   
        var bone = cc.Bone.create("p1");
        bone.addDisplay(p1, 0);
        bone.changeDisplayByIndex(0, true);
        bone.setIgnoreMovementBoneData(true);
        bone.setZOrder(100);
        bone.setScale(1.2);
        this.armature.addBone(bone, "bady-a3");

        bone = cc.Bone.create("p2");
        bone.addDisplay(p2, 0);
        bone.changeDisplayByIndex(0, true);
        bone.setIgnoreMovementBoneData(true);
        bone.setZOrder(100);
        bone.setScale(1.2);
        this.armature.addBone(bone, "bady-a30");
    },
    title:function () {
        return "Test Particle Display";
    },
    subtitle:function () {
        return "Touch to change animation";
    },
    onTouchesEnded:function (touch, event) {
        ++this.animationID;
        this.animationID = this.animationID % this.armature.getAnimation().getMovementCount();
        this.armature.getAnimation().playByIndex(this.animationID);
        return false;
    }

});
//
//------------------------------------------------------------------
//
// TestUseMutiplePicture
//
//------------------------------------------------------------------
var TestUseMutiplePicture = ArmatureTestLayer.extend({
    displayIndex:0,
    armature:null,
    onEnter:function () {
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/armature/weapon.png", "res/armature/weapon.plist", "res/armature/weapon.xml");
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/armature/knight.png", "res/armature/knight.plist", "res/armature/knight.xml");
        this._super();
        this.setTouchEnabled(true);

        this.displayIndex = 0;

        this.armature = cc.Armature.create("Knight_f/Knight");
        this.armature.getAnimation().playByIndex(0);
        this.armature.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        this.armature.setScale(1.2);
        this.addChild(this.armature);

        var weapon = ["weapon_f-sword.png", "weapon_f-sword2.png", "weapon_f-sword3.png", "weapon_f-sword4.png", "weapon_f-sword5.png", "weapon_f-knife.png", "weapon_f-hammer.png"];

        for (var i = 0; i < 7; i++) {
            var skin = cc.Skin.createWithSpriteFrameName(weapon[i]);
            this.armature.getBone("weapon").addDisplay(skin, i);
        }
    },
    title:function () {
        return "Test One CCArmature Use Different Picture";
    },
    subtitle:function () {
        return "Tap Screen";
    },
    onTouchesEnded:function (touch, event) {
        ++this.displayIndex;
        this.displayIndex = (this.displayIndex) % 6;
        this.armature.getBone("weapon").changeDisplayByIndex(this.displayIndex, true);
        return false;
    }
});

//------------------------------------------------------------------
//
// TestBox2DDetector
//
//------------------------------------------------------------------
var TestBox2DDetector = ArmatureTestLayer.extend({
    currentTag:0,
    onEnter:function () {

    },
    title:function () {
        return "Test Box2D Detector";
    }
});

//------------------------------------------------------------------
//
// TestBoundingBox
//
//------------------------------------------------------------------
var TestBoundingBox = ArmatureTestLayer.extend({
    armature:null,
    onEnter:function () {
        this._super();
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/armature/Cowboy.ExportJson");
        this.armature = cc.Armature.create("Cowboy");
        this.armature.getAnimation().playByIndex(0);
        this.armature.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        this.armature.setScale(0.2);
        this.addChild(this.armature);
    },
    title:function () {
        return "Test BoundingBox";
    },
    draw:function () {
        var rect = cc.RectApplyAffineTransform(this.armature.boundingBox(), this.armature.nodeToParentTransform());
        cc.drawingUtil.setDrawColor4B(100, 100, 100, 255);
        cc.drawingUtil.setLineWidth(1);
        cc.drawingUtil.drawRect(rect.origin, cc.p(cc.rectGetMaxX(rect), cc.rectGetMaxY(rect)));
    }
});

//------------------------------------------------------------------
//
// TestAnchorPoint
//
//------------------------------------------------------------------
var TestAnchorPoint = ArmatureTestLayer.extend({
    onEnter:function () {
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/armature/Cowboy.ExportJson");
        this._super();
        for (var i = 0; i < 5; i++) {
            var armature = cc.Armature.create("Cowboy");
            armature.getAnimation().playByIndex(0);
            armature.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
            armature.setScale(0.2);
            this.addChild(armature, 0, i);
        }

        this.getChildByTag(0).setAnchorPoint(cc.p(0, 0));
        this.getChildByTag(1).setAnchorPoint(cc.p(0, 1));
        this.getChildByTag(2).setAnchorPoint(cc.p(1, 0));
        this.getChildByTag(3).setAnchorPoint(cc.p(1, 1));
        this.getChildByTag(4).setAnchorPoint(cc.p(0.5, 0.5));
    },
    title:function () {
        return "Test Set AnchorPoint";
    }
});

//------------------------------------------------------------------
//
// TestArmatureNesting
//
//------------------------------------------------------------------
var TestArmatureNesting = ArmatureTestLayer.extend({
    armature:null,
    weaponIndex:0,
    onEnter:function () {
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/armature/cyborg.png", "res/armature/cyborg.plist", "res/armature/cyborg.xml");
        this._super();

        this.setTouchEnabled(true);
        this.armature = cc.Armature.create("cyborg");
        this.armature.getAnimation().playByIndex(1);
        this.armature.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        this.armature.setScale(1.2);
        this.armature.getAnimation().setAnimationScale(0.4);
        this.addChild(this.armature);
        this.weaponIndex = 0;
    },
    title:function () {
        return "Test Set ChildByTag";
    },
    onTouchesEnded:function (touch, event) {
        ++this.weaponIndex;
            
        this.weaponIndex = this.weaponIndex % 4;
        this.armature.getBone("armInside").getChildArmature().getAnimation().playByIndex(this.weaponIndex);
        this.armature.getBone("armOutside").getChildArmature().getAnimation().playByIndex(this.weaponIndex);
    }
});