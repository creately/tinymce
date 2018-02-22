/**
 * CefNavigation.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import Env from '../api/Env';
import * as CaretContainer from '../caret/CaretContainer';
import CaretPosition from '../caret/CaretPosition';
import * as CaretUtils from '../caret/CaretUtils';
import { HDirection, CaretWalker } from '../caret/CaretWalker';
import * as LineUtils from '../caret/LineUtils';
import * as LineWalker from '../caret/LineWalker';
import NodeType from '../dom/NodeType';
import * as CefUtils from './CefUtils';
import * as RangeNodes from '../selection/RangeNodes';
import Arr from '../util/Arr';
import Fun from '../util/Fun';
var isContentEditableFalse = NodeType.isContentEditableFalse;
var getSelectedNode = RangeNodes.getSelectedNode;
var isAfterContentEditableFalse = CaretUtils.isAfterContentEditableFalse;
var isBeforeContentEditableFalse = CaretUtils.isBeforeContentEditableFalse;
var getVisualCaretPosition = function (walkFn, caretPosition) {
    while ((caretPosition = walkFn(caretPosition))) {
        if (caretPosition.isVisible()) {
            return caretPosition;
        }
    }
    return caretPosition;
};
var isMoveInsideSameBlock = function (from, to) {
    var inSameBlock = CaretUtils.isInSameBlock(from, to);
    // Handle bogus BR <p>abc|<br></p>
    if (!inSameBlock && NodeType.isBr(from.getNode())) {
        return true;
    }
    return inSameBlock;
};
var moveToCeFalseHorizontally = function (direction, editor, getNextPosFn, range) {
    var node, caretPosition, peekCaretPosition, rangeIsInContainerBlock;
    var forwards = direction === HDirection.Forwards;
    var isBeforeContentEditableFalseFn = forwards ? isBeforeContentEditableFalse : isAfterContentEditableFalse;
    if (!range.collapsed) {
        node = getSelectedNode(range);
        if (isContentEditableFalse(node)) {
            return CefUtils.showCaret(direction, editor, node, direction === HDirection.Backwards);
        }
    }
    rangeIsInContainerBlock = CaretContainer.isRangeInCaretContainerBlock(range);
    caretPosition = CaretUtils.getNormalizedRangeEndPoint(direction, editor.getBody(), range);
    if (isBeforeContentEditableFalseFn(caretPosition)) {
        return CefUtils.selectNode(editor, caretPosition.getNode(!forwards));
    }
    caretPosition = getNextPosFn(caretPosition);
    if (!caretPosition) {
        if (rangeIsInContainerBlock) {
            return range;
        }
        return null;
    }
    if (isBeforeContentEditableFalseFn(caretPosition)) {
        return CefUtils.showCaret(direction, editor, caretPosition.getNode(!forwards), forwards);
    }
    // Peek ahead for handling of ab|c<span cE=false> -> abc|<span cE=false>
    peekCaretPosition = getNextPosFn(caretPosition);
    if (isBeforeContentEditableFalseFn(peekCaretPosition)) {
        if (isMoveInsideSameBlock(caretPosition, peekCaretPosition)) {
            return CefUtils.showCaret(direction, editor, peekCaretPosition.getNode(!forwards), forwards);
        }
    }
    if (rangeIsInContainerBlock) {
        return CefUtils.renderRangeCaret(editor, caretPosition.toRange());
    }
    return null;
};
var moveToCeFalseVertically = function (direction, editor, walkerFn, range) {
    var caretPosition, linePositions, nextLinePositions;
    var closestNextLineRect, caretClientRect, clientX;
    var dist1, dist2, contentEditableFalseNode;
    contentEditableFalseNode = getSelectedNode(range);
    caretPosition = CaretUtils.getNormalizedRangeEndPoint(direction, editor.getBody(), range);
    linePositions = walkerFn(editor.getBody(), LineWalker.isAboveLine(1), caretPosition);
    nextLinePositions = Arr.filter(linePositions, LineWalker.isLine(1));
    caretClientRect = Arr.last(caretPosition.getClientRects());
    if (isBeforeContentEditableFalse(caretPosition) || CaretUtils.isBeforeTable(caretPosition)) {
        contentEditableFalseNode = caretPosition.getNode();
    }
    if (isAfterContentEditableFalse(caretPosition) || CaretUtils.isAfterTable(caretPosition)) {
        contentEditableFalseNode = caretPosition.getNode(true);
    }
    if (!caretClientRect) {
        return null;
    }
    clientX = caretClientRect.left;
    closestNextLineRect = LineUtils.findClosestClientRect(nextLinePositions, clientX);
    if (closestNextLineRect) {
        if (isContentEditableFalse(closestNextLineRect.node)) {
            dist1 = Math.abs(clientX - closestNextLineRect.left);
            dist2 = Math.abs(clientX - closestNextLineRect.right);
            return CefUtils.showCaret(direction, editor, closestNextLineRect.node, dist1 < dist2);
        }
    }
    if (contentEditableFalseNode) {
        var caretPositions = LineWalker.positionsUntil(direction, editor.getBody(), LineWalker.isAboveLine(1), contentEditableFalseNode);
        closestNextLineRect = LineUtils.findClosestClientRect(Arr.filter(caretPositions, LineWalker.isLine(1)), clientX);
        if (closestNextLineRect) {
            return CefUtils.renderRangeCaret(editor, closestNextLineRect.position.toRange());
        }
        closestNextLineRect = Arr.last(Arr.filter(caretPositions, LineWalker.isLine(0)));
        if (closestNextLineRect) {
            return CefUtils.renderRangeCaret(editor, closestNextLineRect.position.toRange());
        }
    }
};
var createTextBlock = function (editor) {
    var textBlock = editor.dom.create(editor.settings.forced_root_block);
    if (!Env.ie || Env.ie >= 11) {
        textBlock.innerHTML = '<br data-mce-bogus="1">';
    }
    return textBlock;
};
var exitPreBlock = function (editor, direction, range) {
    var pre, caretPos, newBlock;
    var caretWalker = CaretWalker(editor.getBody());
    var getNextVisualCaretPosition = Fun.curry(getVisualCaretPosition, caretWalker.next);
    var getPrevVisualCaretPosition = Fun.curry(getVisualCaretPosition, caretWalker.prev);
    if (range.collapsed && editor.settings.forced_root_block) {
        pre = editor.dom.getParent(range.startContainer, 'PRE');
        if (!pre) {
            return;
        }
        if (direction === 1) {
            caretPos = getNextVisualCaretPosition(CaretPosition.fromRangeStart(range));
        }
        else {
            caretPos = getPrevVisualCaretPosition(CaretPosition.fromRangeStart(range));
        }
        if (!caretPos) {
            newBlock = createTextBlock(editor);
            if (direction === 1) {
                editor.$(pre).after(newBlock);
            }
            else {
                editor.$(pre).before(newBlock);
            }
            editor.selection.select(newBlock, true);
            editor.selection.collapse();
        }
    }
};
var getHorizontalRange = function (editor, forward) {
    var caretWalker = CaretWalker(editor.getBody());
    var getNextVisualCaretPosition = Fun.curry(getVisualCaretPosition, caretWalker.next);
    var getPrevVisualCaretPosition = Fun.curry(getVisualCaretPosition, caretWalker.prev);
    var newRange;
    var direction = forward ? HDirection.Forwards : HDirection.Backwards;
    var getNextPosFn = forward ? getNextVisualCaretPosition : getPrevVisualCaretPosition;
    var range = editor.selection.getRng();
    newRange = moveToCeFalseHorizontally(direction, editor, getNextPosFn, range);
    if (newRange) {
        return newRange;
    }
    newRange = exitPreBlock(editor, direction, range);
    if (newRange) {
        return newRange;
    }
    return null;
};
var getVerticalRange = function (editor, down) {
    var newRange;
    var direction = down ? 1 : -1;
    var walkerFn = down ? LineWalker.downUntil : LineWalker.upUntil;
    var range = editor.selection.getRng();
    newRange = moveToCeFalseVertically(direction, editor, walkerFn, range);
    if (newRange) {
        return newRange;
    }
    newRange = exitPreBlock(editor, direction, range);
    if (newRange) {
        return newRange;
    }
    return null;
};
var moveH = function (editor, forward) {
    return function () {
        var newRng = getHorizontalRange(editor, forward);
        if (newRng) {
            editor.selection.setRng(newRng);
            return true;
        }
        else {
            return false;
        }
    };
};
var moveV = function (editor, down) {
    return function () {
        var newRng = getVerticalRange(editor, down);
        if (newRng) {
            editor.selection.setRng(newRng);
            return true;
        }
        else {
            return false;
        }
    };
};
export { moveH, moveV };
//# sourceMappingURL=CefNavigation.js.map