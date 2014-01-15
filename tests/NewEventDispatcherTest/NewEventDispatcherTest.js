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
        this._super(cc.c4b(0,0,0,255), cc.c4b(160,32,32,255));
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
        director.replaceScene(s);
    },

    onRestartCallback:function (sender) {
        var s = new EventDispatcherTestScene();
        s.addChild(restartDispatcherTest());
        director.replaceScene(s);
    },

    onNextCallback:function (sender) {
        var s = new EventDispatcherTestScene();
        s.addChild(nextDispatcherTest());
        director.replaceScene(s);
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

        var sprite1 = cc.Sprite.create("Images/CyanSquare.png");
        sprite1.setPosition(origin.x + size.width/2 - 80, origin.y + size.height/2 + 80);
        this.addChild(sprite1, 10);

        var sprite2 = cc.Sprite.create("Images/MagentaSquare.png");
        sprite2.setPosition(origin.x + size.width/2, origin.y + size.height/2);
        this.addChild(sprite2, 20);

        var sprite3 = cc.Sprite.create("Images/YellowSquare.png");
        sprite3.setPosition(0,0);
        sprite2.addChild(sprite3, 1);

        // Make sprite1 touchable
        var listener1 = cc.EventListenerTouchOneByOne.create();
        listener1.setSwallowTouches(true);

        listener1.onTouchBegan = function(touch, event){
            var target = event.getCurrentTarget();

            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if(cc.rectContainsPoint(rect, locationInNode)) {
                cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                target.setOpacity(180);
                return true;
            }
            return false;
        };

        listener1.onTouchMoved = function(touch, event){
            var target = event.getCurrentTarget();
            var delta = touch.getDelta();
            target.setPosition(target.getPositionX() + delta.y, target.getPositionY() + delta.y);
        };

        listener1.onTouchEnded = function(touch, event){
            var target = event.getCurrentTarget();
            cc.log("sprite onTouchesEnded.. ");
            target.setOpacity(255);
            if (target == sprite2){
                sprite1.setZOrder(100);
            } else if(target == sprite1) {
                sprite1.setZOrder(0);
            }
        };

        this._eventDispatcher.addEventListenerWithSceneGraphPriority(listener1, sprite1);
        this._eventDispatcher.addEventListenerWithSceneGraphPriority(listener1.clone(), sprite2);
        this._eventDispatcher.addEventListenerWithSceneGraphPriority(listener1.clone(), sprite3);


        var removeAllTouchItem = cc.MenuItemFont.create("Remove All Touch Listeners", function(senderItem){
            senderItem.setString("Only Next item could be clicked");

            this._eventDispatcher.removeEventListeners(EventListener.Type.TOUCH_ONE_BY_ONE);

            var nextItem = cc.MenuItemFont.create("Next", function(sender){
                this.onNextCallback();
            });

            nextItem.setFontSize(16);
            nextItem.setPosition(VisibleRect.right().x -100, VisibleRect.right().y - 30);

            var menu2 = cc.Menu.create(nextItem);
            menu2.setPosition(0, 0);
            menu2.setAnchorPoint(0, 0);
            this.addChild(menu2);
        });

        removeAllTouchItem.setFontSize(16);
        removeAllTouchItem.setPosition(VisibleRect.right().x -100, VisibleRect.right().y);

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

     ctor:function(){

     },

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

        var listener = cc.EventListenerTouchOneByOne.create();
        listener.setSwallowTouches(true);

        listener.onTouchBegan = function(touch, event){
            var locationInNode = this.convertToNodeSpace(touch.getLocation());
            var s = this.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {
                this.setColor(cc.red());
                return true;
            }
            return false;
        };

        listener.onTouchMoved = function(touch, event){
            //this.setPosition(this.getPosition() + touch.getDelta());
        };

        listener.onTouchEnded = function(touch, event){
            this.setColor(cc.white());
        };

        if (this._useNodePriority) {
            this._eventDispatcher.addEventListenerWithSceneGraphPriority(listener, this);
        } else {
            this._eventDispatcher.addEventListenerWithFixedPriority(listener, this._fixedPriority);
        }
        this._listener = listener;
    },

    onExit: function(){
        _eventDispatcher.removeEventListener(_listener);
        this._super();
    }
});

TouchableSpriteWithFixedPriority.create = function(){
    var test = new TouchableSpriteTest();
    test.init();
    return test;
};


var FixedPriorityTest =  EventDispatcherTestDemo.extend({
    onEnter:function(){
        this._super();

        var origin = director.getVisibleOrigin();
        var size = director.getVisibleSize();

        var sprite1 = cc.TouchableSpriteWithFixedPriority.create();
        sprite1.setTexture("Images/CyanSquare.png");
        sprite1.setPriority(30);
        sprite1.setPosition(origin.x +size.width/2 - 80, origin.y - size.height/2 + 40);
        this.addChild(sprite1, 10);

        var sprite2 = cc.TouchableSpriteWithFixedPriority.create();
        sprite2.setTexture("Images/MagentaSquare.png");
        sprite2.setPriority(20);
        sprite2.setPosition(origin.x + size.width/2, origin.y + size.height/2);
        this.addChild(sprite2, 20);

        var sprite3 = cc.TouchableSpriteWithFixedPriority.create();
        sprite3.setTexture("Images/YellowSquare.png");
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

        var sprite1 = cc.Sprite.create("Images/CyanSquare.png");
        sprite1.setPosition(origin.x + size.width/2, origin.y + size.height/2);
        this.addChild(sprite1, 10);

        // Make sprite1 touchable
        var listener1 = cc.EventListenerTouchOneByOne.create();
        listener1.setSwallowTouches(true);
        this.setUserObject(listener1);

        // TODO
        //std.shared_ptr<bool> firstClick(new bool(true));

        listener1.onTouchBegan = function(touch, event){
            var locationInNode = sprite1.convertToNodeSpace(touch.getLocation());
            var s = sprite1.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {
                sprite1.setColor(cc.red());
                return true;
            }
            return false;
        };

        listener1.onTouchEnded = function(touch, event){
            sprite1.setColor(cc.white());
        };

        this._eventDispatcher.addEventListenerWithSceneGraphPriority(listener1, sprite1);

        var statusLabel = cc.LabelTTF.create("The sprite could be touched!", "", 20);
        statusLabel.setPosition(origin.x + size.width/2, origin.y + size.height-90 );
        this.addChild(statusLabel);

        var enable = true;

        // Enable/Disable item
        var toggleItem = cc.MenuItemToggle.create(cc.MenuItemFont.create("Enabled"), cc.MenuItemFont.create("Disabled"),
            function (sender) {
                if (enable) {
                    this._eventDispatcher.removeEventListener(listener1);
                    statusLabel.setString("The sprite could not be touched!");
                    enable = false;
                } else {
                    this._eventDispatcher.addEventListenerWithSceneGraphPriority(listener1, sprite1);
                    statusLabel.setString("The sprite could be touched!");
                    enable = true;
                }
            });

        toggleItem.setPosition(origin.x + size.width/2, origin.y + 80);
        var menu = cc.Menu.create(toggleItem);
        menu.setPosition(0, 0);
        menu.setAnchorPoint(0, 0);
        this.addChild(menu, -1);
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
    _listener1:null,
    _listener2:null,

    onEnter:function(){
        this._super();

        var origin = director.getVisibleOrigin();
        var size = director.getVisibleSize();

        cc.MenuItemFont.setFontSize(20);

        var statusLabel = cc.LabelTTF.create("No custom event 1 received!", "", 20);
        statusLabel.setPosition(origin.x + size.width/2, origin.y + size.height-90);
        this.addChild(statusLabel);

        this._listener1 = cc.EventListenerCustom.create("game_custom_event1", function(event){
            statusLabel.setString("Custom event 1 received, " + event.getUserData() + " times");
        });

        this._eventDispatcher.addEventListenerWithFixedPriority(this._listener1, 1);
        var item1Count = 0;
        var sendItem = cc.MenuItemFont.create("Send Custom Event 1", function(sender){
            ++item1Count;
            var event = new cc.EventCustom("game_custom_event1");
            event.setUserData(item1Count.toString());
            this._eventDispatcher.dispatchEvent(event);
        });
        sendItem.setPosition(origin.x + size.width/2, origin.y + size.height/2);

        var statusLabel2 = cc.LabelTTF.create("No custom event 2 received!", "", 20);
        statusLabel2.setPosition(origin.x + size.width/2, origin.y + size.height-120);
        this.addChild(statusLabel2);

        this._listener2 = cc.EventListenerCustom.create("game_custom_event2", function(event){
            statusLabel2.setString("Custom event 2 received, " + event.getUserData() + " times");
        });

        this._eventDispatcher.addEventListenerWithFixedPriority(this._listener2, 1);
        var item2Count = 0;
        var sendItem2 = cc.MenuItemFont.create("Send Custom Event 2", function(sender){
            ++item2Count;
            var event = new cc.EventCustom("game_custom_event2");
            event.setUserData(item2Count.toString());
            this._eventDispatcher.dispatchEvent(event);
        });
        sendItem2.setPosition(origin.x + size.width/2, origin.x + size.height/2 - 40);

        var menu = cc.Menu.create(sendItem, sendItem2);
        menu.setPosition(0, 0);
        menu.setAnchorPoint(0, 0);
        this.addChild(menu, -1);
    },

    onExit:function(){
        this._eventDispatcher.removeEventListener(this._listener1);
        this._eventDispatcher.removeEventListener(this._listener2);
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

        var listener = cc.EventListenerKeyboard.create();
        listener.onKeyPressed = function(keyCode, event){
            var label = event.getCurrentTarget();
            label.setString("Key " + keyCode.toString() + " was pressed!");
        };

        listener.onKeyReleased = function(keyCode, event){
            var label = event.getCurrentTarget();
            label.setString("Key " + keyCode.toString() + " was released!");
        };

        this._eventDispatcher.addEventListenerWithSceneGraphPriority(listener, statusLabel);
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

        Device.setAccelerometerEnabled(true);

        var sprite = cc.Sprite.create(s_Ball);
        sprite.setPosition(origin.x + size.width/2, origin.y + size.height/2);
        this.addChild(sprite);

        var listener = cc.EventListenerAcceleration.create(function(acc, event){
            var ballSize  = sprite.getContentSize();
            var ptNow  = sprite.getPosition();

            cc.log("acc: x = " + acc.x + ", y = " + acc.y);

            var nowX = SpriteAccelerationEventTest._fix_pos(ptNow.x + acc.x * 9.81,
                (cc.VisibleRect.left().x + ballSize.width / 2.0), (cc.VisibleRect.right().x - ballSize.width / 2.0));
            var nowY = SpriteAccelerationEventTest._fix_pos(ptNow.y + acc.y * 9.81,
                (cc.VisibleRect.bottom().y + ballSize.height / 2.0), (cc.VisibleRect.top().y - ballSize.height / 2.0));
            sprite.setPosition(nowX, nowY);
        });

        _eventDispatcher.addEventListenerWithSceneGraphPriority(listener, sprite);
    },

    onExit:function(){
        Device.setAccelerometerEnabled(false);
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

        this._sprite = cc.Sprite.create("Images/CyanSquare.png");
        this._sprite.setPosition(origin.x + size.width/2, origin.y + size.height/2);
        this.addChild(this._sprite, 10);

        // Make sprite1 touchable
        var listener1 = cc.EventListenerTouchOneByOne.create();
        listener1.setSwallowTouches(true);

        listener1.onTouchBegan = function(touch, event){
            var target = event.getCurrentTarget();

            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {
                cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                target.setOpacity(180);
                return true;
            }
            return false;
        };

        listener1.onTouchMoved = function(touch, event){
            var target = event.getCurrentTarget();
            var delta = touch.getDelta();
            target.setPosition(target.getPositionX() + delta.x, target.getPositionY() + delta.y);
        };

        listener1.onTouchEnded = function(touch, event){
            var target = event.getCurrentTarget();
            cc.log("sprite onTouchesEnded.. ");
            target.setOpacity(255);
        };

        this._eventDispatcher.addEventListenerWithSceneGraphPriority(listener1, this._sprite);

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

        var item1 = cc.MenuItemFont.create("Click Me 1", function(sender){
            var listener = cc.EventListenerTouchOneByOne.create();
            listener.onTouchBegan = function(touch, event){
                cc.assert(false, "Should not come here!");
                return true;
            };

            this._eventDispatcher.addEventListenerWithFixedPriority(listener, -1);
            this._eventDispatcher.removeEventListener(listener);
        });

        var vCenter = cc.VisibleRect.center();
        item1.setPosition(vCenter.x, vCenter.y + 80);

        var addNextButton = function(){
            var next = cc.MenuItemFont.create("Please Click Me To Reset!", function(sender){
                this.restartCallback();
            });
            next.setPosition(vCenter.x, vCenter.y - 40);

            var menu = cc.Menu.create(next);
            menu.setPosition(cc.VisibleRect.bottomLeft());
            menu.setAnchorPoint(0,0);
            this.addChild(menu);
        };

        var item2 = cc.MenuItemFont.create("Click Me 2", function(sender){
            var listener = cc.EventListenerTouchOneByOne.create();
            listener.onTouchBegan = function(touch, event){
                cc.assert(false, "Should not come here!");
                return true;
            };
            this._eventDispatcher.addEventListenerWithFixedPriority(listener, -1);
            this._eventDispatcher.removeEventListeners(EventListener.Type.TOUCH_ONE_BY_ONE);

            addNextButton();
        }, this);
        item2.setPosition(vCenter.x, vCenter.y + 40);

        var item3 = cc.MenuItemFont.create("Click Me 3", function(sender){
            var listener = cc.EventListenerTouchOneByOne.create();
            listener.onTouchBegan = function(touch, event){
                cc.assert(false, "Should not come here!");
                return true;
            };

            this._eventDispatcher.addEventListenerWithFixedPriority(listener, -1);
            this._eventDispatcher.removeAllEventListeners();

            addNextButton();
        }, this);

        item3.setPosition(VisibleRect.center());

        var menu = cc.Menu.create(item1,item2,item3);
        menu.setPosition(VisibleRect.bottomLeft());
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

        var s = director.getWinSize();

        this._label1 = cc.LabelTTF.create("Update: 0", "Arial", 20);
        this._label1.setPosition(30,s.height/2 + 60);
        this.addChild(this._label1);

        this._label2 = cc.LabelTTF.create("Visit: 0", "Arial", 20);
        this._label2.setPosition(30,s.height/2 + 20);
        this.addChild(this._label2);

        this._label3 = cc.LabelTTF.create("Draw: 0", "Arial", 20);
        this._label3.setPosition(30,30);
        this._label3.setPosition(30,s.height/2 - 20);
        this.addChild(this._label3);

        this._label4 = cc.LabelTTF.create("Projection: 0", "Arial", 20);
        this._label4.setPosition(30,30);
        this._label4.setPosition(30,s.height/2 - 60);
        this.addChild(this._label4);

        var dispatcher = director.getEventDispatcher();

        this._event1 = dispatcher.addCustomEventListener(cc.Director.EVENT_AFTER_UPDATE, this.onEvent1.bind(this));
        this._event2 = dispatcher.addCustomEventListener(cc.Director.EVENT_AFTER_VISIT, this.onEvent2.bind(this));
        this._event3 = dispatcher.addCustomEventListener(cc.Director.EVENT_AFTER_DRAW, function(event) {
            this._label3.setString("Draw: " + this._count3++);
        }, this);
        this._event4 = dispatcher.addCustomEventListener(cc.Director.EVENT_PROJECTION_CHANGED, function(event) {
            this._label4.setString("Projection: " + this._count4++);
        }, this);

        this._event1.retain();
        this._event2.retain();
        this._event3.retain();
        this._event4.retain();

        this.scheduleUpdate();
    },

    onExit:function(){
        this._super();

        var dispatcher = director.getEventDispatcher();
        dispatcher.removeEventListener(this._event1);
        dispatcher.removeEventListener(this._event2);
        dispatcher.removeEventListener(this._event3);
        dispatcher.removeEventListener(this._event4);

        this._event1.release();
        this._event2.release();
        this._event3.release();
        this._event4.release();
    },

    update:function(dt){
        this._time += dt;
        if(this._time > 0.5) {
            cc.Director.getInstance().setProjection(cc.Director.Projection_2D);
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
        this.addChild(nextParallaxTest());
        director.replaceScene(this);
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
    return new arrayOfEventDispatcherTest[parallaxTestSceneIdx]();
};
var restartDispatcherTest = function () {
    return new arrayOfEventDispatcherTest[eventDispatcherSceneIdx]();
};