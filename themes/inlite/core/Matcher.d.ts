/**
 * Matcher.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Editor } from 'tinymce/core/api/Editor';
import { GeomRect } from 'tinymce/core/api/geom/Rect';
declare const _default: {
    match: (editor: Editor, matchers: any) => any;
    result: (id: string, rect: GeomRect) => {
        id: string;
        rect: GeomRect;
    };
};
export default _default;
