"use strict";
var sensors = (function() {
    var alpha = 0;
    var beta = 0;
    var gamma = 0;
    return {
        init : function() {
            tizen.logger.info('sensors.init()');
            window.addEventListener('deviceorientation', function(e) {
                if (game.config.useSensor) {
                    alpha = e.alpha;
                    beta = e.beta;
                    gamma = e.gamma;
                }
            });
            if (game.config.debug) {
                setInterval(function() {
                    tizen.logger.info(alpha);
                    tizen.logger.info(beta);
                    tizen.logger.info(gamma);
                }, 2000);
            }
        },

        getAlpha : function() {
            return alpha;
        },
        getBeta : function() {
            if (beta < -90) {
                return -90;
            }
            if (beta > 90) {
                return 90;
            }
            return beta;
        },
        getGamma : function() {
            if (gamma < -90) {
                return -90;
            }
            if (gamma > 90) {
                return 90;
            }
            return gamma;
        }
    };
}());