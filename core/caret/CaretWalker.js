/**
 * CaretWalker.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import NodeType from '../dom/NodeType';
import * as CaretCandidate from './CaretCandidate';
import CaretPosition from './CaretPosition';
import { isBackwards, isForwards, isInSameBlock, findNode } from './CaretUtils';
import Arr from '../util/Arr';
import Fun from '../util/Fun';
/**
 * This module contains logic for moving around a virtual caret in logical order within a DOM element.
 *
 * It ignores the most obvious invalid caret locations such as within a script element or within a
 * contentEditable=false element but it will return locations that isn't possible to render visually.
 *
 * @private
 * @class tinymce.caret.CaretWalker
 * @example
 * var caretWalker = new CaretWalker(rootElm);
 *
 * var prevLogicalCaretPosition = caretWalker.prev(CaretPosition.fromRangeStart(range));
 * var nextLogicalCaretPosition = caretWalker.next(CaretPosition.fromRangeEnd(range));
 */
export var HDirection;
(function (HDirection) {
    HDirection[HDirection["Backwards"] = -1] = "Backwards";
    HDirection[HDirection["Forwards"] = 1] = "Forwards";
})(HDirection || (HDirection = {}));
var isContentEditableFalse = NodeType.isContentEditableFalse;
var isText = NodeType.isText;
var isElement = NodeType.isElement;
var isBr = NodeType.isBr;
var isCaretCandidate = CaretCandidate.isCaretCandidate;
var isAtomic = CaretCandidate.isAtomic;
var isEditableCaretCandidate = CaretCandidate.isEditableCaretCandidate;
var getParents = function (node, root) {
    var parents = [];
    while (node && node !== root) {
        parents.push(node);
        node = node.parentNode;
    }
    return parents;
};
var nodeAtIndex = function (container, offset) {
    if (container.hasChildNodes() && offset < container.childNodes.length) {
        return container.childNodes[offset];
    }
    return null;
};
var getCaretCandidatePosition = function (direction, node) {
    if (isForwards(direction)) {
        if (isCaretCandidate(node.previousSibling) && !isText(node.previousSibling)) {
            return CaretPosition.before(node);
        }
        if (isText(node)) {
            return CaretPosition(node, 0);
        }
    }
    if (isBackwards(direction)) {
        if (isCaretCandidate(node.nextSibling) && !isText(node.nextSibling)) {
            return CaretPosition.after(node);
        }
        if (isText(node)) {
            return CaretPosition(node, node.data.length);
        }
    }
    if (isBackwards(direction)) {
        if (isBr(node)) {
            return CaretPosition.before(node);
        }
        return CaretPosition.after(node);
    }
    return CaretPosition.before(node);
};
// Jumps over BR elements <p>|<br></p><p>a</p> -> <p><br></p><p>|a</p>
var isBrBeforeBlock = function (node, root) {
    var next;
    if (!NodeType.isBr(node)) {
        return false;
    }
    next = findCaretPosition(1, CaretPosition.after(node), root);
    if (!next) {
        return false;
    }
    return !isInSameBlock(CaretPosition.before(node), CaretPosition.before(next), root);
};
var findCaretPosition = function (direction, startPos, root) {
    var node, nextNode, innerNode;
    var rootContentEditableFalseElm, caretPosition;
    if (!isElement(root) || !startPos) {
        return null;
    }
    if (startPos.isEqual(CaretPosition.after(root)) && root.lastChild) {
        caretPosition = CaretPosition.after(root.lastChild);
        if (isBackwards(direction) && isCaretCandidate(root.lastChild) && isElement(root.lastChild)) {
            return isBr(root.lastChild) ? CaretPosition.before(root.lastChild) : caretPosition;
        }
    }
    else {
        caretPosition = startPos;
    }
    var container = caretPosition.container();
    var offset = caretPosition.offset();
    if (isText(container)) {
        if (isBackwards(direction) && offset > 0) {
            return CaretPosition(container, --offset);
        }
        if (isForwards(direction) && offset < container.length) {
            return CaretPosition(container, ++offset);
        }
        node = container;
    }
    else {
        if (isBackwards(direction) && offset > 0) {
            nextNode = nodeAtIndex(container, offset - 1);
            if (isCaretCandidate(nextNode)) {
                if (!isAtomic(nextNode)) {
                    innerNode = findNode(nextNode, direction, isEditableCaretCandidate, nextNode);
                    if (innerNode) {
                        if (isText(innerNode)) {
                            return CaretPosition(innerNode, innerNode.data.length);
                        }
                        return CaretPosition.after(innerNode);
                    }
                }
                if (isText(nextNode)) {
                    return CaretPosition(nextNode, nextNode.data.length);
                }
                return CaretPosition.before(nextNode);
            }
        }
        if (isForwards(direction) && offset < container.childNodes.length) {
            nextNode = nodeAtIndex(container, offset);
            if (isCaretCandidate(nextNode)) {
                if (isBrBeforeBlock(nextNode, root)) {
                    return findCaretPosition(direction, CaretPosition.after(nextNode), root);
                }
                if (!isAtomic(nextNode)) {
                    innerNode = findNode(nextNode, direction, isEditableCaretCandidate, nextNode);
                    if (innerNode) {
                        if (isText(innerNode)) {
                            return CaretPosition(innerNode, 0);
                        }
                        return CaretPosition.before(innerNode);
                    }
                }
                if (isText(nextNode)) {
                    return CaretPosition(nextNode, 0);
                }
                return CaretPosition.after(nextNode);
            }
        }
        node = nextNode ? nextNode : caretPosition.getNode();
    }
    if ((isForwards(direction) && caretPosition.isAtEnd()) || (isBackwards(direction) && caretPosition.isAtStart())) {
        node = findNode(node, direction, Fun.constant(true), root, true);
        if (isEditableCaretCandidate(node, root)) {
            return getCaretCandidatePosition(direction, node);
        }
    }
    nextNode = findNode(node, direction, isEditableCaretCandidate, root);
    rootContentEditableFalseElm = Arr.last(Arr.filter(getParents(container, root), isContentEditableFalse));
    if (rootContentEditableFalseElm && (!nextNode || !rootContentEditableFalseElm.contains(nextNode))) {
        if (isForwards(direction)) {
            caretPosition = CaretPosition.after(rootContentEditableFalseElm);
        }
        else {
            caretPosition = CaretPosition.before(rootContentEditableFalseElm);
        }
        return caretPosition;
    }
    if (nextNode) {
        return getCaretCandidatePosition(direction, nextNode);
    }
    return null;
};
export var CaretWalker = function (root) {
    return {
        /**
         * Returns the next logical caret position from the specificed input
         * caretPoisiton or null if there isn't any more positions left for example
         * at the end specified root element.
         *
         * @method next
         * @param {tinymce.caret.CaretPosition} caretPosition Caret position to start from.
         * @return {tinymce.caret.CaretPosition} CaretPosition or null if no position was found.
         */
        next: function (caretPosition) {
            return findCaretPosition(HDirection.Forwards, caretPosition, root);
        },
        /**
         * Returns the previous logical caret position from the specificed input
         * caretPoisiton or null if there isn't any more positions left for example
         * at the end specified root element.
         *
         * @method prev
         * @param {tinymce.caret.CaretPosition} caretPosition Caret position to start from.
         * @return {tinymce.caret.CaretPosition} CaretPosition or null if no position was found.
         */
        prev: function (caretPosition) {
            return findCaretPosition(HDirection.Backwards, caretPosition, root);
        }
    };
};
//# sourceMappingURL=CaretWalker.js.map