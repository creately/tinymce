import Schema from '../api/html/Schema';
export default function (settings: any, editor: any): {
    schema: Schema;
    addNodeFilter: any;
    addAttributeFilter: any;
    serialize: (node: any, parserArgs?: any) => any;
    addRules(rules: any): void;
    setRules(rules: any): void;
    addTempAttr: any;
    getTempAttrs(): string[];
};
