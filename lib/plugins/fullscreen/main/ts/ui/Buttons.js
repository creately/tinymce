/**
 * Buttons.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
var postRender = function (editor) {
    return function (e) {
        var ctrl = e.control;
        editor.on('FullscreenStateChanged', function (e) {
            ctrl.active(e.state);
        });
    };
};
var register = function (editor) {
    editor.addMenuItem('fullscreen', {
        text: 'Fullscreen',
        shortcut: 'Ctrl+Shift+F',
        selectable: true,
        cmd: 'mceFullScreen',
        onPostRender: postRender(editor),
        context: 'view'
    });
    editor.addButton('fullscreen', {
        active: false,
        tooltip: 'Fullscreen',
        cmd: 'mceFullScreen',
        onPostRender: postRender(editor)
    });
};
export default {
    register: register
};
//# sourceMappingURL=Buttons.js.map