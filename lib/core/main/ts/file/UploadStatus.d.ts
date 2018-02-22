/**
 * UploadStatus.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
/**
 * Holds the current status of a blob uri, if it's pending or uploaded and what the result urls was.
 *
 * @private
 * @class tinymce.file.UploadStatus
 */
export default function (): {
    hasBlobUri: (blobUri: any) => boolean;
    getResultUri: (blobUri: any) => any;
    isPending: (blobUri: any) => boolean;
    isUploaded: (blobUri: any) => boolean;
    markPending: (blobUri: any) => void;
    markUploaded: (blobUri: any, resultUri: any) => void;
    removeFailed: (blobUri: any) => void;
    destroy: () => void;
};
