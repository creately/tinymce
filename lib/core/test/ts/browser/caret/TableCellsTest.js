import { Assertions, Chain, GeneralSteps, Logger, Pipeline } from '@ephox/agar';
import { Hierarchy, Element, SelectorFind } from '@ephox/sugar';
import { getClosestCellAbove, getClosestCellBelow, findClosestPositionInAboveCell, findClosestPositionInBelowCell } from 'tinymce/core/caret/TableCells';
import ViewBlock from '../../module/test/ViewBlock';
import { UnitTest } from '@ephox/bedrock';
import { CaretPosition } from 'tinymce/core/caret/CaretPosition';
UnitTest.asynctest('browser.tinymce.core.caret.TableCellsTest', function () {
    var success = arguments[arguments.length - 2];
    var failure = arguments[arguments.length - 1];
    var viewBlock = ViewBlock();
    var cSetHtml = function (html) {
        return Chain.op(function () {
            viewBlock.update(html.trim());
        });
    };
    var cAssertCell = function (path) {
        return Chain.op(function (cellOption) {
            var cell = cellOption.getOrDie('x');
            var expectedContainer = Hierarchy.follow(Element.fromDom(viewBlock.get()), path).getOrDie();
            Assertions.assertDomEq('Should be the expected element', expectedContainer, Element.fromDom(cell));
        });
    };
    var cAssertNone = Chain.op(function (pos) {
        Assertions.assertEq('Should be the none but got some', true, pos.isNone());
    });
    var cGetClosestCellAbove = function (x, y) {
        return Chain.mapper(function (viewBlock) {
            var table = SelectorFind.descendant(Element.fromDom(viewBlock.get()), 'table').getOrDie('Could not find table').dom();
            var rect = table.getBoundingClientRect();
            return getClosestCellAbove(table, rect.left + x, rect.top + y);
        });
    };
    var cGetClosestCellBelow = function (x, y) {
        return Chain.mapper(function (viewBlock) {
            var table = SelectorFind.descendant(Element.fromDom(viewBlock.get()), 'table').getOrDie('Could not find table').dom();
            var rect = table.getBoundingClientRect();
            return getClosestCellBelow(table, rect.left + x, rect.top + y);
        });
    };
    var cFindClosestPositionInAboveCell = function (path, offset) {
        return Chain.mapper(function (viewBlock) {
            var table = SelectorFind.descendant(Element.fromDom(viewBlock.get()), 'table').getOrDie('Could not find table').dom();
            var container = Hierarchy.follow(Element.fromDom(viewBlock.get()), path).getOrDie();
            var pos = CaretPosition(container.dom(), offset);
            return findClosestPositionInAboveCell(table, pos);
        });
    };
    var cFindClosestPositionInBelowCell = function (path, offset) {
        return Chain.mapper(function (viewBlock) {
            var table = SelectorFind.descendant(Element.fromDom(viewBlock.get()), 'table').getOrDie('Could not find table').dom();
            var container = Hierarchy.follow(Element.fromDom(viewBlock.get()), path).getOrDie();
            var pos = CaretPosition(container.dom(), offset);
            return findClosestPositionInBelowCell(table, pos);
        });
    };
    var cAssertCaretPosition = function (path, offset) {
        return Chain.op(function (posOption) {
            var container = Hierarchy.follow(Element.fromDom(viewBlock.get()), path).getOrDie();
            var pos = posOption.getOrDie('Needs to return a caret');
            Assertions.assertDomEq('Should be the expected container', container, Element.fromDom(pos.container()));
            Assertions.assertEq('Should be the expected offset', offset, pos.offset());
        });
    };
    viewBlock.attach();
    Pipeline.async({}, [
        Logger.t('getClosestCellAbove', GeneralSteps.sequence([
            Logger.t('Should return the top/right cell', Chain.asStep(viewBlock, [
                cSetHtml([
                    '<table style="border-collapse: collapse" border="1">',
                    '<tbody>',
                    '<tr>',
                    '<td style="width: 20px; height: 20px;">a</td>',
                    '<td style="width: 20px; height: 20px;">b</td>',
                    '</tr>',
                    '<tr>',
                    '<td style="width: 20px; height: 20px;">c</td>',
                    '<td style="width: 20px; height: 20px;">d</td>',
                    '</tr>',
                    '</tbody>',
                    '</table>',
                ].join('')),
                cGetClosestCellAbove(30, 30),
                cAssertCell([0, 0, 0, 1])
            ])),
            Logger.t('Should return the top/left cell', Chain.asStep(viewBlock, [
                cSetHtml([
                    '<table style="border-collapse: collapse" border="1">',
                    '<tbody>',
                    '<tr>',
                    '<td style="width: 20px; height: 20px;">a</td>',
                    '<td style="width: 20px; height: 20px;">b</td>',
                    '</tr>',
                    '<tr>',
                    '<td style="width: 20px; height: 20px;">c</td>',
                    '<td style="width: 20px; height: 20px;">d</td>',
                    '</tr>',
                    '</tbody>',
                    '</table>',
                ].join('')),
                cGetClosestCellAbove(15, 30),
                cAssertCell([0, 0, 0, 0])
            ])),
            Logger.t('Should not return a cell', Chain.asStep(viewBlock, [
                cSetHtml([
                    '<table style="border-collapse: collapse" border="1">',
                    '<tbody>',
                    '<tr>',
                    '<td style="width: 20px; height: 20px;">a</td>',
                    '<td style="width: 20px; height: 20px;">b</td>',
                    '</tr>',
                    '<tr>',
                    '<td style="width: 20px; height: 20px;">c</td>',
                    '<td style="width: 20px; height: 20px;">d</td>',
                    '</tr>',
                    '</tbody>',
                    '</table>',
                ].join('')),
                cGetClosestCellAbove(15, 15),
                cAssertNone
            ]))
        ])),
        Logger.t('getClosestCellBelow', GeneralSteps.sequence([
            Logger.t('Should return the bottom/right cell', Chain.asStep(viewBlock, [
                cSetHtml([
                    '<table style="border-collapse: collapse" border="1">',
                    '<tbody>',
                    '<tr>',
                    '<td style="width: 20px; height: 20px;">a</td>',
                    '<td style="width: 20px; height: 20px;">b</td>',
                    '</tr>',
                    '<tr>',
                    '<td style="width: 20px; height: 20px;">c</td>',
                    '<td style="width: 20px; height: 20px;">d</td>',
                    '</tr>',
                    '</tbody>',
                    '</table>',
                ].join('')),
                cGetClosestCellBelow(30, 15),
                cAssertCell([0, 0, 1, 1])
            ])),
            Logger.t('Should return the bottom/left cell', Chain.asStep(viewBlock, [
                cSetHtml([
                    '<table style="border-collapse: collapse" border="1">',
                    '<tbody>',
                    '<tr>',
                    '<td style="width: 20px; height: 20px;">a</td>',
                    '<td style="width: 20px; height: 20px;">b</td>',
                    '</tr>',
                    '<tr>',
                    '<td style="width: 20px; height: 20px;">c</td>',
                    '<td style="width: 20px; height: 20px;">d</td>',
                    '</tr>',
                    '</tbody>',
                    '</table>',
                ].join('')),
                cGetClosestCellBelow(15, 15),
                cAssertCell([0, 0, 1, 0])
            ])),
            Logger.t('Should not return a cell', Chain.asStep(viewBlock, [
                cSetHtml([
                    '<table style="border-collapse: collapse" border="1">',
                    '<tbody>',
                    '<tr>',
                    '<td style="width: 20px; height: 20px;">a</td>',
                    '<td style="width: 20px; height: 20px;">b</td>',
                    '</tr>',
                    '<tr>',
                    '<td style="width: 20px; height: 20px;">c</td>',
                    '<td style="width: 20px; height: 20px;">d</td>',
                    '</tr>',
                    '</tbody>',
                    '</table>',
                ].join('')),
                cGetClosestCellBelow(30, 30),
                cAssertNone
            ]))
        ])),
        Logger.t('findClosestPositionInAboveCell', GeneralSteps.sequence([
            Logger.t('Should return first positon in the top/right cell', Chain.asStep(viewBlock, [
                cSetHtml([
                    '<table style="border-collapse: collapse" border="1">',
                    '<tbody>',
                    '<tr>',
                    '<td style="width: 20px; height: 20px;">a</td>',
                    '<td style="width: 20px; height: 20px;">b</td>',
                    '</tr>',
                    '<tr>',
                    '<td style="width: 20px; height: 20px;">c</td>',
                    '<td style="width: 20px; height: 20px;">d</td>',
                    '</tr>',
                    '</tbody>',
                    '</table>',
                ].join('')),
                cFindClosestPositionInAboveCell([0, 0, 1, 1], 0),
                cAssertCaretPosition([0, 0, 0, 1, 0], 0)
            ])),
            Logger.t('Should return last positon in the top/right cell', Chain.asStep(viewBlock, [
                cSetHtml([
                    '<table style="border-collapse: collapse" border="1">',
                    '<tbody>',
                    '<tr>',
                    '<td style="width: 20px; height: 20px;">a</td>',
                    '<td style="width: 20px; height: 20px;">b</td>',
                    '</tr>',
                    '<tr>',
                    '<td style="width: 20px; height: 20px;">c</td>',
                    '<td style="width: 20px; height: 20px;">d</td>',
                    '</tr>',
                    '</tbody>',
                    '</table>',
                ].join('')),
                cFindClosestPositionInAboveCell([0, 0, 1, 1], 1),
                cAssertCaretPosition([0, 0, 0, 1, 0], 1)
            ])),
            Logger.t('Should return first positon in the bottom/right cell', Chain.asStep(viewBlock, [
                cSetHtml([
                    '<table style="border-collapse: collapse" border="1">',
                    '<tbody>',
                    '<tr>',
                    '<td style="width: 20px; height: 20px;">a</td>',
                    '<td style="width: 20px; height: 20px;">b</td>',
                    '</tr>',
                    '<tr>',
                    '<td style="width: 20px; height: 20px;">c</td>',
                    '<td style="width: 20px; height: 20px;">d</td>',
                    '</tr>',
                    '</tbody>',
                    '</table>',
                ].join('')),
                cFindClosestPositionInBelowCell([0, 0, 0, 1], 0),
                cAssertCaretPosition([0, 0, 1, 1, 0], 0)
            ])),
            Logger.t('Should return last positon in the bottom/right cell', Chain.asStep(viewBlock, [
                cSetHtml([
                    '<table style="border-collapse: collapse" border="1">',
                    '<tbody>',
                    '<tr>',
                    '<td style="width: 20px; height: 20px;">a</td>',
                    '<td style="width: 20px; height: 20px;">b</td>',
                    '</tr>',
                    '<tr>',
                    '<td style="width: 20px; height: 20px;">c</td>',
                    '<td style="width: 20px; height: 20px;">d</td>',
                    '</tr>',
                    '</tbody>',
                    '</table>',
                ].join('')),
                cFindClosestPositionInBelowCell([0, 0, 0, 1], 1),
                cAssertCaretPosition([0, 0, 1, 1, 0], 1)
            ]))
        ]))
    ], function () {
        viewBlock.detach();
        success();
    }, failure);
});
//# sourceMappingURL=TableCellsTest.js.map