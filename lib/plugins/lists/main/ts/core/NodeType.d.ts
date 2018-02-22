declare const _default: {
    isTextNode: (node: Node) => node is Text;
    isListNode: (node: any) => boolean;
    isListItemNode: (node: any) => boolean;
    isTableCellNode: (node: any) => boolean;
    isBr: (node: any) => boolean;
    isFirstChild: (node: any) => boolean;
    isLastChild: (node: any) => boolean;
    isTextBlock: (editor: any, node: any) => boolean;
    isBlock: (node: any, blockElements: any) => boolean;
    isBogusBr: (dom: any, node: any) => boolean;
    isEmpty: (dom: any, elm: any, keepBookmarks?: any) => any;
    isChildOfBody: (dom: any, elm: any) => any;
};
export default _default;
