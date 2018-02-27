/**
 * VisualAid.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
var toggleVisualAidState = function (editor) {
    return function () {
        var self = this;
        editor.on('VisualAid', function (e) {
            self.active(e.hasVisual);
        });
        self.active(editor.hasVisual);
    };
};
var registerMenuItems = function (editor) {
    editor.addMenuItem('visualaid', {
        text: 'Visual aids',
        selectable: true,
        onPostRender: toggleVisualAidState(editor),
        cmd: 'mceToggleVisualAid'
    });
};
var register = function (editor) {
    registerMenuItems(editor);
};
export default {
    register: register
};
//# sourceMappingURL=VisualAid.js.map