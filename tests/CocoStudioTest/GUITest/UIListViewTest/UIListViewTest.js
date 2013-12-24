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
    init: function () {
        if (this._super()) {
            var widgetSize = this._widget.getSize();
            var background = this._uiLayer.getWidgetByName("background_Panel");
            var backgroundSize = background.getContentSize();

            this._array = [];
            for (var i = 0; i < 20; ++i) {
                this._array.push("listviewex_item_" + i);
            }

            // Create the list view
            var listView = ccs.UIListView.create();
            // set list view ex direction
            listView.setDirection(ccs.ScrollViewDir.vertical);
            listView.setTouchEnabled(true);
            listView.setBounceEnabled(true);
            listView.setBackGroundImage("res/cocosgui/green_edit.png");
            listView.setBackGroundImageScale9Enabled(true);
            listView.setSize(cc.size(240, 130));
            listView.setPosition(cc.p((widgetSize.width - backgroundSize.width) / 2 +
                (backgroundSize.width - listView.getSize().width) / 2,
                (widgetSize.height - backgroundSize.height) / 2 +
                    (backgroundSize.height - listView.getSize().height) / 2));
            listView.addEventListenerScrollView(this.selectedItemEvent, this);
            this._uiLayer.addWidget(listView);


            // create model
            var default_button = ccs.UIButton.create();
            default_button.setName("TextButton");
            default_button.setTouchEnabled(true);
            default_button.loadTextures("res/cocosgui/backtotoppressed.png", "res/cocosgui/backtotopnormal.png", "");

            var default_item = ccs.UILayout.create();
            default_item.setTouchEnabled(true);
            default_item.setSize(default_button.getSize());
            default_button.setPosition(cc.p(default_item.getSize().width / 2, default_item.getSize().height / 2));
            default_item.addChild(default_button);

            // set model
            listView.setItemModel(default_item);

            // add default item
            var count = this._array.length;
            for (var i = 0; i < count / 4; ++i) {
                listView.pushBackDefaultItem();
            }
            // insert default item
            for (var i = 0; i < count / 4; ++i) {
                listView.insertDefaultItem(0);
            }

            // add custom item
            for (var i = 0; i < count / 4; ++i) {
                var custom_button = ccs.UIButton.create();
                custom_button.setName("TextButton");
                custom_button.setTouchEnabled(true);
                custom_button.loadTextures("res/cocosgui/button.png", "res/cocosgui/buttonHighlighted.png", "");
                custom_button.setScale9Enabled(true);
                custom_button.setSize(default_button.getSize());

                var custom_item = ccs.UILayout.create();
                custom_item.setSize(custom_button.getSize());
                custom_button.setPosition(cc.p(custom_item.getSize().width / 2, custom_item.getSize().height / 2));
                custom_item.addChild(custom_button);

                listView.pushBackCustomItem(custom_item);
            }
            // insert custom item
            var items = listView.getItems();
            var items_count = items.length;
            for (var i = 0; i < count / 4; ++i) {
                var custom_button = ccs.UIButton.create();
                custom_button.setName("TextButton");
                custom_button.setTouchEnabled(true);
                custom_button.loadTextures("res/cocosgui/button.png", "res/cocosgui/buttonHighlighted.png", "");
                custom_button.setScale9Enabled(true);
                custom_button.setSize(default_button.getSize());

                var custom_item = ccs.UILayout.create();
                custom_item.setSize(custom_button.getSize());
                custom_button.setPosition(cc.p(custom_item.getSize().width / 2, custom_item.getSize().height / 2));
                custom_item.addChild(custom_button);

                listView.insertCustomItem(custom_item, items_count);
            }

            // set item data
            items_count = items.length;
            for (var i = 0; i < items_count; ++i) {
                var item = listView.getItem(i);
                var button = item.getChildByName("TextButton");
                var index = listView.getIndex(item);
                button.setTitleText(this._array[index]);
            }

            // refresh all items layout
//        listViewEx.refreshView();

            // remove last item
            listView.removeLastItem();

            // remove item by index
            items_count = items.length;
            listView.removeItem(items_count - 1);

            // refresh all items layout
//        listViewEx.refreshView();

            // set all items layout gravity
            listView.setGravity(ccs.ListViewGravity.centerVertical);

            // set items margin
//        listViewEx.setItemsMargin(2);

            return true;
        }

        return false;
    },

    selectedItemEvent: function (sender, type) {
        switch (type) {
            case ccs.ListViewEventType.listViewOnselectedItem:
                var listViewEx = sender;
                cc.log("select child index = " + listViewEx.getCurSelectedIndex());
                break;

            default:
                break;
        }
    }
});

var UIListViewTest_Horizontal = UIScene.extend({
    _array: null,
    init: function () {
        if (this._super()) {
            var widgetSize = this._widget.getSize();
            var background = this._uiLayer.getWidgetByName("background_Panel");
            var backgroundSize = background.getContentSize();
            // create list view ex data
            this._array = [];
            for (var i = 0; i < 20; ++i) {
                this._array.push("listviewex_item_" + i);
            }


            // Create the list view
            var listView = ccs.UIListView.create();
            // set list view ex direction
            listView.setDirection(ccs.ScrollViewDir.horizontal);
            listView.setTouchEnabled(true);
            listView.setBounceEnabled(true);
            listView.setBackGroundImage("res/cocosgui/green_edit.png");
            listView.setBackGroundImageScale9Enabled(true);
            listView.setSize(cc.size(240, 130));
            listView.setPosition(cc.p((widgetSize.width - backgroundSize.width) / 2 +
                (backgroundSize.width - listView.getSize().width) / 2,
                (widgetSize.height - backgroundSize.height) / 2 +
                    (backgroundSize.height - listView.getSize().height) / 2));
            listView.addEventListenerScrollView(this.selectedItemEvent, this);
            this._uiLayer.addWidget(listView);


            // create model
            var default_button = ccs.UIButton.create();
            default_button.setName("TextButton");
            default_button.setTouchEnabled(true);
            default_button.loadTextures("res/cocosgui/backtotoppressed.png", "res/cocosgui/backtotopnormal.png", "");

            var default_item = ccs.UILayout.create();
            default_item.setTouchEnabled(true);
            default_item.setSize(default_button.getSize());
            default_button.setPosition(cc.p(default_item.getSize().width / 2, default_item.getSize().height / 2));
            default_item.addChild(default_button);

            // set model
            listView.setItemModel(default_item);

            // add default item
            var count = this._array.length;
            for (var i = 0; i < count / 4; ++i) {
                listView.pushBackDefaultItem();
            }
            // insert default item
            for (var i = 0; i < count / 4; ++i) {
                listView.insertDefaultItem(0);
            }

            // add custom item
            for (var i = 0; i < count / 4; ++i) {
                var custom_button = ccs.UIButton.create();
                custom_button.setName("TextButton");
                custom_button.setTouchEnabled(true);
                custom_button.loadTextures("res/cocosgui/button.png", "res/cocosgui/buttonHighlighted.png", "");
                custom_button.setScale9Enabled(true);
                custom_button.setSize(default_button.getSize());

                var custom_item = ccs.UILayout.create();
                custom_item.setSize(custom_button.getSize());
                custom_button.setPosition(cc.p(custom_item.getSize().width / 2, custom_item.getSize().height / 2));
                custom_item.addChild(custom_button);

                listView.pushBackCustomItem(custom_item);
            }
            // insert custom item
            var items = listView.getItems();
            var items_count = items.length;
            for (var i = 0; i < count / 4; ++i) {
                var custom_button = ccs.UIButton.create();
                custom_button.setName("TextButton");
                custom_button.setTouchEnabled(true);
                custom_button.loadTextures("res/cocosgui/button.png", "res/cocosgui/buttonHighlighted.png", "");
                custom_button.setScale9Enabled(true);
                custom_button.setSize(default_button.getSize());

                var custom_item = ccs.UILayout.create();
                custom_item.setSize(custom_button.getSize());
                custom_button.setPosition(cc.p(custom_item.getSize().width / 2, custom_item.getSize().height / 2));
                custom_item.addChild(custom_button);

                listView.insertCustomItem(custom_item, items_count);
            }

            // set item data
            items_count = items.length;
            for (var i = 0; i < items_count; ++i) {
                var item = listView.getItem(i);
                var button = item.getChildByName("TextButton");
                var index = listView.getIndex(item);
                button.setTitleText(this._array[index]);
            }

            // refresh all items layout
//        listViewEx.refreshView();

            // remove last item
            listView.removeLastItem();

            // remove item by index
            items_count = items.length;
            listView.removeItem(items_count - 1);

            // refresh all items layout
//        listViewEx.refreshView();

            // set all items layout gravity
            listView.setGravity(ccs.ListViewGravity.centerVertical);

            // set items margin
            listView.setItemsMargin(2);

            return true;
        }

        return false;
    },

    selectedItemEvent: function (sender, type) {
        switch (type) {
            case ccs.ListViewEventType.listViewOnselectedItem:
            {
                var listViewEx = sender;
                cc.log("select child index = " + listViewEx.getCurSelectedIndex());
            }
                break;

            default:
                break;
        }
    }
});


/*
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
 var widgetSize = this._widget.getSize();
 //init text
 this._topDisplayLabel.setText("Move by vertical direction");
 this._topDisplayLabel.setPosition(cc.p(widgetSize.width / 2.0,  widgetSize.height / 2.0 + this._topDisplayLabel.getContentSize().height * 1.5));
 this._bottomDisplayLabel.setText("ListView");
 this._bottomDisplayLabel.setFontSize(30);
 this._bottomDisplayLabel.setPosition(cc.p(widgetSize.width / 2, widgetSize.height / 2 - this._bottomDisplayLabel.getSize().height * 3));

 var background = this._uiLayer.getWidgetByName("background_Panel");
 // Create the list view
 this._count = 0;
 this._array = [];
 for (var i = 0; i < 20; ++i) {
 this._array.push("object_" + i);
 }

 var listView = ccs.UIListView.create();
 listView.setTouchEnabled(true);
 listView.setBackGroundImageScale9Enabled(true);
 listView.setBackGroundImage("res/cocosgui/green_edit.png");
 listView.setSize(cc.size(240, 130));
 var backgroundSize = background.getContentSize();
 listView.setPosition(cc.p((widgetSize.width - backgroundSize.width) / 2 +
 (backgroundSize.width - listView.getSize().width) / 2,
 (widgetSize.height - backgroundSize.height) / 2 +
 (backgroundSize.height - listView.getSize().height) / 2));

 var listWidth = listView.getSize().width;
 var listHeight = listView.getSize().height;

 for (var i = 0; i < 5; ++i) {
 var textButton = ccs.UITextButton.create();
 textButton.setName("TextButton");
 textButton.setTouchEnabled(true);
 textButton.loadTextures("res/cocosgui/backtotoppressed.png", "res/cocosgui/backtotopnormal.png", "");

 var layout = ccs.UILayout.create();
 layout.setName("panel_" + i);
 layout.setSize(cc.size(textButton.getSize().width, textButton.getSize().height));
 textButton.setPosition(cc.p(layout.getSize().width / 2, layout.getSize().height / 2));
 layout.addChild(textButton);

 var panel_size = cc.size(layout.getSize().width,layout.getSize().height);
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
 */
/*

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
 var widgetSize = this._widget.getSize();
 //init text
 this._topDisplayLabel.setText("Move by horizontal direction");
 this._topDisplayLabel.setPosition(cc.p(widgetSize.width / 2.0,  widgetSize.height / 2.0 + this._topDisplayLabel.getContentSize().height * 1.5));
 this._bottomDisplayLabel.setText("ListView");
 this._bottomDisplayLabel.setPosition(cc.p(widgetSize.width / 2, widgetSize.height / 2 - this._bottomDisplayLabel.getSize().height * 3));

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
 listView.setPosition(cc.p((widgetSize.width - backgroundSize.width) / 2 +
 (backgroundSize.width - listView.getSize().width) / 2,
 (widgetSize.height - backgroundSize.height) / 2 +
 (backgroundSize.height - listView.getSize().height) / 2));

 var listWidth = listView.getSize().width;
 var listHeight = listView.getSize().height;

 for (var i = 0; i < 3; ++i) {
 var textButton = ccs.UITextButton.create();
 textButton.setName("TextButton");
 textButton.setTouchEnable(true);
 textButton.loadTextures("res/cocosgui/backtotoppressed.png", "res/cocosgui/backtotopnormal.png", "");

 var layout = ccs.UILayout.create();
 layout.setName("panel_" + i);
 layout.setSize(cc.size(textButton.getSize().width, textButton.getSize().height));
 textButton.setPosition(cc.p(layout.getSize().width / 2, layout.getSize().height / 2));
 layout.addChild(textButton);

 var layoutRect = layout.getSize();
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
 */
