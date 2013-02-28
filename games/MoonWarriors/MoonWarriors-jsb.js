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

// boot code needed for cocos2d + JS bindings.
// Not needed by cocos2d-html5

require("jsb.js");

var MW = MW || {};

var appFiles = [
    'src/Resource.js',
    'src/config/GameConfig.js',
    'src/config/EnemyType.js',
    'src/config/Level.js',
    'src/Effect.js',
    'src/Bullet.js',
    'src/Enemy.js',
    'src/Explosion.js',
    'src/Ship.js',
    'src/LevelManager.js',
    'src/GameController.js',
    'src/GameControlMenu.js',
    'src/GameLayer.js',
    'src/GameOver.js',
    'src/AboutLayer.js',
    'src/SettingsLayer.js',
    'src/SysMenu.js',
	'src/SparkEffect.js',
	'src/HitEffect.js'
];

cc.dumpConfig();

for( var i=0; i < appFiles.length; i++) {
    require( appFiles[i] );
}

var director = cc.Director.getInstance();
director.setDisplayStats(true);

// set FPS. the default value is 1.0/60 if you don't call this
director.setAnimationInterval(1.0 / 60);

// create a scene. it's an autorelease object
var mainScene = SysMenu.scene();

// run
director.runWithScene(mainScene);

cc.Loader = cc.Class.extend({
    initWith:function (resources, selector, target) {
        if (selector) {
            this._selector = selector;
            this._target = target;
        }
        this._selector.call(this._target);
    }
});

cc.Loader.preload = function (resources, selector, target) {
    if (!this._instance) {
        this._instance = new cc.Loader();
    }
    this._instance.initWith(resources, selector, target);
    return this._instance;
};