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


var OpenGLTestIdx = -1;

// the class inherit from TestScene
// every Scene each test used must inherit from TestScene,
// make sure the test have the menu item for back to main menu
var OpenGLTestScene = TestScene.extend({
    runThisTest:function () {
        OpenGLTestIdx = -1;
        this.addChild(nextOpenGLTest());
        director.replaceScene(this);
    }
});


var OpenGLTestLayer = BaseTestLayer.extend({
    _grossini:null,
    _tamara:null,
    _kathia:null,
    _code:null,

    ctor:function() {
        this._super(cc.c4b(0,0,0,255), cc.c4b(98,99,117,255) );
    },

    title:function () {
        return "OpenGLTest";
    },
    subtitle:function () {
        return "";
    },
    onBackCallback:function (sender) {
        var s = new OpenGLTestScene();
        s.addChild(previousOpenGLTest());
        director.replaceScene(s);
    },
    onRestartCallback:function (sender) {
        var s = new OpenGLTestScene();
        s.addChild(restartOpenGLTest());
        director.replaceScene(s);
    },
    onNextCallback:function (sender) {
        var s = new OpenGLTestScene();
        s.addChild(nextOpenGLTest());
        director.replaceScene(s);
    },

    numberOfPendingTests:function() {
        return ( (arrayOfOpenGLTest.length-1) - OpenGLTestIdx );
    },

    getTestNumber:function() {
        return OpenGLTestIdx;
    }
});

//------------------------------------------------------------------
//
// ReadPixelsTest
//
//------------------------------------------------------------------
var ReadPixelsTest = OpenGLTestLayer.extend({

    ctor:function() {
        this._super();

        var sprite = cc.Sprite.create("grossini.png");
        this.addChild( sprite );
        sprite.setPosition( winSize.width/2, winSize.height/2);

        var texture = sprite.getTexture();
        gl.bindTexture( gl.TEXTURE_2D, texture );

        var w = texture.getPixelsWide();
        var h = texture.getPixelsHigh();

        var s = 4 * w * h;
        var pixelValues = new Uint8Array(s);
        gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, pixelValues);

        cc.log( s );
        for( var i=0; i < w*h*4; i++) {
            cc.log( i + ': ' + pixelValues[i] );
        }
    },

    title:function () {
        return "gl.ReadPixels()";
    },
    subtitle:function () {
        return "Tests ReadPixels. See console";
    }
});



//-
//
// Flow control
//
var arrayOfOpenGLTest = [

    ReadPixelsTest
];

var nextOpenGLTest = function () {
    OpenGLTestIdx++;
    OpenGLTestIdx = OpenGLTestIdx % arrayOfOpenGLTest.length;

    return new arrayOfOpenGLTest[OpenGLTestIdx]();
};
var previousOpenGLTest = function () {
    OpenGLTestIdx--;
    if (OpenGLTestIdx < 0)
        OpenGLTestIdx += arrayOfOpenGLTest.length;

    return new arrayOfOpenGLTest[OpenGLTestIdx]();
};
var restartOpenGLTest = function () {
    return new arrayOfOpenGLTest[OpenGLTestIdx]();
};
