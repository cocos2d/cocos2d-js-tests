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

var UITextButtonTest = UIScene.extend({
    init: function () {
        if (this._super()) {
            var widgetRect = this._widget.getRect();
            //init text
            this._topDisplayLabel.setText("No Event");
            this._bottomDisplayLabel.setText("TextButton");

            // Create the text button
            var textButton = ccs.UITextButton.create();
            textButton.setTouchEnable(true);
            textButton.loadTextures("res/cocosgui/backtotopnormal.png", "res/cocosgui/backtotoppressed.png", "");
            textButton.setTitleText("Text Button");
            textButton.setPosition(cc.p(widgetRect.width / 2.0, widgetRect.height / 2.0));
            textButton.addTouchEventListener(this.touchEvent ,this);
            this._uiLayer.addWidget(textButton);

            return true;
        }
        return false;
    },

    touchEvent: function (sender, type) {
        switch (type) {
            case ccs.TouchEventType.began:
                this._topDisplayLabel.setText("Touch Down");
                break;
            case ccs.TouchEventType.moved:
                this._topDisplayLabel.setText("Touch Move");
                break;
            case ccs.TouchEventType.ended:
                this._topDisplayLabel.setText("Touch Up");
                break;
            case ccs.TouchEventType.canceled:
                this._topDisplayLabel.setText("Touch Cancelled");
                break;
            default:
                break;
        }
    }
});

var UITextButtonTest_Scale9 = UIScene.extend({
    init: function () {
        if (this._super()) {
            var widgetRect = this._widget.getRect();
            //init text
            this._topDisplayLabel.setText("No Event");
            this._bottomDisplayLabel.setText("TextButton scale9 render");

            // Create the text button
            var textButton = ccs.UITextButton.create();
            textButton.setTouchEnable(true);
            textButton.setScale9Enabled(true);
            textButton.loadTextures("res/cocosgui/button.png", "res/cocosgui/buttonHighlighted.png", "");
            textButton.setSize(cc.size(180, textButton.getContentSize().height * 1.5));
            textButton.setTitleText("Text Button scale9 render");
            textButton.setPosition(cc.p(widgetRect.width / 2.0, widgetRect.height / 2.0));
            textButton.addTouchEventListener(this.touchEvent ,this);
            this._uiLayer.addWidget(textButton);

            return true;
        }
        return false;
    },

    touchEvent: function (sender, type) {
        switch (type) {
            case ccs.TouchEventType.began:
                this._topDisplayLabel.setText("Touch Down");
                break;
            case ccs.TouchEventType.moved:
                this._topDisplayLabel.setText("Touch Move");
                break;
            case ccs.TouchEventType.ended:
                this._topDisplayLabel.setText("Touch Up");
                break;
            case ccs.TouchEventType.canceled:
                this._topDisplayLabel.setText("Touch Cancelled");
                break;
            default:
                break;
        }
    }
});
