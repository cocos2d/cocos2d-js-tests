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

var UIPageViewTest = UIScene.extend({
    _displayValueLabel: null,
    init: function () {
        if (UIScene.prototype.init.call(this)) {
            var widgetSize = this._widget.getRect().size;
            this._displayValueLabel = cc.UILabel.create();
            this._displayValueLabel.setText("Move by horizontal direction");
            this._displayValueLabel.setFontName("res/cocosgui/Marker Felt.ttf");
            this._displayValueLabel.setFontSize(32);
            this._displayValueLabel.setAnchorPoint(cc.p(0.5, -1));
            this._displayValueLabel.setPosition(cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0 + this._displayValueLabel.getContentSize().height * 1.5));
            this._uiLayer.addWidget(this._displayValueLabel);

            // Add the black background
            var alert = cc.UILabel.create();
            alert.setText("PageView");
            alert.setFontName("res/cocosgui/Marker Felt.ttf");
            alert.setFontSize(30);
            alert.setColor(cc.c3b(159, 168, 176));
            alert.setPosition(cc.p(widgetSize.width / 2, widgetSize.height / 2 - alert.getRect().size.height * 2.925));
            this._uiLayer.addWidget(alert);

            var background = this._uiLayer.getWidgetByName("background_Panel");

            // Create the page view
            var pageView = cc.UIPageView.create();
            pageView.setTouchEnable(true);
            pageView.setSize(cc.size(240, 130));
            var backgroundSize = background.getContentSize();
            pageView.setPosition(cc.p((widgetSize.width - backgroundSize.width) / 2 +
                (backgroundSize.width - pageView.getRect().size.width) / 2,
                (widgetSize.height - backgroundSize.height) / 2 +
                    (backgroundSize.height - pageView.getRect().size.height) / 2));

            for (var i = 0; i < 3; ++i) {
                var layout = cc.Layout.create();
                layout.setSize(cc.size(240, 130));

                var imageView = cc.UIImageView.create();
                imageView.setTouchEnable(true);
                imageView.setScale9Enabled(true);
                imageView.loadTexture("res/cocosgui/scrollviewbg.png");
                imageView.setSize(cc.size(240, 130));
                imageView.setPosition(cc.p(layout.getRect().size.width / 2, layout.getRect().size.height / 2));
                layout.addChild(imageView);

                var label = cc.UILabel.create();
                label.setText("page" + (i + 1));
                label.setFontName("res/cocosgui/Marker Felt.ttf");
                label.setFontSize(30);
                label.setColor(cc.c3b(192, 192, 192));
                label.setPosition(cc.p(layout.getRect().size.width / 2, layout.getRect().size.height / 2));
                layout.addChild(label);

                pageView.addPage(layout);
            }
            pageView.addEventListener(this, this.pageViewEvent);
            var a = cc.Layout.create();
            this._uiLayer.addWidget(pageView);

            return true;
        }
        return false;
    },

    pageViewEvent: function (sender, type) {
        switch (type) {
            case cc.PageViewEventType.TURNING:
                var pageView = sender;
                this._displayValueLabel.setText("page = " + (pageView.getCurPageIndex() + 1));
                break;
            default:
                break;
        }
    }
});
