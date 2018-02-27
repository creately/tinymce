export interface PasteBin {
    create: () => void;
    remove: () => void;
    getEl: () => HTMLElement;
    getHtml: () => string;
    getLastRng: () => Range;
    isDefault: () => boolean;
    isDefaultContent: (content: any) => boolean;
}
/**
 * @class tinymce.pasteplugin.PasteBin
 * @private
 */
export declare const PasteBin: (editor: any) => PasteBin;
