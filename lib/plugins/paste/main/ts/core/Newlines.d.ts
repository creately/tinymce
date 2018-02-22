export interface RootAttrs {
    [key: string]: string;
}
declare const _default: {
    isPlainText: (text: string) => boolean;
    convert: (text: string, rootTag: string, rootAttrs: RootAttrs) => any;
    toBRs: (text: string) => string;
    toBlockElements: (text: string, rootTag: string, rootAttrs: RootAttrs) => any;
};
export default _default;
