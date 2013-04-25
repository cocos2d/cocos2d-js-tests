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
cc.TAG_LAYER = 1;

var layerTestSceneIdx = -1;

var LayerTestScene = TestScene.extend({
    runThisTest:function () {
        layerTestSceneIdx = -1;
        this.addChild(nextLayerTest());
        director.replaceScene(this);
    }
});

//------------------------------------------------------------------
//
// LayerTest
//
//------------------------------------------------------------------
var LayerTest = BaseTestLayer.extend({
    _title:null,


    title:function () {
        return "No title";
    },
    subtitle:function () {
        return "";
    },

    onRestartCallback:function (sender) {
        var s = new LayerTestScene();
        s.addChild(restartLayerTest());
        director.replaceScene(s);

    },
    onNextCallback:function (sender) {
        var s = new LayerTestScene();
        s.addChild(nextLayerTest());
        director.replaceScene(s);

    },
    onBackCallback:function (sender) {
        var s = new LayerTestScene();
        s.addChild(previousLayerTest());
        director.replaceScene(s);

    },
    // automation
    numberOfPendingTests:function() {
        return ( (arrayOfLayerTest.length-1) - layerTestSceneIdx );
    },

    getTestNumber:function() {
        return layerTestSceneIdx;
    }

});

//------------------------------------------------------------------
//
// LayerTest1
//
//------------------------------------------------------------------
var LayerTest1 = LayerTest.extend({
    onEnter:function () {
        this._super();

        if( 'touches' in sys.capabilities )
            this.setTouchEnabled(true);
        else if ('mouse' in sys.capabilities )
            this.setMouseEnabled(true);

        var s = director.getWinSize();
        var layer = cc.LayerColor.create(cc.c4b(255, 0, 0, 128), 200, 200);

        layer.ignoreAnchorPointForPosition(false);
        layer.setPosition(cc.p(s.width / 2, s.height / 2));
        this.addChild(layer, 1, cc.TAG_LAYER);
    },
    title:function () {
        return "ColorLayer resize (tap & move)";
    },

    updateSize:function (location) {
        var newSize = cc.size(Math.abs(location.x - winSize.width / 2) * 2, Math.abs(location.y - winSize.height / 2) * 2);
        var l = this.getChildByTag(cc.TAG_LAYER);

        l.setContentSize(newSize);
    },

    // events
    onMouseDragged : function( event ) {
        var location = event.getLocation();
        this.updateSize(location);
        return true;
    },
    onTouchesMoved:function (touches, event) {
        this.updateSize( touches[0].getLocation() );
    }
});

var IgnoreAnchorpointTest1 = LayerTest.extend({
    onEnter:function () {
        this._super();
        //create layer
        var ws = director.getWinSize();
        var layer1 = cc.LayerColor.create(cc.c4b(255, 100, 100, 128), ws.width / 2, ws.height / 2);
        layer1.ignoreAnchorPointForPosition(true);
        var layer2 = cc.LayerColor.create(cc.c4b(100, 255, 100, 128), ws.width / 4, ws.height / 4);
        layer2.ignoreAnchorPointForPosition(true);
        layer1.addChild(layer2);
        layer1.setPosition(ws.width / 2, ws.height / 2);
        this.addChild(layer1);
    },
    title:function () {
        return "ignore Anchorpoint Test #1";
    },
    subtitle:function () {
        return "red:true  green:true";
    }
});
var IgnoreAnchorpointTest2 = LayerTest.extend({
    onEnter:function () {
        this._super();
        //create layer
        var ws = director.getWinSize();
        var layer1 = cc.LayerColor.create(cc.c4b(255, 100, 100, 128), ws.width / 2, ws.height / 2);
        layer1.ignoreAnchorPointForPosition(true);
        var layer2 = cc.LayerColor.create(cc.c4b(100, 255, 100, 128), ws.width / 4, ws.height / 4);
        layer2.ignoreAnchorPointForPosition(false);
        layer1.addChild(layer2);
        layer1.setPosition(ws.width / 2, ws.height / 2);
        this.addChild(layer1);
    },
    title:function () {
        return "ignore Anchorpoint Test #2";
    },
    subtitle:function () {
        return "red:true  green:false";
    }
});
var IgnoreAnchorpointTest3 = LayerTest.extend({
    onEnter:function () {
        this._super();
        //create layer
        var ws = director.getWinSize();
        var layer1 = cc.LayerColor.create(cc.c4b(255, 100, 100, 128), ws.width / 2, ws.height / 2);
        layer1.ignoreAnchorPointForPosition(false);
        var layer2 = cc.LayerColor.create(cc.c4b(100, 255, 100, 128), ws.width / 4, ws.height / 4);
        layer2.ignoreAnchorPointForPosition(false);
        layer1.addChild(layer2);
        layer1.setPosition(ws.width / 2, ws.height / 2);
        this.addChild(layer1);
    },
    title:function () {
        return "ignore Anchorpoint Test #3";
    },
    subtitle:function () {
        return "red:false  green:false";
    }
});
var IgnoreAnchorpointTest4 = LayerTest.extend({
    onEnter:function () {
        this._super();
        //create layer
        var ws = director.getWinSize();
        var layer1 = cc.LayerColor.create(cc.c4b(255, 100, 100, 128), ws.width / 2, ws.height / 2);
        layer1.ignoreAnchorPointForPosition(false);
        var layer2 = cc.LayerColor.create(cc.c4b(100, 255, 100, 128), ws.width / 4, ws.height / 4);
        layer2.ignoreAnchorPointForPosition(true);
        layer1.addChild(layer2);
        layer1.setPosition(ws.width / 2, ws.height / 2);
        this.addChild(layer1);
    },
    title:function () {
        return "ignore Anchorpoint Test #4";
    },
    subtitle:function () {
        return "red:false  green:true";
    }
});

//------------------------------------------------------------------
//
// LayerTest2
//
//------------------------------------------------------------------
var LayerTest2 = LayerTest.extend({
    onEnter:function () {
        this._super();

        var s = director.getWinSize();
        var layer1 = cc.LayerColor.create(cc.c4b(255, 255, 0, 80), 100, 300);
        layer1.setPosition(cc.p(s.width / 3, s.height / 2));
        layer1.ignoreAnchorPointForPosition(false);
        this.addChild(layer1, 1);

        var layer2 = cc.LayerColor.create(cc.c4b(0, 0, 255, 255), 100, 300);
        layer2.setPosition(cc.p((s.width / 3) * 2, s.height / 2));
        layer2.ignoreAnchorPointForPosition(false);
        this.addChild(layer2, 1);

        var actionTint = cc.TintBy.create(2, -255, -127, 0);
        var actionTintBack = actionTint.reverse();
        var seq1 = cc.Sequence.create(actionTint, actionTintBack);
        layer1.runAction(seq1);

        var actionFade = cc.FadeOut.create(2.0);
        var actionFadeBack = actionFade.reverse();
        var seq2 = cc.Sequence.create(actionFade, actionFadeBack);
        layer2.runAction(seq2);
    },
    title:function () {
        return "ColorLayer: fade and tint";
    }
});

//------------------------------------------------------------------
//
// LayerTestBlend
//
//------------------------------------------------------------------
var LayerTestBlend = LayerTest.extend({
    _blend:true,

    ctor:function () {
        this._super();
        var layer1 = cc.LayerColor.create(cc.c4b(255, 255, 255, 80));

        var sister1 = cc.Sprite.create(s_pathSister1);
        var sister2 = cc.Sprite.create(s_pathSister2);

        this.addChild(sister1);
        this.addChild(sister2);
        this.addChild(layer1, 100, cc.TAG_LAYER);

        sister1.setPosition(cc.p(160, winSize.height / 2));
        sister2.setPosition(cc.p(320, winSize.height / 2));

        this.schedule(this.onNewBlend, 1.0);
        this._blend = true;
    },
    onNewBlend:function (dt) {
        var layer = this.getChildByTag(cc.TAG_LAYER);

        var src;
        var dst;

        if (this._blend) {
            src = gl.SRC_ALPHA;
            dst = gl.ONE_MINUS_SRC_ALPHA;
        } else {
            src = gl.ONE_MINUS_DST_COLOR;
            dst = gl.ZERO;
        }
        layer.setBlendFunc( src, dst );
        this._blend = ! this._blend;
    },
    title:function () {
        return "ColorLayer: blend";
    }
});

//------------------------------------------------------------------
//
// LayerGradient
//
//------------------------------------------------------------------
var LayerGradient = LayerTest.extend({
    _isPressed:false,
    ctor:function () {
        this._super();
        var layer1 = cc.LayerGradient.create(cc.c4b(255, 0, 0, 255), cc.c4b(0, 255, 0, 255), cc.p(0.9, 0.9));
        this.addChild(layer1, 0, cc.TAG_LAYER);

        if( 'touches' in sys.capabilities )
            this.setTouchEnabled(true);
        else if ('mouse' in sys.capabilities )
            this.setMouseEnabled(true);

        var label1 = cc.LabelTTF.create("Compressed Interpolation: Enabled", "Marker Felt", 26);
        var label2 = cc.LabelTTF.create("Compressed Interpolation: Disabled", "Marker Felt", 26);
        var item1 = cc.MenuItemLabel.create(label1);
        var item2 = cc.MenuItemLabel.create(label2);
        var item = cc.MenuItemToggle.create(item1, item2, this.onToggleItem, this);

         var menu = cc.Menu.create(item);
         this.addChild(menu);
         menu.setPosition(cc.p(winSize.width / 2, 100) );
    },

    updateGradient:function(pos) {
        var diff = cc.pSub(cc.p(winSize.width / 2, winSize.height / 2), pos);
        diff = cc.pNormalize(diff);

        var gradient = this.getChildByTag(1);
        gradient.setVector(diff);
    },
    onTouchesBegan:function(touches, event){
        this._isPressed = true;
        var start = touches[0].getLocation();
        this.updateGradient(start);
    },
    onTouchesMoved:function (touches, event) {
        if(this._isPressed) {
            var start = touches[0].getLocation();
            this.updateGradient(start);
        }
    },
    onTouchesEnded:function(touches,event){
        this._isPressed = false;
    },

    onMouseDragged : function( event ) {
        var location = event.getLocation();
        this.updateGradient(location);
        return true;
    },
    onToggleItem:function (sender) {
        var gradient = this.getChildByTag(cc.TAG_LAYER);
        gradient.setCompressedInterpolation(!gradient.isCompressedInterpolation());
    },

    title:function () {
        return "LayerGradient";
    },
    subtitle:function () {
        return "Touch the screen and move your finger";
    }
});

var arrayOfLayerTest = [
    LayerTest1,
    LayerTest2,
    LayerTestBlend,
    LayerGradient,
    IgnoreAnchorpointTest1,
    IgnoreAnchorpointTest2,
    IgnoreAnchorpointTest3,
    IgnoreAnchorpointTest4
];

var nextLayerTest = function () {
    layerTestSceneIdx++;
    layerTestSceneIdx = layerTestSceneIdx % arrayOfLayerTest.length;

    return new arrayOfLayerTest[layerTestSceneIdx]();
};
var previousLayerTest = function () {
    layerTestSceneIdx--;
    if (layerTestSceneIdx < 0)
        layerTestSceneIdx += arrayOfLayerTest.length;

    return new arrayOfLayerTest[layerTestSceneIdx]();
};
var restartLayerTest = function () {
    return new arrayOfLayerTest[layerTestSceneIdx]();
};
