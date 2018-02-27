export default function (node: any, editor: any): {
    text: any;
    matches: any[];
    each: (callback: any) => any;
    filter: (callback: any) => any;
    reset: () => any;
    matchFromElement: (element: any) => any;
    elementFromMatch: (match: any) => any;
    find: (regex: any, data: any) => any;
    add: (start: any, length: any, data: any) => any;
    wrap: (callback: any) => any;
    unwrap: (match?: any) => any;
    replace: (match: any, text: any) => any;
    rangeFromMatch: (match: any) => any;
    indexOf: (match: any) => number;
};
