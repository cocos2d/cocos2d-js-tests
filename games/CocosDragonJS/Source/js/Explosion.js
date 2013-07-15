/* http://www.cocosbuilder.com
 * http://www.cocos2d-iphone.org
 *
 * Copyright (c) 2012 Zynga, Inc.
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
 */

//
// Controller for the Bomb Object
// This object is run when the Dragon (hero) touches a bomb
//

var Explosion = function () {
    this.radius = 15;
    this.active = false;
};

Explosion.prototype.onDidLoadFromCCB = function () {
    this.rootNode.animationManager.setCompletedAnimationCallback(this, this.onAnimationComplete);
};

Explosion.prototype.onUpdate = function () {
};

Explosion.prototype.handleCollisionWith = function (gameObjectController) {
};

Explosion.prototype.onAnimationComplete = function (animationManager) {
    this.isScheduledForRemove = true;
};

Explosion.prototype.playEffect = function (pos) {
    this.rootNode.setPosition(pos);
    var children = this.rootNode.getChildren();
    for(var i =0;i<children.length;i++){
        children[i].resetSystem();
    }
};

var ExplosionManager = {};
ExplosionManager.addExplosions=[];
ExplosionManager.getOrCreateExplosion = function () {
    var selChild = null;
    for (var j = 0; j < this.addExplosions.length; j++) {
        selChild = this.addExplosions[j];
        if (selChild.controller.active == false) {
            selChild.setVisible(true);
            return selChild;
        }
    }
    selChild = this.createExplosion();
    return selChild;
};

ExplosionManager.createExplosion = function () {
    var explosion = cc.BuilderReader.load("Explosion.ccbi");
    shareGameLevel.addChild(explosion);
    this.addExplosions.push(explosion);
    var children = explosion.getChildren();
    for(var i =0;i<children.length;i++){
        children[i].stopSystem();
    }

    return explosion;
};

ExplosionManager.preSetExplosion = function () {
    this.addExplosions=[];
    var explosion = null;
    for (var i = 0; i < 2; i++) {
        explosion = ExplosionManager.createExplosion();
        explosion.setVisible(false);
    }
};
