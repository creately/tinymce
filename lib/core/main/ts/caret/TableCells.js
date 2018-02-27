/**
 * TableCells.ts
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2018 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Element, SelectorFilter } from '@ephox/sugar';
import { Arr, Fun, Option } from '@ephox/katamari';
import { findClosestHorizontalPosition, getLastLinePositions, getFirstLinePositions } from 'tinymce/core/caret/LineReader';
var deflate = function (rect, delta) {
    return {
        left: rect.left - delta,
        top: rect.top - delta,
        right: rect.right + delta * 2,
        bottom: rect.bottom + delta * 2,
        width: rect.width + delta,
        height: rect.height + delta
    };
};
var getCorners = function (getYAxisValue, tds) {
    return Arr.bind(tds, function (td) {
        var rect = deflate(td.getBoundingClientRect(), -1);
        return [
            { x: rect.left, y: getYAxisValue(rect), cell: td },
            { x: rect.right, y: getYAxisValue(rect), cell: td }
        ];
    });
};
var findClosestCorner = function (corners, x, y) {
    return Arr.foldl(corners, function (acc, newCorner) {
        return acc.fold(function () { return Option.some(newCorner); }, function (oldCorner) {
            var oldDist = Math.sqrt(Math.abs(oldCorner.x - x) + Math.abs(oldCorner.y - y));
            var newDist = Math.sqrt(Math.abs(newCorner.x - x) + Math.abs(newCorner.y - y));
            return Option.some(newDist < oldDist ? newCorner : oldCorner);
        });
    }, Option.none());
};
var getClosestCell = function (getYAxisValue, isTargetCorner, table, x, y) {
    var cells = SelectorFilter.descendants(Element.fromDom(table), 'td,th').map(function (e) { return e.dom(); });
    var corners = Arr.filter(getCorners(getYAxisValue, cells), function (corner) { return isTargetCorner(corner, y); });
    return findClosestCorner(corners, x, y).map(function (corner) {
        return corner.cell;
    });
};
var getBottomValue = function (rect) { return rect.bottom; };
var getTopValue = function (rect) { return rect.top; };
var isAbove = function (corner, y) { return corner.y < y; };
var isBelow = function (corner, y) { return corner.y > y; };
var getClosestCellAbove = Fun.curry(getClosestCell, getBottomValue, isAbove);
var getClosestCellBelow = Fun.curry(getClosestCell, getTopValue, isBelow);
var findClosestPositionInAboveCell = function (table, pos) {
    return Arr.head(pos.getClientRects()).bind(function (rect) {
        return getClosestCellAbove(table, rect.left, rect.top);
    }).bind(function (cell) { return findClosestHorizontalPosition(getLastLinePositions(cell), pos); });
};
var findClosestPositionInBelowCell = function (table, pos) {
    return Arr.last(pos.getClientRects()).bind(function (rect) {
        return getClosestCellBelow(table, rect.left, rect.top);
    }).bind(function (cell) { return findClosestHorizontalPosition(getFirstLinePositions(cell), pos); });
};
export { getClosestCellAbove, getClosestCellBelow, findClosestPositionInAboveCell, findClosestPositionInBelowCell };
//# sourceMappingURL=TableCells.js.map