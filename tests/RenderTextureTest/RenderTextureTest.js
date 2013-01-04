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

var RenderTextureBaseLayer = cc.Layer.extend({

    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.Layer );
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
        label.setPosition( cc.p(winSize.width / 2, winSize.height - 40));

        var strSubtitle = this.subtitle();
        if (strSubtitle !== "") {
            var l = cc.LabelTTF.create(strSubtitle, "Thonburi", 16);
            this.addChild(l, 10);
            l.setPosition( cc.p(winSize.width / 2, winSize.height - 70));
        }

        var strCode = this.code();
        if( strCode !== "" ) {
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
        var item3 = cc.MenuItemImage.create(s_pathF1, s_pathF2, this.onNextCallback.bind(this) );  // another way to pass 'this'

        var menu = cc.Menu.create(item1, item2, item3);

        menu.setPosition( cc.p(0,0) );
        item1.setPosition( cc.p(winSize.width / 2 - 100, 30));
        item2.setPosition( cc.p(winSize.width / 2, 30));
        item3.setPosition( cc.p(winSize.width / 2 + 100, 30));

        this.addChild(menu, 10);
    }
});

//------------------------------------------------------------------
//
// Tests
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
    RenderTextureSave
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
