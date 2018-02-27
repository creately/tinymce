/**
 * CefUtils.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import CaretPosition from '../caret/CaretPosition';
import * as CaretUtils from '../caret/CaretUtils';
import NodeType from '../dom/NodeType';
var isContentEditableTrue = NodeType.isContentEditableTrue;
var isContentEditableFalse = NodeType.isContentEditableFalse;
var showCaret = function (direction, editor, node, before, scrollIntoView) {
    // TODO: Figure out a better way to handle this dependency
    return editor._selectionOverrides.showCaret(direction, node, before, scrollIntoView);
};
var getNodeRange = function (node) {
    var rng = node.ownerDocument.createRange();
    rng.selectNode(node);
    return rng;
};
var selectNode = function (editor, node) {
    var e;
    e = editor.fire('BeforeObjectSelected', { target: node });
    if (e.isDefaultPrevented()) {
        return null;
    }
    return getNodeRange(node);
};
var renderCaretAtRange = function (editor, range, scrollIntoView) {
    var caretPosition, ceRoot;
    range = CaretUtils.normalizeRange(1, editor.getBody(), range);
    caretPosition = CaretPosition.fromRangeStart(range);
    if (isContentEditableFalse(caretPosition.getNode())) {
        return showCaret(1, editor, caretPosition.getNode(), !caretPosition.isAtEnd(), false);
    }
    if (isContentEditableFalse(caretPosition.getNode(true))) {
        return showCaret(1, editor, caretPosition.getNode(true), false, false);
    }
    // TODO: Should render caret before/after depending on where you click on the page forces after now
    ceRoot = editor.dom.getParent(caretPosition.getNode(), function (node) { return isContentEditableFalse(node) || isContentEditableTrue(node); });
    if (isContentEditableFalse(ceRoot)) {
        return showCaret(1, editor, ceRoot, false, scrollIntoView);
    }
    return null;
};
var renderRangeCaret = function (editor, range, scrollIntoView) {
    var caretRange;
    if (!range || !range.collapsed) {
        return range;
    }
    caretRange = renderCaretAtRange(editor, range, scrollIntoView);
    if (caretRange) {
        return caretRange;
    }
    return range;
};
export { showCaret, selectNode, renderCaretAtRange, renderRangeCaret };
//# sourceMappingURL=CefUtils.js.map