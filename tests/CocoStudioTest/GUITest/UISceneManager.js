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

 THE SOFTWARE IS PROVIDED "AS IS();     }, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var s_testArray = [
    {
        title: "UIButtonTest",
        func: function () {
            return new UIButtonTest();
        }
    },
    {
        title: "UIButtonTest_Scale9",
        func: function () {
            return new UIButtonTest_Scale9();
        }
    },
    {
        title: "UIButtonTest_PressedAction",
        func: function () {
            return new UIButtonTest_PressedAction();
        }
    },
    {
        title: "UITextButtonTest",
        func: function () {
            return new UITextButtonTest();
        }
    },
    {
        title: "UITextButtonTest_Scale9",
        func: function () {
            return new UITextButtonTest_Scale9();
        }
    },
    {
        title: "UICheckBoxTest",
        func: function () {
            return new UICheckBoxTest();
        }
    },
    {
        title: "UISliderTest",
        func: function () {
            return new UISliderTest();
        }
    },
    {
        title: "UIButtonTest",
        func: function () {
            return new UISliderTest_Scale9();
        }
    },
    {
        title: "UIImageViewTest",
        func: function () {
            return new UIImageViewTest();
        }
    },
    {
        title: "UIImageViewTest_Scale9",
        func: function () {
            return new UIImageViewTest_Scale9();
        }
    },
    {
        title: "UILoadingBarTest_Left",
        func: function () {
            return new UILoadingBarTest_Left();
        }
    },
    {
        title: "UILoadingBarTest_Right",
        func: function () {
            return new UILoadingBarTest_Right();
        }
    },
    {
        title: "UILoadingBarTest_Left_Scale9",
        func: function () {
            return new UILoadingBarTest_Left_Scale9();
        }
    },
    {
        title: "UILoadingBarTest_Right_Scale9",
        func: function () {
            return new UILoadingBarTest_Right_Scale9();
        }
    },
    {
        title: "UILabelAtlasTest",
        func: function () {
            return new UILabelAtlasTest();
        }
    },
    {
        title: "UILabelTest",
        func: function () {
            return new UILabelTest();
        }
    },
    {
        title: "UITextAreaTest",
        func: function () {
            return new UITextAreaTest();
        }
    },
    {
        title: "UILabelBMFontTest",
        func: function () {
            return new UILabelBMFontTest();
        }
    },
    {
        title: "UITextFieldTest",
        func: function () {
            return new UITextFieldTest();
        }
    },
    {
        title: "UITextFieldTest_MaxLength",
        func: function () {
            return new UITextFieldTest_MaxLength();
        }
    },
    {
        title: "UITextFieldTest_Password",
        func: function () {
            return new UITextFieldTest_Password();
        }
    },
    {
        title: "UIPanelTest",
        func: function () {
            return new UIPanelTest();
        }
    },
    {         title: "UIPanelTest_Color", func: function () {
        return new UIPanelTest_Color();
    }
    },
    {
        title: "UIPanelTest_Gradient", func: function () {
        return new UIPanelTest_Gradient();
    }
    },
    {
        title: "UIPanelTest_BackGroundImage",
        func: function () {
            return new UIPanelTest_BackGroundImage();
        }
    },
    {
        title: "UIPanelTest_BackGroundImage_Scale9",
        func: function () {
            return new UIPanelTest_BackGroundImage_Scale9();
        }
    },
    {
        title: "UIPanelTest_Layout_Linear_Vertical",
        func: function () {
            return new UIPanelTest_Layout_Linear_Vertical();
        }
    },
    {
        title: "UIPanelTest_Layout_Linear_Horizontal",
        func: function () {
            return new UIPanelTest_Layout_Linear_Horizontal();
        }
    },
    {
        title: "UIScrollViewTest_Vertical",
        func: function () {
            return new UIScrollViewTest_Vertical();
        }
    },
    {
        title: "UIScrollViewTest_Horizontal",
        func: function () {
            return new UIScrollViewTest_Horizontal();
        }
    },
    {
        title: "UIPageViewTest",
        func: function () {
            return new UIPageViewTest();
        }
    },
    {
        title: "UIListViewTest_Vertical",
        func: function () {
            return new UIListViewTest_Vertical();
        }
    },
    {
        title: "UIListViewTest_Horizontal",
        func: function () {
            return new UIListViewTest_Horizontal();
        }
    },
    {
        title: "UINodeContainerTest",
        func: function () {
            return new UINodeContainerTest();
        }
    }
];
UISceneManager = cc.Class.extend({
    _currentUISceneId: 0,
    ctor: function () {
        this._currentUISceneId = 0;
    },
    nextUIScene: function () {
        this._currentUISceneId++;
        if (this._currentUISceneId > s_testArray.length - 1) {
            this._currentUISceneId = 0;
        }
        return this.currentUIScene();
    },
    previousUIScene: function () {
        this._currentUISceneId--;
        if (this._currentUISceneId < 0) {
            this._currentUISceneId = s_testArray.length - 1;
        }
        return this.currentUIScene();
    },
    currentUIScene: function () {
        var test = s_testArray[this._currentUISceneId];
        var sence = test.func();
        sence.init();
        sence.setSceneTitle(test.title);
        return sence;
    }
});
UISceneManager._instance = null;
UISceneManager.getInstance = function () {
    if (!this._instance) {
        this._instance = new UISceneManager();
    }
    return this._instance;
};
UISceneManager.purge = function () {
    this._instance = null;
};

var runCocosGUITestScene = function () {
    var manager = UISceneManager.getInstance();
    var scene = manager.currentUIScene();
    cc.Director.getInstance().replaceScene(scene);
};