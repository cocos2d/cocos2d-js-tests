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

var multiViewTestSceneIdx = -1;
//------------------------------------------------------------------
//
// MultiViewTestBase
//
//------------------------------------------------------------------
var MultiViewTestBase = BaseTestLayer.extend({
    _title:"",
    _subtitle:"",

    ctor:function() {
        this._super(cc.c4b(0,0,0,255), cc.c4b(98,99,117,255));
    },

    onRestartCallback:function (sender) {
        var s = new MultiViewTestScene();
        s.addChild(restartMultiViewTest());
        director.replaceScene(s);
    },
    onNextCallback:function (sender) {
        var s = new MultiViewTestScene();
        s.addChild(nextMultiViewTest());
        director.replaceScene(s);
    },
    onBackCallback:function (sender) {
        var s = new MultiViewTestScene();
        s.addChild(previousMultiViewTest());
        director.replaceScene(s);
    },
    // automation
    numberOfPendingTests:function() {
        return ( (arrayOfMultiViewTest.length-1) - multiViewTestSceneIdx );
    },

    getTestNumber:function() {
        return multiViewTestSceneIdx;
    }

});


//------------------------------------------------------------------
//
// CapabilitiesTest
//
//------------------------------------------------------------------
var KillAndSwitchTest = MultiViewTestBase.extend({
    _title:"Stability test: Kill and Switch Activity/View",
    _subtitle:"Coming back into cocos2d-x should start a new instance of TestJavascript",

    handleCloseActivity: function() {
	cc.switchAndKillActivity();
    },

    ctor:function () {
        this._super();
	
        var clickButton = cc.MenuItemFont.create("Click here to kill this cocos2d-x Activity and switch to new one", this.handleCloseActivity, this);
	var menu = cc.Menu.create(clickButton);
        menu.alignItemsVertically();
	this.addChild(menu);
    }
});


var MultiViewTestScene = TestScene.extend({
    runThisTest:function () {
        multiViewTestSceneIdx = -1;
        var layer = nextMultiViewTest();
        this.addChild(layer);

        director.replaceScene(this);
    }
});

//
// Flow control
//

var arrayOfMultiViewTest = [
];

var arrayOfIOSSpeceficTests = [    
];

var arrayOfAndroidSpeceficTests = [    
    KillAndSwitchTest    				  
];

if(sys.os == "android") {
    arrayOfMultiViewTest = arrayOfMultiViewTest.concat(arrayOfAndroidSpeceficTests);
} else if(sys.os == "ios") {
    arrayOfMultiViewTest.concat(arrayOfIOSSpeceficTests);
}

var nextMultiViewTest = function () {
    multiViewTestSceneIdx++;
    multiViewTestSceneIdx = multiViewTestSceneIdx % arrayOfMultiViewTest.length;

    return new arrayOfMultiViewTest[multiViewTestSceneIdx]();
};
var previousMultiViewTest = function () {
    multiViewTestSceneIdx--;
    if (multiViewTestSceneIdx < 0)
        multiViewTestSceneIdx += arrayOfMultiViewTest.length;

    return new arrayOfMultiViewTest[multiViewTestSceneIdx]();
};
var restartMultiViewTest = function () {
    return new arrayOfMultiViewTest[multiViewTestSceneIdx]();
};

