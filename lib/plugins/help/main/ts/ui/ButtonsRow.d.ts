declare const _default: {
    makeRow: () => ({
        type: string;
        html: any;
        flex?: undefined;
        text?: undefined;
        onclick?: undefined;
    } | {
        type: string;
        flex: number;
        html?: undefined;
        text?: undefined;
        onclick?: undefined;
    } | {
        text: string;
        onclick(): void;
        type?: undefined;
        html?: undefined;
        flex?: undefined;
    })[];
};
export default _default;
