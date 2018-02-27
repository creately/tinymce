interface Schema {
    children: {};
    elements: {
        [name: string]: ElementRule;
    };
    getValidStyles: () => SchemaMap;
    getValidClasses: () => SchemaMap;
    getBlockElements: () => SchemaMap;
    getInvalidStyles: () => SchemaMap;
    getShortEndedElements: () => SchemaMap;
    getTextBlockElements: () => SchemaMap;
    getTextInlineElements: () => SchemaMap;
    getBoolAttrs: () => SchemaMap;
    getElementRule: (name: string) => ElementRule;
    getSelfClosingElements: () => SchemaMap;
    getNonEmptyElements: () => SchemaMap;
    getMoveCaretBeforeOnEnterElements: () => SchemaMap;
    getWhiteSpaceElements: () => SchemaMap;
    getSpecialElements: () => SchemaRegExpMap;
    isValidChild: (name: string, child: string) => boolean;
    isValid: (name: string, attr?: string) => boolean;
    getCustomElements: () => SchemaMap;
    addValidElements: (validElements: string) => void;
    setValidElements: (validElements: string) => void;
    addCustomElements: (customElements: string) => void;
    addValidChildren: (validChildren: any) => void;
}
export declare type Attribute = {
    required?: boolean;
    defaultValue?: string;
    forcedValue?: string;
    validValues?: any;
};
export declare type ElementRule = {
    attributes: Attribute[];
    attributesOrder: string[];
    attributePatterns?: RegExp[];
    paddEmpty?: boolean;
    removeEmpty?: boolean;
    removeEmptyAttrs?: boolean;
};
export declare type SchemaMap = {
    [name: string]: {};
};
export declare type SchemaRegExpMap = {
    [name: string]: RegExp;
};
declare function Schema(settings?: any): {
    children: {};
    elements: {};
    getValidStyles: () => SchemaMap;
    getValidClasses: () => SchemaMap;
    getBlockElements: () => SchemaMap;
    getInvalidStyles: () => SchemaMap;
    getShortEndedElements: () => SchemaMap;
    getTextBlockElements: () => SchemaMap;
    getTextInlineElements: () => SchemaMap;
    getBoolAttrs: () => SchemaMap;
    getElementRule: (name: string) => ElementRule;
    getSelfClosingElements: () => SchemaMap;
    getNonEmptyElements: () => SchemaMap;
    getMoveCaretBeforeOnEnterElements: () => SchemaMap;
    getWhiteSpaceElements: () => SchemaMap;
    getSpecialElements: () => SchemaRegExpMap;
    isValidChild: (name: string, child: string) => boolean;
    isValid: (name: string, attr?: string) => boolean;
    getCustomElements: () => SchemaMap;
    addValidElements: (validElements: string) => void;
    setValidElements: (validElements: string) => void;
    addCustomElements: (customElements: string) => void;
    addValidChildren: (validChildren: any) => void;
};
export default Schema;
