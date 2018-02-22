/**
 * Settings.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2018 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Type, Option } from '@ephox/katamari';
var defaultTableToolbar = [
    'tableprops', 'tabledelete', '|', 'tableinsertrowbefore',
    'tableinsertrowafter', 'tabledeleterow', '|', 'tableinsertcolbefore',
    'tableinsertcolafter', 'tabledeletecol'
];
var defaultStyles = {
    'border-collapse': 'collapse',
    'width': '100%'
};
var defaultAttributes = {
    border: '1'
};
var getDefaultAttributes = function (editor) { return editor.getParam('table_default_attributes', defaultAttributes, 'object'); };
var getDefaultStyles = function (editor) { return editor.getParam('table_default_styles', defaultStyles, 'object'); };
var hasTableResizeBars = function (editor) { return editor.getParam('table_resize_bars', true, 'boolean'); };
var hasTabNavigation = function (editor) { return editor.getParam('table_tab_navigation', true, 'boolean'); };
var getForcedRootBlock = function (editor) { return editor.getParam('forced_root_block', 'p', 'string'); };
var hasAdvancedCellTab = function (editor) { return editor.getParam('table_cell_advtab', true, 'boolean'); };
var hasAdvancedRowTab = function (editor) { return editor.getParam('table_row_advtab', true, 'boolean'); };
var hasAdvancedTableTab = function (editor) { return editor.getParam('table_advtab', true, 'boolean'); };
var hasAppearanceOptions = function (editor) { return editor.getParam('table_appearance_options', true, 'boolean'); };
var hasTableGrid = function (editor) { return editor.getParam('table_grid', true, 'boolean'); };
var shouldStyleWithCss = function (editor) { return editor.getParam('table_style_by_css', false, 'boolean'); };
var getForcedRootBlockAttrs = function (editor) { return editor.getParam('forced_block_attrs', {}, 'object'); };
var getCellClassList = function (editor) { return editor.getParam('table_cell_class_list', [], 'array'); };
var getRowClassList = function (editor) { return editor.getParam('table_row_class_list', [], 'array'); };
var getTableClassList = function (editor) { return editor.getParam('table_class_list', [], 'array'); };
var getColorPickerCallback = function (editor) { return editor.getParam('color_picker_callback'); };
var isPercentagesForced = function (editor) { return editor.getParam('table_responsive_width') === true; };
var isPixelsForced = function (editor) { return editor.getParam('table_responsive_width') === false; };
var getCloneElements = function (editor) {
    var cloneElements = editor.getParam('table_clone_elements');
    if (Type.isString(cloneElements)) {
        return Option.some(cloneElements.split(/[ ,]/));
    }
    else if (Array.isArray(cloneElements)) {
        return Option.some(cloneElements);
    }
    else {
        return Option.none();
    }
};
var hasObjectResizing = function (editor) {
    var objectResizing = editor.getParam('object_resizing', true);
    return objectResizing === 'table' || objectResizing;
};
var getToolbar = function (editor) {
    var toolbar = editor.getParam('table_toolbar', defaultTableToolbar);
    if (toolbar === '' || toolbar === false) {
        return [];
    }
    else if (Type.isString(toolbar)) {
        return toolbar.split(/[ ,]/);
    }
    else if (Type.isArray(toolbar)) {
        return toolbar;
    }
    else {
        return [];
    }
};
export { getDefaultAttributes, getDefaultStyles, hasTableResizeBars, hasTabNavigation, getForcedRootBlock, hasAdvancedCellTab, hasAdvancedRowTab, hasAdvancedTableTab, hasAppearanceOptions, hasTableGrid, shouldStyleWithCss, getForcedRootBlockAttrs, getCellClassList, getRowClassList, getTableClassList, getColorPickerCallback, getCloneElements, hasObjectResizing, isPercentagesForced, isPixelsForced, getToolbar };
//# sourceMappingURL=Settings.js.map