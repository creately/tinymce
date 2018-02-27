/**
 * CaretFinder.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Option } from '@ephox/katamari';
import CaretPosition from './CaretPosition';
declare const _default: {
    fromPosition: (forward: boolean, root: Node, pos: CaretPosition) => Option<CaretPosition>;
    nextPosition: (root: Node, pos: CaretPosition) => Option<CaretPosition>;
    prevPosition: (root: Node, pos: CaretPosition) => Option<CaretPosition>;
    navigate: (forward: boolean, root: Element, from: CaretPosition) => Option<CaretPosition>;
    positionIn: (forward: boolean, element: Element) => Option<CaretPosition>;
    firstPositionIn: (element: Element) => Option<CaretPosition>;
    lastPositionIn: (element: Element) => Option<CaretPosition>;
};
export default _default;
