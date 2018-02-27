/**
 * Handles image uploads, updates undo stack and patches over various internal functions.
 *
 * @private
 * @class tinymce.EditorUpload
 */
export default function (editor: any): {
    blobCache: {
        create: (o: any, blob?: any, base64?: any, filename?: any) => {
            id: () => any;
            name: () => any;
            filename: () => any;
            blob: () => any;
            base64: () => any;
            blobUri: () => any;
            uri: () => any;
        };
        add: (blobInfo: any) => void;
        get: (id: any) => any;
        getByUri: (blobUri: any) => any;
        findFirst: (predicate: any) => any;
        removeByUri: (blobUri: any) => void;
        destroy: () => void;
    };
    uploadImages: (callback: any) => any;
    uploadImagesAuto: (callback?: any) => any;
    scanForImages: () => any;
    destroy: () => void;
};
