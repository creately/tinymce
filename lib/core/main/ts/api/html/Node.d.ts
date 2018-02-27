/**
 * Node.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
export declare type ElementMap = Array<{
    [name: string]: boolean;
}>;
export declare type Attributes = Array<{
    [name: string]: string;
}>;
/**
 * This class is a minimalistic implementation of a DOM like node used by the DomParser class.
 *
 * @example
 * var node = new tinymce.html.Node('strong', 1);
 * someRoot.append(node);
 *
 * @class tinymce.html.Node
 * @version 3.4
 */
declare class Node {
    /**
     * Creates a node of a specific type.
     *
     * @static
     * @method create
     * @param {String} name Name of the node type to create for example "b" or "#text".
     * @param {Object} attrs Name/value collection of attributes that will be applied to elements.
     */
    static create(name: string, attrs: Attributes): Node;
    name: string;
    type: number;
    attributes: Attributes;
    value: string;
    shortEnded: boolean;
    parent: Node;
    firstChild: Node;
    lastChild: Node;
    next: Node;
    prev: Node;
    /**
     * Constructs a new Node instance.
     *
     * @constructor
     * @method Node
     * @param {String} name Name of the node type.
     * @param {Number} type Numeric type representing the node.
     */
    constructor(name: string, type: number);
    /**
     * Replaces the current node with the specified one.
     *
     * @example
     * someNode.replace(someNewNode);
     *
     * @method replace
     * @param {tinymce.html.Node} node Node to replace the current node with.
     * @return {tinymce.html.Node} The old node that got replaced.
     */
    replace(node: Node): Node;
    /**
     * Gets/sets or removes an attribute by name.
     *
     * @example
     * someNode.attr("name", "value"); // Sets an attribute
     * console.log(someNode.attr("name")); // Gets an attribute
     * someNode.attr("name", null); // Removes an attribute
     *
     * @method attr
     * @param {String} name Attribute name to set or get.
     * @param {String} value Optional value to set.
     * @return {String/tinymce.html.Node} String or undefined on a get operation or the current node on a set operation.
     */
    attr(name: string, value?: string): String | Node;
    /**
     * Does a shallow clones the node into a new node. It will also exclude id attributes since
     * there should only be one id per document.
     *
     * @example
     * var clonedNode = node.clone();
     *
     * @method clone
     * @return {tinymce.html.Node} New copy of the original node.
     */
    clone(): Node;
    /**
     * Wraps the node in in another node.
     *
     * @example
     * node.wrap(wrapperNode);
     *
     * @method wrap
     */
    wrap(wrapper: Node): Node;
    /**
     * Unwraps the node in other words it removes the node but keeps the children.
     *
     * @example
     * node.unwrap();
     *
     * @method unwrap
     */
    unwrap(): void;
    /**
     * Removes the node from it's parent.
     *
     * @example
     * node.remove();
     *
     * @method remove
     * @return {tinymce.html.Node} Current node that got removed.
     */
    remove(): Node;
    /**
     * Appends a new node as a child of the current node.
     *
     * @example
     * node.append(someNode);
     *
     * @method append
     * @param {tinymce.html.Node} node Node to append as a child of the current one.
     * @return {tinymce.html.Node} The node that got appended.
     */
    append(node: Node): Node;
    /**
     * Inserts a node at a specific position as a child of the current node.
     *
     * @example
     * parentNode.insert(newChildNode, oldChildNode);
     *
     * @method insert
     * @param {tinymce.html.Node} node Node to insert as a child of the current node.
     * @param {tinymce.html.Node} refNode Reference node to set node before/after.
     * @param {Boolean} before Optional state to insert the node before the reference node.
     * @return {tinymce.html.Node} The node that got inserted.
     */
    insert(node: Node, refNode: Node, before?: boolean): Node;
    /**
     * Get all children by name.
     *
     * @method getAll
     * @param {String} name Name of the child nodes to collect.
     * @return {Array} Array with child nodes matchin the specified name.
     */
    getAll(name: string): Node[];
    /**
     * Removes all children of the current node.
     *
     * @method empty
     * @return {tinymce.html.Node} The current node that got cleared.
     */
    empty(): Node;
    /**
     * Returns true/false if the node is to be considered empty or not.
     *
     * @example
     * node.isEmpty({img: true});
     * @method isEmpty
     * @param {Object} elements Name/value object with elements that are automatically treated as non empty elements.
     * @param {Object} whitespace Name/value object with elements that are automatically treated whitespace preservables.
     * @param {function} predicate Optional predicate that gets called after the other rules determine that the node is empty. Should return true if the node is a content node.
     * @return {Boolean} true/false if the node is empty or not.
     */
    isEmpty(elements: ElementMap, whitespace?: ElementMap, predicate?: (node: Node) => boolean): boolean;
    /**
     * Walks to the next or previous node and returns that node or null if it wasn't found.
     *
     * @method walk
     * @param {Boolean} prev Optional previous node state defaults to false.
     * @return {tinymce.html.Node} Node that is next to or previous of the current node.
     */
    walk(prev?: boolean): Node;
}
export default Node;
