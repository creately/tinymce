/**
 * ErrorReporter.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import AddOnManager from './api/AddOnManager';
/**
 * Various error reporting helper functions.
 *
 * @class tinymce.ErrorReporter
 * @private
 */
var PluginManager = AddOnManager.PluginManager;
var resolvePluginName = function (targetUrl, suffix) {
    for (var name_1 in PluginManager.urls) {
        var matchUrl = PluginManager.urls[name_1] + '/plugin' + suffix + '.js';
        if (matchUrl === targetUrl) {
            return name_1;
        }
    }
    return null;
};
var pluginUrlToMessage = function (editor, url) {
    var plugin = resolvePluginName(url, editor.suffix);
    return plugin ?
        'Failed to load plugin: ' + plugin + ' from url ' + url :
        'Failed to load plugin url: ' + url;
};
var displayNotification = function (editor, message) {
    editor.notificationManager.open({
        type: 'error',
        text: message
    });
};
var displayError = function (editor, message) {
    if (editor._skinLoaded) {
        displayNotification(editor, message);
    }
    else {
        editor.on('SkinLoaded', function () {
            displayNotification(editor, message);
        });
    }
};
var uploadError = function (editor, message) {
    displayError(editor, 'Failed to upload image: ' + message);
};
var pluginLoadError = function (editor, url) {
    displayError(editor, pluginUrlToMessage(editor, url));
};
var initError = function (message) {
    var x = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        x[_i - 1] = arguments[_i];
    }
    var console = window.console;
    if (console) {
        if (console.error) {
            console.error.apply(console, arguments);
        }
        else {
            console.log.apply(console, arguments);
        }
    }
};
export default {
    pluginLoadError: pluginLoadError,
    uploadError: uploadError,
    displayError: displayError,
    initError: initError
};
//# sourceMappingURL=ErrorReporter.js.map