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

var UIListViewTest_Vertical = UIScene.extend({
    _displayValueLabel: null,
    _count: 0,
    _array: [],
    ctor: function () {
        UIScene.prototype.ctor.call(this);
        this._displayValueLabel = null;
        this._count = 0;
        this._array = [];
    },
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

            var alert = cc.UILabel.create();
            alert.setText("ListView");
            alert.setFontName("res/cocosgui/Marker Felt.ttf");
            alert.setFontSize(30);
            alert.setColor(cc.c3b(159, 168, 176));
            alert.setPosition(cc.p(widgetSize.width / 2, widgetSize.height / 2 - alert.getRect().size.height * 2.925));
            this._uiLayer.addWidget(alert);

            var background = this._uiLayer.getWidgetByName("background_Panel");

            // Create the list view
            this._count = 0;
            this._array = [];
            for (var i = 0; i < 20; ++i) {
                this._array.push("object_" + i);
            }

            var listView = cc.UIListView.create();
            listView.setTouchEnable(true);
            listView.setBackGroundImageScale9Enabled(true);
            listView.setBackGroundImage("res/cocosgui/green_edit.png");
            listView.setSize(cc.size(240, 130));
            var backgroundSize = background.getContentSize();
            listView.setPosition(cc.p((widgetSize.width - backgroundSize.width) / 2 +
                (backgroundSize.width - listView.getRect().size.width) / 2,
                (widgetSize.height - backgroundSize.height) / 2 +
                    (backgroundSize.height - listView.getRect().size.height) / 2));

            var listWidth = listView.getRect().size.width;
            var listHeight = listView.getRect().size.height;

            for (var i = 0; i < 5; ++i) {
                var textButton = cc.UITextButton.create();
                textButton.setName("TextButton");
                textButton.setTouchEnable(true);
                textButton.loadTextures("res/cocosgui/backtotoppressed.png", "res/cocosgui/backtotopnormal.png", "");

                var layout = cc.Layout.create();
                layout.setName("panel_" + i);
                layout.setSize(cc.size(textButton.getRect().size.width, textButton.getRect().size.height));
                textButton.setPosition(cc.p(layout.getRect().size.width / 2, layout.getRect().size.height / 2));
                layout.addChild(textButton);

                var panel_size = layout.getRect().size;
                layout.setPosition(cc.p((listWidth - panel_size.width) / 2,
                    (listHeight - (panel_size.height + panel_size.height * 0.25)) - i * (panel_size.height + panel_size.height * 0.25)));

                listView.addChild(layout);
            }
            listView.addEventListenter(this, this.listViewEvent);
            listView.initChildWithDataLength(this._array.length);
            this._uiLayer.addWidget(listView);

            return true;
        }
        return false;
    },

    listViewEvent: function (sender, type) {
        switch (type) {
            case cc.ListViewEventType.INIT_CHILD:
                var ccstr = this._array[this._count];
                var list = sender;

                var layout = list.getUpdateChild();
                var textButton = layout.getChildByName("TextButton");
                textButton.setTitleText(ccstr);

                this._count++;
                break;

            case cc.ListViewEventType.UPDATE_CHILD:
                var list = sender;
                var index = list.getUpdateDataIndex();

                if (index < 0 || index >= list.getDataLength()) {
                    list.setUpdateSuccess(false);
                    return;
                }

                var ccstr = this._array[index];
                var layout = list.getUpdateChild();
                var textButton = layout.getChildByName("TextButton");
                textButton.setTitleText(ccstr);
                list.setUpdateSuccess(true);
                break;

            default:
                break;
        }
    }
});

var UIListViewTest_Horizontal = UIScene.extend({
    _displayValueLabel: null,
    _count: 0,
    _array: [],
    ctor: function () {
        UIScene.prototype.ctor.call(this);
        this._displayValueLabel = null;
        this._count = 0;
        this._array = [];
    },
    init: function () {
        if (UIScene.prototype.init.call(this)) {
            var widgetSize = this._widget.getRect().size;
            this._displayValueLabel = cc.UILabel.create();
            this._displayValueLabel.setText("Move by horizontal direction");
            this._displayValueLabel.setFontName("res/cocosgui/Marker Felt.ttf");
            this._displayValueLabel.setFontSize(32);
            this._displayValueLabel.setAnchorPoint(cc.p(0.5, -1));
            this._displayValueLabel.setPosition(cc.p(widgetSize.width / 2.0,  widgetSize.height / 2.0 + this._displayValueLabel.getContentSize().height * 1.5));
            this._uiLayer.addWidget(this._displayValueLabel);

            var alert = cc.UILabel.create();
            alert.setText("ListView");
            alert.setFontName("res/cocosgui/Marker Felt.ttf");
            alert.setFontSize(30);
            alert.setColor(cc.c3b(159, 168, 176));
            alert.setPosition(cc.p(widgetSize.width / 2, widgetSize.height / 2 - alert.getRect().size.height * 2.925));
            this._uiLayer.addWidget(alert);

            var background = this._uiLayer.getWidgetByName("background_Panel");

            // Create the list view
            this._count = 0;
            this._array = [];
            for (var i = 0; i < 20; ++i) {
                this._array.push("object_" + i);
            }

            var listView = cc.UIListView.create();
            listView.setDirection(cc.ListViewDirection.HORIZONTAL);
            listView.setTouchEnable(true);
            listView.setBackGroundImageScale9Enabled(true);
            listView.setBackGroundImage("res/cocosgui/green_edit.png");
            listView.setSize(cc.size(240, 130));
            var backgroundSize = background.getContentSize();
            listView.setPosition(cc.p((widgetSize.width - backgroundSize.width) / 2 +
                (backgroundSize.width - listView.getRect().size.width) / 2,
                (widgetSize.height - backgroundSize.height) / 2 +
                    (backgroundSize.height - listView.getRect().size.height) / 2));

            var listWidth = listView.getRect().size.width;
            var listHeight = listView.getRect().size.height;

            for (var i = 0; i < 3; ++i) {
                var textButton = cc.UITextButton.create();
                textButton.setName("TextButton");
                textButton.setTouchEnable(true);
                textButton.loadTextures("res/cocosgui/backtotoppressed.png", "res/cocosgui/backtotopnormal.png", "");

                var layout = cc.Layout.create();
                layout.setName("panel_" + i);
                layout.setSize(cc.size(textButton.getRect().size.width, textButton.getRect().size.height));
                textButton.setPosition(cc.p(layout.getRect().size.width / 2, layout.getRect().size.height / 2));
                layout.addChild(textButton);

                var layout_size = layout.getRect().size;
                layout.setPosition(cc.p(0 + (layout_size.width * 0.2) + i * (layout_size.width + layout_size.width * 0.2),
                    (listHeight - layout_size.height) / 2));

                listView.addChild(layout);
            }
            listView.addEventListenter(this, this.listViewEvent);
            listView.initChildWithDataLength(this._array.length);
            this._uiLayer.addWidget(listView);

            return true;
        }
        return false;
    },

    listViewEvent: function (sender, type) {
        switch (type) {
            case cc.ListViewEventType.INIT_CHILD:
                var ccstr = this._array[this._count];
                var list = sender;

                var layout = list.getUpdateChild();
                var textButton = layout.getChildByName("TextButton");
                textButton.setTitleText(ccstr);

                this._count++;
                break;

            case cc.ListViewEventType.UPDATE_CHILD:
                var list = sender;
                var index = list.getUpdateDataIndex();

                if (index < 0 || index >= list.getDataLength()) {
                    list.setUpdateSuccess(false);
                    return;
                }

                var ccstr = this._array[index];
                var layout = list.getUpdateChild();
                var textButton = layout.getChildByName("TextButton");
                textButton.setTitleText(ccstr);
                list.setUpdateSuccess(true);
                break;

            default:
                break;
        }
    }
});