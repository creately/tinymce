export interface EntitiesMap {
    [name: string]: string;
}
declare const _default: {
    encodeRaw: (text: string, attr?: boolean) => string;
    encodeAllRaw: (text: string) => string;
    encodeNumeric: (text: string, attr?: boolean) => string;
    encodeNamed: (text: string, attr?: boolean, entities?: EntitiesMap) => string;
    getEncodeFunc: (name: string, entities?: string | EntitiesMap) => (text: string, attr?: boolean, entities?: EntitiesMap) => string;
    decode: (text: string) => string;
};
export default _default;
