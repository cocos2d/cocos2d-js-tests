var MSG_CHECK_PATTERN = "MSG_CHECK_PATTERN";
var MSG_SWAP_PATTERN = "MSG_SWAP_PATTERN";

var eSwapDirection = {"Up":0,"Down":1,"Left":2,"Right":3};
var ePatternExtraAttr = {"Normal":0,"Bomb":1,"Freeze":2,"Stone":3};
var ePatternStatus = {"Normal":0,"Move":1,"Destroy":2,"Explode":3};

var PatternSprite = cc.Sprite.extend({
    m_ePatternType:-1,
    m_eExtraAttr:ePatternExtraAttr.Normal,
    m_eSwapDirection:eSwapDirection.Up,
    m_nRowIndex:0,
    m_nColIndex:0,
    g_pSwapPattern:null,
    g_nRemoveBatchIndex:0,
    g_nMoveBatchIndex:0,
    g_bIsRecover:false,
    g_ePatternStatus:ePatternStatus.Normal,
    m_extraTypeSpr:null,
    m_checkSpr:null,
    m_bSwapEnable:true,

    ctor:function (type,extraAttr) {
        this._super();
        this.init(type,extraAttr);
    },
    init:function (type,extraAttr) {
        var bRet = false;
        if (this._super()) {
            this.m_eExtraAttr = extraAttr;
            if(extraAttr == ePatternExtraAttr.Stone)
                this.m_ePatternType = -1;
            else
                this.m_ePatternType = type;
            if (this.m_ePatternType==-1 || extraAttr==ePatternExtraAttr.Freeze)
                this.m_bSwapEnable = false;
            else
                this.m_bSwapEnable = true;

            switch (this.m_eExtraAttr)
            {
                case ePatternExtraAttr.Bomb:
                {
                    this.m_extraTypeSpr = cc.Sprite.createWithSpriteFrameName("pattern_mark_explode.png");
                    break;
                }
                case ePatternExtraAttr.Freeze:
                {
                    this.m_extraTypeSpr = cc.Sprite.createWithSpriteFrameName("pattern_mark_freeze.png");
                    break;
                }
                default:
                    break;
            }

            if (this.m_eExtraAttr == ePatternExtraAttr.Stone)
                this.setSpriteFrame("pattern_mark_petrifaction.png");
            else  {
                var str = "cocos"+("00"+ type).slice(-2)+".png";
                this.setSpriteFrame(str);
            }

            if (this.m_extraTypeSpr != null){
                var size = this.getContentSize();
                this.m_extraTypeSpr.setPosition(size.width/2,size.height/2);
                this.addChild(this.m_extraTypeSpr);
            }
            bRet = true;
        }
        return bRet;
    },
    destroyPattern:function(frams){
        this.g_ePatternStatus = ePatternStatus.Destroy;

        var effectSprite = cc.Sprite.createWithSpriteFrameName("pattern_destroy_00.png");
        effectSprite.setPosition(22.5,22.5);
        this.addChild(effectSprite);
        var animation = cc.Animation.create(frams,0.025);
        effectSprite.runAction(cc.Animate.create(animation));

        this.runAction(cc.FadeOut.create(0.5));
        gSharedEngine.playEffect(EFFECT_PATTERN_CLEAR);
    },
    explodePattern:function(frams){
        this.g_ePatternStatus = ePatternStatus.Explode;
        var effectSprite = cc.Sprite.createWithSpriteFrameName("pattern_explode_00.png");
        effectSprite.setPosition(22.5,22.5);
        this.addChild(effectSprite);
        var animation = cc.Animation.create(frams,0.025);
        effectSprite.runAction(cc.Animate.create(animation));

        this.runAction(cc.FadeOut.create(0.5));
        gSharedEngine.playEffect(EFFECT_PATTERN_BOMB);
    },
    removeFreeze:function(){
        if (this.m_eExtraAttr == ePatternExtraAttr.Freeze)
        {
            this.m_eExtraAttr = ePatternExtraAttr.Normal;
            this.m_bSwapEnable = true;
            this.removeChild(this.m_extraTypeSpr,true);
            this.m_extraTypeSpr = null;
        }
    } ,
    moveTo:function( duration,  position){
        if (this.g_ePatternStatus == ePatternStatus.Normal)
        {
            this.g_ePatternStatus = ePatternStatus.Move;
            var action = cc.Sequence.create(cc.MoveTo.create(duration,position),cc.CallFunc.create(this.onMoveEnd.bind(this),this));
            this.runAction(action);
        }
    },
    swapTo:function(duration, position){
        if (this.g_ePatternStatus === ePatternStatus.Normal)
        {
            this.g_ePatternStatus = ePatternStatus.Move;
            this.runAction(cc.MoveTo.create(duration,cc.p(position.x,position.y)));
        }
    },
    onMoveEnd:function(){
        this.g_ePatternStatus = ePatternStatus.Normal;
    },
    containsTouchLocation:function (touch) {
        var getPoint = touch.getLocation();

        var lx = 0 | (getPoint.x -  this.getPosition().x);//this.getPositionX();
        var ly = 0 | (getPoint.y -  this.getPosition().y);//this.getPositionY();
        if(lx>-22.5 && lx<22.5 && ly>-22.5 && ly<22.5)
            return true;
        return false;
    },
    onTouchBegan:function (touch, event) {
        if (this.m_bSwapEnable && this.g_ePatternStatus==ePatternStatus.Normal && this.containsTouchLocation(touch)){
            if (this.m_eExtraAttr==ePatternExtraAttr.Normal || this.m_eExtraAttr==ePatternExtraAttr.Bomb)
            {
                this.m_bHandleTouch = true;
                gNotification.postNotification(MSG_CHECK_PATTERN,this);

                return true;
            }
        }
        return false;
    },
    onTouchMoved:function (touch, event) {
        if (this.m_bHandleTouch && this.g_ePatternStatus===ePatternStatus.Normal){
            var getPoint = touch.getLocation();
            var lx = getPoint.x -  this.getPositionX();
            var ly = getPoint.y -  this.getPositionY();
            if (lx > 45)
            {
                this.m_bHandleTouch = false;
                if (ly > lx)
                    this.m_eSwapDirection = eSwapDirection.Up;
                else if (ly + lx < 0)
                    this.m_eSwapDirection = eSwapDirection.Down;
                else
                    this.m_eSwapDirection = eSwapDirection.Right;
                gNotification.postNotification(MSG_SWAP_PATTERN,this);
            }
            else if (lx < -45)
            {
                this.m_bHandleTouch = false;
                if (ly < lx)
                    this.m_eSwapDirection = eSwapDirection.Down;
                else if(ly + lx > 0)
                    this.m_eSwapDirection = eSwapDirection.Up;
                else
                    this.m_eSwapDirection = eSwapDirection.Left;
                gNotification.postNotification(MSG_SWAP_PATTERN,this);
            }
        else if (ly > 45)
            {
                this.m_bHandleTouch = false;
                this.m_eSwapDirection = eSwapDirection.Up;
                gNotification.postNotification(MSG_SWAP_PATTERN,this);
            }
        else if (ly < -45)
            {
                this.m_bHandleTouch = false;
                this.m_eSwapDirection = eSwapDirection.Down;
                gNotification.postNotification(MSG_SWAP_PATTERN,this);
            }
        }
    },
    onTouchEnded:function (touch, event) {

    },
    onEnter:function () {
       if(sys.platform == "browser")
            cc.registerTargetedDelegate(1, true, this);
        else
            cc.registerTargettedDelegate(1,true,this);
        this._super();
    },
    onExit:function () {
        cc.unregisterTouchDelegate(this);
        this._super();
    }
});
