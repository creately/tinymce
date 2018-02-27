import Node from '../api/html/Node';
var paddEmptyNode = function (settings, args, blockElements, node) {
    var brPreferred = settings.padd_empty_with_br || args.insert;
    if (brPreferred && blockElements[node.name]) {
        node.empty().append(new Node('br', 1)).shortEnded = true;
    }
    else {
        node.empty().append(new Node('#text', 3)).value = '\u00a0';
    }
};
var isPaddedWithNbsp = function (node) {
    return hasOnlyChild(node, '#text') && node.firstChild.value === '\u00a0';
};
var hasOnlyChild = function (node, name) {
    return node && node.firstChild && node.firstChild === node.lastChild && node.firstChild.name === name;
};
var isPadded = function (schema, node) {
    var rule = schema.getElementRule(node.name);
    return rule && rule.paddEmpty;
};
var isEmpty = function (schema, nonEmptyElements, whitespaceElements, node) {
    return node.isEmpty(nonEmptyElements, whitespaceElements, function (node) {
        return isPadded(schema, node);
    });
};
var isLineBreakNode = function (node, blockElements) { return node && (blockElements[node.name] || node.name === 'br'); };
export { paddEmptyNode, isPaddedWithNbsp, hasOnlyChild, isEmpty, isLineBreakNode };
//# sourceMappingURL=ParserUtils.js.map