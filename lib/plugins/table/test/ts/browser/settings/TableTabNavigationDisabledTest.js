import { GeneralSteps, Keys, Logger, Pipeline } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock';
import { TinyActions, TinyApis, TinyLoader } from '@ephox/mcagar';
import TablePlugin from 'tinymce/plugins/table/Plugin';
import ModernTheme from 'tinymce/themes/modern/Theme';
import TableTestUtils from '../../module/test/TableTestUtils';
UnitTest.asynctest('browser.tinymce.plugins.table.TableTablNavigationDisabledTest', function () {
    var success = arguments[arguments.length - 2];
    var failure = arguments[arguments.length - 1];
    ModernTheme();
    TablePlugin();
    var tableHtml = '<table><tbody><tr><td>a</td></tr><tr><td>a</td></tr></tbody></table>';
    TinyLoader.setup(function (editor, onSuccess, onFailure) {
        var tinyApis = TinyApis(editor);
        var tinyActions = TinyActions(editor);
        Pipeline.async({}, [
            Logger.t('test table grid disabled', GeneralSteps.sequence([
                tinyApis.sFocus,
                tinyApis.sSetContent(tableHtml),
                TableTestUtils.sOpenToolbarOn(editor, 'td', [0]),
                tinyActions.sContentKeystroke(Keys.tab(), {}),
                tinyApis.sAssertSelection([0, 0, 0, 0], 0, [0, 0, 0, 0], 1)
            ]))
        ], onSuccess, onFailure);
    }, {
        plugins: 'table',
        table_tab_navigation: false,
        skin_url: '/project/js/tinymce/skins/lightgray'
    }, success, failure);
});
//# sourceMappingURL=TableTabNavigationDisabledTest.js.map