"use strict";
cc.Layer.prototype.addExitAppButton = function() {
    var size = cc.Director.getInstance().getWinSize();
    var closeItem = cc.MenuItemImage.create("images/CloseNormal.png",
            "images/CloseSelected.png", function() {
                if (confirm("Exit?") && tizen && tizen.application) {
                    tizen.application.getCurrentApplication().exit();
                }
            });
    closeItem.setAnchorPoint(cc.p(0.5, 0.5));
    var menu = cc.Menu.create(closeItem);
    menu.setPosition(cc.PointZero());
    closeItem.setPosition(cc.p(size.width - 20, 20));
    this.addChild(menu, 10);
};