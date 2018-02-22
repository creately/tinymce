/**
 * This class contains a few utility methods for ranges.
 *
 * @class tinymce.dom.RangeUtils
 */
export declare function RangeUtils(dom: any): {
    walk: (rng: any, callback: any) => any;
    split: (rng: any) => {
        startContainer: any;
        startOffset: any;
        endContainer: any;
        endOffset: any;
    };
    normalize: (rng: Range) => boolean;
};
export declare namespace RangeUtils {
    /**
     * Compares two ranges and checks if they are equal.
     *
     * @static
     * @method compareRanges
     * @param {DOMRange} rng1 First range to compare.
     * @param {DOMRange} rng2 First range to compare.
     * @return {Boolean} true/false if the ranges are equal.
     */
    const compareRanges: (rng1: Range, rng2: Range) => boolean;
    /**
     * Gets the caret range for the given x/y location.
     *
     * @static
     * @method getCaretRangeFromPoint
     * @param {Number} clientX X coordinate for range
     * @param {Number} clientY Y coordinate for range
     * @param {Document} doc Document that x/y are relative to
     * @returns {Range} caret range
     */
    const getCaretRangeFromPoint: (clientX: number, clientY: number, doc: Document) => Range;
    const getSelectedNode: (range: Range) => Node;
    const getNode: (container: Node, offset: number) => Node;
}
export default RangeUtils;
