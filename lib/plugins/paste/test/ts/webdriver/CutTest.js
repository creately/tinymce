import { Pipeline, RealMouse, Waiter } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock';
import { TinyApis, TinyLoader, TinyUi } from '@ephox/mcagar';
import { PlatformDetection } from '@ephox/sand';
import PastePlugin from 'tinymce/plugins/paste/Plugin';
import Theme from 'tinymce/themes/modern/Theme';
UnitTest.asynctest('tinymce.plugins.paste.webdriver.CutTest', function () {
    var success = arguments[arguments.length - 2];
    var failure = arguments[arguments.length - 1];
    Theme();
    PastePlugin();
    var platform = PlatformDetection.detect();
    /* Test does not work on Phantom */
    if (window.navigator.userAgent.indexOf('PhantomJS') > -1) {
        return success();
    }
    TinyLoader.setup(function (editor, onSuccess, onFailure) {
        var api = TinyApis(editor);
        var ui = TinyUi(editor);
        // Cut doesn't seem to work in webdriver mode on ie, firefox is producing moveto not supported, edge fails if it's not observed
        Pipeline.async({}, (platform.browser.isIE() || platform.browser.isFirefox() || platform.browser.isEdge()) ? [] : [
            api.sSetContent('<p>abc</p>'),
            api.sSetSelection([0, 0], 1, [0, 0], 2),
            ui.sClickOnMenu('Click Edit menu', 'button:contains("Edit")'),
            ui.sWaitForUi('Wait for dropdown', '.mce-floatpanel[role="application"]'),
            RealMouse.sClickOn('.mce-i-cut'),
            Waiter.sTryUntil('Cut is async now, so need to wait for content', api.sAssertContent('<p>ac</p>'), 100, 1000)
        ], onSuccess, onFailure);
    }, {
        skin_url: '/project/js/tinymce/skins/lightgray',
        plugins: 'paste'
    }, success, failure);
});
//# sourceMappingURL=CutTest.js.map