export interface NodeClientRect extends ClientRect {
    node: HTMLElement;
}
declare const getClientRects: (node: Node[]) => NodeClientRect[];
export { getClientRects };
