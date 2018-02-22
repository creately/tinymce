/**
 * Api.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2018 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import InsertTable from '../actions/InsertTable';
import { Arr, Option } from '@ephox/katamari';
import { Element } from '@ephox/sugar';
var getClipboardRows = function (clipboardRows) {
    return clipboardRows.get().fold(function () {
        return;
    }, function (rows) {
        return Arr.map(rows, function (row) {
            return row.dom();
        });
    });
};
var setClipboardRows = function (rows, clipboardRows) {
    var sugarRows = Arr.map(rows, Element.fromDom);
    clipboardRows.set(Option.from(sugarRows));
};
var getApi = function (editor, clipboardRows) {
    return {
        insertTable: function (columns, rows) {
            return InsertTable.insert(editor, columns, rows);
        },
        setClipboardRows: function (rows) { return setClipboardRows(rows, clipboardRows); },
        getClipboardRows: function () { return getClipboardRows(clipboardRows); }
    };
};
export { getApi };
//# sourceMappingURL=Api.js.map