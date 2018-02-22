/**
 * DomSerializer.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Fun, Merger } from '@ephox/katamari';
import Events from '../api/Events';
import DOMUtils from '../api/dom/DOMUtils';
import DomSerializerFilters from './DomSerializerFilters';
import DomSerializerPreProcess from './DomSerializerPreProcess';
import DomParser from '../api/html/DomParser';
import Schema from '../api/html/Schema';
import Serializer from '../api/html/Serializer';
import Zwsp from '../text/Zwsp';
import Tools from '../api/util/Tools';
var addTempAttr = function (htmlParser, tempAttrs, name) {
    if (Tools.inArray(tempAttrs, name) === -1) {
        htmlParser.addAttributeFilter(name, function (nodes, name) {
            var i = nodes.length;
            while (i--) {
                nodes[i].attr(name, null);
            }
        });
        tempAttrs.push(name);
    }
};
var postProcess = function (editor, args, content) {
    if (!args.no_events && editor) {
        var outArgs = Events.firePostProcess(editor, Merger.merge(args, { content: content }));
        return outArgs.content;
    }
    else {
        return content;
    }
};
var getHtmlFromNode = function (dom, node, args) {
    var html = Zwsp.trim(args.getInner ? node.innerHTML : dom.getOuterHTML(node));
    return args.selection ? html : Tools.trim(html);
};
var parseHtml = function (htmlParser, dom, html, args) {
    var parserArgs = args.selection ? Merger.merge({ forced_root_block: false }, args) : args;
    var rootNode = htmlParser.parse(html, parserArgs);
    DomSerializerFilters.trimTrailingBr(rootNode);
    return rootNode;
};
var serializeNode = function (settings, schema, node) {
    var htmlSerializer = Serializer(settings, schema);
    return htmlSerializer.serialize(node);
};
var toHtml = function (editor, settings, schema, rootNode, args) {
    var content = serializeNode(settings, schema, rootNode);
    return postProcess(editor, args, content);
};
export default function (settings, editor) {
    var dom, schema, htmlParser;
    var tempAttrs = ['data-mce-selected'];
    dom = editor && editor.dom ? editor.dom : DOMUtils.DOM;
    schema = editor && editor.schema ? editor.schema : Schema(settings);
    settings.entity_encoding = settings.entity_encoding || 'named';
    settings.remove_trailing_brs = 'remove_trailing_brs' in settings ? settings.remove_trailing_brs : true;
    htmlParser = DomParser(settings, schema);
    DomSerializerFilters.register(htmlParser, settings, dom);
    var serialize = function (node, parserArgs) {
        var args = Merger.merge({ format: 'html' }, parserArgs ? parserArgs : {});
        var targetNode = DomSerializerPreProcess.process(editor, node, args);
        var html = getHtmlFromNode(dom, targetNode, args);
        var rootNode = parseHtml(htmlParser, dom, html, args);
        return args.format === 'tree' ? rootNode : toHtml(editor, settings, schema, rootNode, args);
    };
    return {
        schema: schema,
        addNodeFilter: htmlParser.addNodeFilter,
        addAttributeFilter: htmlParser.addAttributeFilter,
        serialize: serialize,
        addRules: function (rules) {
            schema.addValidElements(rules);
        },
        setRules: function (rules) {
            schema.setValidElements(rules);
        },
        addTempAttr: Fun.curry(addTempAttr, htmlParser, tempAttrs),
        getTempAttrs: function () {
            return tempAttrs;
        }
    };
}
//# sourceMappingURL=DomSerializer.js.map