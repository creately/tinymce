/**
 * Conversions.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { FileReader } from '@ephox/sand';
import Promise from 'tinymce/core/api/util/Promise';
var blobToBase64 = function (blob) {
    return new Promise(function (resolve) {
        var reader = new FileReader();
        reader.onloadend = function () {
            resolve(reader.result.split(',')[1]);
        };
        reader.readAsDataURL(blob);
    });
};
export default {
    blobToBase64: blobToBase64
};
//# sourceMappingURL=Conversions.js.map