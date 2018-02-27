/**
 * Convert.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { GeomRect } from 'tinymce/core/api/geom/Rect';
declare const _default: {
    fromClientRect: (clientRect: Partial<ClientRect>) => GeomRect;
    toClientRect: (geomRect: GeomRect) => ClientRect;
};
export default _default;
