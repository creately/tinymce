/**
 * Events.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2018 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import { Editor } from 'src/core/main/ts/api/Editor';

const fireNewRow = (editor: Editor, row: HTMLElement) => editor.fire('newrow', { node: row });
const fireNewCell = (editor: Editor, cell: HTMLElement) => editor.fire('newcell', { node: cell });

export {
  fireNewRow,
  fireNewCell
};
