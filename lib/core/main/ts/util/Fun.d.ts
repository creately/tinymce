declare const _default: {
    constant: (value: any) => () => any;
    negate: (predicate: any) => (x: any) => boolean;
    and: (...x: any[]) => (x: any) => boolean;
    or: (...x: any[]) => (x: any) => boolean;
    curry: (fn: any, ...x: any[]) => any;
    compose: (f: any, g: any) => (x: any) => any;
    noop: () => void;
};
export default _default;
