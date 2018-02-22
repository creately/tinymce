/**
 * CaretFinder.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Fun, Option } from '@ephox/katamari';
import * as CaretCandidate from './CaretCandidate';
import CaretPosition from './CaretPosition';
import * as CaretUtils from './CaretUtils';
import { CaretWalker } from './CaretWalker';
import NodeType from '../dom/NodeType';
var walkToPositionIn = function (forward, root, start) {
    var position = forward ? CaretPosition.before(start) : CaretPosition.after(start);
    return fromPosition(forward, root, position);
};
var afterElement = function (node) {
    return NodeType.isBr(node) ? CaretPosition.before(node) : CaretPosition.after(node);
};
var isBeforeOrStart = function (position) {
    if (CaretPosition.isTextPosition(position)) {
        return position.offset() === 0;
    }
    else {
        return CaretCandidate.isCaretCandidate(position.getNode());
    }
};
var isAfterOrEnd = function (position) {
    if (CaretPosition.isTextPosition(position)) {
        var container = position.container();
        return position.offset() === container.data.length;
    }
    else {
        return CaretCandidate.isCaretCandidate(position.getNode(true));
    }
};
var isBeforeAfterSameElement = function (from, to) {
    return !CaretPosition.isTextPosition(from) && !CaretPosition.isTextPosition(to) && from.getNode() === to.getNode(true);
};
var isAtBr = function (position) {
    return !CaretPosition.isTextPosition(position) && NodeType.isBr(position.getNode());
};
var shouldSkipPosition = function (forward, from, to) {
    if (forward) {
        return !isBeforeAfterSameElement(from, to) && !isAtBr(from) && isAfterOrEnd(from) && isBeforeOrStart(to);
    }
    else {
        return !isBeforeAfterSameElement(to, from) && isBeforeOrStart(from) && isAfterOrEnd(to);
    }
};
// Finds: <p>a|<b>b</b></p> -> <p>a<b>|b</b></p>
var fromPosition = function (forward, root, pos) {
    var walker = CaretWalker(root);
    return Option.from(forward ? walker.next(pos) : walker.prev(pos));
};
// Finds: <p>a|<b>b</b></p> -> <p>a<b>b|</b></p>
var navigate = function (forward, root, from) {
    return fromPosition(forward, root, from).bind(function (to) {
        if (CaretUtils.isInSameBlock(from, to, root) && shouldSkipPosition(forward, from, to)) {
            return fromPosition(forward, root, to);
        }
        else {
            return Option.some(to);
        }
    });
};
var positionIn = function (forward, element) {
    var startNode = forward ? element.firstChild : element.lastChild;
    if (NodeType.isText(startNode)) {
        return Option.some(CaretPosition(startNode, forward ? 0 : startNode.data.length));
    }
    else if (startNode) {
        if (CaretCandidate.isCaretCandidate(startNode)) {
            return Option.some(forward ? CaretPosition.before(startNode) : afterElement(startNode));
        }
        else {
            return walkToPositionIn(forward, element, startNode);
        }
    }
    else {
        return Option.none();
    }
};
export default {
    fromPosition: fromPosition,
    nextPosition: Fun.curry(fromPosition, true),
    prevPosition: Fun.curry(fromPosition, false),
    navigate: navigate,
    positionIn: positionIn,
    firstPositionIn: Fun.curry(positionIn, true),
    lastPositionIn: Fun.curry(positionIn, false)
};
//# sourceMappingURL=CaretFinder.js.map