/**
 * DomParser.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import LegacyFilter from '../../html/LegacyFilter';
import * as ParserFilters from '../../html/ParserFilters';
import { paddEmptyNode, isPaddedWithNbsp, hasOnlyChild, isEmpty, isLineBreakNode } from '../../html/ParserUtils';
import Node from './Node';
import SaxParser from './SaxParser';
import Schema from './Schema';
import Tools from '../util/Tools';
/**
 * This class parses HTML code into a DOM like structure of nodes it will remove redundant whitespace and make
 * sure that the node tree is valid according to the specified schema.
 * So for example: <p>a<p>b</p>c</p> will become <p>a</p><p>b</p><p>c</p>
 *
 * @example
 * var parser = new tinymce.html.DomParser({validate: true}, schema);
 * var rootNode = parser.parse('<h1>content</h1>');
 *
 * @class tinymce.html.DomParser
 * @version 3.4
 */
var makeMap = Tools.makeMap, each = Tools.each, explode = Tools.explode, extend = Tools.extend;
export default function (settings, schema) {
    if (schema === void 0) { schema = Schema(); }
    var nodeFilters = {};
    var attributeFilters = [];
    var matchedNodes = {};
    var matchedAttributes = {};
    settings = settings || {};
    settings.validate = 'validate' in settings ? settings.validate : true;
    settings.root_name = settings.root_name || 'body';
    var fixInvalidChildren = function (nodes) {
        var ni, node, parent, parents, newParent, currentNode, tempNode, childNode, i;
        var nonEmptyElements, whitespaceElements, nonSplitableElements, textBlockElements, specialElements, sibling, nextNode;
        nonSplitableElements = makeMap('tr,td,th,tbody,thead,tfoot,table');
        nonEmptyElements = schema.getNonEmptyElements();
        whitespaceElements = schema.getWhiteSpaceElements();
        textBlockElements = schema.getTextBlockElements();
        specialElements = schema.getSpecialElements();
        for (ni = 0; ni < nodes.length; ni++) {
            node = nodes[ni];
            // Already removed or fixed
            if (!node.parent || node.fixed) {
                continue;
            }
            // If the invalid element is a text block and the text block is within a parent LI element
            // Then unwrap the first text block and convert other sibling text blocks to LI elements similar to Word/Open Office
            if (textBlockElements[node.name] && node.parent.name === 'li') {
                // Move sibling text blocks after LI element
                sibling = node.next;
                while (sibling) {
                    if (textBlockElements[sibling.name]) {
                        sibling.name = 'li';
                        sibling.fixed = true;
                        node.parent.insert(sibling, node.parent);
                    }
                    else {
                        break;
                    }
                    sibling = sibling.next;
                }
                // Unwrap current text block
                node.unwrap(node);
                continue;
            }
            // Get list of all parent nodes until we find a valid parent to stick the child into
            parents = [node];
            for (parent = node.parent; parent && !schema.isValidChild(parent.name, node.name) &&
                !nonSplitableElements[parent.name]; parent = parent.parent) {
                parents.push(parent);
            }
            // Found a suitable parent
            if (parent && parents.length > 1) {
                // Reverse the array since it makes looping easier
                parents.reverse();
                // Clone the related parent and insert that after the moved node
                newParent = currentNode = filterNode(parents[0].clone());
                // Start cloning and moving children on the left side of the target node
                for (i = 0; i < parents.length - 1; i++) {
                    if (schema.isValidChild(currentNode.name, parents[i].name)) {
                        tempNode = filterNode(parents[i].clone());
                        currentNode.append(tempNode);
                    }
                    else {
                        tempNode = currentNode;
                    }
                    for (childNode = parents[i].firstChild; childNode && childNode !== parents[i + 1];) {
                        nextNode = childNode.next;
                        tempNode.append(childNode);
                        childNode = nextNode;
                    }
                    currentNode = tempNode;
                }
                if (!isEmpty(schema, nonEmptyElements, whitespaceElements, newParent)) {
                    parent.insert(newParent, parents[0], true);
                    parent.insert(node, newParent);
                }
                else {
                    parent.insert(node, parents[0], true);
                }
                // Check if the element is empty by looking through it's contents and special treatment for <p><br /></p>
                parent = parents[0];
                if (isEmpty(schema, nonEmptyElements, whitespaceElements, parent) || hasOnlyChild(parent, 'br')) {
                    parent.empty().remove();
                }
            }
            else if (node.parent) {
                // If it's an LI try to find a UL/OL for it or wrap it
                if (node.name === 'li') {
                    sibling = node.prev;
                    if (sibling && (sibling.name === 'ul' || sibling.name === 'ul')) {
                        sibling.append(node);
                        continue;
                    }
                    sibling = node.next;
                    if (sibling && (sibling.name === 'ul' || sibling.name === 'ul')) {
                        sibling.insert(node, sibling.firstChild, true);
                        continue;
                    }
                    node.wrap(filterNode(new Node('ul', 1)));
                    continue;
                }
                // Try wrapping the element in a DIV
                if (schema.isValidChild(node.parent.name, 'div') && schema.isValidChild('div', node.name)) {
                    node.wrap(filterNode(new Node('div', 1)));
                }
                else {
                    // We failed wrapping it, then remove or unwrap it
                    if (specialElements[node.name]) {
                        node.empty().remove();
                    }
                    else {
                        node.unwrap();
                    }
                }
            }
        }
    };
    /**
     * Runs the specified node though the element and attributes filters.
     *
     * @method filterNode
     * @param {tinymce.html.Node} Node the node to run filters on.
     * @return {tinymce.html.Node} The passed in node.
     */
    var filterNode = function (node) {
        var i, name, list;
        // Run element filters
        if (name in nodeFilters) {
            list = matchedNodes[name];
            if (list) {
                list.push(node);
            }
            else {
                matchedNodes[name] = [node];
            }
        }
        // Run attribute filters
        i = attributeFilters.length;
        while (i--) {
            name = attributeFilters[i].name;
            if (name in node.attributes.map) {
                list = matchedAttributes[name];
                if (list) {
                    list.push(node);
                }
                else {
                    matchedAttributes[name] = [node];
                }
            }
        }
        return node;
    };
    /**
     * Adds a node filter function to the parser, the parser will collect the specified nodes by name
     * and then execute the callback ones it has finished parsing the document.
     *
     * @example
     * parser.addNodeFilter('p,h1', function(nodes, name) {
     *  for (var i = 0; i < nodes.length; i++) {
     *   console.log(nodes[i].name);
     *  }
     * });
     * @method addNodeFilter
     * @method {String} name Comma separated list of nodes to collect.
     * @param {function} callback Callback function to execute once it has collected nodes.
     */
    var addNodeFilter = function (name, callback) {
        each(explode(name), function (name) {
            var list = nodeFilters[name];
            if (!list) {
                nodeFilters[name] = list = [];
            }
            list.push(callback);
        });
    };
    var getNodeFilters = function () {
        var out = [];
        for (var name_1 in nodeFilters) {
            if (nodeFilters.hasOwnProperty(name_1)) {
                out.push({ name: name_1, callbacks: nodeFilters[name_1] });
            }
        }
        return out;
    };
    /**
     * Adds a attribute filter function to the parser, the parser will collect nodes that has the specified attributes
     * and then execute the callback ones it has finished parsing the document.
     *
     * @example
     * parser.addAttributeFilter('src,href', function(nodes, name) {
     *  for (var i = 0; i < nodes.length; i++) {
     *   console.log(nodes[i].name);
     *  }
     * });
     * @method addAttributeFilter
     * @method {String} name Comma separated list of nodes to collect.
     * @param {function} callback Callback function to execute once it has collected nodes.
     */
    var addAttributeFilter = function (name, callback) {
        each(explode(name), function (name) {
            var i;
            for (i = 0; i < attributeFilters.length; i++) {
                if (attributeFilters[i].name === name) {
                    attributeFilters[i].callbacks.push(callback);
                    return;
                }
            }
            attributeFilters.push({ name: name, callbacks: [callback] });
        });
    };
    var getAttributeFilters = function () { return [].concat(attributeFilters); };
    /**
     * Parses the specified HTML string into a DOM like node tree and returns the result.
     *
     * @example
     * var rootNode = new DomParser({...}).parse('<b>text</b>');
     * @method parse
     * @param {String} html Html string to sax parse.
     * @param {Object} args Optional args object that gets passed to all filter functions.
     * @return {tinymce.html.Node} Root node containing the tree.
     */
    var parse = function (html, args) {
        var parser, nodes, i, l, fi, fl, list, name;
        var blockElements;
        var invalidChildren = [];
        var isInWhiteSpacePreservedElement;
        var node;
        args = args || {};
        matchedNodes = {};
        matchedAttributes = {};
        blockElements = extend(makeMap('script,style,head,html,body,title,meta,param'), schema.getBlockElements());
        var nonEmptyElements = schema.getNonEmptyElements();
        var children = schema.children;
        var validate = settings.validate;
        var rootBlockName = 'forced_root_block' in args ? args.forced_root_block : settings.forced_root_block;
        var whiteSpaceElements = schema.getWhiteSpaceElements();
        var startWhiteSpaceRegExp = /^[ \t\r\n]+/;
        var endWhiteSpaceRegExp = /[ \t\r\n]+$/;
        var allWhiteSpaceRegExp = /[ \t\r\n]+/g;
        var isAllWhiteSpaceRegExp = /^[ \t\r\n]+$/;
        var addRootBlocks = function () {
            var node = rootNode.firstChild, next, rootBlockNode;
            // Removes whitespace at beginning and end of block so:
            // <p> x </p> -> <p>x</p>
            var trim = function (rootBlockNode) {
                if (rootBlockNode) {
                    node = rootBlockNode.firstChild;
                    if (node && node.type === 3) {
                        node.value = node.value.replace(startWhiteSpaceRegExp, '');
                    }
                    node = rootBlockNode.lastChild;
                    if (node && node.type === 3) {
                        node.value = node.value.replace(endWhiteSpaceRegExp, '');
                    }
                }
            };
            // Check if rootBlock is valid within rootNode for example if P is valid in H1 if H1 is the contentEditabe root
            if (!schema.isValidChild(rootNode.name, rootBlockName.toLowerCase())) {
                return;
            }
            while (node) {
                next = node.next;
                if (node.type === 3 || (node.type === 1 && node.name !== 'p' &&
                    !blockElements[node.name] && !node.attr('data-mce-type'))) {
                    if (!rootBlockNode) {
                        // Create a new root block element
                        rootBlockNode = createNode(rootBlockName, 1);
                        rootBlockNode.attr(settings.forced_root_block_attrs);
                        rootNode.insert(rootBlockNode, node);
                        rootBlockNode.append(node);
                    }
                    else {
                        rootBlockNode.append(node);
                    }
                }
                else {
                    trim(rootBlockNode);
                    rootBlockNode = null;
                }
                node = next;
            }
            trim(rootBlockNode);
        };
        var createNode = function (name, type) {
            var node = new Node(name, type);
            var list;
            if (name in nodeFilters) {
                list = matchedNodes[name];
                if (list) {
                    list.push(node);
                }
                else {
                    matchedNodes[name] = [node];
                }
            }
            return node;
        };
        var removeWhitespaceBefore = function (node) {
            var textNode, textNodeNext, textVal, sibling;
            var blockElements = schema.getBlockElements();
            for (textNode = node.prev; textNode && textNode.type === 3;) {
                textVal = textNode.value.replace(endWhiteSpaceRegExp, '');
                // Found a text node with non whitespace then trim that and break
                if (textVal.length > 0) {
                    textNode.value = textVal;
                    return;
                }
                textNodeNext = textNode.next;
                // Fix for bug #7543 where bogus nodes would produce empty
                // text nodes and these would be removed if a nested list was before it
                if (textNodeNext) {
                    if (textNodeNext.type === 3 && textNodeNext.value.length) {
                        textNode = textNode.prev;
                        continue;
                    }
                    if (!blockElements[textNodeNext.name] && textNodeNext.name !== 'script' && textNodeNext.name !== 'style') {
                        textNode = textNode.prev;
                        continue;
                    }
                }
                sibling = textNode.prev;
                textNode.remove();
                textNode = sibling;
            }
        };
        var cloneAndExcludeBlocks = function (input) {
            var name;
            var output = {};
            for (name in input) {
                if (name !== 'li' && name !== 'p') {
                    output[name] = input[name];
                }
            }
            return output;
        };
        parser = SaxParser({
            validate: validate,
            allow_script_urls: settings.allow_script_urls,
            allow_conditional_comments: settings.allow_conditional_comments,
            // Exclude P and LI from DOM parsing since it's treated better by the DOM parser
            self_closing_elements: cloneAndExcludeBlocks(schema.getSelfClosingElements()),
            cdata: function (text) {
                node.append(createNode('#cdata', 4)).value = text;
            },
            text: function (text, raw) {
                var textNode;
                // Trim all redundant whitespace on non white space elements
                if (!isInWhiteSpacePreservedElement) {
                    text = text.replace(allWhiteSpaceRegExp, ' ');
                    if (isLineBreakNode(node.lastChild, blockElements)) {
                        text = text.replace(startWhiteSpaceRegExp, '');
                    }
                }
                // Do we need to create the node
                if (text.length !== 0) {
                    textNode = createNode('#text', 3);
                    textNode.raw = !!raw;
                    node.append(textNode).value = text;
                }
            },
            comment: function (text) {
                node.append(createNode('#comment', 8)).value = text;
            },
            pi: function (name, text) {
                node.append(createNode(name, 7)).value = text;
                removeWhitespaceBefore(node);
            },
            doctype: function (text) {
                var newNode;
                newNode = node.append(createNode('#doctype', 10));
                newNode.value = text;
                removeWhitespaceBefore(node);
            },
            start: function (name, attrs, empty) {
                var newNode, attrFiltersLen, elementRule, attrName, parent;
                elementRule = validate ? schema.getElementRule(name) : {};
                if (elementRule) {
                    newNode = createNode(elementRule.outputName || name, 1);
                    newNode.attributes = attrs;
                    newNode.shortEnded = empty;
                    node.append(newNode);
                    // Check if node is valid child of the parent node is the child is
                    // unknown we don't collect it since it's probably a custom element
                    parent = children[node.name];
                    if (parent && children[newNode.name] && !parent[newNode.name]) {
                        invalidChildren.push(newNode);
                    }
                    attrFiltersLen = attributeFilters.length;
                    while (attrFiltersLen--) {
                        attrName = attributeFilters[attrFiltersLen].name;
                        if (attrName in attrs.map) {
                            list = matchedAttributes[attrName];
                            if (list) {
                                list.push(newNode);
                            }
                            else {
                                matchedAttributes[attrName] = [newNode];
                            }
                        }
                    }
                    // Trim whitespace before block
                    if (blockElements[name]) {
                        removeWhitespaceBefore(newNode);
                    }
                    // Change current node if the element wasn't empty i.e not <br /> or <img />
                    if (!empty) {
                        node = newNode;
                    }
                    // Check if we are inside a whitespace preserved element
                    if (!isInWhiteSpacePreservedElement && whiteSpaceElements[name]) {
                        isInWhiteSpacePreservedElement = true;
                    }
                }
            },
            end: function (name) {
                var textNode, elementRule, text, sibling, tempNode;
                elementRule = validate ? schema.getElementRule(name) : {};
                if (elementRule) {
                    if (blockElements[name]) {
                        if (!isInWhiteSpacePreservedElement) {
                            // Trim whitespace of the first node in a block
                            textNode = node.firstChild;
                            if (textNode && textNode.type === 3) {
                                text = textNode.value.replace(startWhiteSpaceRegExp, '');
                                // Any characters left after trim or should we remove it
                                if (text.length > 0) {
                                    textNode.value = text;
                                    textNode = textNode.next;
                                }
                                else {
                                    sibling = textNode.next;
                                    textNode.remove();
                                    textNode = sibling;
                                    // Remove any pure whitespace siblings
                                    while (textNode && textNode.type === 3) {
                                        text = textNode.value;
                                        sibling = textNode.next;
                                        if (text.length === 0 || isAllWhiteSpaceRegExp.test(text)) {
                                            textNode.remove();
                                            textNode = sibling;
                                        }
                                        textNode = sibling;
                                    }
                                }
                            }
                            // Trim whitespace of the last node in a block
                            textNode = node.lastChild;
                            if (textNode && textNode.type === 3) {
                                text = textNode.value.replace(endWhiteSpaceRegExp, '');
                                // Any characters left after trim or should we remove it
                                if (text.length > 0) {
                                    textNode.value = text;
                                    textNode = textNode.prev;
                                }
                                else {
                                    sibling = textNode.prev;
                                    textNode.remove();
                                    textNode = sibling;
                                    // Remove any pure whitespace siblings
                                    while (textNode && textNode.type === 3) {
                                        text = textNode.value;
                                        sibling = textNode.prev;
                                        if (text.length === 0 || isAllWhiteSpaceRegExp.test(text)) {
                                            textNode.remove();
                                            textNode = sibling;
                                        }
                                        textNode = sibling;
                                    }
                                }
                            }
                        }
                        // Trim start white space
                        // Removed due to: #5424
                        /*textNode = node.prev;
                        if (textNode && textNode.type === 3) {
                          text = textNode.value.replace(startWhiteSpaceRegExp, '');
            
                          if (text.length > 0)
                            textNode.value = text;
                          else
                            textNode.remove();
                        }*/
                    }
                    // Check if we exited a whitespace preserved element
                    if (isInWhiteSpacePreservedElement && whiteSpaceElements[name]) {
                        isInWhiteSpacePreservedElement = false;
                    }
                    if (elementRule.removeEmpty && isEmpty(schema, nonEmptyElements, whiteSpaceElements, node)) {
                        // Leave nodes that have a name like <a name="name">
                        if (!node.attributes.map.name && !node.attr('id')) {
                            tempNode = node.parent;
                            if (blockElements[node.name]) {
                                node.empty().remove();
                            }
                            else {
                                node.unwrap();
                            }
                            node = tempNode;
                            return;
                        }
                    }
                    if (elementRule.paddEmpty && (isPaddedWithNbsp(node) || isEmpty(schema, nonEmptyElements, whiteSpaceElements, node))) {
                        paddEmptyNode(settings, args, blockElements, node);
                    }
                    node = node.parent;
                }
            }
        }, schema);
        var rootNode = node = new Node(args.context || settings.root_name, 11);
        parser.parse(html);
        // Fix invalid children or report invalid children in a contextual parsing
        if (validate && invalidChildren.length) {
            if (!args.context) {
                fixInvalidChildren(invalidChildren);
            }
            else {
                args.invalid = true;
            }
        }
        // Wrap nodes in the root into block elements if the root is body
        if (rootBlockName && (rootNode.name === 'body' || args.isRootContent)) {
            addRootBlocks();
        }
        // Run filters only when the contents is valid
        if (!args.invalid) {
            // Run node filters
            for (name in matchedNodes) {
                list = nodeFilters[name];
                nodes = matchedNodes[name];
                // Remove already removed children
                fi = nodes.length;
                while (fi--) {
                    if (!nodes[fi].parent) {
                        nodes.splice(fi, 1);
                    }
                }
                for (i = 0, l = list.length; i < l; i++) {
                    list[i](nodes, name, args);
                }
            }
            // Run attribute filters
            for (i = 0, l = attributeFilters.length; i < l; i++) {
                list = attributeFilters[i];
                if (list.name in matchedAttributes) {
                    nodes = matchedAttributes[list.name];
                    // Remove already removed children
                    fi = nodes.length;
                    while (fi--) {
                        if (!nodes[fi].parent) {
                            nodes.splice(fi, 1);
                        }
                    }
                    for (fi = 0, fl = list.callbacks.length; fi < fl; fi++) {
                        list.callbacks[fi](nodes, list.name, args);
                    }
                }
            }
        }
        return rootNode;
    };
    var exports = {
        schema: schema,
        addAttributeFilter: addAttributeFilter,
        getAttributeFilters: getAttributeFilters,
        addNodeFilter: addNodeFilter,
        getNodeFilters: getNodeFilters,
        filterNode: filterNode,
        parse: parse
    };
    ParserFilters.register(exports, settings);
    LegacyFilter.register(exports, settings);
    return exports;
}
//# sourceMappingURL=DomParser.js.map