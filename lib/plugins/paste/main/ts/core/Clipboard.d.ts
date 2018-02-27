import { PasteBin } from './PasteBin';
import { Editor } from 'tinymce/core/api/Editor';
import { Cell } from '@ephox/katamari';
/**
 * Pastes the specified HTML. This means that the HTML is filtered and then
 * inserted at the current selection in the editor. It will also fire paste events
 * for custom user filtering.
 *
 * @param {String} html HTML code to paste into the current selection.
 * @param {Boolean?} internalFlag Optional true/false flag if the contents is internal or external.
 */
declare const pasteHtml: (editor: Editor, html: string, internalFlag: boolean) => void;
/**
 * Pastes the specified text. This means that the plain text is processed
 * and converted into BR and P elements. It will fire paste events for custom filtering.
 *
 * @param {String} text Text to paste as the current selection location.
 */
declare const pasteText: (editor: any, text: string) => void;
export interface ClipboardContents {
    [key: string]: string;
}
/**
 * Gets various content types out of a datatransfer object.
 *
 * @param {DataTransfer} dataTransfer Event fired on paste.
 * @return {Object} Object with mime types and data for those mime types.
 */
declare const getDataTransferItems: (dataTransfer: DataTransfer) => ClipboardContents;
declare const hasContentType: (clipboardContent: ClipboardContents, mimeType: string) => boolean;
declare const hasHtmlOrText: (content: ClipboardContents) => boolean;
/**
 * Checks if the clipboard contains image data if it does it will take that data
 * and convert it into a data url image and paste that image at the caret location.
 *
 * @param  {ClipboardEvent} e Paste/drop event object.
 * @param  {DOMRange} rng Rng object to move selection to.
 * @return {Boolean} true/false if the image data was found or not.
 */
declare const pasteImageData: (editor: any, e: ClipboardEvent | DragEvent, rng: Range) => boolean;
/**
 * This class contains logic for getting HTML contents out of the clipboard.
 *
 * We need to make a lot of ugly hacks to get the contents out of the clipboard since
 * the W3C Clipboard API is broken in all browsers that have it: Gecko/WebKit/Blink.
 * We might rewrite this the way those API:s stabilize. Browsers doesn't handle pasting
 * from applications like Word the same way as it does when pasting into a contentEditable area
 * so we need to do lots of extra work to try to get to this clipboard data.
 *
 * Current implementation steps:
 *  1. On keydown with paste keys Ctrl+V or Shift+Insert create
 *     a paste bin element and move focus to that element.
 *  2. Wait for the browser to fire a "paste" event and get the contents out of the paste bin.
 *  3. Check if the paste was successful if true, process the HTML.
 *  (4). If the paste was unsuccessful use IE execCommand, Clipboard API, document.dataTransfer old WebKit API etc.
 *
 * @class tinymce.pasteplugin.Clipboard
 * @private
 */
declare const registerEventsAndFilters: (editor: Editor, pasteBin: PasteBin, pasteFormat: Cell<string>) => void;
export { registerEventsAndFilters, pasteHtml, pasteText, pasteImageData, getDataTransferItems, hasHtmlOrText, hasContentType };
