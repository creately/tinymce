/**
 * Hooks.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import Arr from '../util/Arr';
import NodeType from '../dom/NodeType';
import $ from '../api/dom/DomQuery';
/**
 * Internal class for overriding formatting.
 *
 * @private
 * @class tinymce.fmt.Hooks
 */
var postProcessHooks = {}, filter = Arr.filter, each = Arr.each;
var addPostProcessHook = function (name, hook) {
    var hooks = postProcessHooks[name];
    if (!hooks) {
        postProcessHooks[name] = hooks = [];
    }
    postProcessHooks[name].push(hook);
};
var postProcess = function (name, editor) {
    each(postProcessHooks[name], function (hook) {
        hook(editor);
    });
};
addPostProcessHook('pre', function (editor) {
    var rng = editor.selection.getRng();
    var isPre, blocks;
    var hasPreSibling = function (pre) {
        return isPre(pre.previousSibling) && Arr.indexOf(blocks, pre.previousSibling) !== -1;
    };
    var joinPre = function (pre1, pre2) {
        $(pre2).remove();
        $(pre1).append('<br><br>').append(pre2.childNodes);
    };
    isPre = NodeType.matchNodeNames('pre');
    if (!rng.collapsed) {
        blocks = editor.selection.getSelectedBlocks();
        each(filter(filter(blocks, isPre), hasPreSibling), function (pre) {
            joinPre(pre.previousSibling, pre);
        });
    }
});
export default {
    postProcess: postProcess
};
//# sourceMappingURL=Hooks.js.map