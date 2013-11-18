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

var UIPanelTestBase = UIScene.extend({
    layout: null,
    button: null,
    textButton: null,
    button_scale9: null,
    init: function () {
        if (this._super()) {
            var widgetRect = this._widget.getRect();
            //init text
            this._topDisplayLabel.setText("");
            this._bottomDisplayLabel.setText(this.getText());
            this._bottomDisplayLabel.setPosition(cc.p(widgetRect.width / 2, widgetRect.height / 2 - this._bottomDisplayLabel.getRect().height * 3));

            var background = this._uiLayer.getWidgetByName("background_Panel");

            // Create the layout
            this.layout = this.createLayout();
            var  layoutRect = this.layout.getRect();
            var backgroundRect = background.getRect();
            this.layout.setPosition(cc.p((widgetRect.width - backgroundRect.width) / 2 +
                (backgroundRect.width - layoutRect.width) / 2,
                (widgetRect.height - backgroundRect.height) / 2 +
                    (backgroundRect.height - layoutRect.height) / 2));
            this._uiLayer.addWidget(this.layout);

            this.button = ccs.UIButton.create();
            this.button.setTouchEnable(true);
            this.button.loadTextures("res/cocosgui/animationbuttonnormal.png", "res/cocosgui/animationbuttonpressed.png", "");
            this.button.setPosition(cc.p(this.button.getRect().width / 2, layoutRect.height - this.button.getRect().height / 2));
            this.layout.addChild(this.button);

            this.textButton = ccs.UITextButton.create();
            this.textButton.setTouchEnable(true);
            this.textButton.loadTextures("res/cocosgui/backtotopnormal.png", "res/cocosgui/backtotoppressed.png", "");
            this.textButton.setTitleText("Text Button");
            this.textButton.setPosition(cc.p(layoutRect.width / 2, layoutRect.height / 2));
            this.layout.addChild(this.textButton);

            this.button_scale9 = ccs.UIButton.create();
            this.button_scale9.setTouchEnable(true);
            this.button_scale9.loadTextures("res/cocosgui/button.png", "res/cocosgui/buttonHighlighted.png", "");
            this.button_scale9.setScale9Enabled(true);
            this.button_scale9.setSize(cc.size(100, this.button_scale9.getContentSize().height));
            this.button_scale9.setPosition(cc.p(layoutRect.width - this.button_scale9.getRect().width / 2, this.button_scale9.getRect().height / 2));
            this.layout.addChild(this.button_scale9);

            this.setLayoutParameter();
            return true;
        }
        return false;
    },
    getText: function () {
        return "";
    },
    createLayout: function () {
        var layout = ccs.UILayout.create();
        layout.setSize(cc.size(280, 150));
        return layout;
    },
    setLayoutParameter: function () {

    }
});
var UIPanelTest = UIPanelTestBase.extend({
    createLayout: function () {
        var layout = ccs.UILayout.create();
        layout.setSize(cc.size(280, 150));
        return layout;
    },
    getText: function () {
        return "Panel";
    }
});
var UIPanelTest_Color = UIPanelTestBase.extend({
    createLayout: function () {
        var layout = ccs.UILayout.create();
        layout.setBackGroundColorType(ccs.LayoutBackGroundColorType.solid);
        layout.setBackGroundColor(cc.c3b(128, 128, 128));
        layout.setSize(cc.size(280, 150));
        return layout;
    },
    getText: function () {
        return "Panel color render";
    }
});
var UIPanelTest_Gradient = UIPanelTestBase.extend({
    createLayout: function () {
        var layout = ccs.UILayout.create();
        layout.setBackGroundColorType(ccs.LayoutBackGroundColorType.gradient);
        layout.setBackGroundColor(cc.c3b(64, 64, 64), cc.c3b(192, 192, 192));
        layout.setSize(cc.size(280, 150));
        return layout;
    },
    getText: function () {
        return "Panel gradient render";
    }
});
var UIPanelTest_BackGroundImage = UIPanelTestBase.extend({
    createLayout: function () {
        var layout = ccs.UILayout.create();
        layout.setClippingEnabled(true);
        layout.setBackGroundImage("res/cocosgui/Hello.png");
        layout.setSize(cc.size(280, 150));
        return layout;
    },
    getText: function () {
        return "Panel background image";
    }
});

var UIPanelTest_BackGroundImage_Scale9 = UIPanelTestBase.extend({
    createLayout: function () {
        var layout = ccs.UILayout.create();
        layout.setBackGroundImageScale9Enabled(true);
        layout.setBackGroundImage("res/cocosgui/green_edit.png");
        layout.setSize(cc.size(280, 150));
        return layout;
    },
    getText: function () {
        return "Panel background image scale9";
    }
});
var UIPanelTest_Layout_Linear_Vertical = UIPanelTestBase.extend({
    createLayout: function () {
        var layout = ccs.UILayout.create();
        layout.setLayoutType(ccs.LayoutType.linearVertical);
        layout.setSize(cc.size(280, 150));
        return layout;
    },
    getText: function () {
        return "Panel Layout Linear Vertical";
    },
    setLayoutParameter: function () {
        var lp1 = ccs.UILinearLayoutParameter.create();
        this.button.setLayoutParameter(lp1);
        lp1.setGravity(ccs.UILinearGravity.centerHorizontal);
        lp1.setMargin(new ccs.UIMargin(0, 5, 0, 10));

        var lp2 = ccs.UILinearLayoutParameter.create();
        this.textButton.setLayoutParameter(lp2);
        lp2.setGravity(ccs.UILinearGravity.centerHorizontal);
        lp2.setMargin(new ccs.UIMargin(0, 10, 0, 10));

        var lp3 = ccs.UILinearLayoutParameter.create();
        this.button_scale9.setLayoutParameter(lp3);
        lp3.setGravity(ccs.UILinearGravity.centerHorizontal);
        lp3.setMargin(new ccs.UIMargin(0, 10, 0, 10));

        this.layout.doLayout();
    }
});
var UIPanelTest_Layout_Linear_Horizontal = UIPanelTestBase.extend({
    createLayout: function () {
        var layout = ccs.UILayout.create();
        layout.setLayoutType(ccs.LayoutType.linearHorizontal);
        layout.setClippingEnabled(true);
        layout.setSize(cc.size(280, 150));
        return layout;
    },
    getText: function () {
        return "Panel Layout Linear Horizontal";
    },
    setLayoutParameter: function () {
        var lp1 = ccs.UILinearLayoutParameter.create();
        this.button.setLayoutParameter(lp1);
        lp1.setGravity(ccs.UILinearGravity.centerVertical);
        lp1.setMargin(new ccs.UIMargin(0, 10, 0, 10));

        var lp2 = ccs.UILinearLayoutParameter.create();
        this.textButton.setLayoutParameter(lp2);
        lp2.setGravity(ccs.UILinearGravity.centerVertical);
        lp2.setMargin(new ccs.UIMargin(0, 10, 0, 10));

        var lp3 = ccs.UILinearLayoutParameter.create();
        this.button_scale9.setLayoutParameter(lp3);
        lp3.setGravity(ccs.UILinearGravity.centerVertical);
        lp3.setMargin(new ccs.UIMargin(0, 10, 0, 10));

        this.layout.doLayout();
    }
});

var UIPanelTest_Layout_Relative = UIPanelTestBase.extend({
    createLayout: function () {
        var layout = ccs.UILayout.create();
        layout.setLayoutType(ccs.LayoutType.relative);
        layout.setSize(cc.size(280, 150));
        layout.setBackGroundColorType(ccs.LayoutBackGroundColorType.solid);
        layout.setBackGroundColor(cc.GREEN);
        return layout;
    },
    getText: function () {
        return "Panel Layout Relative";
    },
    setLayoutParameter: function () {
        var lp1 = ccs.UIRelativeLayoutParameter.create();
        this.button.setLayoutParameter(lp1);
        lp1.setGravity(ccs.UIRelativeAlign.alignParentLeftBottom);

        var lp2 = ccs.UIRelativeLayoutParameter.create();
        this.textButton.setLayoutParameter(lp2);
        lp2.setGravity(ccs.UIRelativeAlign.alignParentLeftBottom);

        var lp3 = ccs.UIRelativeLayoutParameter.create();
        this.button_scale9.setLayoutParameter(lp3);
        lp3.setGravity(ccs.UIRelativeAlign.alignParentRightCenterVertical);

        this.layout.doLayout();
    }
});