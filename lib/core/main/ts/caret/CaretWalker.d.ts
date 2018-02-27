import CaretPosition from './CaretPosition';
export interface CaretWalker {
    next(caretPosition: CaretPosition): CaretPosition;
    prev(caretPosition: CaretPosition): CaretPosition;
}
/**
 * This module contains logic for moving around a virtual caret in logical order within a DOM element.
 *
 * It ignores the most obvious invalid caret locations such as within a script element or within a
 * contentEditable=false element but it will return locations that isn't possible to render visually.
 *
 * @private
 * @class tinymce.caret.CaretWalker
 * @example
 * var caretWalker = new CaretWalker(rootElm);
 *
 * var prevLogicalCaretPosition = caretWalker.prev(CaretPosition.fromRangeStart(range));
 * var nextLogicalCaretPosition = caretWalker.next(CaretPosition.fromRangeEnd(range));
 */
export declare enum HDirection {
    Backwards = -1,
    Forwards = 1,
}
export declare const CaretWalker: (root: Node) => CaretWalker;
