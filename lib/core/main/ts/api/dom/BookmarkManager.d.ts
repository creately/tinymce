import { Selection } from './Selection';
/**
 * This class handles selection bookmarks.
 *
 * @class tinymce.dom.BookmarkManager
 */
/**
 * Constructs a new BookmarkManager instance for a specific selection instance.
 *
 * @constructor
 * @method BookmarkManager
 * @param {tinymce.dom.Selection} selection Selection instance to handle bookmarks for.
 */
export declare function BookmarkManager(selection: Selection): {
    getBookmark: (type: number, normalized?: boolean) => any;
    moveToBookmark: (bookmark: any) => boolean;
};
export declare namespace BookmarkManager {
    /**
     * Returns true/false if the specified node is a bookmark node or not.
     *
     * @static
     * @method isBookmarkNode
     * @param {DOMNode} node DOM Node to check if it's a bookmark node or not.
     * @return {Boolean} true/false if the node is a bookmark node or not.
     */
    const isBookmarkNode: (node: Node) => boolean;
}
export default BookmarkManager;
