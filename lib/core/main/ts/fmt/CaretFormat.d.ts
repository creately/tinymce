import CaretPosition from '../caret/CaretPosition';
declare const _default: {
    setup: (editor: any) => void;
    applyCaretFormat: (editor: any, name: any, vars: any) => void;
    removeCaretFormat: (editor: any, name: any, vars: any, similar: any) => void;
    isCaretNode: (node: any) => boolean;
    getParentCaretContainer: (body: any, node: any) => any;
    replaceWithCaretFormat: (targetNode: any, formatNodes: any) => CaretPosition;
    isFormatElement: (editor: any, element: any) => boolean;
};
export default _default;
