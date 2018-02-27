/**
 * LineReader.ts
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2018 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Arr, Fun, Option, Options } from '@ephox/katamari';
import { HDirection, CaretWalker } from 'tinymce/core/caret/CaretWalker';
import * as ClientRect from 'tinymce/core/geom/ClientRect';
import CaretFinder from 'tinymce/core/caret/CaretFinder';
import NodeType from 'tinymce/core/dom/NodeType';
import { isInSameBlock } from 'tinymce/core/caret/CaretUtils';
export var BreakType;
(function (BreakType) {
    BreakType[BreakType["Br"] = 0] = "Br";
    BreakType[BreakType["Block"] = 1] = "Block";
    BreakType[BreakType["Wrap"] = 2] = "Wrap";
    BreakType[BreakType["Eol"] = 3] = "Eol";
})(BreakType || (BreakType = {}));
var isAbove = function (pos1, pos2) {
    return Options.liftN([Arr.head(pos2.getClientRects()), Arr.last(pos1.getClientRects())], ClientRect.isAbove).getOr(false);
};
var isBelow = function (pos1, pos2) {
    return Options.liftN([Arr.last(pos2.getClientRects()), Arr.head(pos1.getClientRects())], function (r1, r2) { return ClientRect.isBelow(r1, r2); }).getOr(false);
};
var flip = function (direction, positions) { return direction === HDirection.Backwards ? positions.reverse() : positions; };
var walk = function (direction, caretWalker, pos) {
    return direction === HDirection.Forwards ? caretWalker.next(pos) : caretWalker.prev(pos);
};
var getBreakType = function (scope, direction, currentPos, nextPos) {
    if (NodeType.isBr(nextPos.getNode(direction === HDirection.Forwards))) {
        return BreakType.Br;
    }
    else if (isInSameBlock(currentPos, nextPos) === false) {
        return BreakType.Block;
    }
    else {
        return BreakType.Wrap;
    }
};
var getPositionsUntil = function (predicate, direction, scope, start) {
    var caretWalker = CaretWalker(scope);
    var currentPos = start, nextPos;
    var positions = [];
    while (currentPos) {
        nextPos = walk(direction, caretWalker, currentPos);
        if (!nextPos) {
            break;
        }
        if (NodeType.isBr(nextPos.getNode(false))) {
            if (direction === HDirection.Forwards) {
                return { positions: flip(direction, positions).concat([nextPos]), breakType: BreakType.Br, breakAt: Option.some(nextPos) };
            }
            else {
                return { positions: flip(direction, positions), breakType: BreakType.Br, breakAt: Option.some(nextPos) };
            }
        }
        if (!nextPos.isVisible()) {
            currentPos = nextPos;
            continue;
        }
        if (predicate(currentPos, nextPos)) {
            var breakType = getBreakType(scope, direction, currentPos, nextPos);
            return { positions: flip(direction, positions), breakType: breakType, breakAt: Option.some(nextPos) };
        }
        positions.push(nextPos);
        currentPos = nextPos;
    }
    return { positions: flip(direction, positions), breakType: BreakType.Eol, breakAt: Option.none() };
};
var getAdjacentLinePositions = function (direction, getPositionsUntilBreak, scope, start) {
    return getPositionsUntilBreak(scope, start).breakAt.map(function (pos) {
        var positions = getPositionsUntilBreak(scope, pos).positions;
        return direction === HDirection.Backwards ? positions.concat(pos) : [pos].concat(positions);
    }).getOr([]);
};
var findClosestHorizontalPositionFromPoint = function (positions, x) {
    return Arr.foldl(positions, function (acc, newPos) {
        return acc.fold(function () { return Option.some(newPos); }, function (lastPos) {
            return Options.liftN([Arr.head(lastPos.getClientRects()), Arr.head(newPos.getClientRects())], function (lastRect, newRect) {
                var lastDist = Math.abs(x - lastRect.left);
                var newDist = Math.abs(x - newRect.left);
                return newDist <= lastDist ? newPos : lastPos;
            }).or(acc);
        });
    }, Option.none());
};
var findClosestHorizontalPosition = function (positions, pos) {
    return Arr.head(pos.getClientRects()).bind(function (targetRect) {
        return findClosestHorizontalPositionFromPoint(positions, targetRect.left);
    });
};
var getPositionsUntilPreviousLine = Fun.curry(getPositionsUntil, isAbove, -1);
var getPositionsUntilNextLine = Fun.curry(getPositionsUntil, isBelow, 1);
var isAtFirstLine = function (scope, pos) { return getPositionsUntilPreviousLine(scope, pos).breakAt.isNone(); };
var isAtLastLine = function (scope, pos) { return getPositionsUntilNextLine(scope, pos).breakAt.isNone(); };
var getPositionsAbove = Fun.curry(getAdjacentLinePositions, -1, getPositionsUntilPreviousLine);
var getPositionsBelow = Fun.curry(getAdjacentLinePositions, 1, getPositionsUntilNextLine);
var getFirstLinePositions = function (scope) { return CaretFinder.firstPositionIn(scope).map(function (pos) {
    return [pos].concat(getPositionsUntilNextLine(scope, pos).positions);
}).getOr([]); };
var getLastLinePositions = function (scope) { return CaretFinder.lastPositionIn(scope).map(function (pos) {
    return getPositionsUntilPreviousLine(scope, pos).positions.concat(pos);
}).getOr([]); };
var getClosestPositionAbove = function (scope, pos) {
    return findClosestHorizontalPosition(getPositionsAbove(scope, pos), pos);
};
var getClosestPositionBelow = function (scope, pos) {
    return findClosestHorizontalPosition(getPositionsBelow(scope, pos), pos);
};
export { getPositionsUntilPreviousLine, getPositionsUntilNextLine, isAtFirstLine, isAtLastLine, getPositionsAbove, getPositionsBelow, findClosestHorizontalPosition, findClosestHorizontalPositionFromPoint, getFirstLinePositions, getLastLinePositions, getClosestPositionAbove, getClosestPositionBelow };
//# sourceMappingURL=LineReader.js.map