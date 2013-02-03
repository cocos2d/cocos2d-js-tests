/****************************************************************************
 Copyright (c) 2010-2013 cocos2d-x.org
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

var sceneIdx = -1;

var SIZE_X = 800;
var SIZE_Y = 450;

var ShaderTestDemo = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },

    title:function () {
        return "No title";
    },

    subtitle:function () {
        return "";
    },

    init:function () {
        var winSize = cc.Director.getInstance().getWinSize();

        var label = cc.LabelTTF.create(this.title(), "Arial", 26);
        this.addChild(label, 1);
        label.setPosition(cc.p(winSize.width / 2, winSize.height - 50));
        label.setColor(cc.RED);

        var subtitle = this.subtitle();
        if (subtitle.length > 0) {
            var subtitleLabel = cc.LabelTTF.create(subtitle, "Arial", 16);
            this.addChild(subtitleLabel, 1);
            subtitleLabel.setPosition(cc.p(winSize.width / 2, winSize.height - 80));
        }

        var item1 = cc.MenuItemImage.create(s_pathB1, s_pathB2, this.backCallback, this);
        var item2 = cc.MenuItemImage.create(s_pathR1, s_pathR2, this.restartCallback, this);
        var item3 = cc.MenuItemImage.create(s_pathF1, s_pathF2, this.nextCallback, this);
        var menu = cc.Menu.create(item1, item2, item3);

        menu.setPosition(cc.p(0, 0));
        var cs = item2.getContentSize();
        item1.setPosition(cc.p(winSize.width / 2 - cs.width * 2, cs.height / 2));
        item2.setPosition(cc.p(winSize.width / 2, cs.height / 2));
        item3.setPosition(cc.p(winSize.width / 2 + cs.width * 2, cs.height / 2));
        this.addChild(menu, 1);

        return true;
    },

    restartCallback:function (sender) {
        var scene = new ShaderTestScene();
        scene.addChild(restartShaderTest());
        cc.Director.getInstance().replaceScene(scene);
    },

    nextCallback:function (sender) {
        var scene = new ShaderTestScene();
        scene.addChild(nextShaderTest());
        cc.Director.getInstance().replaceScene(scene);
    },

    backCallback:function (sender) {
        var scene = new ShaderTestScene();
        scene.addChild(previousShaderTest());
        cc.Director.getInstance().replaceScene(scene);
    }
});

var ShaderMonjori = ShaderTestDemo.extend({
    title:function () {
        return "Shader: Frag shader";
    },

    subtitle:function () {
        return "Monjori plane deformations";
    },

    init:function () {
        if (this._super()) {
            var sn = ShaderNode.create(EXAMPLE_MONJORI_VERT, EXAMPLE_MONJORI_FRAG);

            var winSize = cc.Director.getInstance().getWinSize();
            sn.setPosition(cc.p(winSize.width / 2, winSize.height / 2));

            this.addChild(sn);
            return true;
        }
        return false;
    }
});

var ShaderMandelbrot = ShaderTestDemo.extend({
    title:function () {
        return "Shader: Frag shader";
    },

    subtitle:function () {
        return "Mandelbrot shader with Zoom";
    },

    init:function () {
        if (this._super()) {
            var sn = ShaderNode.create(EXAMPLE_MANDELBROT_VERT, EXAMPLE_MANDELBROT_FRAG);

            var winSize = cc.Director.getInstance().getWinSize();
            sn.setPosition(cc.p(winSize.width / 2, winSize.height / 2));

            this.addChild(sn);
            return true;
        }
        return false;
    }
});


var ShaderJulia = ShaderTestDemo.extend({
    title:function () {
        return "Shader: Frag shader";
    },

    subtitle:function () {
        return "Julia shader";
    },

    init:function () {
        if (this._super()) {
            var sn = ShaderNode.create(EXAMPLE_JULIA_VERT, EXAMPLE_JULIA_FRAG);

            var winSize = cc.Director.getInstance().getWinSize();
            sn.setPosition(cc.p(winSize.width / 2, winSize.height / 2));

            this.addChild(sn);
            return true;
        }
        return false;
    }
});

var ShaderHeart = ShaderTestDemo.extend({
    title:function () {
        return "Shader: Frag shader";
    },

    subtitle:function () {
        return "Heart";
    },

    init:function () {
        if (this._super()) {
            var sn = ShaderNode.create(EXAMPLE_HEART_VERT, EXAMPLE_HEART_FRAG);

            var winSize = cc.Director.getInstance().getWinSize();
            sn.setPosition(cc.p(winSize.width / 2, winSize.height / 2));

            this.addChild(sn);
            return true;
        }
        return false;
    }
});


var ShaderFlower = ShaderTestDemo.extend({
    title:function () {
        return "Shader: Frag shader";
    },

    subtitle:function () {
        return "Flower";
    },

    init:function () {
        if (this._super()) {
            var sn = ShaderNode.create(EXAMPLE_FLOWER_VERT, EXAMPLE_FLOWER_FRAG);

            var winSize = cc.Director.getInstance().getWinSize();
            sn.setPosition(cc.p(winSize.width / 2, winSize.height / 2));

            this.addChild(sn);
            return true;
        }
        return false;
    }
});


var ShaderPlasma = ShaderTestDemo.extend({
    title:function () {
        return "Shader: Frag shader";
    },

    subtitle:function () {
        return "Plasma";
    },

    init:function () {
        if (this._super()) {
            var sn = ShaderNode.create(EXAMPLE_PLASMA_VERT, EXAMPLE_PLASMA_FRAG);

            var winSize = cc.Director.getInstance().getWinSize();
            sn.setPosition(cc.p(winSize.width / 2, winSize.height / 2));

            this.addChild(sn);
            return true;
        }
        return false;
    }
});


var ShaderBlur = ShaderTestDemo.extend({
    title:function () {

    },

    subtitle:function () {

    },

    init:function () {

    }
});

var ShaderRetroEffect = ShaderTestDemo.extend({
    _label:null,
    _accum:0,

    update:function (dt) {
        this._accum += dt;

        var children = this._label.getChildren();
        for (var i = 0; i < children.length;) {
            var sprite = children[i];
            i++;
            var oldPosition = sprite.getPosition();
            sprite.setPosition(cc.p(oldPosition.x, Math.sin(this._accum * 2 + i / 2.0) * 20));

            sprite.setScaleY(Math.sin(this._accum * 2 + i / 2.0 + 0.707));
        }
    },

    title:function () {
        return "Shader: Retro test";
    },

    subtitle:function () {
        return "sin() effect with moving colors";
    },

    init:function () {
        if (this._super()) {
            var fragSource = EXAMPLE_HORIZONTALCOLOR_FRAG;
            var program = new cc.GLProgram();
            program.initWithVertexShaderByteArray(cc.SHADER_POSITION_TEXTURE_VERT, fragSource);

            program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
            program.addAttribute(cc.ATTRIBUTE_NAME_TEXCOORD, cc.VERTEX_ATTRIB_TEXCOORDS);

            program.link();
            program.updateUniforms();

            var winSize = cc.Director.getInstance().getWinSize();
            this._label = cc.LabelBMFont.create("RETRO EFFECT", s_west_england_64_fnt);
            this._label.setShaderProgram(program);

            this._label.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
            this.addChild(this._label);

            this.scheduleUpdate();
            return true;
        }
        return false;
    }
});

var ShaderFail = ShaderTestDemo.extend({
    title:function () {

    },

    subtitle:function () {

    },

    init:function () {

    }
});

var ShaderNode = cc.Node.extend({
    _center:null,
    _resolution:null,
    _time:0,
    _uniformCenter:null,
    _uniformResolution:null,
    _uniformTime:null,
    _vertexBuffer:null,

    ctor:function () {
        this._super();

        this._center = {x:0, y:0};
        this._resolution = {x:0, y:0};
    },

    initWithVertex:function (vert, frag) {
        this.loadShaderVertex(vert, frag);

        this._time = 0;
        this._resolution = new cc.Vertex2F(SIZE_X, SIZE_Y);

        this.scheduleUpdate();

        this.setContentSize(cc.SizeMake(SIZE_X, SIZE_Y));
        this.setAnchorPoint(cc.p(0.5, 0.5));

        var gl = cc.renderContext;
        this._vertextBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertextBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, SIZE_X, 0, SIZE_X, SIZE_Y, 0, 0, 0, SIZE_Y, SIZE_X, SIZE_Y]), gl.STATIC_DRAW);

        return true;
    },

    loadShaderVertex:function (vert, frag) {
        var shader = new cc.GLProgram();
        shader.initWithVertexShaderByteArray(vert, frag);

        shader.addAttribute("aVertex", cc.VERTEX_ATTRIB_POSITION);
        shader.link();

        shader.updateUniforms();

        var gl = cc.renderContext;
        this._uniformCenter = gl.getUniformLocation(shader.getProgram(), "center");
        this._uniformResolution = gl.getUniformLocation(shader.getProgram(), "resolution");
        this._uniformTime = gl.getUniformLocation(shader.getProgram(), "time");

        this.setShaderProgram(shader);
    },

    update:function (dt) {
        this._time += dt;
    },

    setPosition:function (newPosition) {
        this._super(newPosition);
        var position = this.getPosition();
        this._center = new cc.Vertex2F(position.x * cc.CONTENT_SCALE_FACTOR(), position.y * cc.CONTENT_SCALE_FACTOR());
    },

    draw:function (ctx) {
        var gl = ctx || cc.renderContext;

        cc.NODE_DRAW_SETUP(this);
        //
        // Uniforms
        //
        this.getShaderProgram().setUniformLocationWith2f(this._uniformCenter, this._center.x, this._center.y);
        this.getShaderProgram().setUniformLocationWith2f(this._uniformResolution, this._resolution.x, this._resolution.y);

        // time changes all the time, so it is Ok to call OpenGL directly, and not the "cached" version
        gl.uniform1f(this._uniformTime, this._time);

        cc.glEnableVertexAttribs(cc.VERTEX_ATTRIBFLAG_POSITION);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertextBuffer);
        gl.vertexAttribPointer(cc.VERTEX_ATTRIB_POSITION, 2, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        cc.INCREMENT_GL_DRAWS(1);
    }

});

ShaderNode.create = function (vert, frag) {
    var node = new ShaderNode();
    node.initWithVertex(vert, frag);
    return node;
};

var ShaderTestScene = TestScene.extend({
    runThisTest:function () {
        sceneIdx = -1;
        this.addChild(nextShaderTest());

        cc.Director.getInstance().replaceScene(this);
    }
});

var arrayOfShaderTest = [
    ShaderMonjori,
    ShaderMandelbrot,
    ShaderJulia,
    ShaderHeart,
    ShaderFlower,
    ShaderPlasma
    //ShaderBlur,
    //ShaderRetroEffect
    //ShaderFail
];

var nextShaderTest = function () {
    sceneIdx++;
    sceneIdx = sceneIdx % arrayOfShaderTest.length;

    return new arrayOfShaderTest[sceneIdx]();
};
var previousShaderTest = function () {
    sceneIdx--;
    if (sceneIdx < 0)
        sceneIdx += arrayOfShaderTest.length;

    return new arrayOfShaderTest[sceneIdx]();
};
var restartShaderTest = function () {
    return new arrayOfShaderTest[sceneIdx]();
};





