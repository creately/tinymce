declare const _default: {
    makeTab: (editor: any, updateStyle: any) => {
        title: string;
        type: string;
        pack: string;
        items: ({
            label: string;
            name: string;
            type: string;
            onchange: (evt: any) => void;
            layout?: undefined;
            packV?: undefined;
            columns?: undefined;
            padding?: undefined;
            defaults?: undefined;
            items?: undefined;
        } | {
            type: string;
            layout: string;
            packV: string;
            columns: number;
            padding: number;
            defaults: {
                type: string;
                maxWidth: number;
                onchange(evt: any): void;
            };
            items: ({
                label: string;
                name: string;
                type?: undefined;
                width?: undefined;
                maxWidth?: undefined;
                onselect?: undefined;
                values?: undefined;
            } | {
                label: string;
                type: string;
                name: string;
                width: number;
                maxWidth: number;
                onselect(evt: any): void;
                values: {
                    text: string;
                    value: string;
                }[];
            })[];
            label?: undefined;
            name?: undefined;
            onchange?: undefined;
        })[];
    };
};
export default _default;
