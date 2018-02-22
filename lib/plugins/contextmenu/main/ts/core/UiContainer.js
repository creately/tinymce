/**
 * UiContainer.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2018 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import DOMUtils from 'tinymce/core/api/dom/DOMUtils';
var getUiContainer = function (editor) {
    return DOMUtils.DOM.select(editor.settings.ui_container)[0];
};
export { getUiContainer };
//# sourceMappingURL=UiContainer.js.map