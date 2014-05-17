/*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
 * 
 * Globaj $.ajax configuration for whole project
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
if (typeof tizen.ajax === "undefined")
    tizen.ajax = function() {
        $.ajaxSetup({
            type : "GET",
            timeout : 90000,
            crossDomain : false,
            dataType : "json",
            cache : false,
            async : true,
            beforeSend : function(XMLHttpRequest) {
                $.mobile.loading('show', {
                    theme : "d"
                });
            },

            complete : function(XMLHttpRequest, status) {
                tizen.logger.info("AJAX|INFO", "Complete");
                $.mobile.loading('hide');
            },

            success : function() {
                tizen.logger.info("AJAX|INFO", "Success");
            },

            error : function(err) {
                tizen.logger.err("AJAX|INFO", "Error", err);
                view.showPopup("Server request error");
            }
        });
    };
else
    console.err("Unable to create tizen.ajax module");