/**
 * InlineUtils.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Option } from '@ephox/katamari';
declare const _default: {
    isInlineTarget: (editor: any, elm: any) => any;
    findRootInline: (isInlineTarget: any, rootNode: any, pos: any) => Option<any>;
    isRtl: (element: any) => boolean;
    isAtZwsp: (pos: any) => boolean;
    normalizePosition: (forward: any, pos: any) => any;
    normalizeForwards: any;
    normalizeBackwards: any;
    hasSameParentBlock: (rootNode: any, node1: any, node2: any) => boolean;
};
export default _default;
