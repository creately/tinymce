import { Editor } from 'tinymce/core/api/Editor';
import { GeomRect } from 'tinymce/core/api/geom/Rect';
declare const _default: {
    getElementRect: (editor: Editor, elm: HTMLElement) => GeomRect;
    getPageAreaRect: (editor: Editor) => GeomRect;
    getContentAreaRect: (editor: Editor) => GeomRect;
    getSelectionRect: (editor: Editor) => GeomRect;
};
export default _default;
