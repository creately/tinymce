import { Editor } from 'tinymce/core/api/Editor';
import { InlitePanel } from 'tinymce/themes/inlite/ui/Panel';
export interface ContextToolbar {
    predicate: (elm) => boolean;
    id: string;
    items: string | string[];
}
declare const _default: {
    renderUI: (editor: Editor, panel: InlitePanel) => {};
};
export default _default;
