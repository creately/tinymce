/**
 * Text formatter engine class. This class is used to apply formats like bold, italic, font size
 * etc to the current selection or specific nodes. This engine was built to replace the browser's
 * default formatting logic for execCommand due to its inconsistent and buggy behavior.
 *
 * @class tinymce.Formatter
 * @example
 *  tinymce.activeEditor.formatter.register('mycustomformat', {
 *    inline: 'span',
 *    styles: {color: '#ff0000'}
 *  });
 *
 *  tinymce.activeEditor.formatter.apply('mycustomformat');
 */
export default function (editor: any): {
    get: (name: string) => any;
    register: (name: any, format?: any) => void;
    unregister: (name: string) => {};
    apply: any;
    remove: any;
    toggle: any;
    match: any;
    matchAll: any;
    matchNode: any;
    canApply: any;
    formatChanged: any;
    getCssText: any;
};
