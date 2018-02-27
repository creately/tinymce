/**
 * Settings.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
var isEnabledByDefault = function (editor) {
    return editor.getParam('visualblocks_default_state', false);
};
var getContentCss = function (editor) {
    return editor.settings.visualblocks_content_css;
};
export default {
    isEnabledByDefault: isEnabledByDefault,
    getContentCss: getContentCss
};
//# sourceMappingURL=Settings.js.map