/**
 * Theme.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import ThemeManager from 'tinymce/core/api/ThemeManager';
import ThemeApi from './api/ThemeApi';
import Api from 'tinymce/ui/Api';
import FormatControls from 'tinymce/ui/FormatControls';
var init = function () {
    Api.registerToFactory();
    Api.appendTo(window.tinymce ? window.tinymce : {});
    ThemeManager.add('modern', function (editor) {
        FormatControls.setup(editor);
        return ThemeApi.get(editor);
    });
};
export default init;
//# sourceMappingURL=Theme.js.map