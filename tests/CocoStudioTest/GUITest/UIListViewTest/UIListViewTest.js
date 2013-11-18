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
            var widgetRect = this._widget.getSize();
            //init text
            this._topDisplayLabel.setText("Move by vertical direction");
            this._topDisplayLabel.setPosition(cc.p(widgetRect.width / 2.0,  widgetRect.height / 2.0 + this._topDisplayLabel.getContentSize().height * 1.5));
            this._bottomDisplayLabel.setText("ListView");
            this._bottomDisplayLabel.setFontSize(30);
            this._bottomDisplayLabel.setPosition(cc.p(widgetRect.width / 2, widgetRect.height / 2 - this._bottomDisplayLabel.getSize().height * 3));

            var background = this._uiLayer.getWidgetByName("background_Panel");
            // Create the list view
            var listView = ccs.UIListView.create();
            var model = ccs.UIButton.create();
            model.loadTextures("cocosgui/animationbuttonnormal.png", "cocosgui/animationbuttonpressed.png", "");
            listView.setItemModel(model);
        
            for (var i=0; i<20; i++)
            {
                listView.pushBackDefaultItem();
            }
            listView.setItemsMargin(10);
            listView.setGravity(ccs.UILinearGravity.centerHorizontal);
            listView.setSize(cc.size(100, 100));
            listView.setBackGroundColorType(ccs.LayoutBackGroundColorType.solid);
            listView.setBackGroundColor(cc.GREEN);
            listView.setPosition(cc.p(100, 100));
            this._uiLayer.addWidget(listView);       

            return true;
        }
        return false;
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
            var widgetRect = this._widget.getSize();
            //init text
            this._topDisplayLabel.setText("Move by horizontal direction");
            this._topDisplayLabel.setPosition(cc.p(widgetRect.width / 2.0,  widgetRect.height / 2.0 + this._topDisplayLabel.getContentSize().height * 1.5));
            this._bottomDisplayLabel.setText("ListView");
            this._bottomDisplayLabel.setPosition(cc.p(widgetRect.width / 2, widgetRect.height / 2 - this._bottomDisplayLabel.getSize().height * 3));

            var background = this._uiLayer.getWidgetByName("background_Panel");

            // Create the list view
            var listView = ccs.UIListView.create();
            listView.setDirection(ccs.ScrollViewDir.horizontal);
            var model = ccs.UIButton.create();
            model.loadTextures("cocosgui/animationbuttonnormal.png", "cocosgui/animationbuttonpressed.png", "");
            listView.setItemModel(model);
            
            for (var i=0; i<20; i++)
            {
                listView.pushBackDefaultItem();
            }
            listView.setItemsMargin(10);
            listView.setGravity(ccs.UILinearGravity.centerVertical);
            listView.setSize(cc.size(100, 100));
            listView.setBackGroundColorType(ccs.LayoutBackGroundColorType.solid);
            listView.setBackGroundColor(cc.GREEN);
            listView.setPosition(cc.p(100, 100));
            this._uiLayer.addWidget(listView);
            
            return true;
        }
        return false;
    }
});