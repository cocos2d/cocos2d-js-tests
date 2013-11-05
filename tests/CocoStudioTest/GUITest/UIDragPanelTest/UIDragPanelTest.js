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

var UIDragPanelTest = UIScene.extend({
    init: function () {
        if (this._super()) {
            var widgetSize = this._widget.getRect().size;
            //init text
            this._topDisplayLabel.setText("No Event");
            this._topDisplayLabel.setPosition(cc.p(widgetSize.width / 2.0,  widgetSize.height / 2.0 + this._topDisplayLabel.getContentSize().height * 1.5));
            this._bottomDisplayLabel.setText("DragPanel");
            this._bottomDisplayLabel.setPosition(cc.p(widgetSize.width / 2, widgetSize.height / 2 - this._bottomDisplayLabel.getRect().size.height * 3));

            var widgetSize = this._widget.getRect().size;
            var background = this._uiLayer.getWidgetByName("background_Panel");
            // Create the dragpanel
            var dragPanel = ccs.UIDragPanel.create();
            dragPanel.setTouchEnable(true);
            dragPanel.setBackGroundImageScale9Enabled(true);
            dragPanel.setBackGroundImage("res/cocosgui/scrollviewbg.png");
            dragPanel.setSize(cc.size(210, 122.5));
            var backgroundSize = background.getContentSize();
            dragPanel.setPosition(cc.p((widgetSize.width - backgroundSize.width) / 2 +
                (backgroundSize.width - dragPanel.getRect().size.width) / 2,
                (widgetSize.height - backgroundSize.height) / 2 +
                    (backgroundSize.height - dragPanel.getRect().size.height) / 2));
            dragPanel.addEventListener(this.dragPanelEvent, this);

            var imageView = ccs.UIImageView.create();
            imageView.setTouchEnable(true);
            imageView.loadTexture("res/cocosgui/b11.png");
            dragPanel.addChild(imageView);

            dragPanel.setInnerContainerSize(imageView.getContentSize());
            var innerSize = dragPanel.getInnerContainerSize();
            imageView.setPosition(cc.p(innerSize.width / 2, innerSize.height / 2));

            this._uiLayer.addWidget(dragPanel);

            return true;
        }
        return false;
    },

    dragPanelEvent: function (sender, type) {
        switch (type) {
            case ccs.DragPanelEventType.berthLeftBottom:
                this._topDisplayLabel.setText("Berth To Left Bottom");
                break;

            case ccs.DragPanelEventType.berthLeftTop:
                this._topDisplayLabel.setText("Berth To Left Top");
                break;

            case ccs.DragPanelEventType.berthRightBottom:
                this._topDisplayLabel.setText("Berth To Right Bottom");
                break;

            case ccs.DragPanelEventType.berthRightTop:
                this._topDisplayLabel.setText("Berth To Right Top");
                break;

            case ccs.DragPanelEventType.berthLeft:
                this._topDisplayLabel.setText("Berth To Left");
                break;

            case ccs.DragPanelEventType.berthTop:
                this._topDisplayLabel.setText("Berth To Top");
                break;

            case ccs.DragPanelEventType.berthRight:
                this._topDisplayLabel.setText("Berth To Right");
                break;

            case ccs.DragPanelEventType.berthBottom:
                this._topDisplayLabel.setText("Berth To Bottom");
                break;

            default:
                break;
        }
    }
});

var UIDragPanelTest_Bounce = UIScene.extend({
    init: function () {
        if (this._super()) {
            var widgetSize = this._widget.getRect().size;
            //init text
            this._topDisplayLabel.setText("No Event");
            this._topDisplayLabel.setPosition(cc.p(widgetSize.width / 2.0,  widgetSize.height / 2.0 + this._topDisplayLabel.getContentSize().height * 1.5));
            this._bottomDisplayLabel.setText("DragPanel Bounce");
            this._bottomDisplayLabel.setPosition(cc.p(widgetSize.width / 2, widgetSize.height / 2 - this._bottomDisplayLabel.getRect().size.height * 3));

            var background = this._uiLayer.getWidgetByName("background_Panel");

            // Create the dragpanel
            var dragPanel = ccs.UIDragPanel.create();
            dragPanel.setTouchEnabled(true);
            dragPanel.setBounceEnabled(true);
            dragPanel.setBackGroundImageScale9Enabled(true);
            dragPanel.setBackGroundImage("res/cocosgui/green_edit.png");
            dragPanel.setSize(cc.size(210, 122.5));
            var backgroundSize = background.getContentSize();
            dragPanel.setPosition(cc.p((widgetSize.width - backgroundSize.width) / 2 +
                (backgroundSize.width - dragPanel.getRect().size.width) / 2,
                (widgetSize.height - backgroundSize.height) / 2 +
                    (backgroundSize.height - dragPanel.getRect().size.height) / 2));
            dragPanel.addEventListener(this.dragPanelEvent, this);

            var imageView = ccs.UIImageView.create();
            imageView.setTouchEnable(true);
            imageView.loadTexture("res/cocosgui/b11.png");
            dragPanel.addChild(imageView);

            dragPanel.setInnerContainerSize(imageView.getContentSize());
            var innerSize = dragPanel.getInnerContainerSize();
            imageView.setPosition(cc.p(innerSize.width / 2, innerSize.height / 2));

            this._uiLayer.addWidget(dragPanel);

            return true;
        }
        return false;
    },

    dragPanelEvent: function (sender, type) {
        switch (type) {
            case ccs.DragPanelEventType.bounceLeftBottom:
                this._topDisplayLabel.setText("Bounce To Left Bottom");
                break;

            case ccs.DragPanelEventType.bounceLeftTop:
                this._topDisplayLabel.setText("Bounce To Left Top");
                break;

            case ccs.DragPanelEventType.bounceRightBottom:
                this._topDisplayLabel.setText("Bounce To Right Bottom");
                break;

            case ccs.DragPanelEventType.bounceRightTop:
                this._topDisplayLabel.setText("Bounce To Right Top");
                break;

            case ccs.DragPanelEventType.bounceLeft:
                this._topDisplayLabel.setText("Bounce To Left");
                break;

            case ccs.DragPanelEventType.bounceTop:
                this._topDisplayLabel.setText("Bounce To Top");
                break;

            case ccs.DragPanelEventType.bounceRight:
                this._topDisplayLabel.setText("Bounce To Right");
                break;

            case ccs.DragPanelEventType.bounceBottom:
                this._topDisplayLabel.setText("Bounce To Bottom");
                break;

            default:
                break;
        }
    }
});