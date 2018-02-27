/**
 * TableDeleteAction.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2018 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Adt, Arr, Fun, Option, Options, Struct } from '@ephox/katamari';
import { Compare, Element, SelectorFilter, SelectorFind } from '@ephox/sugar';
var tableCellRng = Struct.immutable('start', 'end');
var tableSelection = Struct.immutable('rng', 'table', 'cells');
var deleteAction = Adt.generate([
    { removeTable: ['element'] },
    { emptyCells: ['cells'] }
]);
var isRootFromElement = function (root) { return Fun.curry(Compare.eq, root); };
var getClosestCell = function (container, isRoot) {
    return SelectorFind.closest(Element.fromDom(container), 'td,th', isRoot);
};
var getClosestTable = function (cell, isRoot) {
    return SelectorFind.ancestor(cell, 'table', isRoot);
};
var isExpandedCellRng = function (cellRng) {
    return Compare.eq(cellRng.start(), cellRng.end()) === false;
};
var getTableFromCellRng = function (cellRng, isRoot) {
    return getClosestTable(cellRng.start(), isRoot)
        .bind(function (startParentTable) {
        return getClosestTable(cellRng.end(), isRoot)
            .bind(function (endParentTable) {
            return Compare.eq(startParentTable, endParentTable) ? Option.some(startParentTable) : Option.none();
        });
    });
};
var getTableCells = function (table) { return SelectorFilter.descendants(table, 'td,th'); };
var getCellRangeFromStartTable = function (cellRng, isRoot) { return getClosestTable(cellRng.start(), isRoot).bind(function (table) {
    return Arr.last(getTableCells(table)).map(function (endCell) { return tableCellRng(cellRng.start(), endCell); });
}); };
var partialSelection = function (isRoot, rng) {
    var startCell = getClosestCell(rng.startContainer, isRoot);
    var endCell = getClosestCell(rng.endContainer, isRoot);
    return rng.collapsed ? Option.none() : Options.liftN([startCell, endCell], tableCellRng).fold(function () { return startCell.fold(function () { return endCell.bind(function (endCell) { return getClosestTable(endCell, isRoot).bind(function (table) {
        return Arr.head(getTableCells(table)).map(function (startCell) { return tableCellRng(startCell, endCell); });
    }); }); }, function (startCell) { return getClosestTable(startCell, isRoot).bind(function (table) {
        return Arr.last(getTableCells(table)).map(function (endCell) { return tableCellRng(startCell, endCell); });
    }); }); }, function (cellRng) { return isWithinSameTable(isRoot, cellRng) ? Option.none() : getCellRangeFromStartTable(cellRng, isRoot); });
};
var isWithinSameTable = function (isRoot, cellRng) { return getTableFromCellRng(cellRng, isRoot).isSome(); };
var getCellRng = function (rng, isRoot) {
    var startCell = getClosestCell(rng.startContainer, isRoot);
    var endCell = getClosestCell(rng.endContainer, isRoot);
    return Options.liftN([startCell, endCell], tableCellRng)
        .filter(isExpandedCellRng)
        .filter(function (cellRng) { return isWithinSameTable(isRoot, cellRng); })
        .orThunk(function () { return partialSelection(isRoot, rng); });
};
var getTableSelectionFromCellRng = function (cellRng, isRoot) {
    return getTableFromCellRng(cellRng, isRoot).map(function (table) { return tableSelection(cellRng, table, getTableCells(table)); });
};
var getTableSelectionFromRng = function (root, rng) {
    var isRoot = isRootFromElement(root);
    return getCellRng(rng, isRoot).bind(function (cellRng) { return getTableSelectionFromCellRng(cellRng, isRoot); });
};
var getCellIndex = function (cells, cell) {
    return Arr.findIndex(cells, function (x) { return Compare.eq(x, cell); });
};
var getSelectedCells = function (tableSelection) {
    return Options.liftN([
        getCellIndex(tableSelection.cells(), tableSelection.rng().start()),
        getCellIndex(tableSelection.cells(), tableSelection.rng().end())
    ], function (startIndex, endIndex) {
        return tableSelection.cells().slice(startIndex, endIndex + 1);
    });
};
var getAction = function (tableSelection) {
    return getSelectedCells(tableSelection)
        .map(function (selected) {
        var cells = tableSelection.cells();
        return selected.length === cells.length ? deleteAction.removeTable(tableSelection.table()) : deleteAction.emptyCells(selected);
    });
};
var getActionFromCells = function (cells) { return deleteAction.emptyCells(cells); };
var getActionFromRange = function (root, rng) { return getTableSelectionFromRng(root, rng).bind(getAction); };
export default {
    getActionFromRange: getActionFromRange,
    getActionFromCells: getActionFromCells
};
//# sourceMappingURL=TableDeleteAction.js.map