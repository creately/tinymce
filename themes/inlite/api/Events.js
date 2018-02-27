var fireSkinLoaded = function (editor) {
    editor.fire('SkinLoaded');
};
var fireBeforeRenderUI = function (editor) {
    return editor.fire('BeforeRenderUI');
};
export default {
    fireSkinLoaded: fireSkinLoaded,
    fireBeforeRenderUI: fireBeforeRenderUI
};
//# sourceMappingURL=Events.js.map