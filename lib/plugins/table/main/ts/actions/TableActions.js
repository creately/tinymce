/**
 * TableActions.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Arr, Fun, Option } from '@ephox/katamari';
import { CellMutations, TableDirection, TableFill, TableGridSize, TableOperations } from '@ephox/snooker';
import { Attr, Element, Node, SelectorFilter } from '@ephox/sugar';
import Util from '../alien/Util';
import Direction from '../queries/Direction';
import { getCloneElements } from '../api/Settings';
import { fireNewCell, fireNewRow } from '../api/Events';
export default function (editor, lazyWire) {
    var isTableBody = function (editor) {
        return Node.name(Util.getBody(editor)) === 'table';
    };
    var lastRowGuard = function (table) {
        var size = TableGridSize.getGridSize(table);
        return isTableBody(editor) === false || size.rows() > 1;
    };
    var lastColumnGuard = function (table) {
        var size = TableGridSize.getGridSize(table);
        return isTableBody(editor) === false || size.columns() > 1;
    };
    // Option.none gives the default cloneFormats.
    var cloneFormats = getCloneElements(editor);
    var execute = function (operation, guard, mutate, lazyWire) {
        return function (table, target) {
            var dataStyleCells = SelectorFilter.descendants(table, 'td[data-mce-style],th[data-mce-style]');
            Arr.each(dataStyleCells, function (cell) {
                Attr.remove(cell, 'data-mce-style');
            });
            var wire = lazyWire();
            var doc = Element.fromDom(editor.getDoc());
            var direction = TableDirection(Direction.directionAt);
            var generators = TableFill.cellOperations(mutate, doc, cloneFormats);
            return guard(table) ? operation(wire, table, target, generators, direction).bind(function (result) {
                Arr.each(result.newRows(), function (row) {
                    fireNewRow(editor, row.dom());
                });
                Arr.each(result.newCells(), function (cell) {
                    fireNewCell(editor, cell.dom());
                });
                return result.cursor().map(function (cell) {
                    var rng = editor.dom.createRng();
                    rng.setStart(cell.dom(), 0);
                    rng.setEnd(cell.dom(), 0);
                    return rng;
                });
            }) : Option.none();
        };
    };
    var deleteRow = execute(TableOperations.eraseRows, lastRowGuard, Fun.noop, lazyWire);
    var deleteColumn = execute(TableOperations.eraseColumns, lastColumnGuard, Fun.noop, lazyWire);
    var insertRowsBefore = execute(TableOperations.insertRowsBefore, Fun.always, Fun.noop, lazyWire);
    var insertRowsAfter = execute(TableOperations.insertRowsAfter, Fun.always, Fun.noop, lazyWire);
    var insertColumnsBefore = execute(TableOperations.insertColumnsBefore, Fun.always, CellMutations.halve, lazyWire);
    var insertColumnsAfter = execute(TableOperations.insertColumnsAfter, Fun.always, CellMutations.halve, lazyWire);
    var mergeCells = execute(TableOperations.mergeCells, Fun.always, Fun.noop, lazyWire);
    var unmergeCells = execute(TableOperations.unmergeCells, Fun.always, Fun.noop, lazyWire);
    var pasteRowsBefore = execute(TableOperations.pasteRowsBefore, Fun.always, Fun.noop, lazyWire);
    var pasteRowsAfter = execute(TableOperations.pasteRowsAfter, Fun.always, Fun.noop, lazyWire);
    var pasteCells = execute(TableOperations.pasteCells, Fun.always, Fun.noop, lazyWire);
    return {
        deleteRow: deleteRow,
        deleteColumn: deleteColumn,
        insertRowsBefore: insertRowsBefore,
        insertRowsAfter: insertRowsAfter,
        insertColumnsBefore: insertColumnsBefore,
        insertColumnsAfter: insertColumnsAfter,
        mergeCells: mergeCells,
        unmergeCells: unmergeCells,
        pasteRowsBefore: pasteRowsBefore,
        pasteRowsAfter: pasteRowsAfter,
        pasteCells: pasteCells
    };
}
//# sourceMappingURL=TableActions.js.map