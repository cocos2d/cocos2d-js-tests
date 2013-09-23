// JS Bindings constants
require("jsb.js");

// Resources definitions
require("tests_resources-jsb.js");

// Load main file
require("tests-main.js");

// Load tests files

var tests_files = [

    // base class
    'BaseTestLayer/BaseTestLayer.js',

    'ActionManagerTest/ActionManagerTest.js',
    'ActionsTest/ActionsTest.js',
    'ChipmunkTest/ChipmunkTest.js',
    'ClickAndMoveTest/ClickAndMoveTest.js',
    'ClippingNodeTest/ClippingNodeTest.js',
    'CocosDenshionTest/CocosDenshionTest.js',
    'CocosNodeTest/CocosNodeTest.js',
    'DrawPrimitivesTest/DrawPrimitivesTest.js',
    'EaseActionsTest/EaseActionsTest.js',
    'EffectsTest/EffectsTest.js',
    'EffectsAdvancedTest/EffectsAdvancedTest.js',
    'MotionStreakTest/MotionStreakTest.js',
    'EventTest/EventTest.js',
    'FileUtils/FileUtilsTest.js',
    'FontTest/FontTest.js',
    'IntervalTest/IntervalTest.js',
    'LabelTest/LabelTest.js',
    'LayerTest/LayerTest.js',
    'MenuTest/MenuTest.js',
    'OpenGLTest/OpenGLTest.js',
    'ParallaxTest/ParallaxTest.js',
    'ParticleTest/ParticleTest.js',
    'PerformanceTest/PerformanceTest.js',
    'PerformanceTest/PerformanceNodeChildrenTest.js',
    'PerformanceTest/PerformanceParticleTest.js',
    'PerformanceTest/PerformanceSpriteTest.js',
    'PerformanceTest/PerformanceSpriteTest2.js',
    'PerformanceTest/PerformanceTextureTest.js',
    'PerformanceTest/PerformanceTouchesTest.js',
    'PerformanceTest/PerformanceAnimationTest.js',
    'PerformanceTest/seedrandom.js',
    'Presentation/Presentation.js',
    'ProgressActionsTest/ProgressActionsTest.js',
    'RenderTextureTest/RenderTextureTest.js',
    'RotateWorldTest/RotateWorldTest.js',
    'SceneTest/SceneTest.js',
    'SchedulerTest/SchedulerTest.js',
    'SpriteTest/SpriteTest.js',
    'ExtensionsTest/EditBoxTest/EditBoxTest.js',
    'ExtensionsTest/S9SpriteTest/S9SpriteTest.js',
    'ExtensionsTest/ExtensionsTest.js',
    'ExtensionsTest/ControlExtensionTest/CCControlSceneManager.js',
    'ExtensionsTest/ControlExtensionTest/CCControlScene.js',
    'ExtensionsTest/ControlExtensionTest/CCControlButtonTest/CCControlButtonTest.js',
    'ExtensionsTest/ControlExtensionTest/CCControlSwitchTest/CCControlSwitchTest.js',
    'ExtensionsTest/ControlExtensionTest/CCControlSliderTest/CCControlSliderTest.js',
    'ExtensionsTest/ControlExtensionTest/CCControlStepperTest/CCControlStepperTest.js',
    'ExtensionsTest/ControlExtensionTest/CCControlPotentiometerTest/CCControlPotentiometerTest.js',
    'ExtensionsTest/ControlExtensionTest/CCControlColourPickerTest/CCControlColourPickerTest.js',
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
    'ExtensionsTest/CocosBuilderTest/TimelineCallbackTest/TimelineCallbackTestLayer.js',
    'ExtensionsTest/CocoStudioArmatureTest/ArmatureTest.js',
    'ExtensionsTest/TableViewTest/TableViewTestScene.js',
    'ExtensionsTest/NetworkTest/WebSocketTest.js',
    'XHRTest/XHRTest.js',
    'TileMapTest/TileMapTest.js',
    'TransitionsTest/TransitionsTest.js',
    'UnitTest/UnitTest.js',
    'SysTest/SysTest.js'
];

for (var i = 0; i < tests_files.length; i++) {
    var name = "" + tests_files[i];
    require(name);
}

var scene = cc.Scene.create();
var layer = new TestController();
scene.addChild(layer);
director.runWithScene(scene);
