/**
 * Events.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2018 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
var fireNewRow = function (editor, row) { return editor.fire('newrow', { node: row }); };
var fireNewCell = function (editor, cell) { return editor.fire('newcell', { node: cell }); };
export { fireNewRow, fireNewCell };
//# sourceMappingURL=Events.js.map