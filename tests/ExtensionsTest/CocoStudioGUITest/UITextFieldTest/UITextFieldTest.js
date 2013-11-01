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
    init: function () {
        if (this._super()) {
            var widgetSize = this._widget.getRect().size;
            //init text
            this._topDisplayLabel.setText("No Event");
            this._bottomDisplayLabel.setText("TextField");

            // Create the textfield
            var textField = cc.UITextField.create();
            textField.setTouchEnable(true);
            textField.setFontName("Marker Felt");
            textField.setFontSize(30);
            textField.setPlaceHolder("input words here");
            textField.setPosition(cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0));
            textField.addEventListener(this.textFieldEvent, this);
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
                this._topDisplayLabel.setText("attach with IME");
                break;
            case cc.TextFiledEventType.DETACH_WITH_IME:
                var textField = sender;
                var widgetSize = this._widget.getRect().size;
                textField.runAction(cc.MoveTo.create(0.175, cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0)));
                this._topDisplayLabel.setText("detach with IME");
                break;
            case cc.TextFiledEventType.INDERT_TEXT:
                this._topDisplayLabel.setText("insert words");
                break;
            case cc.TextFiledEventType.DELETE_BACKWARD:
                this._topDisplayLabel.setText("delete word");
                break;
            default:
                break;
        }
    }
});

var UITextFieldTest_MaxLength = UIScene.extend({
    init: function () {
        if (this._super()) {
            var widgetSize = this._widget.getRect().size;
            //init text
            this._topDisplayLabel.setText("No Event");
            this._bottomDisplayLabel.setText("TextField max length");

            // Create the textfield
            var textField = cc.UITextField.create();
            textField.setMaxLengthEnabled(true);
            textField.setMaxLength(3);
            textField.setTouchEnable(true);
            textField.setFontName("Marker Felt");
            textField.setFontSize(30);
            textField.setPlaceHolder("input words here");
            textField.setPosition(cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0));
            textField.addEventListener(this.textFieldEvent, this);
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
                this._topDisplayLabel.setText("attach with IME max length:" + textField.getMaxLength());
                break;
            case cc.TextFiledEventType.DETACH_WITH_IME:
                textField.runAction(cc.MoveTo.create(0.175, cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0)));
                this._topDisplayLabel.setText("detach with IME max length:" + textField.getMaxLength());
                break;
            case cc.TextFiledEventType.INDERT_TEXT:
                this._topDisplayLabel.setText("insert with IME max length:" + textField.getMaxLength());
                break;
            case cc.TextFiledEventType.DELETE_BACKWARD:
                this._topDisplayLabel.setText("delete with IME max length:" + textField.getMaxLength());
                break;
            default:
                break;
        }
    }
});

var UITextFieldTest_Password = UIScene.extend({
    init: function () {
        if (this._super()) {
            var widgetSize = this._widget.getRect().size;
            //init text
            this._topDisplayLabel.setText("No Event");
            this._bottomDisplayLabel.setText("TextField max length");

            // Create the textfield
            var textField = cc.UITextField.create();
            textField.setPasswordEnabled(true);
            textField.setPasswordStyleText("*");
            textField.setTouchEnable(true);
            textField.setFontName("Marker Felt");
            textField.setFontSize(30);
            textField.setPlaceHolder("input password here");
            textField.setPosition(cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0));
            textField.addEventListener(this.textFieldEvent, this);
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
                this._topDisplayLabel.setText("attach with IME IME password");
                break;
            case cc.TextFiledEventType.DETACH_WITH_IME:
                var textField = sender;
                var widgetSize = this._widget.getRect().size;
                textField.runAction(cc.MoveTo.create(0.175, cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0)));
                this._topDisplayLabel.setText("detach with IME password");
                break;
            case cc.TextFiledEventType.INDERT_TEXT:
                this._topDisplayLabel.setText("insert with IME password");
                break;
            case cc.TextFiledEventType.DELETE_BACKWARD:
                this._topDisplayLabel.setText("delete with IME password");
                break;
            default:
                break;
        }
    }
});