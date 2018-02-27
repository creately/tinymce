import Schema from '../html/Schema';
/**
 * This class is used to serialize DOM trees into a string. Consult the TinyMCE Wiki API for
 * more details and examples on how to use this class.
 *
 * @class tinymce.dom.Serializer
 */
export default function (settings: any, editor?: any): {
    schema: Schema;
    addNodeFilter: any;
    addAttributeFilter: any;
    serialize: (node: any, parserArgs?: any) => any;
    addRules: (rules: any) => void;
    setRules: (rules: any) => void;
    addTempAttr: any;
    getTempAttrs: () => string[];
};
