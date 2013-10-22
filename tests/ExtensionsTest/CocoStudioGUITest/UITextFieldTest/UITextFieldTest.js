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

var UITextFieldTest = UIScene.extend({
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
            alert.setText("TextField");
            alert.setFontName("res/cocosgui/Marker Felt.ttf");
            alert.setFontSize(30);
            alert.setColor(cc.c3b(159, 168, 176));
            alert.setPosition(cc.p(widgetSize.width / 2, widgetSize.height / 2 - alert.getRect().size.height * 1.75));
            this._uiLayer.addWidget(alert);

            // Create the textfield
            var textField = cc.UITextField.create();
            textField.setTouchEnable(true);
            textField.setFontName("res/cocosgui/Marker Felt.ttf");
            textField.setFontSize(30);
            textField.setPlaceHolder("input words here");
            textField.setPosition(cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0));
            textField.addEventListener(this, this.textFieldEvent);
            this._uiLayer.addWidget(textField);

            return true;
        }
        return false;
    },

    textFieldEvent: function (sender, type) {
        switch (type) {
            case cc.TextFiledEventType.ATTACH_WITH_IME:
                var textField = sender;
                var widgetSize = this._widget.getRect().size;
                textField.runAction(cc.MoveTo.create(0.225,
                    cc.p(widgetSize.width / 2, widgetSize.height / 2 + textField.getContentSize().height / 2)));
                this._displayValueLabel.setText("attach with IME");
                break;
            case cc.TextFiledEventType.DETACH_WITH_IME:
                var textField = sender;
                var widgetSize = this._widget.getRect().size;
                textField.runAction(cc.MoveTo.create(0.175, cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0)));
                this._displayValueLabel.setText("detach with IME");
                break;
            case cc.TextFiledEventType.INDERT_TEXT:
                this._displayValueLabel.setText("insert words");
                break;
            case cc.TextFiledEventType.DELETE_BACKWARD:
                this._displayValueLabel.setText("delete word");
                break;
            default:
                break;
        }
    }
});

var UITextFieldTest_MaxLength = UIScene.extend({
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
            alert.setText("TextField max length");
            alert.setFontName("res/cocosgui/Marker Felt.ttf");
            alert.setFontSize(30);
            alert.setColor(cc.c3b(159, 168, 176));
            alert.setPosition(cc.p(widgetSize.width / 2, widgetSize.height / 2 - alert.getRect().size.height * 1.75));
            this._uiLayer.addWidget(alert);

            // Create the textfield
            var textField = cc.UITextField.create();
            textField.setMaxLengthEnabled(true);
            textField.setMaxLength(3);
            textField.setTouchEnable(true);
            textField.setFontName("res/cocosgui/Marker Felt.ttf");
            textField.setFontSize(30);
            textField.setPlaceHolder("input words here");
            textField.setPosition(cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0));
            textField.addEventListener(this, this.textFieldEvent);
            this._uiLayer.addWidget(textField);

            return true;
        }
        return false;
    },

    textFieldEvent: function (sender, type) {
        var textField = sender;
        var widgetSize = this._widget.getRect().size;
        switch (type) {
            case cc.TextFiledEventType.ATTACH_WITH_IME:
                textField.runAction(cc.MoveTo.create(0.225,
                    cc.p(widgetSize.width / 2, widgetSize.height / 2 + textField.getContentSize().height / 2)));
                this._displayValueLabel.setText("attach with IME max length:" + textField.getMaxLength());
                break;
            case cc.TextFiledEventType.DETACH_WITH_IME:
                textField.runAction(cc.MoveTo.create(0.175, cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0)));
                this._displayValueLabel.setText("detach with IME max length:" + textField.getMaxLength());
                break;
            case cc.TextFiledEventType.INDERT_TEXT:
                this._displayValueLabel.setText("insert with IME max length:" + textField.getMaxLength());
                break;
            case cc.TextFiledEventType.DELETE_BACKWARD:
                this._displayValueLabel.setText("delete with IME max length:" + textField.getMaxLength());
                break;
            default:
                break;
        }
    }
});

var UITextFieldTest_Password = UIScene.extend({
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
            alert.setText("TextField max length");
            alert.setFontName("res/cocosgui/Marker Felt.ttf");
            alert.setFontSize(30);
            alert.setColor(cc.c3b(159, 168, 176));
            alert.setPosition(cc.p(widgetSize.width / 2, widgetSize.height / 2 - alert.getRect().size.height * 1.75));
            this._uiLayer.addWidget(alert);

            // Create the textfield
            var textField = cc.UITextField.create();
            textField.setPasswordEnabled(true);
            textField.setPasswordStyleText("*");
            textField.setTouchEnable(true);
            textField.setFontName("res/cocosgui/Marker Felt.ttf");
            textField.setFontSize(30);
            textField.setPlaceHolder("input password here");
            textField.setPosition(cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0));
            textField.addEventListener(this, this.textFieldEvent);
            this._uiLayer.addWidget(textField);

            return true;
        }
        return false;
    },

    textFieldEvent: function (sender, type) {
        switch (type) {
            case cc.TextFiledEventType.ATTACH_WITH_IME:
                var textField = sender;
                var widgetSize = this._widget.getRect().size;
                textField.runAction(cc.MoveTo.create(0.225,
                    cc.p(widgetSize.width / 2, widgetSize.height / 2 + textField.getContentSize().height / 2)));
                this._displayValueLabel.setText("attach with IME IME password");
                break;
            case cc.TextFiledEventType.DETACH_WITH_IME:
                var textField = sender;
                var widgetSize = this._widget.getRect().size;
                textField.runAction(cc.MoveTo.create(0.175, cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0)));
                this._displayValueLabel.setText("detach with IME password");
                break;
            case cc.TextFiledEventType.INDERT_TEXT:
                this._displayValueLabel.setText("insert with IME password");
                break;
            case cc.TextFiledEventType.DELETE_BACKWARD:
                this._displayValueLabel.setText("delete with IME password");
                break;
            default:
                break;
        }
    }
});