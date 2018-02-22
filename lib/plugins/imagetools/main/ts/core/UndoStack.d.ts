/**
 * UndoStack.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
export default function (): {
    data: any[];
    add: (state: any) => {
        state: any;
        removed: any;
    };
    undo: () => any;
    redo: () => any;
    canUndo: () => boolean;
    canRedo: () => boolean;
};
