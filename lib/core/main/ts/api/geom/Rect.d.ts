/**
 * Rect.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
/**
 * Contains various tools for rect/position calculation.
 *
 * @class tinymce.geom.Rect
 */
export interface GeomRect {
    x: number;
    y: number;
    w: number;
    h: number;
}
declare const _default: {
    inflate: (rect: any, w: any, h: any) => {
        x: any;
        y: any;
        w: any;
        h: any;
    };
    relativePosition: (rect: any, targetRect: any, rel: any) => {
        x: any;
        y: any;
        w: any;
        h: any;
    };
    findBestRelativePosition: (rect: any, targetRect: any, constrainRect: any, rels: any) => any;
    intersect: (rect: any, cropRect: any) => {
        x: any;
        y: any;
        w: any;
        h: any;
    };
    clamp: (rect: any, clampRect: any, fixedSize?: any) => {
        x: any;
        y: any;
        w: any;
        h: any;
    };
    create: (x: any, y: any, w: any, h: any) => {
        x: any;
        y: any;
        w: any;
        h: any;
    };
    fromClientRect: (clientRect: any) => {
        x: any;
        y: any;
        w: any;
        h: any;
    };
};
export default _default;
