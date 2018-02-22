import { Assertions, Chain, Pipeline, UiFinder } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock';
import { TinyDom, TinyLoader, TinyUi } from '@ephox/mcagar';
import { Html } from '@ephox/sugar';
import HelpPlugin from 'tinymce/plugins/help/Plugin';
import LinkPlugin from 'tinymce/plugins/link/Plugin';
import Theme from 'tinymce/themes/modern/Theme';
UnitTest.asynctest('browser.plugin.IgnoreForcedPluginsTest', function () {
    var success = arguments[arguments.length - 2];
    var failure = arguments[arguments.length - 1];
    Theme();
    HelpPlugin();
    LinkPlugin();
    var sAssertPluginList = function (html) {
        return Chain.asStep(TinyDom.fromDom(document.body), [
            UiFinder.cWaitFor('Could not find notification', 'div.mce-floatpanel ul'),
            Chain.mapper(Html.get),
            Assertions.cAssertHtml('Plugin list html does not match', html)
        ]);
    };
    TinyLoader.setup(function (editor, onSuccess, onFailure) {
        var tinyUi = TinyUi(editor);
        Pipeline.async({}, [
            tinyUi.sClickOnToolbar('click on button', 'button'),
            sAssertPluginList('<li><a href="https://www.tinymce.com/docs/plugins/help" target="_blank" rel="noopener">Help</a></li>')
        ], onSuccess, onFailure);
    }, {
        plugins: 'help link',
        toolbar: 'help',
        forced_plugins: ['link'],
        skin_url: '/project/js/tinymce/skins/lightgray'
    }, success, failure);
});
//# sourceMappingURL=IgnoreForcedPluginsTest.js.map