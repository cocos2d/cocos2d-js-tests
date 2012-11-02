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

var TAG_NODE = 5560;
var TAG_GROSSINI = 5561;
var TAG_SEQUENCE = 5562;

var sceneIdx = -1;
var MAX_LAYER = 5;

var nextActionManagerAction = function () {
    sceneIdx++;
    sceneIdx = sceneIdx % MAX_LAYER;

    return createActionManagerLayer(sceneIdx);
};
var backActionManagerAction = function () {
    sceneIdx--;
    if (sceneIdx < 0)
        sceneIdx += MAX_LAYER;

    return createActionManagerLayer(sceneIdx);
};
var restartActionManagerAction = function () {
    return createActionManagerLayer(sceneIdx);
};

var createActionManagerLayer = function (index) {
    switch (index) {
        case 0:
            return new CrashTest();
        case 1:
            return new LogicTest();
        case 2:
            return new PauseTest();
        case 3:
            return new RemoveTest();
        case 4:
            return new ResumeTest();
    }

    return null;
};

//------------------------------------------------------------------
//
// ActionManagerTest
//
//------------------------------------------------------------------
var ActionManagerTest = cc.Layer.extend({
    _atlas:null,
    _title:"",

    ctor:function () {
        this._super();
        cc.associateWithNative(this, cc.Layer);
        this.init();
    },
    title:function () {
        return "No title";
    },
    onEnter:function () {
        this._super();

        var s = director.getWinSize();

        var label = cc.LabelTTF.create(this.title(), "Arial", 32);
        this.addChild(label, 1);
        label.setPosition(s.width / 2, s.height - 50);

        var item1 = cc.MenuItemImage.create(s_pathB1, s_pathB2, this.onBackCallback, this);
        var item2 = cc.MenuItemImage.create(s_pathR1, s_pathR2, this.onRestartCallback, this);
        var item3 = cc.MenuItemImage.create(s_pathF1, s_pathF2, this.onNextCallback, this);

        var menu = cc.Menu.create(item1, item2, item3);

        menu.setPosition(0,0);
        item1.setPosition(s.width / 2 - item2.getContentSize().width * 2, item2.getContentSize().height / 2);
        item2.setPosition(s.width / 2, item2.getContentSize().height / 2);
        item3.setPosition(s.width / 2 + item2.getContentSize().width * 2, item2.getContentSize().height / 2);

        this.addChild(menu, 1);
    },

    onBackCallback:function (sender) {
        var s = new ActionManagerTestScene();
        s.addChild(backActionManagerAction());
        director.replaceScene(s);
    },
    onRestartCallback:function (sender) {
        var s = new ActionManagerTestScene();
        s.addChild(restartActionManagerAction());
        director.replaceScene(s);
    },
    onNextCallback:function (sender) {
        var s = new ActionManagerTestScene();
        s.addChild(nextActionManagerAction());
        director.replaceScene(s);
    }
});

//------------------------------------------------------------------
//
// Test1
//
//------------------------------------------------------------------
var CrashTest = ActionManagerTest.extend({
    title:function () {
        return "Test 1. Should not crash";
    },
    onEnter:function () {
        this._super();

        var child = cc.Sprite.create(s_pathGrossini);
        child.setPosition(200, 200);
        this.addChild(child, 1);

        //Sum of all action's duration is 1.5 second.
        child.runAction(cc.RotateBy.create(1.5, 90));
        child.runAction(cc.Sequence.create(
            cc.DelayTime.create(1.4),
            cc.FadeOut.create(1.1))
        );

        //After 1.5 second, self will be removed.
        this.runAction(cc.Sequence.create(
            cc.DelayTime.create(1.4),
            cc.CallFunc.create(this.onRemoveThis, this))
        );
    },
    onRemoveThis:function () {
        this.getParent().removeChild(this);
        this.onNextCallback(this);
    }
});

//------------------------------------------------------------------
//
// Test2
//
//------------------------------------------------------------------
var LogicTest = ActionManagerTest.extend({
    title:function () {
        return "Logic test";
    },
    onEnter:function () {
        this._super();

        var grossini = cc.Sprite.create(s_pathGrossini);
        this.addChild(grossini, 0, 2);
        grossini.setPosition(200, 200);

        grossini.runAction(cc.Sequence.create(
            cc.MoveBy.create(1, cc.p(150, 0)),
            cc.CallFunc.create(this.onBugMe, this))
        );
    },
    onBugMe:function (node) {
        node.stopAllActions(); //After this stop next action not working, if remove this stop everything is working
        node.runAction(cc.ScaleTo.create(2, 2));
    }
});

//------------------------------------------------------------------
//
// PauseTest
//
//------------------------------------------------------------------
var PauseTest = ActionManagerTest.extend({
    title:function () {
        return "Pause Test";
    },
    onEnter:function () {
        //
        // This test MUST be done in 'onEnter' and not on 'init'
        // otherwise the paused action will be resumed at 'onEnter' time
        //
        this._super();

        var s = director.getWinSize();
        var l = cc.LabelTTF.create("After 5 seconds grossini should move", "Thonburi", 16);
        this.addChild(l);
        l.setPosition(s.width / 2, 245);

        //
        // Also, this test MUST be done, after [super onEnter]
        //
        var grossini = cc.Sprite.create(s_pathGrossini);
        this.addChild(grossini, 0, TAG_GROSSINI);
        grossini.setPosition(200, 200);

        var action = cc.MoveBy.create(1, cc.p(150, 0));

        director.getActionManager().addAction(action, grossini, true);

        this.schedule(this.onUnpause, 3);
    },
    onUnpause:function (dt) {
        this.unschedule(this.onUnpause);
        var node = this.getChildByTag(TAG_GROSSINI);
        director.getActionManager().resumeTarget(node);
    }
});

//------------------------------------------------------------------
//
// RemoveTest
//
//------------------------------------------------------------------
var RemoveTest = ActionManagerTest.extend({
    title:function () {
        return "Remove Test";
    },
    onEnter:function () {
        this._super();

        var s = director.getWinSize();
        var l = cc.LabelTTF.create("Should not crash", "Thonburi", 16);
        this.addChild(l);
        l.setPosition(s.width / 2, 245);

        var move = cc.MoveBy.create(2, cc.p(200, 0));
        var callback = cc.CallFunc.create(this.stopAction, this);
        var sequence = cc.Sequence.create(move, callback);
        sequence.setTag(TAG_SEQUENCE);

        var child = cc.Sprite.create(s_pathGrossini);
        child.setPosition(200, 200);

        this.addChild(child, 1, TAG_GROSSINI);
        child.runAction(sequence);
    },
    stopAction:function () {
        var sprite = this.getChildByTag(TAG_GROSSINI);
        sprite.stopActionByTag(TAG_SEQUENCE);
    }
});

//------------------------------------------------------------------
//
// ResumeTest
//
//------------------------------------------------------------------
var ResumeTest = ActionManagerTest.extend({
    title:function () {
        return "Resume Test";
    },
    onEnter:function () {
        this._super();

        var s = director.getWinSize();
        var l = cc.LabelTTF.create("Grossini only rotate/scale in 3 seconds", "Thonburi", 16);
        this.addChild(l);
        l.setPosition(s.width / 2, 245);

        var grossini = cc.Sprite.create(s_pathGrossini);
        this.addChild(grossini, 0, TAG_GROSSINI);
        grossini.setPosition(s.width / 2, s.height / 2);

        grossini.runAction(cc.ScaleBy.create(2, 2));

        director.getActionManager().pauseTarget(grossini);
        grossini.runAction(cc.RotateBy.create(2, 360));

        this.schedule(this.resumeGrossini, 3.0);
    },
    resumeGrossini:function (time) {
        this.unschedule(this.resumeGrossini);

        var grossini = this.getChildByTag(TAG_GROSSINI);
        director.getActionManager().resumeTarget(grossini);
    }
});

var ActionManagerTestScene = TestScene.extend({
    runThisTest:function () {
        sceneIdx = -1;
        MAX_LAYER = 5;
        var layer = nextActionManagerAction();
        this.addChild(layer);
        director.replaceScene(this);
    }
});


