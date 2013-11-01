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
var SceneEditorTestLayer = cc.LayerColor.extend({
    _curNode: null,
    init: function () {
        if (this._super(cc.c4b(0, 0, 0, 255))) {
            this._curNode = cc.CCSSceneReader.getInstance().createNodeWithSceneFile("res/scenetest/FishJoy2.json");
            this.addChild(this._curNode, 0, 1);
            cc.CCSActionManager.getInstance().playActionByName("startMenu_1.json", "Animation1");

            var winSize = cc.Director.getInstance().getWinSize();
            var scale = winSize.height / 320;
            this._curNode.setScale(scale);
            this._curNode.setPosition(cc.p((winSize.width - 480 * scale) / 2, (winSize.height - 320 * scale) / 2));

            var itemBack = cc.MenuItemFont.create("Back", this.toExtensionsMainLayer, this);
            itemBack.setPosition(cc.p(VisibleRect.bottomRight().x - 50, VisibleRect.bottomRight().y + 25));
            var menuBack = cc.Menu.create(itemBack, null);
            menuBack.setPosition(cc.PointZero());
            menuBack.setZOrder(4);

            this.addChild(menuBack);

            return true;
        }
        return false;
    },

    toExtensionsMainLayer: function (sender) {
        var scene = new ExtensionsTestScene();
        scene.runThisTest();
    },

    getFish: function (tag, pszName) {
        if (this._curNode == null) {
            return null;
        }
        var fishRender = (this._curNode.getChildByTag(tag).getComponent(pszName));
        return fishRender.getNode();
    }
});
SceneEditorTestLayer.create = function () {
    var layer = new SceneEditorTestLayer();
    layer.init();
    return layer;
};
var runSceneEditorTestLayer = function () {
    var scene = cc.Scene.create();
    var layer = SceneEditorTestLayer.create();
    scene.addChild(layer);
    cc.Director.getInstance().replaceScene(scene);
};
