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
// FileUtilsBase
//
//------------------------------------------------------------------
var FileUtilsBase = cc.LayerGradient.extend({
    _title:"",
    _subtitle:"",

    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.LayerGradient );
        this.init( cc.c4b(0,0,0,255), cc.c4b(98,99,117,255));
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

        var item1 = cc.MenuItemImage.create(s_pathB1, s_pathB2, this.onBackCallback, this);
        var item2 = cc.MenuItemImage.create(s_pathR1, s_pathR2, this.onRestartCallback, this);
        var item3 = cc.MenuItemImage.create(s_pathF1, s_pathF2, this.onNextCallback, this);

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
        var s = new FileUtilsTestScene();
        s.addChild(restartFileUtilsTest());
        director.replaceScene(s);
    },
    onNextCallback:function (sender) {
        var s = new FileUtilsTestScene();
        s.addChild(nextFileUtilsTest());
        director.replaceScene(s);
    },
    onBackCallback:function (sender) {
        var s = new FileUtilsTestScene();
        s.addChild(previousFileUtilsTest());
        director.replaceScene(s);
    }
});

//------------------------------------------------------------------
//
// FilenameLookupTest
//
//------------------------------------------------------------------
var FilenameLookupTest = FileUtilsBase.extend({
    _title:"Testing FilenameLookup ",
    _subtitle:"You should see a grossini on the screen",

    ctor:function () {
        this._super();

        var t = sys.platform;
        if( t == 'mobile')  {
            cc.FileUtils.getInstance().loadFilenameLookup('FileUtils/lookup-mobile.plist');
        } else if( t == 'desktop' ) {
            cc.FileUtils.getInstance().loadFilenameLookup('FileUtils/lookup-desktop.plist');
        } else {
            cc.FileUtils.getInstance().loadFilenameLookup('FileUtils/lookup-html5.plist');
        }

        var sprite = cc.Sprite.create("grossini.bmp");
        this.addChild( sprite );
        sprite.setPosition( winSize.width/2, winSize.height/2);
    }
});

var FileUtilsTestScene = TestScene.extend({
    runThisTest:function () {
        sceneIdx = -1;
        var layer = nextFileUtilsTest();
        this.addChild(layer);

        director.replaceScene(this);
    }
});

//
// Flow control
//

var arrayOfFileUtilsTest = [

    FilenameLookupTest
];

var nextFileUtilsTest = function () {
    sceneIdx++;
    sceneIdx = sceneIdx % arrayOfFileUtilsTest.length;

    return new arrayOfFileUtilsTest[sceneIdx]();
};
var previousFileUtilsTest = function () {
    sceneIdx--;
    if (sceneIdx < 0)
        sceneIdx += arrayOfFileUtilsTest.length;

    return new arrayOfFileUtilsTest[sceneIdx]();
};
var restartFileUtilsTest = function () {
    return new arrayOfFileUtilsTest[sceneIdx]();
};

