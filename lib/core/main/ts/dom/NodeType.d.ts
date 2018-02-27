declare const _default: {
    isText: (node: Node) => node is Text;
    isElement: (node: Node) => node is HTMLElement;
    isComment: (node: Node) => node is Comment;
    isDocument: (node: Node) => node is Document;
    isBr: (node: Node) => node is Element;
    isContentEditableTrue: (node: Node) => node is Element;
    isContentEditableFalse: (node: Node) => node is Element;
    matchNodeNames: (names: string) => (node: Node) => boolean;
    hasPropValue: (propName: string, propValue: any) => (node: Node) => boolean;
    hasAttribute: (attrName: string, attrValue?: string) => (node: Node) => boolean;
    hasAttributeValue: (attrName: string, attrValue: string) => (node: Node) => boolean;
    matchStyleValues: (name: string, values: string) => (node: any) => boolean;
    isBogus: (node: Node) => node is Element;
    isBogusAll: (node: Node) => node is Element;
    isTable: (node: Node) => node is Element;
};
export default _default;
