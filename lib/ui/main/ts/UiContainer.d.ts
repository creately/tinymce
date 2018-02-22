/**
 * UiContainer.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Option } from '@ephox/katamari';
declare const _default: {
    getUiContainerDelta: (ctrl: any) => Option<any>;
    setUiContainer: (editor: any, ctrl: any) => void;
    getUiContainer: (ctrl: any) => any;
    inheritUiContainer: (fromCtrl: any, toCtrl: any) => any;
};
export default _default;
