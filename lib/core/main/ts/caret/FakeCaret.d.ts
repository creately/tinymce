export interface FakeCaret {
    show: (before: boolean, element: HTMLElement) => Range;
    hide: () => void;
    getCss: () => string;
    destroy: () => void;
}
export declare const FakeCaret: (root: HTMLElement, isBlock: (node: Node) => boolean) => FakeCaret;
export declare const isFakeCaretTarget: (node: Node) => any;
