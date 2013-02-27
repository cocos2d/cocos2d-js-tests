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

var s_nAnimationCurCase = 0;
////////////////////////////////////////////////////////
//
// AnimationLayer
//
////////////////////////////////////////////////////////
var AnimationMenuLayer = PerformBasicLayer.extend({
    showCurrentTest:function () {
        var scene = null;
        switch (this._curCase) {
            case 0:
                scene = AnimationTest.scene();
                break;
        }
        s_nAnimationCurCase = this._curCase;

        if (scene) {
            cc.Director.getInstance().replaceScene(scene);
        }
    },

    onEnter:function () {
        this._super();

        var s = cc.Director.getInstance().getWinSize();

        // Title
        var label = cc.LabelTTF.create(this.title(), "Arial", 40);
        this.addChild(label, 1);
        label.setPosition(cc.p(s.width / 2, s.height - 32));
        label.setColor(cc.c3b(255, 255, 40));

        // Subtitle
        var strSubTitle = this.subtitle();
        if (strSubTitle.length) {
            var l = cc.LabelTTF.create(strSubTitle, "Thonburi", 16);
            this.addChild(l, 1);
            l.setPosition(cc.p(s.width / 2, s.height - 80));
        }

        this.performTests();
    },
    title:function () {
        return "no title";
    },
    subtitle:function () {
        return "no subtitle";
    },
    performTests:function () {

    }
})

////////////////////////////////////////////////////////
//
// AnimationTest
//
////////////////////////////////////////////////////////
var AnimationTest = AnimationMenuLayer.extend({
    init:function () {
        this._super();

        var size = cc.Director.getInstance().getWinSize();
        var bg = cc.Sprite.create("res/Images/shake.png");
        bg.setPosition(cc.p(size.width /2, size.height /2));
        this.addChild(bg);

        this.createMovieClip();
        index = 0;
        this.scheduleUpdate();
    },
    performTests:function () {
        this.init();
    },
    title:function () {
        return "Animation Performance Test";
    },
    subtitle:function () {
        return "";
    },
    createMovieClip:function () {
        var moveLayer = cc.Sprite.create();
        this.addChild(moveLayer);

        var size = cc.Director.getInstance().getWinSize();
        for(var i=0; i<10; i++) {
            var character = new CharacterView();
            character.init();
            character.setPosition(cc.p(size.width /2 - i*15 - 200, size.height /2 - i*15));
            moveLayer.addChild(character);
        }

        var action = cc.MoveBy.create(0.01, cc.p(2,0));
        moveLayer.runAction(cc.RepeatForever.create(action));
    },
    update:function () {
        if(index >50){
            this.createMovieClip();
            index = 0;
        }
        index++;
    }
});

var CharacterView = cc.Sprite.extend({
    leftData:null,
    leftItem:null,
    rightData:null,
    rightItem:null,
    leftX:null,
    
    init: function() {
        this._super();
        cc.SpriteFrameCache.getInstance().addSpriteFrames("res/animations/crystals.plist");
        var i = 0;
        rightData = new Array(10);
        for(i=0; i<10; i++){
             var right = cc.Sprite.createWithSpriteFrameName("crystals/4.png");
             right.setPosition(cc.p(50,i*10-40));
             right.setRotation(-90);
             right.setScale(1);
             this.addChild(right);
            // var scaleStep = cc.ScaleBy.create(0.5, -0.8);
            // right.runAction(cc.RepeatForever.create(scaleStep));
             rightData[i] = right;
             if(i==0){
                rightItem = right;
            }
        }
        
        for(i=0; i<10; i++){
            var head = cc.Sprite.createWithSpriteFrameName("crystals/1.png");
            head.setPosition(cc.p(i*5,50));
            this.addChild(head);
            head.setScale(1.5);
            head.setRotation(350);
            var rotateToA = cc.RotateBy.create(0.01, 5);
            head.runAction(cc.RepeatForever.create(rotateToA));
        }
        
        leftData = new Array(10);
        for(i=0; i<10; i++){
            var left = cc.Sprite.createWithSpriteFrameName("crystals/2.png");
            left.setPosition(cc.p(10,i*5-20));
            left.setRotation(90);
            this.addChild(left);
            //var moveStep = cc.MoveBy.create(0.01, cc.p(-5,0));
        //  left.runAction(moveStep);
            leftData[i] = left;
            if(i==0){
                leftItem = left;
            }
        }
        
    },
    
    setDistance: function(){
        leftX = leftItem.getPositionX();
    },
});

AnimationTest.scene = function () {
    var scene = cc.Scene.create();
    //cc.SpriteFrameCache.getInstance().addSpriteFrames("res/animations/crystals.plist");
    var layer = new AnimationTest(false, 1, s_nAnimationCurCase);
    scene.addChild(layer);
    return scene;
};
function runAnimationTest() {
    s_nAnimationCurCase = 0;
    var scene = AnimationTest.scene();
    cc.Director.getInstance().replaceScene(scene);
}
