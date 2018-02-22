declare const _default: {
    cSetSourceInput: (ui: any, value: any) => {
        runChain: (value: any, next: any, die: any) => void;
    };
    cFindTextare: (ui: any, text: any) => {
        runChain: (value: any, next: any, die: any) => void;
    };
    cFakeEvent: (name: any) => {
        runChain: (value: any, next: any, die: any) => void;
    };
    cFindInDialog: (mapper: any) => (ui: any, text: any) => {
        runChain: (value: any, next: any, die: any) => void;
    };
    sOpenDialog: (ui: any) => (state: any, next: any, die: any) => void;
    sCloseDialog: (ui: any) => any;
    sSubmitDialog: (ui: any) => any;
    sTestEmbedContentFromUrl: (ui: any, url: any, content: any) => (state: any, next: any, die: any) => void;
    sSetFormItemNoEvent: (ui: any, value: any) => (value: any, next: any, die: any) => void;
    sAssertEditorContent: (apis: any, editor: any, expected: any) => (value: any, next: any, die: any) => void;
    sSetSetting: (editorSetting: any, key: any, value: any) => (value: any, next: any, die: any) => void;
    sSubmitAndReopen: (ui: any) => (state: any, next: any, die: any) => void;
    sAssertWidthValue: (ui: any, value: any) => (value: any, next: any, die: any) => void;
    sAssertHeightValue: (ui: any, value: any) => (value: any, next: any, die: any) => void;
    sPasteSourceValue: (ui: any, value: any) => (value: any, next: any, die: any) => void;
    sAssertSizeRecalcConstrained: (ui: any) => (state: any, next: any, die: any) => void;
    sAssertSizeRecalcConstrainedReopen: (ui: any) => (state: any, next: any, die: any) => void;
    sAssertSizeRecalcUnconstrained: (ui: any) => (state: any, next: any, die: any) => void;
    sAssertEmbedContent: (ui: any, content: any) => (value: any, next: any, die: any) => void;
    sAssertSourceValue: (ui: any, value: any) => (value: any, next: any, die: any) => void;
    sChangeWidthValue: (ui: any, value: any) => (value: any, next: any, die: any) => void;
    sPasteTextareaValue: (ui: any, value: any) => (value: any, next: any, die: any) => void;
};
export default _default;
