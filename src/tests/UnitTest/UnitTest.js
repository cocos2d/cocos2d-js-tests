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

//------------------------------------------------------------------
//
// UnitTestBase
//
//------------------------------------------------------------------
var UnitTestBase = cc.Layer.extend({
    _title:"",
    _subtitle:"",

    ctor:function() {
        cc.associateWithNative( this, cc.Layer );
        this.init();
    },
    onEnter:function () {
        this._super();

        var label = cc.LabelTTF.create(this._title, "Arial", 28);
        this.addChild(label, 1);
        label.setPosition(cc.p(winSize.width / 2, winSize.height - 50));

        if (this._subtitle !== "") {
            var l = cc.LabelTTF.create(this._subtitle, "Thonburi", 16);
            this.addChild(l, 1);
            l.setPosition(cc.p(winSize.width / 2, winSize.height - 80));
        }

        var item1 = cc.MenuItemImage.create(s_pathB1, s_pathB2, this, this.onBackCallback);
        var item2 = cc.MenuItemImage.create(s_pathR1, s_pathR2, this, this.onRestartCallback);
        var item3 = cc.MenuItemImage.create(s_pathF1, s_pathF2, this, this.onNextCallback);

        var menu = cc.Menu.create(item1, item2, item3);

        menu.setPosition(cc.p(0,0));
        var cs = item2.getContentSize();
        item1.setPosition( cc.p(winSize.width/2 - cs.width*2, cs.height/2) );
        item2.setPosition( cc.p(winSize.width/2, cs.height/2) );
        item3.setPosition( cc.p(winSize.width/2 + cs.width*2, cs.height/2) );

        this.addChild(menu, 1);
    },

    onExit:function () {
        this._super();
    },

    onRestartCallback:function (sender) {
        var s = new UnitTestScene();
        s.addChild(restartUnitTest());
        director.replaceScene(s);
    },
    onNextCallback:function (sender) {
        var s = new UnitTestScene();
        s.addChild(nextUnitTest());
        director.replaceScene(s);
    },
    onBackCallback:function (sender) {
        var s = new UnitTestScene();
        s.addChild(previousUnitTest());
        director.replaceScene(s);
    }
});

//------------------------------------------------------------------
//
// RectUnitTest
//
//------------------------------------------------------------------
var RectUnitTest = UnitTestBase.extend({
    _title:"Rect Unit Test",
    _subtitle:"See console for possible errors",

    init:function () {
        this._super();

        var rectA;
        var rectB;
        var rectC;
        var point;

        cc.log("Test 1: rectIntersectsRect 1");
        rectA = cc.rect(0,0,5,10);
        rectB = cc.rect(4,9,5,10);
        if( !cc.rectIntersectsRect(rectA, rectB))
            throw "Fail rectIntersectsRect 1";

        cc.log("Test 2: rectIntersectsRect 2");
        rectA = cc.rect(0,0,5,10);
        rectB = cc.rect(40,90,5,10);
        if( cc.rectIntersectsRect(rectA, rectB))
            throw "Fail rectIntersectsRect 2";

        cc.log("Test 3: rectIntersection");
        rectA = cc.rect(0,0,5,10);
        rectB = cc.rect(4,9,5,10);
        rectC = cc.rectIntersection(rectA, rectB);
        if( ! cc.rectEqualToRect(rectC, cc.rect(4,9,1,1) ) )
            throw "Fail rectIntersection";

        cc.log("Test 4: rectUnion");
        rectA = cc.rect(0,0,5,10);
        rectB = cc.rect(4,9,5,10);
        rectC = cc.rectUnion(rectA, rectB);
        if( ! cc.rectEqualToRect(rectC, cc.rect(0,0,9,19) ) )
            throw "Fail rectUnion";

        cc.log("Test 5: rectContainsPoint 1");
        rectA = cc.rect(0,0,5,10);
        point = cc.p(1,1);
        if( ! cc.rectContainsPoint(rectA, point) )
            throw "Fail rectContainsPoint 1";

        cc.log("Test 6: rectContainsPoint 2");
        rectA = cc.rect(0,0,5,10);
        point = cc.p(1,-1);
        if( cc.rectContainsPoint(rectA, point) )
            throw "Fail rectContainsPoint 2";
    }
});


var UnitTestScene = TestScene.extend({
    runThisTest:function () {
        sceneIdx = -1;
        var layer = nextUnitTest();
        this.addChild(layer);

        director.replaceScene(this);
    }
});

//
// Flow control
//

var arrayOfUnitTest = [

    RectUnitTest

];

var nextUnitTest = function () {
    sceneIdx++;
    sceneIdx = sceneIdx % arrayOfUnitTest.length;

    return new arrayOfUnitTest[sceneIdx]();
};
var previousUnitTest = function () {
    sceneIdx--;
    if (sceneIdx < 0)
        sceneIdx += arrayOfUnitTest.length;

    return new arrayOfUnitTest[sceneIdx]();
};
var restartUnitTest = function () {
    return new arrayOfUnitTest[sceneIdx]();
};

