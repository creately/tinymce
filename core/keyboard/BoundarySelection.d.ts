/**
 * BoundarySelection.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Cell } from '@ephox/katamari';
declare const _default: {
    move: (editor: any, caret: any, forward: any) => () => any;
    moveNextWord: any;
    movePrevWord: any;
    setupSelectedState: (editor: any) => Cell<any>;
    setCaretPosition: (editor: any, pos: any) => void;
};
export default _default;
