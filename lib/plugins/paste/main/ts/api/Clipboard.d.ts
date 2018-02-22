import { ClipboardContents } from '../core/Clipboard';
export interface Clipboard {
    pasteFormat: string;
    pasteHtml: (html: string, internalFlag: boolean) => void;
    pasteText: (text: string) => void;
    pasteImageData: (e: ClipboardEvent | DragEvent, rng: Range) => boolean;
    getDataTransferItems: (dataTransfer: DataTransfer) => ClipboardContents;
    hasHtmlOrText: (content: ClipboardContents) => boolean;
    hasContentType: (clipboardContent: ClipboardContents, mimeType: string) => boolean;
}
export declare const Clipboard: (editor: any) => Clipboard;
