import { Pipeline, Chain, Logger, UiFinder, RawAssertions } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock';
import { UiChains, Editor } from '@ephox/mcagar';
import Plugin from 'tinymce/plugins/media/Plugin';
import Theme from 'tinymce/themes/modern/Theme';
import { Body } from '@ephox/sugar';
var cNotExists = function (selector) {
    return Chain.op(function (container) {
        UiFinder.findIn(container, selector).fold(function () { return RawAssertions.assertEq('should not find anything', true, true); }, function () { return RawAssertions.assertEq('Expected ' + selector + ' not to exist.', true, false); });
    });
};
var cExists = function (selector) {
    return Chain.op(function (container) {
        UiFinder.findIn(container, selector).fold(function () { return RawAssertions.assertEq('Expected ' + selector + ' to exist.', true, false); }, function () { return RawAssertions.assertEq('found element', true, true); });
    });
};
UnitTest.asynctest('browser.tinymce.plugins.media.NoAdvancedTabTest', function (success, failure) {
    Plugin();
    Theme();
    Pipeline.async({}, [
        Logger.t('if alt source and poster set to false, do not show advance tab', Chain.asStep({}, [
            Chain.fromParent(Editor.cFromSettings({
                plugins: ['media'],
                toolbar: 'media',
                media_alt_source: false,
                media_poster: false,
                skin_url: '/project/js/tinymce/skins/lightgray'
            }), [
                Chain.fromChains([
                    UiChains.cClickOnToolbar('click button', 'div[aria-label="Insert/edit media"]'),
                    Chain.inject(Body.body()),
                    UiFinder.cWaitForVisible('wait for popup', 'div.mce-floatpanel[aria-label="Insert/edit media"]'),
                    cNotExists('div.mce-tab:contains("Advanced")')
                ]),
                Editor.cRemove
            ])
        ])),
        Logger.t('if alt source and poster not set to false, show advance tab', Chain.asStep({}, [
            Chain.fromParent(Editor.cFromSettings({
                plugins: ['media'],
                toolbar: 'media',
                skin_url: '/project/js/tinymce/skins/lightgray'
            }), [
                Chain.fromChains([
                    UiChains.cClickOnToolbar('click button', 'div[aria-label="Insert/edit media"]'),
                    Chain.inject(Body.body()),
                    UiFinder.cWaitForVisible('wait for popup', 'div.mce-floatpanel[aria-label="Insert/edit media"]'),
                    cExists('div.mce-tab:contains("Advanced")')
                ]),
                Editor.cRemove
            ])
        ]))
    ], function () { return success(); }, failure);
});
//# sourceMappingURL=NoAdvancedTabTest.js.map