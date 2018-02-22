import { Pipeline, RawAssertions, Step } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock';
import { TinyApis, TinyLoader } from '@ephox/mcagar';
import PreviewPlugin from 'tinymce/plugins/preview/Plugin';
import IframeContent from 'tinymce/plugins/preview/ui/IframeContent';
import ModernTheme from 'tinymce/themes/modern/Theme';
UnitTest.asynctest('browser.tinymce.plugins.preview.PreviewContentStyleTest', function () {
    var success = arguments[arguments.length - 2];
    var failure = arguments[arguments.length - 1];
    ModernTheme();
    PreviewPlugin();
    var assertIframeContains = function (editor, text, expected) {
        var actual = IframeContent.getPreviewHtml(editor);
        var regexp = new RegExp(text);
        RawAssertions.assertEq('Should be same html', expected, regexp.test(actual));
    };
    var sAssertIframeHtmlContains = function (editor, text) {
        return Step.sync(function () {
            assertIframeContains(editor, text, true);
        });
    };
    var sAssertIframeHtmlNotContains = function (editor, text) {
        return Step.sync(function () {
            assertIframeContains(editor, text, false);
        });
    };
    TinyLoader.setup(function (editor, onSuccess, onFailure) {
        var tinyApis = TinyApis(editor);
        Pipeline.async({}, [
            tinyApis.sSetContent('<p>hello world</p>'),
            tinyApis.sSetSetting('content_style', 'p {color: blue;}'),
            sAssertIframeHtmlContains(editor, '<style type="text/css">p {color: blue;}</style>'),
            tinyApis.sDeleteSetting('content_style'),
            sAssertIframeHtmlNotContains(editor, '<style type="text/css">p {color: blue;}</style>')
        ], onSuccess, onFailure);
    }, {
        plugins: 'preview',
        skin_url: '/project/js/tinymce/skins/lightgray'
    }, success, failure);
});
//# sourceMappingURL=PreviewContentStyleTest.js.map