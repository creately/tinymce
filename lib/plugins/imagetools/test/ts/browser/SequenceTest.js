import { GeneralSteps, Logger, Pipeline } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock';
import { TinyApis, TinyLoader } from '@ephox/mcagar';
import Plugin from 'tinymce/plugins/imagetools/Plugin';
import ModernTheme from 'tinymce/themes/modern/Theme';
import ImageOps from '../module/test/ImageOps';
import ImageUtils from '../module/test/ImageUtils';
UnitTest.asynctest('browser.tinymce.plugins.imagetools.SequenceTest', function () {
    var success = arguments[arguments.length - 2];
    var failure = arguments[arguments.length - 1];
    var srcUrl = '/project/src/plugins/imagetools/demo/img/dogleft.jpg';
    // var corsUrl = 'http://moxiecode.cachefly.net/tinymce/v9/images/logo.png';
    Plugin();
    ModernTheme();
    TinyLoader.setup(function (editor, onSuccess, onFailure) {
        var tinyApis = TinyApis(editor);
        var imgOps = ImageOps(editor);
        var sManipulateImage = function (message, url) {
            return Logger.t(message, GeneralSteps.sequence([
                ImageUtils.sLoadImage(editor, url),
                tinyApis.sSelect('img', []),
                imgOps.sExecToolbar('Flip horizontally'),
                imgOps.sExecToolbar('Rotate clockwise'),
                imgOps.sExecDialog('Invert'),
                imgOps.sExecDialog('Crop'),
                imgOps.sExecDialog('Resize'),
                imgOps.sExecDialog('Flip vertically'),
                imgOps.sExecDialog('Rotate clockwise'),
                imgOps.sExecDialog('Brightness'),
                imgOps.sExecDialog('Sharpen'),
                imgOps.sExecDialog('Contrast'),
                imgOps.sExecDialog('Color levels'),
                imgOps.sExecDialog('Gamma')
            ]));
        };
        Pipeline.async({}, [
            // sManipulateImage('Test image operations on an image CORS domain', corsUrl),
            sManipulateImage('Test image operations on an image from the same domain', srcUrl)
        ], onSuccess, onFailure);
    }, {
        plugins: 'imagetools',
        imagetools_cors_hosts: ['moxiecode.cachefly.net'],
        skin_url: '/project/js/tinymce/skins/lightgray'
    }, success, failure);
});
//# sourceMappingURL=SequenceTest.js.map