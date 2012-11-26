var runEditBoxTest = function () {

    var pScene = cc.Scene.create();
    var pLayer = EditBoxTestLayer.create();
    pScene.addChild(pLayer);
    cc.Director.getInstance().replaceScene(pScene);
};



var EditBoxTestLayer = cc.Layer.extend({
    init:function () {

        var box1 = cc.ControlEditBox.create(200,30,16);
        box1.setDefaultValue("EditBoxs");
        box1.setPosition(220,50);
        box1.setBgClr("#ff6600");
        box1.setFontColor("black");
        box1.setBorderClr("#ccddff");
        box1.setZIndex(10);
        this.addChild(box1);

        var box2 = cc.ControlEditBox.create(220,25,10);
        box2.setDefaultValue("汉字输入法EditBox Sample");
        box2.setPosition(220,150);
        box2.setPasswordStyle();
        box2.setBgClr("#f066f0");
        box2.setFontColor("green");
        box2.setBorderClr("#eeff00");
        box2.setZIndex(10);
        this.addChild(box2);

        var box3 = cc.ControlEditBox.create(76,40,10);
        box3.setDefaultValue("背景样式");
        box3.setPosition(220,250);
        box3.setBgClr("#e3fff0");
        box3.setFontColor("blue");
        box3.setBorderClr("#e3330f");
        box3.setZIndex(10);
        box3.setImgStyle("res/extensions/orange_edit.png");
        this.addChild(box3);

        var box4 = cc.ControlEditBox.create(240,35,14);
        box4.setDefaultValue("限制输入的字数10个");
        box4.setPosition(220,350);
        box4.setBgClr("#996600");
        box4.setFontColor("white");
        box4.setBorderClr("#ffff99");
        box4.setZIndex(10);
        box4.setMaxLength(10);
        this.addChild(box4);

        var itemBack = cc.MenuItemFont.create("Back", this.toExtensionsMainLayer, this);
        itemBack.setPosition(cc.p(winSize.width - 50, 25));
        var menuBack = cc.Menu.create(itemBack);
        menuBack.setPosition(cc.p(0,0));
        this.addChild(menuBack);

        return true;
    },

    toExtensionsMainLayer:function (sender) {
        var scene = new ExtensionsTestScene();
        scene.runThisTest();
    },

    scrollViewDidScroll:function (view) {
    },
    scrollViewDidZoom:function (view) {
    },

    tableCellTouched:function (table, cell) {
        cc.log("cell touched at index: " + cell.getIdx());
    },

    cellSizeForTable:function (table) {
        return cc.SizeMake(60, 60);
    }


});

EditBoxTestLayer.create = function () {
    var retObj = new EditBoxTestLayer();
    if (retObj && retObj.init()) {
        return retObj;
    }
    return null;
};