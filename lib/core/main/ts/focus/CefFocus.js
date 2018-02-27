/**
 * CefFocus.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Throttler } from '@ephox/katamari';
import * as CefUtils from '../keyboard/CefUtils';
var setup = function (editor) {
    var renderFocusCaret = Throttler.first(function () {
        if (!editor.removed) {
            var rng = editor.selection.getRng();
            if (rng.collapsed) {
                var caretRange = CefUtils.renderRangeCaret(editor, editor.selection.getRng(), false);
                editor.selection.setRng(caretRange);
            }
        }
    }, 0);
    editor.on('focus', function () {
        renderFocusCaret.throttle();
    });
    editor.on('blur', function () {
        renderFocusCaret.cancel();
    });
};
export default {
    setup: setup
};
//# sourceMappingURL=CefFocus.js.map