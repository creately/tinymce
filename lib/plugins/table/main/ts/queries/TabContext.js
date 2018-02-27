/**
 * TabContext.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Arr, Option } from '@ephox/katamari';
import { CellNavigation, TableLookup } from '@ephox/snooker';
import { Compare, CursorPosition, Element, Node, Selection, SelectorFilter, SelectorFind, WindowSelection } from '@ephox/sugar';
import VK from 'tinymce/core/api/util/VK';
import Util from '../alien/Util';
import TableTargets from './TableTargets';
var forward = function (editor, isRoot, cell, lazyWire) {
    return go(editor, isRoot, CellNavigation.next(cell), lazyWire);
};
var backward = function (editor, isRoot, cell, lazyWire) {
    return go(editor, isRoot, CellNavigation.prev(cell), lazyWire);
};
var getCellFirstCursorPosition = function (editor, cell) {
    var selection = Selection.exact(cell, 0, cell, 0);
    return WindowSelection.toNative(selection);
};
var getNewRowCursorPosition = function (editor, table) {
    var rows = SelectorFilter.descendants(table, 'tr');
    return Arr.last(rows).bind(function (last) {
        return SelectorFind.descendant(last, 'td,th').map(function (first) {
            return getCellFirstCursorPosition(editor, first);
        });
    });
};
var go = function (editor, isRoot, cell, actions, lazyWire) {
    return cell.fold(Option.none, Option.none, function (current, next) {
        return CursorPosition.first(next).map(function (cell) {
            return getCellFirstCursorPosition(editor, cell);
        });
    }, function (current) {
        return TableLookup.table(current, isRoot).bind(function (table) {
            var targets = TableTargets.noMenu(current);
            editor.undoManager.transact(function () {
                actions.insertRowsAfter(table, targets);
            });
            return getNewRowCursorPosition(editor, table);
        });
    });
};
var rootElements = ['table', 'li', 'dl'];
var handle = function (event, editor, actions, lazyWire) {
    if (event.keyCode === VK.TAB) {
        var body_1 = Util.getBody(editor);
        var isRoot_1 = function (element) {
            var name = Node.name(element);
            return Compare.eq(element, body_1) || Arr.contains(rootElements, name);
        };
        var rng = editor.selection.getRng();
        if (rng.collapsed) {
            var start = Element.fromDom(rng.startContainer);
            TableLookup.cell(start, isRoot_1).each(function (cell) {
                event.preventDefault();
                var navigation = event.shiftKey ? backward : forward;
                var rng = navigation(editor, isRoot_1, cell, actions, lazyWire);
                rng.each(function (range) {
                    editor.selection.setRng(range);
                });
            });
        }
    }
};
export default {
    handle: handle
};
//# sourceMappingURL=TabContext.js.map