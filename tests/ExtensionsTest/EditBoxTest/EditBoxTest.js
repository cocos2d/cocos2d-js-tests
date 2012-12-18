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

var EditBoxTestLayer = cc.Layer.extend({
    init:function () {
        var box1 = cc.EditBox.create(cc.size(170, 50));
        box1.setText("EditBoxs");
        box1.setPosition(220, 50);
        box1.setBgClr(new cc.Color3B(255,0,0));
        box1.setFontColor(new cc.Color3B(251, 250, 0));
        box1.setBorderClr(new cc.Color3B(55, 250, 120));
        box1.setFontSize(20);
        this.addChild(box1);

        var box2 = cc.EditBox.create(cc.size(130, 40), new cc.Color3B(255, 255, 0));
        box2.setText("EditBox Sample");
        box2.setPosition(220, 150);
        box2.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        box2.setBgClr(new cc.Color3B(55, 150, 120));
        box2.setFontColor(new cc.Color3B(255, 250, 0));
        box2.setBorderClr(new cc.Color3B(55, 250, 120));
        this.addChild(box2);

        var box3 = cc.EditBox.create(cc.size(65, 40), new cc.Color3B(255, 255, 0));
        box3.setText("Image");
        box3.setPosition(220, 250);
        box3.setBgClr(new cc.Color3B(255, 250, 0));
        box3.setFontColor(new cc.Color3B(15, 250, 245));
        box3.setBorderClr(new cc.Color3B(55, 150, 120));
        box3.setImageStyle("res/extensions/orange_edit.png");
        this.addChild(box3);

        //var box4 = cc.ControlEditBox.create(240,35,14);
        var box4 = cc.EditBox.create(cc.size(180, 40), new cc.Color3B(255, 255, 0));
        box4.setPlaceholderFontColor(new cc.Color3B(255, 0, 0));
        box4.setPlaceHolder("Tooltip:");
        box4.setPosition(220, 350);
        box4.setBgClr(new cc.Color3B(255, 210, 50));
        box4.setFontColor(new cc.Color3B(5, 4, 10));
        box4.setBorderClr(new cc.Color3B(155, 160, 120));
        box4.setMaxLength(10);
        this.addChild(box4);

        var itemBack = cc.MenuItemFont.create("Back", this.toExtensionsMainLayer, this);
        itemBack.setPosition(cc.p(winSize.width - 50, 25));
        var menuBack = cc.Menu.create(itemBack);
        menuBack.setPosition(cc.p(0, 0));
        this.addChild(menuBack);

        return true;
    },

    toExtensionsMainLayer:function (sender) {
        var scene = new ExtensionsTestScene();
        scene.runThisTest();
    },

    scrollViewDidScroll:function (view) {
    },

    scrollViewDidZoom:function (view) {
    },

    tableCellTouched:function (table, cell) {
        cc.log("cell touched at index: " + cell.getIdx());
    },

    cellSizeForTable:function (table) {
        return cc.SizeMake(60, 60);
    }
});

EditBoxTestLayer.create = function () {
    var retObj = new EditBoxTestLayer();
    if (retObj && retObj.init()) {
        return retObj;
    }
    return null;
};

var runEditBoxTest = function () {
    var pScene = cc.Scene.create();
    var pLayer = EditBoxTestLayer.create();
    pScene.addChild(pLayer);
    cc.Director.getInstance().replaceScene(pScene);
};