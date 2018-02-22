/**
 * Api.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
var get = function (toggleState) {
    var isEnabled = function () {
        return toggleState.get();
    };
    return {
        isEnabled: isEnabled
    };
};
export default {
    get: get
};
//# sourceMappingURL=Api.js.map