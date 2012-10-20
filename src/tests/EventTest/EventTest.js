/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.


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

var TEXT_INPUT_FONT_NAME = "Thonburi";
var TEXT_INPUT_FONT_SIZE = 36;

var sceneIdx = -1;

/**
 @brief EventTest for retain prev, reset, next, main menu buttons.
 */
var EventTest = cc.Layer.extend({
    ctor:function() {
        this._super();

        cc.associateWithNative( this, cc.Layer );
        this.init();
    },

    restartCallback:function (sender) {
        var s = new EventTestScene();
        s.addChild(restartEventsTest());
        director.replaceScene(s);
    },
    nextCallback:function (sender) {
        var s = new EventTestScene();
        s.addChild(nextEventsTest());
        director.replaceScene(s);
    },
    backCallback:function (sender) {
        var s = new EventTestScene();
        s.addChild(previousEventsTest());
        director.replaceScene(s);
    },

    title:function () {
        return "Event Test";
    },

    onEnter:function () {
        this._super();

        var s = director.getWinSize();

        var label = cc.LabelTTF.create(this.title(), "Arial", 24);
        this.addChild(label);
        label.setPosition(cc.p(s.width / 2, s.height - 50));

        var subTitle = this.subtitle();
        if (subTitle && subTitle !== "") {
            var l = cc.LabelTTF.create(subTitle, "Thonburi", 16);
            this.addChild(l, 1);
            l.setPosition(cc.p(s.width / 2, s.height - 80));
        }

        var item1 = cc.MenuItemImage.create(s_pathB1, s_pathB2, this, this.backCallback);
        var item2 = cc.MenuItemImage.create(s_pathR1, s_pathR2, this, this.restartCallback);
        var item3 = cc.MenuItemImage.create(s_pathF1, s_pathF2, this, this.nextCallback);

        var menu = cc.Menu.create(item1, item2, item3);
        menu.setPosition(cc.p(0,0));
        item1.setPosition(cc.p(s.width / 2 - 100, 30));
        item2.setPosition(cc.p(s.width / 2, 30));
        item3.setPosition(cc.p(s.width / 2 + 100, 30));

        this.addChild(menu, 1);
    }
});

//------------------------------------------------------------------
//
// OneByOne Touches
//
//------------------------------------------------------------------
var TouchOneByOneTest = EventTest.extend({
    init:function () {
        this._super();

        var t = cc.config.deviceType;
        if( t == 'browser' )  {
            this.setTouchMode(cc.TOUCH_ONE_BY_ONE);
            this.setTouchEnabled(true);
        } else if( t == 'desktop' ) {
            cc.log("TOUCH-ONE-BY-ONE test is not supported on desktop");
        } else if( t == 'mobile' ) {
            this.setTouchMode(cc.TOUCH_ONE_BY_ONE);
            this.setTouchEnabled(true);
        }
    },
    subtitle:function () {
        return "Touches One by One. Touch the left / right and see console";
    },
    onTouchBegan:function(touch, event) {
        var pos = touch.getLocation();
        cc.log("onTouchBegan at: " + pos.x + " " + pos.y );
        if( pos.x < winSize.width/2)
            return true;
        return false;
    },
    onTouchMoved:function(touch, event) {
        var pos = touch.getLocation();
        cc.log("onTouchMoved at: " + pos.x + " " + pos.y );
    },
    onTouchEnded:function(touch, event) {
        var pos = touch.getLocation();
        cc.log("onTouchEnded at: " + pos.x + " " + pos.y );
    },
    onTouchCancelled:function(touch, event) {
        var pos = touch.getLocation();
        cc.log("onTouchCancelled at: " + pos.x + " " + pos.y );
    }
});

//------------------------------------------------------------------
//
// All At Once Touches
//
//------------------------------------------------------------------
var TouchAllAtOnce = EventTest.extend({
    init:function () {
        this._super();

        var t = cc.config.deviceType;
        if( t == 'browser' )  {
            // this is the default behavior. No need to set it explicitly.
            this.setTouchMode(cc.TOUCH_ALL_AT_ONCE);
            this.setTouchEnabled(true);
        } else if( t == 'desktop' ) {
            this.setTouchEnabled(true);
        } else if( t == 'mobile' ) {
            // this is the default behavior. No need to set it explicitly.
            this.setTouchMode(cc.TOUCH_ALL_AT_ONCE);
            this.setTouchEnabled(true);
        }
    },
    subtitle:function () {
        return "Touches All At Once. Touch and see console";
    },
    onTouchesBegan:function(touches, event) {
        for (var i=0; i < touches.length;i++ ) {
            var touch = touches[i];
            var pos = touch.getLocation();
            cc.log("Touch #" + i + ". onTouchesBegan at: " + pos.x + " " + pos.y );
        }
    },
    onTouchesMoved:function(touches, event) {
        for (var i=0; i < touches.length;i++ ) {
            var touch = touches[i];
            var pos = touch.getLocation();
            cc.log("Touch #" + i + ". onTouchesMoved at: " + pos.x + " " + pos.y );
        }
    },
    onTouchesEnded:function(touches, event) {
        for (var i=0; i < touches.length;i++ ) {
            var touch = touches[i];
            var pos = touch.getLocation();
            cc.log("Touch #" + i + ". onTouchesEnded at: " + pos.x + " " + pos.y );
        }
    },
    onTouchesCancelled:function(touches, event) {
        for (var i=0; i < touches.length;i++ ) {
            var touch = touches[i];
            var pos = touch.getLocation();
            cc.log("Touch #" + i + ". onTouchesCancelled at: " + pos.x + " " + pos.y );
        }
    }
});

//------------------------------------------------------------------
//
// Accelerometer test
//
//------------------------------------------------------------------
var AccelerometerTest = EventTest.extend({
    init:function () {
        this._super();

        var t = cc.config.deviceType;
        if( t == 'browser' )  {
            // not supported on browser
            cc.log("Not supported");
        } else if( t == 'desktop' ) {
            // not supported on desktop
            cc.log("Not supported");
        } else if( t == 'mobile' ) {
            // call is called 5 times per second
            this.setAccelerometerInterval(1/5);
            this.setAccelerometerEnabled(true);
        }
    },
    subtitle:function () {
        return "Accelerometer test. Move device and see console";
    },
    onAccelerometer:function(accelEvent) {
        cc.log('Accel x: '+ accelEvent.x + ' y:' + accelEvent.y + ' z:' + accelEvent.z + ' time:' + accelEvent.timestamp );
    }
});

//------------------------------------------------------------------
//
// Mouse test
//
//------------------------------------------------------------------
var MouseTest = EventTest.extend({
    init:function () {
        this._super();

        var t = cc.config.deviceType;
        if( t == 'browser' )  {
            this.setMouseEnabled(true);
        } else if( t == 'desktop' ) {
            // not supported on desktop
            this.setMouseEnabled(true);
        } else if( t == 'mobile' ) {
            // not supported on device
            cc.log("Not supported");
        }
    },
    subtitle:function () {
        return "Mouse test. Move mouse and see console";
    },
    onMouseDown:function(event) {
        var pos = event.getLocation();
        cc.log("onMouseDown at: " + pos.x + " " + pos.y );
    },
    onMouseDragged:function(event) {
        var pos = event.getLocation();
        cc.log("onMouseDragged at: " + pos.x + " " + pos.y );
    },
    onMouseUp:function(event) {
        var pos = event.getLocation();
        cc.log("onMouseUp at: " + pos.x + " " + pos.y );
    }
});

//------------------------------------------------------------------
//
// Keyboard test
//
//------------------------------------------------------------------
var KeyboardTest = EventTest.extend({
    init:function () {
        this._super();

        var t = cc.config.deviceType;
        if( t == 'browser' )  {
            this.setKeyboardEnabled(true);
        } else if( t == 'desktop' ) {
            this.setKeyboardEnabled(true);
        } else if( t == 'mobile' ) {
            // not supported on device
            cc.log("Not supported");
        }
    },
    subtitle:function () {
        return "Keyboard test. Press keyboard and see console";
    },
    onKeyUp:function(key) {
        cc.log("Key up:" + key);
    },
    onKeyDown:function(key) {
        cc.log("Key down:" + key);
    },
    // this callback is only available on JSB + OS X
    // Not supported on cocos2d-html5
    onKeyFlagsChanged:function(key) {
        cc.log("Key flags changed:" + key);
    }
});


var EventTestScene = TestScene.extend({
    runThisTest:function () {
        sceneIdx = -1;
        var layer = nextEventsTest();
        // var menu = new EventTest();
        // menu.addKeyboardNotificationLayer( layer );

        this.addChild(layer);
        director.replaceScene(this);
    }
});

//
// Flow control
//
var arrayOfEventsTest = [
    TouchOneByOneTest,
    TouchAllAtOnce,
    AccelerometerTest,
    MouseTest,
    KeyboardTest
];

var nextEventsTest = function () {
    sceneIdx++;
    sceneIdx = sceneIdx % arrayOfEventsTest.length;

    return new arrayOfEventsTest[sceneIdx]();
};
var previousEventsTest = function () {
    sceneIdx--;
    if (sceneIdx < 0)
        sceneIdx += arrayOfEventsTest.length;

    return new arrayOfEventsTest[sceneIdx]();
};
var restartEventsTest = function () {
    return new arrayOfEventsTest[sceneIdx]();
};

