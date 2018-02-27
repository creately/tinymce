declare const _default: {
    makeTab: (editor: any) => {
        title: string;
        type: string;
        layout: string;
        direction: string;
        align: string;
        padding: string;
        items: ({
            type: string;
            layout: string;
            direction: string;
            align: string;
            spacing: number;
            items: ({
                text: string;
                type: string;
                accept: string;
                onchange: (evt: any) => Promise<void | {}>;
            } | {
                text: string;
                type: string;
                accept?: undefined;
                onchange?: undefined;
            })[];
            text?: undefined;
            accept?: undefined;
            height?: undefined;
            onchange?: undefined;
        } | {
            text: string;
            type: string;
            accept: string;
            height: number;
            onchange: (evt: any) => Promise<void | {}>;
            layout?: undefined;
            direction?: undefined;
            align?: undefined;
            spacing?: undefined;
            items?: undefined;
        })[];
    };
};
export default _default;
