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


var sceneIdx = -1;

// the class inherit from TestScene
// every Scene each test used must inherit from TestScene,
// make sure the test have the menu item for back to main menu
var ActionsTestScene = TestScene.extend({
    runThisTest:function () {
        sceneIdx = -1;
        this.addChild(nextActionsTest());
        director.replaceScene(this);
    }
});


var ActionsDemo = cc.LayerGradient.extend({
    _grossini:null,
    _tamara:null,
    _kathia:null,
    _code:null,

    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.LayerGradient );
        this.init( cc.c4b(0,0,0,255), cc.c4b(98,99,117,255));
    },

    centerSprites:function (numberOfSprites) {
        var winSize = director.getWinSize();

        if (numberOfSprites === 0) {
            this._tamara.setVisible(false);
            this._kathia.setVisible(false);
            this._grossini.setVisible(false);
        } else if (numberOfSprites == 1) {
            this._tamara.setVisible(false);
            this._kathia.setVisible(false);
            this._grossini.setPosition(winSize.width / 2, winSize.height / 2);
        }
        else if (numberOfSprites == 2) {
            this._kathia.setPosition(winSize.width / 3, winSize.height / 2);
            this._tamara.setPosition(2 * winSize.width / 3, winSize.height / 2);
            this._grossini.setVisible(false);
        }
        else if (numberOfSprites == 3) {
            this._grossini.setPosition(winSize.width / 2, winSize.height / 2);
            this._tamara.setPosition(winSize.width / 4, winSize.height / 2);
            this._kathia.setPosition(3 * winSize.width / 4, winSize.height / 2);
        }
    },
    alignSpritesLeft:function (numberOfSprites) {
        var s = director.getWinSize();

        if (numberOfSprites == 1) {
            this._tamara.setVisible(false);
            this._kathia.setVisible(false);
            this._grossini.setPosition(60, s.height / 2);
        }
        else if (numberOfSprites == 2) {
            this._kathia.setPosition(60, s.height / 3);
            this._tamara.setPosition(60, 2 * s.height / 3);
            this._grossini.setVisible(false);
        }
        else if (numberOfSprites == 3) {
            this._grossini.setPosition(60, s.height / 2);
            this._tamara.setPosition(60, 2 * s.height / 3);
            this._kathia.setPosition(60, s.height / 3);
        }
    },
    title:function () {
        return "ActionsTest";
    },
    subtitle:function () {
        return "";
    },
    onBackCallback:function (sender) {
        var s = new ActionsTestScene();
        s.addChild(previousActionsTest());
        director.replaceScene(s);
    },
    onRestartCallback:function (sender) {
        var s = new ActionsTestScene();
        s.addChild(restartActionsTest());
        director.replaceScene(s);
    },
    onNextCallback:function (sender) {
        var s = new ActionsTestScene();
        s.addChild(nextActionsTest());
        director.replaceScene(s);
    },
    onEnter:function () {
        this._super();
        this._grossini = cc.Sprite.create(s_pathGrossini);
        this._tamara = cc.Sprite.create(s_pathSister1);
        this._kathia = cc.Sprite.create(s_pathSister2);
        this.addChild(this._grossini, 1);
        this.addChild(this._tamara, 2);
        this.addChild(this._kathia, 3);
        var s = director.getWinSize();
        this._grossini.setPosition(s.width / 2, s.height / 3);
        this._tamara.setPosition(s.width / 2, 2 * s.height / 3);
        this._kathia.setPosition(s.width / 2, s.height / 2);

        // add title and subtitle
        var title = this.title();
        var label = cc.LabelTTF.create(title, "Arial", 18);
        this.addChild(label, 1);
        label.setPosition(s.width / 2, s.height - 30);

        var strSubtitle = this.subtitle();
        if (strSubtitle) {
            var l = cc.LabelTTF.create(strSubtitle, "Thonburi", 22);
            this.addChild(l, 1);
            l.setPosition(s.width / 2, s.height - 60);
        }
        if( this._code !== null ) {
            label = cc.LabelTTF.create(this._code, 'Thonburi', 16);
            label.setPosition( winSize.width/2, winSize.height-120 );
            this.addChild( label,10 );

            var labelbg = cc.LabelTTF.create(this._code, 'Thonburi', 16);
            labelbg.setColor( cc.c3b(10,10,255) );
            labelbg.setPosition( winSize.width/2 +1, winSize.height-120 -1 );
            this.addChild( labelbg,9);
        }

        // add menu
        var item1 = cc.MenuItemImage.create(s_pathB1, s_pathB2, this.onBackCallback);
        var item2 = cc.MenuItemImage.create(s_pathR1, s_pathR2, this.onRestartCallback);
        var item3 = cc.MenuItemImage.create(s_pathF1, s_pathF2, this.onNextCallback);

        var menu = cc.Menu.create(item1, item2, item3);

        menu.setPosition(0,0);

        var cs = item2.getContentSize();
        item1.setPosition( winSize.width/2 - cs.width*2, cs.height/2 );
        item2.setPosition( winSize.width/2, cs.height/2 );
        item3.setPosition( winSize.width/2 + cs.width*2, cs.height/2 );

        this.addChild(menu, 1);
    }
});

//------------------------------------------------------------------
//
// ActionManual
//
//------------------------------------------------------------------
var ActionManual = ActionsDemo.extend({
    _code:"sprite.setPosition( 10,20 );\n" +
            "sprite.setRotation( 90 );\n" +
            "sprite.setScale( 2 );",

    onEnter:function () {
        this._super();

        var s = director.getWinSize();

        this._tamara.setScaleX(2.5);
        //window.tam = this._tamara;
        this._tamara.setScaleY(-1.0);
        this._tamara.setPosition(100, 70);
        this._tamara.setOpacity(128);

        this._grossini.setRotation(120);
        this._grossini.setPosition(s.width / 2, s.height / 2);
        this._grossini.setColor(cc.c3b(255, 0, 0));

        this._kathia.setPosition(s.width - 100, s.height / 2);
        this._kathia.setColor(cc.c3b(0,0,255));
    },
    subtitle:function () {
        return "Manual Transformation";
    }
});


//------------------------------------------------------------------
//
//	ActionMove
//
//------------------------------------------------------------------
var ActionMove = ActionsDemo.extend({

    _code:"a = cc.MoveBy.create( time, cc.p(x,y) );\n" +
           "a = cc.MoveTo.create( time, cc.p(x,y) );",

    onEnter:function () {
        this._super();

        this.centerSprites(3);
        var s = director.getWinSize();

        var actionTo = cc.MoveTo.create(2, cc.p(s.width - 40, s.height - 40));

        var actionBy = cc.MoveBy.create(2, cc.p(80, 80));
        var actionByBack = actionBy.reverse();

        this._tamara.runAction(actionTo);
        this._grossini.runAction(cc.Sequence.create(actionBy, actionByBack));
        this._kathia.runAction(cc.MoveTo.create(1, cc.p(40, 40)));
    },
    subtitle:function () {
        return "MoveTo / MoveBy";
    }
});

//------------------------------------------------------------------
//
// ActionScale
//
//------------------------------------------------------------------
var ActionScale = ActionsDemo.extend({

    _code:"a = cc.ScaleBy.create( time, scale );\n" +
               "a = cc.ScaleTo.create( time, scaleX, scaleY );",

    onEnter:function () {
        this._super();

        this.centerSprites(3);

        var actionTo = cc.ScaleTo.create(2, 0.5);
        var actionBy = cc.ScaleBy.create(2, 2);
        var actionBy2 = cc.ScaleBy.create(2, 0.25, 4.5);

        this._tamara.runAction(actionTo);
        this._kathia.runAction(cc.Sequence.create(actionBy2, actionBy2.reverse()));
        this._grossini.runAction(cc.Sequence.create(actionBy, actionBy.reverse()));

    },
    subtitle:function () {
        return "ScaleTo / ScaleBy";
    }
});

//------------------------------------------------------------------
//
//	ActionSkew
//
//------------------------------------------------------------------
var ActionSkew = ActionsDemo.extend({

    _code:"a = cc.SkewBy.create( time, skew );\n" +
           "a = cc.SkewTo.create( time, skewX, skewY );",

    onEnter:function () {
        this._super();
        this.centerSprites(3);
        var actionTo = cc.SkewTo.create(2, 37.2, -37.2);
        var actionToBack = cc.SkewTo.create(2, 0, 0);
        var actionBy = cc.SkewBy.create(2, 0, -90);
        var actionBy2 = cc.SkewBy.create(2, 45.0, 45.0);

        this._tamara.runAction(cc.Sequence.create(actionTo, actionToBack));
        this._grossini.runAction(cc.Sequence.create(actionBy, actionBy.reverse()));

        this._kathia.runAction(cc.Sequence.create(actionBy2, actionBy2.reverse()));
    },
    subtitle:function () {
        return "SkewTo / SkewBy";
    }
});

var ActionSkewRotateScale = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this._tamara.removeFromParent();
        this._grossini.removeFromParent();
        this._kathia.removeFromParent();

        var winSize = director.getWinSize();

        var boxSize = cc.size(100.0, 100.0);
        var box = cc.LayerColor.create(cc.c4b(255, 255, 0, 255));
        box.setAnchorPoint(cc.p(0, 0));
        box.setPosition((winSize.width - boxSize.width) / 2, (winSize.height - boxSize.height) / 2);
        box.setContentSize(boxSize);

        var markrside = 10.0;
        var uL = cc.LayerColor.create(cc.c4b(255, 0, 0, 255));
        box.addChild(uL);
        uL.setContentSize(cc.size(markrside, markrside));
        uL.setPosition(0, boxSize.height - markrside);
        uL.setAnchorPoint(cc.p(0, 0));

        var uR = cc.LayerColor.create(cc.c4b(0, 0, 255, 255));
        box.addChild(uR);
        uR.setContentSize(cc.size(markrside, markrside));
        uR.setPosition(boxSize.width - markrside, boxSize.height - markrside);
        uR.setAnchorPoint(cc.p(0, 0));


        this.addChild(box);
        var actionTo = cc.SkewTo.create(2, 0, 2);
        var rotateTo = cc.RotateTo.create(2, 61.0);
        var actionScaleTo = cc.ScaleTo.create(2, -0.44, 0.47);

        var actionScaleToBack = cc.ScaleTo.create(2, 1.0, 1.0);
        var rotateToBack = cc.RotateTo.create(2, 0);
        var actionToBack = cc.SkewTo.create(2, 0, 0);

        box.runAction(cc.Sequence.create(actionTo, actionToBack));
        box.runAction(cc.Sequence.create(rotateTo, rotateToBack));
        box.runAction(cc.Sequence.create(actionScaleTo, actionScaleToBack));
    },
    subtitle:function () {
        return "Skew + Rotate + Scale";
    }
});

//------------------------------------------------------------------
//
//	ActionRotate
//
//------------------------------------------------------------------
var ActionRotate = ActionsDemo.extend({

    _code:"a = cc.RotateBy.create( time, degrees );\n" +
            "a = cc.RotateTo.create( time, degrees );",

    onEnter:function () {
        this._super();
        this.centerSprites(3);
        var actionTo = cc.RotateTo.create(2, 45);
        var actionTo2 = cc.RotateTo.create(2, -45);
        var actionTo0 = cc.RotateTo.create(2, 0);
        this._tamara.runAction(cc.Sequence.create(actionTo, actionTo0));

        var actionBy = cc.RotateBy.create(2, 360);
        var actionByBack = actionBy.reverse();
        this._grossini.runAction(cc.Sequence.create(actionBy, actionByBack));

        this._kathia.runAction(cc.Sequence.create(actionTo2, actionTo0.copy()));

    },
    subtitle:function () {
        return "RotateTo / RotateBy";
    }
});


//------------------------------------------------------------------
//
// ActionJump
//
//------------------------------------------------------------------
var ActionJump = ActionsDemo.extend({
    _code: "a = cc.JumpBy.create( time, point, height, #_of_jumps );\n" +
           "a = cc.JumpTo.create( time, point, height, #_of_jumps );",

    onEnter:function () {
        this._super();
        this.centerSprites(3);

        var actionTo = cc.JumpTo.create(2, cc.p(300, 300), 50, 4);
        var actionBy = cc.JumpBy.create(2, cc.p(300, 0), 50, 4);
        var actionUp = cc.JumpBy.create(2, cc.p(0, 0), 80, 4);
        var actionByBack = actionBy.reverse();

        this._tamara.runAction(actionTo);
        this._grossini.runAction(cc.Sequence.create(actionBy, actionByBack));
        this._kathia.runAction(cc.RepeatForever.create(actionUp));

    },
    subtitle:function () {
        return "JumpTo / JumpBy";
    }
});
//------------------------------------------------------------------
//
// ActionBezier
//
//------------------------------------------------------------------
var ActionBezier = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        var s = director.getWinSize();

        //
        // startPosition can be any coordinate, but since the movement
        // is relative to the Bezier curve, make it (0,0)
        //

        this.centerSprites(3);

        // sprite 1

        // 3 and only 3 control points should be used for Bezier actions.
        var controlPoints = [ cc.p(0, s.height / 2),
                                cc.p(300, -s.height / 2),
                                cc.p(300, 100) ];

        var bezierForward = cc.BezierBy.create(3, controlPoints);
        var rep = cc.RepeatForever.create(cc.Sequence.create(bezierForward, bezierForward.reverse()));

        // sprite 2
        this._tamara.setPosition(80, 160);

        // 3 and only 3 control points should be used for Bezier actions.
        var controlPoints2 = [ cc.p(100, s.height / 2),
                                cc.p(200, -s.height / 2),
                                cc.p(240, 160) ];
        var bezierTo1 = cc.BezierTo.create(2, controlPoints2);

        // // sprite 3
        var controlPoints3 = controlPoints2.slice();
        this._kathia.setPosition(400, 160);
        var bezierTo2 = cc.BezierTo.create(2, controlPoints3);

        this._grossini.runAction(rep);
        this._tamara.runAction(bezierTo1);
        this._kathia.runAction(bezierTo2);

    },
    subtitle:function () {
        return "BezierBy / BezierTo";
    }
});
//------------------------------------------------------------------
//
// Issue1008
//
//------------------------------------------------------------------
var Issue1008 = ActionsDemo.extend({
    onEnter:function () {
        this._super();

        this.centerSprites(1);

        // sprite 1

        this._grossini.setPosition(428,279);

        // 3 and only 3 control points should be used for Bezier actions.
        var controlPoints1 = [ cc.p(428,279), cc.p(100,100), cc.p(100,100)];
        var controlPoints2 = [ cc.p(100,100), cc.p(428,279), cc.p(428,279)];

        var bz1 = cc.BezierTo.create(3, controlPoints1);
        var bz2 = cc.BezierTo.create(3, controlPoints2);
        var trace = cc.CallFunc.create(this.onTrace, this);

        var rep = cc.RepeatForever.create(cc.Sequence.create(bz1, bz2, trace));

        this._grossini.runAction(rep);

    },
    onTrace:function (sender){
        var pos = sender.getPosition();
        cc.log("Position x: " + pos.x + ' y:' + pos.y);
        if( pos.x != 428 || pos.y != 279)
            cc.log("Error: Issue 1008 is still open");
    },
    title:function () {
        return "Issue 1008";
    },
    subtitle:function () {
        return "BezierTo + Repeat. See console";
    }
});
//------------------------------------------------------------------
//
// ActionBlink
//
//------------------------------------------------------------------
var ActionBlink = ActionsDemo.extend({
    _code: "a = cc.Blink.create( time, #_of_blinks );",

    onEnter:function () {
        this._super();
        this.centerSprites(2);

        var action1 = cc.Blink.create(2, 10);
        var action2 = cc.Blink.create(2, 5);

        this._tamara.runAction(action1);
        this._kathia.runAction(action2);

    },
    subtitle:function () {
        return "Blink";
    }
});
//------------------------------------------------------------------
//
// ActionFade
//
//------------------------------------------------------------------
var ActionFade = ActionsDemo.extend({
    _code:"a = cc.FadeIn.create( time );\n" +
            "a = cc.FadeOut.create( time );",

    onEnter:function () {
        this._super();
        this.centerSprites(2);
        this._tamara.setOpacity(0);
        var action1 = cc.FadeIn.create(1.0);
        var action1Back = action1.reverse();

        var action2 = cc.FadeOut.create(1.0);
        var action2Back = action2.reverse();

        this._tamara.runAction(cc.Sequence.create(action1, action1Back));
        this._kathia.runAction(cc.Sequence.create(action2, action2Back));


    },
    subtitle:function () {
        return "FadeIn / FadeOut";
    }
});
//------------------------------------------------------------------
//
// ActionTint
//
//------------------------------------------------------------------
var ActionTint = ActionsDemo.extend({

    _code:"a = cc.TintBy.create( time, red, green, blue );\n" +
            "a = cc.TintTo.create( time, red, green, blue );",

    onEnter:function () {
        this._super();
        this.centerSprites(2);

        var action1 = cc.TintTo.create(2, 255, 0, 255);
        var action2 = cc.TintBy.create(2, -127, -255, -127);
        var action2Back = action2.reverse();

        this._tamara.runAction(action1);
        this._kathia.runAction(cc.Sequence.create(action2, action2Back));

    },
    subtitle:function () {
        return "TintTo / TintBy";
    }
});

//------------------------------------------------------------------
//
// ActionAnimate
//
//------------------------------------------------------------------
var ActionAnimate = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(3);

        //
        // Manual animation
        //
        var animation = cc.Animation.create();
        for (var i = 1; i < 15; i++) {
            var frameName = "res/Images/grossini_dance_" + ((i < 10) ? ("0" + i) : i) + ".png";
            animation.addSpriteFrameWithFile(frameName);
        }
        animation.setDelayPerUnit(2.8 / 14);
        animation.setRestoreOriginalFrame(true);

        var action = cc.Animate.create(animation);
        this._grossini.runAction(cc.Sequence.create(action, action.reverse()));

        //
        // File animation
        //
        // With 2 loops and reverse
        var animCache = cc.AnimationCache.getInstance();

        animCache.addAnimations(s_animations2Plist);
        var animation2 = animCache.getAnimation("dance_1");

        var action2 = cc.Animate.create(animation2);
        this._tamara.runAction(cc.Sequence.create(action2, action2.reverse()));

        //
        // File animation
        //
        // with 4 loops
        var animation3 = animation2.copy();
        animation3.setLoops(4);

        var action3 = cc.Animate.create(animation3);
        this._kathia.runAction(action3);
    },

    title:function () {
        return "Animation";
    },

    subtitle:function () {
        return "Center: Manual animation. Border: using file format animation";
    }
});
//------------------------------------------------------------------
//
//	ActionSequence
//
//------------------------------------------------------------------
var ActionSequence = ActionsDemo.extend({

    _code:"a = cc.Sequence.create( a1, a2, a3,..., aN);",

    onEnter:function () {
        this._super();
        this.alignSpritesLeft(1);

        var action = cc.Sequence.create(
            cc.MoveBy.create(2, cc.p(240, 0)),
            cc.RotateBy.create(2, 540)
            );

        this._grossini.runAction(action);

    },
    subtitle:function () {
        return "Sequence: Move + Rotate";
    }
});
//------------------------------------------------------------------
//
//	ActionSequence2
//
//------------------------------------------------------------------
var ActionSequence2 = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(1);
        this._grossini.setVisible(false);
        var action = cc.Sequence.create(
            cc.Place.create(cc.p(200, 200)),
            cc.Show.create(),
            cc.MoveBy.create(1, cc.p(100, 0)),
            cc.CallFunc.create(this.onCallback1, this),
            cc.CallFunc.create(this.onCallback2.bind(this)),
            cc.CallFunc.create(this.onCallback3, this));
        this._grossini.runAction(action);

    },
    onCallback1:function () {
        var s = director.getWinSize();
        var label = cc.LabelTTF.create("callback 1 called", "Marker Felt", 16);
        label.setPosition(s.width / 4 * 1, s.height / 2);

        this.addChild(label);
    },
    onCallback2:function () {
        var s = director.getWinSize();
        var label = cc.LabelTTF.create("callback 2 called", "Marker Felt", 16);
        label.setPosition(s.width / 4 * 2, s.height / 2);

        this.addChild(label);
    },
    onCallback3:function () {
        var s = director.getWinSize();
        var label = cc.LabelTTF.create("callback 3 called", "Marker Felt", 16);
        label.setPosition(s.width / 4 * 3, s.height / 2);

        this.addChild(label);
    },
    subtitle:function () {
        return "Sequence of InstantActions";
    }
});
//------------------------------------------------------------------
//
//	ActionCallFunc1
//
//------------------------------------------------------------------
var ActionCallFunc1 = ActionsDemo.extend({
    _code:"a = cc.CallFunc.create( this.callback );\n" +
            "a = cc.CallFunc.create( this.callback, this, optional_arg );",

    onEnter:function () {
        this._super();
        this.centerSprites(3);

        // Testing different ways to pass "this"
        var action = cc.Sequence.create(
            cc.MoveBy.create(2, cc.p(200, 0)),
            cc.CallFunc.create(this.onCallback1.bind(this))  // 'this' is bound to the callback function using "bind"
        );

        var action2 = cc.Sequence.create(
            cc.ScaleBy.create(2, 2),
            cc.FadeOut.create(2),
            cc.CallFunc.create(this.onCallback2, this)      // 'this' is passed as 2nd argument.
        );

        var action3 = cc.Sequence.create(
            cc.RotateBy.create(3, 360),
            cc.FadeOut.create(2),
            cc.CallFunc.create(this.onCallback3, this, "Hi!")  // If you want to pass a optional value, like "Hi!", then you should pass 'this' too
        );

        this._grossini.runAction(action);
        this._tamara.runAction(action2);
        this._kathia.runAction(action3);

    },
    onCallback1:function (nodeExecutingAction, value) {
        var s = director.getWinSize();
        var label = cc.LabelTTF.create("callback 1 called", "Marker Felt", 16);
        label.setPosition(s.width / 4 * 1, s.height / 2);
        this.addChild(label);
    },
    onCallback2:function (nodeExecutingAction, value) {
        var s = director.getWinSize();
        var label = cc.LabelTTF.create("callback 2 called", "Marker Felt", 16);
        label.setPosition(s.width / 4 * 2, s.height / 2);

        this.addChild(label);
    },
    onCallback3:function (nodeExecutingAction, value) {
        var s = director.getWinSize();
        var label = cc.LabelTTF.create("callback 3 called:" + value, "Marker Felt", 16);
        label.setPosition(s.width / 4 * 3, s.height / 2);
        this.addChild(label);
    },
    subtitle:function () {
        return "Callbacks: CallFunc and friends";
    }
});
//------------------------------------------------------------------
//
// ActionCallFunc2
//
//------------------------------------------------------------------
var ActionCallFunc2 = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(1);

        var action = cc.Sequence.create(cc.MoveBy.create(2.0, cc.p(200, 0)),
            cc.CallFunc.create(this.removeFromParentAndCleanup, this._grossini, true));

        this._grossini.runAction(action);
    },

    removeFromParentAndCleanup:function (nodeExecutingAction, data) {
        nodeExecutingAction.removeFromParent(data);
    },

    title:function () {
        return "CallFunc + auto remove";
    },
    subtitle:function () {
        return "CallFunc + removeFromParentAndCleanup. Grossini dissapears in 2s";
    }
});

//------------------------------------------------------------------
//
// ActionCallFunc3
//
//------------------------------------------------------------------
var ActionCallFunc3 = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(1);

        var action = cc.CallFunc.create(function(nodeExecutingAction, value) {
            cc.log("Object: " + nodeExecutingAction + " value is: " + value);
        }, this, "Hello world");

        this.runAction(action);
    },

    removeFromParentAndCleanup:function (nodeExecutingAction, data) {
        nodeExecutingAction.removeFromParent(data);
    },

    title:function () {
        return "CallFunc + parameters";
    },
    subtitle:function () {
        return "CallFunc + parameters. Take a look at the console";
    }
});

//------------------------------------------------------------------
//
// ActionSpawn
//
//------------------------------------------------------------------
var ActionSpawn = ActionsDemo.extend({

    _code:"a = cc.Spawn.create( a1, a2, ..., aN );",

    onEnter:function () {
        this._super();
        this.alignSpritesLeft(1);

        var action = cc.Spawn.create(
            cc.JumpBy.create(2, cc.p(300, 0), 50, 4),
            cc.RotateBy.create(2, 720));

        this._grossini.runAction(action);

    },
    subtitle:function () {
        return "Spawn: Jump + Rotate";
    }
});
//------------------------------------------------------------------
//
// ActionRepeatForever
//
//------------------------------------------------------------------
var ActionRepeatForever = ActionsDemo.extend({
    _code:"a = cc.RepeatForever.create( action_to_repeat );",

    onEnter:function () {
        this._super();
        this.centerSprites(1);
        var action = cc.Sequence.create(
            cc.DelayTime.create(1),
            cc.CallFunc.create(this.repeatForever));    // not passing 'this' since it is not used by the callback func

        this._grossini.runAction(action);


    },
    repeatForever:function (sender) {
        var repeat = cc.RepeatForever.create(cc.RotateBy.create(1.0, 360));
        sender.runAction(repeat);
    },
    subtitle:function () {
        return "CallFuncN + RepeatForever";
    }
});
//------------------------------------------------------------------
//
// ActionRotateToRepeat
//
//------------------------------------------------------------------
var ActionRotateToRepeat = ActionsDemo.extend({
    _code:"a = cc.Repeat.create( action_to_repeat, #_of_times );",

    onEnter:function () {
        this._super();
        this.centerSprites(2);

        var act1 = cc.RotateTo.create(1, 90);
        var act2 = cc.RotateTo.create(1, 0);
        var seq = cc.Sequence.create(act1, act2);
        var rep1 = cc.RepeatForever.create(seq);
        var rep2 = cc.Repeat.create((seq.copy()), 10);

        this._tamara.runAction(rep1);
        this._kathia.runAction(rep2);

    },
    subtitle:function () {
        return "Repeat/RepeatForever + RotateTo";
    }
});
//------------------------------------------------------------------
//
// ActionRotateJerk
//
//------------------------------------------------------------------
var ActionRotateJerk = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(2);
        var seq = cc.Sequence.create(
            cc.RotateTo.create(0.5, -20),
            cc.RotateTo.create(0.5, 20));

        var rep1 = cc.Repeat.create(seq, 10);
        var rep2 = cc.RepeatForever.create((seq.copy()));

        this._tamara.runAction(rep1);
        this._kathia.runAction(rep2);
    },
    subtitle:function () {
        return "RepeatForever / Repeat + Rotate";
    }
});
//------------------------------------------------------------------
//
// ActionReverse
//
//------------------------------------------------------------------
var ActionReverse = ActionsDemo.extend({

    _code:"a = action.reverse();",

    onEnter:function () {
        this._super();
        this.alignSpritesLeft(1);

        var jump = cc.JumpBy.create(2, cc.p(300, 0), 50, 4);
        var action = cc.Sequence.create(jump, jump.reverse());

        this._grossini.runAction(action);
    },
    subtitle:function () {
        return "Reverse an action";
    }
});
//------------------------------------------------------------------
//
// ActionDelayTime
//
//------------------------------------------------------------------
var ActionDelayTime = ActionsDemo.extend({

    _code:"a = cc.DelayTime.create( time );",

    onEnter:function () {
        this._super();
        this.alignSpritesLeft(1);

        var move = cc.MoveBy.create(1, cc.p(150, 0));
        var action = cc.Sequence.create(move, cc.DelayTime.create(2), move);

        this._grossini.runAction(action);
    },
    subtitle:function () {
        return "DelayTime: m + delay + m";
    }
});
//------------------------------------------------------------------
//
// ActionReverseSequence
//
//------------------------------------------------------------------
var ActionReverseSequence = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.alignSpritesLeft(1);

        var move1 = cc.MoveBy.create(1, cc.p(250, 0));
        var move2 = cc.MoveBy.create(1, cc.p(0, 50));
        var seq = cc.Sequence.create(move1, move2, move1.reverse());
        var action = cc.Sequence.create(seq, seq.reverse());

        this._grossini.runAction(action);

    },
    subtitle:function () {
        return "Reverse a sequence";
    }
});
//------------------------------------------------------------------
//
// ActionReverseSequence2
//
//------------------------------------------------------------------
var ActionReverseSequence2 = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.alignSpritesLeft(2);


        // Test:
        //   Sequence should work both with IntervalAction and InstantActions
        var move1 = cc.MoveBy.create(3, cc.p(250, 0));
        var move2 = cc.MoveBy.create(3, cc.p(0, 50));
        var tog1 = cc.ToggleVisibility.create();
        var tog2 = cc.ToggleVisibility.create();
        var seq = cc.Sequence.create(move1, tog1, move2, tog2, move1.reverse());
        var action = cc.Repeat.create(
            cc.Sequence.create(seq, seq.reverse()), 3
        );


        // Test:
        //   Also test that the reverse of Hide is Show, and vice-versa
        this._kathia.runAction(action);

        var move_tamara = cc.MoveBy.create(1, cc.p(100, 0));
        var move_tamara2 = cc.MoveBy.create(1, cc.p(50, 0));
        var hide = cc.Hide.create();
        var seq_tamara = cc.Sequence.create(move_tamara, hide, move_tamara2);
        var seq_back = seq_tamara.reverse();
        this._tamara.runAction(cc.Sequence.create(seq_tamara, seq_back));
    },
    subtitle:function () {
        return "Reverse sequence 2";
    }
});
//------------------------------------------------------------------
//
// ActionRepeat
//
//------------------------------------------------------------------
var ActionRepeat = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.alignSpritesLeft(2);


        var a1 = cc.MoveBy.create(1, cc.p(150, 0));
        var action1 = cc.Repeat.create(
            cc.Sequence.create(cc.Place.create(cc.p(60, 60)), a1),
            3);
        var action2 = cc.RepeatForever.create(
            (cc.Sequence.create((a1.copy()), a1.reverse()))
        );

        this._kathia.runAction(action1);
        this._tamara.runAction(action2);
    },
    subtitle:function () {
        return "Repeat / RepeatForever actions";
    }
});
//------------------------------------------------------------------
//
// ActionOrbit
//
//------------------------------------------------------------------
var ActionOrbit = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(3);

        var orbit1 = cc.OrbitCamera.create(2, 1, 0, 0, 180, 0, 0);
        var action1 = cc.Sequence.create(
            orbit1,
            orbit1.reverse());

        var orbit2 = cc.OrbitCamera.create(2, 1, 0, 0, 180, -45, 0);
        var action2 = cc.Sequence.create(
            orbit2,
            orbit2.reverse());

        var orbit3 = cc.OrbitCamera.create(2, 1, 0, 0, 180, 90, 0);
        var action3 = cc.Sequence.create(
            orbit3,
            orbit3.reverse());

        this._kathia.runAction(cc.RepeatForever.create(action1));
        this._tamara.runAction(cc.RepeatForever.create(action2));
        this._grossini.runAction(cc.RepeatForever.create(action3));

        var move = cc.MoveBy.create(3, cc.p(100, -100));
        var move_back = move.reverse();
        var seq = cc.Sequence.create(move, move_back);
        var rfe = cc.RepeatForever.create(seq);
        this._kathia.runAction(rfe);
        this._tamara.runAction((rfe.copy()));
        this._grossini.runAction((rfe.copy()));

    },
    subtitle:function () {
        return "OrbitCamera action";
    }
});
//------------------------------------------------------------------
//
// ActionFollow
//
//------------------------------------------------------------------
var ActionFollow = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(1);
        var s = director.getWinSize();

        this._grossini.setPosition(-(s.width/2), s.height / 2);
        var move = cc.MoveBy.create(2, cc.p(s.width * 3, 0));
        var move_back = move.reverse();
        var seq = cc.Sequence.create(move, move_back);
        var rep = cc.RepeatForever.create(seq);

        this._grossini.runAction(rep);

        this.runAction(cc.Follow.create(this._grossini, cc.rect(0, 0, s.width * 2 - 100, s.height)));
    },
    subtitle:function () {
        return "Follow action";
    }
});

//------------------------------------------------------------------
//
// ActionCardinalSpline
//
//------------------------------------------------------------------
var ActionCardinalSpline = ActionsDemo.extend({
    _array:null,

    _code:" a = cc.CadinalSplineBy.create( time, array_of_points, tension );\n" +
            " a = cc.CadinalSplineTo.create( time, array_of_points, tension );",

    ctor:function () {
        this._super();
        this._array = [];
    },

    onEnter:function () {
        this._super();

        this.centerSprites(2);

        var array = [
            cc.p(0, 0),
            cc.p(winSize.width / 2 - 30, 0),
            cc.p(winSize.width / 2 - 30, winSize.height - 80),
            cc.p(0, winSize.height - 80),
            cc.p(0, 0)
            ];

        //
        // sprite 1 (By)
        //
        // Spline with no tension (tension==0)
        //
        var action1 = cc.CardinalSplineBy.create(3, array, 0);
        var reverse1 = action1.reverse();
        var seq = cc.Sequence.create(action1, reverse1);

        this._tamara.setPosition(50, 50);
        this._tamara.runAction(seq);

        //
        // sprite 2 (By)
        //
        // Spline with high tension (tension==1)
        //
        var action2 = cc.CardinalSplineBy.create(3, array, 1);
        var reverse2 = action2.reverse();
        var seq2 = cc.Sequence.create(action2, reverse2);

        this._kathia.setPosition(winSize.width / 2, 50);
        this._kathia.runAction(seq2);

        this._array = array;
    },

    draw:function (ctx) {
        // Draw is only supported in cocos2d-html5.
        // Not supported yet on cocos2d-iphone / cocos2d-x + JSB
        this._super();

        var context = ctx || cc.renderContext;

        var apPoint = this.getAnchorPointInPoints();
        // move to 50,50 since the "by" path will start at 50,50
        context.save();
        context.translate(50 - apPoint.x ,  apPoint.y -50);
        cc.drawingUtil.drawCardinalSpline(this._array, 0, 100);
        context.restore();

        var s = director.getWinSize();

        context.save();
        context.translate(s.width / 2 - apPoint.x ,  apPoint.y - 50);
        cc.drawingUtil.drawCardinalSpline(this._array, 1, 100);
        context.restore();
    },
    subtitle:function () {
        return "Cardinal Spline paths. Testing different tensions for one array";
    },
    title:function () {
        return "CardinalSplineBy / CardinalSplineAt";
    }
});

//------------------------------------------------------------------
//
// ActionCatmullRom
//
//------------------------------------------------------------------
var ActionCatmullRom = ActionsDemo.extend({
    _array1:null,
    _array2:null,

    _code:"a = cc.CatmullRomBy.create( time, array_of_points );\n" +
            " a = cc.CatmullRomTo.create( time, array_of_points );",

    ctor:function () {
        this._super();
        this._array1 = [];
        this._array2 = [];
    },

    onEnter:function () {
        this._super();

        this.centerSprites(2);

        //
        // sprite 1 (By)
        //
        // startPosition can be any coordinate, but since the movement
        // is relative to the Catmull Rom curve, it is better to start with (0,0).
        //
        this._tamara.setPosition(50, 50);

        var array = [
                cc.p(0, 0),
                cc.p(80, 80),
                cc.p(winSize.width - 80, 80),
                cc.p(winSize.width - 80, winSize.height - 80),
                cc.p(80, winSize.height - 80),
                cc.p(80, 80),
                cc.p(winSize.width / 2, winSize.height / 2)
                ];

        var action1 = cc.CatmullRomBy.create(3, array);
        var reverse1 = action1.reverse();
        var seq1 = cc.Sequence.create(action1, reverse1);

        this._tamara.runAction(seq1);

        //
        // sprite 2 (To)
        //
        // The startPosition is not important here, because it uses a "To" action.
        // The initial position will be the 1st point of the Catmull Rom path
        //
        var array2 = [
            cc.p(winSize.width / 2, 30),
            cc.p(winSize.width - 80, 30),
            cc.p(winSize.width - 80, winSize.height - 80),
            cc.p(winSize.width / 2, winSize.height - 80),
            cc.p(winSize.width / 2, 30) ];

        var action2 = cc.CatmullRomTo.create(3, array2);
        var reverse2 = action2.reverse();

        var seq2 = cc.Sequence.create(action2, reverse2);

        this._kathia.runAction(seq2);

        this._array1 = array;
        this._array2 = array2;
    },
    draw:function (ctx) {
        // Draw is only supported in cocos2d-html5.
        // Not supported yet on cocos2d-iphone / cocos2d-x + JSB
        this._super();
        var context = ctx || cc.renderContext;

        var apPoint = this.getAnchorPointInPoints();
        // move to 50,50 since the "by" path will start at 50,50
        context.save();
        context.translate(50 - apPoint.x, apPoint.y - 50);
        cc.drawingUtil.drawCatmullRom(this._array1, 50);
        context.restore();

        context.save();
        context.translate(- apPoint.x, apPoint.y);
        cc.drawingUtil.drawCatmullRom(this._array2, 50);
        context.restore();
    },
    subtitle:function () {
        return "Catmull Rom spline paths. Testing reverse too";
    },
    title:function () {
        return "CatmullRomBy / CatmullRomTo";
    }
});

//------------------------------------------------------------------
//
// ActionTargeted
//
//------------------------------------------------------------------
var ActionTargeted = ActionsDemo.extend({
    _code:"a = cc.TargetedAction.create( target, action );",

    onEnter:function () {
        this._super();
        this.centerSprites(2);

        var jump1 = cc.JumpBy.create(2, cc.p(0,0), 100, 3);
        var jump2 = jump1.copy();
        var rot1 = cc.RotateBy.create(1, 360);
        var rot2 = rot1.copy();

        var t1 = cc.TargetedAction.create(this._kathia, jump2);
        var t2 = cc.TargetedAction.create(this._kathia, rot2);

        var seq = cc.Sequence.create(jump1, t1, rot1, t2);
        var always = cc.RepeatForever.create(seq);

        this._tamara.runAction(always);
    },
    title:function () {
        return "Action that runs on another target. Useful for sequences";
    },
    subtitle:function () {
        return "ActionTargeted";
    }
});

//------------------------------------------------------------------
//
// ActionTargetedCopy
//
//------------------------------------------------------------------
var ActionTargetedCopy = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(2);

        var jump1 = cc.JumpBy.create(2, cc.p(0,0), 100, 3);
        var jump2 = jump1.copy();

        var t1 = cc.TargetedAction.create(this._kathia, jump2);
        var t_copy = t1.copy();

        var seq = cc.Sequence.create(jump1, t_copy);

        this._tamara.runAction(seq);
    },
    title:function () {
        return "Action that runs on another target. Useful for sequences";
    },
    subtitle:function () {
        return "Testing copy on TargetedAction";
    }
});

//------------------------------------------------------------------
//
// PauseResumeActions
//
//------------------------------------------------------------------
var PauseResumeActions = ActionsDemo.extend({
    _pausedTargets:[],
    onEnter:function () {
        this._super();
        this.centerSprites(2);

        this._tamara.runAction(cc.RepeatForever.create(cc.RotateBy.create(3, 360)));
        this._grossini.runAction(cc.RepeatForever.create(cc.RotateBy.create(3, -360)));
        this._kathia.runAction(cc.RepeatForever.create(cc.RotateBy.create(3, 360)));

        this.schedule(this.pause, 3, false, 0);
        this.schedule(this.resume, 5, false, 0);
    },

    pause:function () {
        cc.log("Pausing");
        this._pausedTargets = director.getActionManager().pauseAllRunningActions();
    },
    resume:function () {
        cc.log("Resuming");
        director.getActionManager().resumeTargets(this._pausedTargets);
    },

    title:function () {
        return "PauseResumeActions";
    },
    subtitle:function () {
        return "All actions pause at 3s and resume at 5s";
    }
});

//------------------------------------------------------------------
//
// Issue1305
//
//------------------------------------------------------------------
var Issue1305 = ActionsDemo.extend({
    _spriteTemp:null,
    onEnter:function () {
        this._super();
        this.centerSprites(0);

        this._spriteTmp = cc.Sprite.create(s_pathGrossini);
        /* c++ can't support block, so we use CCCallFuncN instead.
         [spriteTmp_ runAction:[CCCallBlockN actionWithBlock:^(CCNode* node) {
         NSLog(@"This message SHALL ONLY appear when the sprite is added to the scene, NOT BEFORE");
         }] ];
         */

        this._spriteTmp.runAction(cc.CallFunc.create(this.onLog, this));
        this.scheduleOnce(this.onAddSprite, 2);
    },
    onExit:function () {
        this._super();
    },
    onLog:function (pSender) {
        cc.log("This message SHALL ONLY appear when the sprite is added to the scene, NOT BEFORE");
    },
    onAddSprite:function (dt) {
        this._spriteTmp.setPosition(250, 250);
        this.addChild(this._spriteTmp);
    },
    title:function () {
        return "Issue 1305";
    },
    subtitle:function () {
        return "In two seconds you should see a message on the console. NOT BEFORE.";
    }
});

//------------------------------------------------------------------
//
// Issue1305_2
//
//------------------------------------------------------------------
var Issue1305_2 = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(0);

        var spr = cc.Sprite.create(s_pathGrossini);
        spr.setPosition(200, 200);
        this.addChild(spr);

        var act1 = cc.MoveBy.create(2, cc.p(0, 100));

        var act2 = cc.CallFunc.create(this.onLog1);
        var act3 = cc.MoveBy.create(2, cc.p(0, -100));
        var act4 = cc.CallFunc.create(this.onLog2, this);
        var act5 = cc.MoveBy.create(2, cc.p(100, -100));
        var act6 = cc.CallFunc.create(this.onLog3.bind(this));
        var act7 = cc.MoveBy.create(2, cc.p(-100, 0));
        var act8 = cc.CallFunc.create(this.onLog4, this);

        var actF = cc.Sequence.create(act1, act2, act3, act4, act5, act6, act7, act8);

        //    [spr runAction:actF];
        director.getActionManager().addAction(actF, spr, false);
    },
    onLog1:function () {
        cc.log("1st block");
    },
    onLog2:function () {
        cc.log("2nd block");
    },
    onLog3:function () {
        cc.log("3rd block");
    },
    onLog4:function () {
        cc.log("4th block");
    },
    title:function () {
        return "Issue 1305 #2";
    },
    subtitle:function () {
        return "See console. You should only see one message for each block";
    }
});

//------------------------------------------------------------------
//
// Issue1288
//
//------------------------------------------------------------------
var Issue1288 = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(0);

        var spr = cc.Sprite.create(s_pathGrossini);
        spr.setPosition(100, 100);
        this.addChild(spr);

        var act1 = cc.MoveBy.create(0.5, cc.p(100, 0));
        var act2 = act1.reverse();
        var act3 = cc.Sequence.create(act1, act2);
        var act4 = cc.Repeat.create(act3, 2);

        spr.runAction(act4);
    },
    title:function () {
        return "Issue 1288";
    },
    subtitle:function () {
        return "Sprite should end at the position where it started.";
    }
});

//------------------------------------------------------------------
//
// Issue1288_2
//
//------------------------------------------------------------------
var Issue1288_2 = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(0);

        var spr = cc.Sprite.create(s_pathGrossini);
        spr.setPosition(100, 100);
        this.addChild(spr);

        var act1 = cc.MoveBy.create(0.5, cc.p(100, 0));
        spr.runAction(cc.Repeat.create(act1, 1));
    },
    title:function () {
        return "Issue 1288 #2";
    },
    subtitle:function () {
        return "Sprite should move 100 pixels, and stay there";
    }
});

//------------------------------------------------------------------
//
// Issue1327
//
//------------------------------------------------------------------
var Issue1327 = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(0);

        var spr = cc.Sprite.create(s_pathGrossini);
        spr.setPosition(100, 100);
        this.addChild(spr);

        var act1 = cc.CallFunc.create(this.onLogSprRotation);
        var act2 = cc.RotateBy.create(0.25, 45);
        var act3 = cc.CallFunc.create(this.onLogSprRotation, this);
        var act4 = cc.RotateBy.create(0.25, 45);
        var act5 = cc.CallFunc.create(this.onLogSprRotation.bind(this));
        var act6 = cc.RotateBy.create(0.25, 45);
        var act7 = cc.CallFunc.create(this.onLogSprRotation);
        var act8 = cc.RotateBy.create(0.25, 45);
        var act9 = cc.CallFunc.create(this.onLogSprRotation);

        var actF = cc.Sequence.create(act1, act2, act3, act4, act5, act6, act7, act8, act9);
        spr.runAction(actF);
    },
    onLogSprRotation:function (pSender) {
        cc.log(pSender.getRotation());
    },
    title:function () {
        return "Issue 1327";
    },
    subtitle:function () {
        return "See console: You should see: 0, 45, 90, 135, 180";
    }
});

//------------------------------------------------------------------
//
// Issue1438
//
//------------------------------------------------------------------
var Issue1438 = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(2);

        //
        // manual animation
        //
        var animation = cc.Animation.create();

        // Add 60 frames
        for( var j=0; j<4; j++) {
            for (var i = 1; i < 15; i++) {
                var frameName = "res/Images/grossini_dance_" + ((i < 10) ? ("0" + i) : i) + ".png";
                animation.addSpriteFrameWithFile(frameName);
            }
        }
        // And display 60 frames per second
        animation.setDelayPerUnit(1/60);
        animation.setRestoreOriginalFrame(true);

        var action = cc.Animate.create(animation);
        this._kathia.runAction(action);

        //
        // File animation
        //
        var animCache = cc.AnimationCache.getInstance();
        animCache.addAnimations(s_animations2Plist);
        var animation2 = animCache.getAnimation("dance_1");
        animation2.setDelayPerUnit(1/60);

        var action2 = cc.Animate.create(animation2);
        this._tamara.runAction(cc.Sequence.create(action2, action2.reverse()));
    },

    title:function () {
        return "Animation";
    },

    subtitle:function () {
        return "Issue 1438. Set FPS to 30 to test this bug.";
    }
});
//-
//
// Flow control
//
var arrayOfActionsTest = [
    ActionManual,
    ActionMove,
    ActionScale,
    ActionRotate,
    ActionSkew,
    ActionSkewRotateScale,
    ActionJump,
    ActionBezier,
    Issue1008,
    ActionCardinalSpline,
    ActionCatmullRom,
    ActionBlink,
    ActionFade,
    ActionTint,
    ActionSequence,
    ActionSequence2,
    ActionSpawn,
    ActionReverse,
    ActionDelayTime,
    ActionRepeat,
    ActionRepeatForever,
    ActionRotateToRepeat,
    ActionRotateJerk,
    ActionCallFunc1,
    ActionCallFunc2,
    ActionCallFunc3,
    ActionReverseSequence,
    ActionReverseSequence2,
    ActionOrbit,
    ActionFollow,
    ActionTargeted,
    ActionTargetedCopy,
    PauseResumeActions,
    Issue1305,
    Issue1305_2,
    Issue1288,
    Issue1288_2,
    Issue1327,
    ActionAnimate,
    Issue1438
];

var nextActionsTest = function () {
    sceneIdx++;
    sceneIdx = sceneIdx % arrayOfActionsTest.length;

    return new arrayOfActionsTest[sceneIdx]();
};
var previousActionsTest = function () {
    sceneIdx--;
    if (sceneIdx < 0)
        sceneIdx += arrayOfActionsTest.length;

    return new arrayOfActionsTest[sceneIdx]();
};
var restartActionsTest = function () {
    return new arrayOfActionsTest[sceneIdx]();
};
