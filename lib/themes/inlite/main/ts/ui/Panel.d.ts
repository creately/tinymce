import { Editor } from 'tinymce/core/api/Editor';
import { ContextToolbar } from 'tinymce/themes/inlite/core/Render';
export interface InlitePanel {
    show: (editor: Editor, id: string, targetRect, toolbars: ContextToolbar[]) => void;
    showForm: (editor: Editor, id: string) => void;
    reposition: (editor: Editor, id: string, targetRect) => void;
    inForm: () => boolean;
    hide: () => void;
    focus: () => void;
    remove: () => void;
}
export declare const create: () => InlitePanel;
