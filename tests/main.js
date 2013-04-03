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
var cocos2dApp = cc.Application.extend({
    config:document['ccConfig'],
    ctor:function (scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.initDebugSetting();
        cc.setup(this.config['tag']);
        cc.AppController.shareAppController().didFinishLaunchingWithOptions();
    },
    applicationDidFinishLaunching:function () {
        if(cc.RenderDoesnotSupport()){
            //show Information to user
            alert("Browser doesn't support Canvas or WebGL");
            return false;
        }
        // initialize director
        var director = cc.Director.getInstance();

        // enable High Resource Mode(2x, such as iphone4) and maintains low resource on other devices.
        //director.enableRetinaDisplay(true);

        // turn on display FPS
        director.setDisplayStats(this.config['showFPS']);

        // set FPS. the default value is 1.0/60 if you don't call this
        director.setAnimationInterval(1.0 / this.config['frameRate']);

        //load resources
        cc.Loader.preload(g_ressources, function () {
            cc.Director.getInstance().replaceScene(new this.startScene());
        }, this);

        return true;
    }
});
var myApp = new cocos2dApp(TestController);

var s_rcVisible = cc.RECT_ZERO;
var s_ptCenter = cc.POINT_ZERO;
var s_ptTop = cc.POINT_ZERO;
var s_ptTopRight = cc.POINT_ZERO;
var s_ptRight = cc.POINT_ZERO;
var s_ptBottomRight = cc.POINT_ZERO;
var s_ptBottom = cc.POINT_ZERO;
var s_ptLeft = cc.POINT_ZERO;
var s_ptTopLeft = cc.POINT_ZERO;

var VisibleRect = {
    rect:function () {
        if (s_rcVisible.size.width == 0) {
            var s = cc.Director.getInstance().getWinSize();
            s_rcVisible = cc.RectMake(0, 0, s.width, s.height);
        }
        return s_rcVisible;
    },
    center:function () {
        if (s_ptCenter.x == 0) {
            var rc = this.rect();
            s_ptCenter.x = rc.origin.x + rc.size.width / 2;
            s_ptCenter.y = rc.origin.y + rc.size.height / 2;
        }
        return s_ptCenter;
    },
    top:function () {
        if (s_ptTop.x == 0) {
            var rc = this.rect();
            s_ptTop.x = rc.origin.x + rc.size.width / 2;
            s_ptTop.y = rc.origin.y + rc.size.height;
        }
        return s_ptTop;
    },
    topRight:function () {
        if (s_ptTopRight.x == 0) {
            var rc = this.rect();
            s_ptTopRight.x = rc.origin.x + rc.size.width;
            s_ptTopRight.y = rc.origin.y + rc.size.height;
        }
        return s_ptTopRight;
    },
    right:function () {
        if (s_ptRight.x == 0) {
            var rc = this.rect();
            s_ptRight.x = rc.origin.x + rc.size.width;
            s_ptRight.y = rc.origin.y + rc.size.height / 2;
        }
        return s_ptRight;
    },
    bottomRight:function () {
        if (s_ptBottomRight.x == 0) {
            var rc = this.rect();
            s_ptBottomRight.x = rc.origin.x + rc.size.width;
            s_ptBottomRight.y = rc.origin.y;
        }
        return s_ptBottomRight;
    },
    bottom:function () {
        if (s_ptBottom.x == 0) {
            var rc = this.rect();
            s_ptBottom.x = rc.origin.x + rc.size.width / 2;
            s_ptBottom.y = rc.origin.y;
        }
        return s_ptBottom;
    },
    bottomLeft:function () {
        return this.rect().origin;
    },
    left:function () {
        if (s_ptLeft.x == 0) {
            var rc = this.rect();
            s_ptLeft.x = rc.origin.x;
            s_ptLeft.y = rc.origin.y + rc.size.height / 2;
        }
        return s_ptLeft;
    },
    topLeft:function () {
        if (s_ptTopLeft.x == 0) {
            var rc = this.rect();
            s_ptTopLeft.x = rc.origin.x;
            s_ptTopLeft.y = rc.origin.y + rc.size.height;
        }
        return s_ptTopLeft;
    }
};
