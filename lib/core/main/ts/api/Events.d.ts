/**
 * Events.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Editor } from 'tinymce/core/api/Editor';
declare const _default: {
    firePreProcess: (editor: Editor, args: any) => any;
    firePostProcess: (editor: Editor, args: any) => any;
    fireRemove: (editor: Editor) => any;
};
export default _default;
