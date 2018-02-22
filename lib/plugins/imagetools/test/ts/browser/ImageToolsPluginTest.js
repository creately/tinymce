import { GeneralSteps, Pipeline, RawAssertions, Step, Logger } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock';
import { TinyApis, TinyLoader } from '@ephox/mcagar';
import URI from 'tinymce/core/api/util/URI';
import Plugin from 'tinymce/plugins/imagetools/Plugin';
import ModernTheme from 'tinymce/themes/modern/Theme';
import ImageUtils from '../module/test/ImageUtils';
UnitTest.asynctest('browser.tinymce.plugins.imagetools.ImageToolsPluginTest', function () {
    var success = arguments[arguments.length - 2];
    var failure = arguments[arguments.length - 1];
    var uploadHandlerState = ImageUtils.createStateContainer();
    var srcUrl = '/project/src/plugins/imagetools/demo/img/dogleft.jpg';
    ModernTheme();
    Plugin();
    var sAssertUploadFilename = function (expected) {
        return Step.sync(function () {
            var blobInfo = uploadHandlerState.get().blobInfo;
            RawAssertions.assertEq('Should be expected file name', expected, blobInfo.filename());
        });
    };
    var sAssertUri = function (expected) {
        return Step.sync(function () {
            var blobInfo = uploadHandlerState.get().blobInfo;
            var uri = new URI(blobInfo.uri());
            RawAssertions.assertEq('Should be expected uri', expected, uri.relative);
        });
    };
    TinyLoader.setup(function (editor, onSuccess, onFailure) {
        var tinyApis = TinyApis(editor);
        Pipeline.async({}, [
            Logger.t('test generate filename', GeneralSteps.sequence([
                uploadHandlerState.sResetState,
                tinyApis.sSetSetting('images_reuse_filename', false),
                ImageUtils.sLoadImage(editor, srcUrl),
                tinyApis.sSelect('img', []),
                ImageUtils.sExecCommand(editor, 'mceImageFlipHorizontal'),
                ImageUtils.sWaitForBlobImage(editor),
                ImageUtils.sUploadImages(editor),
                uploadHandlerState.sWaitForState,
                sAssertUploadFilename('imagetools0.jpg')
            ])),
            Logger.t('test reuse filename', GeneralSteps.sequence([
                uploadHandlerState.sResetState,
                tinyApis.sSetSetting('images_reuse_filename', true),
                ImageUtils.sLoadImage(editor, srcUrl),
                tinyApis.sSelect('img', []),
                ImageUtils.sExecCommand(editor, 'mceImageFlipHorizontal'),
                ImageUtils.sWaitForBlobImage(editor),
                ImageUtils.sUploadImages(editor),
                uploadHandlerState.sWaitForState,
                sAssertUploadFilename('dogleft.jpg'),
                sAssertUri(srcUrl)
            ])),
            Logger.t('test rotate image', GeneralSteps.sequence([
                ImageUtils.sLoadImage(editor, srcUrl, { width: 200, height: 100 }),
                tinyApis.sSelect('img', []),
                ImageUtils.sExecCommand(editor, 'mceImageRotateRight'),
                ImageUtils.sWaitForBlobImage(editor),
                tinyApis.sAssertContentPresence({
                    'img[width="100"][height="200"]': 1
                })
            ]))
        ], onSuccess, onFailure);
    }, {
        plugins: 'imagetools',
        automatic_uploads: false,
        images_upload_handler: uploadHandlerState.handler(srcUrl),
        skin_url: '/project/js/tinymce/skins/lightgray'
    }, success, failure);
});
//# sourceMappingURL=ImageToolsPluginTest.js.map