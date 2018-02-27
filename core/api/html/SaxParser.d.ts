/**
 * Constructs a new SaxParser instance.
 *
 * @constructor
 * @method SaxParser
 * @param {Object} settings Name/value collection of settings. comment, cdata, text, start and end are callbacks.
 * @param {tinymce.html.Schema} schema HTML Schema class to use when parsing.
 */
export declare function SaxParser(settings: any, schema?: {
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
    parse: (html: string) => void;
};
export declare namespace SaxParser {
    const findEndTag: (schema: any, html: any, startIndex: any) => any;
}
export default SaxParser;
