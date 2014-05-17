"use strict";
classes.maps.TiledMeadow = cc.TMXTiledMap
        .extend({
            ctor : function() {
                this._super();
                tizen.logger.info("classes.maps.TiledMeadow.ctor()");
                this.initWithTMXFile("images/tiledMeadow.tmx");
                this.initObstacles();
            },

            getTileCoordForPosition : function(position) {
                var x = Math.floor(position.x / this.getTileSize().width);
                var y = Math.floor(((this.getTileSize().height * this
                        .getMapSize().height) - position.y)
                        / this.getTileSize().height);
                return new cc.Point(x, y);
            },

            isCollidable : function(tileCoord) {
                var collidableLayer = this.getLayer("collidable");
                var gid = collidableLayer.getTileGIDAt(tileCoord);
                if (gid) {
                    var tileProperties = this.propertiesForGID(gid);
                    return true;
                }
                return false;
            },

            initObstacles : function() {
                this.obstacles = [];
                var mapWidth = this.getMapSize().width;
                var mapHeight = this.getMapSize().height;
                var tileWidth = this.getTileSize().width;
                var tileHeight = this.getTileSize().height;
                var collidableLayer = this.getLayer("collidable");
                var i, j;
                for (i = 0; i < mapWidth; i++) {
                    for (j = 0; j < mapHeight; j++) {
                        var tileCoord = new cc.Point(i, j);
                        var gid = collidableLayer.getTileGIDAt(tileCoord);
                        if (gid) {
                            var tileXPositon = i * tileWidth;
                            var tileYPosition = (mapHeight * tileHeight)
                                    - ((j + 1) * tileHeight);
                            var react = cc.rect(tileXPositon, tileYPosition,
                                    tileWidth, tileHeight);
                            this.obstacles.push(react);
                        }
                    }
                }
                tizen.logger.info("TiledMeadow: There are "
                        + this.obstacles.length + " tiled obstacles");
            }
        });
