import { Selection } from '../api/dom/Selection';
declare const _default: {
    isInlineBlock: (node: any) => boolean;
    moveStart: (dom: any, selection: Selection, rng: any) => void;
    getNonWhiteSpaceSibling: (node: any, next?: any, inc?: any) => any;
    isTextBlock: (editor: any, name: any) => boolean;
    isValid: (ed: any, parent: any, child: any) => any;
    isWhiteSpaceNode: (node: any) => boolean;
    replaceVars: (value: any, vars: any) => any;
    isEq: (str1: any, str2: any) => boolean;
    normalizeStyleValue: (dom: any, value: any, name: any) => string;
    getStyle: (dom: any, node: any, name: any) => string;
    getTextDecoration: (dom: any, node: any) => any;
    getParents: (dom: any, node: any, selector?: any) => any;
};
export default _default;
