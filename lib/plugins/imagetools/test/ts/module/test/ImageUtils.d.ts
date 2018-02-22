declare const _default: {
    sExecCommand: (editor: any, cmd: any, value?: any) => (value: any, next: any, die: any) => void;
    sLoadImage: (editor: any, url: any, size?: any) => (value: any, next: any, die: any) => void;
    sUploadImages: (editor: any) => (value: any, next: any, die: any) => void;
    sWaitForBlobImage: (editor: any) => (value: any, next: any, die: any) => void;
    createStateContainer: () => {
        get: any;
        handler: (url: any) => (blobInfo: any, success: any) => void;
        sResetState: (value: any, next: any, die: any) => void;
        sWaitForState: (value: any, next: any, die: any) => void;
    };
};
export default _default;
