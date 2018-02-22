import { Pipeline, RawAssertions, Step } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock';
import { TinyLoader } from '@ephox/mcagar';
import Settings from 'tinymce/plugins/spellchecker/api/Settings';
import SpellcheckerPlugin from 'tinymce/plugins/spellchecker/Plugin';
import ModernTheme from 'tinymce/themes/modern/Theme';
UnitTest.asynctest('browser.tinymce.plugins.spellchecker.SpellcheckerTest', function () {
    var success = arguments[arguments.length - 2];
    var failure = arguments[arguments.length - 1];
    ModernTheme();
    SpellcheckerPlugin();
    var sTestDefaultLanguage = function (editor) {
        return Step.sync(function () {
            RawAssertions.assertEq('should be same', Settings.getLanguage(editor), 'en');
        });
    };
    var sCheckButtonType = function (editor, expected) {
        return Step.sync(function () {
            var button = editor.buttons.spellchecker;
            RawAssertions.assertEq('should have same type', expected, button.type);
        });
    };
    TinyLoader.setup(function (editor, onSuccess, onFailure) {
        Pipeline.async({}, [
            sTestDefaultLanguage(editor),
            sCheckButtonType(editor, 'splitbutton')
        ], onSuccess, onFailure);
    }, {
        plugins: 'spellchecker',
        toolbar: 'spellchecker',
        skin_url: '/project/js/tinymce/skins/lightgray'
    }, success, failure);
});
//# sourceMappingURL=SpellcheckerTest.js.map