/**
 * InlineUtils.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Arr, Fun, Option } from '@ephox/katamari';
import { Element, Selectors } from '@ephox/sugar';
import * as EditorSettings from '../EditorSettings';
import * as CaretContainer from '../caret/CaretContainer';
import CaretPosition from '../caret/CaretPosition';
import * as CaretUtils from '../caret/CaretUtils';
import DOMUtils from '../api/dom/DOMUtils';
import NodeType from '../dom/NodeType';
import * as Bidi from '../text/Bidi';
var isInlineTarget = function (editor, elm) {
    var selector = EditorSettings.getString(editor, 'inline_boundaries_selector').getOr('a[href],code');
    return Selectors.is(Element.fromDom(elm), selector);
};
var isRtl = function (element) {
    return DOMUtils.DOM.getStyle(element, 'direction', true) === 'rtl' || Bidi.hasStrongRtl(element.textContent);
};
var findInlineParents = function (isInlineTarget, rootNode, pos) {
    return Arr.filter(DOMUtils.DOM.getParents(pos.container(), '*', rootNode), isInlineTarget);
};
var findRootInline = function (isInlineTarget, rootNode, pos) {
    var parents = findInlineParents(isInlineTarget, rootNode, pos);
    return Option.from(parents[parents.length - 1]);
};
var hasSameParentBlock = function (rootNode, node1, node2) {
    var block1 = CaretUtils.getParentBlock(node1, rootNode);
    var block2 = CaretUtils.getParentBlock(node2, rootNode);
    return block1 && block1 === block2;
};
var isAtZwsp = function (pos) {
    return CaretContainer.isBeforeInline(pos) || CaretContainer.isAfterInline(pos);
};
var normalizePosition = function (forward, pos) {
    var container = pos.container(), offset = pos.offset();
    if (forward) {
        if (CaretContainer.isCaretContainerInline(container)) {
            if (NodeType.isText(container.nextSibling)) {
                return CaretPosition(container.nextSibling, 0);
            }
            else {
                return CaretPosition.after(container);
            }
        }
        else {
            return CaretContainer.isBeforeInline(pos) ? CaretPosition(container, offset + 1) : pos;
        }
    }
    else {
        if (CaretContainer.isCaretContainerInline(container)) {
            if (NodeType.isText(container.previousSibling)) {
                return CaretPosition(container.previousSibling, container.previousSibling.data.length);
            }
            else {
                return CaretPosition.before(container);
            }
        }
        else {
            return CaretContainer.isAfterInline(pos) ? CaretPosition(container, offset - 1) : pos;
        }
    }
};
var normalizeForwards = Fun.curry(normalizePosition, true);
var normalizeBackwards = Fun.curry(normalizePosition, false);
export default {
    isInlineTarget: isInlineTarget,
    findRootInline: findRootInline,
    isRtl: isRtl,
    isAtZwsp: isAtZwsp,
    normalizePosition: normalizePosition,
    normalizeForwards: normalizeForwards,
    normalizeBackwards: normalizeBackwards,
    hasSameParentBlock: hasSameParentBlock
};
//# sourceMappingURL=InlineUtils.js.map