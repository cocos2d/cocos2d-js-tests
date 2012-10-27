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

// globals
var director = null;
var winSize = null;

var PLATFORM_JSB = 1 << 0;
var PLATFORM_HTML5 = 1 << 1;
var PLATFORM_ALL = PLATFORM_JSB | PLATFORM_HTML5;


var TestScene = cc.Scene.extend({
    ctor:function (bPortrait) {
        cc.associateWithNative( this, cc.Scene );
        this.init();
    },

    /*init:function() {
        this._super();
    },*/

    // callbacks
    onEnter:function () {
        this._super();
        var label = cc.LabelTTF.create("MainMenu", "Arial", 20);
        var menuItem = cc.MenuItemLabel.create(label, this, this.onMainMenuCallback);

        var menu = cc.Menu.create(menuItem);
        menu.setPosition(cc.p(0,0));
        menuItem.setPosition(cc.p(winSize.width - 50, 25));

        this.addChild(menu, 1);
    },
    onMainMenuCallback:function () {
        var scene = cc.Scene.create();
        var layer = new TestController();
        scene.addChild(layer);
        director.replaceScene(scene);
    },

    runThisTest:function () {
        // override me
    }

});

//Controller stuff
var LINE_SPACE = 40;
var curPos = cc.p(0,0);

var TestController = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,
    ctor:function () {
        cc.associateWithNative( this, cc.Layer );
        this.init();
    },

    init:function() {
        if( this._super() ) {

            // globals
            director = cc.Director.getInstance();
            winSize = director.getWinSize();

            // add close menu
            var closeItem = cc.MenuItemImage.create(s_pathClose, s_pathClose, this, this.onCloseCallback);
            var menu = cc.Menu.create(closeItem);//pmenu is just a holder for the close button
            menu.setPosition(cc.p(0,0));
            closeItem.setPosition(cc.p(winSize.width - 30, winSize.height - 30));

            // add menu items for tests
            this._itemMenu = cc.Menu.create();//item menu is where all the label goes, and the one gets scrolled

            for (var i = 0, len = testNames.length; i < len; i++) {
                var label = cc.LabelTTF.create(testNames[i].title, "Arial", 24);
                var menuItem = cc.MenuItemLabel.create(label, this, this.onMenuCallback);
                this._itemMenu.addChild(menuItem, i + 10000);
                menuItem.setPosition(cc.p(winSize.width / 2, (winSize.height - (i + 1) * LINE_SPACE)));

                // enable disable
                if (cc.config.deviceType == 'browser') {
                    menuItem.setEnabled( testNames[i].platforms & PLATFORM_HTML5 );
                } else { /* jsb */
                    menuItem.setEnabled( testNames[i].platforms & PLATFORM_JSB );
                }
            }

            this._itemMenu.setContentSize(cc.size(winSize.width, (testNames.length + 1) * LINE_SPACE));
            this._itemMenu.setPosition(curPos);
            this.addChild(this._itemMenu);
            this.addChild(menu, 1);

            var t = cc.config.deviceType;
            if( t == 'browser' )  {
                this.setTouchEnabled(true);
                // this.setKeyboardEnabled(true);
            } else if( t == 'desktop' ) {
                this.setMouseEnabled(true);
            } else if( t == 'mobile' ) {
                this.setTouchEnabled(true);
            }
        }
    },
    onMenuCallback:function (sender) {
        var idx = sender.getZOrder() - 10000;
        // get the userdata, it's the index of the menu item clicked
        // create the test scene and run it
        var scene = testNames[idx].testScene();
        if (scene) {
            scene.runThisTest();
        }
    },
    onCloseCallback:function () {
        history.go(-1);
    },

    onTouchesBegan:function (touches, event) {
        if (!this.isMouseDown) {
            //this._beginPos = cc.p(touches[0].getLocation().x, touches[0].getLocation().y);
            this._beginPos = touches[0].getLocation().y;
        }
        this.isMouseDown = true;
    },
    onTouchesMoved:function (touches, event) {
        if (this.isMouseDown) {
            var touchLocation = touches[0].getLocation().y;
            var nMoveY = touchLocation - this._beginPos;
            curPos = this._itemMenu.getPosition();

            var nextPos = cc.p(curPos.x, curPos.y + nMoveY);
            if (nextPos.y < 0.0) {
                this._itemMenu.setPosition(cc.p(0,0));
                return;
            }

            if (nextPos.y > ((testNames.length + 1) * LINE_SPACE - winSize.height)) {
                this._itemMenu.setPosition(cc.p(0, ((testNames.length + 1) * LINE_SPACE - winSize.height)));
                return;
            }
            this._itemMenu.setPosition(nextPos);
            this._beginPos = touchLocation;
            curPos = nextPos;
        }
    },

    onTouchesEnded:function () {
        this.isMouseDown = false;
    },

    onMouseDragged : function( event ) {
        var delta = event.getDelta();
        var current = this._itemMenu.getPosition();

        var newY = current.y + delta.y;

        if (newY < 0 )
            newY = 0;

        if( newY > ((testNames.length + 1) * LINE_SPACE - winSize.height))
            newY = ((testNames.length + 1) * LINE_SPACE - winSize.height);

        this._itemMenu.setPosition( cc.p( current.x, newY ) );
        return true;
    }
});

var testNames = [
    {
        title:"ActionManager Test",
        platforms: PLATFORM_HTML5,
        testScene:function () {
            return new ActionManagerTestScene();
        }
    },
    {
        title:"Actions Test",
        platforms: PLATFORM_ALL,
        testScene:function () {
            return new ActionsTestScene();
        }
    },
    {
        title:"Box2D Test",
        platforms: PLATFORM_HTML5,
        testScene:function () {
            return new Box2DTestScene();
        }
    },
    {
        title:"Chipmunk Test",
        platforms: PLATFORM_JSB,
        testScene:function () {
            return new ChipmunkTestScene();
        }
    },
    //"Box2dTestBed",
    //"BugsTest",
    //"ChipmunkTest",
    {
        title:"Click and Move Test",
        platforms: PLATFORM_HTML5,
        testScene:function () {
            return new ClickAndMoveTestScene();
        }
    },
    {
        title:"CocosDenshion Test",
        platforms: PLATFORM_ALL,
        testScene:function () {
            return new CocosDenshionTestScene();
        }
    },
    {
        title:"CurrentLanguage Test",
        platforms: PLATFORM_HTML5,
        testScene:function () {
            return new CurrentLanguageTestScene();
        }
    },
    //"CurlTest",
    {
        title:"DrawPrimitives Test",
        platforms: PLATFORM_HTML5,
        testScene:function () {
            return new DrawPrimitivesTestScene();
        }
    },
    {
        title:"EaseActions Test",
        platforms: PLATFORM_ALL,
        testScene:function () {
            return new EaseActionsTestScene();
        }
    },
    {
        title:"Event Test",
        platforms: PLATFORM_ALL,
        testScene:function () {
            return new EventTestScene();
        }
    },
    {
        title:"Extensions Test",
        platforms: PLATFORM_HTML5,
        testScene:function () {
            return new ExtensionsTestScene();
        }
    },
    {
        title:"Effects Test",
        platforms: PLATFORM_JSB,
        testScene:function () {
            return new EffectsTestScene();
        }
    },
    //"EffectAdvancedTest",
    //"ExtensionsTest",
    {
        title:"Font Test",
        platforms: PLATFORM_HTML5,
        testScene:function () {
            return new FontTestScene();
        }
    },
    //"HiResTest",
    {
        title:"Interval Test",
        platforms: PLATFORM_HTML5,
        testScene:function () {
            return new IntervalTestScene();
        }
    },
    //"KeyboardTest",
    {
        title:"Label Test",
        platforms: PLATFORM_ALL,
        testScene:function () {
            return new LabelTestScene();
        }
    },
    {
        title:"Layer Test",
        platforms: PLATFORM_ALL,
        testScene:function () {
            return new LayerTestScene();
        }
    },
    {
        title:"Menu Test",
        platforms: PLATFORM_ALL,
        testScene:function () {
            return new MenuTestScene();
        }
    },
    {
        title:"Multi TouchTest",
        platforms: PLATFORM_HTML5,
        testScene:function () {
            return new MultiTouchTestScene();
        }
    },
    {
        title:"Node Test",
        platforms: PLATFORM_ALL,
        testScene:function () {
            return new NodeTestScene();
        }
    },
    //"MotionStreakTest",
    {
        title:"Parallax Test",
        platforms: PLATFORM_HTML5,
        testScene:function () {
            return new ParallaxTestScene();
        }
    },
    {
        title:"Particle Test",
        platforms: PLATFORM_ALL,
        testScene:function () {
            return new ParticleTestScene();
        }
    },
    {
        title:"Performance Test",
        platforms: PLATFORM_HTML5,
        testScene:function () {
            return new PerformanceTestScene();
        }
    },
    {
        title:"ProgressActions Test",
        platforms: PLATFORM_HTML5,
        testScene:function () {
            return new ProgressActionsTestScene();
        }
    },
    {
        title:"RenderTexture Test",
        platforms: PLATFORM_JSB,
        testScene:function () {
            return new RenderTextureTestScene();
        }
    },
    {
        title:"RotateWorld Test",
        platforms: PLATFORM_HTML5,
        testScene:function () {
            return new RotateWorldTestScene();
        }
    },
    {
        title:"Scene Test",
        platforms: PLATFORM_HTML5,
        testScene:function () {
            return new SceneTestScene();
        }
    },
    {
        title:"Scheduler Test",
        platforms: PLATFORM_ALL,
        testScene:function () {
            return new SchedulerTestScene();
        }
    },
    {
        title:"Sprite Test",
        platforms: PLATFORM_ALL,
        testScene:function () {
            return new SpriteTestScene();
        }
    },
    {
        title:"TextInput Test",
        platforms: PLATFORM_HTML5,
        testScene:function () {
            return new TextInputTestScene();
        }
    },
    //"Texture2DTest",
    {
        title:"TextureCache Test",
        platforms: PLATFORM_HTML5,
        testScene:function () {
            return new TextureCacheTestScene();
        }
    },
    {
        title:"TileMap Test",
        platforms: PLATFORM_ALL,
        testScene:function () {
            return new TileMapTestScene();
        }
    },
    {
        title:"Touches Test",
        platforms: PLATFORM_HTML5,
        testScene:function () {
            return new TouchesTestScene();
        }
    },
    {
        title:"Transitions Test",
        platforms: PLATFORM_HTML5,
        testScene:function () {
            return new TransitionsTestScene();
        }
    },
    {
        title:"Unit Tests",
        platforms: PLATFORM_ALL,
        testScene:function () {
            return new UnitTestScene();
        }
    },
    {
        title:"cocos2d JS Presentation",
        platforms: PLATFORM_JSB,
        testScene:function () {
            return new PresentationScene();
        }
    }

    //"UserDefaultTest",
    //"ZwoptexTest",
];
