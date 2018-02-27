/**
 * LineUtils.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import Arr from '../util/Arr';
import NodeType from '../dom/NodeType';
import { getClientRects } from '../dom/Dimensions';
import * as ClientRect from '../geom/ClientRect';
import * as CaretUtils from './CaretUtils';
import * as CaretCandidate from './CaretCandidate';
import { Fun } from '@ephox/katamari';
import { VDirection } from 'tinymce/core/caret/LineWalker';
import { isFakeCaretTarget } from 'tinymce/core/caret/FakeCaret';
var isContentEditableFalse = NodeType.isContentEditableFalse;
var findNode = CaretUtils.findNode;
var distanceToRectLeft = function (clientRect, clientX) { return Math.abs(clientRect.left - clientX); };
var distanceToRectRight = function (clientRect, clientX) { return Math.abs(clientRect.right - clientX); };
var isInside = function (clientX, clientRect) { return clientX >= clientRect.left && clientX <= clientRect.right; };
var findClosestClientRect = function (clientRects, clientX) {
    return Arr.reduce(clientRects, function (oldClientRect, clientRect) {
        var oldDistance, newDistance;
        oldDistance = Math.min(distanceToRectLeft(oldClientRect, clientX), distanceToRectRight(oldClientRect, clientX));
        newDistance = Math.min(distanceToRectLeft(clientRect, clientX), distanceToRectRight(clientRect, clientX));
        if (isInside(clientX, clientRect)) {
            return clientRect;
        }
        if (isInside(clientX, oldClientRect)) {
            return oldClientRect;
        }
        // cE=false has higher priority
        if (newDistance === oldDistance && isContentEditableFalse(clientRect.node)) {
            return clientRect;
        }
        if (newDistance < oldDistance) {
            return clientRect;
        }
        return oldClientRect;
    });
};
var walkUntil = function (direction, root, predicateFn, node) {
    while ((node = findNode(node, direction, CaretCandidate.isEditableCaretCandidate, root))) {
        if (predicateFn(node)) {
            return;
        }
    }
};
var findLineNodeRects = function (root, targetNodeRect) {
    var clientRects = [];
    var collect = function (checkPosFn, node) {
        var lineRects;
        lineRects = Arr.filter(getClientRects([node]), function (clientRect) {
            return !checkPosFn(clientRect, targetNodeRect);
        });
        clientRects = clientRects.concat(lineRects);
        return lineRects.length === 0;
    };
    clientRects.push(targetNodeRect);
    walkUntil(VDirection.Up, root, Fun.curry(collect, ClientRect.isAbove), targetNodeRect.node);
    walkUntil(VDirection.Down, root, Fun.curry(collect, ClientRect.isBelow), targetNodeRect.node);
    return clientRects;
};
var getFakeCaretTargets = function (root) {
    return Arr.filter(Arr.toArray(root.getElementsByTagName('*')), isFakeCaretTarget);
};
var caretInfo = function (clientRect, clientX) {
    return {
        node: clientRect.node,
        before: distanceToRectLeft(clientRect, clientX) < distanceToRectRight(clientRect, clientX)
    };
};
var closestCaret = function (root, clientX, clientY) {
    var closestNodeRect;
    var contentEditableFalseNodeRects = getClientRects(getFakeCaretTargets(root));
    var targetNodeRects = Arr.filter(contentEditableFalseNodeRects, function (rect) { return clientY >= rect.top && clientY <= rect.bottom; });
    closestNodeRect = findClosestClientRect(targetNodeRects, clientX);
    if (closestNodeRect) {
        closestNodeRect = findClosestClientRect(findLineNodeRects(root, closestNodeRect), clientX);
        if (closestNodeRect && isFakeCaretTarget(closestNodeRect.node)) {
            return caretInfo(closestNodeRect, clientX);
        }
    }
    return null;
};
export { findClosestClientRect, findLineNodeRects, closestCaret };
//# sourceMappingURL=LineUtils.js.map