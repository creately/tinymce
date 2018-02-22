import ControlSelection from './ControlSelection';
import { NativeSelection } from './NativeTypes';
import { Editor } from 'tinymce/core/api/Editor';
export interface Selection {
    bookmarkManager: any;
    controlSelection: ControlSelection;
    dom: any;
    win: Window;
    serializer: any;
    editor: any;
    collapse: (toStart?: boolean) => void;
    setCursorLocation: (node?: Node, offset?: number) => void;
    getContent: (args: any) => any;
    setContent: (content: any, args?: any) => void;
    getBookmark: (type?: number, normalized?: boolean) => any;
    moveToBookmark: (bookmark: any) => boolean;
    select: (node: Node, content?: boolean) => Node;
    isCollapsed: () => boolean;
    isForward: () => boolean;
    setNode: (elm: Element) => Element;
    getNode: () => Element;
    getSel: () => NativeSelection;
    setRng: (rng: Range, forward?: boolean) => void;
    getRng: () => Range;
    getStart: (real?: boolean) => Element;
    getEnd: (real?: boolean) => Element;
    getSelectedBlocks: (startElm?: Element, endElm?: Element) => Element[];
    normalize: () => Range;
    selectorChanged: (selector: string, callback: (active: boolean, args: {
        node: Node;
        selector: String;
        parents: Element[];
    }) => void) => any;
    getScrollContainer: () => Element;
    scrollIntoView: (elm: Element, alignToTop?: boolean) => void;
    placeCaretAt: (clientX: number, clientY: number) => void;
    getBoundingClientRect: () => ClientRect;
    destroy: () => void;
}
/**
 * Constructs a new selection instance.
 *
 * @constructor
 * @method Selection
 * @param {tinymce.dom.DOMUtils} dom DOMUtils object reference.
 * @param {Window} win Window to bind the selection object to.
 * @param {tinymce.dom.Serializer} serializer DOM serialization class to use for getContent.
 * @param {tinymce.Editor} editor Editor instance of the selection.
 */
export declare const Selection: (dom: any, win: Window, serializer: any, editor: Editor) => Selection;
