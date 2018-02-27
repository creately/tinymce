declare const _default: {
    hasSidebar: (editor: any) => boolean;
    createSidebar: (editor: any) => {
        type: string;
        name: string;
        layout: string;
        classes: string;
        items: {
            type: string;
            layout: string;
            classes: string;
            items: any[];
        }[];
    };
};
export default _default;
