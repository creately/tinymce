import { GeneralSteps, Logger, Pipeline, Step } from '@ephox/agar';
import { TinyApis, TinyLoader } from '@ephox/mcagar';
import Theme from 'tinymce/themes/modern/Theme';
import { UnitTest } from '@ephox/bedrock';
import * as EditorContent from 'tinymce/core/EditorContent';
import Assertions from '@ephox/agar/lib/main/ts/ephox/agar/api/Assertions';
import Serializer from 'tinymce/core/api/html/Serializer';
import Node from 'tinymce/core/api/html/Node';
UnitTest.asynctest('browser.tinymce.core.EditorGetContentTreeTest', function () {
    var success = arguments[arguments.length - 2];
    var failure = arguments[arguments.length - 1];
    var getFontTree = function () {
        var body = new Node('body', 1);
        var font = new Node('font', 1);
        var text = new Node('#text', 3);
        text.value = 'x';
        font.attr('size', '7');
        font.append(text);
        body.append(font);
        return body;
    };
    Theme();
    var toHtml = function (node) {
        var htmlSerializer = Serializer({});
        return htmlSerializer.serialize(node);
    };
    TinyLoader.setup(function (editor, onSuccess, onFailure) {
        var tinyApis = TinyApis(editor);
        Pipeline.async({}, [
            Logger.t('getContent html', GeneralSteps.sequence([
                tinyApis.sSetContent('<p>html</p>'),
                Step.sync(function () {
                    var html = EditorContent.getContent(editor);
                    Assertions.assertHtml('Should be expected html', '<p>html</p>', html);
                })
            ])),
            Logger.t('getContent tree', GeneralSteps.sequence([
                tinyApis.sSetContent('<p>tree</p>'),
                Step.sync(function () {
                    var tree = EditorContent.getContent(editor, { format: 'tree' });
                    Assertions.assertHtml('Should be expected tree html', '<p>tree</p>', toHtml(tree));
                })
            ])),
            Logger.t('getContent tree filtered', GeneralSteps.sequence([
                Step.sync(function () {
                    EditorContent.setContent(editor, '<p><font size="7">x</font></p>', { format: 'raw' });
                    var tree = EditorContent.getContent(editor, { format: 'tree' });
                    Assertions.assertHtml('Should be expected tree filtered html', '<p><span style="font-size: 300%;">x</span></p>', toHtml(tree));
                })
            ])),
            Logger.t('getContent tree using public api', GeneralSteps.sequence([
                tinyApis.sSetContent('<p>html</p>'),
                Step.sync(function () {
                    var tree = editor.getContent({ format: 'tree' });
                    Assertions.assertHtml('Should be expected filtered html', '<p>html</p>', toHtml(tree));
                })
            ])),
            Logger.t('setContent html', GeneralSteps.sequence([
                tinyApis.sSetContent('<p>html</p>'),
                Step.sync(function () {
                    EditorContent.setContent(editor, '<p>new html</p>');
                }),
                tinyApis.sAssertContent('<p>new html</p>')
            ])),
            Logger.t('setContent tree', GeneralSteps.sequence([
                tinyApis.sSetContent('<p>tree</p>'),
                Step.sync(function () {
                    var tree = EditorContent.getContent(editor, { format: 'tree' });
                    Assertions.assertHtml('Should be expected tree html', '<p>tree</p>', toHtml(tree));
                    EditorContent.setContent(editor, '<p>new html</p>');
                    Assertions.assertHtml('Should be expected html', '<p>new html</p>', EditorContent.getContent(editor));
                    EditorContent.setContent(editor, tree);
                    Assertions.assertHtml('Should be expected tree html', '<p>tree</p>', EditorContent.getContent(editor));
                })
            ])),
            Logger.t('setContent tree filtered', GeneralSteps.sequence([
                tinyApis.sSetContent('<p>tree</p>'),
                Step.sync(function () {
                    EditorContent.setContent(editor, getFontTree());
                    Assertions.assertHtml('Should be expected filtered html', '<span style="font-size: 300%;">x</span>', EditorContent.getContent(editor));
                })
            ])),
            Logger.t('setContent tree using public api', GeneralSteps.sequence([
                tinyApis.sSetContent('<p>tree</p>'),
                Step.sync(function () {
                    editor.setContent(getFontTree());
                    Assertions.assertHtml('Should be expected filtered html', '<span style="font-size: 300%;">x</span>', EditorContent.getContent(editor));
                })
            ]))
        ], onSuccess, onFailure);
    }, {
        skin_url: '/project/js/tinymce/skins/lightgray',
        inline: true
    }, success, failure);
});
//# sourceMappingURL=EditorContentTest.js.map