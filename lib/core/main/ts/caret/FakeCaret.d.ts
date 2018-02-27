export interface FakeCaret {
    show: (before: boolean, element: Element) => Range;
    hide: () => void;
    getCss: () => string;
    destroy: () => void;
}
export declare const FakeCaret: (root: HTMLElement, isBlock: (node: Node) => boolean, hasFocus: () => boolean) => FakeCaret;
export declare const isFakeCaretTarget: (node: Node) => any;
