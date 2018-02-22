import { Pipeline } from '@ephox/agar';
import { LegacyUnit } from '@ephox/mcagar';
import TreeWalker from 'tinymce/core/api/dom/TreeWalker';
import ViewBlock from '../../module/test/ViewBlock';
import { UnitTest } from '@ephox/bedrock';
UnitTest.asynctest('browser.tinymce.core.dom.TreeWalkerTest', function () {
    var success = arguments[arguments.length - 2];
    var failure = arguments[arguments.length - 1];
    var suite = LegacyUnit.createSuite();
    var viewBlock = ViewBlock();
    var nodes;
    var setup = function () {
        var all = function (node) {
            var list = [node];
            if (node.hasChildNodes()) {
                for (var i = 0; i < node.childNodes.length; i++) {
                    list = list.concat(all(node.childNodes[i]));
                }
            }
            return list;
        };
        viewBlock.update('1' +
            '<ul>' +
            '<li>' +
            '2' +
            '<ul>' +
            '<li>3</li>' +
            '<li>4</li>' +
            '</ul>' +
            '</li>' +
            '<li>' +
            '5' +
            '<ul>' +
            '<li>6</li>' +
            '<li>7</li>' +
            '</ul>' +
            '</li>' +
            '</ul>' +
            '8');
        nodes = all(viewBlock.get()).slice(1);
    };
    var compareNodeLists = function (expectedNodes, actutalNodes) {
        if (expectedNodes.length !== actutalNodes.length) {
            return false;
        }
        for (var i = 0; i < expectedNodes.length; i++) {
            if (expectedNodes[i] !== actutalNodes[i]) {
                return false;
            }
        }
        return true;
    };
    suite.test('next', function () {
        var walker = new TreeWalker(nodes[0], viewBlock.get());
        var actualNodes;
        actualNodes = [walker.current()];
        while ((walker.next())) {
            actualNodes.push(walker.current());
        }
        LegacyUnit.equal(compareNodeLists(nodes, actualNodes), true, 'Should be the same');
    });
    suite.test('prev2', function () {
        var walker = new TreeWalker(nodes[nodes.length - 1], viewBlock.get());
        var actualNodes;
        actualNodes = [walker.current()];
        while ((walker.prev2())) {
            actualNodes.push(walker.current());
        }
        actualNodes = actualNodes.reverse();
        LegacyUnit.equal(compareNodeLists(nodes, actualNodes), true, 'Should be the same');
    });
    suite.test('prev2(shallow:true)', function () {
        var walker = new TreeWalker(nodes[nodes.length - 1], viewBlock.get());
        var actualNodes;
        actualNodes = [walker.current()];
        while ((walker.prev2(true))) {
            actualNodes.push(walker.current());
        }
        actualNodes = actualNodes.reverse();
        LegacyUnit.equal(compareNodeLists(viewBlock.get().childNodes, actualNodes), true, 'Should be the same');
    });
    viewBlock.attach();
    setup();
    Pipeline.async({}, suite.toSteps({}), function () {
        viewBlock.detach();
        success();
    }, failure);
});
//# sourceMappingURL=TreeWalkerTest.js.map