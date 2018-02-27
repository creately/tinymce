/**
 * FilterNode.ts
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2018 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Arr } from '@ephox/katamari';
var traverse = function (node, fn) {
    fn(node);
    if (node.firstChild) {
        traverse(node.firstChild, fn);
    }
    if (node.next) {
        traverse(node.next, fn);
    }
};
var findMatchingNodes = function (nodeFilters, attributeFilters, node) {
    var nodeMatches = {};
    var attrMatches = {};
    var matches = [];
    if (node.firstChild) {
        traverse(node.firstChild, function (node) {
            Arr.each(nodeFilters, function (filter) {
                if (filter.name === node.name) {
                    if (nodeMatches[filter.name]) {
                        nodeMatches[filter.name].nodes.push(node);
                    }
                    else {
                        nodeMatches[filter.name] = { filter: filter, nodes: [node] };
                    }
                }
            });
            Arr.each(attributeFilters, function (filter) {
                if (typeof node.attr(filter.name) === 'string') {
                    if (attrMatches[filter.name]) {
                        attrMatches[filter.name].nodes.push(node);
                    }
                    else {
                        attrMatches[filter.name] = { filter: filter, nodes: [node] };
                    }
                }
            });
        });
    }
    for (var name_1 in nodeMatches) {
        if (nodeMatches.hasOwnProperty(name_1)) {
            matches.push(nodeMatches[name_1]);
        }
    }
    for (var name_2 in attrMatches) {
        if (attrMatches.hasOwnProperty(name_2)) {
            matches.push(attrMatches[name_2]);
        }
    }
    return matches;
};
var filter = function (nodeFilters, attributeFilters, node) {
    var matches = findMatchingNodes(nodeFilters, attributeFilters, node);
    Arr.each(matches, function (match) {
        Arr.each(match.filter.callbacks, function (callback) {
            callback(match.nodes, match.filter.name, {});
        });
    });
};
export { filter };
//# sourceMappingURL=FilterNode.js.map