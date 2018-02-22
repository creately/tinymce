/**
 * Events.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2018 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Editor } from 'tinymce/core/api/Editor';
declare const fireNewRow: (editor: Editor, row: HTMLElement) => any;
declare const fireNewCell: (editor: Editor, cell: HTMLElement) => any;
export { fireNewRow, fireNewCell };
