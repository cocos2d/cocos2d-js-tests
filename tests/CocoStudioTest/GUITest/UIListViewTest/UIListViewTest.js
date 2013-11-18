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
    _count: 0,
    _array: [],
    ctor: function () {
        this._super();
        this._count = 0;
        this._array = [];
    },
    init: function () {
        if (this._super()) {
            var widgetRect = this._widget.getRect();
            //init text
            this._topDisplayLabel.setText("Move by vertical direction");
            this._topDisplayLabel.setPosition(cc.p(widgetRect.width / 2.0,  widgetRect.height / 2.0 + this._topDisplayLabel.getContentSize().height * 1.5));
            this._bottomDisplayLabel.setText("ListView");
            this._bottomDisplayLabel.setFontSize(30);
            this._bottomDisplayLabel.setPosition(cc.p(widgetRect.width / 2, widgetRect.height / 2 - this._bottomDisplayLabel.getRect().height * 3));

            var background = this._uiLayer.getWidgetByName("background_Panel");
            // Create the list view
            this._count = 0;
            this._array = [];
            for (var i = 0; i < 20; ++i) {
                this._array.push("object_" + i);
            }

            var listView = ccs.UIListView.create();
            listView.setTouchEnable(true);
            listView.setBackGroundImageScale9Enabled(true);
            listView.setBackGroundImage("res/cocosgui/green_edit.png");
            listView.setSize(cc.size(240, 130));
            var backgroundSize = background.getContentSize();
            listView.setPosition(cc.p((widgetRect.width - backgroundSize.width) / 2 +
                (backgroundSize.width - listView.getRect().width) / 2,
                (widgetRect.height - backgroundSize.height) / 2 +
                    (backgroundSize.height - listView.getRect().height) / 2));

            var listWidth = listView.getRect().width;
            var listHeight = listView.getRect().height;

            for (var i = 0; i < 5; ++i) {
                var textButton = ccs.UITextButton.create();
                textButton.setName("TextButton");
                textButton.setTouchEnable(true);
                textButton.loadTextures("res/cocosgui/backtotoppressed.png", "res/cocosgui/backtotopnormal.png", "");

                var layout = ccs.UILayout.create();
                layout.setName("panel_" + i);
                layout.setSize(cc.size(textButton.getRect().width, textButton.getRect().height));
                textButton.setPosition(cc.p(layout.getRect().width / 2, layout.getRect().height / 2));
                layout.addChild(textButton);

                var panel_size = cc.size(layout.getRect().width,layout.getRect().height);
                layout.setPosition(cc.p((listWidth - panel_size.width) / 2,
                    (listHeight - (panel_size.height + panel_size.height * 0.25)) - i * (panel_size.height + panel_size.height * 0.25)));

                listView.addChild(layout);
            }
            listView.addEventListenerListView(this.listViewEvent, this);
            listView.initChildWithDataLength(this._array.length);
            this._uiLayer.addWidget(listView);

            return true;
        }
        return false;
    },

    listViewEvent: function (sender, type) {
        switch (type) {
            case ccs.ListViewEventType.init_child:
                var ccstr = this._array[this._count];
                var list = sender;

                var layout = list.getUpdateChild();
                var textButton = layout.getChildByName("TextButton");
                textButton.setTitleText(ccstr);

                this._count++;
                break;

            case ccs.ListViewEventType.update_child:
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
    _count: 0,
    _array: [],
    ctor: function () {
        this._super();
        this._count = 0;
        this._array = [];
    },
    init: function () {
        if (this._super()) {
            var widgetRect = this._widget.getRect();
            //init text
            this._topDisplayLabel.setText("Move by horizontal direction");
            this._topDisplayLabel.setPosition(cc.p(widgetRect.width / 2.0,  widgetRect.height / 2.0 + this._topDisplayLabel.getContentSize().height * 1.5));
            this._bottomDisplayLabel.setText("ListView");
            this._bottomDisplayLabel.setPosition(cc.p(widgetRect.width / 2, widgetRect.height / 2 - this._bottomDisplayLabel.getRect().height * 3));

            var background = this._uiLayer.getWidgetByName("background_Panel");

            // Create the list view
            this._count = 0;
            this._array = [];
            for (var i = 0; i < 20; ++i) {
                this._array.push("object_" + i);
            }

            var listView = ccs.UIListView.create();
            listView.setDirection(ccs.ScrollViewDir.horizontal);
            listView.setTouchEnable(true);
            listView.setBackGroundImageScale9Enabled(true);
            listView.setBackGroundImage("res/cocosgui/green_edit.png");
            listView.setSize(cc.size(240, 130));
            var backgroundSize = background.getContentSize();
            listView.setPosition(cc.p((widgetRect.width - backgroundSize.width) / 2 +
                (backgroundSize.width - listView.getRect().width) / 2,
                (widgetRect.height - backgroundSize.height) / 2 +
                    (backgroundSize.height - listView.getRect().height) / 2));

            var listWidth = listView.getRect().width;
            var listHeight = listView.getRect().height;

            for (var i = 0; i < 3; ++i) {
                var textButton = ccs.UITextButton.create();
                textButton.setName("TextButton");
                textButton.setTouchEnable(true);
                textButton.loadTextures("res/cocosgui/backtotoppressed.png", "res/cocosgui/backtotopnormal.png", "");

                var layout = ccs.UILayout.create();
                layout.setName("panel_" + i);
                layout.setSize(cc.size(textButton.getRect().width, textButton.getRect().height));
                textButton.setPosition(cc.p(layout.getRect().width / 2, layout.getRect().height / 2));
                layout.addChild(textButton);

                var layoutRect = layout.getRect();
                layout.setPosition(cc.p(0 + (layoutRect.width * 0.2) + i * (layoutRect.width + layoutRect.width * 0.2),
                    (listHeight - layoutRect.height) / 2));

                listView.addChild(layout);
            }
            listView.addEventListenerListView(this.listViewEvent, this);
            listView.initChildWithDataLength(this._array.length);
            this._uiLayer.addWidget(listView);

            return true;
        }
        return false;
    },

    listViewEvent: function (sender, type) {
        switch (type) {
            case ccs.ListViewEventType.init_child:
                var ccstr = this._array[this._count];
                var list = sender;

                var layout = list.getUpdateChild();
                var textButton = layout.getChildByName("TextButton");
                textButton.setTitleText(ccstr);

                this._count++;
                break;

            case ccs.ListViewEventType.update_child:
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