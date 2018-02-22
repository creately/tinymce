import { Assertions, Pipeline, Step } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock';
import { TinyApis, TinyLoader } from '@ephox/mcagar';
import ElementMatcher from 'tinymce/themes/inlite/core/ElementMatcher';
import PredicateId from 'tinymce/themes/inlite/core/PredicateId';
import Theme from 'tinymce/themes/inlite/Theme';
UnitTest.asynctest('browser.core.ElementMatcherTest', function () {
    var success = arguments[arguments.length - 2];
    var failure = arguments[arguments.length - 1];
    Theme();
    var eq = function (target) { return function (elm) { return elm === target; }; };
    var constantFalse = function () {
        return false;
    };
    var sElementTest = function (tinyApis, editor, inputHtml, selector) {
        return Step.sync(function () {
            var target, result;
            editor.setContent(inputHtml);
            target = editor.dom.select(selector)[0];
            result = ElementMatcher.element(target, [
                PredicateId.create('a', constantFalse),
                PredicateId.create('b', eq(target)),
            ])(editor);
            Assertions.assertEq('Should be matching B', 'b', result.id);
            Assertions.assertEq('Should be have width', true, result.rect.w > 0);
        });
    };
    var sParentTest = function (tinyApis, editor, inputHtml, selector) {
        return Step.sync(function () {
            var target, parents, result;
            editor.setContent(inputHtml);
            target = editor.dom.select(selector)[0];
            parents = editor.dom.getParents(target);
            result = ElementMatcher.parent(parents, [
                PredicateId.create('a', constantFalse),
                PredicateId.create('b', eq(parents[1])),
                PredicateId.create('c', eq(parents[0])),
            ])(editor);
            Assertions.assertEq('Should be matching C the closest one', 'c', result.id);
            Assertions.assertEq('Should be have width', true, result.rect.w > 0);
        });
    };
    TinyLoader.setup(function (editor, onSuccess, onFailure) {
        var tinyApis = TinyApis(editor);
        Pipeline.async({}, [
            sElementTest(tinyApis, editor, '<p>a</p>', 'p'),
            sParentTest(tinyApis, editor, '<div><p><em>a</em></p></div>', 'em'),
        ], onSuccess, onFailure);
    }, {
        inline: true,
        theme: 'inlite',
        skin_url: '/project/js/tinymce/skins/lightgray',
    }, success, failure);
});
//# sourceMappingURL=ElementMatcherTest.js.map