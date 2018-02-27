declare const _default: {
    charMap: {
        '\u00a0': string;
        '\u00ad': string;
    };
    regExp: RegExp;
    regExpGlobal: RegExp;
    selector: string;
    charMapToRegExp: (charMap: any, global?: any) => RegExp;
    charMapToSelector: (charMap: any) => string;
};
export default _default;
