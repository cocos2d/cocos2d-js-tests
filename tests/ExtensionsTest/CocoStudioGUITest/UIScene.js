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

UIScene = cc.Layer.extend({
    _uiLayer: null,
    _widget: null,
    _sceneTitle: null,
    ctor: function () {
        cc.Layer.prototype.ctor.call(this)
        this._uiLayer = null;
        this._widget = null;
    },
    init: function (title) {
        if (cc.Layer.prototype.init.call(this)) {
            this._uiLayer = cc.UILayer.create();
            this._uiLayer.scheduleUpdate();
            this.addChild(this._uiLayer);

            this._widget = cc.UIHelper.getInstance().createWidgetFromJsonFile("res/cocosgui/UITest/UITest.json");
            this._uiLayer.addWidget(this._widget);

            this._sceneTitle = this._uiLayer.getWidgetByName("UItest");

            var back_label = this._uiLayer.getWidgetByName("back");
            back_label.addTouchEventListener(this, this.toExtensionsMainLayer);

            var left_button = this._uiLayer.getWidgetByName("left_Button");
            left_button.addTouchEventListener(this, this.previousCallback);

            var middle_button = this._uiLayer.getWidgetByName("middle_Button");
            middle_button.addTouchEventListener(this, this.restartCallback);

            var right_button = this._uiLayer.getWidgetByName("right_Button");
            right_button.addTouchEventListener(this, this.nextCallback);

            var winSize = cc.Director.getInstance().getWinSize();
            var scale = winSize.height / 320;
            this._uiLayer.setAnchorPoint(cc.p(0,0));
            this._uiLayer.setScale(scale);
            this._uiLayer.setPosition(cc.p((winSize.width - 480 * scale) / 2, (winSize.height - 320 * scale) / 2));
            return true;
        }
        return false;
    },
    setSceneTitle: function (title) {
        this._sceneTitle.setText(title);
    },
    toExtensionsMainLayer: function (sender, type) {
        if (type == cc.TouchEventType.ENDED) {
            UISceneManager.purge();
            cc.CCSActionManager.purge();
            cc.UIHelper.purge();
            cc.CCSSceneReader.getInstance().purgeSceneReader();
            var scene = new CocosGUITestScene();
            scene.runThisTest();
        }
    },

    previousCallback: function (sender, type) {
        if (type == cc.TouchEventType.ENDED) {
            this._uiLayer.unscheduleUpdate();
            this._uiLayer.removeFromParent();
            cc.Director.getInstance().replaceScene(UISceneManager.getInstance().previousUIScene());
        }
    },

    restartCallback: function (sender, type) {
        if (type == cc.TouchEventType.ENDED) {
            this._uiLayer.unscheduleUpdate();
            this._uiLayer.removeFromParent();
            cc.Director.getInstance().replaceScene(UISceneManager.getInstance().currentUIScene());
        }
    },

    nextCallback: function (sender, type) {
        if (type == cc.TouchEventType.ENDED) {
            this._uiLayer.unscheduleUpdate();
            this._uiLayer.removeFromParent();
            cc.Director.getInstance().replaceScene(UISceneManager.getInstance().nextUIScene());
        }
    }
});