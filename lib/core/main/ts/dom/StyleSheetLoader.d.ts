/**
 * This class handles loading of external stylesheets and fires events when these are loaded.
 *
 * @class tinymce.dom.StyleSheetLoader
 * @private
 */
export default function (document: any, settings?: any): {
    load: (url: any, loadedCallback: any, errorCallback: any) => void;
    loadAll: (urls: any, success: any, failure: any) => void;
};
