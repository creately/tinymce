/**
 * Settings.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Editor } from 'tinymce/core/api/Editor';
declare const _default: {
    shouldPlainTextInform: (editor: Editor) => boolean;
    shouldBlockDrop: (editor: Editor) => boolean;
    shouldPasteDataImages: (editor: Editor) => boolean;
    shouldFilterDrop: (editor: Editor) => boolean;
    getPreProcess: (editor: Editor) => (plugin: any, args: any) => void;
    getPostProcess: (editor: Editor) => (plugin: any, args: any) => void;
    getWebkitStyles: (editor: Editor) => string;
    shouldRemoveWebKitStyles: (editor: Editor) => boolean;
    shouldMergeFormats: (editor: Editor) => boolean;
    isSmartPasteEnabled: (editor: Editor) => boolean;
    isPasteAsTextEnabled: (editor: Editor) => boolean;
    getRetainStyleProps: (editor: Editor) => string;
    getWordValidElements: (editor: Editor) => string;
    shouldConvertWordFakeLists: (editor: Editor) => boolean;
    shouldUseDefaultFilters: (editor: Editor) => boolean;
};
export default _default;
