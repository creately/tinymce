declare const isHeading: (node: any) => boolean;
declare const isBlock: (node: any) => boolean;
declare const isInline: (node: any) => boolean;
declare const isBr: (node: any) => boolean;
declare const isTextBlock: (node: any) => boolean;
declare const isList: (node: any) => boolean;
declare const isListItem: (node: any) => boolean;
declare const isVoid: (node: any) => boolean;
declare const isTableSection: (node: any) => boolean;
declare const isTableCell: (node: any) => boolean;
export { isBlock, isInline, isHeading, isTextBlock, isList, isListItem, isVoid, isTableSection, isTableCell, isBr };
