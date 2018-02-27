declare const _default: {
    traverse: (json: any, path: any) => any;
    readBlob: (blob: any) => Promise<{}>;
    requestUrlAsBlob: (url: any, headers: any) => Promise<{
        status: number;
        blob: Blob;
    }>;
    parseJson: (text: any) => any;
};
export default _default;
