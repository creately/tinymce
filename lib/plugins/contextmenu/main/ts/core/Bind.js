/**
 * Bind.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import Settings from '../api/Settings';
import Coords from './Coords';
import ContextMenu from '../ui/ContextMenu';
var isNativeOverrideKeyEvent = function (editor, e) {
    return e.ctrlKey && !Settings.shouldNeverUseNative(editor);
};
var setup = function (editor, visibleState, menu) {
    editor.on('contextmenu', function (e) {
        if (isNativeOverrideKeyEvent(editor, e)) {
            return;
        }
        e.preventDefault();
        ContextMenu.show(editor, Coords.getPos(editor, e), visibleState, menu);
    });
};
export default {
    setup: setup
};
//# sourceMappingURL=Bind.js.map