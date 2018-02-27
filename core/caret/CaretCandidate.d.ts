declare const isCaretCandidate: (node: Node) => boolean;
declare const isInEditable: (node: Node, root: Node) => boolean;
declare const isAtomic: (node: Node) => boolean;
declare const isEditableCaretCandidate: (node: Node, root?: Node) => boolean;
export { isCaretCandidate, isInEditable, isAtomic, isEditableCaretCandidate };
