import { Pipeline, RawAssertions, Step, Chain, UiFinder, Mouse } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock';
import { TinyLoader, TinyApis, TinyUi } from '@ephox/mcagar';
import SpellcheckerPlugin from 'tinymce/plugins/spellchecker/Plugin';
import ModernTheme from 'tinymce/themes/modern/Theme';
import { Element, Body } from '@ephox/sugar';
UnitTest.asynctest('browser.tinymce.plugins.spellchecker.AddToDictionaryTest', function (success, failure) {
    ModernTheme();
    SpellcheckerPlugin();
    var dict = [];
    TinyLoader.setup(function (editor, onSuccess, onFailure) {
        var tinyApis = TinyApis(editor);
        var tinyUi = TinyUi(editor);
        Pipeline.async({}, [
            tinyApis.sFocus,
            tinyApis.sSetContent('<p>hello world</p>'),
            tinyUi.sClickOnToolbar('click spellcheck button', 'div[aria-label="Spellcheck"] button'),
            Chain.asStep(Element.fromDom(editor.getBody()), [
                UiFinder.cFindIn('span:contains("hello")'),
                Mouse.cClick
            ]),
            Chain.asStep(Body.body(), [
                UiFinder.cWaitFor('wait for context menu', 'div.mce-floatpanel'),
                UiFinder.cFindIn('span:contains("Add to Dictionary")'),
                Mouse.cClick
            ]),
            Step.sync(function () { return RawAssertions.assertEq('dict should now have hello', ['hello'], dict); })
        ], onSuccess, onFailure);
    }, {
        plugins: 'spellchecker',
        toolbar: 'spellchecker',
        spellchecker_languages: 'English=en,French=fr,German=de',
        skin_url: '/project/js/tinymce/skins/lightgray',
        spellchecker_callback: function (method, text, success, failure) {
            if (method === 'spellcheck') {
                success({ dictionary: dict, words: { hello: ['word1'], world: ['word2'] } });
            }
            else if (method === 'addToDictionary') {
                dict.push(text);
                success();
            }
        }
    }, success, failure);
});
//# sourceMappingURL=AddToDictionaryTest.js.map