/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org

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
var gui_scene_names = [
    "CocosGUIWidgetTest",
    "CocosGUIExampleTest"
];
var CocosGUITestScene = TestScene.extend({
    _ul: null,
    _label: null,
    _itemMenu: null,
    runThisTest: function () {

        cc.Director.getInstance().replaceScene(this);

        this._ul = cc.UILayer.create();
        this._ul.scheduleUpdate();
        this.addChild(this._ul);

        var s = cc.Director.getInstance().getWinSize();

        this._itemMenu = cc.Menu.create();
        this._itemMenu.setPosition(cc.p(0, 0));
        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(24);
        for (var i = 0; i < 1; ++i) {
            var pItem = cc.MenuItemFont.create(gui_scene_names[i], this.menuCallback, this);
            pItem.setPosition(cc.p(s.width / 2, s.height - s.height / 4 - (i + 1) * 40));
            pItem.setTag(i);
            this._itemMenu.addChild(pItem);
        }
        this.addChild(this._itemMenu);
    },
    onMainMenuCallback: function (sender) {
        this._ul.removeFromParent();
        var scene = new ExtensionsTestScene();
        scene.runThisTest();
    },

    /*
    toCocosGUIExampleScene: function (sender) {
     sender.setDirection(cc.SCROLLVIEW_DIR.HORIZONTAL);
     sender.getChildByName("backtotopbutton").disable();
     cc.log("p2 click");
     this._ul.removeFromParent();
     },*/

    load: function (sender, count) {
        this._label.setString(String(count));
    },

    menuCallback: function (sender) {
        var item = sender;

        switch (item.getTag()) {
            case 0:
                var manager = UISceneManager.getInstance();
                var scene = manager.currentUIScene();
                cc.Director.getInstance().replaceScene(scene);
                break;

            case 1:
                /*
                var scene = new cc.CocosGUIExamplesRegisterScene();
                 scene.runThisTest();
                 */
                break;

            default:
                break;
        }
    }
});

var runCocosGUITestScene = function () {
    var pScene = new CocosGUITestScene();
    if (pScene) {
        pScene.runThisTest();
    }
};