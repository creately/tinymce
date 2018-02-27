declare const _default: {
    link: (editor: any, attachState: any) => (data: any) => void;
    unlink: (editor: any) => () => void;
    isLink: (elm: any) => any;
    hasLinks: (elements: any) => boolean;
    isOnlyTextSelected: (html: any) => boolean;
    getAnchorElement: (editor: any, selectedElm?: any) => any;
    getAnchorText: (selection: any, anchorElm: any) => any;
    toggleTargetRules: (rel: any, isUnsafe: any) => string;
};
export default _default;
