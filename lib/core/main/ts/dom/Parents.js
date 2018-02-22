/**
 * Parents.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Fun } from '@ephox/katamari';
import { Compare, Traverse } from '@ephox/sugar';
var dropLast = function (xs) {
    return xs.slice(0, -1);
};
var parentsUntil = function (startNode, rootElm, predicate) {
    if (Compare.contains(rootElm, startNode)) {
        return dropLast(Traverse.parents(startNode, function (elm) {
            return predicate(elm) || Compare.eq(elm, rootElm);
        }));
    }
    else {
        return [];
    }
};
var parents = function (startNode, rootElm) {
    return parentsUntil(startNode, rootElm, Fun.constant(false));
};
var parentsAndSelf = function (startNode, rootElm) {
    return [startNode].concat(parents(startNode, rootElm));
};
export default {
    parentsUntil: parentsUntil,
    parents: parents,
    parentsAndSelf: parentsAndSelf
};
//# sourceMappingURL=Parents.js.map