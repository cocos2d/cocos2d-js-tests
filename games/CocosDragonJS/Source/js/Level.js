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

var CD_LEVEL_WIDTH = 320;
var CD_SCROLL_FILTER_FACTOR = 0.1;
var CD_DRAGON_TARGET_OFFET = 80;

// Accelerometer
var CD_ACCEL_FILTER_FACTOR = 0.25;

/**
 * Level is the controller object of the game:
 * It receives the following events:
 *  - onUpdate
 *  - Input events like touches, mouse and accelerometer
 */
var Level = function () {
    this.winSize = cc.Director.getInstance().getWinSize();

    // Used for the low-pass filter on the accelerometer
    this.prevX = 0;
};

Level.prototype.onDidLoadFromCCB = function () {
    // Forward relevant touch events to controller (this)
    this.rootNode.onTouchesBegan = function (touches, event) {
        this.controller.onTouchesBegan(touches, event);
        return true;
    };
    this.rootNode.onTouchesMoved = function (touches, event) {
        this.controller.onTouchesMoved(touches, event);
        return true;
    };
    this.rootNode.onMouseDragged = function (event) {
        this.controller.onMouseDragged(event);
        return true;
    };

    this.rootNode.onAccelerometer = function (event) {
        this.controller.onAccelerometer(event);
    };

    // Schedule callback
    this.rootNode.onUpdate = function (dt) {
        this.controller.onUpdate();
    };
    this.rootNode.schedule(this.rootNode.onUpdate);

    var gameObject = null;
    var gameObjectController = null;
    var children = this.rootNode.getChildren();
    for (var i = 0; i < children.length; i++) {
        gameObject = children[i];
        gameObjectController = gameObject.controller;
        if (gameObject != this.dragon) {
            gameObject.setVisible(false);
            gameObjectController.active = true;
        }
    }
};

//
// Events
//
Level.prototype.onTouchesBegan = function (touches, event) {
    if (gSettingControlType != CD_CONTROLTYPE_TOUCH) return;

    var loc = touches[0].getLocation();
    this.dragon.controller.xTarget = loc.x - gLevelOffsetX;
};

Level.prototype.onTouchesMoved = function (touches, event) {
    if (gSettingControlType != CD_CONTROLTYPE_TOUCH) return;

    var loc = touches[0].getLocation();
    this.dragon.controller.xTarget = loc.x - gLevelOffsetX;
};

Level.prototype.onMouseDragged = function (event) {
    /*if (gSettingControlType != CD_CONTROLTYPE_TOUCH) return;

     var loc = event.getLocation();
     this.dragon.controller.xTarget = loc.x;*/
};

Level.prototype.onAccelerometer = function (accelEvent) {
    if (gSettingControlType != CD_CONTROLTYPE_TILT) return;

    // low pass filter for accelerometer. This makes the movement softer
    var accelX = accelEvent.x * CD_ACCEL_FILTER_FACTOR + (1 - CD_ACCEL_FILTER_FACTOR) * this.prevX;
    this.prevX = accelX;

    var newX = this.winSize.width * accelX + this.winSize.width / 2;
    this.dragon.controller.xTarget = newX;
    // cc.log('Accel x: '+ accelEvent.x + ' y:' + accelEvent.y + ' z:' + accelEvent.z + ' time:' + accelEvent.timestamp );
};


// Game main loop
Level.prototype.onUpdate = function (dt) {
    var oldLayerPosition = this.rootNode.getPosition();
    var dragonPos = cc.pMult(this.dragon.getPosition(), 1.0 / gScaleFactor);
    var dragonSpeed = this.dragon.controller.ySpeed

    // Adjust position of the layer so dragon is visible
    var posMultiplier = 1;
    var worldPos = dragonPos.y + oldLayerPosition.y;
    if (dragonSpeed < 0) {
        posMultiplier = 0.9;
    } else {
        if (worldPos > CD_DRAGON_TARGET_OFFET && worldPos < CD_DRAGON_TARGET_OFFET + 100) {
            if(dragonSpeed>CD_COIN_SPEED-100){
                posMultiplier = 0.8;
            }
        } else if (worldPos < CD_DRAGON_TARGET_OFFET) {
            posMultiplier = 0.6;
        }
    }
    var yNew = dragonSpeed * dt * posMultiplier;
    this.rootNode.setPositionY(oldLayerPosition.y - yNew);


    var i = 0;
    var gameObject = null;
    var gameObjectController = null;
    var gameObjectPos = null;
    var gameObjectWorldPos = null;
    // Iterate though all objects in the level layer
    var children = this.rootNode.getChildren();
    for (i = 0; i < children.length; i++) {
        // Check if the child has a controller (only the updatable objects will have one)
        gameObject = children[i];
        gameObjectController = gameObject.controller;
        if (!gameObjectController) {
            continue
        }
        // Update all game objects
        gameObjectController.onUpdate(dt);

        if (gameObjectController.active) {
            gameObjectPos = cc.pMult(gameObject.getPosition(), 1.0 / gScaleFactor);
            gameObjectWorldPos = gameObjectPos.y + oldLayerPosition.y;

            //setVisible
            if (gameObjectWorldPos>0&&gameObjectWorldPos <= this.winSize.height + 20) {
                if (!gameObject.isVisible()) {
                    gameObject.setVisible(true);
                }
            } else if (gameObjectWorldPos < -30) {
                if (gameObject.isVisible()) {
                    gameObject.setVisible(false);
                    gameObjectController.active = false;
                }
            }

            // Check for collisions with dragon
            if (gameObject !== this.dragon && gameObject.isVisible()) {
                if (cc.pDistance(gameObjectPos, dragonPos) < gameObjectController.radius + this.dragon.controller.radius) {
                    gameObjectController.handleCollisionWith(this.dragon.controller);
                    this.dragon.controller.handleCollisionWith(gameObjectController);
                }
            }

            // Check for objects to remove
            if (gameObjectController.isScheduledForRemove) {
                if (gameObject.isVisible()) {
                    gameObject.setVisible(false);
                    gameObjectController.active = false;
                }
            }
        }
    }
};
