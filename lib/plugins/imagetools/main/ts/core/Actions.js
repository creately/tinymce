/**
 * Actions.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { BlobConversions, ImageTransformations, ResultConversions } from '@ephox/imagetools';
import { Fun } from '@ephox/katamari';
import { URL } from '@ephox/sand';
import Delay from 'tinymce/core/api/util/Delay';
import Promise from 'tinymce/core/api/util/Promise';
import Tools from 'tinymce/core/api/util/Tools';
import URI from 'tinymce/core/api/util/URI';
import Settings from '../api/Settings';
import Dialog from '../ui/Dialog';
import ImageSize from './ImageSize';
import Proxy from './Proxy';
var count = 0;
var isEditableImage = function (editor, img) {
    var selectorMatched = editor.dom.is(img, 'img:not([data-mce-object],[data-mce-placeholder])');
    return selectorMatched && (isLocalImage(editor, img) || isCorsImage(editor, img) || editor.settings.imagetools_proxy);
};
var displayError = function (editor, error) {
    editor.notificationManager.open({
        text: error,
        type: 'error'
    });
};
var getSelectedImage = function (editor) {
    return editor.selection.getNode();
};
var extractFilename = function (editor, url) {
    var m = url.match(/\/([^\/\?]+)?\.(?:jpeg|jpg|png|gif)(?:\?|$)/i);
    if (m) {
        return editor.dom.encode(m[1]);
    }
    return null;
};
var createId = function () {
    return 'imagetools' + count++;
};
var isLocalImage = function (editor, img) {
    var url = img.src;
    return url.indexOf('data:') === 0 || url.indexOf('blob:') === 0 || new URI(url).host === editor.documentBaseURI.host;
};
var isCorsImage = function (editor, img) {
    return Tools.inArray(editor.settings.imagetools_cors_hosts, new URI(img.src).host) !== -1;
};
var getApiKey = function (editor) {
    return editor.settings.api_key || editor.settings.imagetools_api_key;
};
var imageToBlob = function (editor, img) {
    var src = img.src, apiKey;
    if (isCorsImage(editor, img)) {
        return Proxy.getUrl(img.src, null);
    }
    if (!isLocalImage(editor, img)) {
        src = Settings.getProxyUrl(editor);
        src += (src.indexOf('?') === -1 ? '?' : '&') + 'url=' + encodeURIComponent(img.src);
        apiKey = getApiKey(editor);
        return Proxy.getUrl(src, apiKey);
    }
    return BlobConversions.imageToBlob(img);
};
var findSelectedBlob = function (editor) {
    var blobInfo;
    blobInfo = editor.editorUpload.blobCache.getByUri(getSelectedImage(editor).src);
    if (blobInfo) {
        return Promise.resolve(blobInfo.blob());
    }
    return imageToBlob(editor, getSelectedImage(editor));
};
var startTimedUpload = function (editor, imageUploadTimerState) {
    var imageUploadTimer = Delay.setEditorTimeout(editor, function () {
        editor.editorUpload.uploadImagesAuto();
    }, editor.settings.images_upload_timeout || 30000);
    imageUploadTimerState.set(imageUploadTimer);
};
var cancelTimedUpload = function (imageUploadTimerState) {
    clearTimeout(imageUploadTimerState.get());
};
var updateSelectedImage = function (editor, ir, uploadImmediately, imageUploadTimerState, size) {
    return ir.toBlob().then(function (blob) {
        var uri, name, blobCache, blobInfo, selectedImage;
        blobCache = editor.editorUpload.blobCache;
        selectedImage = getSelectedImage(editor);
        uri = selectedImage.src;
        if (editor.settings.images_reuse_filename) {
            blobInfo = blobCache.getByUri(uri);
            if (blobInfo) {
                uri = blobInfo.uri();
                name = blobInfo.name();
            }
            else {
                name = extractFilename(editor, uri);
            }
        }
        blobInfo = blobCache.create({
            id: createId(),
            blob: blob,
            base64: ir.toBase64(),
            uri: uri,
            name: name
        });
        blobCache.add(blobInfo);
        editor.undoManager.transact(function () {
            function imageLoadedHandler() {
                editor.$(selectedImage).off('load', imageLoadedHandler);
                editor.nodeChanged();
                if (uploadImmediately) {
                    editor.editorUpload.uploadImagesAuto();
                }
                else {
                    cancelTimedUpload(imageUploadTimerState);
                    startTimedUpload(editor, imageUploadTimerState);
                }
            }
            editor.$(selectedImage).on('load', imageLoadedHandler);
            if (size) {
                editor.$(selectedImage).attr({
                    width: size.w,
                    height: size.h
                });
            }
            editor.$(selectedImage).attr({
                src: blobInfo.blobUri()
            }).removeAttr('data-mce-src');
        });
        return blobInfo;
    });
};
var selectedImageOperation = function (editor, imageUploadTimerState, fn, size) {
    return function () {
        return editor._scanForImages().
            then(Fun.curry(findSelectedBlob, editor)).
            then(ResultConversions.blobToImageResult).
            then(fn).
            then(function (imageResult) {
            return updateSelectedImage(editor, imageResult, false, imageUploadTimerState, size);
        }, function (error) {
            displayError(editor, error);
        });
    };
};
var rotate = function (editor, imageUploadTimerState, angle) {
    return function () {
        var size = ImageSize.getImageSize(getSelectedImage(editor));
        var flippedSize = size ? { w: size.h, h: size.w } : null;
        return selectedImageOperation(editor, imageUploadTimerState, function (imageResult) {
            return ImageTransformations.rotate(imageResult, angle);
        }, flippedSize)();
    };
};
var flip = function (editor, imageUploadTimerState, axis) {
    return function () {
        return selectedImageOperation(editor, imageUploadTimerState, function (imageResult) {
            return ImageTransformations.flip(imageResult, axis);
        })();
    };
};
var editImageDialog = function (editor, imageUploadTimerState) {
    return function () {
        var img = getSelectedImage(editor), originalSize = ImageSize.getNaturalImageSize(img);
        var handleDialogBlob = function (blob) {
            return new Promise(function (resolve) {
                BlobConversions.blobToImage(blob).
                    then(function (newImage) {
                    var newSize = ImageSize.getNaturalImageSize(newImage);
                    if (originalSize.w !== newSize.w || originalSize.h !== newSize.h) {
                        if (ImageSize.getImageSize(img)) {
                            ImageSize.setImageSize(img, newSize);
                        }
                    }
                    URL.revokeObjectURL(newImage.src);
                    resolve(blob);
                });
            });
        };
        var openDialog = function (editor, imageResult) {
            return Dialog.edit(editor, imageResult).then(handleDialogBlob).
                then(ResultConversions.blobToImageResult).
                then(function (imageResult) {
                return updateSelectedImage(editor, imageResult, true, imageUploadTimerState);
            }, function () {
                // Close dialog
            });
        };
        findSelectedBlob(editor).
            then(ResultConversions.blobToImageResult).
            then(Fun.curry(openDialog, editor), function (error) {
            displayError(editor, error);
        });
    };
};
export default {
    rotate: rotate,
    flip: flip,
    editImageDialog: editImageDialog,
    isEditableImage: isEditableImage,
    cancelTimedUpload: cancelTimedUpload
};
//# sourceMappingURL=Actions.js.map