import { Mouse, Pipeline, Step } from '@ephox/agar';
import { Attachment } from '@ephox/alloy';
import { UnitTest } from '@ephox/bedrock';
import { PlatformDetection } from '@ephox/sand';
import { Body, Class } from '@ephox/sugar';
import FontSizeSlider from 'tinymce/themes/mobile/ui/FontSizeSlider';
import IosRealm from 'tinymce/themes/mobile/ui/IosRealm';
import TestFrameEditor from '../../module/test/ui/TestFrameEditor';
import TestSelectors from '../../module/test/ui/TestSelectors';
import TestStyles from '../../module/test/ui/TestStyles';
UnitTest.asynctest('Browser Test: ui.FontSizeSliderTest', function () {
    var success = arguments[arguments.length - 2];
    var failure = arguments[arguments.length - 1];
    var detection = PlatformDetection.detect();
    var realm = IosRealm();
    // Make toolbar appear
    Class.add(realm.system().element(), 'tinymce-mobile-fullscreen-maximized');
    var body = Body.body();
    Attachment.attachSystem(body, realm.system());
    TestStyles.addStyles();
    var unload = function () {
        TestStyles.removeStyles();
        Attachment.detachSystem(realm.system());
    };
    var tEditor = TestFrameEditor();
    realm.system().add(tEditor.component());
    realm.setToolbarGroups([
        {
            label: 'group1',
            items: [
                FontSizeSlider.sketch(realm, tEditor.editor())
            ]
        }
    ]);
    Pipeline.async({}, detection.browser.isChrome() ? [
        TestStyles.sWaitForToolstrip(realm),
        Step.sync(function () {
            tEditor.editor().focus();
        }),
        Mouse.sClickOn(realm.system().element(), TestSelectors.fontsize()),
        tEditor.sAssertEq('on first showing, the font size slider should not have fired execCommand', [])
        // Think about how to do the slider events
    ] : [], function () {
        unload();
        success();
    }, failure);
});
//# sourceMappingURL=FontSizeSliderTest.js.map