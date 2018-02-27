import Node from './Node';
export declare type ParserArgs = any;
export declare type ParserFilterCallback = (nodes: Node[], name: string, args: ParserArgs) => void;
export interface ParserFilter {
    name: string;
    callbacks: ParserFilterCallback[];
}
export default function (settings?: any, schema?: {
    children: {};
    elements: {};
    getValidStyles: () => {
        [name: string]: {};
    };
    getValidClasses: () => {
        [name: string]: {};
    };
    getBlockElements: () => {
        [name: string]: {};
    };
    getInvalidStyles: () => {
        [name: string]: {};
    };
    getShortEndedElements: () => {
        [name: string]: {};
    };
    getTextBlockElements: () => {
        [name: string]: {};
    };
    getTextInlineElements: () => {
        [name: string]: {};
    };
    getBoolAttrs: () => {
        [name: string]: {};
    };
    getElementRule: (name: string) => {
        attributes: {
            required?: boolean;
            defaultValue?: string;
            forcedValue?: string;
            validValues?: any;
        }[];
        attributesOrder: string[];
        attributePatterns?: RegExp[];
        paddEmpty?: boolean;
        removeEmpty?: boolean;
        removeEmptyAttrs?: boolean;
    };
    getSelfClosingElements: () => {
        [name: string]: {};
    };
    getNonEmptyElements: () => {
        [name: string]: {};
    };
    getMoveCaretBeforeOnEnterElements: () => {
        [name: string]: {};
    };
    getWhiteSpaceElements: () => {
        [name: string]: {};
    };
    getSpecialElements: () => {
        [name: string]: RegExp;
    };
    isValidChild: (name: string, child: string) => boolean;
    isValid: (name: string, attr?: string) => boolean;
    getCustomElements: () => {
        [name: string]: {};
    };
    addValidElements: (validElements: string) => void;
    setValidElements: (validElements: string) => void;
    addCustomElements: (customElements: string) => void;
    addValidChildren: (validChildren: any) => void;
}): {
    schema: {
        children: {};
        elements: {};
        getValidStyles: () => {
            [name: string]: {};
        };
        getValidClasses: () => {
            [name: string]: {};
        };
        getBlockElements: () => {
            [name: string]: {};
        };
        getInvalidStyles: () => {
            [name: string]: {};
        };
        getShortEndedElements: () => {
            [name: string]: {};
        };
        getTextBlockElements: () => {
            [name: string]: {};
        };
        getTextInlineElements: () => {
            [name: string]: {};
        };
        getBoolAttrs: () => {
            [name: string]: {};
        };
        getElementRule: (name: string) => {
            attributes: {
                required?: boolean;
                defaultValue?: string;
                forcedValue?: string;
                validValues?: any;
            }[];
            attributesOrder: string[];
            attributePatterns?: RegExp[];
            paddEmpty?: boolean;
            removeEmpty?: boolean;
            removeEmptyAttrs?: boolean;
        };
        getSelfClosingElements: () => {
            [name: string]: {};
        };
        getNonEmptyElements: () => {
            [name: string]: {};
        };
        getMoveCaretBeforeOnEnterElements: () => {
            [name: string]: {};
        };
        getWhiteSpaceElements: () => {
            [name: string]: {};
        };
        getSpecialElements: () => {
            [name: string]: RegExp;
        };
        isValidChild: (name: string, child: string) => boolean;
        isValid: (name: string, attr?: string) => boolean;
        getCustomElements: () => {
            [name: string]: {};
        };
        addValidElements: (validElements: string) => void;
        setValidElements: (validElements: string) => void;
        addCustomElements: (customElements: string) => void;
        addValidChildren: (validChildren: any) => void;
    };
    addAttributeFilter: (name: string, callback: (nodes: Node[], name: string, args: any) => void) => void;
    getAttributeFilters: () => ParserFilter[];
    addNodeFilter: (name: string, callback: (nodes: Node[], name: string, args: any) => void) => void;
    getNodeFilters: () => ParserFilter[];
    filterNode: (node: Node) => Node;
    parse: (html: string, args?: any) => Node;
};
