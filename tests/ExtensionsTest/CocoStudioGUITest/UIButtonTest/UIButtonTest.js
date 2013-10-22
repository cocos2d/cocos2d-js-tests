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

var UIButtonTest = UIScene.extend({
    _displayValueLabel: null,
    init: function () {
        if (UIScene.prototype.init.call(this)) {
            var widgetSize = this._widget.getRect().size;
            this._displayValueLabel = cc.UILabel.create();
            this._displayValueLabel.setText("No Event");
            this._displayValueLabel.setFontName("res/cocosgui/Marker Felt.ttf");
            this._displayValueLabel.setFontSize(32);
            this._displayValueLabel.setAnchorPoint(cc.p(0.5, -1));
            this._displayValueLabel.setPosition(cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0));
            this._uiLayer.addWidget(this._displayValueLabel);

            // Add the alert
            var alert = cc.UILabel.create();
            alert.setText("Button");
            alert.setFontName("res/cocosgui/Marker Felt.ttf");
            alert.setFontSize(30);
            alert.setColor(cc.c3b(159, 168, 176));

            alert.setPosition(cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0 - alert.getRect().size.height * 1.75));
            this._uiLayer.addWidget(alert);

            // Create the button
            var button = cc.UIButton.create();
            button.setTouchEnable(true);
            button.loadTextures("res/cocosgui/animationbuttonnormal.png", "res/cocosgui/animationbuttonpressed.png", "");
            button.setPosition(cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0));
            button.addTouchEventListener(this, this.touchEvent);
            this._uiLayer.addWidget(button);

            return true;
        }
        return false;
    },

    touchEvent: function (sender, type) {
        switch (type) {
            case cc.TouchEventType.BEGAN:
                this._displayValueLabel.setText("Touch Down");
                break;

            case cc.TouchEventType.MOVED:
                this._displayValueLabel.setText("Touch Move");
                break;

            case cc.TouchEventType.ENDED:
                this._displayValueLabel.setText("Touch Up");
                break;

            case cc.TouchEventType.CANCELED:
                this._displayValueLabel.setText("Touch Cancelled");
                break;

            default:
                break;
        }
    }
});
var UIButtonTest_Scale9 = UIScene.extend({
    init: function () {
        if (UIScene.prototype.init.call(this)) {
            var widgetSize = this._widget.getRect().size;

            // Add a label in which the button events will be displayed
            this._displayValueLabel = cc.UILabel.create();
            this._displayValueLabel.setText("No Event");
            this._displayValueLabel.setFontName("res/cocosgui/Marker Felt.ttf");
            this._displayValueLabel.setFontSize(32);
            this._displayValueLabel.setAnchorPoint(cc.p(0.5, -1));
            this._displayValueLabel.setPosition(cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0));
            this._uiLayer.addWidget(this._displayValueLabel);

            // Add the alert
            var alert = cc.UILabel.create();
            alert.setText("Button scale9 render");
            alert.setFontName("res/cocosgui/Marker Felt.ttf");
            alert.setFontSize(30);
            alert.setColor(cc.c3b(159, 168, 176));
            alert.setPosition(cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0 - alert.getRect().size.height * 1.75));
            this._uiLayer.addWidget(alert);

            // Create the button
            var button = cc.UIButton.create();
            button.setTouchEnable(true);
            button.setScale9Enabled(true);
            button.loadTextures("res/cocosgui/button.png", "res/cocosgui/buttonHighlighted.png", "");
            button.setPosition(cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0));
            button.setSize(cc.size(150, button.getContentSize().height * 1.5));
            button.addTouchEventListener(this, this.touchEvent);
            this._uiLayer.addWidget(button);

            return true;
        }
        return false;
    },

    touchEvent: function (sender, type) {
        switch (type) {
            case cc.TouchEventType.BEGAN:
                this._displayValueLabel.setText("Touch Down");
                break;
            case cc.TouchEventType.MOVED:
                this._displayValueLabel.setText("Touch Move");
                break;
            case cc.TouchEventType.ENDED:
                this._displayValueLabel.setText("Touch Up");
                break;
            case cc.TouchEventType.CANCELED:
                this._displayValueLabel.setText("Touch Cancelled");
                break;

            default:
                break;
        }
    }
});

var UIButtonTest_PressedAction = UIScene.extend({
    _displayValueLabel: null,
    init: function () {
        if (UIScene.prototype.init.call(this)) {
            var widgetSize = this._widget.getRect().size;

            // Add a label in which the button events will be displayed
            this._displayValueLabel = cc.UILabel.create();
            this._displayValueLabel.setText("No Event");
            this._displayValueLabel.setFontName("res/cocosgui/Marker Felt.ttf");
            this._displayValueLabel.setFontSize(32);
            this._displayValueLabel.setAnchorPoint(cc.p(0.5, -1));
            this._displayValueLabel.setPosition(cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0));
            this._uiLayer.addWidget(this._displayValueLabel);

            // Add the alert
            var alert = cc.UILabel.create();
            alert.setText("Button Pressed Action");
            alert.setFontName("res/cocosgui/Marker Felt.ttf");
            alert.setFontSize(30);
            alert.setColor(cc.c3b(159, 168, 176));
            alert.setPosition(cc.p(widgetSize.width / 2, widgetSize.height / 2 - alert.getRect().size.height * 1.75));
            this._uiLayer.addWidget(alert);

            // Create the button
            var button = cc.UIButton.create();
            button.setTouchEnable(true);
            button.setPressedActionEnabled(true);
            button.loadTextures("res/cocosgui/animationbuttonnormal.png", "res/cocosgui/animationbuttonpressed.png", "");
            button.setPosition(cc.p(widgetSize.width / 2, widgetSize.height / 2));
            button.addTouchEventListener(this, this.touchEvent);
            this._uiLayer.addWidget(button);
            return true;
        }
        return false;
    },

    touchEvent: function (sender, type) {
        switch (type) {
            case cc.TouchEventType.BEGAN:
                this._displayValueLabel.setText("Touch Down");
                break;
            case cc.TouchEventType.MOVED:
                this._displayValueLabel.setText("Touch Move");
                break;
            case cc.TouchEventType.ENDED:
                this._displayValueLabel.setText("Touch Up");
                break;
            case cc.TouchEventType.CANCELED:
                this._displayValueLabel.setText("Touch Cancelled");
                break;
            default:
                break;
        }
    }
});