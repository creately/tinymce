/**
 * NewLineUtils.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Option } from '@ephox/katamari';
declare const _default: {
    moveToCaretPosition: (editor: any, root: any) => void;
    getEditableRoot: (dom: any, node: any) => any;
    getParentBlock: (editor: any) => Option<any>;
    getParentBlockName: (editor: any) => any;
    isListItemParentBlock: (editor: any) => boolean;
};
export default _default;
