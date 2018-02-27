import { Editor } from 'tinymce/core/api/Editor';
import { GeomRect } from 'tinymce/core/api/geom/Rect';
declare const _default: {
    textSelection: (id: string) => (editor: Editor) => {
        id: string;
        rect: GeomRect;
    };
    emptyTextBlock: (elements: Element[], id: string) => (editor: any) => {
        id: string;
        rect: GeomRect;
    };
};
export default _default;
