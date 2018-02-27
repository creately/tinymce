declare const _default: {
    createUi: () => {
        type: string;
        label: string;
        layout: string;
        align: string;
        spacing: number;
        items: ({
            name: string;
            type: string;
            maxLength: number;
            size: number;
            onchange: (evt: any) => void;
            ariaLabel: string;
            text?: undefined;
            checked?: undefined;
        } | {
            type: string;
            text: string;
            name?: undefined;
            maxLength?: undefined;
            size?: undefined;
            onchange?: undefined;
            ariaLabel?: undefined;
            checked?: undefined;
        } | {
            name: string;
            type: string;
            checked: boolean;
            text: string;
            maxLength?: undefined;
            size?: undefined;
            onchange?: undefined;
            ariaLabel?: undefined;
        })[];
    };
    syncSize: (win: any) => void;
    updateSize: (win: any) => void;
};
export default _default;
