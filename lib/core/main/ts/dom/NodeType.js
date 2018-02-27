/**
 * NodeType.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
var isNodeType = function (type) {
    return function (node) {
        return !!node && node.nodeType === type;
    };
};
var isElement = isNodeType(1);
var matchNodeNames = function (names) {
    var items = names.toLowerCase().split(' ');
    return function (node) {
        var i, name;
        if (node && node.nodeType) {
            name = node.nodeName.toLowerCase();
            for (i = 0; i < items.length; i++) {
                if (name === items[i]) {
                    return true;
                }
            }
        }
        return false;
    };
};
var matchStyleValues = function (name, values) {
    var items = values.toLowerCase().split(' ');
    return function (node) {
        var i, cssValue;
        if (isElement(node)) {
            for (i = 0; i < items.length; i++) {
                cssValue = node.ownerDocument.defaultView.getComputedStyle(node, null).getPropertyValue(name);
                if (cssValue === items[i]) {
                    return true;
                }
            }
        }
        return false;
    };
};
var hasPropValue = function (propName, propValue) {
    return function (node) {
        return isElement(node) && node[propName] === propValue;
    };
};
var hasAttribute = function (attrName, attrValue) {
    return function (node) {
        return isElement(node) && node.hasAttribute(attrName);
    };
};
var hasAttributeValue = function (attrName, attrValue) {
    return function (node) {
        return isElement(node) && node.getAttribute(attrName) === attrValue;
    };
};
var isBogus = function (node) { return isElement(node) && node.hasAttribute('data-mce-bogus'); };
var isBogusAll = function (node) { return isElement(node) && node.getAttribute('data-mce-bogus') === 'all'; };
var isTable = function (node) { return isElement(node) && node.tagName === 'TABLE'; };
var hasContentEditableState = function (value) {
    return function (node) {
        if (isElement(node)) {
            if (node.contentEditable === value) {
                return true;
            }
            if (node.getAttribute('data-mce-contenteditable') === value) {
                return true;
            }
        }
        return false;
    };
};
var isText = isNodeType(3);
var isComment = isNodeType(8);
var isDocument = isNodeType(9);
var isBr = matchNodeNames('br');
var isContentEditableTrue = hasContentEditableState('true');
var isContentEditableFalse = hasContentEditableState('false');
export default {
    isText: isText,
    isElement: isElement,
    isComment: isComment,
    isDocument: isDocument,
    isBr: isBr,
    isContentEditableTrue: isContentEditableTrue,
    isContentEditableFalse: isContentEditableFalse,
    matchNodeNames: matchNodeNames,
    hasPropValue: hasPropValue,
    hasAttribute: hasAttribute,
    hasAttributeValue: hasAttributeValue,
    matchStyleValues: matchStyleValues,
    isBogus: isBogus,
    isBogusAll: isBogusAll,
    isTable: isTable
};
//# sourceMappingURL=NodeType.js.map