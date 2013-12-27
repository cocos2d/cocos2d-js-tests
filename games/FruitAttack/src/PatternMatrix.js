var MATRIX_CONTINUOUS = 3;

 var MATRIX_ROW_MAX = 6;
 var MATRIX_COL_MAX = 6;

var gPatternsFallTime = 0.4;
var gPatternsSwapTime = 0.17;
var gPatternsClearTime = 0.5;
var gInitMatrixDelayTime = 0.7;

var PatternMatrix = cc.Layer.extend({
    mPatternBgBatchNode:null,
    mPatternBatchNode:null,
    m_nMatrixRow:0,
    m_nMatrixCol:0,
    m_nFreezeProbability:0,
    m_nBombProbability:0,
    m_nStoneProbability:0,
    mPatternTypeMax:0,
    mPatternsSpr:null,
    mPatternsPos:null,
    mPromptTimerTally:0,
    mTimerTally:0,
    mProgressSpr:null,
    mVisibleRect:null,
    mPromptMarkSpr:null,
    mCheckMarkSpr:null,
    mFirstCheckPattern:null,
    mSecondCheckPattern:null,
    mDestroyFrames:null,
    mExplodeFrames:null,
    mDestroyBatchTally:0,
    mTimeTotal:0,
    mPatternRequire:0,
    mPatternClearTally:0,
    mGameScore:0,
    mUpdateLogic:true,
    mMultipleTimer:0.0,
    mScoreMultiple:1,
    mScoreLabel:null,
    mPromptPattern:null,

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        var bRet = false;
        if (this._super()) {
            this.mTimeTotal = 60;
            this.mPatternRequire = 100;
            this.setTag(111);

            var bgSprite = cc.Sprite.create("res/background.jpg");
            bgSprite.setAnchorPoint(0,0);
            this.addChild(bgSprite);

            this.initProgressWithGameMode();
            this.initLabels();

            this.PatternBg = cc.RenderTexture.create(320, 480);
            this.PatternBg.setPosition(160, 240);
            this.addChild(this.PatternBg);

            this.mPatternBatchNode = cc.SpriteBatchNode.create("res/baseResource.png",MATRIX_ROW_MAX*MATRIX_COL_MAX*2);
            this.addChild(this.mPatternBatchNode,1);

            this.mCheckMarkSpr = cc.Sprite.createWithSpriteFrameName("pattern_selected.png");
            this.mCheckMarkSpr.setPosition(-100.0,-100.0);
            this.addChild(this.mCheckMarkSpr,1);

            this.mPromptMarkSpr = cc.Sprite.createWithSpriteFrameName("pattern_selected.png");
            this.mPromptMarkSpr.setPosition(-100.0,-100.0);
            this.addChild(this.mPromptMarkSpr,1);

            this.mPromptMarkSpr.runAction(cc.RepeatForever.create( cc.Sequence.create(cc.FadeIn.create(1.0),cc.FadeOut.create(1.0)) ));

            this.initArrayFrames();

            gNotification.addObserver(this, this.onCheckPattern, MSG_CHECK_PATTERN);
            gNotification.addObserver(this, this.onSwapTwoPattern, MSG_SWAP_PATTERN);

            this.mPatternsPos = this.createIntArray(MATRIX_ROW_MAX,MATRIX_COL_MAX,null);
            this.mPatternsSpr = this.createIntArray(MATRIX_ROW_MAX,MATRIX_COL_MAX,null);

            this.runAction(cc.Sequence.create(cc.DelayTime.create(gInitMatrixDelayTime),
                cc.CallFunc.create(this.initMatrix.bind(this),this )));

            bRet = true;
        }
        return bRet;
    } ,
    clearMsgListener:function(){
        gNotification.removeObserver(this, MSG_CHECK_PATTERN);
        gNotification.removeObserver(this, MSG_SWAP_PATTERN);
    },
    initMatrix:function(){
        this.mPatternTypeMax = 7;
        this.m_nFreezeProbability = 3;
        this.m_nStoneProbability = 3;
        this.m_nBombProbability = 6;

        this.m_nMatrixRow = 6;
        this.m_nMatrixCol = 6;

        var halfSpace = 25.0;
        var space = 2*halfSpace;

        var baseX = 160.0 + halfSpace - this.m_nMatrixCol*halfSpace;
        var baseY = 240.0 + halfSpace - this.m_nMatrixRow*halfSpace;
        var patternBg;
        var row,col;

        patternBg = cc.Sprite.create("res/PatternBg.png");
        this.PatternBg.begin();
        for ( row = 0; row < this.m_nMatrixRow; row++)
        {
            for ( col = 0; col < this.m_nMatrixCol; col++)
            {
                this.mPatternsPos[row][col] = cc.p(baseX + col*space, baseY+ row*space);
                patternBg.setPosition(this.mPatternsPos[row][col]);
                patternBg.visit();
            }
        }
        window.test111 = this.mPatternsPos;
        this.PatternBg.end();

        for ( row = 0; row < this.m_nMatrixRow; row++)
        {
            for ( col = 0; col < this.m_nMatrixCol; col++)
            {
                this.addOnePattern(row,col);
            }
        }

        this.schedule(this.updateTimerForPrompt,0.15);
        this.runAction(cc.Sequence.create(cc.DelayTime.create(gPatternsFallTime+0.1),
        cc.CallFunc.create(this.detectionMatrix.bind(this))));
    } ,
    addOnePattern:function(row,col){
        var temp = 0 | (Math.random() * 10000);
        var prob = temp%100;
        var attr = ePatternExtraAttr.Normal;
        if ( this.m_nFreezeProbability!=0  && prob<this.m_nFreezeProbability )
            attr = ePatternExtraAttr.Freeze;
        else if (row!=0 && this.m_nStoneProbability!=0  && prob<this.m_nFreezeProbability+this.m_nStoneProbability )
            attr = ePatternExtraAttr.Stone;
        else if ( this.m_nBombProbability!=0  && prob<this.m_nFreezeProbability+this.m_nStoneProbability+this.m_nBombProbability )
            attr = ePatternExtraAttr.Bomb;

        var patternType = 0|(temp % this.mPatternTypeMax);

        this.mPatternsSpr[row][col] = new PatternSprite(patternType, attr);
        this.mPatternsSpr[row][col].setAnchorPoint(0.5,0.5);
        this.mPatternsSpr[row][col].m_nRowIndex = row;
        this.mPatternsSpr[row][col].m_nColIndex = col;
        this.mPatternsSpr[row][col].setPosition(this.mPatternsPos[row][col].x,this.mPatternsPos[row][col].y+400.0);
        this.mPatternsSpr[row][col].moveTo(gPatternsFallTime,this.mPatternsPos[row][col]);

        this.mPatternBatchNode.addChild(this.mPatternsSpr[row][col]);
    },
    initProgressWithGameMode:function(){
        this.mProgressBgSpr = cc.Sprite.create("res/ProgressBarBack.png");
        this.mProgressBgSpr.setAnchorPoint(0.0,0.5);
        this.mProgressBgSpr.setPosition(32,20);
        this.addChild(this.mProgressBgSpr);

        this.mProgressSpr = cc.Sprite.create("res/ProgressBarFront.png");

        switch(gGameMode){
            case eGameMode.Timer:
            {
                this.mTimerTally = 0;
                this.mVisibleRect = cc.rect(0,0,257,19);
                break;
            }
            case eGameMode.Challenge:
            {
                this.mVisibleRect = cc.rect(0,0,0,257);
                break;
            }
        }
        this.mProgressSpr.setAnchorPoint(0.0,0.5);
        this.mProgressSpr.setPosition(32,20);
        this.mProgressSpr.setTextureRect(this.mVisibleRect);
        this.addChild(this.mProgressSpr);
    },
    initLabels:function(){
        this.mScoreLabel = cc.LabelTTF.create("Score 0", "Courier", 20);
        this.mScoreLabel.setPosition(150,450);

        this.addChild(this.mScoreLabel);
    },
    initArrayFrames:function(){
        this.mDestroyFrames = [];
        var  frame;
        for (var i=0;i<18;i++)
        {
            frame = gSpriteFrameCache.getSpriteFrame("pattern_destroy_"+("00"+i).slice(-2)+".png");
            this.mDestroyFrames.push(frame);
        }
        this.mExplodeFrames = [];
        for (var i=0;i<17;i++)
        {
            frame = gSpriteFrameCache.getSpriteFrame("pattern_explode_"+("00"+i).slice(-2)+".png");
            this.mExplodeFrames.push(frame);
        }
    },
    excludeDeadlock:function(){
        if (this.isHasSolution() == false)
        {
            if (gGameMode == eGameMode.Timer)
            {
                for (var row=0; row<this.m_nMatrixRow; row++)
                {
                    for (var col=0; col<this.m_nMatrixCol; col++){
                    this.mPatternBatchNode.removeChild(this.mPatternsSpr[row][col],true);
                    this.addOnePattern(row,col);
                }
                }
                this.runAction(cc.Sequence.create(cc.DelayTime.create(gPatternsFallTime+0.1),
                    cc.CallFunc.create(this.detectionMatrix.bind(this),this)));
            }
            else
            {
                this.onExit();
                this.showGameResult(false);
            }
        }
    },
    onCheckPattern:function(pPattern){
        if ( pPattern != null){
            this.mPromptTimerTally = 0;
            this.mPromptMarkSpr.setPosition(-1000.0,-1000.0);

            if (this.mFirstCheckPattern === null){
                this.mFirstCheckPattern = pPattern;
                this.mCheckMarkSpr.setPosition(this.mPatternsPos[this.mFirstCheckPattern.m_nRowIndex][this.mFirstCheckPattern.m_nColIndex]);
            }
            else{
                this.mSecondCheckPattern = pPattern;
                if (this.mSecondCheckPattern === this.mFirstCheckPattern)
                {
                    this.mSecondCheckPattern = null;
                    return;
                }

                var isAdjacent = false;
                if (this.mFirstCheckPattern.m_nRowIndex == this.mSecondCheckPattern.m_nRowIndex)
                {
                    if (this.mFirstCheckPattern.m_nColIndex>0 &&
                        this.mFirstCheckPattern.m_nColIndex-1 == this.mSecondCheckPattern.m_nColIndex)
                        isAdjacent = true;
                    else if (this.mFirstCheckPattern.m_nColIndex+1<this.m_nMatrixCol &&
                        this.mFirstCheckPattern.m_nColIndex+1 == this.mSecondCheckPattern.m_nColIndex)
                        isAdjacent = true;
                }
                else if (this.mFirstCheckPattern.m_nColIndex == this.mSecondCheckPattern.m_nColIndex)
                {
                    if(this.mFirstCheckPattern.m_nRowIndex>0 &&
                        this.mFirstCheckPattern.m_nRowIndex-1 == this.mSecondCheckPattern.m_nRowIndex)
                        isAdjacent = true;
                    else if(this.mFirstCheckPattern.m_nRowIndex+1<this.m_nMatrixRow &&
                        this.mFirstCheckPattern.m_nRowIndex+1 == this.mSecondCheckPattern.m_nRowIndex)
                        isAdjacent = true;
                }

                if (isAdjacent){
                    this.mCheckMarkSpr.setPosition(-1000.0,-1000.0);

                    this.swapTwoPattern(this.mFirstCheckPattern,this.mSecondCheckPattern,false);
                    this.mFirstCheckPattern = null;
                    this.mSecondCheckPattern = null;
                }
                else
                {
                    this.mCheckMarkSpr.setPosition(this.mPatternsPos[this.mSecondCheckPattern.m_nRowIndex][this.mSecondCheckPattern.m_nColIndex]);

                    this.mFirstCheckPattern = this.mSecondCheckPattern;
                    this.mSecondCheckPattern = null;
                }
            }
        }
    },
    onSwapTwoPattern:function(pPattern){
        if (pPattern)
        {
            var pFirstCheckPattern = pPattern;
            if (this.mFirstCheckPattern === pFirstCheckPattern){
                this.mFirstCheckPattern = null;
                this.mCheckMarkSpr.setPosition(-1000.0,-1000.0);
            }

            if(pFirstCheckPattern.g_ePatternStatus != ePatternStatus.Normal)
                return;

            this.mPromptTimerTally = 0;
            this.mPromptMarkSpr.setPosition(-1000.0,-1000.0);

            var pSecondCheckPattern = null;
            switch(pFirstCheckPattern.m_eSwapDirection){
                case eSwapDirection.Left:
                    if (pFirstCheckPattern.m_nColIndex > 0)
                        pSecondCheckPattern = this.mPatternsSpr[pFirstCheckPattern.m_nRowIndex][pFirstCheckPattern.m_nColIndex-1];
                    break;
                case eSwapDirection.Right:
                    if (pFirstCheckPattern.m_nColIndex+1 < this.m_nMatrixCol)
                        pSecondCheckPattern = this.mPatternsSpr[pFirstCheckPattern.m_nRowIndex][pFirstCheckPattern.m_nColIndex+1];
                    break;
                case eSwapDirection.Up:
                    if (pFirstCheckPattern.m_nRowIndex+1 < this.m_nMatrixRow)
                        pSecondCheckPattern = this.mPatternsSpr[pFirstCheckPattern.m_nRowIndex+1][pFirstCheckPattern.m_nColIndex];
                    break;
                case eSwapDirection.Down:
                    if (pFirstCheckPattern.m_nRowIndex > 0)
                        pSecondCheckPattern = this.mPatternsSpr[pFirstCheckPattern.m_nRowIndex-1][pFirstCheckPattern.m_nColIndex];
                    break;
                default :
                    this.mFirstCheckPattern = null;
                    this.mSecondCheckPattern = null;
                    break;
            }

            if (pSecondCheckPattern && pSecondCheckPattern.g_ePatternStatus==ePatternStatus.Normal){
                if (this.mFirstCheckPattern == pSecondCheckPattern){
                    this.mFirstCheckPattern = null;
                    this.mCheckMarkSpr.setPosition(-1000.0,-1000.0);
                }
                this.swapTwoPattern(pFirstCheckPattern,pSecondCheckPattern,false);
            }
        }
    },
    swapTwoPattern:function(firstPattern, secondPattern, isRecover){
        var fpRow,fpCol,spRow,spCol;
        fpRow = firstPattern.m_nRowIndex;
        fpCol = firstPattern.m_nColIndex;
        spRow = secondPattern.m_nRowIndex;
        spCol = secondPattern.m_nColIndex;

        firstPattern.g_pSwapPattern = secondPattern;
        secondPattern.g_pSwapPattern = firstPattern;

        firstPattern.g_bIsRecover = isRecover;
        secondPattern.g_bIsRecover = isRecover;

        firstPattern.swapTo(gPatternsSwapTime,this.mPatternsPos[spRow][spCol]);
        secondPattern.swapTo(gPatternsSwapTime,this.mPatternsPos[fpRow][fpCol]);

        firstPattern.m_nRowIndex = spRow;
        firstPattern.m_nColIndex = spCol;
        secondPattern.m_nRowIndex = fpRow;
        secondPattern.m_nColIndex = fpCol;

        this.mPatternsSpr[fpRow][fpCol] = secondPattern;
        this.mPatternsSpr[spRow][spCol] = firstPattern;

        this.runAction(cc.Sequence.create(cc.DelayTime.create(gPatternsSwapTime),
            cc.CallFunc.create(this.onSwapFinish.bind(this),this,firstPattern)));
    },
    onSwapFinish:function( pnode,  pPattern){
        var pfPattern = pPattern;
        var psPattern = pfPattern.g_pSwapPattern;
        pfPattern.g_ePatternStatus = ePatternStatus.Normal;
        psPattern.g_ePatternStatus = ePatternStatus.Normal;

        if (pfPattern.g_bIsRecover)
            this.onClearFinish(null,null);
        else{
            var	matrixMark = this.createIntArray(this.m_nMatrixRow,this.m_nMatrixCol,0);//[[]];

            if (this.getResultByPoint(pfPattern.m_nRowIndex,pfPattern.m_nColIndex,matrixMark) |
                this.getResultByPoint(psPattern.m_nRowIndex,psPattern.m_nColIndex,matrixMark))
                this.clearSomePatterns(matrixMark);
            else{
                this.swapTwoPattern(pfPattern,psPattern,true);
                gSharedEngine.playEffect(EFFECT_PATTERN_UN_SWAP);
            }
        }
    },
    clearSomePatterns:function(matrixMark){
        var tally = 0;
        this.mDestroyBatchTally++;

        for (var row=0; row<this.m_nMatrixRow; row++)
        {
            for (var col=0; col<this.m_nMatrixCol; col++)
            {
                if(this.mPatternsSpr[row][col] == null || this.mPatternsSpr[row][col].g_ePatternStatus!=ePatternStatus.Normal)
                    continue;

                switch(matrixMark[row][col]){
                    case 1:
                        this.mPatternsSpr[row][col].destroyPattern(this.mDestroyFrames);
                        this.mPatternsSpr[row][col].g_nRemoveBatchIndex = this.mDestroyBatchTally;
                        tally++;
                        break;
                    case 2:
                        this.mPatternsSpr[row][col].removeFreeze();
                        break;
                    case 3:
                        this.mPatternsSpr[row][col].explodePattern(this.mExplodeFrames);
                        this.mPatternsSpr[row][col].g_nRemoveBatchIndex = this.mDestroyBatchTally;
                        tally++;
                        break;
                    default:
                        break;
                }
            }
        }

        if (tally != 0){
            this.updateScore(tally);
            this.updateProgress();
            if(this.mMultipleTimer > 0.0)
                this.mScoreMultiple++;
            this.mMultipleTimer = 3.0;
        }

        this.runAction(cc.Sequence.create(cc.DelayTime.create(gPatternsClearTime),cc.CallFunc.create(
            this.onClearFinish.bind(this),this,this.mDestroyBatchTally)));

        return tally;
    } ,
    onClearFinish:function(pnode,  removeIndex){
        var removeBatchIndex = removeIndex;
        var row,col;
        for ( col=0; col<this.m_nMatrixCol && removeBatchIndex; col++)
        {
            for ( row=0; row<this.m_nMatrixRow; row++)
            {
                if (this.mPatternsSpr[row][col] && this.mPatternsSpr[row][col].g_nRemoveBatchIndex==removeBatchIndex)
                {
                    this.mPatternBatchNode.removeChild(this.mPatternsSpr[row][col],true);
                    this.mPatternsSpr[row][col] = null;
                }
            }
        }
        for ( col=0; col<this.m_nMatrixCol; col++)
        {
            for ( row=0; row<this.m_nMatrixRow; row++)
            {
                if (row==0 && this.mPatternsSpr[row][col] && this.mPatternsSpr[row][col].m_eExtraAttr==ePatternExtraAttr.Stone)
                {
                    this.mPatternsSpr[row][col].runAction(cc.Sequence.create(cc.MoveBy.create(gPatternsFallTime,cc.p(0.0,-400.0)),
                    cc.CallFunc.create(this.removeNode.bind(this),this)));
                    this.mPatternsSpr[row][col] = null;
                }

                if (this.mPatternsSpr[row][col] == null)
                {
                    var notnull_r = -1;
                    for (var n = row+1;n<this.m_nMatrixRow;n++)
                    {
                        if (this.mPatternsSpr[n][col] != null)
                        {
                            if (row==0 && this.mPatternsSpr[n][col].m_eExtraAttr == ePatternExtraAttr.Stone)
                            {
                                this.mPatternsSpr[n][col].runAction(cc.Sequence.create(cc.MoveBy.create(gPatternsFallTime,cc.p(0.0,-400.0)),
                                cc.CallFunc.create(this.removeNode.bind(this),this)));
                                this.mPatternsSpr[n][col] = null;
                            }
                            else
                            {
                                notnull_r = n;
                                break;
                            }
                        }
                    }

                    if (notnull_r != -1)
                    {
                        if (this.mPatternsSpr[notnull_r][col].g_ePatternStatus != ePatternStatus.Normal)
                        {
                            row = this.m_nMatrixRow;
                            break;
                        }

                        if(this.mPatternsSpr[notnull_r][col] == this.mFirstCheckPattern){
                            this.mCheckMarkSpr.setPosition(-100.0,-100.0);
                            this.mFirstCheckPattern = null;
                        }

                        this.mPatternsSpr[notnull_r][col].moveTo((notnull_r-row)*0.1,this.mPatternsPos[row][col]);
                        this.mPatternsSpr[row][col] = this.mPatternsSpr[notnull_r][col];
                        this.mPatternsSpr[row][col].m_nRowIndex = row;
                        this.mPatternsSpr[row][col].m_nColIndex = col;
                        this.mPatternsSpr[notnull_r][col] = null;
                    }
                }
            }
        }

        for ( col=0; col<this.m_nMatrixCol; col++)
        {
            for ( row = this.m_nMatrixRow-1; row>=0; row--){
            if (this.mPatternsSpr[row][col] == null)
                this.addOnePattern(row,col);
            else
                break;
            }
        }

        this.runAction(cc.Sequence.create(cc.DelayTime.create(0.65),
        cc.CallFunc.create(this.detectionMatrix.bind(this),this)));
    } ,
    removeNode:function(child){
        this.mPatternBatchNode.removeChild(child,true);
    },
    createIntArray:function(arow,acol,defValue){
        var arr = [];
        for (var row=0; row<arow; row++ )
        {
            arr[row] = [];
            for (var col=0; col<acol; col++){
                arr[row][col] = defValue;
            }
        }
        return arr;
    },
    detectionMatrix:function(){
        if(!this.mUpdateLogic)
            return;
        var		matrixMark = this.createIntArray(this.m_nMatrixRow,this.m_nMatrixCol,0);
        for (var col=0; col<this.m_nMatrixCol; col++)
        {
            for (var row=0; row<this.m_nMatrixRow; row++)
                this.getResultByPoint(row,col,matrixMark);
        }

        if (this.clearSomePatterns(matrixMark) == 0){
            var bRet = true;
            for (var col=0; col<this.m_nMatrixCol && bRet; col++)
            {
                for (var row=0; row<this.m_nMatrixRow && bRet; row++)
                {
                    if (this.mPatternsSpr[row][col]==null || this.mPatternsSpr[row][col].g_ePatternStatus!=ePatternStatus.Normal)
                        bRet = false;
                }
            }
            if (bRet)
                this.excludeDeadlock();
        }
    } ,
    updateTimerForPrompt:function(dt){
        this.mPromptTimerTally += dt;
        if (this.mMultipleTimer > 0.0)
            this.mMultipleTimer -= dt;
        else{
            this.mMultipleTimer = 0.0;
            this.mScoreMultiple = 1;
        }

        if (gGameMode == eGameMode.Timer)
        {
            this.mTimerTally += dt;
            this.updateProgress();
        }

        if (this.mPromptTimerTally >= 10.0)
        {
            var bRet = true;
            for (var col=0; col<this.m_nMatrixCol && bRet; col++)
            {
                for (var row=0; row<this.m_nMatrixRow && bRet; row++)
                {
                    if (this.mPatternsSpr[row][col]==null || this.mPatternsSpr[row][col].g_ePatternStatus!=ePatternStatus.Normal)
                        bRet = false;
                }
            }

            if (bRet){
                this.mPromptTimerTally = 0;
                this.isHasSolution();
                this.mPromptMarkSpr.setPosition(this.mPromptPattern.getPosition());
                this.mPromptPattern = null;
            }
        }
    },
    updateScore:function(patternTally){
        if(!this.mUpdateLogic)
            return;
        this.mPatternClearTally += patternTally;
        this.mGameScore += patternTally*100*this.mScoreMultiple;       
        this.mScoreLabel.setString("Score "+this.mGameScore);
    },
    updateProgress:function(){
        if(!this.mUpdateLogic)
            return;

        switch(gGameMode){
            case eGameMode.Challenge:
            {
                var penergyPercent = this.mPatternClearTally/this.mPatternRequire;

                if (penergyPercent > 1.0)
                    penergyPercent = 1.0;
                else if(penergyPercent <0.0)
                    penergyPercent = 0.0;
                var vh = 326*penergyPercent;
                this.mVisibleRect = cc.rect(0,326-vh,18,vh);
                this.mProgressSpr.setTextureRect(this.mVisibleRect);

                if (penergyPercent == 1.0)
                    this.showGameResult(true);
                break;
            }
            case eGameMode.Timer:
            {
                var penergyPercent = 0.0;
                penergyPercent = (this.mTimeTotal-this.mTimerTally)/this.mTimeTotal;

                if (penergyPercent > 1.0)
                    penergyPercent = 1.0;
                else if(penergyPercent <0.0)
                    penergyPercent = 0.0;
                var vw = 257*penergyPercent;
                this.mVisibleRect= cc.rect(0,0,vw,19);
                this.mProgressSpr.setTextureRect(this.mVisibleRect);

                if (penergyPercent == 0.0)
                {
                    if(this.mPatternClearTally >= this.mPatternRequire)
                        this.showGameResult(true);
                    else
                        this.showGameResult(false);
                }
                break;
            }
        }
    }   ,
    stopGameLogic:function(){
        this.unscheduleAllCallbacks();
        this.mUpdateLogic = false;
    } ,
    showGameResult:function(isPass){
        this.stopGameLogic();
        var resultLayer = new ResultLayer;
        resultLayer.initResultData(this.mGameScore,this.mPatternRequire*100*3,gScoreData.bestScore,isPass);
        this.onExit();
        gScoreData.setLastScore(this.mGameScore);

        if(isPass)
            gSharedEngine.playEffect(EFFECT_GAME_WIN);
        else
           gSharedEngine.playEffect(EFFECT_GAME_FAIL);

        cc.Director.getInstance().getRunningScene().addChild(resultLayer,99);
    } ,
    getResultByPoint:function( row,  col, matrixMark){
        if(this.mPatternsSpr[row][col] == null)
            return false;

        var targetType = this.mPatternsSpr[row][col].m_ePatternType;
        if(targetType == -1 || this.mPatternsSpr[row][col].g_ePatternStatus != ePatternStatus.Normal)
            return false;

        var bRet = false;
        var count = 1;
        var start = col;
        var end = col;

        var i = col-1;
        while (i >= 0)
        {
            if (this.mPatternsSpr[row][i] && this.mPatternsSpr[row][i].g_ePatternStatus==ePatternStatus.Normal
                && this.mPatternsSpr[row][i].m_ePatternType == targetType){
                count++;
                start = i;
            }
            else
                break;
            i--;
        }

        i = col+1;
        while (i < this.m_nMatrixCol)
        {
            if (this.mPatternsSpr[row][i] && this.mPatternsSpr[row][i].g_ePatternStatus==ePatternStatus.Normal &&
                this.mPatternsSpr[row][i].m_ePatternType == targetType)
            {
                count++;
                end = i;
            }
            else
                break;
            i++;
        }

        if (count >= MATRIX_CONTINUOUS)
        {
            for (i = start; i <= end; i++)
            {
                switch(this.mPatternsSpr[row][i].m_eExtraAttr){
                    case ePatternExtraAttr.Bomb:
                    {
                        matrixMark[row][i] = 3;
                        if(i > 0){
                            matrixMark[row][i-1] = 3;
                            if(row > 0){
                                matrixMark[row-1][i-1] = 3;
                                matrixMark[row-1][i] = 3;
                            }
                            if(row+1 < this.m_nMatrixRow){
                                matrixMark[row+1][i-1] = 3;
                                matrixMark[row+1][i] = 3;
                            }
                        }

                        if(i+1 < this.m_nMatrixCol){
                            matrixMark[row][i+1] = 3;
                            if(row > 0)
                                matrixMark[row-1][i+1] = 3;
                            if(row+1 < this.m_nMatrixRow)
                                matrixMark[row+1][i+1] = 3;
                        }
                        break;
                    }
                    case ePatternExtraAttr.Freeze:
                        if(matrixMark[row][i] != 3)
                            matrixMark[row][i] = 2;
                        break;
                    default:
                        if(matrixMark[row][i] == 0)
                            matrixMark[row][i] = 1;
                        break;
                }
            }
            bRet = true;
        }
        // Vertical
        count = 1;
        start = row;
        i = row-1;
        while (i >= 0)
        {
            if (this.mPatternsSpr[i][col] && this.mPatternsSpr[i][col].g_ePatternStatus==ePatternStatus.Normal &&
                this.mPatternsSpr[i][col].m_ePatternType == targetType){
                count++;
                start = i;
            }
            else
                break;
            i--;
        }

        end = row;
        i = row+1;
        while (i < this.m_nMatrixRow)
        {
            if (this.mPatternsSpr[i][col] && this.mPatternsSpr[i][col].g_ePatternStatus==ePatternStatus.Normal &&
                this.mPatternsSpr[i][col].m_ePatternType == targetType){
                count++;
                end = i;
            }
            else
                break;
            i++;
        }

        if (count >= MATRIX_CONTINUOUS)
        {
            for (i = start; i <= end; i++)
            {
                switch(this.mPatternsSpr[i][col].m_eExtraAttr){
                    case ePatternExtraAttr.Bomb:
                    {
                        matrixMark[i][col] = 3;
                        if(col > 0){
                            matrixMark[i][col-1] = 3;
                            if(i > 0){
                                matrixMark[i-1][col-1] = 3;
                                matrixMark[i-1][col] = 3;
                            }
                            if(i+1 < this.m_nMatrixRow){
                                matrixMark[i+1][col-1] = 3;
                                matrixMark[i+1][col] = 3;
                            }
                        }

                        if(col+1 < this.m_nMatrixCol){
                            matrixMark[i][col+1] = 3;
                            if(i > 0)
                                matrixMark[i-1][col+1] = 3;
                            if(i+1 < this.m_nMatrixRow)
                                matrixMark[i+1][col+1] = 3;
                        }
                        break;
                    }
                    case ePatternExtraAttr.Freeze:
                        if(matrixMark[i][col] != 3)
                            matrixMark[i][col] = 2;
                        break;
                    default:
                        if(matrixMark[i][col] == 0)
                            matrixMark[i][col] = 1;
                        break;
                }
            }
            bRet = true;
        }

        return bRet;
    } ,
    isHasSolution:function(){
        var targetType = 0;

        for (var row=0; row<this.m_nMatrixRow; row++)
        {
            for (var col=0; col<this.m_nMatrixCol-1; col++)
            {
                if (this.mPatternsSpr[row][col].m_eExtraAttr != ePatternExtraAttr.Stone)
                {
                    targetType = this.mPatternsSpr[row][col].m_ePatternType;
                    if (targetType == this.mPatternsSpr[row][col+1].m_ePatternType)
                    {
                        //  *
                        //**
                        //  *
                        if ( row>0 && col+2<this.m_nMatrixCol && this.mPatternsSpr[row-1][col+2].m_ePatternType == targetType){
                            if(this.mPatternsSpr[row][col+2].m_bSwapEnable)
                            {
                                this.mPromptPattern = this.mPatternsSpr[row][col+2];
                                return true;
                            }
                            if(this.mPatternsSpr[row-1][col+2].m_bSwapEnable)
                            {
                                this.mPromptPattern = this.mPatternsSpr[row-1][col+2];
                                return true;
                            }
                        }

                        if ( row+1<this.m_nMatrixRow && col+2<this.m_nMatrixCol && this.mPatternsSpr[row+1][col+2].m_ePatternType == targetType ){
                            if(this.mPatternsSpr[row][col+2].m_bSwapEnable)
                            {
                                this.mPromptPattern = this.mPatternsSpr[row][col+2];
                                return true;
                            }
                            if(this.mPatternsSpr[row+1][col+2].m_bSwapEnable)
                            {
                                this.mPromptPattern = this.mPatternsSpr[row+1][col+2];
                                return true;
                            }
                        }

                        //*
                        // **
                        //*
                        if (row>0 && col>0 && this.mPatternsSpr[row-1][col-1].m_ePatternType == targetType )
                        {
                            if(this.mPatternsSpr[row][col-1].m_bSwapEnable)
                            {
                                this.mPromptPattern = this.mPatternsSpr[row][col-1];
                                return true;
                            }
                            if(this.mPatternsSpr[row-1][col-1].m_bSwapEnable)
                            {
                                this.mPromptPattern = this.mPatternsSpr[row-1][col-1];
                                return true;
                            }
                        }
                        if (row+1<this.m_nMatrixRow && col>0 && this.mPatternsSpr[row+1][col-1].m_ePatternType == targetType )
                        {
                            if(this.mPatternsSpr[row][col-1].m_bSwapEnable)
                            {
                                this.mPromptPattern = this.mPatternsSpr[row][col-1];
                                return true;
                            }
                            if(this.mPatternsSpr[row+1][col-1].m_bSwapEnable)
                            {
                                this.mPromptPattern = this.mPatternsSpr[row+1][col-1];
                                return true;
                            }
                        }

                        //*-**-*
                        if (col - 2 >= 0 && this.mPatternsSpr[row][col-2].m_ePatternType == targetType )
                        {
                            if(this.mPatternsSpr[row][col-2].m_bSwapEnable)
                            {
                                this.mPromptPattern = this.mPatternsSpr[row][col-2];
                                return true;
                            }
                            if(this.mPatternsSpr[row][col-1].m_bSwapEnable)
                            {
                                this.mPromptPattern = this.mPatternsSpr[row][col-1];
                                return true;
                            }
                        }
                        if (col + 3 < this.m_nMatrixCol && this.mPatternsSpr[row][col+3].m_ePatternType == targetType )
                        {
                            if(this.mPatternsSpr[row][col+3].m_bSwapEnable)
                            {
                                this.mPromptPattern = this.mPatternsSpr[row][col+3];
                                return true;
                            }
                            if(this.mPatternsSpr[row][col+2].m_bSwapEnable)
                            {
                                this.mPromptPattern = this.mPatternsSpr[row][col+2];
                                return true;
                            }
                        }
                    }
                }
            }

            // x x |  x
            //  x  | x x
            for (var col = 0; col < this.m_nMatrixCol - 2; col++)
            {
                if (this.mPatternsSpr[row][col].m_eExtraAttr != ePatternExtraAttr.Stone){
                    targetType = this.mPatternsSpr[row][col].m_ePatternType;
                    if (targetType == this.mPatternsSpr[row][col+2].m_ePatternType)
                    {
                        if ( row>0 && targetType == this.mPatternsSpr[row-1][col+1].m_ePatternType )
                        {
                            if(this.mPatternsSpr[row-1][col+1].m_bSwapEnable)
                            {
                                this.mPromptPattern = this.mPatternsSpr[row-1][col+1];
                                return true;
                            }
                            if(this.mPatternsSpr[row][col+1].m_bSwapEnable)
                            {
                                this.mPromptPattern = this.mPatternsSpr[row][col+1];
                                return true;
                            }
                        }
                        if ( row+1<this.m_nMatrixRow && targetType == this.mPatternsSpr[row+1][col+1].m_ePatternType )
                        {
                            if(this.mPatternsSpr[row+1][col+1].m_bSwapEnable)
                            {
                                this.mPromptPattern = this.mPatternsSpr[row+1][col+1];
                                return true;
                            }
                            if(this.mPatternsSpr[row][col+1].m_bSwapEnable)
                            {
                                this.mPromptPattern = this.mPatternsSpr[row][col+1];
                                return true;
                            }
                        }
                    }
                }
            }
        }

        //------------------------------------------------------------------------------------------------------------------------
        for (var col = 0; col < this.m_nMatrixCol; col++)
        {
            for (var row = 0; row < this.m_nMatrixRow - 1; row++)
            {
                targetType = this.mPatternsSpr[row][col].m_ePatternType;
                if (this.mPatternsSpr[row][col].m_eExtraAttr != ePatternExtraAttr.Stone && targetType == this.mPatternsSpr[row+1][col].m_ePatternType){
                    // ? ?	
                    //  x
                    //  x
                    if (col>0 && row+2<this.m_nMatrixRow && this.mPatternsSpr[row+2][col-1].m_ePatternType == targetType )
                    {
                        if(this.mPatternsSpr[row+2][col-1].m_bSwapEnable)
                        {
                            this.mPromptPattern = this.mPatternsSpr[row+2][col-1];
                            return true;
                        }
                        if(this.mPatternsSpr[row+2][col].m_bSwapEnable)
                        {
                            this.mPromptPattern = this.mPatternsSpr[row+2][col];
                            return true;
                        }
                    }
                    if (col+1<this.m_nMatrixCol && row+2<this.m_nMatrixRow && this.mPatternsSpr[row+2][col+1].m_ePatternType == targetType )
                    {
                        if(this.mPatternsSpr[row+2][col+1].m_bSwapEnable)
                        {
                            this.mPromptPattern = this.mPatternsSpr[row+2][col+1];
                            return true;
                        }
                        if(this.mPatternsSpr[row+2][col].m_bSwapEnable)
                        {
                            this.mPromptPattern = this.mPatternsSpr[row+2][col];
                            return true;
                        }
                    }

                    //  x
                    //  x
                    // ? ?
                    if (col>0 && row>0 && this.mPatternsSpr[row-1][col-1].m_ePatternType == targetType )
                    {
                        if(this.mPatternsSpr[row-1][col-1].m_bSwapEnable)
                        {
                            this.mPromptPattern = this.mPatternsSpr[row-1][col-1];
                            return true;
                        }
                        if(this.mPatternsSpr[row-1][col].m_bSwapEnable)
                        {
                            this.mPromptPattern = this.mPatternsSpr[row-1][col];
                            return true;
                        }
                    }
                    if (col+1<this.m_nMatrixCol && row>0 && this.mPatternsSpr[row-1][col+1].m_ePatternType == targetType )
                    {
                        if(this.mPatternsSpr[row-1][col+1].m_bSwapEnable)
                        {
                            this.mPromptPattern = this.mPatternsSpr[row-1][col+1];
                            return true;
                        }
                        if(this.mPatternsSpr[row-1][col].m_bSwapEnable)
                        {
                            this.mPromptPattern = this.mPatternsSpr[row-1][col];
                            return true;
                        }
                    }

                    //* ** *
                    if (row - 2 >= 0 && this.mPatternsSpr[row-2][col].m_ePatternType == targetType )
                    {
                        if(this.mPatternsSpr[row-2][col].m_bSwapEnable)
                        {
                            this.mPromptPattern = this.mPatternsSpr[row-2][col];
                            return true;
                        }
                        if(this.mPatternsSpr[row-1][col].m_bSwapEnable)
                        {
                            this.mPromptPattern = this.mPatternsSpr[row-1][col];
                            return true;
                        }
                    }
                    if (row + 3 < this.m_nMatrixRow && this.mPatternsSpr[row+3][col].m_ePatternType == targetType )
                    {
                        if(this.mPatternsSpr[row+3][col].m_bSwapEnable)
                        {
                            this.mPromptPattern = this.mPatternsSpr[row+3][col];
                            return true;
                        }
                        if(this.mPatternsSpr[row+2][col].m_bSwapEnable)
                        {
                            this.mPromptPattern = this.mPatternsSpr[row+2][col];
                            return true;
                        }
                    }
                }
            }

            //  x | x
            // x  |  x
            //  x | x
            for (var row = 0; row < this.m_nMatrixRow - 2; row++)
            {
                if (this.mPatternsSpr[row][col].m_eExtraAttr != ePatternExtraAttr.Stone)
                {
                    targetType = this.mPatternsSpr[row][col].m_ePatternType;
                    if (targetType == this.mPatternsSpr[row+2][col].m_ePatternType)
                    {
                        if (col>0 && targetType == this.mPatternsSpr[row+1][col-1].m_ePatternType )
                        {
                            if(this.mPatternsSpr[row+1][col-1].m_bSwapEnable)
                            {
                                this.mPromptPattern = this.mPatternsSpr[row+1][col-1];
                                return true;
                            }
                            if(this.mPatternsSpr[row+1][col].m_bSwapEnable)
                            {
                                this.mPromptPattern = this.mPatternsSpr[row+1][col];
                                return true;
                            }
                        }
                        if (col+1<this.m_nMatrixCol && targetType == this.mPatternsSpr[row+1][col+1].m_ePatternType )
                        {
                            if(this.mPatternsSpr[row+1][col+1].m_bSwapEnable)
                            {
                                this.mPromptPattern = this.mPatternsSpr[row+1][col+1];
                                return true;
                            }
                            if(this.mPatternsSpr[row+1][col].m_bSwapEnable)
                            {
                                this.mPromptPattern = this.mPatternsSpr[row+1][col];
                                return true;
                            }
                        }
                    }
                }
            }
        }

        return false;
    }
});
