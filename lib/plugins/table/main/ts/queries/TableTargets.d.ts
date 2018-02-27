/**
 * TableTargets.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Option } from '@ephox/katamari';
declare const _default: {
    noMenu: (cell: any) => {
        element: any;
        mergable: <T = any>() => Option<T>;
        unmergable: <T = any>() => Option<T>;
        selection: any;
    };
    forMenu: (selections: any, table: any, cell: any) => {
        element: any;
        mergable: any;
        unmergable: any;
        selection: any;
    };
    notCell: (element: any) => {
        element: any;
        mergable: <T = any>() => Option<T>;
        unmergable: <T = any>() => Option<T>;
        selection: any;
    };
    paste: any;
    pasteRows: (selections: any, table: any, cell: any, clipboard: any, generators: any) => {
        element: any;
        mergable: <T = any>() => Option<T>;
        unmergable: <T = any>() => Option<T>;
        selection: any;
        clipboard: any;
        generators: any;
    };
};
export default _default;
