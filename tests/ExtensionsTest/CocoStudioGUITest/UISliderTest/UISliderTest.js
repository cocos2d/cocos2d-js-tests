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

var UISliderTest = UIScene.extend({
    _displayValueLabel: null,
    init: function () {
        if (UIScene.prototype.init.call(this)) {
            var widgetSize = this._widget.getRect().size;
            this._displayValueLabel = cc.UILabel.create();
            this._displayValueLabel.setText("Move the slider thumb");
            this._displayValueLabel.setFontName("res/cocosgui/Marker Felt.ttf");
            this._displayValueLabel.setFontSize(32);
            this._displayValueLabel.setAnchorPoint(cc.p(0.5, -1));
            this._displayValueLabel.setPosition(cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0));
            this._uiLayer.addWidget(this._displayValueLabel);

            // Add the alert
            var alert = cc.UILabel.create();
            alert.setText("Slider");
            alert.setFontName("res/cocosgui/Marker Felt.ttf");
            alert.setFontSize(30);
            alert.setColor(cc.c3b(159, 168, 176));
            alert.setPosition(cc.p(widgetSize.width / 2, widgetSize.height / 2 - alert.getRect().size.height * 1.75));
            this._uiLayer.addWidget(alert);

            // Create the slider
            var slider = cc.UISlider.create();
            slider.setTouchEnabled(true);
            slider.loadBarTexture("res/cocosgui/sliderTrack.png");
            slider.loadSlidBallTextures("res/cocosgui/sliderThumb.png", "res/cocosgui/sliderThumb.png", "");
            slider.loadProgressBarTexture("res/cocosgui/sliderProgress.png");
            slider.setPosition(cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0));
            slider.addEventListener(this, this.sliderEvent);
            this._uiLayer.addWidget(slider);

            return true;
        }
        return false;
    },

    sliderEvent: function (sender, type) {
        switch (type) {
            case cc.SliderEventType.PERCENTCHANGED:
                var slider = sender;
                var percent = slider.getPercent();
                this._displayValueLabel.setText("Percent " + percent.toFixed(0));
                break;
            default:
                break;
        }
    }
});

var UISliderTest_Scale9 = UIScene.extend({
    _displayValueLabel: null,
    init: function () {
        if (UIScene.prototype.init.call(this)) {
            var widgetSize = this._widget.getRect().size;
            this._displayValueLabel = cc.UILabel.create();
            this._displayValueLabel.setText("Move the slider thumb");
            this._displayValueLabel.setFontName("res/cocosgui/Marker Felt.ttf");
            this._displayValueLabel.setFontSize(32);
            this._displayValueLabel.setAnchorPoint(cc.p(0.5, -1));
            this._displayValueLabel.setPosition(cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0));
            this._uiLayer.addWidget(this._displayValueLabel);

            // Add the alert
            var alert = cc.UILabel.create();
            alert.setText("Slider scale9 render");
            alert.setFontName("res/cocosgui/Marker Felt.ttf");
            alert.setFontSize(30);
            alert.setColor(cc.c3b(159, 168, 176));
            alert.setPosition(cc.p(widgetSize.width / 2, widgetSize.height / 2 - alert.getRect().size.height * 1.75));
            this._uiLayer.addWidget(alert);

            // Create the slider
            var slider = cc.UISlider.create();
            slider.setTouchEnabled(true);
            slider.loadBarTexture("res/cocosgui/sliderTrack2.png");
            slider.loadSlidBallTextures("res/cocosgui/sliderThumb.png", "res/cocosgui/sliderThumb.png", "");
            slider.loadProgressBarTexture("res/cocosgui/slider_bar_active_9patch.png");
            slider.setScale9Enabled(true);
            slider.setCapInsets(cc.rect(0, 0, 0, 0));
            slider.setSize(cc.size(250, 10));
            slider.setPosition(cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0));
            slider.addEventListener(this, this.sliderEvent);
            this._uiLayer.addWidget(slider);

            return true;
        }
        return false;
    },

    sliderEvent: function (sender, type) {
        switch (type) {
            case cc.SliderEventType.PERCENTCHANGED:
                var slider = sender;
                var percent = slider.getPercent();
                this._displayValueLabel.setText("Percent " + percent.toFixed(0));
                break;
            default:
                break;
        }
    }
});