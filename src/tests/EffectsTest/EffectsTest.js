/****************************************************************************

 http://www.cocos2d-html5.org
 http://www.cocos2d-iphone.org
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

//
// Base Layer
//

var EffecstsBaseLayer = cc.Layer.extend({

    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Layer );
        this.init();
    },

    title:function () {
        return "Effects Test";
    },

    subtitle:function () {
        return "";
    },

    code:function () {
        return "";
    },

    // callbacks
    onRestartCallback:function (sender) {
        var s = new EffectsTestScene();
        s.addChild(restartEffectsTest());
        director.replaceScene(s);
    },
    onNextCallback:function (sender) {
        var s = new EffectsTestScene();
        s.addChild(nextEffectsTest());
        director.replaceScene(s);
    },
    onBackCallback:function (sender) {
        var s = new EffectsTestScene();
        s.addChild(previousEffectsTest());
        director.replaceScene(s);
    },
    onEnter:function () {
       this._super();

        // add title and subtitle
        var label = cc.LabelTTF.create(this.title(), "Arial", 28);
        this.addChild(label, 10);
        label.setPosition( cc.p(winSize.width / 2, winSize.height - 40));

        var strSubtitle = this.subtitle();
        if (strSubtitle !== "") {
            var l = cc.LabelTTF.create(strSubtitle, "Thonburi", 16);
            this.addChild(l, 10);
            l.setPosition( cc.p(winSize.width / 2, winSize.height - 70));
        }

        var strCode = this.code();
        if( strCode !=="" ) {
            label = cc.LabelTTF.create(strCode, 'CourierNewPSMT', 16);
            label.setPosition( cc.p( winSize.width/2, winSize.height-120) );
            this.addChild( label,10 );

            var labelbg = cc.LabelTTF.create(strCode, 'CourierNewPSMT', 16);
            labelbg.setColor( cc.c3b(10,10,255) );
            labelbg.setPosition( cc.p( winSize.width/2 +1, winSize.height-120 -1) );
            this.addChild( labelbg,9);
        }

        // Menu
        var item1 = cc.MenuItemImage.create(s_pathB1, s_pathB2, this.onBackCallback, this);
        var item2 = cc.MenuItemImage.create(s_pathR1, s_pathR2, this.onRestartCallback, this);
        var item3 = cc.MenuItemImage.create(s_pathF1, s_pathF2, this.onNextCallback, this);

        var menu = cc.Menu.create(item1, item2, item3);

        menu.setPosition( cc.p(0,0) );
        item1.setPosition( cc.p(winSize.width / 2 - 100, 30));
        item2.setPosition( cc.p(winSize.width / 2, 30));
        item3.setPosition( cc.p(winSize.width / 2 + 100, 30));

        this.addChild(menu, 10);


        // Specific to Effects

        var node = cc.Node.create();
        node.runAction( this.getEffect(3) );
        this.addChild( node );

        var bg = cc.Sprite.create(s_back3);
        bg.setPosition( cc._p( winSize.width/2, winSize.height/2) );
        node.addChild( bg );

        var sister1 = cc.Sprite.create(s_pathSister1);
        sister1.setPosition( cc._p( winSize.width/3, winSize.height/2 ) );
        node.addChild( sister1, 1 );

        var sister2 = cc.Sprite.create(s_pathSister2);
        sister2.setPosition( cc._p( winSize.width*2/3, winSize.height/2 ) );
        node.addChild( sister2, 1 );

		var sc = cc.ScaleBy.create(2, 5);
        var sc_back = sc.reverse();
        var seq = cc.Sequence.create( sc, sc_back );
        var repeat = cc.RepeatForever.create( seq );

        sister1.runAction( repeat );
        sister2.runAction( repeat.copy() );
    },

    getEffect:function(duration) {
        // override me
        return cc.MoveBy.create(2, cc._p(10,10) );
    }
});

//------------------------------------------------------------------
//
// Tests
//
//------------------------------------------------------------------
var Shaky3DTest = EffecstsBaseLayer.extend({
    subtitle:function () {
        return "Shaky 3D";
    },
    code:function () {
        return "a = cc.Shaky3D.create(range, shakeZ, gridSize, duration )";
    },
    getEffect:function(duration) {
        return cc.Shaky3D.create(5, false, cc.g(15,10), duration );
    }
});

var Waves3DTest = EffecstsBaseLayer.extend({
    subtitle:function () {
        return "Waves 3D";
    },
    code:function () {
        return "a = cc.Waves3D.create(range, shakeZ, gridSize, duration )";
    },
    getEffect:function(duration) {
        return cc.Waves3D.create(5, 40, cc.g(15,10), duration );
    }
});

var FlipXTest = EffecstsBaseLayer.extend({
    subtitle:function () {
        return "FlipX3D";
    },
    code:function () {
        return "a = cc.FlipX3D.create(duration )";
    },
    getEffect:function(duration) {
        var a = cc.FlipX3D.create(duration );
        var delay = cc.DelayTime.create(2);
        var r = a.reverse();
        return cc.Sequence.create( a, delay, r );
    }
});

var FlipYTest = EffecstsBaseLayer.extend({
    subtitle:function () {
        return "FlipY3D";
    },
    code:function () {
        return "a = cc.FlipY3D.create(duration )";
    },
    getEffect:function(duration) {
        var a = cc.FlipY3D.create(duration );
        var delay = cc.DelayTime.create(2);
        var r = a.reverse();
        return cc.Sequence.create( a, delay, r );
    }
});

//
// Order of tests
//
var EffectsTestScene = TestScene.extend({
    runThisTest:function () {
        sceneIdx = -1;
        var layer = nextEffectsTest();
        this.addChild(layer);

        director.replaceScene(this);
    }
});

//
// Flow control
//
var arrayOfEffectsTest = [
    Shaky3DTest,
    Waves3DTest,
    FlipXTest,
    FlipYTest
];

var nextEffectsTest = function () {
    sceneIdx++;
    sceneIdx = sceneIdx % arrayOfEffectsTest.length;

    return new arrayOfEffectsTest[sceneIdx]();
};
var previousEffectsTest = function () {
    sceneIdx--;
    if (sceneIdx < 0)
        sceneIdx += arrayOfEffectsTest.length;

    return new arrayOfEffectsTest[sceneIdx]();
};
var restartEffectsTest = function () {
    return new arrayOfEffectsTest[sceneIdx]();
};
