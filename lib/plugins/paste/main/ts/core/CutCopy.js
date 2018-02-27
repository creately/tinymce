/**
 * CutCopy.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import Env from 'tinymce/core/api/Env';
import InternalHtml from './InternalHtml';
import Utils from './Utils';
var noop = function () {
};
var hasWorkingClipboardApi = function (clipboardData) {
    // iOS supports the clipboardData API but it doesn't do anything for cut operations
    // Edge 15 has a broken HTML Clipboard API see https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11780845/
    return Env.iOS === false && clipboardData !== undefined && typeof clipboardData.setData === 'function' && Utils.isMsEdge() !== true;
};
var setHtml5Clipboard = function (clipboardData, html, text) {
    if (hasWorkingClipboardApi(clipboardData)) {
        try {
            clipboardData.clearData();
            clipboardData.setData('text/html', html);
            clipboardData.setData('text/plain', text);
            clipboardData.setData(InternalHtml.internalHtmlMime(), html);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    else {
        return false;
    }
};
var setClipboardData = function (evt, data, fallback, done) {
    if (setHtml5Clipboard(evt.clipboardData, data.html, data.text)) {
        evt.preventDefault();
        done();
    }
    else {
        fallback(data.html, done);
    }
};
var fallback = function (editor) { return function (html, done) {
    var markedHtml = InternalHtml.mark(html);
    var outer = editor.dom.create('div', {
        'contenteditable': 'false',
        'data-mce-bogus': 'all'
    });
    var inner = editor.dom.create('div', { contenteditable: 'true' }, markedHtml);
    editor.dom.setStyles(outer, {
        position: 'fixed',
        top: '0',
        left: '-3000px',
        width: '1000px',
        overflow: 'hidden'
    });
    outer.appendChild(inner);
    editor.dom.add(editor.getBody(), outer);
    var range = editor.selection.getRng();
    inner.focus();
    var offscreenRange = editor.dom.createRng();
    offscreenRange.selectNodeContents(inner);
    editor.selection.setRng(offscreenRange);
    setTimeout(function () {
        editor.selection.setRng(range);
        outer.parentNode.removeChild(outer);
        done();
    }, 0);
}; };
var getData = function (editor) { return ({
    html: editor.selection.getContent({ contextual: true }),
    text: editor.selection.getContent({ format: 'text' })
}); };
var cut = function (editor) { return function (evt) {
    if (editor.selection.isCollapsed() === false) {
        setClipboardData(evt, getData(editor), fallback(editor), function () {
            // Chrome fails to execCommand from another execCommand with this message:
            // "We don't execute document.execCommand() this time, because it is called recursively.""
            setTimeout(function () {
                editor.execCommand('Delete');
            }, 0);
        });
    }
}; };
var copy = function (editor) { return function (evt) {
    if (editor.selection.isCollapsed() === false) {
        setClipboardData(evt, getData(editor), fallback(editor), noop);
    }
}; };
var register = function (editor) {
    editor.on('cut', cut(editor));
    editor.on('copy', copy(editor));
};
export default {
    register: register
};
//# sourceMappingURL=CutCopy.js.map