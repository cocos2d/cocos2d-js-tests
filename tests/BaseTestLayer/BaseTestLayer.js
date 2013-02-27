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

var autoTestEnabled = autoTestEnabled || false;

var BaseTestLayer = cc.LayerGradient.extend({

    ctor:function(colorA, colorB ) {

        sys.garbageCollect();

        this._super();
        cc.associateWithNative( this, cc.LayerGradient );

        // default gradient colors
        var a = cc.c4b(98,99,117,255);
        var b = cc.c4b(0,0,0,255);

        if( arguments.lenght >= 1 )
            a = colorA;
        if( arguments.lenght == 2 )
            b = colorB;
        this.init( a, b );

        // Update winsize in case it was resized
        winSize = director.getWinSize();

        if( autoTestEnabled ) {
            this.totalNumberOfTests = this.numberOfPendingTests();
            this.scheduleOnce( this.endTest, this.testDuration );
        }
    },

    //
    // Menu
    //
    onEnter:function () {
        this._super();

        var label = cc.LabelTTF.create(this.title(), "Arial", 28);
        this.addChild(label, 100);
        label.setPosition(winSize.width / 2, winSize.height - 50);

        var strSubtitle = this.subtitle();
        if (strSubtitle) {
            var l = cc.LabelTTF.create(strSubtitle.toString(), "Thonburi", 16);
            this.addChild(l, 101);
            l.setPosition(winSize.width / 2, winSize.height - 80);
        }

        var item1 = cc.MenuItemImage.create(s_pathB1, s_pathB2, this.onBackCallback, this);
        var item2 = cc.MenuItemImage.create(s_pathR1, s_pathR2, this.onRestartCallback, this);
        var item3 = cc.MenuItemImage.create(s_pathF1, s_pathF2, this.onNextCallback, this);

        var menu = cc.Menu.create(item1, item2, item3);

        menu.setPosition(0,0);
        var cs = item2.getContentSize();
        item1.setPosition( winSize.width/2 - cs.width*2, cs.height/2 );
        item2.setPosition( winSize.width/2, cs.height/2 );
        item3.setPosition( winSize.width/2 + cs.width*2, cs.height/2 );

        this.addChild(menu, 102);
    },
    onRestartCallback:function (sender) {
        // override me
    },
    onNextCallback:function (sender) {
        // override me
    },
    onBackCallback:function (sender) {
        // override me
    },
    //------------------------------------------
    //
    // Automation Test code
    //
    //------------------------------------------

    // How many seconds should this test run
    testDuration:0.25,

    // Automated test
    getExpectedResult:function() {
        // Override me
        throw "Not Implemented";
    },

    // Automated test
    getCurrentResult:function() {
        // Override me
        throw "Not Implemented";
    },

    tearDown:function(dt) {

        // Override to have a different behavior
        var current = this.getCurrentResult();
        var expected = this.getExpectedResult();

        if( current != expected )
            this.errorDescription = "Expected value: '" + expected + "'. Current value'" + current +  "'.";

        return ( current == expected );
    },

    endTest:function(dt) {

        this.errorDescription = "";
        title = this.title();

        try {
            if( this.tearDown(dt) ) {
                // Test OK
                cc.log( this.getTestNumber() + ": Test '" + title + "':' OK");
            } else {
                // Test failed
                cc.log( this.getTestNumber() + ": Test '" + title + "': Error: " + this.errorDescription );
            }
        } catch(err) {
            cc.log( this.getTestNumber() + ": Test '" + title + "':'" + err);
        }

        this.runNextTest();
    },

    numberOfPendingTests:function() {
        // override me. Should return true if the last test was executed
        throw "Override me: numberOfPendingTests";
    },

    getTestNumber:function() {
        throw "Override me: getTestNumber";
    },

    runNextTest:function() {
        if( this.numberOfPendingTests() <= 0 ) {
            var scene = cc.Scene.create();
            var layer = new TestController();
            scene.addChild(layer);
            director.replaceScene(scene);
        } else
            this.onNextCallback(this);
    },

    readPixels:function(x,y,w,h) {
        if( 'opengl' in sys.capabilities) {
            var size = 4 * w * h;
            var array = new Uint8Array(size);
            gl.readPixels(x, y, w, h, gl.RGBA, gl.UNSIGNED_BYTE, array);
            return array;
        } else {
            // implement a canvas-html5 readpixels
            throw "readPixels Not implemented on canvas yet";
        }
    }
});
