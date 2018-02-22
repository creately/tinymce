/**
 * ResizeHandler.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Option } from '@ephox/katamari';
export default function (editor: any): {
    lazyResize: () => Option<any>;
    lazyWire: () => any;
    destroy: () => void;
};
