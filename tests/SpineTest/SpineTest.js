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

SpineTestScene = TestScene.extend({

    runThisTest:function () {
        var layer = SpineTest.create();
        this.addChild(layer);

        director.replaceScene(this);
    }
});

touchcount = 0;

SpineTest = BaseTestLayer.extend({
    ctor:function () {
        this._super(cc.c4b(0,0,0,255), cc.c4b(98,99,117,255));

        size = director.getWinSize();

        /////////////////////////////
        // Make Spine's Animated skeleton Node
        // You need 'json + atlas + image' resource files to make it.
        // No JS binding for spine-c in this version. So, only file loading is supported.
        spineboy = cc.SkeletonAnimation.createWithFile('res/skeletons/spineboy.json', 'res/skeletons/spineboy.atlas');
        spineboy.setPosition(cc.p(size.width / 2, size.height / 2 - 150));
        spineboy.setAnimation('walk', true, 0);
        spineboy.setMix('walk', 'jump', 0.2, 0);
        spineboy.setMix('jump', 'walk', 0.4, 0);
        this.addChild(spineboy, 4);
    },
    onBackCallback:function (sender) {
    },
    onRestartCallback:function (sender) {
    },
    onNextCallback:function (sender) {
        touchcount++;
        spineboy.setAnimation(['walk', 'jump'][touchcount % 2], true, 0);
    },
    subtitle:function () {
        return "Spine test";
    },
    title:function () {
        return "Spine test";
    },

    // automation
    numberOfPendingTests:function() {
        return 1;
    },
    getTestNumber:function() {
        return 0;
    }

});

SpineTest.create = function () {
    return new SpineTest();
};