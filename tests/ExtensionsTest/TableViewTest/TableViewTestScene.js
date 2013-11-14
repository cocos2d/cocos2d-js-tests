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

var CustomTableViewCell = cc.TableViewCell.extend({
    draw:function (ctx) {
        this._super(ctx);
    }
});

var CustomDataSource = cc.TableViewDataSource.extend({
    /**
     * cell size for a given index
     * @param {cc.TableView} table table to hold the instances of Class
     * @param {Number} idx the index of a cell to get a size
     * @return {cc.Size} size of a cell at given index
     */
    tableCellSizeForIndex:function(table, idx){
        if (idx == 2) {
            return cc.size(100, 100);
        }
        return cc.size(60, 60);
    },
    /**
     * cell height for a given table.
     *
     * @param {cc.TableView} table table to hold the instances of Class
     * @return {cc.Size} cell size
     */
    cellSizeForTable:function (table) {
        return cc.size(60, 60);
    },

    /**
     * a cell instance at a given index
     * @param {cc.TableView} table table to hold the instances of Class
     * @param idx index to search for a cell
     * @return {cc.TableView} cell found at idx
     */
    tableCellAtIndex:function (table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        var label;
        if (!cell) {
            cell = new CustomTableViewCell();
            var sprite = cc.Sprite.create(s_image_icon);
            sprite.setAnchorPoint(cc.p(0,0));
            sprite.setPosition(cc.p(0, 0));
            cell.addChild(sprite);

            label = cc.LabelTTF.create(strValue, "Helvetica", 20.0);
            label.setPosition(cc.p(0,0));
            label.setAnchorPoint(cc.p(0,0));
            label.setTag(123);
            cell.addChild(label);
        } else {
            label = cell.getChildByTag(123);
            label.setString(strValue);
        }

        return cell;
    },

    /**
     * Returns number of cells in a given table view.
     * @param {cc.TableView} table table to hold the instances of Class
     * @return {Number} number of cells
     */
    numberOfCellsInTableView:function (table) {
        return 25;
    }
});

var TableViewTestLayer = cc.Layer.extend({

    init:function () {
        if (!this._super()) {
            return false;
        }
        var layer = cc.Layer.create();
        var winSize = cc.Director.getInstance().getWinSize();
        var dataSource = new CustomDataSource();
        var tableView = cc.TableView.create(dataSource, cc.size(600, 60), layer);
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
        tableView.setPosition(cc.p(20, winSize.height / 2 - 150));
        tableView.setDelegate(this);
        this.addChild(tableView);
        tableView.reloadData();

        var dataSource1 = new CustomDataSource();
        var layer1 = cc.Layer.create();
        tableView = cc.TableView.create(dataSource1, cc.size(60, 350), layer1);
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        tableView.setPosition(cc.p(winSize.width - 150, winSize.height / 2 - 150));
        tableView.setDelegate(this);
        tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(tableView);
        tableView.reloadData();

        // Back Menu
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
    }
});

TableViewTestLayer.create = function () {
    var retObj = new TableViewTestLayer();
    if (retObj && retObj.init()) {
        return retObj;
    }
    return null;
};

var runTableViewTest = function () {
    var pScene = cc.Scene.create();
    var pLayer = TableViewTestLayer.create();
    pScene.addChild(pLayer);
    cc.Director.getInstance().replaceScene(pScene);
};
