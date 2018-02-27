export default function (editor: any, lazyWire: any): {
    deleteRow: (table: any, target: any) => any;
    deleteColumn: (table: any, target: any) => any;
    insertRowsBefore: (table: any, target: any) => any;
    insertRowsAfter: (table: any, target: any) => any;
    insertColumnsBefore: (table: any, target: any) => any;
    insertColumnsAfter: (table: any, target: any) => any;
    mergeCells: (table: any, target: any) => any;
    unmergeCells: (table: any, target: any) => any;
    pasteRowsBefore: (table: any, target: any) => any;
    pasteRowsAfter: (table: any, target: any) => any;
    pasteCells: (table: any, target: any) => any;
};
