/**
 * Matcher.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
// result :: String, Rect -> Matcher.result
var result = function (id, rect) {
    return {
        id: id,
        rect: rect
    };
};
// match :: Editor, [(Editor -> Matcher.result | Null)] -> Matcher.result | Null
var match = function (editor, matchers) {
    for (var i = 0; i < matchers.length; i++) {
        var f = matchers[i];
        var result_1 = f(editor);
        if (result_1) {
            return result_1;
        }
    }
    return null;
};
export default {
    match: match,
    result: result
};
//# sourceMappingURL=Matcher.js.map