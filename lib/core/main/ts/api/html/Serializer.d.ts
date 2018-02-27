import Node from './Node';
/**
 * This class is used to serialize down the DOM tree into a string using a Writer instance.
 *
 *
 * @example
 * new tinymce.html.Serializer().serialize(new tinymce.html.DomParser().parse('<p>text</p>'));
 * @class tinymce.html.Serializer
 * @version 3.4
 */
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
    serialize: (node: Node) => string;
};
