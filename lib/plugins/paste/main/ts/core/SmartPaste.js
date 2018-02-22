/**
 * SmartPaste.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import Tools from 'tinymce/core/api/util/Tools';
import Settings from '../api/Settings';
var pasteHtml = function (editor, html) {
    editor.insertContent(html, {
        merge: Settings.shouldMergeFormats(editor),
        paste: true
    });
    return true;
};
/**
 * Tries to be smart depending on what the user pastes if it looks like an url
 * it will make a link out of the current selection. If it's an image url that looks
 * like an image it will check if it's an image and insert it as an image.
 *
 * @class tinymce.pasteplugin.SmartPaste
 * @private
 */
var isAbsoluteUrl = function (url) {
    return /^https?:\/\/[\w\?\-\/+=.&%@~#]+$/i.test(url);
};
var isImageUrl = function (url) {
    return isAbsoluteUrl(url) && /.(gif|jpe?g|png)$/.test(url);
};
var createImage = function (editor, url, pasteHtmlFn) {
    editor.undoManager.extra(function () {
        pasteHtmlFn(editor, url);
    }, function () {
        editor.insertContent('<img src="' + url + '">');
    });
    return true;
};
var createLink = function (editor, url, pasteHtmlFn) {
    editor.undoManager.extra(function () {
        pasteHtmlFn(editor, url);
    }, function () {
        editor.execCommand('mceInsertLink', false, url);
    });
    return true;
};
var linkSelection = function (editor, html, pasteHtmlFn) {
    return editor.selection.isCollapsed() === false && isAbsoluteUrl(html) ? createLink(editor, html, pasteHtmlFn) : false;
};
var insertImage = function (editor, html, pasteHtmlFn) {
    return isImageUrl(html) ? createImage(editor, html, pasteHtmlFn) : false;
};
var smartInsertContent = function (editor, html) {
    Tools.each([
        linkSelection,
        insertImage,
        pasteHtml
    ], function (action) {
        return action(editor, html, pasteHtml) !== true;
    });
};
var insertContent = function (editor, html) {
    if (Settings.isSmartPasteEnabled(editor) === false) {
        pasteHtml(editor, html);
    }
    else {
        smartInsertContent(editor, html);
    }
};
export default {
    isImageUrl: isImageUrl,
    isAbsoluteUrl: isAbsoluteUrl,
    insertContent: insertContent
};
//# sourceMappingURL=SmartPaste.js.map