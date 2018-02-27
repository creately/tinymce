/**
 * Plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import PluginManager from 'tinymce/core/api/PluginManager';
import Commands from './api/Commands';
import Buttons from './ui/Buttons';
var init = function () {
    PluginManager.add('textcolor', function (editor) {
        Commands.register(editor);
        Buttons.register(editor);
    });
};
export default init;
//# sourceMappingURL=Plugin.js.map