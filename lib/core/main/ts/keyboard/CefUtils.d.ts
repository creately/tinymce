declare const showCaret: (direction: any, editor: any, node: Node, before: boolean) => Range;
declare const selectNode: (editor: any, node: Element) => Range;
declare const renderCaretAtRange: (editor: any, range: Range) => Range;
declare const renderRangeCaret: (editor: any, range: Range) => Range;
export { showCaret, selectNode, renderCaretAtRange, renderRangeCaret };
