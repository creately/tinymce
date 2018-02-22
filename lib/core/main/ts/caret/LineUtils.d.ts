import { NodeClientRect } from '../dom/Dimensions';
import { ClientRectLine } from 'tinymce/core/caret/LineWalker';
export interface CaretInfo {
    node: Node;
    before: boolean;
}
declare const findClosestClientRect: (clientRects: ClientRect[], clientX: number) => NodeClientRect;
declare const findLineNodeRects: (root: Node, targetNodeRect: NodeClientRect) => ClientRectLine[];
declare const closestCaret: (root: HTMLElement, clientX: number, clientY: number) => CaretInfo;
export { findClosestClientRect, findLineNodeRects, closestCaret };
