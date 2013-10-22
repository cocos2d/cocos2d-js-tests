/****************************************************************************
 Copyright (c) 2013 cocos2d-x.org

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

var UILoadingBarTest = UIScene.extend({
    _count: 0,
    ctor: function () {
        UIScene.prototype.ctor.call(this);
        this._count = 0;
    },
    init: function () {
        if (UIScene.prototype.init.call(this)) {
            this.scheduleUpdate();
            var widgetSize = this._widget.getRect().size;
            var alert = cc.UILabel.create();
            alert.setText("LoadingBar");
            alert.setFontName("res/cocosgui/Marker Felt.ttf");
            alert.setFontSize(30);
            alert.setColor(cc.c3b(159, 168, 176));
            alert.setPosition(cc.p(widgetSize.width / 2, widgetSize.height / 2 - alert.getRect().size.height * 1.75));
            this._uiLayer.addWidget(alert);

            this.createLoadingBar();

            return true;
        }
        return false;
    },
    createLoadingBar: function () {
        // override me
    },
    update: function (dt) {
        this._count++;
        if (this._count > 100) {
            this._count = 0;
        }

        var loadingBar = this._uiLayer.getWidgetByName("LoadingBar");
        loadingBar.setPercent(this._count);
    },

    previousCallback: function (sender, type) {
        this.unscheduleUpdate();
        UIScene.prototype.previousCallback.call(this, sender, type);
    },

    restartCallback: function (sender, type) {
        this.unscheduleUpdate();
        UIScene.prototype.restartCallback.call(this, sender, type);
    },

    nextCallback: function (sender, type) {
        this.unscheduleUpdate();
        UIScene.prototype.nextCallback.call(this, sender, type);
    }
});

var UILoadingBarTest_Left = UILoadingBarTest.extend({
    createLoadingBar: function () {
        var widgetSize = this._widget.getRect().size;
        var loadingBar = cc.UILoadingBar.create();
        loadingBar.setName("LoadingBar");
        loadingBar.loadTexture("res/cocosgui/sliderProgress.png");
        loadingBar.setPercent(0);
        loadingBar.setPosition(cc.p(widgetSize.width / 2, widgetSize.height / 2 + loadingBar.getRect().size.height / 4));
        this._uiLayer.addWidget(loadingBar);
    }
});

var UILoadingBarTest_Right = UILoadingBarTest.extend({
    createLoadingBar: function () {
        var widgetSize = this._widget.getRect().size;
        var loadingBar = cc.UILoadingBar.create();
        loadingBar.setName("LoadingBar");
        loadingBar.loadTexture("res/cocosgui/sliderProgress.png");
        loadingBar.setDirection(cc.LoadingBarType.Right);
        loadingBar.setPercent(0);
        loadingBar.setPosition(cc.p(widgetSize.width / 2, widgetSize.height / 2 + loadingBar.getRect().size.height / 4));
        this._uiLayer.addWidget(loadingBar);
    }
});

var UILoadingBarTest_Left_Scale9 = UILoadingBarTest.extend({
    createLoadingBar: function () {
        var widgetSize = this._widget.getRect().size;
        var loadingBar = cc.UILoadingBar.create();
        loadingBar.setName("LoadingBar");
        loadingBar.loadTexture("res/cocosgui/slider_bar_active_9patch.png");
        loadingBar.setScale9Enabled(true);
        loadingBar.setCapInsets(cc.rect(0, 0, 0, 0));
        loadingBar.setSize(cc.size(300, 30));
        loadingBar.setPercent(0);
        loadingBar.setPosition(cc.p(widgetSize.width / 2, widgetSize.height / 2 + loadingBar.getRect().size.height / 4));
        this._uiLayer.addWidget(loadingBar);
    }
});

var UILoadingBarTest_Right_Scale9 = UILoadingBarTest.extend({
    createLoadingBar: function () {
        var widgetSize = this._widget.getRect().size;
        var loadingBar = cc.UILoadingBar.create();
        loadingBar.setName("LoadingBar");
        loadingBar.loadTexture("res/cocosgui/slider_bar_active_9patch.png");
        loadingBar.setScale9Enabled(true);
        loadingBar.setCapInsets(cc.rect(0, 0, 0, 0));
        loadingBar.setSize(cc.size(300, 30));
        loadingBar.setDirection(cc.LoadingBarType.Right);
        loadingBar.setPercent(0);
        loadingBar.setPosition(cc.p(widgetSize.width / 2, widgetSize.height / 2 + loadingBar.getRect().size.height / 4));
        this._uiLayer.addWidget(loadingBar);
    }
});