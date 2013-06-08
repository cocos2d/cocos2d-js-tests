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
(function () {
    var d = document;
    var c = {
        COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
        box2d:true,
        chipmunk:true,
        showFPS:true,
        loadExtension:true,
        frameRate:60,
        renderMode:0,       //Choose of RenderMode: 0(default), 1(Canvas only), 2(WebGL only)
        tag:'gameCanvas' //the dom element to run cocos2d on
    };

    var tests = [
        //'src/AppDelegate.js',

        'TouchesTest/Ball',
        'TouchesTest/Paddle',
        'TouchesTest/TouchesTest',
        'SchedulerTest/SchedulerTest',
        'ClickAndMoveTest/ClickAndMoveTest',
        'MenuTest/MenuTest',
        'ActionsTest/ActionsTest',
        'TileMapTest/TileMapTest',
        'TransitionsTest/TransitionsTest',
        'DrawPrimitivesTest/DrawPrimitivesTest',
        'ParticleTest/ParticleTest',
        'ProgressActionsTest/ProgressActionsTest',
        'LayerTest/LayerTest',
        'SceneTest/SceneTest',
        'SpriteTest/SpriteTest',
        'TextureCacheTest/TextureCacheTest',
        'CocosDenshionTest/CocosDenshionTest',
        'CocosNodeTest/CocosNodeTest',
        'RotateWorldTest/RotateWorldTest',
        'RenderTextureTest/RenderTextureTest',
        'IntervalTest/IntervalTest',
        'ActionManagerTest/ActionManagerTest',
        'EaseActionsTest/EaseActionsTest',
        'ParallaxTest/ParallaxTest',
        'PerformanceTest/PerformanceTest',
        'PerformanceTest/PerformanceSpriteTest',
        'PerformanceTest/PerformanceSpriteTest2',
        'PerformanceTest/PerformanceParticleTest',
        'PerformanceTest/PerformanceNodeChildrenTest',
        'PerformanceTest/PerformanceTextureTest',
        'PerformanceTest/PerformanceAnimationTest',
        'PerformanceTest/seedrandom',
        'FontTest/FontTest',
        'PerformanceTest/PerformanceTouchesTest',
        'LabelTest/LabelTest',
        'CurrentLanguageTest/CurrentLanguageTest',
        'TextInputTest/TextInputTest',
        'EventTest/EventTest',
        'UnitTest/UnitTest',
        'SysTest/SysTest',
        'FileUtils/FileUtilsTest',
        'EffectsTest/EffectsTest',
        'EffectsAdvancedTest/EffectsAdvancedTest',
        'MotionStreakTest/MotionStreakTest',
        'ClippingNodeTest/ClippingNodeTest',
        'OpenGLTest/OpenGLTest',

        'ExtensionsTest/ExtensionsTest',
        'ExtensionsTest/ControlExtensionTest/CCControlSceneManager',
        'ExtensionsTest/ControlExtensionTest/CCControlScene',
        'ExtensionsTest/ControlExtensionTest/CCControlButtonTest/CCControlButtonTest',
        'ExtensionsTest/TableViewTest/TableViewTestScene',
        'ExtensionsTest/CocosBuilderTest/CocosBuilderTest',
        'ExtensionsTest/CocosBuilderTest/TestHeader/TestHeaderLayer',
        'ExtensionsTest/CocosBuilderTest/HelloCocosBuilder/HelloCocosBuilderLayer',
        'ExtensionsTest/CocosBuilderTest/ButtonTest/ButtonTestLayer',
        'ExtensionsTest/CocosBuilderTest/SpriteTest/SpriteTestLayer',
        'ExtensionsTest/CocosBuilderTest/MenuTest/MenuTestLayer',
        'ExtensionsTest/CocosBuilderTest/LabelTest/LabelTestLayer',
        'ExtensionsTest/CocosBuilderTest/ParticleSystemTest/ParticleSystemTestLayer',
        'ExtensionsTest/CocosBuilderTest/ScrollViewTest/ScrollViewTestLayer',
        'ExtensionsTest/CocosBuilderTest/AnimationsTest/AnimationsTestLayer',
        'ExtensionsTest/CocosBuilderTest/TimelineCallbackTest/TimelineCallbackTestLayer',
        'ExtensionsTest/EditBoxTest/EditBoxTest',
        'ExtensionsTest/S9SpriteTest/S9SpriteTest',
        'ExtensionsTest/NetworkTest/WebSocketTest',

        'Box2dTest/Box2dTest',
        'ChipmunkTest/ChipmunkTest'
    ];

    if(!d.createElement('canvas').getContext){
        var s = d.createElement('div');
        s.innerHTML = '<h2>Your browser does not support HTML5 canvas!</h2>' +
            '<p>Google Chrome is a browser that combines a minimal design with sophisticated technology to make the web faster, safer, and easier.Click the logo to download.</p>' +
            '<a href="http://www.google.com/chrome" target="_blank"><img src="http://www.google.com/intl/zh-CN/chrome/assets/common/images/chrome_logo_2x.png" border="0"/></a>';
        var p = d.getElementById(c.tag).parentNode;
        p.style.background = 'none';
        p.style.border = 'none';
        p.insertBefore(s);

        d.body.style.background = '#ffffff';
        return;
    }

    document.ccConfig = c;

    requirejs.config({
        paths: {
            'cocos2d': '../../cocos2d',
            'CocosDenshion': '../../CocosDenshion',
            'extensions': '../../extensions',
            'chipmunk': '../../chipmunk',
            'box2d': '../../box2d'
        }
    });

    require(["cocos2d", "cocos2d/CCGlobal"], function(){
        require(['tests_resources-html5'], function(){
            require(['BaseTestLayer/BaseTestLayer'], function(){
                require(['tests-main'], function(){

                    for (var i = 0; i < tests.length; i++)
                        require([tests[i]]);

                    require(["main"]);

                });

            });
        });
    });


})();
