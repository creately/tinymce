/**
 * DeleteElement.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Fun, Option, Options } from '@ephox/katamari';
import { Insert, Remove, Element, Node, PredicateFind, Traverse } from '@ephox/sugar';
import * as CaretCandidate from '../caret/CaretCandidate';
import CaretFinder from '../caret/CaretFinder';
import CaretPosition from '../caret/CaretPosition';
import Empty from '../dom/Empty';
import NodeType from '../dom/NodeType';
var needsReposition = function (pos, elm) {
    var container = pos.container();
    var offset = pos.offset();
    return CaretPosition.isTextPosition(pos) === false && container === elm.parentNode && offset > CaretPosition.before(elm).offset();
};
var reposition = function (elm, pos) {
    return needsReposition(pos, elm) ? CaretPosition(pos.container(), pos.offset() - 1) : pos;
};
var beforeOrStartOf = function (node) {
    return NodeType.isText(node) ? CaretPosition(node, 0) : CaretPosition.before(node);
};
var afterOrEndOf = function (node) {
    return NodeType.isText(node) ? CaretPosition(node, node.data.length) : CaretPosition.after(node);
};
var getPreviousSiblingCaretPosition = function (elm) {
    if (CaretCandidate.isCaretCandidate(elm.previousSibling)) {
        return Option.some(afterOrEndOf(elm.previousSibling));
    }
    else {
        return elm.previousSibling ? CaretFinder.lastPositionIn(elm.previousSibling) : Option.none();
    }
};
var getNextSiblingCaretPosition = function (elm) {
    if (CaretCandidate.isCaretCandidate(elm.nextSibling)) {
        return Option.some(beforeOrStartOf(elm.nextSibling));
    }
    else {
        return elm.nextSibling ? CaretFinder.firstPositionIn(elm.nextSibling) : Option.none();
    }
};
var findCaretPositionBackwardsFromElm = function (rootElement, elm) {
    var startPosition = CaretPosition.before(elm.previousSibling ? elm.previousSibling : elm.parentNode);
    return CaretFinder.prevPosition(rootElement, startPosition).fold(function () {
        return CaretFinder.nextPosition(rootElement, CaretPosition.after(elm));
    }, Option.some);
};
var findCaretPositionForwardsFromElm = function (rootElement, elm) {
    return CaretFinder.nextPosition(rootElement, CaretPosition.after(elm)).fold(function () {
        return CaretFinder.prevPosition(rootElement, CaretPosition.before(elm));
    }, Option.some);
};
var findCaretPositionBackwards = function (rootElement, elm) {
    return getPreviousSiblingCaretPosition(elm).orThunk(function () {
        return getNextSiblingCaretPosition(elm);
    }).orThunk(function () {
        return findCaretPositionBackwardsFromElm(rootElement, elm);
    });
};
var findCaretPositionForward = function (rootElement, elm) {
    return getNextSiblingCaretPosition(elm).orThunk(function () {
        return getPreviousSiblingCaretPosition(elm);
    }).orThunk(function () {
        return findCaretPositionForwardsFromElm(rootElement, elm);
    });
};
var findCaretPosition = function (forward, rootElement, elm) {
    return forward ? findCaretPositionForward(rootElement, elm) : findCaretPositionBackwards(rootElement, elm);
};
var findCaretPosOutsideElmAfterDelete = function (forward, rootElement, elm) {
    return findCaretPosition(forward, rootElement, elm).map(Fun.curry(reposition, elm));
};
var setSelection = function (editor, forward, pos) {
    pos.fold(function () {
        editor.focus();
    }, function (pos) {
        editor.selection.setRng(pos.toRange(), forward);
    });
};
var eqRawNode = function (rawNode) {
    return function (elm) {
        return elm.dom() === rawNode;
    };
};
var isBlock = function (editor, elm) {
    return elm && editor.schema.getBlockElements().hasOwnProperty(Node.name(elm));
};
var paddEmptyBlock = function (elm) {
    if (Empty.isEmpty(elm)) {
        var br = Element.fromHtml('<br data-mce-bogus="1">');
        Remove.empty(elm);
        Insert.append(elm, br);
        return Option.some(CaretPosition.before(br.dom()));
    }
    else {
        return Option.none();
    }
};
// When deleting an element between two text nodes IE 11 doesn't automatically merge the adjacent text nodes
var deleteNormalized = function (elm, afterDeletePosOpt) {
    return Options.liftN([Traverse.prevSibling(elm), Traverse.nextSibling(elm), afterDeletePosOpt], function (prev, next, afterDeletePos) {
        var offset;
        var prevNode = prev.dom();
        var nextNode = next.dom();
        if (NodeType.isText(prevNode) && NodeType.isText(nextNode)) {
            offset = prevNode.data.length;
            prevNode.appendData(nextNode.data);
            Remove.remove(next);
            Remove.remove(elm);
            if (afterDeletePos.container() === nextNode) {
                return CaretPosition(prevNode, offset);
            }
            else {
                return afterDeletePos;
            }
        }
        else {
            Remove.remove(elm);
            return afterDeletePos;
        }
    }).orThunk(function () {
        Remove.remove(elm);
        return afterDeletePosOpt;
    });
};
var deleteElement = function (editor, forward, elm) {
    var afterDeletePos = findCaretPosOutsideElmAfterDelete(forward, editor.getBody(), elm.dom());
    var parentBlock = PredicateFind.ancestor(elm, Fun.curry(isBlock, editor), eqRawNode(editor.getBody()));
    var normalizedAfterDeletePos = deleteNormalized(elm, afterDeletePos);
    if (editor.dom.isEmpty(editor.getBody())) {
        editor.setContent('');
        editor.selection.setCursorLocation();
    }
    else {
        parentBlock.bind(paddEmptyBlock).fold(function () {
            setSelection(editor, forward, normalizedAfterDeletePos);
        }, function (paddPos) {
            setSelection(editor, forward, Option.some(paddPos));
        });
    }
};
export default {
    deleteElement: deleteElement
};
//# sourceMappingURL=DeleteElement.js.map