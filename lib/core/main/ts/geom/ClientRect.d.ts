/**
 * ClientRect.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
export interface ClientRect {
    left: number;
    top: number;
    bottom: number;
    right: number;
    width: number;
    height: number;
}
declare const clone: (rect: ClientRect) => ClientRect;
declare const collapse: (rect: ClientRect, toStart: boolean) => ClientRect;
declare const isEqual: (rect1: ClientRect, rect2: ClientRect) => boolean;
declare const isAbove: (rect1: ClientRect, rect2: ClientRect) => boolean;
declare const isBelow: (rect1: ClientRect, rect2: ClientRect) => boolean;
declare const isLeft: (rect1: ClientRect, rect2: ClientRect) => boolean;
declare const isRight: (rect1: ClientRect, rect2: ClientRect) => boolean;
declare const compare: (rect1: ClientRect, rect2: ClientRect) => number;
declare const containsXY: (rect: ClientRect, clientX: number, clientY: number) => boolean;
export { clone, collapse, isEqual, isAbove, isBelow, isLeft, isRight, compare, containsXY };
