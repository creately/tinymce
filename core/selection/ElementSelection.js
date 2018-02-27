/**
 * ElementSelection.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Option } from '@ephox/katamari';
import { Node, Traverse, Element } from '@ephox/sugar';
import TreeWalker from '../api/dom/TreeWalker';
import { moveEndPoint } from './SelectionUtils';
import NodeType from '../dom/NodeType';
var getEndpointElement = function (root, rng, start, real, resolve) {
    var container = start ? rng.startContainer : rng.endContainer;
    var offset = start ? rng.startOffset : rng.endOffset;
    return Option.from(container).map(Element.fromDom).map(function (elm) {
        return !real || !rng.collapsed ? Traverse.child(elm, resolve(elm, offset)).getOr(elm) : elm;
    }).bind(function (elm) { return Node.isElement(elm) ? Option.some(elm) : Traverse.parent(elm); }).map(function (elm) { return elm.dom(); }).getOr(root);
};
var getStart = function (root, rng, real) {
    return getEndpointElement(root, rng, true, real, function (elm, offset) { return Math.min(Traverse.childNodesCount(elm), offset); });
};
var getEnd = function (root, rng, real) {
    return getEndpointElement(root, rng, false, real, function (elm, offset) { return offset > 0 ? offset - 1 : offset; });
};
var skipEmptyTextNodes = function (node, forwards) {
    var orig = node;
    while (node && NodeType.isText(node) && node.length === 0) {
        node = forwards ? node.nextSibling : node.previousSibling;
    }
    return node || orig;
};
var getNode = function (root, rng) {
    var elm, startContainer, endContainer, startOffset, endOffset;
    // Range maybe lost after the editor is made visible again
    if (!rng) {
        return root;
    }
    startContainer = rng.startContainer;
    endContainer = rng.endContainer;
    startOffset = rng.startOffset;
    endOffset = rng.endOffset;
    elm = rng.commonAncestorContainer;
    // Handle selection a image or other control like element such as anchors
    if (!rng.collapsed) {
        if (startContainer === endContainer) {
            if (endOffset - startOffset < 2) {
                if (startContainer.hasChildNodes()) {
                    elm = startContainer.childNodes[startOffset];
                }
            }
        }
        // If the anchor node is a element instead of a text node then return this element
        // if (tinymce.isWebKit && sel.anchorNode && sel.anchorNode.nodeType == 1)
        // return sel.anchorNode.childNodes[sel.anchorOffset];
        // Handle cases where the selection is immediately wrapped around a node and return that node instead of it's parent.
        // This happens when you double click an underlined word in FireFox.
        if (startContainer.nodeType === 3 && endContainer.nodeType === 3) {
            if (startContainer.length === startOffset) {
                startContainer = skipEmptyTextNodes(startContainer.nextSibling, true);
            }
            else {
                startContainer = startContainer.parentNode;
            }
            if (endOffset === 0) {
                endContainer = skipEmptyTextNodes(endContainer.previousSibling, false);
            }
            else {
                endContainer = endContainer.parentNode;
            }
            if (startContainer && startContainer === endContainer) {
                return startContainer;
            }
        }
    }
    if (elm && elm.nodeType === 3) {
        return elm.parentNode;
    }
    return elm;
};
var getSelectedBlocks = function (dom, rng, startElm, endElm) {
    var node, root;
    var selectedBlocks = [];
    root = dom.getRoot();
    startElm = dom.getParent(startElm || getStart(root, rng, false), dom.isBlock);
    endElm = dom.getParent(endElm || getEnd(root, rng, false), dom.isBlock);
    if (startElm && startElm !== root) {
        selectedBlocks.push(startElm);
    }
    if (startElm && endElm && startElm !== endElm) {
        node = startElm;
        var walker = new TreeWalker(startElm, root);
        while ((node = walker.next()) && node !== endElm) {
            if (dom.isBlock(node)) {
                selectedBlocks.push(node);
            }
        }
    }
    if (endElm && startElm !== endElm && endElm !== root) {
        selectedBlocks.push(endElm);
    }
    return selectedBlocks;
};
var select = function (dom, node, content) {
    return Option.from(node).map(function (node) {
        var idx = dom.nodeIndex(node);
        var rng = dom.createRng();
        rng.setStart(node.parentNode, idx);
        rng.setEnd(node.parentNode, idx + 1);
        // Find first/last text node or BR element
        if (content) {
            moveEndPoint(dom, rng, node, true);
            moveEndPoint(dom, rng, node, false);
        }
        return rng;
    });
};
export { getStart, getEnd, getNode, getSelectedBlocks, select };
//# sourceMappingURL=ElementSelection.js.map