"use strict";
var power = (function() {

    var powerStates = {
        "SCREEN_OFF" : "SCREEN_OFF",
        "SCREEN_DIM" : "SCREEN_DIM",
        "SCREEN_NORMAL" : "SCREEN_NORMAL",
        "SCREEN_BRIGHT" : "SCREEN_BRIGHT"
    };

    return {

        setScreen : function(powerState) {
            tizen.logger.info("power.setScreen()");
            try {
                if (tizen.power && tizen.power.request
                        && tizen.power.setScreenStateChangeListener) {
                    tizen.power.request("SCREEN", powerState);
                    tizen.power
                            .setScreenStateChangeListener(this.onScreenStateChanged);
                } else {
                    tizen.logger.err("tizen.power not supported");
                }
            } catch (e) {
                tizen.logger.err("tizen.power not supported");
            }
        },

        onScreenStateChanged : function(previousState, changedState) {
            tizen.logger.info("State changed from " + previousState, " to "
                    + changedState);
        },

        getPowerState : function() {
            return powerStates;
        }
    };

}());