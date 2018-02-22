/**
 * Buttons.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import Tools from 'tinymce/core/api/util/Tools';
import Settings from '../api/Settings';
import Actions from '../core/Actions';
var createMenuItems = function (editor, lastFormatState) {
    var formats = Settings.getFormats(editor);
    return Tools.map(formats, function (fmt) {
        return {
            text: Actions.getDateTime(editor, fmt),
            onclick: function () {
                lastFormatState.set(fmt);
                Actions.insertDateTime(editor, fmt);
            }
        };
    });
};
var register = function (editor, lastFormatState) {
    var menuItems = createMenuItems(editor, lastFormatState);
    editor.addButton('insertdatetime', {
        type: 'splitbutton',
        title: 'Insert date/time',
        menu: menuItems,
        onclick: function () {
            var lastFormat = lastFormatState.get();
            Actions.insertDateTime(editor, lastFormat ? lastFormat : Settings.getDefaultDateTime(editor));
        }
    });
    editor.addMenuItem('insertdatetime', {
        icon: 'date',
        text: 'Date/time',
        menu: menuItems,
        context: 'insert'
    });
};
export default {
    register: register
};
//# sourceMappingURL=Buttons.js.map