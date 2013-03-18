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


var sceneRenderTextureIdx = -1;

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
    },

    // automation
    numberOfPendingTests:function() {
        return ( (arrayOfRenderTextureTest.length-1) - sceneRenderTextureIdx );
    },

    getTestNumber:function() {
        return sceneRenderTextureIdx;
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
    },

    //
    // Automation
    //
    testDuration:2.1,

    getExpectedResult:function() {
        // blue, red, blue
        var ret = {"0":0,"1":0,"2":0,"3":255,"4":0,"5":0,"6":0,"7":255,"8":0,"9":0,"10":0,"11":255,"12":0,"13":0,"14":0,"15":255,"16":0,"17":0,"18":0,"19":255,"20":0,"21":0,"22":0,"23":255,"24":0,"25":0,"26":0,"27":255,"28":0,"29":0,"30":0,"31":255,"32":0,"33":0,"34":0,"35":255,"36":0,"37":0,"38":0,"39":255,"40":0,"41":0,"42":0,"43":255,"44":0,"45":0,"46":0,"47":255,"48":0,"49":0,"50":0,"51":255,"52":0,"53":0,"54":0,"55":255,"56":0,"57":0,"58":0,"59":255,"60":0,"61":0,"62":0,"63":255};
        return JSON.stringify(ret);
    },

    getCurrentResult:function() {
        var ret = this.readPixels(winSize.width/2-2, winSize.height/2-2,  4, 4);
        return JSON.stringify(ret);
    }
});

var RenderTextureTestScene = TestScene.extend({
    runThisTest:function () {
        sceneRenderTextureIdx = -1;
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
    sceneRenderTextureIdx++;
    sceneRenderTextureIdx = sceneRenderTextureIdx % arrayOfRenderTextureTest.length;

    return new arrayOfRenderTextureTest[sceneRenderTextureIdx]();
};
var previousRenderTextureTest = function () {
    sceneRenderTextureIdx--;
    if (sceneRenderTextureIdx < 0)
        sceneRenderTextureIdx += arrayOfRenderTextureTest.length;

    return new arrayOfRenderTextureTest[sceneRenderTextureIdx]();
};
var restartRenderTextureTest = function () {
    return new arrayOfRenderTextureTest[sceneRenderTextureIdx]();
};
