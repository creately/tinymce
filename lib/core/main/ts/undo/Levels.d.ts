declare const _default: {
    createFragmentedLevel: (fragments: any) => {
        type: string;
        fragments: any;
        content: string;
        bookmark: any;
        beforeBookmark: any;
    };
    createCompleteLevel: (content: any) => {
        type: string;
        fragments: any;
        content: any;
        bookmark: any;
        beforeBookmark: any;
    };
    createFromEditor: (editor: any) => {
        type: string;
        fragments: any;
        content: any;
        bookmark: any;
        beforeBookmark: any;
    };
    applyToEditor: (editor: any, level: any, before: any) => void;
    isEq: (level1: any, level2: any) => boolean;
};
export default _default;
