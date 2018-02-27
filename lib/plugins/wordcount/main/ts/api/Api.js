/**
 * Api.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import WordCount from '../text/WordCount';
var get = function (editor) {
    var getCount = function () {
        return WordCount.getCount(editor);
    };
    return {
        getCount: getCount
    };
};
export default {
    get: get
};
//# sourceMappingURL=Api.js.map