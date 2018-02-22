/**
 * LineWalker.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import Arr from '../util/Arr';
import * as Dimensions from '../dom/Dimensions';
import * as CaretCandidate from './CaretCandidate';
import * as CaretUtils from './CaretUtils';
import { CaretWalker } from './CaretWalker';
import CaretPosition from './CaretPosition';
import * as ClientRect from '../geom/ClientRect';
import { Fun } from '@ephox/katamari';
export var VDirection;
(function (VDirection) {
    VDirection[VDirection["Up"] = -1] = "Up";
    VDirection[VDirection["Down"] = 1] = "Down";
})(VDirection || (VDirection = {}));
var findUntil = function (direction, root, predicateFn, node) {
    while ((node = CaretUtils.findNode(node, direction, CaretCandidate.isEditableCaretCandidate, root))) {
        if (predicateFn(node)) {
            return;
        }
    }
};
var walkUntil = function (direction, isAboveFn, isBeflowFn, root, predicateFn, caretPosition) {
    var line = 0, node;
    var result = [];
    var targetClientRect;
    var add = function (node) {
        var i, clientRect, clientRects;
        clientRects = Dimensions.getClientRects([node]);
        if (direction === -1) {
            clientRects = clientRects.reverse();
        }
        for (i = 0; i < clientRects.length; i++) {
            clientRect = clientRects[i];
            if (isBeflowFn(clientRect, targetClientRect)) {
                continue;
            }
            if (result.length > 0 && isAboveFn(clientRect, Arr.last(result))) {
                line++;
            }
            clientRect.line = line;
            if (predicateFn(clientRect)) {
                return true;
            }
            result.push(clientRect);
        }
    };
    targetClientRect = Arr.last(caretPosition.getClientRects());
    if (!targetClientRect) {
        return result;
    }
    node = caretPosition.getNode();
    add(node);
    findUntil(direction, root, add, node);
    return result;
};
var aboveLineNumber = function (lineNumber, clientRect) { return clientRect.line > lineNumber; };
var isLineNumber = function (lineNumber, clientRect) { return clientRect.line === lineNumber; };
var upUntil = Fun.curry(walkUntil, VDirection.Up, ClientRect.isAbove, ClientRect.isBelow);
var downUntil = Fun.curry(walkUntil, VDirection.Down, ClientRect.isBelow, ClientRect.isAbove);
var positionsUntil = function (direction, root, predicateFn, node) {
    var caretWalker = CaretWalker(root);
    var walkFn, isBelowFn, isAboveFn, caretPosition;
    var result = [];
    var line = 0, clientRect, targetClientRect;
    var getClientRect = function (caretPosition) {
        if (direction === 1) {
            return Arr.last(caretPosition.getClientRects());
        }
        return Arr.last(caretPosition.getClientRects());
    };
    if (direction === 1) {
        walkFn = caretWalker.next;
        isBelowFn = ClientRect.isBelow;
        isAboveFn = ClientRect.isAbove;
        caretPosition = CaretPosition.after(node);
    }
    else {
        walkFn = caretWalker.prev;
        isBelowFn = ClientRect.isAbove;
        isAboveFn = ClientRect.isBelow;
        caretPosition = CaretPosition.before(node);
    }
    targetClientRect = getClientRect(caretPosition);
    do {
        if (!caretPosition.isVisible()) {
            continue;
        }
        clientRect = getClientRect(caretPosition);
        if (isAboveFn(clientRect, targetClientRect)) {
            continue;
        }
        if (result.length > 0 && isBelowFn(clientRect, Arr.last(result))) {
            line++;
        }
        clientRect = ClientRect.clone(clientRect);
        clientRect.position = caretPosition;
        clientRect.line = line;
        if (predicateFn(clientRect)) {
            return result;
        }
        result.push(clientRect);
    } while ((caretPosition = walkFn(caretPosition)));
    return result;
};
var isAboveLine = function (lineNumber) { return function (clientRect) { return aboveLineNumber(lineNumber, clientRect); }; };
var isLine = function (lineNumber) { return function (clientRect) { return isLineNumber(lineNumber, clientRect); }; };
export { upUntil, downUntil, positionsUntil, isAboveLine, isLine };
//# sourceMappingURL=LineWalker.js.map