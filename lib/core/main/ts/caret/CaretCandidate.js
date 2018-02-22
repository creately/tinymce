/**
 * CaretCandidate.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import NodeType from '../dom/NodeType';
import Arr from '../util/Arr';
import * as CaretContainer from './CaretContainer';
/**
 * This module contains logic for handling caret candidates. A caret candidate is
 * for example text nodes, images, input elements, cE=false elements etc.
 *
 * @private
 * @class tinymce.caret.CaretCandidate
 */
var isContentEditableTrue = NodeType.isContentEditableTrue;
var isContentEditableFalse = NodeType.isContentEditableFalse;
var isBr = NodeType.isBr;
var isText = NodeType.isText;
var isInvalidTextElement = NodeType.matchNodeNames('script style textarea');
var isAtomicInline = NodeType.matchNodeNames('img input textarea hr iframe video audio object');
var isTable = NodeType.matchNodeNames('table');
var isCaretContainer = CaretContainer.isCaretContainer;
var isCaretCandidate = function (node) {
    if (isCaretContainer(node)) {
        return false;
    }
    if (isText(node)) {
        if (isInvalidTextElement(node.parentNode)) {
            return false;
        }
        return true;
    }
    return isAtomicInline(node) || isBr(node) || isTable(node) || isContentEditableFalse(node);
};
var isInEditable = function (node, root) {
    for (node = node.parentNode; node && node !== root; node = node.parentNode) {
        if (isContentEditableFalse(node)) {
            return false;
        }
        if (isContentEditableTrue(node)) {
            return true;
        }
    }
    return true;
};
var isAtomicContentEditableFalse = function (node) {
    if (!isContentEditableFalse(node)) {
        return false;
    }
    return Arr.reduce(node.getElementsByTagName('*'), function (result, elm) {
        return result || isContentEditableTrue(elm);
    }, false) !== true;
};
var isAtomic = function (node) { return isAtomicInline(node) || isAtomicContentEditableFalse(node); };
var isEditableCaretCandidate = function (node, root) { return isCaretCandidate(node) && isInEditable(node, root); };
export { isCaretCandidate, isInEditable, isAtomic, isEditableCaretCandidate };
//# sourceMappingURL=CaretCandidate.js.map