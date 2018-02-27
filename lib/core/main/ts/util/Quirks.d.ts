/**
 * This file includes fixes for various browser quirks it's made to make it easy to add/remove browser specific fixes.
 *
 * @private
 * @class tinymce.util.Quirks
 */
export default function (editor: any): {
    refreshContentEditable: () => void;
    isHidden: () => boolean | 0;
};
