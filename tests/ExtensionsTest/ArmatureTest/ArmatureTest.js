/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-6-20
 * Time: 下午4:21
 * To change this template use File | Settings | File Templates.
 */
var armatureSceneIdx = -1;

var ArmatureTestScene = TestScene.extend({
    runThisTest:function () {
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(s_TestBone_png, s_TestBone_plist, s_TestBone_json);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(s_Cowboy_png, s_Cowboy_plist, s_Cowboy_json);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(s_knight_png, s_knight_plist, s_knight_xml);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(s_weapon_png, s_weapon_plist, s_weapon_xml);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(s_robot_png, s_robot_plist, s_robot_xml);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(s_cyborg_png, s_cyborg_plist, s_cyborg_xml);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(s_Dragon_png, s_Dragon_plist, s_Dragon_xml);

        armatureSceneIdx = -1;
        this.addChild(nextArmatureTest());
        director.replaceScene(this);
    },
    onMainMenuCallback:function () {
        cc.ArmatureDataManager.purge();
        this._super();
    }
});

var armatureSceneArr = [
    function () {
        return new TestCSWithSkeleton();
    },
    function () {
        return new TestCSWithoutSkeleton();
    },
    function () {
        return new TestDragonBones20();
    },
    function(){
        return new TestAnimationEvent();
    }
];

var nextArmatureTest = function () {
    armatureSceneIdx++;
    armatureSceneIdx = armatureSceneIdx % armatureSceneArr.length;
    //mxs test todo
    var armatureScene = armatureSceneArr[armatureSceneIdx]();
    window.armatureScene = armatureScene;
    return armatureScene;
    //return armatureSceneArr[armatureSceneIdx]();
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
    _title:"",
    _subtitle:"",

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

var TestCSWithSkeleton = ArmatureTestLayer.extend({
    onEnter:function () {
        this._super();
        var armature = cc.Armature.create("Cowboy");
        armature.getAnimation().playByIndex(0);
        armature.setScale(0.2);
        //armature.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        armature.setPosition(cc.p(100, 100));
        this.addChild(armature);
    },
    title:function () {
        return "Test Export From CocoStudio With Skeleton Effect";
    }
});

var TestCSWithoutSkeleton = ArmatureTestLayer.extend({
    onEnter:function () {
        this._super();
        var armature = cc.Armature.create("TestBone");
        armature.getAnimation().playByIndex(0);
        armature.setAnchorPoint(cc.p(0.5, -0.1));
        armature.setScale(0.2);
        armature.setPosition(cc.p(winSize.width / 2, winSize.height / 2 - 100));
        this.addChild(armature);
    },
    title:function () {
        return "Test Export From CocoStudio Without Skeleton Effect";
    }
});

var TestDragonBones20 = ArmatureTestLayer.extend({
    onEnter:function () {
        this._super();
        var armature = cc.Armature.create("Dragon");
        armature.getAnimation().playByIndex(0);
        armature.getAnimation().setAnimationScale(0.4);
        armature.setScale(0.6);
        armature.setPosition(cc.p(winSize.width / 2, winSize.height / 2 * 0.3));
        this.addChild(armature);
    },
    title:function () {
        return "Test Export From DragonBones version 2.0";
    }
});

var TestAnimationEvent = ArmatureTestLayer.extend({
    _armature:null,
    onEnter:function () {
        this._super();

        this._armature = cc.Armature.create("Cowboy");
        this._armature.getAnimation().play("Fire");
        this._armature.setScaleX(-0.3);
        this._armature.setScaleY(0.3);
        this._armature.setPosition(cc.p(winSize.width/2 -200, winSize.height / 2));
        this._armature.getAnimation().connectEvent(this, this.animationEvent);
        this.addChild(this._armature);
    },
    title:function () {
        return "Test Export From DragonBones version 2.0";
    },
    animationEvent:function (armature, movementType, movementID) {
        if (movementType == CC_MovementEventType_LOOP_COMPLETE) {
            if (movementID == "Fire") {
                var actionToRight = cc.MoveTo.create(2, cc.p(winSize.width/2 +200, winSize.height / 2));
                this._armature.stopAllActions();
                this._armature.runAction(cc.Sequence.create(actionToRight,cc.CallFunc.create(this.callback1,this)));
                this._armature.getAnimation().play("Walk");
            }
            else if (movementID == "FireMax") {
                var actionToLeft = cc.MoveTo.create(2, cc.p(winSize.width/2 -200, winSize.height / 2));
                this._armature.stopAllActions();
                this._armature.runAction(cc.Sequence.create(actionToLeft, cc.CallFunc.create(this.callback2,this)));
                this._armature.getAnimation().play("Walk");
            }
        }
    },
    callback1:function () {
        this._armature.runAction(cc.ScaleTo.create(0.3, 0.3, 0.3));
        this._armature.getAnimation().play("FireMax", 10);
    },
    callback2:function () {
        this._armature.runAction(cc.ScaleTo.create(0.3, -0.3, 0.3));
        this._armature.getAnimation().play("Fire", 10);
    }
});

var TestPerformance = ArmatureTestLayer.extend({
    onEnter:function () {
        this._super();
        var armature = cc.Armature.create("Cowboy");
        armature.getAnimation().playByIndex(0);
        armature.setScale(0.2);
        armature.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        this.addChild(armature);
    },
    title:function () {
        return "Test Export From DragonBones version 2.0";
    }
});

var TestChangeZorder = ArmatureTestLayer.extend({
    onEnter:function () {
        this._super();
        var armature = cc.Armature.create("Dragon");
        armature.getAnimation().playByIndex(1);
        armature.getAnimation().setAnimationScale(0.4);
        armature.setScale(0.6);
        armature.setPosition(cc.p(winSize.width / 2, winSize.height / 2 - 100));
        this.addChild(armature);
    },
    title:function () {
        return "Test Export From DragonBones version 2.0";
    }
});