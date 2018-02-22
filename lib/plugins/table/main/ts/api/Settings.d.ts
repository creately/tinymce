/**
 * Settings.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2018 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Editor } from 'tinymce/core/api/Editor';
import { Option } from '@ephox/katamari';
export interface StringMap {
    [key: string]: string;
}
declare const getDefaultAttributes: (editor: Editor) => StringMap;
declare const getDefaultStyles: (editor: Editor) => StringMap;
declare const hasTableResizeBars: (editor: Editor) => boolean;
declare const hasTabNavigation: (editor: Editor) => boolean;
declare const getForcedRootBlock: (editor: Editor) => string;
declare const hasAdvancedCellTab: (editor: Editor) => boolean;
declare const hasAdvancedRowTab: (editor: Editor) => boolean;
declare const hasAdvancedTableTab: (editor: Editor) => boolean;
declare const hasAppearanceOptions: (editor: Editor) => boolean;
declare const hasTableGrid: (editor: Editor) => boolean;
declare const shouldStyleWithCss: (editor: Editor) => boolean;
declare const getForcedRootBlockAttrs: (editor: Editor) => StringMap;
declare const getCellClassList: (editor: Editor) => {
    title: string;
    value: string;
}[];
declare const getRowClassList: (editor: Editor) => {
    title: string;
    value: string;
}[];
declare const getTableClassList: (editor: Editor) => {
    title: string;
    value: string;
}[];
declare const getColorPickerCallback: (editor: Editor) => (editor: Editor, pickValue: (value: string) => void, value: string) => void;
declare const isPercentagesForced: (editor: Editor) => boolean;
declare const isPixelsForced: (editor: Editor) => boolean;
declare const getCloneElements: (editor: Editor) => Option<string[]>;
declare const hasObjectResizing: (editor: Editor) => boolean;
declare const getToolbar: (editor: Editor) => string[];
export { getDefaultAttributes, getDefaultStyles, hasTableResizeBars, hasTabNavigation, getForcedRootBlock, hasAdvancedCellTab, hasAdvancedRowTab, hasAdvancedTableTab, hasAppearanceOptions, hasTableGrid, shouldStyleWithCss, getForcedRootBlockAttrs, getCellClassList, getRowClassList, getTableClassList, getColorPickerCallback, getCloneElements, hasObjectResizing, isPercentagesForced, isPixelsForced, getToolbar };
