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

var RenderTextureBaseLayer = BaseTestLayer.extend({

    ctor:function() {
        this._super(cc.c4b(0,0,0,255), cc.c4b(98,99,117,255) );
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
    }
});

//------------------------------------------------------------------
//
// RenderTextureSave
//
//------------------------------------------------------------------
var RenderTextureSave = RenderTextureBaseLayer.extend({
    _brush : null,
    _target : null,
    _lastLocation : null,
    _counter :0,

    onEnter:function () {
        this._super();

        if( 'touches' in sys.capabilities )
            this.setTouchEnabled(true);
        else if ('mouse' in sys.capabilities )
            this.setMouseEnabled(true);

        this._brush = cc.Sprite.create(s_fire);
        this._brush.retain();

        this._brush.setColor( cc.RED );
        this._brush.setOpacity( 20 );


        var save = cc.MenuItemFont.create("Save", this.saveCB, this );
        var clear = cc.MenuItemFont.create("Clear", this.clearCB.bind(this) ); // another way to pass 'this'
        var menu = cc.Menu.create( save, clear );
        menu.alignItemsVertically();
        menu.setPosition( winSize.width-70, winSize.height-80  );
        this.addChild( menu, 10 );

		// create a render texture
		var target = cc.RenderTexture.create( winSize.width, winSize.height );
		target.setPosition( winSize.width/2, winSize.height/2 );
        this.addChild( target, 1 );

        this._target = target;

        this._lastLocation = cc.p( winSize.width/2, winSize.height/2);

    },

    onExit:function() {
        this._brush.release();
    },

    saveCB:function(sender) {
        var namePNG = "image-" + this._counter + ".png";
        var nameJPG = "image-" + this._counter + ".jpg";

        this._target.saveToFile( nameJPG, cc.IMAGE_FORMAT_JPEG );
        this._target.saveToFile( namePNG, cc.IMAGE_FORMAT_PNG );

        cc.log("images saved!");
        this._counter++;
    },

    clearCB:function(sender) {
        this._target.clear( Math.random(), Math.random(), Math.random(), 1 );
    },

    drawInLocation: function( location ) {
        var distance = cc.pDistance( location, this._lastLocation );
        if( distance > 1 ) {
            this._target.begin();
            for( var i=0; i < distance; i++ ) {
                var diffX = this._lastLocation.x - location.x;
                var diffY = this._lastLocation.y - location.y;

                var delta = i / distance;

                this._brush.setPosition( location.x + diffX * delta, location.y + diffY * delta  );
                this._brush.setRotation( Math.random() * 360 );
                this._brush.setScale( Math.random() * 2 );
                this._brush.setColor( cc._c3b( Math.random()*255, 255, 255) );
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
        this.drawInLocation( touches[0].getLocation() );
        return true;
    },

    onMouseDown : function( event ) {
        this._lastLocation = event.getLocation();
        return true;
    },

    onMouseDragged : function( event ) {
        this.drawInLocation( event.getLocation() );
        return true;
    },

    subtitle:function () {
        return "Testing 'save'";
    }
});

//------------------------------------------------------------------
//
// Issue1464
//
//------------------------------------------------------------------
var Issue1464 = RenderTextureBaseLayer.extend({
    _brush : null,
    _target : null,
    _lastLocation : null,
    _counter :0,

    ctor:function() {
        this._super();

        var sprite = cc.Sprite.create(s_grossini);


        // create a render texture
        var rend = cc.RenderTexture.create( winSize.width/2, winSize.height/2 );
        rend.setPosition( winSize.width/2, winSize.height/2 );
        this.addChild( rend, 1 );

        sprite.setPosition(winSize.width/4, winSize.height/4);
        rend.begin();
        sprite.visit();
        rend.end();

        var fadeout = cc.FadeOut.create(2);
        var fadein = fadeout.reverse();
        var delay = cc.DelayTime.create(0.25);
        var seq = cc.Sequence.create(fadeout, delay, fadein, delay.copy() );
        var fe = cc.RepeatForever.create(seq);
        rend.getSprite().runAction(fe);
    },

    title:function () {
        return "Issue 1464";
    },

    subtitle:function () {
        return "Sprites should fade in / out correctly";
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
    Issue1464
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
