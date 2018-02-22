import { Assertions, GeneralSteps, Logger, Pipeline, Step } from '@ephox/agar';
import { TinyApis, TinyLoader } from '@ephox/mcagar';
import { Element, SelectorFind, Traverse } from '@ephox/sugar';
import { UnitTest } from '@ephox/bedrock';
UnitTest.asynctest('browser.tinymce.core.init.InitEditorNoThemeIframeTest', function () {
    var success = arguments[arguments.length - 2];
    var failure = arguments[arguments.length - 1];
    TinyLoader.setup(function (editor, onSuccess, onFailure) {
        var tinyApis = TinyApis(editor);
        Pipeline.async({}, [
            Logger.t('Tests if the editor is responsive after setting theme to false', GeneralSteps.sequence([
                tinyApis.sSetContent('<p>a</p>'),
                tinyApis.sAssertContent('<p>a</p>')
            ])),
            Logger.t('Editor element properties', Step.sync(function () {
                var body = Element.fromDom(document.body);
                var targetElement = SelectorFind.descendant(body, '#' + editor.id).getOrDie('No elm');
                var editorElement = Traverse.nextSibling(targetElement).getOrDie('No elm');
                Assertions.assertDomEq('Should be expected element', editorElement, Element.fromDom(editor.editorContainer));
                Assertions.assertDomEq('Should be expected element', editorElement, Element.fromDom(editor.contentAreaContainer));
                Assertions.assertDomEq('Should be expected element', targetElement, Element.fromDom(editor.getElement()));
            }))
        ], onSuccess, onFailure);
    }, {
        theme: false,
        skin_url: '/project/js/tinymce/skins/lightgray',
        init_instance_callback: function (editor) {
            editor.fire('SkinLoaded');
        }
    }, success, failure);
});
//# sourceMappingURL=InitEditorNoThemeIframeTest.js.map