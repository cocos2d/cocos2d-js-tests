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
        menuType:'canvas', //whether to use canvas mode menu or dom menu
        COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
        box2d:true,
        chipmunk:true,
        showFPS:true,
        loadExtension:true,
        frameRate:60,
        tag:'gameCanvas', //the dom element to run cocos2d on
        engineDir:'../../cocos2d/',
        //SingleEngineFile:'',
        appFiles:[//'src/AppDelegate.js',
            'tests-main.js',
            'tests_resources-html5.js',

            'TouchesTest/Ball.js',
            'TouchesTest/Paddle.js',
            'TouchesTest/TouchesTest.js',
            'SchedulerTest/SchedulerTest.js',
            'ClickAndMoveTest/ClickAndMoveTest.js',
            'MenuTest/MenuTest.js',
            'ActionsTest/ActionsTest.js',
            'TileMapTest/TileMapTest.js',
            'TransitionsTest/TransitionsTest.js',
            'DrawPrimitivesTest/DrawPrimitivesTest.js',
            'ParticleTest/ParticleTest.js',
            'ProgressActionsTest/ProgressActionsTest.js',
            'LayerTest/LayerTest.js',
            'SceneTest/SceneTest.js',
            'TextureCacheTest/TextureCacheTest.js',
            'SpriteTest/SpriteTest.js',
            'CocosDenshionTest/CocosDenshionTest.js',
            'CocosNodeTest/CocosNodeTest.js',
            'RotateWorldTest/RotateWorldTest.js',
            'IntervalTest/IntervalTest.js',
            'ActionManagerTest/ActionManagerTest.js',
            'EaseActionsTest/EaseActionsTest.js',
            'ParallaxTest/ParallaxTest.js',
            'PerformanceTest/PerformanceTest.js',
            'PerformanceTest/PerformanceSpriteTest.js',
            'PerformanceTest/PerformanceParticleTest.js',
            'PerformanceTest/PerformanceNodeChildrenTest.js',
            'PerformanceTest/PerformanceTextureTest.js',
            'FontTest/FontTest.js',
            'PerformanceTest/PerformanceTouchesTest.js',
            'LabelTest/LabelTest.js',
            'CurrentLanguageTest/CurrentLanguageTest.js',
            'TextInputTest/TextInputTest.js',
            'EventTest/EventTest.js',
            'UnitTest/UnitTest.js',

            'ExtensionsTest/ExtensionsTest.js',
            'ExtensionsTest/ControlExtensionTest/CCControlSceneManager.js',
            'ExtensionsTest/ControlExtensionTest/CCControlScene.js',
            'ExtensionsTest/ControlExtensionTest/CCControlButtonTest/CCControlButtonTest.js',
            'ExtensionsTest/TableViewTest/TableViewTestScene.js',
            'ExtensionsTest/CocosBuilderTest/CocosBuilderTest.js',
            'ExtensionsTest/CocosBuilderTest/TestHeader/TestHeaderLayer.js',
            'ExtensionsTest/CocosBuilderTest/HelloCocosBuilder/HelloCocosBuilderLayer.js',
            'ExtensionsTest/CocosBuilderTest/ButtonTest/ButtonTestLayer.js',
            'ExtensionsTest/CocosBuilderTest/SpriteTest/SpriteTestLayer.js',
            'ExtensionsTest/CocosBuilderTest/MenuTest/MenuTestLayer.js',
            'ExtensionsTest/CocosBuilderTest/LabelTest/LabelTestLayer.js',
            'ExtensionsTest/CocosBuilderTest/ParticleSystemTest/ParticleSystemTestLayer.js',
            'ExtensionsTest/CocosBuilderTest/ScrollViewTest/ScrollViewTestLayer.js',
            'ExtensionsTest/CocosBuilderTest/AnimationsTest/AnimationsTestLayer.js',
            'ExtensionsTest/EditBoxTest/EditBoxTest.js',

            'Box2dTest/Box2dTest.js',
            'ChipmunkTest/ChipmunkTest.js']

};
    window.addEventListener('DOMContentLoaded', function () {
        //first load engine file if specified
        var s = d.createElement('script');
        /*********Delete this section if you have packed all files into one*******/
        if (c.SingleEngineFile && !c.engineDir) {
            s.src = c.SingleEngineFile;
        }
        else if (c.engineDir && !c.SingleEngineFile) {
            s.src = c.engineDir + 'platform/jsloader.js';
        }
        else {
            alert('You must specify either the single engine file OR the engine directory in "cocos2d.js"');
        }
        /*********Delete this section if you have packed all files into one*******/

            //s.src = 'Packed_Release_File.js'; //IMPORTANT: Un-comment this line if you have packed all files into one

        d.body.appendChild(s);
        document.ccConfig = c;
        s.id = 'cocos2d-html5';
        //else if single file specified, load singlefile
    });
})();
