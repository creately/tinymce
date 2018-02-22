import { Chain, Logger, Pipeline } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock';
import { Editor as McEditor } from '@ephox/mcagar';
import { Editor } from 'tinymce/core/api/Editor';
import EditorManager from 'tinymce/core/api/EditorManager';
import Theme from 'tinymce/themes/modern/Theme';
UnitTest.asynctest('browser.tinymce.core.EditorRemoveTest', function (success, failure) {
    Theme();
    var settings = {
        skin_url: '/project/js/tinymce/skins/lightgray'
    };
    var cCreateEditor = Chain.on(function (_, next, die) { return next(Chain.wrap(new Editor('editor', {}, EditorManager))); });
    var cRemoveEditor = Chain.op(function (editor) { return editor.remove(); });
    Pipeline.async({}, [
        Logger.t('remove editor without initializing it', Chain.asStep({}, [
            cCreateEditor,
            cRemoveEditor,
        ])),
        Logger.t('remove editor where the body has been removed', Chain.asStep({}, [
            McEditor.cFromHtml('<textarea></textarea>', settings),
            Chain.mapper(function (value) {
                var body = value.getBody();
                body.parentNode.removeChild(body);
                return value;
            }),
            McEditor.cRemove
        ]))
    ], function () {
        success();
    }, failure);
});
//# sourceMappingURL=EditorRemoveTest.js.map