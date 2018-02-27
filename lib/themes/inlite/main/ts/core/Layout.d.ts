/**
 * Layout.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { GeomRect } from 'tinymce/core/api/geom/Rect';
declare const _default: {
    calcInsert: (targetRect: GeomRect, contentAreaRect: GeomRect, panelRect: GeomRect) => {
        rect: any;
        position: any;
    };
    calc: (targetRect: GeomRect, contentAreaRect: GeomRect, panelRect: GeomRect) => {
        rect: any;
        position: any;
    };
    userConstrain: (handler: any, targetRect: GeomRect, contentAreaRect: GeomRect, panelRect: GeomRect) => GeomRect;
    defaultHandler: (rects: any) => any;
};
export default _default;
