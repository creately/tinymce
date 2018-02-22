import { Assertions, GeneralSteps, Keys, Keyboard, Logger, Pipeline, Step } from '@ephox/agar';
import { TinyActions, TinyApis, TinyLoader } from '@ephox/mcagar';
import { Element } from '@ephox/sugar';
import Theme from 'tinymce/themes/modern/Theme';
import { UnitTest } from '@ephox/bedrock';
UnitTest.asynctest('browser.tinymce.core.dom.SelectionQuirksTest', function () {
    var success = arguments[arguments.length - 2];
    var failure = arguments[arguments.length - 1];
    Theme();
    TinyLoader.setup(function (editor, onSuccess, onFailure) {
        var tinyApis = TinyApis(editor);
        var tinyActions = TinyActions(editor);
        var count;
        // hijack editor.selection.normalize() to count how many times it will be invoked
        var backupNormalize = editor.selection.normalize;
        var normalize = function () {
            count = count === undefined ? 1 : count + 1;
            backupNormalize.apply(this, arguments);
        };
        editor.selection.normalize = normalize;
        var sResetNormalizeCounter = function () {
            return Step.sync(function () {
                count = 0;
            });
        };
        var sAssertNormalizeCounter = function (expected) {
            return Step.sync(function () {
                Assertions.assertEq('checking normalization counter', expected, count);
            });
        };
        var sClickBody = function (editor) {
            return Step.sync(function () {
                var target = editor.getBody();
                editor.fire('mousedown', { target: target });
                editor.fire('mouseup', { target: target });
                editor.fire('click', { target: target });
            });
        };
        Pipeline.async({}, [
            tinyApis.sFocus,
            Logger.t('Test normalization for floated images', GeneralSteps.sequence([
                tinyApis.sSetContent('<p>a<img src="about:blank" style="float: right"></p>'),
                tinyApis.sSetSelection([0], 1, [0], 2),
                Step.sync(function () {
                    var selection = editor.selection.getSel();
                    Assertions.assertEq('Anchor node should be the paragraph not the text node', 'P', selection.anchorNode.nodeName);
                    Assertions.assertEq('Anchor offset should be the element index', 1, selection.anchorOffset);
                })
            ])),
            Logger.t('Normalize on key events when range is collapsed', GeneralSteps.sequence([
                tinyApis.sSetContent('<p>a</p><p>b</p>'),
                tinyApis.sSetSelection([], 1, [], 1),
                tinyActions.sContentKeystroke(Keys.escape(), {}),
                tinyApis.sAssertSelection([1, 0], 0, [1, 0], 0)
            ])),
            Logger.t('Normalize on mouse events when range is expanded', GeneralSteps.sequence([
                tinyApis.sSetContent('<p>a</p><p>b</p>'),
                tinyApis.sSetSelection([], 0, [], 1),
                sClickBody(editor),
                tinyApis.sAssertSelection([0, 0], 0, [0, 0], 1)
            ])),
            Logger.t('Normalize on mouse events when range is collapsed', GeneralSteps.sequence([
                tinyApis.sSetContent('<p>a</p><p>b</p>'),
                tinyApis.sSetSelection([], 1, [], 1),
                sClickBody(editor),
                tinyApis.sAssertSelection([1, 0], 0, [1, 0], 0)
            ])),
            Logger.t('Normalization during operations with modifier keys, should run only once in the end when user releases modifier key.', GeneralSteps.sequence([
                sResetNormalizeCounter(),
                tinyApis.sSetContent('<p><b>a</b><i>a</i></p>'),
                tinyApis.sSetSelection([0, 0, 0], 0, [0, 0], 0),
                Keyboard.sKeyup(Element.fromDom(editor.getDoc()), Keys.left(), { shift: true }),
                sAssertNormalizeCounter(0),
                Keyboard.sKeyup(Element.fromDom(editor.getDoc()), 17, {}),
                sAssertNormalizeCounter(1),
                tinyApis.sAssertSelection([0, 0], 0, [0, 0], 0)
            ]))
        ], onSuccess, onFailure);
    }, {
        theme: 'modern',
        skin_url: '/project/js/tinymce/skins/lightgray'
    }, success, failure);
});
//# sourceMappingURL=SelectionQuirksTest.js.map