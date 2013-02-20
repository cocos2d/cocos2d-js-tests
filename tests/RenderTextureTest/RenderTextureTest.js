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

var RenderTextureTest = cc.Layer.extend({
    ctor:function () {
        this._super();
        cc.associateWithNative(this, cc.Layer);
        this.init();
    },

    title:function () {
        return "Render Texture";
    },

    subtitle:function () {
        return "";
    },

    code:function () {
        return "";
    },

    // callbacks
    onRestartCallback:function (sender) {
        var s = new RenderTextureTestScene();
        s.addChild(restartRenderTextureTest());
        director.replaceScene(s);
    },
    onNextCallback:function (sender) {
        var s = new RenderTextureTestScene();
        s.addChild(nextRenderTextureTest());
        director.replaceScene(s);
    },
    onBackCallback:function (sender) {
        var s = new RenderTextureTestScene();
        s.addChild(previousRenderTextureTest());
        director.replaceScene(s);
    },
    onEnter:function () {
        this._super();

        // add title and subtitle
        var label = cc.LabelTTF.create(this.title(), "Arial", 28);
        this.addChild(label, 10);
        label.setPosition(cc.p(winSize.width / 2, winSize.height - 40));

        var strSubtitle = this.subtitle();
        if (strSubtitle !== "") {
            var l = cc.LabelTTF.create(strSubtitle, "Thonburi", 16);
            this.addChild(l, 10);
            l.setPosition(cc.p(winSize.width / 2, winSize.height - 70));
        }

        var strCode = this.code();
        if (strCode !== "") {
            label = cc.LabelTTF.create(strCode, 'CourierNewPSMT', 16);
            label.setPosition(cc.p(winSize.width / 2, winSize.height - 120));
            this.addChild(label, 10);

            var labelbg = cc.LabelTTF.create(strCode, 'CourierNewPSMT', 16);
            labelbg.setColor(cc.c3b(10, 10, 255));
            labelbg.setPosition(cc.p(winSize.width / 2 + 1, winSize.height - 120 - 1));
            this.addChild(labelbg, 9);
        }

        // Menu
        var item1 = cc.MenuItemImage.create(s_pathB1, s_pathB2, this.onBackCallback, this);
        var item2 = cc.MenuItemImage.create(s_pathR1, s_pathR2, this.onRestartCallback, this);
        var item3 = cc.MenuItemImage.create(s_pathF1, s_pathF2, this.onNextCallback.bind(this));  // another way to pass 'this'

        var menu = cc.Menu.create(item1, item2, item3);

        menu.setPosition(cc.p(0, 0));
        item1.setPosition(cc.p(winSize.width / 2 - 100, 30));
        item2.setPosition(cc.p(winSize.width / 2, 30));
        item3.setPosition(cc.p(winSize.width / 2 + 100, 30));

        this.addChild(menu, 10);
    }
});

//------------------------------------------------------------------
//
// Tests
//
//------------------------------------------------------------------
var RenderTextureSave = RenderTextureTest.extend({
    _brush:null,
    _target:null,
    _lastLocation:null,
    _counter:0,

    onEnter:function () {
        this._super();

        if ('touches' in sys.capabilities)
            this.setTouchEnabled(true);
        else if ('mouse' in sys.capabilities)
            this.setMouseEnabled(true);

        this._brush = cc.Sprite.create(s_fire);
        this._brush.retain();

        this._brush.setColor(cc.RED);
        this._brush.setOpacity(20);

        var save = cc.MenuItemFont.create("Save", this.saveCB, this);
        var clear = cc.MenuItemFont.create("Clear", this.clearCB.bind(this)); // another way to pass 'this'
        var menu = cc.Menu.create(save, clear);
        menu.alignItemsVertically();
        menu.setPosition(winSize.width - 70, winSize.height - 80);
        this.addChild(menu, 10);

        // create a render texture
        var target = cc.RenderTexture.create(winSize.width, winSize.height);
        target.setPosition(winSize.width / 2, winSize.height / 2);
        this.addChild(target, 1);

        this._target = target;

        this._lastLocation = cc.p(winSize.width / 2, winSize.height / 2);
    },

    onExit:function () {
        this._brush.release();
    },

    saveCB:function (sender) {
        var namePNG = "image-" + this._counter + ".png";
        var nameJPG = "image-" + this._counter + ".jpg";

        this._target.saveToFile(nameJPG, cc.IMAGE_FORMAT_JPEG);
        this._target.saveToFile(namePNG, cc.IMAGE_FORMAT_PNG);

        cc.log("images saved!");
        this._counter++;
    },

    clearCB:function (sender) {
        this._target.clear(Math.random(), Math.random(), Math.random(), 1);
    },

    drawInLocation:function (location) {
        var distance = cc.pDistance(location, this._lastLocation);
        if (distance > 1) {
            this._target.begin();
            for (var i = 0; i < distance; i++) {
                var diffX = this._lastLocation.x - location.x;
                var diffY = this._lastLocation.y - location.y;

                var delta = i / distance;

                this._brush.setPosition(location.x + diffX * delta, location.y + diffY * delta);
                this._brush.setRotation(Math.random() * 360);
                this._brush.setScale(Math.random() * 2);
                this._brush.setColor(cc.c3b(Math.random() * 255, 255, 255));
                this._brush.visit();
            }
            this._target.end();
        }
        this._lastLocation = location;
    },

    onTouchesBegan:function (touches, event) {
        this._lastLocation = touches[0].getLocation();
        return true;
    },

    onTouchesMoved:function (touches, event) {
        this.drawInLocation(touches[0].getLocation());
        return true;
    },

    onMouseDown:function (event) {
        this._lastLocation = event.getLocation();
        return true;
    },

    onMouseDragged:function (event) {
        this.drawInLocation(event.getLocation());
        return true;
    },

    subtitle:function () {
        return "Testing 'save'";
    }
});

var RenderTextureIssue937 = RenderTextureTest.extend({
    ctor:function () {
        this._super();
        var winSize = cc.Director.getInstance().getWinSize();
        /*
         *     1    2
         * A: A1   A2
         *
         * B: B1   B2
         *
         *  A1: premulti sprite
         *  A2: premulti render
         *
         *  B1: non-premulti sprite
         *  B2: non-premulti render
         */
        var background = cc.LayerColor.create(cc.c4(200, 200, 200, 255));
        this.addChild(background);

        var spr_premulti = cc.Sprite.create(s_fire);
        spr_premulti.setPosition(cc.p(16, 48));

        var spr_nonpremulti = cc.Sprite.create(s_fire);
        spr_nonpremulti.setPosition(cc.p(16, 16));

        /* A2 & B2 setup */
        var rend = cc.RenderTexture.create(32, 64, cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888);
        if (!rend)
            return;
        // It's possible to modify the RenderTexture blending function by
        //        [[rend sprite] setBlendFunc:(ccBlendFunc) {GL_ONE, GL_ONE_MINUS_SRC_ALPHA}];
        //rend.getSprite().setBlendFunc(cc.renderContext.ONE, cc.renderContext.ONE_MINUS_SRC_ALPHA);
        rend.begin();
        spr_premulti.visit();
        spr_nonpremulti.visit();
        rend.end();

        /* A1: setup */
        spr_premulti.setPosition(cc.p(winSize.width / 2 - 16, winSize.height / 2 + 16));
        /* B1: setup */
        spr_nonpremulti.setPosition(cc.p(winSize.width / 2 - 16, winSize.height / 2 - 16));

        rend.setPosition(cc.p(winSize.width / 2 + 16, winSize.height / 2));
        //background.setVisible(false);
        this.addChild(spr_nonpremulti);
        this.addChild(spr_premulti);
        this.addChild(rend);
    },

    title:function () {
        return "Testing issue #937";
    },

    subtitle:function () {
        return "All images should be equal...";
    }
});

var RenderTextureZbuffer = RenderTextureTest.extend({
    mgr:null,
    sp1:null,
    sp2:null,
    sp3:null,
    sp4:null,
    sp5:null,
    sp6:null,
    sp7:null,
    sp8:null,
    sp9:null,

    ctor:function () {
        this._super();
        this.setTouchEnabled(true);
        var size = cc.Director.getInstance().getWinSize();
        var label = cc.LabelTTF.create("vertexZ = 50", "Marker Felt", 64);
        label.setPosition(cc.p(size.width / 2, size.height * 0.25));
        this.addChild(label);

        var label2 = cc.LabelTTF.create("vertexZ = 0", "Marker Felt", 64);
        label2.setPosition(cc.p(size.width / 2, size.height * 0.5));
        this.addChild(label2);

        var label3 = cc.LabelTTF.create("vertexZ = -50", "Marker Felt", 64);
        label3.setPosition(cc.p(size.width / 2, size.height * 0.75));
        this.addChild(label3);

        label.setVertexZ(50);
        label2.setVertexZ(0);
        label3.setVertexZ(-50);

        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_circle_plist);
        this.mgr = cc.SpriteBatchNode.create(s_circle_png, 9);
        this.addChild(this.mgr);
        this.sp1 = cc.Sprite.createWithSpriteFrameName("circle.png");
        this.sp2 = cc.Sprite.createWithSpriteFrameName("circle.png");
        this.sp3 = cc.Sprite.createWithSpriteFrameName("circle.png");
        this.sp4 = cc.Sprite.createWithSpriteFrameName("circle.png");
        this.sp5 = cc.Sprite.createWithSpriteFrameName("circle.png");
        this.sp6 = cc.Sprite.createWithSpriteFrameName("circle.png");
        this.sp7 = cc.Sprite.createWithSpriteFrameName("circle.png");
        this.sp8 = cc.Sprite.createWithSpriteFrameName("circle.png");
        this.sp9 = cc.Sprite.createWithSpriteFrameName("circle.png");

        this.mgr.addChild(this.sp1, 9);
        this.mgr.addChild(this.sp2, 8);
        this.mgr.addChild(this.sp3, 7);
        this.mgr.addChild(this.sp4, 6);
        this.mgr.addChild(this.sp5, 5);
        this.mgr.addChild(this.sp6, 4);
        this.mgr.addChild(this.sp7, 3);
        this.mgr.addChild(this.sp8, 2);
        this.mgr.addChild(this.sp9, 1);

        this.sp1.setVertexZ(400);
        this.sp2.setVertexZ(300);
        this.sp3.setVertexZ(200);
        this.sp4.setVertexZ(100);
        this.sp5.setVertexZ(0);
        this.sp6.setVertexZ(-100);
        this.sp7.setVertexZ(-200);
        this.sp8.setVertexZ(-300);
        this.sp9.setVertexZ(-400);

        this.sp9.setScale(2);
        this.sp9.setColor(cc.YELLOW);
    },

    onTouchesBegan:function (touches, event) {
        if (!touches || touches.length === 0)
            return;

        for (var i = 0; i < touches.length; i++) {
            var location = touches[i].getLocation();

            this.sp1.setPosition(location);
            this.sp2.setPosition(location);
            this.sp3.setPosition(location);
            this.sp4.setPosition(location);
            this.sp5.setPosition(location);
            this.sp6.setPosition(location);
            this.sp7.setPosition(location);
            this.sp8.setPosition(location);
            this.sp9.setPosition(location);
        }
    },

    onTouchesMoved:function (touches, event) {
        if (!touches || touches.length === 0)
            return;

        for (var i = 0; i < touches.length; i++) {
            var location = touches[i].getLocation();

            this.sp1.setPosition(location);
            this.sp2.setPosition(location);
            this.sp3.setPosition(location);
            this.sp4.setPosition(location);
            this.sp5.setPosition(location);
            this.sp6.setPosition(location);
            this.sp7.setPosition(location);
            this.sp8.setPosition(location);
            this.sp9.setPosition(location);
        }
    },

    onTouchesEnded:function (touches, event) {
        this.renderScreenShot();
    },

    title:function () {
        return "Testing Z Buffer in Render Texture";
    },

    subtitle:function () {
        return "Touch screen. It should be green";
    },

    renderScreenShot:function () {
        var winSize = cc.Director.getInstance().getWinSize();
        var texture = cc.RenderTexture.create(winSize.width, winSize.width);
        if (!texture)
            return;

        texture.setAnchorPoint(cc.p(0, 0));
        texture.begin();
        this.visit();
        texture.end();

        var sprite = cc.Sprite.createWithTexture(texture.getSprite().getTexture());

        sprite.setPosition(cc.p(winSize.width/2, winSize.width/2));
        sprite.setOpacity(182);
        sprite.setFlipY(1);
        this.addChild(sprite, 999999);
        sprite.setColor(cc.GREEN);

        sprite.runAction(cc.Sequence.create(cc.FadeTo.create(2, 0), cc.Hide.create()));
    }
});

var RenderTextureTestDepthStencil = RenderTextureTest.extend({
    ctor:function () {
        this._super();
        var gl = cc.renderContext;

        var winSize = cc.Director.getInstance().getWinSize();

        var sprite = cc.Sprite.create(s_fire);
        sprite.setPosition(cc.p(winSize.width * 0.25, 0));
        sprite.setScale(10);
        //TODO GL_DEPTH24_STENCIL8
        //var rend = cc.RenderTexture.create(winSize.width, winSize.height, cc.TEXTURE_2D_PIXEL_FORMAT_RGBA4444);
        var rend = cc.RenderTexture.create(winSize.width, winSize.height);

        gl.stencilMask(0xFF);
        rend.beginWithClear(0, 0, 0, 0, 0, 0);

        //! mark sprite quad into stencil buffer
        gl.enable(gl.STENCIL_TEST);
        gl.stencilFunc(gl.ALWAYS, 1, 0xFF);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
        gl.colorMask(0, 0, 0, 1);
        sprite.visit();

        //! move sprite half width and height, and draw only where not marked
        sprite.setPosition(cc.pAdd(sprite.getPosition(), cc.pMult(cc.p(sprite.getContentSize().width * sprite.getScale(), sprite.getContentSize().height * sprite.getScale()), 0.5)));
        gl.stencilFunc(gl.NOTEQUAL, 1, 0xFF);
        gl.colorMask(1, 1, 1, 1);
        sprite.visit();

        rend.end();

        gl.disable(gl.STENCIL_TEST);

        rend.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.5));

        this.addChild(rend);
    },

    title:function () {
        return "Testing depthStencil attachment";
    },

    subtitle:function () {
        return "Circle should be missing 1/4 of its region";
    }
});

var RenderTextureTargetNode = RenderTextureTest.extend({
    _sprite1:null,
    _sprite2:null,
    _time:0,

    _renderTexture:null,

    ctor:function () {
        this._super();
        /*
         *     1    2
         * A: A1   A2
         *
         * B: B1   B2
         *
         *  A1: premulti sprite
         *  A2: premulti render
         *
         *  B1: non-premulti sprite
         *  B2: non-premulti render
         */
        var background = cc.LayerColor.create(cc.c4(40, 40, 40, 255));
        this.addChild(background);

        // sprite 1
        this._sprite1 = cc.Sprite.create(s_fire);

        // sprite 2
        //todo Images/fire_rgba8888.pvr
        this._sprite2 = cc.Sprite.create(s_fire);

        var winSize = cc.Director.getInstance().getWinSize();

        /* Create the render texture */
        //var renderTexture = cc.RenderTexture.create(winSize.width, winSize.height, cc.TEXTURE_2D_PIXEL_FORMAT_RGBA4444);
        var renderTexture = cc.RenderTexture.create(winSize.width, winSize.height);
        this._renderTexture = renderTexture;

        renderTexture.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        //		[renderTexture setPosition:cc.p(s.width, s.height)];
        //		renderTexture.scale = 2;

        /* add the sprites to the render texture */
        renderTexture.addChild(this._sprite1);
        renderTexture.addChild(this._sprite2);
        renderTexture.setClearColor(cc.c4f(0, 0, 0, 0));
        renderTexture.setClearFlags(cc.renderContext.COLOR_BUFFER_BIT);

        /* add the render texture to the scene */
        this.addChild(renderTexture);

        renderTexture.setAutoDraw(true);

        this.scheduleUpdate();

        // Toggle clear on / off
        var item = cc.MenuItemFont.create("Clear On/Off", this.touched, this);
        var menu = cc.Menu.create(item);
        this.addChild(menu);

        menu.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
    },

    update:function (dt) {
        var r = 80;
        this._sprite1.setPosition(cc.p(Math.cos(this._time * 2) * r, Math.sin(this._time * 2) * r));
        this._sprite2.setPosition(cc.p(Math.sin(this._time * 2) * r, Math.cos(this._time * 2) * r));

        this._time += dt;
    },

    title:function () {
        return "Testing Render Target Node";
    },

    subtitle:function () {
        return "Sprites should be equal and move with each frame";
    },

    touched:function (sender) {
        if (this._renderTexture.getClearFlags() == 0)
            this._renderTexture.setClearFlags(cc.renderContext.COLOR_BUFFER_BIT);
        else {
            this._renderTexture.setClearFlags(0);
            this._renderTexture.setClearColor(cc.c4f(Math.random(), Math.random(), Math.random(), 1));
        }
    }
});


var RenderTextureTestScene = TestScene.extend({
    runThisTest:function () {
        sceneIdx = -1;
        var layer = nextRenderTextureTest();
        this.addChild(layer);

        director.replaceScene(this);
    }
});

//
// Flow control
//

var arrayOfRenderTextureTest = [
    RenderTextureSave,
    RenderTextureIssue937,
    RenderTextureZbuffer,
    RenderTextureTestDepthStencil,
    RenderTextureTargetNode
];

var nextRenderTextureTest = function () {
    sceneIdx++;
    sceneIdx = sceneIdx % arrayOfRenderTextureTest.length;

    return new arrayOfRenderTextureTest[sceneIdx]();
};
var previousRenderTextureTest = function () {
    sceneIdx--;
    if (sceneIdx < 0)
        sceneIdx += arrayOfRenderTextureTest.length;

    return new arrayOfRenderTextureTest[sceneIdx]();
};
var restartRenderTextureTest = function () {
    return new arrayOfRenderTextureTest[sceneIdx]();
};
