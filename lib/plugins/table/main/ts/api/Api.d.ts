/**
 * Api.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2018 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Editor } from 'tinymce/core/api/Editor';
declare const getApi: (editor: Editor, clipboardRows: any) => {
    insertTable: (columns: number, rows: number) => HTMLElement;
    setClipboardRows: (rows: HTMLElement[]) => void;
    getClipboardRows: () => HTMLElement[];
};
export { getApi };
