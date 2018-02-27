export interface KeyPattern {
    shiftKey?: boolean;
    altKey?: boolean;
    ctrlKey?: boolean;
    metaKey?: boolean;
    keyCode?: number;
    action: () => boolean;
}
declare const _default: {
    match: (patterns: KeyPattern[], evt: KeyboardEvent) => any;
    action: (f: any, ...x: any[]) => () => any;
    execute: (patterns: KeyPattern[], evt: KeyboardEvent) => any;
};
export default _default;
