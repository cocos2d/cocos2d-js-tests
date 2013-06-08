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

// boot code needed for cocos2d-html5
// Not needed by cocos2d + JS bindings

var MW = MW || {};

(function () {
    var d = document;
    var c = {
        COCOS2D_DEBUG: 2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
        showFPS: true,
        loadExtension: true,
        frameRate: 60,
        renderMode: 0,       //Choose of RenderMode: 0(default), 1(Canvas only), 2(WebGL only)
        tag: 'gameCanvas' //the dom element to run cocos2d on
    };

    var moonWarriorsFiles = [
        'src/Resource',
        'src/config/GameConfig',
        'src/config/EnemyType',
        'src/config/Level',
        'src/Effect',
        'src/Bullet',
        'src/Enemy',
        'src/Explosion',
        'src/Ship',
        'src/LevelManager',
        'src/GameController',
        'src/GameControlMenu',
        'src/GameLayer',
        'src/GameOver',
        'src/AboutLayer',
        'src/SettingsLayer',
        'src/SysMenu',
        'src/HitEffect',
        'src/SparkEffect'
    ];

    if (!d.createElement('canvas').getContext) {
        var s = d.createElement('div');
        s.innerHTML = '<h2>Your browser does not support HTML5 canvas!</h2>' +
            '<p>Google Chrome is a browser that combines a minimal design with sophisticated technology to make the web faster, safer, and easier.Click the logo to download.</p>' +
            '<a href="http://www.google.com/chrome" target="_blank"><img src="http://www.google.com/intl/zh-CN/chrome/assets/common/images/chrome_logo_2x.png" border="0"/></a>';
        var p = d.getElementById(c.tag).parentNode;
        p.insertBefore(s);
        return;
    }

    document.ccConfig = c;
    var paths = {'cocos2d': '../../../cocos2d',
        'CocosDenshion': '../../../CocosDenshion',
        'extensions': '../../../extensions'};
    if (c.box2d)
        paths['box2d'] = '../../../box2d';
    if (c.chipmunk)
        paths['chipmunk'] = '../../../chipmunk';

    requirejs.config({
        paths: paths
    });

    var sysInclude = ["cocos2d/CCGlobal"];
    if (c.chipmunk)
        sysInclude.push("chipmunk/chipmunk");
    if (c.box2d)
        sysInclude.push("box2d/box2d");

    require(sysInclude, function () {
        require(['src/Resource'], function () {
            for (var i = 0; i < moonWarriorsFiles.length; i++)
                require([moonWarriorsFiles[i]]);
            require(["main"]);
        });
    });
})();
