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

var TAG_SPRITE1 = 1;
var TAG_SPRITE2 = 2;
var TAG_SPRITE3 = 3;
var TAG_SLIDER = 4;

var sceneIdx = -1;
var MAX_LAYER = 9;

var TestNodeDemo = cc.Layer.extend({
    ctor:function () {
        this._super();

        cc.associateWithNative( this, cc.Layer );
        this.init();
    },
    title:function () {
        return "No title";
    },
    subtitle:function () {
        return "";
    },
    onEnter:function () {
        this._super();

        var s = director.getWinSize();

        var label = cc.LabelTTF.create(this.title(), "Arial", 32);
        this.addChild(label, 1);
        label.setPosition(cc.p(s.width / 2, s.height - 50));

        var strSubtitle = this.subtitle();
        if (!strSubtitle == "") {
            var l = cc.LabelTTF.create(strSubtitle, "Thonburi", 16);
            this.addChild(l, 1);
            l.setPosition(cc.p(s.width / 2, s.height - 80));
        }

        var item1 = cc.MenuItemImage.create(s_pathB1, s_pathB2, this, this.backCallback);
        var item2 = cc.MenuItemImage.create(s_pathR1, s_pathR2, this, this.restartCallback);
        var item3 = cc.MenuItemImage.create(s_pathF1, s_pathF2, this, this.nextCallback);

        var menu = cc.Menu.create(item1, item2, item3);

        menu.setPosition(cc.p(0,0));
        item1.setPosition(cc.p(s.width / 2 - 100, 30));
        item2.setPosition(cc.p(s.width / 2, 30));
        item3.setPosition(cc.p(s.width / 2 + 100, 30));

        this.addChild(menu, 1);
    },

    restartCallback:function (sender) {
        var s = new NodeTestScene();
        s.addChild(restartNodeTest());
        director.replaceScene(s);
    },
    nextCallback:function (sender) {
        var s = new NodeTestScene();
        s.addChild(nextNodeTest());
        director.replaceScene(s);
    },
    backCallback:function (sender) {
        var s = new NodeTestScene();
        s.addChild(previousNodeTest());
        director.replaceScene(s);
    }
});

var CCNodeTest2 = TestNodeDemo.extend({
    onEnter:function () {
        this._super();

        var s = director.getWinSize();

        var sp1 = cc.Sprite.create(s_pathSister1);
        var sp2 = cc.Sprite.create(s_pathSister2);
        var sp3 = cc.Sprite.create(s_pathSister1);
        var sp4 = cc.Sprite.create(s_pathSister2);

        sp1.setPosition(cc.p(150, s.height / 2));
        sp2.setPosition(cc.p(s.width - 150, s.height / 2));
        this.addChild(sp1);
        this.addChild(sp2);

        sp3.setScale(0.25);
        sp4.setScale(0.25);

        sp1.addChild(sp3);
        sp2.addChild(sp4);

        var a1 = cc.RotateBy.create(2, 360);
        var a2 = cc.ScaleBy.create(2, 2);

        var action1 = cc.RepeatForever.create(cc.Sequence.create(a1, a2, a2.reverse()));
        var action2 = cc.RepeatForever.create(cc.Sequence.create(
            a1.copy(), a2.copy(), a2.reverse()));

        sp2.setAnchorPoint(cc.p(0, 0));

        sp1.runAction(action1);
        sp2.runAction(action2);
    },
    title:function () {
        return "anchorPoint and children";
    }
});

var SID_DELAY2 = 1;
var SID_DELAY4 = 2;
var CCNodeTest4 = TestNodeDemo.extend({
    ctor:function () {
        this._super();
        var sp1 = cc.Sprite.create(s_pathSister1);
        var sp2 = cc.Sprite.create(s_pathSister2);
        var s = director.getWinSize();
        sp1.setPosition(cc.p(150, s.height / 2));
        sp2.setPosition(cc.p(s.width - 150, s.height / 2));

        this.addChild(sp1, 0, 2);
        this.addChild(sp2, 0, 3);

        this.schedule(this.delay2, 2.0);
        this.schedule(this.delay4, 4.0);
    },
    delay2:function (dt) {
        var node = this.getChildByTag(2);
        var action1 = cc.RotateBy.create(1, 360);
        node.runAction(action1);
    },
    delay4:function (dt) {
        this.unschedule(this.delay4);
        this.removeChildByTag(3, false);
    },
    title:function () {
        return "tags";
    }
});

var CCNodeTest5 = TestNodeDemo.extend({
    ctor:function () {
        this._super();
        var sp1 = cc.Sprite.create(s_pathSister1);
        var sp2 = cc.Sprite.create(s_pathSister2);
        var s = director.getWinSize();
        sp1.setPosition(cc.p(150, s.height / 2));
        sp2.setPosition(cc.p(s.width - 150, s.height / 2));

        var rot = cc.RotateBy.create(2, 360);
        var rot_back = rot.reverse();
        var forever = cc.RepeatForever.create(cc.Sequence.create(rot, rot_back));
        var forever2 = forever.copy();
        forever.setTag(101);
        forever2.setTag(102);

        this.addChild(sp1, 0, TAG_SPRITE1);
        this.addChild(sp2, 0, TAG_SPRITE2);

        sp1.runAction(forever);
        sp2.runAction(forever2);

        this.schedule(this.addAndRemove, 2.0);
    },
    addAndRemove:function (dt) {
        var sp1 = this.getChildByTag(TAG_SPRITE1);
        var sp2 = this.getChildByTag(TAG_SPRITE2);

        this.removeChild(sp1, false);
        this.removeChild(sp2, true);

        this.addChild(sp1, 0, TAG_SPRITE1);
        this.addChild(sp2, 0, TAG_SPRITE2);
    },
    title:function () {
        return "remove and cleanup";
    }
});

var CCNodeTest6 = TestNodeDemo.extend({
    ctor:function () {
        this._super();
        var sp1 = cc.Sprite.create(s_pathSister1);
        var sp11 = cc.Sprite.create(s_pathSister1);

        var sp2 = cc.Sprite.create(s_pathSister2);
        var sp21 = cc.Sprite.create(s_pathSister2);

        var s = director.getWinSize();
        sp1.setPosition(cc.p(150, s.height / 2));
        sp2.setPosition(cc.p(s.width - 150, s.height / 2));

        var rot = cc.RotateBy.create(2, 360);
        var rot_back = rot.reverse();
        var forever1 = cc.RepeatForever.create(cc.Sequence.create(rot, rot_back));
        var forever11 = forever1.copy();

        var forever2 = forever1.copy();
        var forever21 = forever1.copy();

        this.addChild(sp1, 0, TAG_SPRITE1);
        sp1.addChild(sp11);
        this.addChild(sp2, 0, TAG_SPRITE2);
        sp2.addChild(sp21);

        sp1.runAction(forever1);
        sp11.runAction(forever11);
        sp2.runAction(forever2);
        sp21.runAction(forever21);

        this.schedule(this.addAndRemove, 2.0);
    },
    addAndRemove:function (dt) {
        var sp1 = this.getChildByTag(TAG_SPRITE1);
        var sp2 = this.getChildByTag(TAG_SPRITE2);

        this.removeChild(sp1, false);
        this.removeChild(sp2, true);

        this.addChild(sp1, 0, TAG_SPRITE1);
        this.addChild(sp2, 0, TAG_SPRITE2);
    },
    title:function () {
        return "remove/cleanup with children";
    }
});

var StressTest1 = TestNodeDemo.extend({
    ctor:function () {
        this._super();        
        var s = director.getWinSize();

        var sp1 = cc.Sprite.create(s_pathSister1);
        this.addChild(sp1, 0, TAG_SPRITE1);

        sp1.setPosition(cc.p(s.width / 2, s.height / 2));

        this.schedule(this.shouldNotCrash, 1.0);
    },
    shouldNotCrash:function (dt) {
        this.unschedule(this.shouldNotCrash);

        var s = director.getWinSize();

        // if the node has timers, it crashes
        var explosion = cc.ParticleSun.create();
        explosion.setTexture(cc.TextureCache.getInstance().addImage(s_fire));

        explosion.setPosition(cc.p(s.width / 2, s.height / 2));

        this.runAction(cc.Sequence.create(
            cc.RotateBy.create(2, 360),
            cc.CallFunc.create(this, this.removeMe)));

        this.addChild(explosion);
    },
    removeMe:function (node) {
        this._parent.removeChild(node, true);
        this.nextCallback(this);
    },
    title:function () {
        return "stress test #1: no crashes";
    }
});

var StressTest2 = TestNodeDemo.extend({
    ctor:function () {
        this._super();
        var s = director.getWinSize();

        var sublayer = cc.Layer.create();

        var sp1 = cc.Sprite.create(s_pathSister1);
        sp1.setPosition(cc.p(80, s.height / 2));

        var move = cc.MoveBy.create(3, cc.p(350, 0));
        var move_ease_inout3 = cc.EaseInOut.create(move.copy(), 2.0);
        var move_ease_inout_back3 = move_ease_inout3.reverse();
        var seq3 = cc.Sequence.create(move_ease_inout3, move_ease_inout_back3);
        sp1.runAction(cc.RepeatForever.create(seq3));
        sublayer.addChild(sp1, 1);

        var fire = cc.ParticleFire.create();
        fire.setTexture(cc.TextureCache.getInstance().addImage(s_fire));
        fire.setPosition(cc.p(80, s.height / 2 - 50));

        var copy_seq3 = seq3.copy();

        fire.runAction(cc.RepeatForever.create(copy_seq3));
        sublayer.addChild(fire, 2);

        this.schedule(this.shouldNotLeak, 6.0);

        this.addChild(sublayer, 0, TAG_SPRITE1);
    },
    shouldNotLeak:function (dt) {
        this.unschedule(this.shouldNotLeak);
        var sublayer = this.getChildByTag(TAG_SPRITE1);
        sublayer.removeAllChildrenWithCleanup(true);
    },
    title:function () {
        return "stress test #2: no leaks";
    }
});

var SchedulerTest1 = TestNodeDemo.extend({
    ctor:function () {
        this._super();
        var layer = cc.Layer.create();
        //UXLog("retain count after init is %d", layer.retainCount());                // 1

        this.addChild(layer, 0);
        //UXLog("retain count after addChild is %d", layer.retainCount());      // 2

        layer.schedule(this.doSomething);
        //UXLog("retain count after schedule is %d", layer.retainCount());      // 3 : (object-c viersion), but win32 version is still 2, because CCTimer class don't save target.

        layer.unschedule(this.doSomething);
        //UXLog("retain count after unschedule is %d", layer.retainCount());		// STILL 3!  (win32 is '2')
    },
    doSomething:function (dt) {
    },
    title:function () {
        return "Node scheduler test #1";
    }
});

var NodeToWorld = TestNodeDemo.extend({
    ctor:function () {
        //
        // This code tests that nodeToParent works OK:
        //  - It tests different anchor Points
        //  - It tests different children anchor points
        this._super();
        var back = cc.Sprite.create(s_back3);
        this.addChild(back, -10);
        back.setAnchorPoint(cc.p(0, 0));
        var backSize = back.getContentSize();

        var item = cc.MenuItemImage.create(s_playNormal, s_playSelect);
        var menu = cc.Menu.create(item);
        menu.alignItemsVertically();
        menu.setPosition(cc.p(backSize.width / 2, backSize.height / 2));
        back.addChild(menu);

        var rot = cc.RotateBy.create(5, 360);
        var fe = cc.RepeatForever.create(rot);
        item.runAction(fe);

        var move = cc.MoveBy.create(3, cc.p(200, 0));
        var move_back = move.reverse();
        var seq = cc.Sequence.create(move, move_back);
        var fe2 = cc.RepeatForever.create(seq);
        back.runAction(fe2);
    },
    title:function () {
        return "nodeToParent transform";
    }
});

var CameraOrbitTest = TestNodeDemo.extend({
    ctor:function () {
        this._super();        
        var s = director.getWinSize();

        var p = cc.Sprite.create(s_back3);
        this.addChild(p, 0);
        p.setPosition(cc.p(s.width / 2, s.height / 2));
        p.setOpacity(128);

        // LEFT
        s = p.getContentSize();
        var sprite = cc.Sprite.create(s_pathGrossini);
        sprite.setScale(0.5);
        p.addChild(sprite, 0);
        sprite.setPosition(cc.p(s.width / 4 * 1, s.height / 2));
        var cam = sprite.getCamera();
        var orbit = cc.OrbitCamera.create(2, 1, 0, 0, 360, 0, 0);
        sprite.runAction(cc.RepeatForever.create(orbit));

        // CENTER
        sprite = cc.Sprite.create(s_pathGrossini);
        sprite.setScale(1.0);
        p.addChild(sprite, 0);
        sprite.setPosition(cc.p(s.width / 4 * 2, s.height / 2));
        orbit = cc.OrbitCamera.create(2, 1, 0, 0, 360, 45, 0);
        sprite.runAction(cc.RepeatForever.create(orbit));

        // RIGHT
        sprite = cc.Sprite.create(s_pathGrossini);
        sprite.setScale(2.0);
        p.addChild(sprite, 0);
        sprite.setPosition(cc.p(s.width / 4 * 3, s.height / 2));
        var ss = sprite.getContentSize();
        orbit = cc.OrbitCamera.create(2, 1, 0, 0, 360, 90, -45);
        sprite.runAction(cc.RepeatForever.create(orbit));

        // PARENT
        orbit = cc.OrbitCamera.create(10, 1, 0, 0, 360, 0, 90);
        p.runAction(cc.RepeatForever.create(orbit));

        this.setScale(1);
    },
    onEnter:function () {
        this._super();
        director.setProjection(cc.DIRECTOR_PROJECTION_3D);
    },
    onExit:function () {
        director.setProjection(cc.DIRECTOR_PROJECTION_2D);
        this._super();
    },
    title:function () {
        return "Camera Orbit test";
    }
});

var CameraZoomTest = TestNodeDemo.extend({
    _z:0,
    ctor:function () {
        this._super();        
        var s = director.getWinSize();

        // LEFT
        var sprite = cc.Sprite.create(s_pathGrossini);
        this.addChild(sprite, 0);
        sprite.setPosition(cc.p(s.width / 4 * 1, s.height / 2));
        var cam = sprite.getCamera();
        cam.setEyeXYZ(0, 0, 415);

        // CENTER
        sprite = cc.Sprite.create(s_pathGrossini);
        this.addChild(sprite, 0, 40);
        sprite.setPosition(cc.p(s.width / 4 * 2, s.height / 2));
//		cam = [sprite camera);
//		[cam setEyeX:0 eyeY:0 eyeZ:415/2);

        // RIGHT
        sprite = cc.Sprite.create(s_pathGrossini);
        this.addChild(sprite, 0, 20);
        sprite.setPosition(cc.p(s.width / 4 * 3, s.height / 2));
//		cam = [sprite camera);
//		[cam setEyeX:0 eyeY:0 eyeZ:-485);
//		[cam setCenterX:0 centerY:0 centerZ:0);

        this._z = 0;
        this.scheduleUpdate();
    },
    update:function (dt) {
        this._z += dt * 100;

        var sprite = this.getChildByTag(20);
        var cam = sprite.getCamera();
        cam.setEyeXYZ(0, 0, this._z);

        sprite = this.getChildByTag(40);
        cam = sprite.getCamera();
        cam.setEyeXYZ(0, 0, this._z);
    },

    onEnter:function () {
        this._super();
        director.setProjection(cc.DIRECTOR_PROJECTION_3D);
    },
    onExit:function () {
        director.setProjection(cc.DIRECTOR_PROJECTION_2D);
        this._super();
    },
    title:function () {
        return "Camera Zoom test";
    }
});

var CameraCenterTest = TestNodeDemo.extend({
    ctor:function () {
        this._super();        
        var s = director.getWinSize();

        // LEFT-TOP
        var sprite = cc.Sprite.create();
        this.addChild(sprite, 0);
        sprite.setPosition(cc.p(s.width / 5 * 1, s.height / 5 * 1));
        sprite.setColor(cc.c3b(255,0,0));
        sprite.setTextureRect(cc.rect(0, 0, 120, 50));
        var orbit = cc.OrbitCamera.create(10, 1, 0, 0, 360, 0, 0);
        sprite.runAction(cc.RepeatForever.create(orbit));

        // LEFT-BOTTOM
        sprite = cc.Sprite.create();
        this.addChild(sprite, 0, 40);
        sprite.setPosition(cc.p(s.width / 5 * 1, s.height / 5 * 4));
        sprite.setColor(cc.c3b(0,0,255));
        sprite.setTextureRect(cc.rect(0, 0, 120, 50));
        orbit = cc.OrbitCamera.create(10, 1, 0, 0, 360, 0, 0);
        sprite.runAction(cc.RepeatForever.create(orbit));

        // RIGHT-TOP
        sprite = cc.Sprite.create();
        this.addChild(sprite, 0);
        sprite.setPosition(cc.p(s.width / 5 * 4, s.height / 5 * 1));
        sprite.setColor(cc.yellow());
        sprite.setTextureRect(cc.rect(0, 0, 120, 50));
        orbit = cc.OrbitCamera.create(10, 1, 0, 0, 360, 0, 0);
        sprite.runAction(cc.RepeatForever.create(orbit));

        // RIGHT-BOTTOM
        sprite = cc.Sprite.create();
        this.addChild(sprite, 0, 40);
        sprite.setPosition(cc.p(s.width / 5 * 4, s.height / 5 * 4));
        sprite.setColor(cc.c3b(0,255,0));
        sprite.setTextureRect(cc.rect(0, 0, 120, 50));
        orbit = cc.OrbitCamera.create(10, 1, 0, 0, 360, 0, 0);
        sprite.runAction(cc.RepeatForever.create(orbit));

        // CENTER
        sprite = cc.Sprite.create();
        this.addChild(sprite, 0, 40);
        sprite.setPosition(cc.p(s.width / 2, s.height / 2));
        sprite.setColor(cc.white());
        sprite.setTextureRect(cc.rect(0, 0, 120, 50));
        orbit = cc.OrbitCamera.create(10, 1, 0, 0, 360, 0, 0);
        sprite.runAction(cc.RepeatForever.create(orbit));
    },
    title:function () {
        return "Camera Center test";
    },
    subtitle:function () {
        return "Sprites should rotate at the same speed";
    }
});

//
// ConvertToNode
//
var ConvertToNode = TestNodeDemo.extend({
    ctor:function () {
        this._super();        
        this.setTouchEnabled(true);
        var s = director.getWinSize();

        var rotate = cc.RotateBy.create(10, 360);
        var action = cc.RepeatForever.create(rotate);
        for (var i = 0; i < 3; i++) {
            var sprite = cc.Sprite.create(s_pathGrossini);
            sprite.setPosition(cc.p(s.width / 4 * (i + 1), s.height / 2));

            var point = cc.Sprite.create(s_pathR1);
            point.setScale(0.25);
            point.setPosition(sprite.getPosition());
            this.addChild(point, 10, 100 + i);

            switch (i) {
                case 0:
                    sprite.setAnchorPoint(cc.p(0,0));
                    break;
                case 1:
                    sprite.setAnchorPoint(cc.p(0.5, 0.5));
                    break;
                case 2:
                    sprite.setAnchorPoint(cc.p(1, 1));
                    break;
            }

            point.setPosition(sprite.getPosition());

            var copy = action.copy();
            sprite.runAction(copy);
            this.addChild(sprite, i);
        }
    },
    onTouchesEnded:function (touches, event) {
        for (var it = 0; it < touches.length; it++) {
            var touch = touches[it];
            var location = touch.getLocation();

            location = director.convertToGL(location);

            for (var i = 0; i < 3; i++) {
                var node = this.getChildByTag(100 + i);

                var p1 = node.convertToNodeSpaceAR(location);
                var p2 = node.convertToNodeSpace(location);

                cc.log("AR: x=" + p1.x.toFixed(2) + ", y=" + p1.y.toFixed(2) + " -- Not AR: x=" + p2.x.toFixed(2) + ", y=" + p2.y.toFixed(2));
            }
        }
    },
    title:function () {
        return "Convert To Node Space";
    },
    subtitle:function () {
        return "testing convertToNodeSpace / AR. Touch and see console";
    }
});

//
// BoundingBox Test
//
var BoundingBoxTest = TestNodeDemo.extend({
    init:function () {
        this._super();
        var sprite = cc.Sprite.create(s_pathGrossini);
        this.addChild( sprite );
        sprite.setPosition(winSize.width/2, winSize.height/2);
        var bb = sprite.getBoundingBox();
        cc.log('BoundingBox:');
        for( var i in bb )
            cc.log( i + " = " + bb[i] );
    },
    title:function () {
        return "Bounding Box Test";
    },
    subtitle:function () {
        return "Testing getBoundingBox(). See console";
    }
});

//
// MAIN ENTRY POINT
//
var NodeTestScene = TestScene.extend({
    runThisTest:function () {
        sceneIdx = -1;
        MAX_LAYER = 9;
        var layer = nextNodeTest();
        this.addChild(layer);

        director.replaceScene(this);
    }
});

//
// Flow control
//
var arrayOfNodeTest = [
            CCNodeTest2,
            CCNodeTest4,
            CCNodeTest5,
            CCNodeTest6,
            StressTest1,
            StressTest2,
            NodeToWorld,
            SchedulerTest1,
            ConvertToNode,
            CameraOrbitTest,
            CameraZoomTest,
            CameraCenterTest,
            BoundingBoxTest
            ];

var nextNodeTest = function () {
    sceneIdx++;
    sceneIdx = sceneIdx % arrayOfNodeTest.length;

    return new arrayOfNodeTest[sceneIdx]();
};
var previousNodeTest = function () {
    sceneIdx--;
    if (sceneIdx < 0)
        sceneIdx += arrayOfNodeTest.length;

    return new arrayOfNodeTest[sceneIdx]();
};
var restartNodeTest = function () {
    return new arrayOfNodeTest[sceneIdx]();
};


