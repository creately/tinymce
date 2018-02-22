import { Pipeline, RawAssertions, Step } from '@ephox/agar';
import { TinyLoader, TinyUi } from '@ephox/mcagar';
import ModernTheme from 'tinymce/themes/modern/Theme';
import { UnitTest } from '@ephox/bedrock';
UnitTest.asynctest('browser.tinymce.core.fmt.FontsizeFormatTest', function () {
    var success = arguments[arguments.length - 2];
    var failure = arguments[arguments.length - 1];
    ModernTheme();
    var sAssertMenuItemCount = function (expected, editor) {
        return Step.sync(function () {
            var actual = document.querySelectorAll('.mce-menu-item').length;
            RawAssertions.assertEq('Should be correct count', expected, actual);
        });
    };
    TinyLoader.setup(function (editor, onSuccess, onFailure) {
        var tinyUi = TinyUi(editor);
        Pipeline.async({}, [
            tinyUi.sClickOnToolbar('Could not find fontsize select', 'div[aria-label="Font Sizes"] button'),
            tinyUi.sWaitForUi('Menu did not appear', 'div.mce-floatpanel'),
            sAssertMenuItemCount(1, editor)
        ], onSuccess, onFailure);
    }, {
        toolbar: 'fontsizeselect',
        fontsize_formats: '1em',
        skin_url: '/project/js/tinymce/skins/lightgray'
    }, success, failure);
});
//# sourceMappingURL=FontsizeFormatTest.js.map