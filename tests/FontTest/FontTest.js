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
var TAG_LABEL1 = 550;
var TAG_LABEL2 = 551;
var TAG_LABEL3 = 552;
var TAG_LABEL4 = 553;

var fontIdx = 0;

var fontList = [

    // System Fonts
    "Verdana",
    "Lucida Sans Unicode",
    "Bookman Old Style",
    "Symbol",
    "Georgia",
    "Trebuchet MS",
    "Comic Sans MS",
    "Arial Black",
    "Tahoma",
    "Impact",

    // custom TTF
    "American Typewriter",
    "Marker Felt",
    "A Damn Mess",
    "Abberancy",
    "Abduction",
    "Paint Boy",
    "Schwarzwald",
    "Scissor Cuts"
];


function nextFontTestAction() {
    fontIdx++;
    fontIdx = fontIdx % fontList.length;
    return fontList[fontIdx];
}

function backFontTestAction() {
    fontIdx--;
    if (fontIdx < 0) {
        fontIdx += fontList.length;
    }

    return fontList[fontIdx];
}

function restartFontTestAction() {
    return fontList[fontIdx];
}
FontTestScene = TestScene.extend({

    runThisTest:function () {
        var layer = FontTest.create();
        this.addChild(layer);

        director.replaceScene(this);
    }
});

FontTest = cc.LayerGradient.extend({
    ctor:function () {
        this._super();
        cc.associateWithNative( this, cc.LayerGradient );
        this.init( cc.c4b(0,0,0,255), cc.c4b(98,99,117,255));

        var item1 = cc.MenuItemImage.create(s_pathB1, s_pathB2, this.onBackCallback, this);
        var item2 = cc.MenuItemImage.create(s_pathR1, s_pathR2, this.onRestartCallback, this);
        var item3 = cc.MenuItemImage.create(s_pathF1, s_pathF2, this.onNextCallback, this);

        var menu = cc.Menu.create(item1, item2, item3);
        menu.setPosition(0,0);
        item1.setPosition(winSize.width / 2 - 100, 30);
        item2.setPosition(winSize.width / 2, 30);
        item3.setPosition(winSize.width / 2 + 100, 30);
        this.addChild(menu, 1);

        this.showFont(restartFontTestAction());

    },
    showFont:function (pFont) {
        this.removeChildByTag(TAG_LABEL1, true);
        this.removeChildByTag(TAG_LABEL2, true);
        this.removeChildByTag(TAG_LABEL3, true);
        this.removeChildByTag(TAG_LABEL4, true);

        var s = director.getWinSize();

        var top = cc.LabelTTF.create(pFont, pFont, 24);
        var left = cc.LabelTTF.create("alignment left", pFont, 32, cc.size(s.width, 50), cc.TEXT_ALIGNMENT_LEFT);
        var center = cc.LabelTTF.create("alignment center", pFont, 32, cc.size(s.width, 50), cc.TEXT_ALIGNMENT_CENTER);
        var right = cc.LabelTTF.create("alignment right", pFont, 32, cc.size(s.width, 50), cc.TEXT_ALIGNMENT_RIGHT);

        top.setPosition(s.width / 2, s.height * 3 / 4);
        left.setPosition(s.width / 2, s.height / 2);
        center.setPosition(s.width / 2, s.height * 3 / 8);
        right.setPosition(s.width / 2, s.height / 4);

        this.addChild(left, 0, TAG_LABEL1);
        this.addChild(right, 0, TAG_LABEL2);
        this.addChild(center, 0, TAG_LABEL3);
        this.addChild(top, 0, TAG_LABEL4);

    },

    onBackCallback:function (sender) {
        this.showFont(backFontTestAction());
    },
    onRestartCallback:function (sender) {
        this.showFont(restartFontTestAction());
    },
    onNextCallback:function (sender) {
        this.showFont(nextFontTestAction());
    },
    title:function () {
        return "Font test";
    }
});

FontTest.create = function () {
    return new FontTest();
};
