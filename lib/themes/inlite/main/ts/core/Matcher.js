// result :: String, Rect -> Matcher.result
var result = function (id, rect) {
    return {
        id: id,
        rect: rect
    };
};
// match :: Editor, [(Editor -> Matcher.result | Null)] -> Matcher.result | Null
var match = function (editor, matchers) {
    for (var i = 0; i < matchers.length; i++) {
        var f = matchers[i];
        var result_1 = f(editor);
        if (result_1) {
            return result_1;
        }
    }
    return null;
};
export default {
    match: match,
    result: result
};
//# sourceMappingURL=Matcher.js.map