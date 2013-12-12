/*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
 * 
 * This custom logger module allows to set log level and write on default browser console.
 * 
 * @author Tomasz Scislo <<ahref='mailto:t.scislo@samsung.com'>t.scislo@samsung.com</a>>
 * 
 * 
 * **************************************************************************************
 * 
 * Copyright (c) 2012 Samsung Electronics All Rights Reserved.
 * 
 ******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/**
 * @version 0.0.1
 */
"use strict";
if (typeof tizen.logger === "undefined")
    tizen.logger = function(options) {
        var types = {
            ERROR : {
                name : "error",
                level : 0
            },
            WARNING : {
                name : "warn",
                level : 1
            },
            INFO : {
                name : "info",
                level : 2
            },
            NONE : {
                name : "none",
                level : -1
            }
        };

        if (typeof options === "undefined") {
            options = {
                logLevel : types.INFO.level
            };
        }

        var log = function(type, args) {
            if (type.level <= options.logLevel)
                console[type.name](args);
        };

        return {
            err : function(args) {
                for ( var i = 0; i < arguments.length; i++) {
                    log(types.ERROR, arguments[i]);
                }
            },
            warn : function(args) {
                for ( var i = 0; i < arguments.length; i++) {
                    log(types.WARNING, arguments[i]);
                }
            },
            info : function(args) {
                for ( var i = 0; i < arguments.length; i++) {
                    log(types.INFO, arguments[i]);
                }
            }
        }
    };
else
    console.err("Unable to create tizen.logger module");