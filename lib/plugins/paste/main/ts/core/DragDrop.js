/**
 * DragDrop.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import RangeUtils from 'tinymce/core/api/dom/RangeUtils';
import Delay from 'tinymce/core/api/util/Delay';
import Settings from '../api/Settings';
import InternalHtml from './InternalHtml';
import Utils from './Utils';
var getCaretRangeFromEvent = function (editor, e) {
    return RangeUtils.getCaretRangeFromPoint(e.clientX, e.clientY, editor.getDoc());
};
var isPlainTextFileUrl = function (content) {
    var plainTextContent = content['text/plain'];
    return plainTextContent ? plainTextContent.indexOf('file://') === 0 : false;
};
var setFocusedRange = function (editor, rng) {
    editor.focus();
    editor.selection.setRng(rng);
};
var setup = function (editor, clipboard, draggingInternallyState) {
    // Block all drag/drop events
    if (Settings.shouldBlockDrop(editor)) {
        editor.on('dragend dragover draggesture dragdrop drop drag', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
    }
    // Prevent users from dropping data images on Gecko
    if (!Settings.shouldPasteDataImages(editor)) {
        editor.on('drop', function (e) {
            var dataTransfer = e.dataTransfer;
            if (dataTransfer && dataTransfer.files && dataTransfer.files.length > 0) {
                e.preventDefault();
            }
        });
    }
    editor.on('drop', function (e) {
        var dropContent, rng;
        rng = getCaretRangeFromEvent(editor, e);
        if (e.isDefaultPrevented() || draggingInternallyState.get()) {
            return;
        }
        dropContent = clipboard.getDataTransferItems(e.dataTransfer);
        var internal = clipboard.hasContentType(dropContent, InternalHtml.internalHtmlMime());
        if ((!clipboard.hasHtmlOrText(dropContent) || isPlainTextFileUrl(dropContent)) && clipboard.pasteImageData(e, rng)) {
            return;
        }
        if (rng && Settings.shouldFilterDrop(editor)) {
            var content_1 = dropContent['mce-internal'] || dropContent['text/html'] || dropContent['text/plain'];
            if (content_1) {
                e.preventDefault();
                // FF 45 doesn't paint a caret when dragging in text in due to focus call by execCommand
                Delay.setEditorTimeout(editor, function () {
                    editor.undoManager.transact(function () {
                        if (dropContent['mce-internal']) {
                            editor.execCommand('Delete');
                        }
                        setFocusedRange(editor, rng);
                        content_1 = Utils.trimHtml(content_1);
                        if (!dropContent['text/html']) {
                            clipboard.pasteText(content_1);
                        }
                        else {
                            clipboard.pasteHtml(content_1, internal);
                        }
                    });
                });
            }
        }
    });
    editor.on('dragstart', function (e) {
        draggingInternallyState.set(true);
    });
    editor.on('dragover dragend', function (e) {
        if (Settings.shouldPasteDataImages(editor) && draggingInternallyState.get() === false) {
            e.preventDefault();
            setFocusedRange(editor, getCaretRangeFromEvent(editor, e));
        }
        if (e.type === 'dragend') {
            draggingInternallyState.set(false);
        }
    });
};
export default {
    setup: setup
};
//# sourceMappingURL=DragDrop.js.map