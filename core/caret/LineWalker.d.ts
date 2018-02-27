import CaretPosition from './CaretPosition';
export interface ClientRectLine extends ClientRect {
    line: number;
}
export declare enum VDirection {
    Up = -1,
    Down = 1,
}
declare const upUntil: (root: Node, predicateFn: (rect: ClientRectLine) => boolean, caretPosition: CaretPosition) => ClientRectLine[];
declare const downUntil: (root: Node, predicateFn: (rect: ClientRectLine) => boolean, caretPosition: CaretPosition) => ClientRectLine[];
declare const positionsUntil: (direction: VDirection, root: Node, predicateFn: (rect: ClientRectLine) => boolean, node: Node) => ClientRectLine[];
declare const isAboveLine: (lineNumber: number) => (clientRect: ClientRectLine) => boolean;
declare const isLine: (lineNumber: number) => (clientRect: ClientRectLine) => boolean;
export { upUntil, downUntil, positionsUntil, isAboveLine, isLine };
