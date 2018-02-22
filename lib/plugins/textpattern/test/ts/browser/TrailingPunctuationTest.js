import { ApproxStructure, GeneralSteps, Logger, Pipeline, Step, Waiter } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock';
import { TinyApis, TinyLoader } from '@ephox/mcagar';
import TextpatternPlugin from 'tinymce/plugins/textpattern/Plugin';
import ModernTheme from 'tinymce/themes/modern/Theme';
UnitTest.asynctest('browser.tinymce.plugins.textpattern.TrailingPunctuationTest', function () {
    var success = arguments[arguments.length - 2];
    var failure = arguments[arguments.length - 1];
    ModernTheme();
    TextpatternPlugin();
    var sTypeChar = function (editor, character) {
        return Step.sync(function () {
            var charCode = character.charCodeAt(0);
            editor.fire('keypress', { charCode: charCode });
        });
    };
    var sTypeAndTrigger = function (tinyApis, editor) {
        return function (label, patternText, trigger, tag, rawText) {
            return Logger.t(label, GeneralSteps.sequence([
                tinyApis.sSetContent('<p>' + patternText + trigger + '</p>'),
                tinyApis.sFocus,
                tinyApis.sSetCursor([0, 0], patternText.length + 1),
                sTypeChar(editor, trigger),
                Waiter.sTryUntil('did not get expected format', tinyApis.sAssertContentStructure(ApproxStructure.build(function (s, str) {
                    return s.element('body', {
                        children: [
                            s.element('p', {
                                children: [
                                    s.element(tag, {
                                        children: [
                                            s.text(str.is(rawText))
                                        ]
                                    }),
                                    s.text(str.is(trigger))
                                ]
                            })
                        ]
                    });
                })), 100, 4000)
            ]));
        };
    };
    TinyLoader.setup(function (editor, onSuccess, onFailure) {
        var tinyApis = TinyApis(editor);
        var tnt = sTypeAndTrigger(tinyApis, editor);
        Pipeline.async({}, [
            tnt('em with ,', '*a*', ',', 'em', 'a'),
            tnt('strong with ,', '**a**', ',', 'strong', 'a'),
            tnt('em with .', '*a*', '.', 'em', 'a'),
            tnt('strong with .', '**a**', '.', 'strong', 'a'),
            tnt('em with ;', '*a*', ';', 'em', 'a'),
            tnt('strong with ;', '**a**', ';', 'strong', 'a'),
            tnt('em with :', '*a*', ':', 'em', 'a'),
            tnt('strong with :', '**a**', ':', 'strong', 'a'),
            tnt('em with !', '*a*', '!', 'em', 'a'),
            tnt('strong with !', '**a**', '!', 'strong', 'a'),
            tnt('em with ?', '*a*', '?', 'em', 'a'),
            tnt('strong with ?', '**a**', '?', 'strong', 'a')
        ], onSuccess, onFailure);
    }, {
        plugins: 'textpattern',
        skin_url: '/project/js/tinymce/skins/lightgray'
    }, success, failure);
});
//# sourceMappingURL=TrailingPunctuationTest.js.map