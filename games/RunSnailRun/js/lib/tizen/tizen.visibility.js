/*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
 * Tizen application life cycle handler
 * 
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
tizen.visibility = function() {

    var states = {
        HIDDEN : "hidden",
        VISIBLE : "visible",
        PRERENDER : "prerender",
        UNLOADED : "unloaded"
    };

    var visibilityChanged = function() {
        switch (document.webkitVisibilityState) {
        case states.PRERENDER:
        case states.UNLOADED:
            break;
        case states.HIDDEN:
            onApplicationHidden();
            break;
        case states.VISIBLE:
            onApplicationVisible();
            break;
        }
    };

    onApplicationVisible = function() {
    };
    onApplicationHidden = function() {
    };

    document.addEventListener("webkitvisibilitychange", visibilityChanged);

    return {

        /**
         * Method to register onApplicationVisible event
         * 
         * @param callback
         *            {Function} - method to be called each time application
         *            goes to foreground
         */
        onApplicationVisible : function(callback) {
            onApplicationVisible = callback;
        },

        /**
         * Method to register onApplicationHidden event
         * 
         * @param callback
         *            {Function} - method to be called each time application
         *            goes to background
         */
        onApplicationHidden : function(callback) {
            onApplicationHidden = callback;
        }
    };
};

if (typeof tizen !== "undefined" && typeof tizen.application !== "undefined") {
    tizen.application.visibility = tizen.visibility();
} else {
    tizen.visibility = tizen.visibility();
}

/**
 * EXAMPLE #1
 * 
 */
/*
 * In case tizen.application is NOT turn on in config.xml
 * 
 * tizen.visibility.onApplicationVisible(function() { console.log("app
 * visible"); });
 * 
 * tizen.visibility.onApplicationHidden(function() { console.log("app hidden");
 * });
 */

/**
 * EXAMPLE #2
 * 
 */
/*
 * In case tizen.application is turn on in config.xml visibility module is in
 * tizen.application.visibility namespace
 * 
 * tizen.application.visibility.onApplicationVisible(function() {
 * console.log("app visible"); });
 * 
 * tizen.application.visibility.onApplicationHidden(function() {
 * console.log("app hidden"); });
 */
