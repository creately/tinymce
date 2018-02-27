import { Editor } from 'tinymce/core/api/Editor';
declare const _default: {
    insertTable: (editor: Editor, cols: number, rows: number) => void;
    formatBlock: (editor: Editor, formatName: string) => void;
    insertBlob: (editor: Editor, base64: string, blob: Blob) => void;
    createLink: (editor: Editor, url: string) => void;
    unlink: (editor: Editor) => void;
};
export default _default;
