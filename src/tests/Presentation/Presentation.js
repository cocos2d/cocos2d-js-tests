/****************************************************************************

 http://www.cocos2d-html5.org
 http://www.cocos2d-iphone.org
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


var sceneIdx = -1;
var centerPos = cc.p(0,0); // will be updated later
var images_path = 'res/Presentation/';

//------------------------------------------------------------------
//
// PresentationBaseLayer
//
//------------------------------------------------------------------
var PresentationBaseLayer = function() {

	//
	// VERY IMPORTANT
	//
	// Only subclasses of a native classes MUST call __associateObjectWithNative
	// Failure to do so, it will crash.
	//
	var parent = goog.base(this);
	__associateObjWithNative( this, parent );
	this.init( cc.c4(0,0,0,255), cc.c4(98,99,117,255));

	this.title =  "No title";
	this.subtitle = "No Subtitle";
	this.isMainTitle = false;

};
goog.inherits(PresentationBaseLayer, cc.LayerGradient );

//
// Instance 'base' methods
// XXX: Should be defined after "goog.inherits"
//
PresentationBaseLayer.prototype.onEnter = function() {

	var fontSize = 36;
	var tl = this.title.length;
	fontSize = (winSize.width / tl) * 1.60;
	if( fontSize/winSize.width > 0.09 ) {
		fontSize = winSize.width * 0.09;
	}

	this.label = cc.LabelTTF.create(this.title, "Gill Sans", fontSize);
	this.addChild(this.label, 100);

	var isMain = this.isMainTitle;

	if( isMain === true )
		this.label.setPosition( centerPos );
	else
		this.label.setPosition( winSize.width / 2, winSize.height*11/12 );

	var subStr = this.subtitle;
	if (subStr !== "") {
		tl = this.subtitle.length;
		var subfontSize = (winSize.width / tl) * 1.3;
		if( subfontSize > fontSize *0.4 ) {
			subfontSize = fontSize *0.4;
		}

		this.sublabel = cc.LabelTTF.create(subStr, "Thonburi", subfontSize);
		this.addChild(this.sublabel, 90);
		if( isMain )
			this.sublabel.setPosition( cc.p(winSize.width / 2, winSize.height*3/8 ));
		else
			this.sublabel.setPosition( cc.p(winSize.width / 2, winSize.height*4/5 ));
	} else
		this.sublabel = null;

    // Menu
    var item1 = cc.MenuItemImage.create("b1.png", "b2.png", this, this.onBackCallback);
    var item2 = cc.MenuItemImage.create("r1.png", "r2.png", this, this.onRestartCallback);
    var item3 = cc.MenuItemImage.create("f1.png", "f2.png", this, this.onNextCallback);

	[item1, item2, item3 ].forEach( function(item) {
		item.normalImage().setOpacity(45);
		item.selectedImage().setOpacity(45);
		} );

	var menu = cc.Menu.create( item1, item2, item3 );

	menu.setPosition( cc.p(0,0) );
	item1.setPosition( cc.p(winSize.width / 2 - 100, 30));
	item2.setPosition( cc.p(winSize.width / 2, 30));
	item3.setPosition( cc.p(winSize.width / 2 + 100, 30));

	this.addChild(menu, 80);
};

PresentationBaseLayer.prototype.prevTransition = function () {
    return cc.TransitionSlideInL;
};

PresentationBaseLayer.prototype.nextTransition = function () {
    return cc.TransitionSlideInR;
};

PresentationBaseLayer.prototype.createBulletList = function () {
	var str = "";
	for(var i=0; i<arguments.length; i++)
	{
		if(i !== 0)
			str += "\n";
		str += '- ' + arguments[i];
	}

	var fontSize = winSize.height*0.07;
	var bullets = cc.LabelTTF.create( str, "Gill Sans", fontSize );
	bullets.setPosition( centerPos );
	this.addChild( bullets, 80 );
};

PresentationBaseLayer.prototype.createImage = function( file ) {
	var sprite = cc.Sprite.create( file );
	sprite.setPosition( centerPos );
	this.addChild( sprite, 70 );

	return sprite;
};

// callbacks
PresentationBaseLayer.prototype.onRestartCallback = function (sender) {
    var s = new PresentationScene();
    s.addChild(restartPresentationSlide());
    director.replaceScene(s);
};

PresentationBaseLayer.prototype.onNextCallback = function (sender) {
    var s = new PresentationScene();
    s.addChild(nextPresentationSlide());
    director.replaceScene(s);
};

PresentationBaseLayer.prototype.onBackCallback = function (sender) {
    var s = new PresentationScene();
    s.addChild(previousPresentationSlide());
    director.replaceScene(s);
};

//------------------------------------------------------------------
//
// Intro Page
//
//------------------------------------------------------------------
var IntroPage = function() {

	goog.base(this);

	this.title = 'cocos2d';
	this.subtitle = 'Game Development Kit';
	this.isMainTitle = true;
};
goog.inherits( IntroPage, PresentationBaseLayer );

//------------------------------------------------------------------
//
// Goal Page
//
//------------------------------------------------------------------
var GoalPage = function() {

	goog.base(this);

	this.title = 'Goals';
	this.subtitle = '';
	this.isMainTitle = false;

	this.createBulletList(
			'Rapid prototyping',
			'Rapid game development',
			'Multiplatform: Mobile & Web',
			'High quality code',
			'Good performance'
			);
};
goog.inherits( GoalPage, PresentationBaseLayer );

//------------------------------------------------------------------
//
// Solutions ?
//
//------------------------------------------------------------------
var SolutionsPage = function() {

	goog.base(this);

	this.title = 'Options';
	this.subtitle = '';
	this.isMainTitle = true;
};
goog.inherits( SolutionsPage, PresentationBaseLayer );

//------------------------------------------------------------------
//
// HTML5 engines ?
//
//------------------------------------------------------------------
var HTML5EnginesPage = function() {

	goog.base(this);

	this.title = 'Options';
	this.subtitle = 'HTML5 engines';
	this.isMainTitle = false;

	this.createBulletList(
			'cocos2d HTML5',
			'Impact JS',
			'LimeJS',
			'Construct 2',
			'etc...'
			);
};
goog.inherits( HTML5EnginesPage, PresentationBaseLayer );

//------------------------------------------------------------------
//
// Features
//
//------------------------------------------------------------------
var FeaturesHTML5Page = function() {

	goog.base(this);

	this.title = 'HTML5 Features';
	this.subtitle = '';
	this.isMainTitle = false;

	this.createBulletList(
			'Rapid prototyping',
			'Rapid game development',
			'Multiplatform: Mobile & Web',
			'High quality code ???',
			'Good Performance ???'
			);
};
goog.inherits( FeaturesHTML5Page, PresentationBaseLayer );

//------------------------------------------------------------------
//
// ComparisonPage
//
//------------------------------------------------------------------
var ComparisonPage = function() {

	goog.base(this);

	this.title = 'HTML5 performance';
	this.subtitle = 'Performance';
	this.isMainTitle = false;

	this.createImage( images_path + 'comparison.png');

};
goog.inherits( ComparisonPage, PresentationBaseLayer );

//------------------------------------------------------------------
//
// WhatWeWantPage
//
//------------------------------------------------------------------
var WhatWeWantPage = function() {

	goog.base(this);

	this.title = 'Performance';
	this.subtitle = 'What we want is...';
	this.isMainTitle = false;

	this.createBulletList(
			'Hundreds of sprites... at 60 FPS',
			'Physics... at 60 FPS',
			'Particles... at 60 FPS'
			);

};
goog.inherits( WhatWeWantPage, PresentationBaseLayer );

//------------------------------------------------------------------
//
// Chipmunk Page
//
//------------------------------------------------------------------
var ChipmunkPage = function() {

	goog.base(this);

	// batch node
	this.batch = cc.SpriteBatchNode.create( 'grossini.png', 50 );
	this.addChild( this.batch );

	this.addSprite = function( pos ) {
		var sprite =  this.createPhysicsSprite( pos );
		this.batch.addChild( sprite );
	};

	this.title = 'Performance';
	this.subtitle = 'Physics and sprites';

	this.initPhysics();

	this.initMenu();
};
goog.inherits( ChipmunkPage, PresentationBaseLayer );

//
// Instance 'base' methods
// XXX: Should be defined after "goog.inherits"
//

ChipmunkPage.prototype.onTogglePhysicsDebug = function() {
	this.debugNode.setVisible( ! this.debugNode.getVisible() );
};

// Menu

ChipmunkPage.prototype.initMenu = function() {
	// menu
	cc.MenuItemFont.setFontSize( 16 );
	var menuItem = cc.MenuItemFont.create('Toggle Physics Debug', this, this.onTogglePhysicsDebug );
	var menu = cc.Menu.create( menuItem );
	this.addChild( menu, 99 );
	menu.setPosition( cc.p( winSize.width-80, winSize.height-100) );
};

// init physics
ChipmunkPage.prototype.initPhysics = function() {
	this.space =  cp.spaceNew();
	var staticBody = cp.spaceGetStaticBody( this.space );

	// Walls
	var walls = [cp.segmentShapeNew( staticBody, cp.v(0,0), cp.v(winSize.width,0), 0 ),				// bottom
			cp.segmentShapeNew( staticBody, cp.v(0,winSize.height), cp.v(winSize.width,winSize.height), 0),	// top
			cp.segmentShapeNew( staticBody, cp.v(0,0), cp.v(0,winSize.height), 0),				// left
			cp.segmentShapeNew( staticBody, cp.v(winSize.width,0), cp.v(winSize.width,winSize.height), 0)	// right
			];
	for( var i=0; i < walls.length; i++ ) {
		var wall = walls[i];
		cp.shapeSetElasticity(wall, 1);
		cp.shapeSetFriction(wall, 1);
		cp.spaceAddStaticShape( this.space, wall );
	}

	// Gravity
	cp.spaceSetGravity( this.space, cp.v(0, -100) );


	// Physics debug layer
	this.debugNode = cc.PhysicsDebugNode.create( this.space );
	this.debugNode.setVisible( false );
	this.addChild( this.debugNode, 100 );
};

ChipmunkPage.prototype.createPhysicsSprite = function( pos ) {
	var body = cp.bodyNew(1, cp.momentForBox(1, 48, 108) );
	cp.bodySetPos( body, pos );
	cp.spaceAddBody( this.space, body );
	var shape = cp.boxShapeNew( body, 48, 108);
	cp.shapeSetElasticity( shape, 0.5 );
	cp.shapeSetFriction( shape, 0.5 );
	cp.spaceAddShape( this.space, shape );

	var sprite = cc.PhysicsSprite.create( "grossini.png");
	sprite.setBody( body );
	return sprite;
};

ChipmunkPage.prototype.onEnter = function () {

	goog.base(this, 'onEnter');

	for(var i=0; i<20; i++) {
		var x = 40 + Math.random() * (winSize.width-80);
		var y = winSize.height/2 + Math.random() * 80;
		this.addSprite( cp.v(x, y) );
	}

	var t = cc.config.deviceType;
    if( t == 'desktop' )
        this.setMouseEnabled(true);
    else if( t == 'mobile' )
        this.setTouchEnabled(true);
};

ChipmunkPage.prototype.onExitTransitionDidStart = function () {
	director.setDisplayStats( false );
};

ChipmunkPage.prototype.onEnterTransitionDidFinish = function () {
	director.setDisplayStats( true );

	this.scheduleUpdate();
};

ChipmunkPage.prototype.update = function( delta ) {
	cp.spaceStep( this.space, delta );
};

ChipmunkPage.prototype.onMouseDown = function( event ) {
	for( var i=0; i<10; i++)
		this.addSprite( event.getLocation() );
};

ChipmunkPage.prototype.onTouchesEnded = function( touches, event ) {
	var l = touches.length;
	for( var i=0; i < l; i++) {
		this.addSprite( touches[i].getLocation() );
	}
};

//------------------------------------------------------------------
//
// Particles Page
//
//------------------------------------------------------------------
var ParticlesPage = function() {

	goog.base(this);

	this.title = 'Performance';
	this.subtitle = 'Particles';

	var firework = cc.ParticleFireworks.create();
	this.addChild( firework );
	firework.setPosition( centerPos );

	var sun = cc.ParticleSun.create();
	this.addChild( sun );
	sun.setPosition( cc.p( winSize.width/4, winSize.height/2) );

	var meteor = cc.ParticleMeteor.create();
	this.addChild( meteor );
	meteor.setPosition( cc.p( winSize.width*3/4, winSize.height/2) );

	var flower = cc.ParticleSystem.create("res/Particles/Flower.plist");
	this.addChild( flower );
	flower.setPosition( centerPos );

	this.particle = firework;

    var t = cc.config.deviceType;
    if( t == 'desktop' )
        this.setMouseEnabled(true);
    else if( t == 'mobile' )
        this.setTouchEnabled(true);

	this.onMouseDown = function( event ) {
		this.particle.setPosition( event.getLocation() );
	};

	this.onMouseDragged = function( event ) {
		return this.onMouseDown( event );
	};

	this.onTouchesEnded = function( touches, event ) {
		var l = touches.length;
		for( var i=0; i < l; i++) {
			this.particle.setPosition( touches[i].getLocation() );
		}
	};

	this.onTouchesMoved = function( touches, event ) {
		return this.onTouchesEnded( touches, event );
	};

	this.onExitTransitionDidStart = function () {
		director.setDisplayStats( false );
	};

	this.onEnterTransitionDidFinish = function () {
		director.setDisplayStats( true );
	};
};
goog.inherits( ParticlesPage, PresentationBaseLayer );


//------------------------------------------------------------------
//
// HowToImprovePage
//
//------------------------------------------------------------------
var HowToImprovePage = function() {

	goog.base(this);

	this.title = 'Improving the performance';
	this.subtitle = 'Redefining "fast" for mobile';
	this.isMainTitle = true;
};
goog.inherits( HowToImprovePage, PresentationBaseLayer );


//------------------------------------------------------------------
//
// HTML5AcceleratorPage
//
//------------------------------------------------------------------
var HTML5AcceleratorPage = function() {

	goog.base(this);

	this.title = 'HTML5 Accelerators';
	this.subtitle = '';
	this.isMainTitle = false;

	this.createImage( images_path + 'html5accelerator.png');
};
goog.inherits( HTML5AcceleratorPage, PresentationBaseLayer );


//------------------------------------------------------------------
//
// GDKAcceleratorPage
//
//------------------------------------------------------------------
var GDKAcceleratorPage = function() {

	goog.base(this);

	this.title = 'cocos2d Acceleration';
	this.subtitle = '';
	this.isMainTitle = false;

		this.createImage( images_path + 'gdkaccelerator.png');
};
goog.inherits( GDKAcceleratorPage, PresentationBaseLayer );

//------------------------------------------------------------------
//
// GDKComponentsPage
//
//------------------------------------------------------------------
var GDKComponentsPage = function() {

	goog.base(this);

	this.title = 'Components';
	this.subtitle = '';
	this.isMainTitle = false;

	this.createBulletList(
			'Game engine: cocos2d',
			'Physics engine: Chipmunk',
			'World Editor: CocosBuilder'
			);
};
goog.inherits( GDKComponentsPage, PresentationBaseLayer );


//------------------------------------------------------------------
//
// CocosStatusPage
//
//------------------------------------------------------------------
var CocosStatusPage = function() {

	goog.base(this);

	this.title = 'Game Engine';
	this.subtitle = '';
	this.isMainTitle = false;

    this.createImage( images_path + 'cocos2d_status.png' );
};
goog.inherits( CocosStatusPage, PresentationBaseLayer );

//------------------------------------------------------------------
//
// ChipmunkStatusPage
//
//------------------------------------------------------------------
var ChipmunkStatusPage = function() {

	goog.base(this);

	this.title = 'Physics Engine';
	this.subtitle = '';
	this.isMainTitle = false;

    this.createImage( images_path + 'chipmunk_status.png' );
};
goog.inherits( ChipmunkStatusPage, PresentationBaseLayer );

//------------------------------------------------------------------
//
// CCBStatusPage
//
//------------------------------------------------------------------
var CCBStatusPage = function() {

	goog.base(this);

	this.title = 'World Editor';
	this.subtitle = '';
	this.isMainTitle = false;

    this.createImage( images_path + 'cocosbuilder_status.png' );
};
goog.inherits( CCBStatusPage, PresentationBaseLayer );

//------------------------------------------------------------------
//
// WhoIsUsingItPage
//
//------------------------------------------------------------------
var WhoIsUsingItPage = function() {

	goog.base(this);

	this.title = "Who is using it";
	this.subtitle = '';
	this.isMainTitle = false;

	// Add companies that are using it
	this.createBulletList(
                'Zynga',
				'...and you ?'
                );
};
goog.inherits( WhoIsUsingItPage, PresentationBaseLayer );


//------------------------------------------------------------------
//
// DemoPage
//
//------------------------------------------------------------------
var DemoPage = function() {

	goog.base(this);

	this.title = 'Demo';
	this.subtitle = '';
	this.isMainTitle = true;
};
goog.inherits( DemoPage, PresentationBaseLayer );

//------------------------------------------------------------------
//
// Thanks
//
//------------------------------------------------------------------
var ThanksPage = function() {

	goog.base(this);

	this.title = 'Thanks';
	this.subtitle = '';
	this.isMainTitle = true;
};
goog.inherits( ThanksPage, PresentationBaseLayer );



//
// Entry point
//

var PresentationScene = function() {
	var parent = goog.base(this);
};
goog.inherits(PresentationScene, TestScene );

PresentationScene.prototype.runThisTest = function () {
    sceneIdx = -1;
    centerPos = cc.p(winSize.width/2, winSize.height/2);
    var layer = nextPresentationSlide();
    this.addChild(layer);
    director.replaceScene(this);
};

//
// Flow control
//
var arrayOfPresentation = [
	IntroPage,
	GoalPage,
	HTML5EnginesPage,
	FeaturesHTML5Page,
	ComparisonPage,
	WhatWeWantPage,
	ChipmunkPage,
	ParticlesPage,
	HowToImprovePage,
	HTML5AcceleratorPage,
	GDKAcceleratorPage,
	GDKComponentsPage,
	CocosStatusPage,
	ChipmunkStatusPage,
	CCBStatusPage,
	DemoPage,
	WhoIsUsingItPage,
	ThanksPage
];

var nextPresentationSlide = function () {
    sceneIdx++;
    sceneIdx = sceneIdx % arrayOfPresentation.length;

    return new arrayOfPresentation[sceneIdx]();
};
var previousPresentationSlide = function () {
    sceneIdx--;
    if (sceneIdx < 0)
        sceneIdx += arrayOfPresentation.length;

    return new arrayOfPresentation[sceneIdx]();
};
var restartPresentationSlide = function () {
    return new arrayOfPresentation[sceneIdx]();
};

