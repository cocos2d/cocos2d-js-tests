/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.
 Copyright (c) 2013      Surith Thekkiam

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

var spriteFrameCache = cc.SpriteFrameCache.getInstance();

//------------------------------------------------------------------
//
// S9SpriteTestDemo
//
//------------------------------------------------------------------
var S9SpriteTestDemo = cc.LayerGradient.extend({
    _title:"",
    _subtitle:"",

    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.LayerGradient );
        this.init( cc.c4b(0,0,0,255), cc.c4b(98,99,117,255));
        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_s9s_blocks9_plist);
        cc.log('sprite frames added to sprite frame cache...');
    },
    onEnter:function () {
        this._super();

        var label = cc.LabelTTF.create(this._title, "Arial", 28);
        this.addChild(label, 1);
        label.setPosition(cc.p(winSize.width / 2, winSize.height - 50));

        if (this._subtitle !== "") {
            var l = cc.LabelTTF.create(this._subtitle, "Thonburi", 16);
            this.addChild(l, 1);
            l.setPosition(cc.p(winSize.width / 2, winSize.height - 80));
        }

        var item1 = cc.MenuItemImage.create(s_pathB1, s_pathB2, this.onBackCallback, this);
        var item2 = cc.MenuItemImage.create(s_pathR1, s_pathR2, this.onRestartCallback, this);
        var item3 = cc.MenuItemImage.create(s_pathF1, s_pathF2, this.onNextCallback, this);

        var menu = cc.Menu.create(item1, item2, item3);

        menu.setPosition(cc.p(0,0));
        var cs = item2.getContentSize();
        item1.setPosition( cc.p(winSize.width/2 - cs.width*2, cs.height/2) );
        item2.setPosition( cc.p(winSize.width/2, cs.height/2) );
        item3.setPosition( cc.p(winSize.width/2 + cs.width*2, cs.height/2) );

        this.addChild(menu, 1);
    },

    onExit:function () {
        this._super();
    },

    onRestartCallback:function (sender) {
        var s = new S9SpriteTestScene();
        s.addChild(restartS9SpriteTest());
        director.replaceScene(s);
    },
    onNextCallback:function (sender) {
        var s = new S9SpriteTestScene();
        s.addChild(nextS9SpriteTest());
        director.replaceScene(s);
    },
    onBackCallback:function (sender) {
        var s = new S9SpriteTestScene();
        s.addChild(previousS9SpriteTest());
        director.replaceScene(s);
    }
});

// S9BatchNodeBasic

var S9BatchNodeBasic = S9SpriteTestDemo.extend({

    _title:"Test Scale9Sprite creation and rendering",

    ctor:function() {
        this._super();

        var x = winSize.width / 6;
        var y = 0 + (winSize.height / 6);

        cc.log("S9BatchNodeBasic ...");

        var batchNode = cc.SpriteBatchNode.create("res/Images/blocks9.png");
        cc.log("batchNode created with : " + "res/Images/blocks9.png");

        var blocks = cc.Scale9Sprite.create();
        cc.log("... created");

        blocks.updateWithBatchNode(batchNode, cc.rect(0, 0, 96, 96), false, cc.rect(0, 0, 96, 96));
        cc.log("... updateWithBatchNode");

        blocks.setPosition(cc.p(x, y));
        cc.log("... setPosition");

        this.addChild(blocks);
        cc.log("this..addChild");

        cc.log("... S9BatchNodeBasic done.");
    }
});

// S9BatchNodeBasicSpriteSheet

var S9BatchNodeBasicSpriteSheet = S9SpriteTestDemo.extend({

    _title:"Test Scale9Sprite sprite sheet creation and rendering",

    ctor:function() {
        this._super();

        var x = winSize.width / 6;
        var y = 0 + (winSize.height / 6);

        cc.log("S9BatchNodeBasicSpriteSheet ...");

        var blocks = cc.Scale9Sprite.createWithSpriteFrameName('blocks9.png');
        cc.log("... created");

        blocks.setPosition(cc.p(x, y));
        cc.log("... setPosition");

        this.addChild(blocks);
        cc.log("this..addChild");

        cc.log("... S9BatchNodeBasicSpriteSheet done.");
    }
});

// S9BatchNodeBasicSpriteSheetRotated

var S9BatchNodeBasicSpriteSheetRotated = S9SpriteTestDemo.extend({

    _title:"Test Scale9Sprite rotated sprite sheet creation and rendering",

    ctor:function() {
        this._super();

        var x = winSize.width / 6;
        var y = 0 + (winSize.height / 6);

        cc.log("S9BatchNodeBasicSpriteSheetRotated ...");

        var blocks = cc.Scale9Sprite.createWithSpriteFrameName('blocks9r.png');
        cc.log("... created");

        blocks.setPosition(cc.p(x, y));
        cc.log("... setPosition");

        this.addChild(blocks);
        cc.log("this..addChild");


        cc.log("... S9BatchNodeBasicSpriteSheetRotated done.");
    }
});

// S9BatchNodeScaleNoInsets

var S9BatchNodeScaleNoInsets = S9SpriteTestDemo.extend({

    _title:"Scale9Sprite scaled with no insets",

    ctor:function() {
        this._super();

        var x = winSize.width / 6;
        var y = 0 + (winSize.height / 6);

        cc.log("S9BatchNodeScaleNoInsets ...");

        // scaled without insets
        var batchNode_scaled = cc.SpriteBatchNode.create("res/Images/blocks9.png");
        cc.log("batchNode_scaled created with : " + "res/Images/blocks9.png");

        var blocks_scaled = cc.Scale9Sprite.create();
        cc.log("... created");
        blocks_scaled.updateWithBatchNode(batchNode_scaled, cc.rect(0, 0, 96, 96), false, cc.rect(0, 0, 96, 96));
        cc.log("... updateWithBatchNode");

        blocks_scaled.setPosition(cc.p(x, y));
        cc.log("... setPosition");

        blocks_scaled.setContentSize(cc.size(96 * 4, 96*2));
        cc.log("... setContentSize");

        this.addChild(blocks_scaled);
        cc.log("this..addChild");

        cc.log("... S9BtchNodeScaleNoInsets done.");
    }
});

// S9BatchNodeScaleNoInsetsSpriteSheet

var S9BatchNodeScaleNoInsetsSpriteSheet = S9SpriteTestDemo.extend({

    _title:"Scale9Sprite scaled with no insets sprite sheet",

    ctor:function() {
        this._super();

        var x = winSize.width / 6;
        var y = 0 + (winSize.height / 6);

        cc.log("S9BatchNodeScaleNoInsetsSpriteSheet ...");

        var blocks_scaled = cc.Scale9Sprite.createWithSpriteFrameName('blocks9.png');
        cc.log("... created");

        blocks_scaled.setPosition(cc.p(x, y));
        cc.log("... setPosition");

        blocks_scaled.setContentSize(cc.size(96 * 4, 96*2));
        cc.log("... setContentSize");

        this.addChild(blocks_scaled);
        cc.log("this..addChild");

        cc.log("... S9BatchNodeScaleNoInsetsSpriteSheet done.");
    }
});

// S9BatchNodeScaleNoInsetsSpriteSheetRotated

var S9BatchNodeScaleNoInsetsSpriteSheetRotated = S9SpriteTestDemo.extend({

    _title:"Scale9Sprite scaled with no insets rotated sprite sheet",

    ctor:function() {
        this._super();

        var x = winSize.width / 6;
        var y = 0 + (winSize.height / 6);

        cc.log("S9BatchNodeScaleNoInsetsSpriteSheetRotated ...");

        var blocks_scaled = cc.Scale9Sprite.createWithSpriteFrameName('blocks9r.png');
        cc.log("... created");

        blocks_scaled.setPosition(cc.p(x, y));
        cc.log("... setPosition");

        blocks_scaled.setContentSize(cc.size(96 * 4, 96*2));
        cc.log("... setContentSize");

        this.addChild(blocks_scaled);
        cc.log("this..addChild");

        cc.log("... S9BatchNodeScaleNoInsetsSpriteSheetRotated done.");
    }
});


// S9BatchNodeScaleWithCapInsets

var S9BatchNodeScaleWithCapInsets = S9SpriteTestDemo.extend({

    _title:"Scale9Sprite scaled with insets",

    ctor:function() {
        this._super();

        var x = winSize.width / 6;
        var y = 0 + (winSize.height / 6);

        cc.log("S9BatchNodeScaleWithCapInsets ...");

        var batchNode_scaled_with_insets = cc.SpriteBatchNode.create("res/Images/blocks9.png");
        cc.log("batchNode_scaled_with_insets created with : " + "res/Images/blocks9.png");

        var blocks_scaled_with_insets = cc.Scale9Sprite.create();
        cc.log("... created");

        blocks_scaled_with_insets.updateWithBatchNode(batchNode_scaled_with_insets, cc.rect(0, 0, 96, 96), false, cc.rect(32, 32, 32, 32));
        cc.log("... updateWithBatchNode");

        blocks_scaled_with_insets.setContentSize(cc.size(96 * 4.5, 96 * 2.5));
        cc.log("... setContentSize");

        blocks_scaled_with_insets.setPosition(cc.p(x, y));
        cc.log("... setPosition");

        this.addChild(blocks_scaled_with_insets);
        cc.log("this..addChild");

        cc.log("... S9BatchNodeScaleWithCapInsets done.");
    }
});

// S9BatchNodeScaleWithCapInsetsSpriteSheet

var S9BatchNodeScaleWithCapInsetsSpriteSheet = S9SpriteTestDemo.extend({

    _title:"Scale9Sprite scaled with insets sprite sheet",

    ctor:function() {
        this._super();

        var x = winSize.width / 6;
        var y = 0 + (winSize.height / 6);

        cc.log("S9BatchNodeScaleWithCapInsetsSpriteSheet ...");

        var blocks_scaled_with_insets = cc.Scale9Sprite.createWithSpriteFrameName('blocks9.png', cc.rect(32, 32, 32, 32));
        cc.log("... created");

        blocks_scaled_with_insets.setContentSize(cc.size(96 * 4.5, 96 * 2.5));
        cc.log("... setContentSize");

        blocks_scaled_with_insets.setPosition(cc.p(x, y));
        cc.log("... setPosition");

        this.addChild(blocks_scaled_with_insets);
        cc.log("this..addChild");

        cc.log("... S9BatchNodeScaleWithCapInsetsSpriteSheet done.");
    }
});

// S9BatchNodeScaleWithCapInsetsSpriteSheetRotated

var S9BatchNodeScaleWithCapInsetsSpriteSheetRotated = S9SpriteTestDemo.extend({

    _title:"Scale9Sprite scaled with insets rotated sprite sheet",

    ctor:function() {
        this._super();

        var x = winSize.width / 6;
        var y = 0 + (winSize.height / 6);

        cc.log("S9BatchNodeScaleWithCapInsetsSpriteSheetRotated ...");

        var blocks_scaled_with_insets = cc.Scale9Sprite.createWithSpriteFrameName('blocks9r.png', cc.rect(32, 32, 32, 32));
        cc.log("... created");

        blocks_scaled_with_insets.setContentSize(cc.size(96 * 4.5, 96 * 2.5));
        cc.log("... setContentSize");

        blocks_scaled_with_insets.setPosition(cc.p(x, y));
        cc.log("... setPosition");

        this.addChild(blocks_scaled_with_insets);
        cc.log("this..addChild");

        cc.log("... S9BatchNodeScaleWithCapInsetsSpriteSheetRotated done.");
    }
});


var S9SpriteTestScene = TestScene.extend({
    runThisTest:function () {
        sceneIdx = -1;
        var layer = nextS9SpriteTest();
        this.addChild(layer);

        director.replaceScene(this);
    }
});

//
// Flow control
//

var arrayOfS9SpriteTest = [
    S9BatchNodeBasic,
    S9BatchNodeBasicSpriteSheet,
    S9BatchNodeBasicSpriteSheetRotated,
    S9BatchNodeScaleNoInsets,
    S9BatchNodeScaleNoInsetsSpriteSheet,
    S9BatchNodeScaleNoInsetsSpriteSheetRotated,
    S9BatchNodeScaleWithCapInsets,
    S9BatchNodeScaleWithCapInsetsSpriteSheet,
    S9BatchNodeScaleWithCapInsetsSpriteSheetRotated
];

var nextS9SpriteTest = function () {
    sceneIdx++;
    sceneIdx = sceneIdx % arrayOfS9SpriteTest.length;

    return new arrayOfS9SpriteTest[sceneIdx]();
};
var previousS9SpriteTest = function () {
    sceneIdx--;
    if (sceneIdx < 0)
        sceneIdx += arrayOfS9SpriteTest.length;

    return new arrayOfS9SpriteTest[sceneIdx]();
};
var restartS9SpriteTest = function () {
    return new arrayOfS9SpriteTest[sceneIdx]();
};
