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
    onMainMenuCallback:function(){
        this._super();
        this.removeAllChildren();
        cc.ArmatureDataManager.purge();
    },
    onExit:function () {
        this._super();
    }
});

var armatureSceneArr = [
    function () {
        return new TestAsynchronousLoading();
    },
    function () {
        return new TestCSWithSkeleton();
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
        return new TestParticleDisplay();
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
    }
];

if (sys.platform === "browser")
{
    armatureSceneArr.push( function () { return new TestColliderDetector();} );
}

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
// TestAsynchronousLoading
//
//------------------------------------------------------------------
var TestAsynchronousLoading = ArmatureTestLayer.extend({
    onEnter: function () {
        this._super();
        this.setMenuItemEnabled(false);

        cc.ArmatureDataManager.getInstance().addArmatureFileInfoAsync(s_knight_png, s_knight_plist, s_knight_xml, this, this.dataLoaded);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfoAsync(s_weapon_png, s_weapon_plist, s_weapon_xml, this, this.dataLoaded);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfoAsync(s_robot_png, s_robot_plist, s_robot_xml, this, this.dataLoaded);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfoAsync(s_cyborg_png, s_cyborg_plist, s_cyborg_xml, this, this.dataLoaded);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfoAsync(s_Dragon_png, s_Dragon_plist, s_Dragon_xml, this, this.dataLoaded);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfoAsync(s_Cowboy_json, this, this.dataLoaded);
    },
    setMenuItemEnabled: function (bool) {
        var menu = this.getChildByTag(BASE_TEST_MENU_TAG);
        var backItem = menu.getChildByTag(BASE_TEST_MENUITEM_PREV_TAG);
        var restartItem = menu.getChildByTag(BASE_TEST_MENUITEM_RESET_TAG);
        var nextItem = menu.getChildByTag(BASE_TEST_MENUITEM_NEXT_TAG);
        backItem.setEnabled(bool);
        restartItem.setEnabled(bool);
        nextItem.setEnabled(bool);
    },
    title: function () {
        return "Test Asynchronous Loading";
    },
    subtitle: function () {
        return "current percent : 0";
    },
    dataLoaded: function (percent) {
        cc.log("percent:"+percent);
        var subTile = this.getChildByTag(BASE_TEST_SUBTITLE_TAG);
        subTile.setString("current percent : " + percent.toFixed(2) * 100);
        if (percent >= 1) {
            this.setMenuItemEnabled(true);
        }
    }
});

//------------------------------------------------------------------
//
// TestCSWithSkeleton
//
//------------------------------------------------------------------
var TestCSWithSkeleton = ArmatureTestLayer.extend({
    onEnter:function () {
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
// TestDragonBones20
//
//------------------------------------------------------------------
var TestDragonBones20 = ArmatureTestLayer.extend({
    onEnter:function () {
        this._super();
        var armature = cc.Armature.create("Dragon");
        armature.getAnimation().playByIndex(0);
        armature.getAnimation().setSpeedScale(0.4);
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
        this._super();
        var armature = null;
        armature = cc.Armature.create("Knight_f/Knight");
        armature.getAnimation().playByIndex(0);
        armature.setPosition(cc.p(winSize.width / 2, winSize.height / 2 - 100));
        armature.setScale(0.6);
        this.addChild(armature, 0, 0);

        armature = cc.Armature.create("Cowboy");
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
        node.setZOrder(Math.random() * 3);
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
    _direction:1,
    onEnter:function () {
        this._super();

        this._armature = cc.Armature.create("Cowboy");
        this._armature.getAnimation().play("Fire");
        this._armature.setScaleX(-0.25);
        this._armature.setScaleY(0.25);
        this._armature.setPosition(cc.p(winSize.width / 2 - 150, winSize.height / 2));
        this._armature.getAnimation().setMovementEventCallFunc(this.animationEvent,this);
        this.addChild(this._armature);

        this._direction = 1;

    },
    title:function () {
        return "Test Armature Animation Event";
    },
    animationEvent:function (armature, movementType, movementID) {
        if (movementType == CC_MovementEventType_LOOP_COMPLETE) {
            if (movementID == "Fire") {
                var moveBy = cc.MoveBy.create(2, cc.p(300 * this._direction, 0));
                this._armature.stopAllActions();
                this._armature.runAction(cc.Sequence.create(moveBy, cc.CallFunc.create(this.callback, this)));
                this._armature.getAnimation().play("Walk");

                this._direction *= -1;
            }
        }
    },
    callback:function () {
        this._armature.runAction(cc.ScaleTo.create(0.3, 0.25 * this._direction * -1, 0.25));
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

        this.armature = cc.Armature.create("robot");
        this.armature.getAnimation().playByIndex(4);
        this.armature.setPosition(VisibleRect.center());
        this.armature.setScale(0.48);
        this.armature.getAnimation().setSpeedScale(0.5);
        this.addChild(this.armature);

        var p1 = cc.ParticleSystem.create("res/Particles/SmallSun.plist");
        p1.setTotalParticles(30);
        var p2 = cc.ParticleSystem.create("res/Particles/SmallSun.plist");
        p2.setTotalParticles(30);
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

//------------------------------------------------------------------
//
// TestUseMutiplePicture
//
//------------------------------------------------------------------
var TestUseMutiplePicture = ArmatureTestLayer.extend({
    displayIndex:0,
    armature:null,
    onEnter:function () {
        this._super();
        this.setTouchEnabled(true);

        this.displayIndex = 0;

        this.armature = cc.Armature.create("Knight_f/Knight");
        this.armature.getAnimation().playByIndex(0);
        this.armature.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        this.armature.setScale(1.2);
        this.addChild(this.armature);

        var weapon = ["weapon_f-sword.png", "weapon_f-sword2.png", "weapon_f-sword3.png", "weapon_f-sword4.png", "weapon_f-sword5.png", "weapon_f-knife.png", "weapon_f-hammer.png"];

        //add skin
        for (var i = 0; i < 7; i++) {
            var skin = cc.Skin.createWithSpriteFrameName(weapon[i]);
            this.armature.getBone("weapon").addDisplay(skin, i);
        }

        //add label
        var label = cc.LabelTTF.create("This is a weapon!", "Arial", 18);
        label.setAnchorPoint(cc.p(0.2, 0.5));
        this.armature.getBone("weapon").addDisplay(label, 7);
    },
    title:function () {
        return "Test One CCArmature Use Different Picture";
    },
    subtitle:function () {
        return "Tap Screen";
    },
    onTouchesEnded:function (touch, event) {
        ++this.displayIndex;
        this.displayIndex = (this.displayIndex) % 8;
        this.armature.getBone("weapon").changeDisplayByIndex(this.displayIndex, true);
        return false;
    }
});

//------------------------------------------------------------------
//
// TestColliderDetector
//
//------------------------------------------------------------------
var TestColliderDetector = ArmatureTestLayer.extend({
    armature1:null,
    armature2:null,
    bullet:null,
    space:null,
    enemyTag: 1,
    bulletTag: 2,

    onEnter:function () {
        this._super();
        this.armature1 = cc.Armature.create("Cowboy");
        this.armature1.getAnimation().play("FireWithoutBullet");
        this.armature1.getAnimation().setSpeedScale(0.2);
        this.armature1.setScaleX(-0.2);
        this.armature1.setScaleY(0.2);
        this.armature1.setPosition(cc.p(170, winSize.height / 2));

        /*
         * Set armature's frame event callback function
         * To disconnect this event, just setFrameEventCallFunc(nul, null);
         */
        this.armature1.getAnimation().setFrameEventCallFunc(this.onFrameEvent,this);

        this.addChild(this.armature1);

        this.armature2 = cc.Armature.create("Cowboy");
        this.armature2.getAnimation().play("Walk");
        this.armature2.setScaleX(-0.2);
        this.armature2.setScaleY(0.2);
        this.armature2.setPosition(cc.p(winSize.width - 160, winSize.height / 2));
        this.addChild(this.armature2);

        this.bullet = cc.PhysicsSprite.createWithSpriteFrameName("25.png");
        this.addChild(this.bullet);

        this.initWorld();
        this.scheduleUpdate();
    },
    initWorld:function(){
        this.space = new cp.Space();
        this.space.gravity =  cp.v(0, 0);

        // Physics debug layer
        var debugLayer = cc.PhysicsDebugNode.create(this.space);
        this.addChild(debugLayer, 9999);

        //init bullet body
        var size = this.bullet.getContentSize();
        var verts = [
            -size.width/2,-size.height/2,
            -size.width/2,size.height/2,
            size.width/2,size.height/2,
            size.width/2,-size.height/2
        ];
        var body = new cp.Body(1, cp.momentForPoly(1,verts, cp.vzero));
        this.space.addBody(body);
        var shape = new cp.PolyShape(body,verts, cp.vzero);
        shape.collision_type = this.bulletTag;
        this.space.addShape(shape);
        this.bullet.setBody(body);
        this.bullet.setPosition(cc.p(-100,-100));

        //init armature body
        body = new cp.Body(Infinity, Infinity);
        this.space.addBody(body);
        this.armature2.setBody(body);
        var shapeList = this.armature2.getShapeList();
        for(var i = 0 ;i<shapeList.length;i++){
            shape = shapeList[i];
            shape.collision_type = this.enemyTag;
        }

        //init collision handler
        this.space.addCollisionHandler(this.enemyTag, this.bulletTag, this.beginHit.bind(this), null, null, this.endHit.bind(this));
    },
    onFrameEvent: function (bone, evt, originFrameIndex, currentFrameIndex) {
        cc.log("(" + bone.getName() + ") emit a frame event (" + evt + ") at frame index (" + currentFrameIndex + ").");
        /*
         * originFrameIndex is the frame index editted in Action Editor
         * currentFrameIndex is the current index animation played to
         * frame event may be delay emit, so originFrameIndex may be different from currentFrameIndex.
         */
        var p = this.armature1.getBone("Layer126").getDisplayRenderNode().convertToWorldSpaceAR(cc.p(0, 0));
        this.bullet.setPosition(cc.p(p.x + 60, p.y));
        this.bullet.stopAllActions();
        this.bullet.runAction(cc.MoveBy.create(1.5, cc.p(800, 0)));
    },
    beginHit:function(arbiter, space){
        var shapes = arbiter.getShapes();
        var shapeA = shapes[0];
        var shapeB = shapes[1];
        var bone;
        if(shapeA.collision_type==this.enemyTag){
            bone = shapeA.data;
        }
        if(shapeB.collision_type==this.enemyTag){
            bone = shapeB.data;
        }
        bone.getArmature().setVisible(false);
    },

    endHit:function(arbiter, space){
        var shapes = arbiter.getShapes();
        var shapeA = shapes[0];
        var shapeB = shapes[1];
        var bone;
        if(shapeA.collision_type==this.enemyTag){
            bone = shapeA.data;
        }
        if(shapeB.collision_type==this.enemyTag){
            bone = shapeB.data;
        }
        bone.getArmature().setVisible(true);
    },
    update:function(dt){
        this.space.step(dt);
    },
    title:function () {
        return "Test Collider Detector";
    },
    onExit:function(){
        this._super();
        var shapeList = this.armature2.getShapeList();
        for(var i = 0 ;i<shapeList.length;i++){
            this.space.removeShape(shapeList[i]);
        }
        this.space.removeBody(this.armature2.getBody());
        this.space.removeBody(this.bullet.getBody());
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
        this._super();

        this.setTouchEnabled(true);
        this.armature = cc.Armature.create("cyborg");
        this.armature.getAnimation().playByIndex(1);
        this.armature.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        this.armature.setScale(1.2);
        this.armature.getAnimation().setSpeedScale(0.4);
        this.addChild(this.armature);
        this.weaponIndex = 0;
    },
    title:function () {
        return "Test CCArmature Nesting";
    },
    onTouchesEnded:function (touch, event) {
        ++this.weaponIndex;
        this.weaponIndex = this.weaponIndex % 4;
        this.armature.getBone("armInside").getChildArmature().getAnimation().playByIndex(this.weaponIndex);
        this.armature.getBone("armOutside").getChildArmature().getAnimation().playByIndex(this.weaponIndex);
    }
});