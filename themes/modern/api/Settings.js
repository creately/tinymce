/**
 * Settings.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import EditorManager from 'tinymce/core/api/EditorManager';
import Tools from 'tinymce/core/api/util/Tools';
var isBrandingEnabled = function (editor) { return editor.getParam('branding', true, 'boolean'); };
var hasMenubar = function (editor) { return getMenubar(editor) !== false; };
var getMenubar = function (editor) { return editor.getParam('menubar'); };
var hasStatusbar = function (editor) { return editor.getParam('statusbar', true, 'boolean'); };
var getToolbarSize = function (editor) { return editor.getParam('toolbar_items_size'); };
var isReadOnly = function (editor) { return editor.getParam('readonly', false, 'boolean'); };
var getFixedToolbarContainer = function (editor) { return editor.getParam('fixed_toolbar_container'); };
var getInlineToolbarPositionHandler = function (editor) { return editor.getParam('inline_toolbar_position_handler'); };
var getMenu = function (editor) { return editor.getParam('menu'); };
var getRemovedMenuItems = function (editor) { return editor.getParam('removed_menuitems', ''); };
var getMinWidth = function (editor) { return editor.getParam('min_width', 100, 'number'); };
var getMinHeight = function (editor) { return editor.getParam('min_height', 100, 'number'); };
var getMaxWidth = function (editor) { return editor.getParam('max_width', 0xFFFF, 'number'); };
var getMaxHeight = function (editor) { return editor.getParam('max_height', 0xFFFF, 'number'); };
var isSkinDisabled = function (editor) { return editor.settings.skin === false; };
var isInline = function (editor) { return editor.getParam('inline', false, 'boolean'); };
var getResize = function (editor) {
    var resize = editor.getParam('resize', 'vertical');
    if (resize === false) {
        return 'none';
    }
    else if (resize === 'both') {
        return 'both';
    }
    else {
        return 'vertical';
    }
};
var getSkinUrl = function (editor) {
    var settings = editor.settings;
    var skin = settings.skin;
    var skinUrl = settings.skin_url;
    if (skin !== false) {
        var skinName = skin ? skin : 'lightgray';
        if (skinUrl) {
            skinUrl = editor.documentBaseURI.toAbsolute(skinUrl);
        }
        else {
            skinUrl = EditorManager.baseURL + '/skins/' + skinName;
        }
    }
    return skinUrl;
};
var getIndexedToolbars = function (settings, defaultToolbar) {
    var toolbars = [];
    // Generate toolbar<n>
    for (var i = 1; i < 10; i++) {
        var toolbar_1 = settings['toolbar' + i];
        if (!toolbar_1) {
            break;
        }
        toolbars.push(toolbar_1);
    }
    var mainToolbar = settings.toolbar ? [settings.toolbar] : [defaultToolbar];
    return toolbars.length > 0 ? toolbars : mainToolbar;
};
var getToolbars = function (editor) {
    var toolbar = editor.getParam('toolbar');
    var defaultToolbar = 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image';
    if (toolbar === false) {
        return [];
    }
    else if (Tools.isArray(toolbar)) {
        return Tools.grep(toolbar, function (toolbar) {
            return toolbar.length > 0;
        });
    }
    else {
        return getIndexedToolbars(editor.settings, defaultToolbar);
    }
};
export { isBrandingEnabled, hasMenubar, getMenubar, hasStatusbar, getToolbarSize, getResize, isReadOnly, getFixedToolbarContainer, getInlineToolbarPositionHandler, getMenu, getRemovedMenuItems, getMinWidth, getMinHeight, getMaxWidth, getMaxHeight, getSkinUrl, isSkinDisabled, isInline, getToolbars };
//# sourceMappingURL=Settings.js.map