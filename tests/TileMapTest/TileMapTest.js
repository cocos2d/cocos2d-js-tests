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
var TAG_TILE_MAP = 1;
var tileTestSceneIdx = -1;
//------------------------------------------------------------------
//
// TileDemo
//
//------------------------------------------------------------------
var TileDemo = BaseTestLayer.extend({
    ctor:function () {
        this._super();

        if ('touches' in sys.capabilities)
            this.setTouchEnabled(true);
        else if ('mouse' in sys.capabilities)
            this.setMouseEnabled(true);
    },
    title:function () {
        return "No title";
    },
    subtitle:function () {
        return "drag the screen";
    },

    onRestartCallback:function (sender) {
        var s = new TileMapTestScene();
        s.addChild(restartTileMapTest());

        director.replaceScene(s);
    },
    onNextCallback:function (sender) {
        var s = new TileMapTestScene();
        s.addChild(nextTileMapTest());
        director.replaceScene(s);
    },
    onBackCallback:function (sender) {
        var s = new TileMapTestScene();
        s.addChild(previousTileMapTest());
        director.replaceScene(s);
    },

    onTouchesMoved:function (touches, event) {
        var touch = touches[0];
        var delta = touch.getDelta();

        var node = this.getChildByTag(TAG_TILE_MAP);
        var diff = cc.pAdd(delta, node.getPosition());
        node.setPosition(diff);
    },
    onMouseDragged:function (event) {
        var delta = event.getDelta();
        var node = this.getChildByTag(TAG_TILE_MAP);
        var diff = cc.pAdd(delta, node.getPosition());
        node.setPosition(diff);
    },
    // automation
    numberOfPendingTests:function () {
        return ( (arrayOfTileMapTest.length - 1) - tileTestSceneIdx );
    },
    getTestNumber:function () {
        return tileTestSceneIdx;
    }


});

var TileMapTest = TileDemo.extend({
    ctor:function () {
        this._super();
        var map = cc.TileMapAtlas.create(s_tilesPng, s_levelMapTga, 16, 16);
        if ("opengl" in sys.capabilities)
            map.getTexture().setAntiAliasTexParameters();

        var s = map.getContentSize();
        this.log("ContentSize: " + s.width + " " + s.height);

        map.releaseMap();

        this.addChild(map, 0, TAG_TILE_MAP);

        map.setAnchorPoint(cc.p(0, 0.5));

        var scale = cc.ScaleBy.create(4, 0.8);
        var scaleBack = scale.reverse();

        var seq = cc.Sequence.create(scale, scaleBack);

        map.runAction(cc.RepeatForever.create(seq));
    },
    title:function () {
        return "TileMapAtlas";
    }
});

var TileMapEditTest = TileDemo.extend({
    ctor:function () {
        this._super();
        var map = cc.TileMapAtlas.create(s_tilesPng, s_levelMapTga, 16, 16);
        // Create an Aliased Atlas
        map.getTexture().setAliasTexParameters();

        var s = map.getContentSize();
        this.log("ContentSize: " + s.width + " " + s.height);

        // If you are not going to use the Map, you can free it now
        // [tilemap releaseMap);
        // And if you are going to use, it you can access the data with:

        this.schedule(this.updateMap, 0.2);//:@selector(updateMap:) interval:0.2f);

        this.addChild(map, 0, TAG_TILE_MAP);

        map.setAnchorPoint(cc.p(0, 0));
        map.setPosition(cc.p(-20, -200));

    },
    title:function () {
        return "Editable TileMapAtlas";
    },
    updateMap:function (dt) {
        // IMPORTANT
        //   The only limitation is that you cannot change an empty, or assign an empty tile to a tile
        //   The value 0 not rendered so don't assign or change a tile with value 0

        var tilemap = this.getChildByTag(TAG_TILE_MAP);

        // NEW since v0.7
        var c = tilemap.getTileAt(cc.g(13, 21));
        c.r++;
        c.r %= 50;
        if (c.r == 0)
            c.r = 1;

        // NEW since v0.7
        tilemap.setTile(c, cc.g(13, 21));
    }
});

//------------------------------------------------------------------
//
// TMXOrthoTest
//
//------------------------------------------------------------------
var TMXOrthoTest = TileDemo.extend({
    ctor:function () {
        this._super();
        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/orthogonal-test1.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        map.runAction(cc.ScaleBy.create(2, 0.5));
    },
    title:function () {
        return "TMX Ortho test";
    },

    // Automation
    testDuration:2.1,
    pixel1:{"0":218, "1":218, "2":208, "3":255},
    pixel2:{"0":193, "1":143, "2":72, "3":255},
    pixel3:{"0":200, "1":15, "2":160, "3":255},
    getExpectedResult:function () {
        var ret = {"pixel1":"yes", "pixel2":"yes", "pixel3":"yes"};
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        var ret1 = this.readPixels(82, 114, 10, 10);
        var ret2 = this.readPixels(475, 100, 10, 10);
        var ret3 = this.readPixels(312, 196, 10, 10);
        var ret = {"pixel1":this.containsPixel(ret1, this.pixel1, false) ? "yes" : "no",
            "pixel2":this.containsPixel(ret2, this.pixel2, false) ? "yes" : "no",
            "pixel3":this.containsPixel(ret3, this.pixel3, true,5) ? "yes" : "no"};
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// TMXOrthoTest2
//
//------------------------------------------------------------------
var TMXOrthoTest2 = TileDemo.extend({
    ctor:function () {
        this._super();
        //
        // Test orthogonal with 3d camera and anti-alias textures
        //
        // it should not flicker. No artifacts should appear
        //
        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/orthogonal-test2.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        /*var x, y, z;
         map.getCamera().getEyeXYZ(x, y, z);
         map.getCamera().setEyeXYZ(x - 200, y, z + 300);*/
    },
    title:function () {
        return "TMX Orthogonal test 2";
    },
    onEnter:function () {
        this._super();
        director.setProjection(cc.DIRECTOR_PROJECTION_3D);
    },
    onExit:function () {
        this._super();
        director.setProjection(cc.DIRECTOR_PROJECTION_2D);
    },

    // Automation
    pixel1:{"0":192, "1":144, "2":16, "3":255},
    pixel2:{"0":255, "1":255, "2":255, "3":255},
    pixel3:{"0":40, "1":0, "2":0, "3":255},
    getExpectedResult:function () {
        var ret = {"pixel1":"yes", "pixel2":"yes", "pixel3":"yes"};
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        var ret1 = this.readPixels(99, 142, 5, 5);
        var ret2 = this.readPixels(238, 270, 5, 5);
        var ret3 = this.readPixels(419, 239, 5, 5);
        var ret = {"pixel1":this.containsPixel(ret1, this.pixel1, false) ? "yes" : "no",
            "pixel2":this.containsPixel(ret2, this.pixel2, false) ? "yes" : "no",
            "pixel3":this.containsPixel(ret3, this.pixel3, false) ? "yes" : "no"};
        return JSON.stringify(ret);
    }
});


//------------------------------------------------------------------
//
// TMXOrthoTest3
//
//------------------------------------------------------------------
var TMXOrthoTest3 = TileDemo.extend({
    ctor:function () {
        this._super();
        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/orthogonal-test3.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        map.setScale(0.2);
        map.setAnchorPoint(cc.p(0.5, 0.5));
    },
    title:function () {
        return "TMX anchorPoint test";
    },

    // Automation
    pixel1:{"0":247, "1":196, "2":131, "3":255},
    pixel2:{"0":0, "1":0, "2":0, "3":255},
    pixel3:{"0":0, "1":0, "2":0, "3":255},
    getExpectedResult:function () {
        var ret = {"pixel1":"yes", "pixel2":"yes", "pixel3":"yes"};
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        var ret1 = this.readPixels(0, 0, 10, 10);
        var ret2 = this.readPixels(107, 58, 10, 10);
        var ret3 = this.readPixels(58, 107, 10, 10);
        var ret = {"pixel1":this.containsPixel(ret1, this.pixel1, false) ? "yes" : "no",
            "pixel2":this.containsPixel(ret2, this.pixel2, false) ? "yes" : "no",
            "pixel3":this.containsPixel(ret3, this.pixel3, false) ? "yes" : "no"};
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// TMXOrthoTest4
//
//------------------------------------------------------------------
var TMXOrthoTest4 = TileDemo.extend({
    ctor:function () {
        this._super();
        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/orthogonal-test4.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        map.setAnchorPoint(cc.p(0, 0));

        var layer = map.getLayer("Layer 0");
        var s = layer.getLayerSize();

        var sprite;
        sprite = layer.getTileAt(cc.p(0, 0));
        sprite.setScale(2);

        sprite = layer.getTileAt(cc.p(s.width - 1, 0));
        sprite.setScale(2);

        sprite = layer.getTileAt(cc.p(0, s.height - 1));
        sprite.setScale(2);

        sprite = layer.getTileAt(cc.p(s.width - 1, s.height - 1));
        sprite.setScale(2);

        this.scheduleOnce(this.onRemoveSprite, 2);

    },
    onRemoveSprite:function (dt) {
        var map = this.getChildByTag(TAG_TILE_MAP);

        var layer = map.getLayer("Layer 0");
        var layerSize = layer.getLayerSize();

        var sprite = layer.getTileAt(cc.p(layerSize.width - 1, 0));
        layer.removeChild(sprite, true);

        this.testLayerSize = layerSize;
    },
    title:function () {
        return "TMX width/height test";
    },

    //
    // Automation
    //
    testDuration:3,
    testLayerSize:null,
    pixel:{"0":0, "1":0, "2":0, "3":255},
    getExpectedResult:function () {
        var ret = {"width":14, "height":8, "pixel":"yes"};
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        var ret1 = this.readPixels(433, 240, 10, 10);
        var ret = {"width":this.testLayerSize.width, "height":this.testLayerSize.height, "pixel":this.containsPixel(ret1, this.pixel, false) ? "yes" : "no"};
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// TMXReadWriteTest
//
//------------------------------------------------------------------
var TMXReadWriteTest = TileDemo.extend({
    gid:0,
    ctor:function () {
        this._super();

        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/orthogonal-test2.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        var s = map.getContentSize();

        var layer = map.getLayer("Layer 0");
        if ("opengl" in sys.capabilities)
            layer.getTexture().setAntiAliasTexParameters();

        map.setScale(1);

        var tile0 = layer.getTileAt(cc.p(1, 63));
        var tile1 = layer.getTileAt(cc.p(2, 63));
        var tile2 = layer.getTileAt(cc.p(3, 62));//cc.p(1,62));
        var tile3 = layer.getTileAt(cc.p(2, 62));

        tile0.setAnchorPoint(cc.p(0.5, 0.5));
        tile1.setAnchorPoint(cc.p(0.5, 0.5));
        tile2.setAnchorPoint(cc.p(0.5, 0.5));
        tile3.setAnchorPoint(cc.p(0.5, 0.5));

        var move = cc.MoveBy.create(0.5, cc.p(0, 160));
        var rotate = cc.RotateBy.create(2, 360);
        var scale = cc.ScaleBy.create(2, 5);
        var opacity = cc.FadeOut.create(2);
        var fadein = cc.FadeIn.create(2);
        var scaleback = cc.ScaleTo.create(1, 1);
        var finish = cc.CallFunc.create(this.onRemoveSprite);   // 'this' is optional. Since it is not used, it is not passed.

        var seq0 = cc.Sequence.create(move, rotate, scale, opacity, fadein, scaleback, finish);

        tile0.runAction(seq0);
        tile1.runAction(seq0.copy());
        tile2.runAction(seq0.copy());
        tile3.runAction(seq0.copy());

        this.gid = layer.getTileGIDAt(cc.p(0, 63));

        this.schedule(this.updateCol, 2.0);
        this.schedule(this.repaintWithGID, 2.0);
        this.schedule(this.removeTiles, 1.0);

        this.gid2 = 0;
    },
    onRemoveSprite:function (sender) {
        var p = sender.getParent();
        if (p) {
            p.removeChild(sender, true);
        }
    },
    updateCol:function (dt) {
        var map = this.getChildByTag(TAG_TILE_MAP);
        var layer = map.getChildByTag(0);

        var s = layer.getLayerSize();

        for (var y = 0; y < s.height; y++) {
            layer.setTileGID(this.gid2, cc.p(3, y));
        }

        this.gid2 = (this.gid2 + 1) % 80;
    },
    repaintWithGID:function (dt) {

        var map = this.getChildByTag(TAG_TILE_MAP);
        var layer = map.getChildByTag(0);

        var s = layer.getLayerSize();
        for (var x = 0; x < s.width; x++) {
            var y = s.height - 1;
            var tmpgid = layer.getTileGIDAt(cc.p(x, y));
            layer.setTileGID(tmpgid + 1, cc.p(x, y));
        }
    },
    removeTiles:function (dt) {
        this.unschedule(this.removeTiles);

        var map = this.getChildByTag(TAG_TILE_MAP);

        var layer = map.getChildByTag(0);
        var s = layer.getLayerSize();

        for (var y = 0; y < s.height; y++) {
            layer.removeTileAt(cc.p(5.0, y));
        }
    },
    title:function () {
        return "TMX Read/Write test";
    },

    //
    // Automation
    //
    testDuration:2.2,
    pixel1:{"0":0, "1":144, "2":0, "3":255},
    pixel2:{"0":192, "1":144, "2":16, "3":255},
    getExpectedResult:function () {
        var ret = {"pixel1":"yes", "pixel2":"yes"};
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        var ret1 = this.readPixels(168, 203, 5, 5);
        var ret2 = this.readPixels(239, 239, 5, 5);
        var ret = {"pixel1":!this.containsPixel(ret1, this.pixel1, false) ? "yes" : "no",
            "pixel2":this.containsPixel(ret2, this.pixel2, false) ? "yes" : "no"};
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// TMXHexTest
//
//------------------------------------------------------------------
var TMXHexTest = TileDemo.extend({
    ctor:function () {
        this._super();
        var color = cc.LayerColor.create(cc.c4b(64, 64, 64, 255));
        this.addChild(color, -1);

        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/hexa-test.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);
    },
    title:function () {
        return "TMX Hex test";
    },

    //
    // Automation
    //
    pixel1:{"0":250, "1":202, "2":73, "3":255},
    pixel2:{"0":150, "1":219, "2":10, "3":255},
    getExpectedResult:function () {
        var ret = {"pixel1":"yes", "pixel2":"yes"};
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        var ret1 = this.readPixels(438, 226, 10, 10);
        var ret2 = this.readPixels(195, 0, 10, 10);
        var ret = {"pixel1":this.containsPixel(ret1, this.pixel1, false) ? "yes" : "no",
            "pixel2":this.containsPixel(ret2, this.pixel2, false) ? "yes" : "no"};
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// TMXIsoTest
//
//------------------------------------------------------------------
var TMXIsoTest = TileDemo.extend({
    ctor:function () {
        this._super();
        var color = cc.LayerColor.create(cc.c4b(64, 64, 64, 255));
        this.addChild(color, -1);

        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/iso-test.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        // move map to the center of the screen
        var ms = map.getMapSize();
        var ts = map.getTileSize();
        map.runAction(cc.MoveTo.create(1.0, cc.p(-ms.width * ts.width / 2, -ms.height * ts.height / 2)));
    },
    title:function () {
        return "TMX Isometric test 0";
    },

    //
    // Automation
    //
    pixel:{"0":0, "1":0, "2":0, "3":255},
    getExpectedResult:function () {
        var ret = {"pixel":"yes"};
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        var ret1 = true;
        for (var i = 0; i < 6; i++) {
            var item = this.readPixels(438, 226, 3, 3);
            if (!this.containsPixel(item, this.pixel, false)) {
                ret1 = false;
            }
        }
        var ret = { "pixel":ret1 == true ? "yes" : "no"};
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// TMXIsoTest1
//
//------------------------------------------------------------------
var TMXIsoTest1 = TileDemo.extend({
    ctor:function () {
        this._super();
        var color = cc.LayerColor.create(cc.c4b(64, 64, 64, 255));
        this.addChild(color, -1);

        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/iso-test1.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        var s = map.getContentSize();

        map.setAnchorPoint(cc.p(0.5, 0.5));
    },
    title:function () {
        return "TMX Isometric test + anchorPoint";
    },

    //
    // Automation
    //
    pixel:{"0":0, "1":0, "2":0, "3":255},
    getExpectedResult:function () {
        var ret = {"pixel":"yes"};
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        var ret1 = true;
        for (var i = 0; i < 6; i++) {
            var item = this.readPixels(438, 226, 3, 3);
            if (!this.containsPixel(item, this.pixel, false)) {
                ret1 = false;
            }
        }
        var ret = { "pixel":ret1 == true ? "yes" : "no"};
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// TMXIsoTest2
//
//------------------------------------------------------------------
var TMXIsoTest2 = TileDemo.extend({
    ctor:function () {
        this._super();
        var color = cc.LayerColor.create(cc.c4b(64, 64, 64, 255));
        this.addChild(color, -1);

        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/iso-test2.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        var s = map.getContentSize();

        // move map to the center of the screen
        var ms = map.getMapSize();
        var ts = map.getTileSize();
        map.runAction(cc.MoveTo.create(1.0, cc.p(-ms.width * ts.width / 2, -ms.height * ts.height / 2)));
    },
    title:function () {
        return "TMX Isometric test 2";
    },

    //
    // Automation
    //
    testDuration:1.2,
    pixel:{"0":0, "1":0, "2":0, "3":255},
    getExpectedResult:function () {
        var ret = {"pixel":"yes"};
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        var ret1 = true;
        for (var i = 1; i < 6; i++) {
            var item = this.readPixels(62 * i, 191, 5, 5);
            if (!this.containsPixel(item, this.pixel, true, 2)) {
                ret1 = false;
            }
        }
        var ret = { "pixel":ret1 == true ? "yes" : "no"};
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// TMXUncompressedTest
//
//------------------------------------------------------------------
var TMXUncompressedTest = TileDemo.extend({
    ctor:function () {
        this._super();
        var color = cc.LayerColor.create(cc.c4b(64, 64, 64, 255));
        this.addChild(color, -1);

        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/iso-test2-uncompressed.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        var s = map.getContentSize();

        // move map to the center of the screen
        var ms = map.getMapSize();
        var ts = map.getTileSize();
        map.runAction(cc.MoveTo.create(1.0, cc.p(-ms.width * ts.width / 2, -ms.height * ts.height / 2)));

        // testing release map
        var childrenArray = map.getChildren();
        var layer = null;
        for (var i = 0, len = childrenArray.length; i < len; i++) {
            layer = childrenArray[i];
            if (!layer)
                break;

            layer.releaseMap();
        }
    },
    title:function () {
        return "TMX Uncompressed test";
    },

    //
    // Automation
    //
    testDuration:1.2,
    pixel:{"0":0, "1":0, "2":0, "3":255},
    getExpectedResult:function () {
        var ret = {"pixel":"yes"};
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        var ret1 = true;
        for (var i = 1; i < 6; i++) {
            var item = this.readPixels(62 * i, 191, 5, 5);
            if (!this.containsPixel(item, this.pixel, true, 2)) {
                ret1 = false;
            }
        }
        var ret = { "pixel":ret1 == true ? "yes" : "no"};
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// TMXTilesetTest
//
//------------------------------------------------------------------
var TMXTilesetTest = TileDemo.extend({
    ctor:function () {
        this._super();
        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/orthogonal-test5.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);
        var s = map.getContentSize();

        if ("opengl" in sys.capabilities) {
            var layer;
            layer = map.getLayer("Layer 0");
            layer.getTexture().setAntiAliasTexParameters();

            layer = map.getLayer("Layer 1");
            layer.getTexture().setAntiAliasTexParameters();

            layer = map.getLayer("Layer 2");
            layer.getTexture().setAntiAliasTexParameters();
        }
    },
    title:function () {
        return "TMX Tileset test";
    },
    // Automation
    testDuration:1,
    pixel1:{"0":255, "1":0, "2":0, "3":255},
    pixel2:{"0":213, "1":202, "2":190, "3":255},
    pixel3:{"0":61, "1":118, "2":71, "3":255},
    getExpectedResult:function () {
        var ret = {"pixel1":"yes", "pixel2":"yes", "pixel3":"yes"};
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        var ret1 = this.readPixels(53, 80, 5, 5);
        var ret2 = this.readPixels(38, 151, 5, 5);
        var ret3 = this.readPixels(345, 202, 5, 5);
        var ret = {"pixel1":this.containsPixel(ret1, this.pixel1, false) ? "yes" : "no",
            "pixel2":this.containsPixel(ret2, this.pixel2, false) ? "yes" : "no",
            "pixel3":this.containsPixel(ret3, this.pixel3, false) ? "yes" : "no"};
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// TMXOrthoObjectsTest
//
//------------------------------------------------------------------
var TMXOrthoObjectsTest = TileDemo.extend({
    ctor:function () {
        this._super();
        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/ortho-objects.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);
        var s = map.getContentSize();

        var group = map.getObjectGroup("Object Group 1");
        var array = group.getObjects();
        var dict;

        for (var i = 0, len = array.length; i < len; i++) {
            dict = array[i];
            if (!dict)
                break;
            for (var k in dict) {
                this.log(k + ' = ' + dict[k]);
            }
        }

        //Automation parameters
        this.testObjects = array;
    },
    onEnter:function () {
        this._super();
        this.setAnchorPoint(cc.p(0, 0));
    },
    draw:function () {
        var map = this.getChildByTag(TAG_TILE_MAP);
        var group = map.getObjectGroup("Object Group 1");
        var objects = group.getObjects();

        for (var i = 0; i < objects.length; i++) {
            var dict = objects[i];
            if (!dict)
                break;

            var x = dict["x"];
            var y = dict["y"];
            var width = dict["width"];
            var height = dict["height"];

            cc.renderContext.lineWidth = 3;
            cc.renderContext.strokeStyle = "#ffffff";

            cc.drawingUtil.drawLine(cc.p(x, y), cc.p((x + width), y));
            cc.drawingUtil.drawLine(cc.p((x + width), y), cc.p((x + width), (y + height)));
            cc.drawingUtil.drawLine(cc.p((x + width), (y + height)), cc.p(x, (y + height)));
            cc.drawingUtil.drawLine(cc.p(x, (y + height)), cc.p(x, y));

            cc.renderContext.lineWidth = 1;
        }

    },
    title:function () {
        return "TMX Ortho object test";
    },
    subtitle:function () {
        return "You should see a white box around the 3 platforms";
    },

    //
    // Automation
    //
    testObjects:null,
    getExpectedResult:function () {
        var ret = [];
        ret.push({"name":"Object", "type":"", "x":0, "y":0, "width":352, "height":32});
        ret.push({"name":"Object", "type":"", "x":224, "y":64, "width":160, "height":32 });
        ret.push({"name":"platform", "type":"platform", "x":2, "y":131, "width":125, "height":60});
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        var ret = [];
        var obj = null;
        for (var i = 0; i < this.testObjects.length; i++) {
            obj = this.testObjects[i];
            ret.push({"name":obj["name"] || "", "type":obj["type"] || "", "x":parseFloat(obj["x"]), "y":parseFloat(obj["y"]), "width":parseFloat(obj["width"]), "height":parseFloat(obj["height"])});
        }
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// TMXIsoObjectsTest
//
//------------------------------------------------------------------
var TMXIsoObjectsTest = TileDemo.extend({
    ctor:function () {
        this._super();

        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/iso-test-objectgroup.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        var s = map.getContentSize();

        var group = map.getObjectGroup("Object Group 1");
        var array = group.getObjects();
        var dict;
        for (var i = 0, len = array.length; i < len; i++) {
            dict = array[i];
            if (!dict)
                break;
            for (var k in dict) {
                this.log(k + ' = ' + dict[k]);
            }
        }

        //Automation parameters
        this.testObjects = array;
    },

    onEnter:function () {
        this._super();
        this.setAnchorPoint(cc.p(0, 0));
    },

    title:function () {
        return "TMX Iso object test";
    },
    draw:function (ctx) {
        var map = this.getChildByTag(TAG_TILE_MAP);
        var group = map.getObjectGroup("Object Group 1");
        var objects = group.getObjects();
        var dict;

        for (var i = 0, len = objects.length; i < len; i++) {
            dict = objects[i];
            if (!dict)
                break;

            var x = dict["x"];
            var y = dict["y"];
            var width = dict["width"];
            var height = dict["height"];

            cc.renderContext.lineWidth = 3;
            cc.renderContext.strokeStyle = "#ffffff";

            cc.drawingUtil.drawLine(cc.p(x, y), cc.p(x + width, y));
            cc.drawingUtil.drawLine(cc.p(x + width, y), cc.p(x + width, y + height));
            cc.drawingUtil.drawLine(cc.p(x + width, y + height), cc.p(x, y + height));
            cc.drawingUtil.drawLine(cc.p(x, y + height), cc.p(x, y));

            cc.renderContext.lineWidth = 1;
        }
    },
    subtitle:function () {
        return "You need to parse them manually. See bug #810";
    },

    //
    // Automation
    //
    testObjects:null,
    getExpectedResult:function () {
        var ret = [];
        ret.push({"name":"platform 1", "type":"", "x":0, "y":0, "width":32, "height":30});
        ret.push({"name":"", "type":"", "x":0, "y":285, "width":31, "height":32});
        ret.push({"name":"", "type":"", "x":130, "y":129, "width":29, "height":29});
        ret.push({"name":"", "type":"", "x":290, "y":1, "width":28, "height":29});
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        var ret = [];
        var obj = null;
        for (var i = 0; i < this.testObjects.length; i++) {
            obj = this.testObjects[i];
            ret.push({"name":obj["name"] || "", "type":obj["type"] || "", "x":parseFloat(obj["x"]), "y":parseFloat(obj["y"]), "width":parseFloat(obj["width"]), "height":parseFloat(obj["height"])});
        }
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// TMXResizeTest
//
//------------------------------------------------------------------
var TMXResizeTest = TileDemo.extend({
    ctor:function () {
        this._super();
        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/orthogonal-test5.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        var s = map.getContentSize();

        var layer;
        layer = map.getLayer("Layer 0");

        var ls = layer.getLayerSize();
        for (var y = 0; y < ls.height; y++) {
            for (var x = 0; x < ls.width; x++) {
                layer.setTileGID(1, cc.p(x, y));
            }
        }
    },
    title:function () {
        return "TMX resize test";
    },
    subtitle:function () {
        return "Should not crash. Testing issue #740";
    },
    //
    // Automation
    //
    testDuration:0.25,
    pixel:{"0":169, "1":120, "2":76, "3":255},
    getExpectedResult:function () {
        var ret = {"pixel":"yes"};
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        var ret1 = this.readPixels(156, 156, 5, 5);
        var ret = {"pixel":this.containsPixel(ret1, this.pixel, false) ? "yes" : "no"};
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// TMXIsoZorder
//
//------------------------------------------------------------------
var TMXIsoZorder = TileDemo.extend({
    tamara:null,
    ctor:function () {
        this._super();
        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/iso-test-zorder.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        var s = map.getContentSize();
        map.setPosition(cc.p(-s.width / 2, 0));

        this.tamara = cc.Sprite.create(s_pathSister1);
        map.addChild(this.tamara, map.getChildren().length);
        var mapWidth = map.getMapSize().width * map.getTileSize().width;
        this.tamara.setPosition(mapWidth / 2, 0);
        this.tamara.setAnchorPoint(cc.p(0.5, 0));

        var move = cc.MoveBy.create(5, cc.pMult(cc.p(300, 250), 0.75));
        var back = move.reverse();
        var delay = cc.DelayTime.create(0.5);
        var seq = cc.Sequence.create(move, delay, back);
        this.tamara.runAction(cc.RepeatForever.create(seq));

        this.schedule(this.repositionSprite);
    },
    title:function () {
        return "TMX Iso Zorder";
    },
    subtitle:function () {
        return "Sprite should hide behind the trees";
    },
    onExit:function () {
        this.unschedule(this.repositionSprite);
        this._super();
    },
    repositionSprite:function (dt) {
        var p = this.tamara.getPosition();
        var map = this.getChildByTag(TAG_TILE_MAP);

        // there are only 4 layers. (grass and 3 trees layers)
        // if tamara < 48, z=4
        // if tamara < 96, z=3
        // if tamara < 144, z=2

        var newZ = 4 - (p.y / 48);
        newZ = parseInt(Math.max(newZ, 0), 10);
        map.reorderChild(this.tamara, newZ);
    },
    //
    // Automation
    //
    testDuration:5.2,
    pixel:{"0":255, "1":255, "2":255, "3":255},
    getExpectedResult:function () {
        var ret = {"pixel":"yes"};
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        var ret1 = this.readPixels(223, 247, 5, 5);
        var ret = {"pixel":this.containsPixel(ret1, this.pixel, false) ? "yes" : "no"};
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// TMXOrthoZorder
//
//------------------------------------------------------------------
var TMXOrthoZorder = TileDemo.extend({
    tamara:null,
    ctor:function () {
        this._super();
        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/orthogonal-test-zorder.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        var s = map.getContentSize();

        this.tamara = cc.Sprite.create(s_pathSister1);
        map.addChild(this.tamara, map.getChildren().length, TAG_TILE_MAP);
        this.tamara.setAnchorPoint(cc.p(0.5, 0));

        var move = cc.MoveBy.create(5, cc.pMult(cc.p(400, 450), 0.58));
        var back = move.reverse();
        var seq = cc.Sequence.create(move, back);
        this.tamara.runAction(cc.RepeatForever.create(seq));

        this.schedule(this.repositionSprite);
    },
    title:function () {
        return "TMX Ortho Zorder";
    },
    subtitle:function () {
        return "Sprite should hide behind the trees";
    },
    repositionSprite:function (dt) {
        var p = this.tamara.getPosition();
        var map = this.getChildByTag(TAG_TILE_MAP);

        // there are only 4 layers. (grass and 3 trees layers)
        // if tamara < 81, z=4
        // if tamara < 162, z=3
        // if tamara < 243,z=2

        // -10: customization for this particular sample
        var newZ = 4 - ((p.y - 10) / 81);
        newZ = Math.max(newZ, 0);

        map.reorderChild(this.tamara, newZ);
    },
    //
    // Automation
    //
    testDuration:2,
    pixel1:{"0":117, "1":185, "2":63, "3":255},
    pixel2:{"0":91, "1":55, "2":20, "3":255},
    getExpectedResult:function () {
        var ret = {"pixel1":"yes", "pixel2":"yes"};
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        var ret1 = this.readPixels(86, 131, 5, 5);
        var ret2 = this.readPixels(84, 200, 5, 5);
        var ret = {"pixel1":this.containsPixel(ret1, this.pixel1, false) ? "yes" : "no",
            "pixel2":this.containsPixel(ret2, this.pixel2, true, 5) ? "yes" : "no"};
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// TMXIsoVertexZ
//
//------------------------------------------------------------------
var TMXIsoVertexZ = TileDemo.extend({
    tamara:null,
    tamara1:null,
    ctor:function () {
        this._super();
        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/iso-test-vertexz.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        var s = map.getContentSize();
        map.setPosition(cc.p(-s.width / 2, 0));

        // because I'm lazy, I'm reusing a tile as an sprite, but since this method uses vertexZ, you
        // can use any cc.Sprite and it will work OK.
        var layer = map.getLayer("Trees");
        this.tamara = layer.getTileAt(cc.p(29, 29));

        var move = cc.MoveBy.create(5, cc.pMult(cc.p(300, 250), 0.75));
        var back = move.reverse();
        var delay = cc.DelayTime.create(0.5);
        var seq = cc.Sequence.create(move, delay, back);
        this.tamara.runAction(cc.RepeatForever.create(seq));

        this.schedule(this.repositionSprite);
    },
    title:function () {
        return "TMX Iso VertexZ";
    },
    subtitle:function () {
        return "Sprite should hide behind the trees";
    },
    onEnter:function () {
        this._super();
        // TIP: 2d projection should be used
        director.setProjection(cc.DIRECTOR_PROJECTION_2D);
        // do nothing in draw of LayerGradient at this Testcase.
        this.draw = function () {
        };
    },
    onExit:function () {
        // At exit use any other projection.
        //	director.setProjection:cc.DIRECTOR_PROJECTION_3D);
        this._super();
    },
    repositionSprite:function (dt) {
        // tile height is 64x32
        // map size: 30x30
        var p = this.tamara.getPosition();
        var z = -( (p.y + 32) / 16);
        this.tamara.setVertexZ(z);
    },
    //
    // Automation
    //
    testDuration:5.2,
    pixel:{"0":255, "1":255, "2":255, "3":255},
    getExpectedResult:function () {
        var ret = {"pixel":"yes"};
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        var ret1 = this.readPixels(224, 246, 4, 4);
        var ret = {"pixel":this.containsPixel(ret1, this.pixel, false) ? "yes" : "no"};
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// TMXOrthoVertexZ
//
//------------------------------------------------------------------
var TMXOrthoVertexZ = TileDemo.extend({
    tamara:null,
    ctor:function () {
        this._super();
        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/orthogonal-test-vertexz.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        var s = map.getContentSize();

        // because I'm lazy, I'm reusing a tile as an sprite, but since this method uses vertexZ, you
        // can use any cc.Sprite and it will work OK.
        var layer = map.getLayer("trees");
        this.tamara = layer.getTileAt(cc.p(0, 11));
        this.log("vertexZ: " + this.tamara.getVertexZ());

        var move = cc.MoveBy.create(5, cc.pMult(cc.p(400, 450), 0.55));
        var back = move.reverse();
        var delay = cc.DelayTime.create(0.5);
        var seq = cc.Sequence.create(move, delay, back);
        this.tamara.runAction(cc.RepeatForever.create(seq));

        this.schedule(this.repositionSprite);

        this.log("DEPTH BUFFER MUST EXIST IN ORDER");
    },
    title:function () {
        return "TMX Ortho vertexZ";
    },
    subtitle:function () {
        return "Sprite should hide behind the trees";
    },
    onEnter:function () {
        this._super();

        // TIP: 2d projection should be used
        director.setProjection(cc.DIRECTOR_PROJECTION_2D);
        // do nothing in draw of LayerGradient at this Testcase.
        this.draw = function () {
        };
    },
    onExit:function () {
        // At exit use any other projection.
        //	director.setProjection:cc.DIRECTOR_PROJECTION_3D);
        this._super();
    },
    repositionSprite:function (dt) {
        // tile height is 101x81
        // map size: 12x12
        var p = this.tamara.getPosition();
        this.tamara.setVertexZ(-((p.y + 81) / 81));
    },
    //
    // Automation
    //
    testDuration:5.2,
    pixel:{"0":119, "1":205, "2":73, "3":255},
    getExpectedResult:function () {
        var ret = {"pixel":"yes"};
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        var ret1 = this.readPixels(266, 331, 5, 5);
        var ret = {"pixel":this.containsPixel(ret1, this.pixel, false) ? "yes" : "no"};
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// TMXIsoMoveLayer
//
//------------------------------------------------------------------
var TMXIsoMoveLayer = TileDemo.extend({
    ctor:function () {
        this._super();
        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/iso-test-movelayer.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);
        map.setPosition(cc.p(-700, -50));

        var s = map.getContentSize();
    },
    title:function () {
        return "TMX Iso Move Layer";
    },
    subtitle:function () {
        return "Trees should be horizontally aligned";
    }
});

//------------------------------------------------------------------
//
// TMXOrthoMoveLayer
//
//------------------------------------------------------------------
var TMXOrthoMoveLayer = TileDemo.extend({
    ctor:function () {
        this._super();
        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/orthogonal-test-movelayer.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        var s = map.getContentSize();
    },
    title:function () {
        return "TMX Ortho Move Layer";
    },
    subtitle:function () {
        return "Trees should be horizontally aligned";
    }
});

//------------------------------------------------------------------
//
// TMXTilePropertyTest
//
//------------------------------------------------------------------
var TMXTilePropertyTest = TileDemo.extend({
    ctor:function () {
        this._super();
        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/ortho-tile-property.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        for (var i = 1; i <= 6; i++) {
            var properties = map.propertiesForGID(i);
            this.log("GID:" + i + ", Properties:" + JSON.stringify(properties));
            this.propertiesList.push(properties)
        }
    },
    title:function () {
        return "TMX Tile Property Test";
    },
    subtitle:function () {
        return "In the console you should see tile properties";
    },
    //
    // Automation
    //
    testDuration:0.25,
    propertiesList:[],
    getExpectedResult:function () {
        var ret = [];
        ret.push({"test":"sss", "type":"object"});
        ret.push({"type":"object"});
        ret.push({"type":"object"});
        ret.push({"type":"platform"});
        ret.push({"type":"platform"});
        ret.push({"type":"platform"});
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        return JSON.stringify(this.propertiesList);
    }
});

//------------------------------------------------------------------
//
// TMXOrthoFlipTest
//
//------------------------------------------------------------------
var TMXOrthoFlipTest = TileDemo.extend({
    ctor:function () {
        this._super();
        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/ortho-rotation-test.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);
        var s = map.getContentSize();
        this.log("ContentSize:" + s.width + "," + s.height);

        var action = cc.ScaleBy.create(2, 0.5);
        map.runAction(action);
    },
    title:function () {
        return "TMX tile flip test";
    },
    //
    // Automation
    //
    testDuration:2.2,
    pixel:{"0":41, "1":42, "2":54, "3":255},
    getExpectedResult:function () {
        var ret = {"pixel1":"yes", "pixel2":"yes"};
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        var ret1 = this.readPixels(93, 153, 5, 5);
        var ret2 = this.readPixels(105, 153, 5, 5);
        var ret = {"pixel1":this.containsPixel(ret1, this.pixel, false) ? "yes" : "no",
            "pixel2":this.containsPixel(ret2, this.pixel, false) ? "yes" : "no"};
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// TMXOrthoFlipRunTimeTest
//
//------------------------------------------------------------------
var TMXOrthoFlipRunTimeTest = TileDemo.extend({
    ctor:function () {
        this._super();
        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/ortho-rotation-test.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        var s = map.getContentSize();
        this.log("ContentSize:" + s.width + "," + s.height);

        var action = cc.ScaleBy.create(2, 0.5);
        map.runAction(action);

        this.schedule(this.onFlipIt, 1);
    },
    title:function () {
        return "TMX tile flip run time test";
    },
    subtitle:function () {
        return "in 2 sec bottom left tiles will flip";
    },
    onFlipIt:function () {
        var map = this.getChildByTag(TAG_TILE_MAP);
        var layer = map.getLayer("Layer 0");

        /*// CGPoint tileCoord = ccp(1,10);
         // ccTMXTileFlags flags;
         // uint32_t GID = [layer tileGIDAt:tileCoord withFlags:&flags];
         // // Vertical
         // if( flags & kCCTMXTileVerticalFlag )
         //     flags &= ~kCCTMXTileVerticalFlag;
         // else
         //     flags |= kCCTMXTileVerticalFlag;
         // [layer setTileGID:GID  at:tileCoord withFlags:flags];


         // tileCoord = ccp(1,8);
         // GID = [layer tileGIDAt:tileCoord withFlags:&flags];
         // // Vertical
         // if( flags & kCCTMXTileVerticalFlag )
         //     flags &= ~kCCTMXTileVerticalFlag;
         // else
         //     flags |= kCCTMXTileVerticalFlag;
         // [layer setTileGID:GID at:tileCoord withFlags:flags];


         // tileCoord = ccp(2,8);
         // GID = [layer tileGIDAt:tileCoord withFlags:&flags];
         // // Horizontal
         // if( flags & kCCTMXTileHorizontalFlag )
         //     flags &= ~kCCTMXTileHorizontalFlag;
         // else
         //     flags |= kCCTMXTileHorizontalFlag;
         // [layer setTileGID:GID at:tileCoord withFlags:flags];*/

        //blue diamond
        var tileCoord = cc.p(1, 10);
        var flags = layer.getTileFlagsAt(tileCoord);
        var GID = layer.getTileGIDAt(tileCoord);
        // Vertical
        if ((flags & cc.TMX_TILE_VERTICAL_FLAG) >>> 0) {
            flags = (flags & ~cc.TMX_TILE_VERTICAL_FLAG >>> 0) >>> 0;
        } else {
            flags = (flags | cc.TMX_TILE_VERTICAL_FLAG) >>> 0;
        }
        layer.setTileGID(GID, tileCoord, flags);

        tileCoord = cc.p(1, 8);
        flags = layer.getTileFlagsAt(tileCoord);
        GID = layer.getTileGIDAt(tileCoord);
        // Vertical
        if ((flags & cc.TMX_TILE_VERTICAL_FLAG) >>> 0)
            flags = (flags & ~cc.TMX_TILE_VERTICAL_FLAG >>> 0) >>> 0;
        else
            flags = (flags | cc.TMX_TILE_VERTICAL_FLAG) >>> 0;
        layer.setTileGID(GID, tileCoord, flags);

        tileCoord = cc.p(2, 8);
        flags = layer.getTileFlagsAt(tileCoord);
        GID = layer.getTileGIDAt(tileCoord);
        // Horizontal
        if ((flags & cc.TMX_TILE_HORIZONTAL_FLAG) >>> 0)
            flags = (flags & ~cc.TMX_TILE_HORIZONTAL_FLAG >>> 0) >>> 0;
        else
            flags = (flags | cc.TMX_TILE_HORIZONTAL_FLAG) >>> 0;
        layer.setTileGID(GID, tileCoord, flags);
    },
    //
    // Automation
    //
    testDuration:3.2,
    pixel:{"0":41, "1":42, "2":54, "3":255},
    pixel1:null,
    setupAutomation:function () {
        var fun = function () {
            this.pixel1 = this.readPixels(104, 154, 5, 5);
        }
        this.scheduleOnce(fun, 2.2);
    },
    getExpectedResult:function () {
        var ret = {"pixel1":"yes", "pixel2":"yes"};
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        this.pixel2 = this.readPixels(145, 154, 5, 5);
        var ret = {"pixel1":this.containsPixel(this.pixel1, this.pixel, false) ? "yes" : "no",
            "pixel2":this.containsPixel(this.pixel2, this.pixel, false) ? "yes" : "no"};
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// TMXOrthoFromXMLTest
//
//------------------------------------------------------------------
var TMXOrthoFromXMLTest = TileDemo.extend({
    ctor:function () {
        this._super();

        var resources = s_resprefix + "TileMaps";
        var filePath = s_resprefix + "TileMaps/orthogonal-test1.tmx";
        var xmlStr = cc.FileUtils.getInstance().getStringFromFile(filePath);
        var map = cc.TMXTiledMap.createWithXML(xmlStr, resources);
        this.addChild(map, 0, TAG_TILE_MAP);

        var s = map.getContentSize();
        cc.log("ContentSize: " + s.width + ", " + s.height);

        if ("opengl" in sys.capabilities) {
            var mapChildren = map.getChildren();
            for (var i = 0; i < mapChildren.length; i++) {
                var child = mapChildren[i];
                if (child)
                    child.getTexture().setAntiAliasTexParameters();
            }
        }

        var action = cc.ScaleBy.create(2, 0.5);
        map.runAction(action);
    },
    title:function () {
        return "TMX created from XML test";
    },
    //
    // Automation
    //
    testDuration:2.2,
    pixel1:{"0":210, "1":210, "2":200, "3":255},
    pixel2:{"0":243, "1":202, "2":86, "3":255},
    getExpectedResult:function () {
        var ret = {"pixel1":"yes", "pixel2":"yes"};
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        var ret1 = this.readPixels(326, 120, 5, 5);
        var ret2 = this.readPixels(124, 246, 5, 5);
        var ret = {"pixel1":this.containsPixel(ret1, this.pixel1, false) ? "yes" : "no",
            "pixel2":this.containsPixel(ret2, this.pixel2, false) ? "yes" : "no"};
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// TMXBug987
//
//------------------------------------------------------------------
var TMXBug987 = TileDemo.extend({
    ctor:function () {
        this._super();
        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/orthogonal-test6.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        var s1 = map.getContentSize();
        this.log("ContentSize:" + s1.width + "," + s1.height);

        var childs = map.getChildren();
        var node = null;
        for (var i = 0, len = childs.length; i < len; i++) {
            node = childs[i];
            if (!node) break;
            if ("opengl" in sys.capabilities)
                node.getTexture().setAntiAliasTexParameters();
        }

        map.setAnchorPoint(cc.p(0, 0));
        var layer = map.getLayer("Tile Layer 1");
        layer.setTileGID(3, cc.p(2, 2));
    },
    title:function () {
        return "TMX Bug 987";
    },
    subtitle:function () {
        return "You should see an square";
    },
    //
    // Automation
    //
    testDuration:0.25,
    pixel1:{"0":162, "1":152, "2":98, "3":255},
    pixel2:{"0":255, "1":208, "2":148, "3":255},
    pixel3:{"0":182, "1":182, "2":146, "3":255},
    getExpectedResult:function () {
        var ret = {"pixel1":"yes", "pixel2":"yes", "pixel3":"yes"};
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        var ret1 = this.readPixels(64, 224, 5, 5);
        var ret2 = this.readPixels(4, 165, 5, 5);
        var ret3 = this.readPixels(144, 140, 5, 5);
        var ret = {"pixel1":this.containsPixel(ret1, this.pixel1, false) ? "yes" : "no",
            "pixel2":this.containsPixel(ret2, this.pixel2, false) ? "yes" : "no",
            "pixel3":this.containsPixel(ret3, this.pixel3, false) ? "yes" : "no"};
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// TMXBug787
//
//------------------------------------------------------------------
var TMXBug787 = TileDemo.extend({
    ctor:function () {
        this._super();
        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/iso-test-bug787.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

        map.setScale(0.25);
    },
    title:function () {
        return "TMX Bug 787";
    },
    subtitle:function () {
        return "You should see a map";
    },
    //
    // Automation
    //
    testDuration:0.25,
    pixel:{"0":255, "1":255, "2":255, "3":255},
    getExpectedResult:function () {
        var ret = {"pixel":"yes"};
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        var ret1 = this.readPixels(364, 243, 5, 5);
        var ret = {"pixel":this.containsPixel(ret1, this.pixel, false) ? "yes" : "no"};
        return JSON.stringify(ret);
    }
});

var TMXGIDObjectsTest = TileDemo.extend({
    ctor:function () {
        this._super();
        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/test-object-layer.tmx");
        this.addChild(map, -1, TAG_TILE_MAP);

        var s = map.getContentSize();
        this.log("ContentSize:" + s.width + "," + s.height);
        this.log("---. Iterating over all the group objets");

        var group = map.getObjectGroup("Object Layer 1");
        var array = group.getObjects();
        var dict;
        for (var i = 0, len = array.length; i < len; i++) {
            dict = array[i];
            if (!dict)
                break;
            for (var k in dict) {
                this.log(k + ' = ' + dict[k]);
            }
        }
        this.testObjects = array;
    },
    title:function () {
        return "TMX GID objects";
    },
    subtitle:function () {
        return "Tiles are created from an object group";
    },
    draw:function () {
        var map = this.getChildByTag(TAG_TILE_MAP);
        var group = map.getObjectGroup("Object Layer 1");

        var array = group.getObjects();
        var dict;
        for (var i = 0, len = array.length; i < len; i++) {
            dict = array[i];
            if (!dict)
                break;
            var x = dict["x"];
            var y = dict["y"];
            var width = dict["width"];
            var height = dict["height"];

            cc.renderContext.lineWidth = 3;
            cc.renderContext.strokeStyle = "#ffffff";

            cc.drawingUtil.drawLine(cc.p(x, y), cc.p(x + width, y));
            cc.drawingUtil.drawLine(cc.p(x + width, y), cc.p(x + width, y + height));
            cc.drawingUtil.drawLine(cc.p(x + width, y + height), cc.p(x, y + height));
            cc.drawingUtil.drawLine(cc.p(x, y + height), cc.p(x, y));

            cc.renderContext.lineWidth = 1;
        }
    },
    //
    // Automation
    //
    testObjects:[],
    getExpectedResult:function () {
        var ret = [];
        ret.push({"name":"sandro", "type":"", "x":97, "y":6, "width":0, "height":0});
        ret.push({"name":"", "type":"", "x":119, "y":19, "width":0, "height":0});
        ret.push({"name":"", "type":"", "x":140, "y":38, "width":0, "height":0});
        ret.push({"name":"", "type":"", "x":160, "y":57, "width":0, "height":0});
        ret.push({"name":"", "type":"", "x":180, "y":71, "width":0, "height":0});
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        var ret = [];
        var obj = null;
        for (var i = 0; i < this.testObjects.length; i++) {
            obj = this.testObjects[i];
            ret.push({"name":obj["name"] || "", "type":obj["type"] || "", "x":parseFloat(obj["x"]), "y":parseFloat(obj["y"]), "width":parseFloat(obj["width"] || 0), "height":parseFloat(obj["height"] || 0)});
        }
        return JSON.stringify(ret);
    }
});


var TMXIsoOffsetTest = TileDemo.extend({
    ctor:function () {
        this._super();
        var map = cc.TMXTiledMap.create(s_resprefix + "TileMaps/tile_iso_offset.tmx");
        this.addChild(map, 0, TAG_TILE_MAP);

    },
    title:function () {
        return "TMX Tile Offset";
    },
    subtitle:function () {
        return "Testing offset of tiles";
    },
    //
    // Automation
    //
    testDuration:0.25,
    pixel:{"0":168, "1":168, "2":168, "3":255},
    getExpectedResult:function () {
        var ret = {"pixel":"yes"};
        return JSON.stringify(ret);
    },
    getCurrentResult:function () {
        var ret1 = this.readPixels(150, 260, 5, 5);
        var ret = {"pixel":this.containsPixel(ret1, this.pixel, false) ? "yes" : "no"};
        return JSON.stringify(ret);
    }
});

var TileMapTestScene = TestScene.extend({
    runThisTest:function () {
        tileTestSceneIdx = -1;
        var layer = nextTileMapTest();
        this.addChild(layer);
        // fix bug #486, #419.
        // "test" is the default value in CCDirector::setGLDefaultValues()
        // but TransitionTest may setDepthTest(false), we should revert it here
        cc.Director.getInstance().setDepthTest(true);

        director.replaceScene(this);
    }
});

//
// Flow control
//
var arrayOfTileMapTest = [
    TMXOrthoTest,
    TMXOrthoTest2,
    TMXOrthoTest3,
    TMXOrthoTest4,
    TMXReadWriteTest,
    TMXHexTest,
    TMXIsoTest,
    TMXIsoTest1,
    TMXIsoTest2,
    TMXUncompressedTest,
    TMXTilesetTest,
    TMXOrthoObjectsTest,
    TMXIsoObjectsTest,
    TMXResizeTest,
    TMXIsoZorder,
    TMXOrthoZorder,
    TMXIsoVertexZ,
    TMXOrthoVertexZ,
    TMXIsoMoveLayer,
    TMXOrthoMoveLayer,
    TMXTilePropertyTest,
    TMXOrthoFlipTest,
    TMXOrthoFlipRunTimeTest,
    TMXOrthoFromXMLTest,
    TMXBug987,
    TMXBug787,
    TMXGIDObjectsTest,
    TMXIsoOffsetTest
];

var nextTileMapTest = function () {
    tileTestSceneIdx++;
    tileTestSceneIdx = tileTestSceneIdx % arrayOfTileMapTest.length;

    return new arrayOfTileMapTest[tileTestSceneIdx]();
};
var previousTileMapTest = function () {
    tileTestSceneIdx--;
    if (tileTestSceneIdx < 0)
        tileTestSceneIdx += arrayOfTileMapTest.length;

    return new arrayOfTileMapTest[tileTestSceneIdx]();
};
var restartTileMapTest = function () {
    return new arrayOfTileMapTest[tileTestSceneIdx]();
};

