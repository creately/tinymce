import { ClipboardContents } from '../core/Clipboard';
import { Cell } from '@ephox/katamari';
import { Editor } from 'tinymce/core/api/Editor';
export interface Clipboard {
    pasteFormat: Cell<string>;
    pasteHtml: (html: string, internalFlag: boolean) => void;
    pasteText: (text: string) => void;
    pasteImageData: (e: ClipboardEvent | DragEvent, rng: Range) => boolean;
    getDataTransferItems: (dataTransfer: DataTransfer) => ClipboardContents;
    hasHtmlOrText: (content: ClipboardContents) => boolean;
    hasContentType: (clipboardContent: ClipboardContents, mimeType: string) => boolean;
}
export declare const Clipboard: (editor: Editor, pasteFormat: Cell<string>) => Clipboard;
