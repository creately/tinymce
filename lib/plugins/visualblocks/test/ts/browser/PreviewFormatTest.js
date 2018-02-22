import { Assertions, GeneralSteps, Logger, Pipeline, Step, Waiter } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock';
import { TinyApis, TinyLoader } from '@ephox/mcagar';
import { Class, Css, Element } from '@ephox/sugar';
import VisualBlocksPlugin from 'tinymce/plugins/visualblocks/Plugin';
import ModernTheme from 'tinymce/themes/modern/Theme';
UnitTest.asynctest('browser.tinymce.plugins.visualblocks.PreviewFormatsTest', function () {
    var success = arguments[arguments.length - 2];
    var failure = arguments[arguments.length - 1];
    ModernTheme();
    VisualBlocksPlugin();
    var sWaitForVisualBlocks = function (editor) {
        return Waiter.sTryUntil('Wait background css to be applied to first element', Step.sync(function () {
            var p = Element.fromDom(editor.getBody().firstChild);
            var background = Css.get(p, 'background-image');
            Assertions.assertEq('Paragraph should have a url background', true, background.indexOf('url(') === 0);
        }), 10, 1000);
    };
    TinyLoader.setup(function (editor, onSuccess, onFailure) {
        var tinyApis = TinyApis(editor);
        Pipeline.async({}, [
            Logger.t('Toggle on/off visualblocks and compute previews', GeneralSteps.sequence([
                tinyApis.sExecCommand('mceVisualBlocks'),
                sWaitForVisualBlocks(editor),
                Step.sync(function () {
                    Assertions.assertEq('Visual blocks class should exist', true, Class.has(Element.fromDom(editor.getBody()), 'mce-visualblocks'));
                    Assertions.assertEq('Should not have a border property', true, editor.formatter.getCssText('h1').indexOf('border:1px dashed') === -1);
                }),
                tinyApis.sExecCommand('mceVisualBlocks'),
                Step.sync(function () {
                    Assertions.assertEq('Visual blocks class should not exist', false, Class.has(Element.fromDom(editor.getBody()), 'mce-visualblocks'));
                    Assertions.assertEq('Should not have a border property', true, editor.formatter.getCssText('h1').indexOf('border:1px dashed') === -1);
                    Assertions.assertEq('Visual blocks class should still not exist', false, Class.has(Element.fromDom(editor.getBody()), 'mce-visualblocks'));
                })
            ]))
        ], onSuccess, onFailure);
    }, {
        plugins: 'visualblocks',
        toolbar: 'visualblocks',
        visualblocks_content_css: '/project/js/tinymce/plugins/visualblocks/css/visualblocks.css',
        skin_url: '/project/js/tinymce/skins/lightgray'
    }, success, failure);
});
//# sourceMappingURL=PreviewFormatTest.js.map