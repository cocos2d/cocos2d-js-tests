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
var TAG_NODE = 9960;

var parallaxTestSceneIdx = -1;

ParallaxDemo = BaseTestLayer.extend({

    _atlas:null,

    ctor:function() {
        this._super(cc.c4b(0,0,0,255), cc.c4b(160,32,32,255));
    },

    title:function () {
        return "No title";
    },

    onBackCallback:function (sender) {
        var s = new ParallaxTestScene();
        s.addChild(previousParallaxTest());
        director.replaceScene(s);
    },

    onRestartCallback:function (sender) {
        var s = new ParallaxTestScene();
        s.addChild(restartParallaxTest());

        director.replaceScene(s);
    },

    onNextCallback:function (sender) {
        var s = new ParallaxTestScene();
        s.addChild(nextParallaxTest());
        director.replaceScene(s);

    },
    // automation
    numberOfPendingTests:function() {
        return ( (arrayOfParallaxTest.length-1) - parallaxTestSceneIdx );
    },

    getTestNumber:function() {
        return parallaxTestSceneIdx;
    }

});

Parallax1 = ParallaxDemo.extend({

    _parent:null,
    _background:null,
    _tilemap:null,
    _cocosimage:null,

    ctor:function () {
        this._super();

        // Top Layer, a simple image
        _cocosimage = cc.Sprite.create(s_power);
        // scale the image (optional)
        _cocosimage.setScale(1.5);
        // change the transform anchor point to 0,0 (optional)
        _cocosimage.setAnchorPoint(cc.p(0, 0));


        // Middle layer: a Tile map atlas
        //var tilemap = cc.TileMapAtlas.create(s_tilesPng, s_levelMapTga, 16, 16);
        _tilemap = cc.TMXTiledMap.create(s_resprefix + "TileMaps/orthogonal-test2.tmx");

        // change the transform anchor to 0,0 (optional)
        _tilemap.setAnchorPoint(cc.p(0, 0));

        // Anti Aliased images
        //tilemap.getTexture().setAntiAliasTexParameters();

        // background layer: another image
        _background = cc.Sprite.create(s_back);
        // scale the image (optional)
        //background.setScale(1.5);
        // change the transform anchor point (optional)
        _background.setAnchorPoint(cc.p(0, 0));


        // create a void node, a parent node
        _parent = cc.ParallaxNode.create();

        // NOW add the 3 layers to the 'void' node

        // background image is moved at a ratio of 0.4x, 0.5y
        _parent.addChild(_background, -1, cc.p(0.4, 0.5), cc.p(0,0));

        // tiles are moved at a ratio of 2.2x, 1.0y
        _parent.addChild(_tilemap, 1, cc.p(2.2, 1.0), cc.p(0, 0));

        // top image is moved at a ratio of 3.0x, 2.5y
        _parent.addChild(_cocosimage, 2, cc.p(3.0, 2.5), cc.p(0, 0));


        // now create some actions that will move the '_parent' node
        // and the children of the '_parent' node will move at different
        // speed, thus, simulation the 3D environment
        var goUp = cc.MoveBy.create(2, cc.p(0, 100));
        var goRight = cc.MoveBy.create(2, cc.p(200, 0));
        var delay = cc.DelayTime.create(2.0);
        var goDown = goUp.reverse();
        var goLeft = goRight.reverse();
        var seq = cc.Sequence.create(goUp, goRight, delay, goDown, goLeft);
        _parent.runAction((cc.RepeatForever.create(seq) ));

        this.addChild(_parent);
    },

    title:function () {
        return "Parallax: parent and 3 children";
    },

    // default values for automation
    testDuration:5,
    getExpectedResult:function() {
        var ret = {};
        ret.pos_parent = cc.p(200,100);
        ret.pos_child1 = cc.p(-120, -50);
        ret.pos_child2 = cc.p(240, 0);
        ret.pos_child3 = cc.p(400, 150);

        return JSON.stringify(ret);
    },

    getCurrentResult:function() {
        var ret = {};
        ret.pos_parent = cc.p(Math.round(_parent.getPosition().x), Math.round(_parent.getPosition().y));
        ret.pos_child1 = cc.p(Math.round(_background.getPosition().x), Math.round(_background.getPosition().y));;
        ret.pos_child2 = cc.p(Math.round(_tilemap.getPosition().x), Math.round(_tilemap.getPosition().y));
        ret.pos_child3 = cc.p(Math.round(_cocosimage.getPosition().x), Math.round(_cocosimage.getPosition().y));

        return JSON.stringify(ret);
    }
});

Parallax2 = ParallaxDemo.extend({

    _root:null,
    _target:null,
    _streak:null,


    ctor:function () {
        this._super();

        if( 'touches' in sys.capabilities )
            this.setTouchEnabled(true);
        else if ('mouse' in sys.capabilities )
            this.setMouseEnabled(true);

        // Top Layer, a simple image
        var cocosImage = cc.Sprite.create(s_power);
        // scale the image (optional)
        cocosImage.setScale(1.5);
        // change the transform anchor point to 0,0 (optional)
        cocosImage.setAnchorPoint(cc.p(0, 0));


        // Middle layer: a Tile map atlas
        //var tilemap = cc.TileMapAtlas.create(s_tilesPng, s_levelMapTga, 16, 16);
        var tilemap = cc.TMXTiledMap.create(s_resprefix + "TileMaps/orthogonal-test2.tmx");

        // change the transform anchor to 0,0 (optional)
        tilemap.setAnchorPoint(cc.p(0, 0));

        // Anti Aliased images
        //tilemap.getTexture().setAntiAliasTexParameters();


        // background layer: another image
        var background = cc.Sprite.create(s_back);
        // scale the image (optional)
        //background.setScale(1.5);
        // change the transform anchor point (optional)
        background.setAnchorPoint(cc.p(0, 0));


        // create a void node, a parent node
        var voidNode = cc.ParallaxNode.create();

        // NOW add the 3 layers to the 'void' node

        // background image is moved at a ratio of 0.4x, 0.5y
        voidNode.addChild(background, -1, cc.p(0.4, 0.5), cc.p(0,0));

        // tiles are moved at a ratio of 1.0, 1.0y
        voidNode.addChild(tilemap, 1, cc.p(1.0, 1.0), cc.p(0, 0));

        // top image is moved at a ratio of 3.0x, 2.5y
        voidNode.addChild(cocosImage, 2, cc.p(3.0, 2.5), cc.p(0, 0));
        this.addChild(voidNode, 0, TAG_NODE);

    },

    onTouchesMoved:function (touches, event) {
        var touch = touches[0];
        var node = this.getChildByTag(TAG_NODE);
        var currentPos = node.getPosition();
        node.setPosition(cc.pAdd(currentPos, touch.getDelta() ));
    },

    onMouseDragged:function (event) {
        var node = this.getChildByTag(TAG_NODE);
        var currentPos = node.getPosition();
        node.setPosition(cc.pAdd(currentPos, event.getDelta() ));
    },

    title:function () {
        return "Parallax: drag screen";
    }
});

ParallaxTestScene = TestScene.extend({

    runThisTest:function () {
        parallaxTestSceneIdx = -1;
        this.addChild(nextParallaxTest());
        director.replaceScene(this);
    }
});


var arrayOfParallaxTest = [
    Parallax1,
    Parallax2
];

var nextParallaxTest = function () {
    parallaxTestSceneIdx++;
    parallaxTestSceneIdx = parallaxTestSceneIdx % arrayOfParallaxTest.length;

    return new arrayOfParallaxTest[parallaxTestSceneIdx]();
};
var previousParallaxTest = function () {
    parallaxTestSceneIdx--;
    if (parallaxTestSceneIdx < 0)
        parallaxTestSceneIdx += arrayOfParallaxTest.length;

    return new arrayOfParallaxTest[parallaxTestSceneIdx]();
};
var restartParallaxTest = function () {
    return new arrayOfParallaxTest[parallaxTestSceneIdx]();
};
