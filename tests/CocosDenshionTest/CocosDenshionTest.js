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

var audioEngine = cc.AudioEngine.getInstance();

var MUSIC_FILE = "res/Sound/background.mp3";
var EFFECT_FILE = "res/Sound/effect2.mp3";

var MENU_INDEX = {
    MUSIC:0,
    EFFECT:1,
    MUSIC_ONE:2,
    EFFECT_ONE:10
};

var getMenuItemImage = function (normal, select, selector, target) {
    var t_normal = cc.Sprite.createWithSpriteFrameName(normal);
    var t_select = cc.Sprite.createWithSpriteFrameName(select);
    return cc.MenuItemSprite.create(t_normal, t_select, selector, target);
};

CocosDenshionTest = cc.LayerGradient.extend({
    _itemMenu:null,
    _beginPos:cc.p(0, 0),
    _testCount:0,
    _batchNode:null,
    _tapeLeft:null,
    _tapeRight:null,
    _pMenuMusic:null,
    _pMenuEffect:null,
    _scale:null,
    _isSelectMusic:false,
    _musicPart:null,
    _effectPart:null,
    _pBtnPlaying:null,
    _pBtnPause:null,
    _pBtnEffPause:null,
    _pBtnPlayInLoop:null,
    _isPlayInLoop:false,
    _isEffectPause:false,
    _isMusicPause:false,
    _isMusicPlaying:false,
    _inPlayEffect:false,
    _sliderMusicVolume:null,
    _sliderEffectsVolume:null,
    _isSelectedMusic:false,
    ctor:function () {
        this._super();

        this.init(cc.c4b(0, 0, 0, 255), cc.c4b(148, 80, 120, 255));
        //
        var desSize = cc.size(800, 480);
        var sX = winSize.width/desSize.width;
        var sY = winSize.height/desSize.height;
        this._scale = sX?sY:sX<sY;

        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_cocosDenshion_plist, s_cocosDenshion_png);

        this.addBackground();
        this.addMusicPart();
        this.addEffectPart();

        refreshTime = 0;
        this._isMusicPlaying = false;
        this._isSelectedMusic = false;
        this._inPlayEffect = false;
        this._isPlayInLoop = false;
        this._isMusicPause = false;
        this._isEffectPause = false;
        this.selectMusic(true);

        this.schedule(this.updateVolumes);

        if( 'touches' in sys.capabilities )
            this.setTouchEnabled(true);
        else if ('mouse' in sys.capabilities )
            this.setMouseEnabled(true);

        // set default volume
        this._musicVolume = 0.5;
        this._effectsVolume = 0.5;
        audioEngine.setEffectsVolume(this._musicVolume);
        audioEngine.setMusicVolume(this._effectsVolume);
    },
    updateVolumes:function(dt){
        var musicVolume = this._sliderMusicVolume.getValue();
        if (Math.abs(musicVolume - this._musicVolume) > 0.001) {
            this._musicVolume = musicVolume;
            audioEngine.setMusicVolume(this._musicVolume);
        }

        var effectsVolume = this._sliderEffectsVolume.getValue();
        if (Math.abs(effectsVolume - this._effectsVolume) > 0.001) {
            this._effectsVolume = effectsVolume;
            audioEngine.setEffectsVolume(this._effectsVolume);
        }

        //
        var isPlayMusic = audioEngine.isMusicPlaying();
        this.moveTape(isPlayMusic, dt);
    },
    addBackground:function(){
        var sp_bk = cc.Sprite.create(s_cocosDenshion_bg);
        sp_bk.setPosition(winSize.width/2, winSize.height/2);
        this.addChild(sp_bk);

        this._batchNode = cc.SpriteBatchNode.create(s_cocosDenshion_png);
        this._batchNode.setPosition(0, 0);
        this._batchNode.setAnchorPoint(0, 0);
        this.addChild(this._batchNode);

        //four peg
        var f = winSize.width*0.025;
        var fy = winSize.height*0.025;
        var posArr = [cc.p(f, fy), cc.p(winSize.width-f, fy), cc.p(f, winSize.height-fy), cc.p(winSize.width-f, winSize.height-fy)];
        for(var i=0; i<4; i++){
            this.addSpriteWithPos("peg.png", posArr[i].x, posArr[i].y);
        }

        //tape part
        this.addSpriteWithPos("bk_oper.png", winSize.width/2, winSize.height*0.34);

        var t_x = winSize.width/2;
        var t_y = winSize.height*0.83;
        var t_w = winSize.width*0.25*this._scale;
        var t_h = winSize.height*0.05;

        this.addSpriteWithPos("tape_bk.png", t_x, t_y-t_h);
        this._tapeLeft = this.addSpriteWithPos("tape.png", t_x-t_w, t_y);
        this._tapeRight = this.addSpriteWithPos("tape.png", t_x+t_w, t_y);
        this.addSpriteWithPos("tape_cover.png", t_x-t_w, t_y);  //left tape cover.
        this.addSpriteWithPos("tape_cover.png", t_x+t_w, t_y);  //right tape cover.

        //two buttons
        this._pMenuMusic = getMenuItemImage("btn_music_0.png", "btn_music_1.png", this.menuCallback, this);
        this._pMenuEffect = getMenuItemImage("btn_effect_0.png", "btn_effect_1.png", this.menuCallback, this);
        this._pMenuMusic.setTag(MENU_INDEX.MUSIC+10000);
        this._pMenuEffect.setTag(MENU_INDEX.EFFECT+10000);
        this._pMenuMusic.setPosition(winSize.width/2, winSize.height*0.89);
        this._pMenuEffect.setPosition(winSize.width/2, winSize.height*0.73);

        this._itemMenu = cc.Menu.create(this._pMenuMusic, this._pMenuEffect);
        this._itemMenu.setPosition(0, 0);
        this.addChild(this._itemMenu);
    },
    addMusicPart:function(){
        this._musicPart = cc.Layer.create();
        this._musicPart.setPosition(0,0);
        this.addChild(this._musicPart);

        var musicMenu = cc.Menu.create();
        musicMenu.setPosition(0,0);
        this._musicPart.addChild(musicMenu);
        //add back
        var btn_bk = cc.Scale9Sprite.createWithSpriteFrameName("music_btn_bk.png");
        btn_bk.setPosition(winSize.width/2, winSize.height*0.45);
        btn_bk.setContentSize(winSize.width*0.75, winSize.height*0.17);
        this._musicPart.addChild(btn_bk);

        var oneItems = [
            "btn_left", "play", "w_play",
            "btn_mid", "pause", "w_pause",
            "btn_mid", "stop", "w_stop",
            "btn_mid", "rewind", "w_rewind",
            "btn_mid", "resume", "w_resume",
            "btn_right", "playing", "w_playing"
        ];
        var x = winSize.width*0.187;
        var y = winSize.height*0.45;
        var w = winSize.width*0.125;
        for(var i=0; i<oneItems.length/3; i++){
            var item = Button.create(oneItems[i*3], oneItems[i*3+1], oneItems[i*3+2]);
            this._musicPart.addChild(item);
            item.setTag(MENU_INDEX.MUSIC_ONE+i+10000);
            item.setPosition( x + w*i, y);
            item.setScale(this._scale);
            if (i == 0) {
                item.setIsLeft();
            }
            if (i == 1) {
                this._pBtnPause = item;
            }
            if (i == 5) {
                this._pBtnPlaying = item;
                item.setIsRight();
            }
        }

        //add audio icon
        var icon_l = cc.Sprite.createWithSpriteFrameName("music_icon_l.png");
        icon_l.setPosition(winSize.width*0.34, winSize.height*0.18);
        icon_l.setScale(this._scale);
        this._musicPart.addChild(icon_l);
        var icon_r = cc.Sprite.createWithSpriteFrameName("music_icon_r.png");
        icon_r.setPosition(winSize.width*0.66, winSize.height*0.18);
        icon_r.setScale(this._scale);
        this._musicPart.addChild(icon_r);

        this._sliderMusicVolume = Slider.create();
        this._sliderMusicVolume.setPosition(winSize.width/2, winSize.height*0.18);
        this._sliderMusicVolume.setValue(0, 1, 0.5);
        this._sliderMusicVolume.setScale(this._scale);
        this._musicPart.addChild(this._sliderMusicVolume, 1000);
    },
    addEffectPart:function(){
        this._effectPart = cc.Layer.create();
        this._effectPart.setPosition(0,0);
        this.addChild(this._effectPart);

        var effectMenu = cc.Menu.create();
        effectMenu.setPosition(0,0);
        this._effectPart.addChild(effectMenu);
        //add back
        var btn_bk = cc.Scale9Sprite.createWithSpriteFrameName("effect_btn_bk.png");
        btn_bk.setPosition(winSize.width/2, winSize.height*0.46);
        btn_bk.setContentSize(winSize.width*0.80, winSize.height*0.145);
        btn_bk.setScale(this._scale);
        this._effectPart.addChild(btn_bk);
        var oneItems = [
            "btn_eff_left", "play", "w_play",
            "btn_eff_mid", "pause", "w_pause",
            "btn_eff_mid", "stop", "w_stop",
            "btn_eff_mid", "loop", "w_loop",
            "btn_eff_mid", "resume", "w_resume",
            "btn_eff_right", "unload", "w_unload"
        ];
        var x = winSize.width*0.193;
        var y = winSize.height*0.461;
        var w = winSize.width*0.123;
        var len = oneItems.length/3;
        for (var i=0; i<len; i++) {
            var item = Button.create(oneItems[i*3], oneItems[i*3+1], oneItems[i*3+2]);
            this._effectPart.addChild(item);
            item.setTag(MENU_INDEX.EFFECT_ONE+i+10000);
            item.setPosition(x + w*i, y);
            item.setScale(this._scale);

            if (i == 1) {
                this._pBtnEffPause = item;
            }
            if (i == 3) {
                this._pBtnPlayInLoop = item;
            }
        }

        var twoItems = [
            "btn_long", "w_pauseall",
            "btn_long", "w_stopall",
            "btn_long", "w_resumeall"
        ];
        //bottom.
        x = winSize.width*0.245;
        y = winSize.height*0.237;
        w = winSize.width*0.255;
        var b_w = winSize.width*0.24;
        var b_h = winSize.height*0.09;
        for (var i=0; i<twoItems.length/2; i++) {
            //add button background.
            var two_btn_bk = cc.Scale9Sprite.createWithSpriteFrameName("effect_long_bk.png");
            two_btn_bk.setContentSize(b_w, b_h);
            two_btn_bk.setPosition(x + w*i, y);
            //two_btn_bk->setScale(_scale);
            this._effectPart.addChild(two_btn_bk);

            //add button.
            var item = Button.create(twoItems[i*2], "", twoItems[i*2+1]);
            this._effectPart.addChild(item);
            item.setTag(MENU_INDEX.EFFECT_ONE+len+i+10000);
            item.setPosition(x + w*i, y);
            item.setScale(this._scale);
        }

        //add audio icon
        var icon_l = cc.Sprite.createWithSpriteFrameName("music_icon_l.png");
        icon_l.setPosition(winSize.width*0.34, winSize.height*0.12);
        icon_l.setScale(this._scale);
        this._effectPart.addChild(icon_l);
        var icon_r = cc.Sprite.createWithSpriteFrameName("music_icon_r.png");
        icon_r.setPosition(winSize.width*0.66, winSize.height*0.12);
        icon_r.setScale(this._scale);
        this._effectPart.addChild(icon_r);

        this._sliderEffectsVolume = Slider.create();
        this._sliderEffectsVolume.setPosition(winSize.width/2, winSize.height*0.12);
        this._sliderEffectsVolume.setValue(0, 1, 0.5);
        this._sliderEffectsVolume.setScale(this._scale);
        this._effectPart.addChild(this._sliderEffectsVolume, 1000);
    },
    addSpriteWithPos:function(path, x, y){
        var sp = cc.Sprite.createWithSpriteFrameName(path);
        sp.setPosition(x,y);
        sp.setScale(this._scale);
        this._batchNode.addChild(sp);
        return sp;
    },
    menuCallback:function(sender){
        switch (sender.getTag()-10000){
            case MENU_INDEX.MUSIC:
                this.selectMusic(true);
                break;
            case MENU_INDEX.EFFECT:
                this.selectMusic(false);
                break;
            default:
                break;
        }
    },
    selectMusic:function(select){
        if (this.isSelectedMusic == select) {
            return;
        }
        this._musicPart.setVisible(select);
        this._effectPart.setVisible(!select);
        if (select) {
            this._pMenuMusic.selected();
            this._pMenuEffect.unselected();
        }
        else{
            this._pMenuMusic.unselected();
            this._pMenuEffect.selected();
        }
        this.isSelectedMusic = select;
    },
    moveTape:function(move, dt){
        refreshTime ++;
        if (refreshTime % 20 == 0) {
            if (this._pBtnPlaying != null) {
                if (this._isMusicPlaying) {
                    this._pBtnPlaying.setSelect(true);
                }
                else{
                    this._pBtnPlaying.setSelect(false);
                }
            }
            //set music btn pause status.
            if (this._pBtnPause != null) {
                if (this._isMusicPlaying && this._isMusicPause ) {
                    this._pBtnPause.setSelect(true);
                }
                else{
                    this._pBtnPause.setSelect(false);
                }
            }
            //set effect btn loop status.
            if (this._pBtnPlayInLoop != null) {
                if (this._isPlayInLoop ) {
                    this._pBtnPlayInLoop.setSelect(true);
                }
                else{
                    this._pBtnPlayInLoop.setSelect(false);
                }
            }
            //set effect btn pause status.
            if (this._pBtnEffPause != null) {
                if (this._isPlayInLoop && this._isEffectPause) {
                    this._pBtnEffPause.setSelect(true);
                }
                else{
                    this._pBtnEffPause.setSelect(false);
                }
            }
            refreshTime = 0;
        }
        //
        if (move) {
            if (this._isMusicPlaying) {
                return;
            }
            if (this._pBtnPlaying != null && !this._pBtnPlaying.isSelected()){
                this._pBtnPlaying.setSelect(true);
            }

            var action = cc.RotateBy.create(1, 2000*dt);
            var actRepeat = cc.RepeatForever.create(action);
            var action1 = cc.RotateBy.create(1, 2000*dt);
            var actRepeat1 = cc.RepeatForever.create(action1);
            this._tapeLeft.runAction(actRepeat);
            this._tapeRight.runAction(actRepeat1);
            this._isMusicPlaying = true;
        }
        else{
            if (!this._isMusicPlaying) {
                return;
            }
            if (this._pBtnPlaying != null && this._pBtnPlaying.isSelected()){
                this._pBtnPlaying.setSelect(false);
            }

            this._tapeLeft.stopAllActions();
            this._tapeRight.stopAllActions();
            this._isMusicPlaying = false;
        }
    },
    onClick:function(idx){
        var nIdx = idx - 10000;
        switch (nIdx) {
            // play background music
            case MENU_INDEX.MUSIC_ONE:
            {
                playMusic();
                this._isMusicPause = false;
            }
                break;
            // pause background music
            case MENU_INDEX.MUSIC_ONE+1:
            {
                pauseMusic();
                this._isMusicPause = true;
            }
                break;
            // stop background music
            case MENU_INDEX.MUSIC_ONE+2:
            {
                stopMusic();
                this._isMusicPause = false;
            }
                break;
            // rewind background music
            case MENU_INDEX.MUSIC_ONE+3:
                rewindMusic();
                this._isMusicPause = false;
                break;
            // resume background music
            case MENU_INDEX.MUSIC_ONE+4:
            {
                this._isMusicPause = false;
                resumeMusic();
            }
                break;
            // is background music playing
            case MENU_INDEX.MUSIC_ONE+5:{
                isMusicPlaying();
            }
                break;
            // play effect
            case MENU_INDEX.EFFECT_ONE:{
                playEffect();
                this._inPlayEffect = true;
                this._isEffectPause = false;
            }
                break;
            //pause effect
            case MENU_INDEX.EFFECT_ONE+1:
            {
                pauseEffect();
                this._isEffectPause = true;
            }
                break;
            // stop effect
            case MENU_INDEX.EFFECT_ONE+2:
            {
                stopEffect();
                this._isEffectPause = false;
                this._isPlayInLoop = false;
            }
                break;
            // play effect in loop
            case MENU_INDEX.EFFECT_ONE+3:{
                playEffectRepeatly();
                this._inPlayEffect = true;
                this._isPlayInLoop = true;
                this._isEffectPause = false;
            }
                break;
            case MENU_INDEX.EFFECT_ONE+4:
            {
                this._isEffectPause = false;
                resumeEffect();
            }
                break;
            // unload effect
            case MENU_INDEX.EFFECT_ONE+5:
            {
                unloadEffect();
                this._isEffectPause = false;
                this._inPlayEffect = false;
            }
                break;
            case MENU_INDEX.EFFECT_ONE+6:
            {
                this._isEffectPause = true;
                pauseAllEffects();
            }
                break;
            case MENU_INDEX.EFFECT_ONE+7:
            {
                stopAllEffects();
                this._isEffectPause = false;
                this._inPlayEffect = false;
                this._isPlayInLoop = false;
            }
                break;
            case MENU_INDEX.EFFECT_ONE+8:
            {
                this._isEffectPause = false;
                resumeAllEffects();
            }
                break;
        }
    },
    onExit:function () {
        this._super();
        cc.AudioEngine.end();
    }
});

var refreshTime = 0;

var Button = cc.Node.extend({
    _menuItem:null,
    _down:null,
    _up:null,
    _down1:null,
    _up1:null,
    _light0:null,
    _light1:null,
    _bk:null,
    _noneName:true,
    _isLeft:false,
    _isRight:false,
    _selected:false,
    init:function(scale9, name, text){
        this._noneName = false;
        this._selected = false;
        this._isLeft = false;
        this._isRight = false;

        this._menuItem = getMenuItemImage(scale9+"_0.png", scale9+"_1.png", this.onClick, this);
        this._menuItem.setPosition(0,0);
        var menu = cc.Menu.create(this._menuItem);
        this.addChild(menu);
        menu.setPosition(0, 0);
        var _s = this._menuItem.getContentSize();

        var bNode = cc.SpriteBatchNode.create(s_cocosDenshion_png);
        this.addChild(bNode);
        bNode.setPosition(0, 0);

        if(name.length > 0){
            this._noneName = false;
            this._down = cc.Sprite.createWithSpriteFrameName((name+"_0.png"));
            bNode.addChild(this._down);
            this._up = cc.Sprite.createWithSpriteFrameName((name+"_1.png"));
            bNode.addChild(this._up);
            this._up.setVisible(false);
            //
            var p_x = _s.width*0.49;
            this._light0 = cc.Sprite.createWithSpriteFrameName("highLight.png");
            this._light0.setPositionX(-p_x);
            bNode.addChild(this._light0, 10000);
            this._light0.setVisible(false);
            this._light1 = cc.Sprite.createWithSpriteFrameName("highLight.png");
            this._light1.setPositionX(p_x);
            bNode.addChild(this._light1, 10000);
            this._light1.setVisible(false);
            var _s1 = this._light0.getContentSize();
            this._light0.setScale(_s.height/_s1.height);
            this._light1.setScale(_s.height/_s1.height);

            this._bk = cc.Sprite.createWithSpriteFrameName("btn_short_bk.png");
            bNode.addChild(this._bk, -1);
            this._bk.setPosition(0, -_s.height/2);
        }
        else{
            this._noneName = true;
            this._bk = cc.Sprite.createWithSpriteFrameName("btn_long_bk.png");
            bNode.addChild(this._bk, -1);
            this._bk.setPosition(0, -_s.height/2);
        }

        this._down1 = cc.Sprite.createWithSpriteFrameName((text+"_0.png"));
        bNode.addChild(this._down1);
        this._up1 = cc.Sprite.createWithSpriteFrameName((text+"_1.png"));
        bNode.addChild(this._up1);
        this._up1.setVisible(false);
        if (this._noneName) {
            this._down1.setPositionY(-1);
            this._up1.setPositionY(-1);
        }
        else{
            this._down1.setPositionY(-_s.height*0.8);
            this._up1.setPositionY(-_s.height*0.8);
        }

        this._selected = true;
        return true;
    },
    onClick:function(sender){
        if ( this.getParent() != null ){
            this.getParent().getParent().onClick(this.getTag());
        }
    },
    setSelect:function(selected){
        if (this._up1 == null) {
            return;
        }
        if (!this._noneName) {
            this._up.setVisible(selected);
            this._down.setVisible(!selected);
            this._light0.setVisible(selected);
            this._light1.setVisible(selected);

            if (this._isRight) {
                this._light1.setVisible(false);
            }
            if (this._isLeft) {
                this._light0.setVisible(false);
            }
        }
        this._bk.setVisible(!selected);
        this._up1.setVisible(selected);
        this._down1.setVisible(!selected);
        if (this.selected) {
            this._menuItem.selected();
        }
        else{
            this._menuItem.unselected();
        }

        this._selected = selected;
    },
    isSelected:function(){
        return this._selected;
    },
    setIsRight:function(){
        this._isRight = true;
    },
    setIsLeft:function(){
        this._isLeft = true;
    }
});

Button.create = function(scale9, name, text){
    var btn = new Button();
    btn.init(scale9, name, text);
    return btn;
}

var Slider = cc.Node.extend({
    _slider:null,
    init:function(){
        var slider_0 = cc.Sprite.createWithSpriteFrameName("slider_0.png");
        var slider_1 = cc.Sprite.createWithSpriteFrameName("slider_1.png");
        var slider_2 = cc.Sprite.createWithSpriteFrameName("slider_2.png");
        this._slider = cc.ControlSlider.create(slider_0, slider_1, slider_2);
        this.addChild(this._slider);
    },
    setValue:function(min, max, value){
        this._slider.setMinimumValue(min);
        this._slider.setMaximumValue(max);
        this._slider.setValue(value);
    },
    getValue:function(){
        return this._slider.getValue();
    }
});
Slider.create = function(){
    var _slider = new Slider();
    _slider.init();
    return _slider;
}

CocosDenshionTestScene = TestScene.extend({
    runThisTest:function () {
        audioEngine = cc.AudioEngine.getInstance();
        var layer = new CocosDenshionTest();
        this.addChild(layer);
        director.replaceScene(this);
    }
});

var soundId = null;

var playMusic = function () {
    cc.log("play background music");
    audioEngine.playMusic(MUSIC_FILE, false);
};

var stopMusic = function () {
    cc.log("stop background music");
    audioEngine.stopMusic();
};

var pauseMusic = function () {
    cc.log("pause background music");
    audioEngine.pauseMusic();
};

var resumeMusic = function () {
    cc.log("resume background music");
    audioEngine.resumeMusic();
};

var rewindMusic = function () {
    cc.log("rewind background music");
    audioEngine.rewindMusic();
};

// is background music playing
var isMusicPlaying = function () {
    if (audioEngine.isMusicPlaying()) {
        cc.log("background music is playing");
    }
    else {
        cc.log("background music is not playing");
    }
};

var playEffect = function () {
    cc.log("play effect");
    soundId = audioEngine.playEffect(EFFECT_FILE);
};

var playEffectRepeatly = function () {
    cc.log("play effect repeatly");
    soundId = audioEngine.playEffect(EFFECT_FILE, true);
};

var stopEffect = function () {
    cc.log("stop effect");
    audioEngine.stopEffect(soundId);
};

var unloadEffect = function () {
    cc.log("unload effect");
    audioEngine.unloadEffect(EFFECT_FILE);
};

var addMusicVolume = function () {
    cc.log("add bakcground music volume");
    audioEngine.setMusicVolume(audioEngine.getMusicVolume() + 0.1);
};

var subMusicVolume = function () {
    cc.log("sub backgroud music volume");
    audioEngine.setMusicVolume(audioEngine.getMusicVolume() - 0.1);
};

var addEffectsVolume = function () {
    cc.log("add effects volume");
    audioEngine.setEffectsVolume(audioEngine.getEffectsVolume() + 0.1);
};

var subEffectsVolume = function () {
    cc.log("sub effects volume");
    audioEngine.setEffectsVolume(audioEngine.getEffectsVolume() - 0.1);
};

var pauseEffect = function () {
    cc.log("pause effect");
    audioEngine.pauseEffect(soundId);
};

var resumeEffect = function () {
    cc.log("resume effect");
    audioEngine.resumeEffect(soundId);
};

var pauseAllEffects = function () {
    cc.log("pause all effects");
    audioEngine.pauseAllEffects();
};
var resumeAllEffects = function () {
    cc.log("resume all effects");
    audioEngine.resumeAllEffects();
};
var stopAllEffects = function () {
    cc.log("stop all effects");
    audioEngine.stopAllEffects();
};
