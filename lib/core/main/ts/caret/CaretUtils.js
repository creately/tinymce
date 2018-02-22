/**
 * CaretUtils.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import Fun from '../util/Fun';
import TreeWalker from '../api/dom/TreeWalker';
import NodeType from '../dom/NodeType';
import * as CaretContainer from './CaretContainer';
import * as CaretCandidate from './CaretCandidate';
import { CaretPosition } from 'tinymce/core/caret/CaretPosition';
import { Option } from '@ephox/katamari';
import { isFakeCaretTarget } from 'tinymce/core/caret/FakeCaret';
var isContentEditableTrue = NodeType.isContentEditableTrue;
var isContentEditableFalse = NodeType.isContentEditableFalse;
var isBlockLike = NodeType.matchStyleValues('display', 'block table table-cell table-caption list-item');
var isCaretContainer = CaretContainer.isCaretContainer;
var isCaretContainerBlock = CaretContainer.isCaretContainerBlock;
var curry = Fun.curry;
var isElement = NodeType.isElement;
var isCaretCandidate = CaretCandidate.isCaretCandidate;
var isForwards = function (direction) { return direction > 0; };
var isBackwards = function (direction) { return direction < 0; };
var skipCaretContainers = function (walk, shallow) {
    var node;
    while ((node = walk(shallow))) {
        if (!isCaretContainerBlock(node)) {
            return node;
        }
    }
    return null;
};
var findNode = function (node, direction, predicateFn, rootNode, shallow) {
    var walker = new TreeWalker(node, rootNode);
    if (isBackwards(direction)) {
        if (isContentEditableFalse(node) || isCaretContainerBlock(node)) {
            node = skipCaretContainers(walker.prev, true);
            if (predicateFn(node)) {
                return node;
            }
        }
        while ((node = skipCaretContainers(walker.prev, shallow))) {
            if (predicateFn(node)) {
                return node;
            }
        }
    }
    if (isForwards(direction)) {
        if (isContentEditableFalse(node) || isCaretContainerBlock(node)) {
            node = skipCaretContainers(walker.next, true);
            if (predicateFn(node)) {
                return node;
            }
        }
        while ((node = skipCaretContainers(walker.next, shallow))) {
            if (predicateFn(node)) {
                return node;
            }
        }
    }
    return null;
};
var getEditingHost = function (node, rootNode) {
    for (node = node.parentNode; node && node !== rootNode; node = node.parentNode) {
        if (isContentEditableTrue(node)) {
            return node;
        }
    }
    return rootNode;
};
var getParentBlock = function (node, rootNode) {
    while (node && node !== rootNode) {
        if (isBlockLike(node)) {
            return node;
        }
        node = node.parentNode;
    }
    return null;
};
var isInSameBlock = function (caretPosition1, caretPosition2, rootNode) {
    return getParentBlock(caretPosition1.container(), rootNode) === getParentBlock(caretPosition2.container(), rootNode);
};
var isInSameEditingHost = function (caretPosition1, caretPosition2, rootNode) {
    return getEditingHost(caretPosition1.container(), rootNode) === getEditingHost(caretPosition2.container(), rootNode);
};
var getChildNodeAtRelativeOffset = function (relativeOffset, caretPosition) {
    var container, offset;
    if (!caretPosition) {
        return null;
    }
    container = caretPosition.container();
    offset = caretPosition.offset();
    if (!isElement(container)) {
        return null;
    }
    return container.childNodes[offset + relativeOffset];
};
var beforeAfter = function (before, node) {
    var range = node.ownerDocument.createRange();
    if (before) {
        range.setStartBefore(node);
        range.setEndBefore(node);
    }
    else {
        range.setStartAfter(node);
        range.setEndAfter(node);
    }
    return range;
};
var isNodesInSameBlock = function (root, node1, node2) {
    return getParentBlock(node1, root) === getParentBlock(node2, root);
};
var lean = function (left, root, node) {
    var sibling, siblingName;
    if (left) {
        siblingName = 'previousSibling';
    }
    else {
        siblingName = 'nextSibling';
    }
    while (node && node !== root) {
        sibling = node[siblingName];
        if (isCaretContainer(sibling)) {
            sibling = sibling[siblingName];
        }
        if (isContentEditableFalse(sibling)) {
            if (isNodesInSameBlock(root, sibling, node)) {
                return sibling;
            }
            break;
        }
        if (isCaretCandidate(sibling)) {
            break;
        }
        node = node.parentNode;
    }
    return null;
};
var before = curry(beforeAfter, true);
var after = curry(beforeAfter, false);
var normalizeRange = function (direction, root, range) {
    var node, container, offset, location;
    var leanLeft = curry(lean, true, root);
    var leanRight = curry(lean, false, root);
    container = range.startContainer;
    offset = range.startOffset;
    if (CaretContainer.isCaretContainerBlock(container)) {
        if (!isElement(container)) {
            container = container.parentNode;
        }
        location = container.getAttribute('data-mce-caret');
        if (location === 'before') {
            node = container.nextSibling;
            if (isFakeCaretTarget(node)) {
                return before(node);
            }
        }
        if (location === 'after') {
            node = container.previousSibling;
            if (isFakeCaretTarget(node)) {
                return after(node);
            }
        }
    }
    if (!range.collapsed) {
        return range;
    }
    if (NodeType.isText(container)) {
        if (isCaretContainer(container)) {
            if (direction === 1) {
                node = leanRight(container);
                if (node) {
                    return before(node);
                }
                node = leanLeft(container);
                if (node) {
                    return after(node);
                }
            }
            if (direction === -1) {
                node = leanLeft(container);
                if (node) {
                    return after(node);
                }
                node = leanRight(container);
                if (node) {
                    return before(node);
                }
            }
            return range;
        }
        if (CaretContainer.endsWithCaretContainer(container) && offset >= container.data.length - 1) {
            if (direction === 1) {
                node = leanRight(container);
                if (node) {
                    return before(node);
                }
            }
            return range;
        }
        if (CaretContainer.startsWithCaretContainer(container) && offset <= 1) {
            if (direction === -1) {
                node = leanLeft(container);
                if (node) {
                    return after(node);
                }
            }
            return range;
        }
        if (offset === container.data.length) {
            node = leanRight(container);
            if (node) {
                return before(node);
            }
            return range;
        }
        if (offset === 0) {
            node = leanLeft(container);
            if (node) {
                return after(node);
            }
            return range;
        }
    }
    return range;
};
var isNextToContentEditableFalse = function (relativeOffset, caretPosition) {
    var node = getChildNodeAtRelativeOffset(relativeOffset, caretPosition);
    return isContentEditableFalse(node) && !NodeType.isBogusAll(node);
};
var isNextToTable = function (relativeOffset, caretPosition) {
    return NodeType.isTable(getChildNodeAtRelativeOffset(relativeOffset, caretPosition));
};
var getRelativeCefElm = function (forward, caretPosition) {
    return Option.from(getChildNodeAtRelativeOffset(forward ? 0 : -1, caretPosition)).filter(isContentEditableFalse);
};
var getNormalizedRangeEndPoint = function (direction, root, range) {
    var normalizedRange = normalizeRange(direction, root, range);
    if (direction === -1) {
        return CaretPosition.fromRangeStart(normalizedRange);
    }
    return CaretPosition.fromRangeEnd(normalizedRange);
};
var isBeforeContentEditableFalse = curry(isNextToContentEditableFalse, 0);
var isAfterContentEditableFalse = curry(isNextToContentEditableFalse, -1);
var isBeforeTable = curry(isNextToTable, 0);
var isAfterTable = curry(isNextToTable, -1);
export { isForwards, isBackwards, findNode, getEditingHost, getParentBlock, isInSameBlock, isInSameEditingHost, isBeforeContentEditableFalse, isAfterContentEditableFalse, isBeforeTable, isAfterTable, normalizeRange, getRelativeCefElm, getNormalizedRangeEndPoint };
//# sourceMappingURL=CaretUtils.js.map