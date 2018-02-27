/**
 * Commands.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import Indent from '../actions/Indent';
import Outdent from '../actions/Outdent';
import ToggleList from '../actions/ToggleList';
var queryListCommandState = function (editor, listName) {
    return function () {
        var parentList = editor.dom.getParent(editor.selection.getStart(), 'UL,OL,DL');
        return parentList && parentList.nodeName === listName;
    };
};
var register = function (editor) {
    editor.on('BeforeExecCommand', function (e) {
        var cmd = e.command.toLowerCase();
        var isHandled;
        if (cmd === 'indent') {
            if (Indent.indentSelection(editor)) {
                isHandled = true;
            }
        }
        else if (cmd === 'outdent') {
            if (Outdent.outdentSelection(editor)) {
                isHandled = true;
            }
        }
        if (isHandled) {
            editor.fire('ExecCommand', { command: e.command });
            e.preventDefault();
            return true;
        }
    });
    editor.addCommand('InsertUnorderedList', function (ui, detail) {
        ToggleList.toggleList(editor, 'UL', detail);
    });
    editor.addCommand('InsertOrderedList', function (ui, detail) {
        ToggleList.toggleList(editor, 'OL', detail);
    });
    editor.addCommand('InsertDefinitionList', function (ui, detail) {
        ToggleList.toggleList(editor, 'DL', detail);
    });
    editor.addQueryStateHandler('InsertUnorderedList', queryListCommandState(editor, 'UL'));
    editor.addQueryStateHandler('InsertOrderedList', queryListCommandState(editor, 'OL'));
    editor.addQueryStateHandler('InsertDefinitionList', queryListCommandState(editor, 'DL'));
};
export default {
    register: register
};
//# sourceMappingURL=Commands.js.map