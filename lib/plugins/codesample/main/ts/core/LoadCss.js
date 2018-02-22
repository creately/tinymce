/**
 * LoadCss.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import Settings from '../api/Settings';
// Todo: use a proper css loader here
var loadCss = function (editor, pluginUrl, addedInlineCss, addedCss) {
    var linkElm;
    var contentCss = Settings.getContentCss(editor);
    if (editor.inline && addedInlineCss.get()) {
        return;
    }
    if (!editor.inline && addedCss.get()) {
        return;
    }
    if (editor.inline) {
        addedInlineCss.set(true);
    }
    else {
        addedCss.set(true);
    }
    if (contentCss !== false) {
        linkElm = editor.dom.create('link', {
            rel: 'stylesheet',
            href: contentCss ? contentCss : pluginUrl + '/css/prism.css'
        });
        editor.getDoc().getElementsByTagName('head')[0].appendChild(linkElm);
    }
};
export default {
    loadCss: loadCss
};
//# sourceMappingURL=LoadCss.js.map