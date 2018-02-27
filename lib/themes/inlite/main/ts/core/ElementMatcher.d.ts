import { GeomRect } from 'tinymce/core/api/geom/Rect';
declare const _default: {
    element: (element: HTMLElement, predicateIds: any) => (editor: any) => {
        id: string;
        rect: GeomRect;
    };
    parent: (elements: HTMLElement[], predicateIds: any) => (editor: any) => {
        id: string;
        rect: GeomRect;
    };
};
export default _default;
