/****************************************************************************
 Copyright (c) 2010-2014 cocos2d-x.org

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

var eventDispatcherSceneIdx = -1;

var EventDispatcherTestDemo = BaseTestLayer.extend({
    ctor:function() {
        this._super(cc.color(0,0,0,255), cc.color(160,32,32,255));
    },

    title:function () {
        return "No title";
    },

    subtitle:function () {
        return "";
    },

    onBackCallback:function (sender) {
        var s = new EventDispatcherTestScene();
        s.addChild(previousDispatcherTest());
        director.runScene(s);
    },

    onRestartCallback:function (sender) {
        var s = new EventDispatcherTestScene();
        s.addChild(restartDispatcherTest());
        director.runScene(s);
    },

    onNextCallback:function (sender) {
        var s = new EventDispatcherTestScene();
        s.addChild(nextDispatcherTest());
        director.runScene(s);
    },
    // automation
    numberOfPendingTests:function() {
        return ( (arrayOfEventDispatcherTest.length-1) - eventDispatcherSceneIdx );
    },

    getTestNumber:function() {
        return eventDispatcherSceneIdx;
    }
});

var TouchableSpriteTest =  EventDispatcherTestDemo.extend({
    onEnter:function(){
        this._super();

        var origin = director.getVisibleOrigin();
        var size = director.getVisibleSize();

        var sprite1 = cc.Sprite.create("res/Images/CyanSquare.png");
        sprite1.setPosition(origin.x + size.width/2 - 80, origin.y + size.height/2 + 80);
        this.addChild(sprite1, 10);

        var sprite2 = cc.Sprite.create("res/Images/MagentaSquare.png");
        sprite2.setPosition(origin.x + size.width/2, origin.y + size.height/2);
        this.addChild(sprite2, 20);

        var sprite3 = cc.Sprite.create("res/Images/YellowSquare.png");
        sprite3.setPosition(0,0);
        sprite2.addChild(sprite3, 1);

        // Make sprite1 touchable
        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    target.opacity = 180;
                    return true;
                }
                return false;
            },
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
                var delta = touch.getDelta();
                target.x += delta.x;
                target.y += delta.y;
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                cc.log("sprite onTouchesEnded.. ");
                target.setOpacity(255);
                if (target == sprite2) {
                    sprite1.setLocalZOrder(100);
                } else if (target == sprite1) {
                    sprite1.setLocalZOrder(0);
                }
            }
        });

        cc.eventManager.addListener(listener1, sprite1);
        cc.eventManager.addListener(listener1.clone(), sprite2);
        cc.eventManager.addListener(listener1.clone(), sprite3);
        var selfPointer = this;

        var removeAllTouchItem = cc.MenuItemFont.create("Remove All Touch Listeners", function(senderItem){
            senderItem.setString("Only Next item could be clicked");

            cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE);

            var nextItem = cc.MenuItemFont.create("Next", function(sender){
                selfPointer.onNextCallback();
            });

            nextItem.fontSize = 16;
            nextItem.x = cc.visibleRect.right.x -100;
	        nextItem.y = cc.visibleRect.right.y - 30;

            var menu2 = cc.Menu.create(nextItem);
            menu2.setPosition(0, 0);
            menu2.setAnchorPoint(0, 0);
            selfPointer.addChild(menu2);
        });

        removeAllTouchItem.fontSize = 16;
        removeAllTouchItem.x = cc.visibleRect.right.x -100;
	    removeAllTouchItem.y = cc.visibleRect.right.y;

        var menu = cc.Menu.create(removeAllTouchItem);
        menu.setPosition(0, 0);
        menu.setAnchorPoint(0, 0);
        this.addChild(menu);
    },

    title:function(){
        return "Touchable Sprite Test";
    },

    subtitle:function(){
        return "Please drag the blocks";
    }
});

TouchableSpriteTest.create = function(){
    var test = new TouchableSpriteTest();
    test.init();
    return test;
};

var TouchableSpriteWithFixedPriority = cc.Sprite.extend({
    _listener:null,
    _fixedPriority:0,
    _useNodePriority:false,

    setPriority:function(fixedPriority){
        this._fixedPriority = fixedPriority;
        this._useNodePriority = false;
    },

    setPriorityWithThis: function(useNodePriority) {
        this._useNodePriority = useNodePriority;
        this._fixedPriority = true;
    },

    onEnter:function(){
        this._super();

        var selfPointer = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var locationInNode = selfPointer.convertToNodeSpace(touch.getLocation());
                var s = selfPointer.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    selfPointer.setColor(cc.color.red);
                    return true;
                }
                return false;
            },
            onTouchMoved: function (touch, event) {
                //this.setPosition(this.getPosition() + touch.getDelta());
            },
            onTouchEnded: function (touch, event) {
                selfPointer.setColor(cc.color.white);
            }
        });

        if (this._useNodePriority)
            cc.eventManager.addListener(listener, this);
        else
            cc.eventManager.addListener(listener, this._fixedPriority);
        this._listener = listener;
    },

    onExit: function(){
        cc.eventManager.removeListener(this._listener);
        this._super();
    }
});

TouchableSpriteWithFixedPriority.create = function(){
    var test = new TouchableSpriteWithFixedPriority();
    test.init();
    return test;
};


var FixedPriorityTest =  EventDispatcherTestDemo.extend({
    onEnter:function(){
        this._super();

        var origin = director.getVisibleOrigin();
        var size = director.getVisibleSize();

        var sprite1 = TouchableSpriteWithFixedPriority.create();
        sprite1.initWithFile("res/Images/CyanSquare.png");
        sprite1.setPriority(30);
        sprite1.setPosition(origin.x +size.width/2 - 80, origin.y - size.height/2 + 40);
        this.addChild(sprite1, 10);

        var sprite2 = TouchableSpriteWithFixedPriority.create();
        sprite2.initWithFile("res/Images/MagentaSquare.png");
        sprite2.setPriority(20);
        sprite2.setPosition(origin.x + size.width/2, origin.y + size.height/2);
        this.addChild(sprite2, 20);

        var sprite3 = TouchableSpriteWithFixedPriority.create();
        sprite3.initWithFile("res/Images/YellowSquare.png");
        sprite3.setPriority(10);
        sprite3.setPosition(0, 0);
        sprite2.addChild(sprite3, 1);
    },

    title:function(){
        return "Fixed priority test";
    },

    subtitle:function(){
        return "Fixed Priority, Blue: 30, Red: 20, Yellow: 10\n The lower value the higher priority will be.";
    }
});

FixedPriorityTest.create = function(){
    var test = new FixedPriorityTest();
    test.init();
    return test;
};

var RemoveListenerWhenDispatching =  EventDispatcherTestDemo.extend({
    onEnter:function(){
        this._super();

        var origin = director.getVisibleOrigin();
        var size = director.getVisibleSize();

        var sprite1 = cc.Sprite.create("res/Images/CyanSquare.png");
        sprite1.setPosition(origin.x + size.width/2, origin.y + size.height/2);
        this.addChild(sprite1, 10);

        // Make sprite1 touchable
        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var locationInNode = sprite1.convertToNodeSpace(touch.getLocation());
                var s = sprite1.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    sprite1.setColor(cc.color.red);
                    return true;
                }
                return false;
            },
            onTouchEnded: function (touch, event) {
                sprite1.setColor(cc.color.white);
            }
        });
        this.setUserObject(listener1);

        cc.eventManager.addListener(listener1, sprite1);

        var statusLabel = cc.LabelTTF.create("The sprite could be touched!", "", 20);
        statusLabel.setPosition(origin.x + size.width/2, origin.y + size.height-90 );
        this.addChild(statusLabel);

        var enable = true;

        // Enable/Disable item
        var toggleItem = cc.MenuItemToggle.create(cc.MenuItemFont.create("Enabled"), cc.MenuItemFont.create("Disabled"),
            function (sender) {
                if (enable) {
                    cc.eventManager.removeListener(listener1);
                    statusLabel.setString("The sprite could not be touched!");
                    enable = false;
                } else {
                    cc.eventManager.addListener(listener1, sprite1);
                    statusLabel.setString("The sprite could be touched!");
                    enable = true;
                }
            });

        toggleItem.setPosition(origin.x + size.width/2, origin.y + 80);
        var menu = cc.Menu.create(toggleItem);
        menu.setPosition(0, 0);
        menu.setAnchorPoint(0, 0);
        this.addChild(menu, 1);
    },

    title:function(){
        return "Add and remove listener\n when dispatching event";
    },

    subtitle:function(){
        return "";
    }
});

RemoveListenerWhenDispatching.create = function(){
    var test = new RemoveListenerWhenDispatching();
    test.init();
    return test;
};

var CustomEventTest =  EventDispatcherTestDemo.extend({
    _listener1: null,
    _listener2: null,
    _item1Count: 0,
    _item2Count: 0,

    onEnter:function(){
        this._super();

        var origin = director.getVisibleOrigin(), size = director.getVisibleSize(), selfPointer = this;

        cc.MenuItemFont.setFontSize(20);

        var statusLabel = cc.LabelTTF.create("No custom event 1 received!", "", 20);
        statusLabel.setPosition(origin.x + size.width / 2, origin.y + size.height - 90);
        this.addChild(statusLabel);

        /* this._listener1 = cc.EventListenerCustom.create("game_custom_event1", function(event){
            statusLabel.setString("Custom event 1 received, " + event.getUserData() + " times");
        });*/
        this._listener1 = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "game_custom_event1",
            callback: function(event){
                statusLabel.setString("Custom event 1 received, " + event.getUserData() + " times");
            }
        });

        cc.eventManager.addListener(this._listener1, 1);



        var sendItem = cc.MenuItemFont.create("Send Custom Event 1", function(sender){
            ++selfPointer._item1Count;
            var event = new cc.EventCustom("game_custom_event1");
            event.setUserData(selfPointer._item1Count.toString());
            cc.eventManager.dispatchEvent(event);
        });
        sendItem.setPosition(origin.x + size.width/2, origin.y + size.height/2);

        var statusLabel2 = cc.LabelTTF.create("No custom event 2 received!", "", 20);
        statusLabel2.setPosition(origin.x + size.width/2, origin.y + size.height-120);
        this.addChild(statusLabel2);

        this._listener2 = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "game_custom_event2",
            callback: function(event){
                statusLabel2.setString("Custom event 2 received, " + event.getUserData() + " times");
            }
        });

        cc.eventManager.addListener(this._listener2, 1);
        var sendItem2 = cc.MenuItemFont.create("Send Custom Event 2", function(sender){
            ++selfPointer._item2Count;
            var event = new cc.EventCustom("game_custom_event2");
            event.setUserData(selfPointer._item2Count.toString());
            cc.eventManager.dispatchEvent(event);
        });
        sendItem2.setPosition(origin.x + size.width/2, origin.x + size.height/2 - 40);

        var menu = cc.Menu.create(sendItem, sendItem2);
        menu.setPosition(0, 0);
        menu.setAnchorPoint(0, 0);
        this.addChild(menu, 1);
    },

    onExit:function(){
        cc.eventManager.removeListener(this._listener1);
        cc.eventManager.removeListener(this._listener2);
        this._super();
    },

    title:function(){
        return "Send custom event";
    },

    subtitle:function(){
        return "";
    }
});

CustomEventTest.create = function(){
    var test = new CustomEventTest();
    test.init();
    return test;
};

var LabelKeyboardEventTest =  EventDispatcherTestDemo.extend({
    onEnter:function(){
        this._super();

        var origin = director.getVisibleOrigin();
        var size = director.getVisibleSize();

        var statusLabel = cc.LabelTTF.create("No keyboard event received!", "", 20);
        statusLabel.setPosition(origin.x + size.width/2, origin.x + size.height/2);
        this.addChild(statusLabel);

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
                var label = event.getCurrentTarget();
                label.setString("Key " + String.fromCharCode(keyCode) + "(" + keyCode.toString()  + ") was pressed!");
            },
            onKeyReleased: function(keyCode, event){
                var label = event.getCurrentTarget();
                label.setString("Key " + String.fromCharCode(keyCode) + "(" + keyCode.toString()  + ") was released!");
            }
        }, statusLabel);
    },

    title:function(){
        return "Label Receives Keyboard Event";
    },

    subtitle:function(){
        return "Please click keyboard\n(Only available on Desktop and Android)";
    }
});

LabelKeyboardEventTest.create = function(){
    var test = new LabelKeyboardEventTest();
    test.init();
    return test;
};

var SpriteAccelerationEventTest =  EventDispatcherTestDemo.extend({
    onEnter:function(){
        this._super();

        var origin = director.getVisibleOrigin();
        var size = director.getVisibleSize();

        cc.inputManager.setAccelerometerEnabled(true);

        var sprite = cc.Sprite.create("res/Images/ball.png");
        sprite.setPosition(origin.x + size.width/2, origin.y + size.height/2);
        this.addChild(sprite);

        cc.eventManager.addListener({
            event: cc.EventListener.ACCELERATION,
            callback: function(acc, event){
                var target = event.getCurrentTarget();
                var ballSize  = target.getContentSize();
                var ptNow  = target.getPosition();

                //cc.log("acc: x = " + acc.x + ", y = " + acc.y);

                target.x = SpriteAccelerationEventTest._fix_pos(ptNow.x + acc.x * 9.81,
                    (cc.visibleRect.left.x + ballSize.width / 2.0), (cc.visibleRect.right.x - ballSize.width / 2.0));
                target.y = SpriteAccelerationEventTest._fix_pos(ptNow.y + acc.y * 9.81,
                    (cc.visibleRect.bottom.y + ballSize.height / 2.0), (cc.visibleRect.top.y - ballSize.height / 2.0));
            }
        }, sprite);
    },

    onExit:function(){
        cc.inputManager.setAccelerometerEnabled(false);
        this._super();
    },

    title:function(){
        return "Sprite Receives Acceleration Event";
    },

    subtitle:function(){
        return "Please move your device\n(Only available on mobile)";
    }
});

SpriteAccelerationEventTest._fix_pos = function(pos, min, max){
    var ret = pos;
     if(pos < min)
         ret = min;
    else if(pos > max)
         ret = max;
    return ret;
};

SpriteAccelerationEventTest.create = function(){
    var test = new SpriteAccelerationEventTest();
    test.init();
    return test;
};

var RemoveAndRetainNodeTest =  EventDispatcherTestDemo.extend({
    _sprite:null,
    _spriteSaved:false,

    onEnter:function(){
        this._super();

        var origin = director.getVisibleOrigin();
        var size = director.getVisibleSize();

        this._sprite = cc.Sprite.create("res/Images/CyanSquare.png");
        this._sprite.setPosition(origin.x + size.width/2, origin.y + size.height/2);
        this.addChild(this._sprite, 10);

        // Make sprite1 touchable
        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    target.opacity = 180;
                    return true;
                }
                return false;
            },
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
                var delta = touch.getDelta();
                target.x += delta.x;
                target.y += delta.y;
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                cc.log("sprite onTouchesEnded.. ");
                target.opacity = 255;
            }
        });
        cc.eventManager.addListener(listener1, this._sprite);

        this.runAction(cc.Sequence.create(cc.DelayTime.create(5.0),
            cc.CallFunc.create(function () {
                this._spriteSaved = true;
                this._sprite.retain();
                this._sprite.removeFromParent();
            }, this),
            cc.DelayTime.create(5.0),
            cc.CallFunc.create(function () {
                this._spriteSaved = false;
                this.addChild(this._sprite);
                if(!cc.sys.isNative)
                    cc.eventManager.addListener(listener1, this._sprite);
                this._sprite.release();
            }, this)
        ));
    },

    onExit:function(){
        this._super();
        if (this._spriteSaved)
            this._sprite.release();
    },

    title:function(){
        return "RemoveAndRetainNodeTest";
    },

    subtitle:function(){
        return "Sprite should be removed after 5s, add to scene again after 5s";
    }
});

RemoveAndRetainNodeTest.create = function(){
    var test = new RemoveAndRetainNodeTest();
    test.init();
    return test;
};

var RemoveListenerAfterAddingTest =  EventDispatcherTestDemo.extend({
    onEnter:function(){
        this._super();
        var selfPointer = this;
        var item1 = cc.MenuItemFont.create("Click Me 1", function(sender){
            var listener = cc.EventListenerTouchOneByOne.create();
            listener.onTouchBegan = function(touch, event){
                cc.Assert(false, "Should not come here!");
                return true;
            };
            cc.eventManager.addListener(listener, -1);
            cc.eventManager.removeListener(listener);
        });
        var vCenter = cc.visibleRect.center;
        item1.setPosition(vCenter.x, vCenter.y + 80);

        var addNextButton = function(){
            var next = cc.MenuItemFont.create("Please Click Me To Reset!", function(sender){
                selfPointer.onRestartCallback();
            });
            next.setPosition(vCenter.x, vCenter.y - 40);

            var menu = cc.Menu.create(next);
            menu.setPosition(cc.visibleRect.bottomLeft);
            menu.setAnchorPoint(0,0);
            selfPointer.addChild(menu);
        };

        var item2 = cc.MenuItemFont.create("Click Me 2", function(sender){
            var listener = cc.EventListenerTouchOneByOne.create();
            listener.onTouchBegan = function(touch, event){
                cc.Assert("Should not come here!");
                return true;
            };
            cc.eventManager.addListener(listener, -1);
            cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE);
            addNextButton();
        }, this);
        item2.setPosition(vCenter.x, vCenter.y + 40);

        var item3 = cc.MenuItemFont.create("Click Me 3", function(sender){
            var listener = cc.EventListenerTouchOneByOne.create();
            listener.onTouchBegan = function(touch, event){
                cc.Assert(false, "Should not come here!");
                return true;
            };
            cc.eventManager.addListener(listener, -1);
            cc.eventManager.removeAllListeners();
            addNextButton();
        }, this);
        item3.setPosition(cc.visibleRect.center);

        var menu = cc.Menu.create(item1, item2, item3);
        menu.setPosition(cc.visibleRect.bottomLeft);
        menu.setAnchorPoint(0, 0);
        this.addChild(menu);
    },

    title:function(){
        return "RemoveListenerAfterAddingTest";
    },

    subtitle:function(){
        return "Should not crash!";
    }
});

RemoveListenerAfterAddingTest.create = function(){
    var test = new RemoveListenerAfterAddingTest();
    test.init();
    return test;
};

var DirectorEventTest =  EventDispatcherTestDemo.extend({
    _count1:0,
    _count2:0,
    _count3:0,
    _count4:0,
    _label1:null,
    _label2:null,
    _label3:null,
    _label4:null,
    _event1:null,
    _event2:null,
    _event3:null,
    _event4:null,
    _time:0,

    onEnter:function(){
        this._super();
        var s = director.getWinSize(), selfPointer = this;

        this._label1 = cc.LabelTTF.create("Update: 0", "Arial", 20);
        this._label1.setPosition(80,s.height/2 + 60);
        this.addChild(this._label1);

        this._label2 = cc.LabelTTF.create("Visit: 0", "Arial", 20);
        this._label2.setPosition(80,s.height/2 + 20);
        this.addChild(this._label2);

        this._label3 = cc.LabelTTF.create("Draw: 0", "Arial", 20);
        this._label3.setPosition(80,s.height/2 - 20);
        this.addChild(this._label3);

        this._label4 = cc.LabelTTF.create("Projection: 0", "Arial", 20);
        this._label4.setPosition(80,s.height/2 - 60);
        this.addChild(this._label4);

        var dispatcher = cc.eventManager;

        this._event1 = dispatcher.addCustomListener(cc.Director.EVENT_AFTER_UPDATE, this.onEvent1.bind(this));
        this._event2 = dispatcher.addCustomListener(cc.Director.EVENT_AFTER_VISIT, this.onEvent2.bind(this));
        this._event3 = dispatcher.addCustomListener(cc.Director.EVENT_AFTER_DRAW, function(event) {
            selfPointer._label3.setString("Draw: " + selfPointer._count3++);
        }, this);
        this._event4 = dispatcher.addCustomListener(cc.Director.EVENT_PROJECTION_CHANGED, function(event) {
            selfPointer._label4.setString("Projection: " + selfPointer._count4++);
        }, this);

        this._event1.retain();
        this._event2.retain();
        this._event3.retain();
        this._event4.retain();

        this.scheduleUpdate();
    },

    onExit:function(){
        this._super();

        var eventManager = cc.eventManager;
        eventManager.removeListener(this._event1);
        eventManager.removeListener(this._event2);
        eventManager.removeListener(this._event3);
        eventManager.removeListener(this._event4);

        this._event1.release();
        this._event2.release();
        this._event3.release();
        this._event4.release();
    },

    update:function(dt){
        this._time += dt;
        if(this._time > 0.5) {
            cc.director.setProjection(cc.DIRECTOR_PROJECTION_2D);
            this._time = 0;
        }
    },

    onEvent1:function(event){
        this._label1.setString("Update: " + this._count1++);
    },

    onEvent2:function(event){
        this._label2.setString("Visit: " + this._count2++);
    },

    title:function(){
        return "Testing Director Events";
    },

    subtitle:function(){
        return "after visit, after draw, after update, projection changed";
    }
});

DirectorEventTest.create = function(){
    var test = new DirectorEventTest();
    test.init();
    return test;
};

var EventDispatcherTestScene = TestScene.extend({
    runThisTest:function () {
        eventDispatcherSceneIdx = -1;
        this.addChild(nextDispatcherTest());
        director.runScene(this);
    }
});

var arrayOfEventDispatcherTest = [
    TouchableSpriteTest,
    FixedPriorityTest,
    RemoveListenerWhenDispatching,
    CustomEventTest,
    LabelKeyboardEventTest,
    SpriteAccelerationEventTest,
    RemoveAndRetainNodeTest,
    RemoveListenerAfterAddingTest,
    DirectorEventTest
];

var nextDispatcherTest = function () {
    eventDispatcherSceneIdx++;
    eventDispatcherSceneIdx = eventDispatcherSceneIdx % arrayOfEventDispatcherTest.length;
    return new arrayOfEventDispatcherTest[eventDispatcherSceneIdx]();
};
var previousDispatcherTest = function () {
    eventDispatcherSceneIdx--;
    if (eventDispatcherSceneIdx < 0)
        eventDispatcherSceneIdx += arrayOfEventDispatcherTest.length;
    return new arrayOfEventDispatcherTest[eventDispatcherSceneIdx]();
};
var restartDispatcherTest = function () {
    return new arrayOfEventDispatcherTest[eventDispatcherSceneIdx]();
};