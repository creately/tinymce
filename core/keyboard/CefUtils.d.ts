import { Editor } from 'tinymce/core/api/Editor';
declare const showCaret: (direction: any, editor: Editor, node: Element, before: boolean, scrollIntoView: boolean) => Range;
declare const selectNode: (editor: any, node: Element) => Range;
declare const renderCaretAtRange: (editor: any, range: Range, scrollIntoView: boolean) => Range;
declare const renderRangeCaret: (editor: any, range: Range, scrollIntoView: boolean) => Range;
export { showCaret, selectNode, renderCaretAtRange, renderRangeCaret };
