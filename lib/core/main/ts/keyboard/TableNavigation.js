/**
 * TableNavigation.ts
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2018 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import CaretFinder from '../caret/CaretFinder';
import CaretPosition from '../caret/CaretPosition';
import * as CefUtils from '../keyboard/CefUtils';
import { Arr, Option } from '@ephox/katamari';
import { PlatformDetection } from '@ephox/sand';
import { getPositionsAbove, findClosestHorizontalPositionFromPoint, getPositionsBelow, getPositionsUntilPreviousLine, getPositionsUntilNextLine, BreakType } from 'tinymce/core/caret/LineReader';
import { findClosestPositionInAboveCell, findClosestPositionInBelowCell } from 'tinymce/core/caret/TableCells';
import Fun from 'tinymce/core/util/Fun';
var browser = PlatformDetection.detect().browser;
var isFakeCaretTableBrowser = function () { return browser.isIE() || browser.isEdge() || browser.isFirefox(); };
var isAtTableCellLine = function (getPositionsUntil, scope, pos) {
    var lineInfo = getPositionsUntil(scope, pos);
    // Since we can't determine if the caret is on the above or below line in a word wrap break we asume it's always
    // on the below/above line based on direction. This will make the caret jump one line if you are at the end of the last
    // line and moving down or at the beginning of the second line moving up.
    if (lineInfo.breakType === BreakType.Wrap && lineInfo.positions.length === 0) {
        return lineInfo.breakAt.map(function (breakPos) { return getPositionsUntil(scope, breakPos).breakAt.isNone(); }).getOr(true);
    }
    else {
        return lineInfo.breakAt.isNone();
    }
};
var isAtFirstTableCellLine = Fun.curry(isAtTableCellLine, getPositionsUntilPreviousLine);
var isAtLastTableCellLine = Fun.curry(isAtTableCellLine, getPositionsUntilNextLine);
var isCaretAtStartOrEndOfTable = function (forward, rng, table) {
    var caretPos = CaretPosition.fromRangeStart(rng);
    return CaretFinder.positionIn(!forward, table).map(function (pos) { return pos.isEqual(caretPos); }).getOr(false);
};
var navigateHorizontally = function (editor, forward, table, td) {
    var rng = editor.selection.getRng();
    var direction = forward ? 1 : -1;
    if (isFakeCaretTableBrowser() && isCaretAtStartOrEndOfTable(forward, rng, table)) {
        var newRng = CefUtils.showCaret(direction, editor, table, !forward);
        editor.selection.setRng(newRng);
        return true;
    }
    return false;
};
var getClosestAbovePosition = function (root, table, start) {
    return findClosestPositionInAboveCell(table, start).orThunk(function () {
        return Arr.head(start.getClientRects()).bind(function (rect) {
            return findClosestHorizontalPositionFromPoint(getPositionsAbove(root, CaretPosition.before(table)), rect.left);
        });
    }).getOr(CaretPosition.before(table));
};
var getClosestBelowPosition = function (root, table, start) {
    return findClosestPositionInBelowCell(table, start).orThunk(function () {
        return Arr.head(start.getClientRects()).bind(function (rect) {
            return findClosestHorizontalPositionFromPoint(getPositionsBelow(root, CaretPosition.after(table)), rect.left);
        });
    }).getOr(CaretPosition.after(table));
};
var navigateVertically = function (editor, down, table, td) {
    var rng = editor.selection.getRng();
    var pos = CaretPosition.fromRangeStart(rng);
    var root = editor.getBody();
    if (!down && isAtFirstTableCellLine(td, pos)) {
        var newPos = getClosestAbovePosition(root, table, pos);
        editor.selection.setRng(newPos.toRange());
        return true;
    }
    else if (down && isAtLastTableCellLine(td, pos)) {
        var newPos = getClosestBelowPosition(root, table, pos);
        editor.selection.setRng(newPos.toRange());
        return true;
    }
    else {
        return false;
    }
};
var moveH = function (editor, forward) {
    return function () {
        return Option.from(editor.dom.getParent(editor.selection.getNode(), 'td,th')).bind(function (td) {
            return Option.from(editor.dom.getParent(td, 'table')).map(function (table) {
                return navigateHorizontally(editor, forward, table, td);
            });
        }).getOr(false);
    };
};
var moveV = function (editor, forward) {
    return function () {
        return Option.from(editor.dom.getParent(editor.selection.getNode(), 'td,th')).bind(function (td) {
            return Option.from(editor.dom.getParent(td, 'table')).map(function (table) {
                return navigateVertically(editor, forward, table, td);
            });
        }).getOr(false);
    };
};
export { isFakeCaretTableBrowser, moveH, moveV };
//# sourceMappingURL=TableNavigation.js.map