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
var GLReadPixelsTest = OpenGLTestLayer.extend({

    ctor:function() {
        this._super();

        if( 'opengl' in sys.capabilities ) {

            var x = winSize.width;
            var y = winSize.height;

            var blue = cc.LayerColor.create(cc.c4b(0, 0, 255, 255));
            var red = cc.LayerColor.create(cc.c4b(255, 0, 0, 255));
            var green = cc.LayerColor.create(cc.c4b(0, 255, 0, 255));
            var white = cc.LayerColor.create(cc.c4b(255, 255, 255, 255));

            blue.setScale(0.5);
            blue.setPosition(-x / 4, -y / 4);

            red.setScale(0.5);
            red.setPosition(x / 4, -y / 4);

            green.setScale(0.5);
            green.setPosition(-x / 4, y / 4);

            white.setScale(0.5);
            white.setPosition(x / 4, y / 4);

            this.addChild(blue,10);
            this.addChild(white,11);
            this.addChild(green,12);
            this.addChild(red,13);
        }
    },

    title:function () {
        return "gl.ReadPixels()";
    },
    subtitle:function () {
        return "Tests ReadPixels. See console";
    },

    //
    // Automation
    //
    getExpectedResult:function() {
        // red, green, blue, white
        var ret = [{"0":255,"1":0,"2":0,"3":255},{"0":0,"1":255,"2":0,"3":255},{"0":0,"1":0,"2":255,"3":255},{"0":255,"1":255,"2":255,"3":255}];
        return JSON.stringify(ret);
    },

    getCurrentResult:function() {
        var x = winSize.width;
        var y = winSize.height;

        var rPixels = new Uint8Array(4);
        var gPixels = new Uint8Array(4);
        var bPixels = new Uint8Array(4);
        var wPixels = new Uint8Array(4);

        // blue
        gl.readPixels(0,   0,   1, 1, gl.RGBA, gl.UNSIGNED_BYTE, bPixels);

        // red
        gl.readPixels(x-1, 0,   1, 1, gl.RGBA, gl.UNSIGNED_BYTE, rPixels);

        // green
        gl.readPixels(0,   y-1, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, gPixels);

        // white
        gl.readPixels(x-1, y-1, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, wPixels);

        var ret = [ rPixels, gPixels, bPixels, wPixels];
        return JSON.stringify(ret);
    }

});


//------------------------------------------------------------------
//
// GLClearTest
//
//------------------------------------------------------------------
var GLClearTest = OpenGLTestLayer.extend({

    ctor:function() {
        this._super();

        if( 'opengl' in sys.capabilities ) {

            var blue = cc.LayerColor.create(cc.c4b(0, 0, 255, 255));
            this.addChild( blue, 1 );

            var node = new cc.GLNode();
            node.init();
            node.draw = function() {
                gl.clear( gl.COLOR_BUFFER_BIT );
            };

            this.addChild( node, 10 );
            node.setPosition( winSize.width/2, winSize.height/2 );
        }
    },

    title:function () {
        return "gl.clear(gl.COLOR_BUFFER_BIT)";
    },
    subtitle:function () {
        return "Testing gl.clear() with cc.GLNode";
    },

    //
    // Automation
    //
    getExpectedResult:function() {
        // black pixel, not a blue pixel
        var ret = {"0":0,"1":0,"2":0,"3":255};
        return JSON.stringify(ret);
    },

    getCurrentResult:function() {
        var ret = new Uint8Array(4);
        gl.readPixels(winSize.width/2,  winSize.height/2,  1, 1, gl.RGBA, gl.UNSIGNED_BYTE, ret);
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// GLCustomDrawTest
//
//------------------------------------------------------------------
var GLCustomDrawTest = OpenGLTestLayer.extend({

    ctor:function() {
        this._super();

        if( 'opengl' in sys.capabilities ) {

            // simple shader example taken from:
            // http://learningwebgl.com/blog/?p=134
            var vsh = "\n" +
"attribute vec3 aVertexPosition;\n" +
"attribute vec4 aVertexColor;\n" +
"uniform mat4 uMVMatrix;\n" +
"uniform mat4 uPMatrix;\n" +
"varying vec4 vColor;\n" +
"void main(void) {\n" +
" gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n" +
" vColor = aVertexColor;\n" +
"}\n";

            var fsh = "\n" +
"#ifdef GL_ES\n" +
"precision mediump float;\n" +
"#endif\n" +
"varying vec4 vColor;\n" +
"void main(void) {\n"+
" gl_FragColor = vColor;\n" +
"}\n";

            var fshader = this.compileShader(fsh, 'fragment');
            var vshader = this.compileShader(vsh, 'vertex');

            this.shaderProgram = gl.createProgram();

            gl.attachShader(this.shaderProgram, vshader);
            gl.attachShader(this.shaderProgram, fshader);
            gl.linkProgram(this.shaderProgram);

            if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
                throw("Could not initialise shaders");
            }


            gl.useProgram(this.shaderProgram);

            var vertexPositionAttribute = gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
            gl.enableVertexAttribArray(vertexPositionAttribute);

            var vertexColorAttribute = gl.getAttribLocation(this.shaderProgram, "aVertexColor");
            gl.enableVertexAttribArray(vertexColorAttribute);

            var pMatrixUniform = gl.getUniformLocation(this.shaderProgram, "uPMatrix");
            var mvMatrixUniform = gl.getUniformLocation(this.shaderProgram, "uMVMatrix");
        }
    },

    compileShader:function(source, type) {
        var shader;
        if( type == 'fragment' )
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        else
            shader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if( !gl.getShaderParameter(shader, gl.COMPILE_STATUS) ) {
            cc.log( gl.getShaderInfoLog(shader) );
            throw("Could not compile " + type + " shaders");
        }
        return shader;
    },

    title:function () {
        return "gl.drawElements(gl.COLOR_BUFFER_BIT)";
    },
    subtitle:function () {
        return "Testing gl.clear() with cc.GLNode";
    },

    //
    // Automation
    //
    getExpectedResult:function() {
        // black pixel, not a blue pixel
        var ret = {"0":0,"1":0,"2":0,"3":255};
        return JSON.stringify(ret);
    },

    getCurrentResult:function() {
        var ret = new Uint8Array(4);
        gl.readPixels(winSize.width/2,  winSize.height/2,  1, 1, gl.RGBA, gl.UNSIGNED_BYTE, ret);
        return JSON.stringify(ret);
    }
});
//-
//
// Flow control
//
var arrayOfOpenGLTest = [

    GLReadPixelsTest,
    GLClearTest,
    GLCustomDrawTest
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
