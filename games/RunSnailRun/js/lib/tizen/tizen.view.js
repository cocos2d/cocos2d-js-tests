/*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
 * 
 * This module is responsible for showing custom jQueryMobile UI elements on screen and some screen modifications.
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
if (typeof tizen.view === "undefined")
    tizen.view = (function($) {
        var viewports = {
            full : 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, height=device-height, target-densitydpi=device-dpi',
            min : 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, height=device-height'
        };

        return {
            /**
             * Displays popup message
             * 
             * @param msg
             *            {String} Popup message to display
             */
            showPopup : function(msg) {
                /**
                 * Timeout for popup needed if we want to show popup in pageshow
                 * event
                 */
                setTimeout(function() {
                    $($.mobile.activePage).find('.popup p').html(msg);
                    $($.mobile.activePage).find('.popup').popup("open");
                    $($.mobile.activePage).find('.popup');
                }, 600);
            },

            /**
             * Shows jQuery Mobile loader
             * 
             */
            showLoader : function() {
                try {
                    $.mobile.loading('show', {
                        theme : "d"
                    });
                } catch (e) {
                    tizen.logger.warn("Unable to show loader");
                }
            },

            updateLoaderMsg : function(msg) {
                $.mobile.loading('show', {
                    theme : "b",
                    text : msg
                });
            },

            /**
             * Hides jQuery Mobile loader
             * 
             */
            hideLoader : function() {
                try {
                    $.mobile.loading('hide');
                } catch (e) {
                    tizen.logger.warn("Unable to hide loader");
                }
            },

            /**
             * Changes the viewport settings
             * 
             * @param viewport
             */
            setViewPort : function(viewport) {
                tizen.logger.info('setViewPort');
                $('meta[name="viewport"]').attr('content', viewport);
            },

            /**
             * Gets screen widht
             * 
             * @returns {Number} screen width
             */
            getScreenWidth : function() {
                tizen.logger.info("screen width", $(window).width());
                return $(window).width();
            },

            /**
             * Gets screen height
             * 
             * @returns {Number} screen height
             */
            getScreenHeight : function() {
                tizen.logger.info("screen height", $(window).height());
                return $(window).height();
            }
        };
    }($));
else
    console.err("Unable to create tizen.view module");