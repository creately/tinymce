declare const _default: {
    createStyleForm: (editor: any) => {
        title: string;
        type: string;
        defaults: {
            onchange: any;
        };
        items: ({
            label: string;
            name: string;
            type: string;
            padding?: undefined;
            formItemDefaults?: undefined;
            defaults?: undefined;
            items?: undefined;
        } | {
            type: string;
            padding: number;
            formItemDefaults: {
                layout: string;
                alignH: string[];
            };
            defaults: {
                size: number;
            };
            items: ({
                label: string;
                type: string;
                name: string;
                width: number;
                onselect: any;
                values: {
                    text: string;
                    value: string;
                }[];
                onaction?: undefined;
            } | {
                label: string;
                type: string;
                name: string;
                onaction: (evt: any) => any;
                width?: undefined;
                onselect?: undefined;
                values?: undefined;
            })[];
            label?: undefined;
            name?: undefined;
        })[];
    };
    buildListItems: (inputList: any, itemCallback: any, startItems?: any) => any;
    updateStyleField: (editor: any, evt: any) => void;
    extractAdvancedStyles: (dom: any, elm: any) => any;
};
export default _default;
