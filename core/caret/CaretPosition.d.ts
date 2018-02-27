export interface CaretPosition {
    container: () => Node;
    offset: () => number;
    toRange: () => Range;
    getClientRects: () => ClientRect[];
    isVisible: () => boolean;
    isAtStart: () => boolean;
    isAtEnd: () => boolean;
    isEqual: (caretPosition: CaretPosition) => boolean;
    getNode: (before?: boolean) => Node;
}
/**
 * Represents a location within the document by a container and an offset.
 *
 * @constructor
 * @param {Node} container Container node.
 * @param {Number} offset Offset within that container node.
 * @param {Array} clientRects Optional client rects array for the position.
 */
export declare function CaretPosition(container: Node, offset: number, clientRects?: any): CaretPosition;
export declare namespace CaretPosition {
    /**
     * Creates a caret position from the start of a range.
     *
     * @method fromRangeStart
     * @param {DOMRange} range DOM Range to create caret position from.
     * @return {tinymce.caret.CaretPosition} Caret position from the start of DOM range.
     */
    const fromRangeStart: (range: Range) => CaretPosition;
    /**
     * Creates a caret position from the end of a range.
     *
     * @method fromRangeEnd
     * @param {DOMRange} range DOM Range to create caret position from.
     * @return {tinymce.caret.CaretPosition} Caret position from the end of DOM range.
     */
    const fromRangeEnd: (range: Range) => CaretPosition;
    /**
     * Creates a caret position from a node and places the offset after it.
     *
     * @method after
     * @param {Node} node Node to get caret position from.
     * @return {tinymce.caret.CaretPosition} Caret position from the node.
     */
    const after: (node: Node) => CaretPosition;
    /**
     * Creates a caret position from a node and places the offset before it.
     *
     * @method before
     * @param {Node} node Node to get caret position from.
     * @return {tinymce.caret.CaretPosition} Caret position from the node.
     */
    const before: (node: Node) => CaretPosition;
    const isAtStart: (pos: CaretPosition) => boolean;
    const isAtEnd: (pos: CaretPosition) => boolean;
    const isTextPosition: (pos: CaretPosition) => boolean;
}
export default CaretPosition;
