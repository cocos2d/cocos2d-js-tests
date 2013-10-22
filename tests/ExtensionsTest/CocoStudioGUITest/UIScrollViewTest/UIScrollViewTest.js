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

var UIScrollViewTest_Vertical = UIScene.extend({
    _displayValueLabel: null,
    init: function () {
        if (UIScene.prototype.init.call(this)) {
            var widgetSize = this._widget.getRect().size;
            this._displayValueLabel = cc.UILabel.create();
            this._displayValueLabel.setText("Move by vertical direction");
            this._displayValueLabel.setFontName("res/cocosgui/Marker Felt.ttf");
            this._displayValueLabel.setFontSize(32);
            this._displayValueLabel.setAnchorPoint(cc.p(0.5, -1));
            this._displayValueLabel.setPosition(cc.p(widgetSize.width / 2.0,  widgetSize.height / 2.0 + this._displayValueLabel.getContentSize().height * 1.5));
            this._uiLayer.addWidget(this._displayValueLabel);

            var background = this._uiLayer.getWidgetByName("background_Panel");

            // Create the scrollview
            var scrollView = cc.UIScrollView.create();
            scrollView.setDirection(cc.SCROLLVIEW_DIR.VERTICAL);
            scrollView.setTouchEnable(true);
            scrollView.setSize(cc.size(280, 150));

            var backgroundSize = background.getContentSize();
            scrollView.setPosition(cc.p((widgetSize.width - backgroundSize.width) / 2 +
                (backgroundSize.width - scrollView.getRect().width) / 2,
                (widgetSize.height - backgroundSize.height) / 2 +
                    (backgroundSize.height - scrollView.getRect().height) / 2));
            this._uiLayer.addWidget(scrollView);

            var imageView = cc.UIImageView.create();
            imageView.loadTexture("res/cocosgui/ccicon.png");

            var innerWidth = scrollView.getRect().width;
            var innerHeight = scrollView.getRect().height + imageView.getRect().height;

            scrollView.setInnerContainerSize(cc.size(innerWidth, innerHeight));

            var button = cc.UIButton.create();
            button.setTouchEnable(true);
            button.loadTextures("res/cocosgui/animationbuttonnormal.png", "res/cocosgui/animationbuttonpressed.png", "");
            button.setPosition(cc.p(innerWidth / 2, scrollView.getInnerContainerSize().height - button.getRect().height / 2));
            scrollView.addChild(button);

            var textButton = cc.UITextButton.create();
            textButton.setTouchEnable(true);
            textButton.loadTextures("res/cocosgui/backtotopnormal.png", "res/cocosgui/backtotoppressed.png", "");
            textButton.setTitleText("Text Button");
            textButton.setPosition(cc.p(innerWidth / 2, button.getRelativeBottomPos() - button.getRect().height));
            scrollView.addChild(textButton);

            var button_scale9 = cc.UIButton.create();
            button_scale9.setTouchEnable(true);
            button_scale9.setScale9Enabled(true);
            button_scale9.loadTextures("res/cocosgui/button.png", "res/cocosgui/buttonHighlighted.png", "");
            button_scale9.setSize(cc.size(100, button_scale9.getContentSize().height));
            button_scale9.setPosition(cc.p(innerWidth / 2, textButton.getRelativeBottomPos() - textButton.getRect().height));
            scrollView.addChild(button_scale9);

            imageView.setPosition(cc.p(innerWidth / 2, imageView.getRect().height / 2));
            scrollView.addChild(imageView);

            return true;
        }
        return false;
    }
});

var UIScrollViewTest_Horizontal = UIScene.extend({
    _displayValueLabel: null,
    init: function () {
        if (UIScene.prototype.init.call(this)) {
            var widgetSize = this._widget.getRect().size;
            this._displayValueLabel = cc.UILabel.create();
            this._displayValueLabel.setText("Move by vertical direction");
            this._displayValueLabel.setFontName("res/cocosgui/Marker Felt.ttf");
            this._displayValueLabel.setFontSize(32);
            this._displayValueLabel.setAnchorPoint(cc.p(0.5, -1));
            this._displayValueLabel.setPosition(cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0 + this._displayValueLabel.getContentSize().height * 1.5));
            this._uiLayer.addWidget(this._displayValueLabel);

            var background = this._uiLayer.getWidgetByName("background_Panel");

            // Create the scrollview
            var scrollView = cc.UIScrollView.create();
            scrollView.setDirection(cc.SCROLLVIEW_DIR.HORIZONTAL);
            scrollView.setTouchEnable(true);
            scrollView.setSize(cc.size(280, 150));
            scrollView.setInnerContainerSize(scrollView.getRect().size);

            var backgroundSize = background.getContentSize();
            scrollView.setPosition(cc.p((widgetSize.width - backgroundSize.width) / 2 +
                (backgroundSize.width - scrollView.getRect().width) / 2,
                (widgetSize.height - backgroundSize.height) / 2 +
                    (backgroundSize.height - scrollView.getRect().height) / 2));
            this._uiLayer.addWidget(scrollView);

            var imageView = cc.UIImageView.create();
            imageView.loadTexture("res/cocosgui/ccicon.png");

            var innerWidth = scrollView.getRect().width + imageView.getRect().width;
            var innerHeight = scrollView.getRect().height;

            scrollView.setInnerContainerSize(cc.size(innerWidth, innerHeight));

            var button = cc.UIButton.create();
            button.setTouchEnable(true);
            button.loadTextures("res/cocosgui/animationbuttonnormal.png", "res/cocosgui/animationbuttonpressed.png", "");
            button.setPosition(cc.p(button.getRect().width / 2, scrollView.getInnerContainerSize().height - button.getRect().height / 2));
            scrollView.addChild(button);

            var textButton = cc.UITextButton.create();
            textButton.setTouchEnable(true);
            textButton.loadTextures("res/cocosgui/backtotopnormal.png", "res/cocosgui/backtotoppressed.png", "");
            textButton.setTitleText("Text Button");
            textButton.setPosition(cc.p(button.getRelativeRightPos() + button.getRect().width / 2, button.getRelativeBottomPos() - button.getRect().height));
            scrollView.addChild(textButton);

            var button_scale9 = cc.UIButton.create();
            button_scale9.setTouchEnable(true);
            button_scale9.setScale9Enabled(true);
            button_scale9.loadTextures("res/cocosgui/button.png", "res/cocosgui/buttonHighlighted.png", "");
            button_scale9.setSize(cc.size(100, button_scale9.getContentSize().height));
            button_scale9.setPosition(cc.p(textButton.getRelativeRightPos() + textButton.getRect().width / 2, textButton.getRelativeBottomPos() - textButton.getRect().height));
            scrollView.addChild(button_scale9);

            var pos = cc.p(innerWidth - imageView.getRect().width / 2,
                button_scale9.getRelativeBottomPos() - button_scale9.getRect().height / 2);
            imageView.setPosition(pos);
            scrollView.addChild(imageView);

            return true;
        }
        return false;
    }
});
