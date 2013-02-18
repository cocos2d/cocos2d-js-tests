/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

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

var CCControlSliderTest = ControlScene.extend({
    slider: null,
    displayValueLabel: null,
    init:function(){
        if (this._super()) {
            var screenSize = cc.Director.getInstance().getWinSize();

        // Add a label in which the slider value will be displayed
        this.displayValueLabel = cc.LabelTTF.create("Move the slider thumb!", "Marker Felt", 32);
        this.displayValueLabel.setAnchorPoint(cc.p(0.5, -1.0));
        this.displayValueLabel.setPosition(cc.p(screenSize.width / 2.0, screenSize.height / 2.0));
        this.addChild(this.displayValueLabel);
        
        // Add the slider
        this.slider = new cc.ControlSlider.create(s_extensions_sliderTrack,s_extensions_sliderProgress,s_extensions_sliderThumb);
        this.slider.setAnchorPoint(cc.p(0.5, 1.0));
        this.slider.setMinimumValue(0.0); // Sets the min value of range
        this.slider.setMaximumValue(5.0); // Sets the max value of range
        this.slider.setPosition(cc.p(screenSize.width / 2.0, screenSize.height / 2.0));
        
        // When the value of the slider will change, the given selector will be call
        this.slider.addTargetWithActionForControlEvents(this, this.valueChanged, cc.CONTROL_EVENT_VALUECHANGED);//addTarget:self action:@selector(valueChanged:) forControlEvents:CCControlEventValueChanged];

        this.slider.setValue(1.0);

        this.addChild(this.slider);
             return true;
        }
        return false;
    },
    valueChanged: function(sender) {
        // Change value of label.
        this.displayValueLabel.setString("Slider value = " + sender.getValue().toFixed(2));
    }
});

CCControlSliderTest.create = function(sceneTitle){
    var scene = cc.Scene.create();
    var controlLayer = new CCControlSliderTest();
    if(controlLayer && controlLayer.init()){
        controlLayer.getSceneTitleLabel().setString(sceneTitle);
        scene.addChild(controlLayer);
    }
    return scene;
};

