/*******************************************************************************
 * Copyright (c) 2010-2012 cocos2d-x.org Copyright (c) 2008-2010 Ricardo Quesada
 * Copyright (c) 2011 Zynga Inc.
 * 
 * http://www.cocos2d-x.org
 * 
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 ******************************************************************************/
(function() {
    var d = document;
    /**
     * The following c variable is the global cocos2d configuration. You can set
     * all the cocos2d related values, like frame rate or box2d.
     */
    var c = {
        // 0 to turn debug off, 1 for basic debug, and 2 for full debug
        COCOS2D_DEBUG : 2,

        box2d : false,
        chipmunk : false,
        showFPS : true,
        frameRate : 60,
        loadExtension : false,

        // the dom element to run cocos2d on
        tag : 'gameCanvas',

        engineDir : '../../../cocos2d/',
        // SingleEngineFile:'',
        /**
         * In this array you should put your custom application files.
         */
        appFiles : [ "js/game.js", "js/sensors.js", "js/power.js", "js/extentions.js",
                "js/classes/classes.js", "js/classes/Application.js",
                "js/classes/sprites/sprites.js", "js/classes/sprites/Circle.js",
                "js/classes/sprites/Hedgehog.js", "js/classes/sprites/Snail.js",
                "js/classes/sprites/Background.js", "js/classes/layers/layers.js",
                "js/classes/layers/Intro.js", "js/classes/layers/Level.js",
                "js/classes/scenes/scenes.js", "js/classes/scenes/Intro.js",
                "js/classes/scenes/Level.js", "js/classes/maps/maps.js",
                "js/classes/maps/TiledMeadow.js" ]
    };

    if (!d.createElement('canvas').getContext) {
        var s = d.createElement('div');
        s.innerHTML = '<h2>Your browser does not support HTML5 canvas!</h2>'
                + '<p>Google Chrome is a browser that combines a minimal design with sophisticated technology to make the web faster, safer, and easier.Click the logo to download.</p>'
                + '<a href="http://www.google.com/chrome" target="_blank"><img src="http://www.google.com/intl/zh-CN/chrome/assets/common/images/chrome_logo_2x.png" border="0"/></a>';
        var p = d.getElementById(c.tag).parentNode;
        p.style.background = 'none';
        p.style.border = 'none';
        p.insertBefore(s);

        d.body.style.background = '#ffffff';
        return;
    }

    window
            .addEventListener(
                    'DOMContentLoaded',
                    function() {
                        // first load engine file if specified
                        var s = d.createElement('script');
                        /**
                         * *******Delete this section if you have packed all
                         * files into one******
                         */
                        if (c.SingleEngineFile && !c.engineDir) {
                            s.src = c.SingleEngineFile;
                        } else if (c.engineDir && !c.SingleEngineFile) {
                            s.src = c.engineDir + 'platform/jsloader.js';
                        } else {
                            alert('You must specify either the single engine file OR the engine directory in "cocos2d.js"');
                        }
                        /**
                         * *******Delete this section if you have packed all
                         * files into one******
                         */

                        // s.src = 'Packed_Release_File.js'; //IMPORTANT:
                        // Un-comment this line if you have packed all files
                        // into one
                        document.ccConfig = c;
                        s.id = 'cocos2d-html5';
                        d.body.appendChild(s);
                        // else if single file specified, load singlefile
                    });
})();
