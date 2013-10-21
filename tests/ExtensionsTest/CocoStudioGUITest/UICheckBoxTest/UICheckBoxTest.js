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

var UICheckBoxTest = UIScene.extend({
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
            alert.setText("CheckBox");
            alert.setFontName("res/cocosgui/Marker Felt.ttf");
            alert.setFontSize(30);
            alert.setColor(cc.c3b(159, 168, 176));
            alert.setPosition(cc.p(widgetSize.width / 2, widgetSize.height / 2 - alert.getRect().size.height * 1.75));
            this._uiLayer.addWidget(alert);

            // Create the checkbox
            var checkBox = cc.UICheckBox.create();
            checkBox.setTouchEnable(true);
            checkBox.loadTextures("res/cocosgui/check_box_normal.png",
                "res/cocosgui/check_box_normal_press.png",
                "res/cocosgui/check_box_active.png",
                "res/cocosgui/check_box_normal_disable.png",
                "res/cocosgui/check_box_active_disable.png");
            checkBox.setPosition(cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0));
            checkBox.addEventListener(this, this.selectedStateEvent);
            this._uiLayer.addWidget(checkBox);

            return true;
        }
        return false;
    },

    selectedStateEvent: function (sender, type) {
        switch (type) {
            case  cc.CheckBoxEventType.UNSELECTED:
                this._displayValueLabel.setText("Unselected");
                break;
            case cc.CheckBoxEventType.SELECTED:
                this._displayValueLabel.setText("Selected");
                break;

            default:
                break;
        }
    }
});
