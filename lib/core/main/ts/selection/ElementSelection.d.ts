/**
 * ElementSelection.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Option } from '@ephox/katamari';
declare const getStart: (root: Element, rng: Range, real?: boolean) => Element;
declare const getEnd: (root: Element, rng: Range, real?: boolean) => Element;
declare const getNode: (root: Element, rng: Range) => Element;
declare const getSelectedBlocks: (dom: any, rng: Range, startElm?: Element, endElm?: Element) => Element[];
declare const select: (dom: any, node: Node, content?: boolean) => Option<any>;
export { getStart, getEnd, getNode, getSelectedBlocks, select };
