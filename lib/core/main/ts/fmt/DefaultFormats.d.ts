declare const _default: {
    get: (dom: any) => {
        valigntop: {
            selector: string;
            styles: {
                verticalAlign: string;
            };
        }[];
        valignmiddle: {
            selector: string;
            styles: {
                verticalAlign: string;
            };
        }[];
        valignbottom: {
            selector: string;
            styles: {
                verticalAlign: string;
            };
        }[];
        alignleft: ({
            selector: string;
            collapsed: boolean;
            classes: string;
            ceFalseOverride: boolean;
            preview: string;
            styles?: undefined;
            inherit?: undefined;
            defaultBlock?: undefined;
        } | {
            selector: string;
            styles: {
                textAlign: string;
                float?: undefined;
            };
            inherit: boolean;
            preview: boolean;
            defaultBlock: string;
            collapsed?: undefined;
            classes?: undefined;
            ceFalseOverride?: undefined;
        } | {
            selector: string;
            collapsed: boolean;
            styles: {
                float: string;
                textAlign?: undefined;
            };
            preview: string;
            classes?: undefined;
            ceFalseOverride?: undefined;
            inherit?: undefined;
            defaultBlock?: undefined;
        })[];
        aligncenter: ({
            selector: string;
            styles: {
                textAlign: string;
                display?: undefined;
                marginLeft?: undefined;
                marginRight?: undefined;
            };
            inherit: boolean;
            preview: string;
            defaultBlock: string;
            collapsed?: undefined;
            classes?: undefined;
            ceFalseOverride?: undefined;
        } | {
            selector: string;
            collapsed: boolean;
            classes: string;
            ceFalseOverride: boolean;
            preview: string;
            styles?: undefined;
            inherit?: undefined;
            defaultBlock?: undefined;
        } | {
            selector: string;
            collapsed: boolean;
            styles: {
                display: string;
                marginLeft: string;
                marginRight: string;
                textAlign?: undefined;
            };
            preview: boolean;
            inherit?: undefined;
            defaultBlock?: undefined;
            classes?: undefined;
            ceFalseOverride?: undefined;
        } | {
            selector: string;
            collapsed: boolean;
            styles: {
                marginLeft: string;
                marginRight: string;
                textAlign?: undefined;
                display?: undefined;
            };
            preview: string;
            inherit?: undefined;
            defaultBlock?: undefined;
            classes?: undefined;
            ceFalseOverride?: undefined;
        })[];
        alignright: ({
            selector: string;
            collapsed: boolean;
            classes: string;
            ceFalseOverride: boolean;
            preview: string;
            styles?: undefined;
            inherit?: undefined;
            defaultBlock?: undefined;
        } | {
            selector: string;
            styles: {
                textAlign: string;
                float?: undefined;
            };
            inherit: boolean;
            preview: string;
            defaultBlock: string;
            collapsed?: undefined;
            classes?: undefined;
            ceFalseOverride?: undefined;
        } | {
            selector: string;
            collapsed: boolean;
            styles: {
                float: string;
                textAlign?: undefined;
            };
            preview: string;
            classes?: undefined;
            ceFalseOverride?: undefined;
            inherit?: undefined;
            defaultBlock?: undefined;
        })[];
        alignjustify: {
            selector: string;
            styles: {
                textAlign: string;
            };
            inherit: boolean;
            defaultBlock: string;
            preview: string;
        }[];
        bold: ({
            inline: string;
            remove: string;
            styles?: undefined;
        } | {
            inline: string;
            styles: {
                fontWeight: string;
            };
            remove?: undefined;
        })[];
        italic: ({
            inline: string;
            remove: string;
            styles?: undefined;
        } | {
            inline: string;
            styles: {
                fontStyle: string;
            };
            remove?: undefined;
        })[];
        underline: ({
            inline: string;
            styles: {
                textDecoration: string;
            };
            exact: boolean;
            remove?: undefined;
        } | {
            inline: string;
            remove: string;
            styles?: undefined;
            exact?: undefined;
        })[];
        strikethrough: ({
            inline: string;
            styles: {
                textDecoration: string;
            };
            exact: boolean;
            remove?: undefined;
        } | {
            inline: string;
            remove: string;
            styles?: undefined;
            exact?: undefined;
        })[];
        forecolor: {
            inline: string;
            styles: {
                color: string;
            };
            links: boolean;
            remove_similar: boolean;
            clear_child_styles: boolean;
        };
        hilitecolor: {
            inline: string;
            styles: {
                backgroundColor: string;
            };
            links: boolean;
            remove_similar: boolean;
            clear_child_styles: boolean;
        };
        fontname: {
            inline: string;
            styles: {
                fontFamily: string;
            };
            clear_child_styles: boolean;
        };
        fontsize: {
            inline: string;
            styles: {
                fontSize: string;
            };
            clear_child_styles: boolean;
        };
        fontsize_class: {
            inline: string;
            attributes: {
                class: string;
            };
        };
        blockquote: {
            block: string;
            wrapper: number;
            remove: string;
        };
        subscript: {
            inline: string;
        };
        superscript: {
            inline: string;
        };
        code: {
            inline: string;
        };
        link: {
            inline: string;
            selector: string;
            remove: string;
            split: boolean;
            deep: boolean;
            onmatch(): boolean;
            onformat(elm: any, fmt: any, vars: any): void;
        };
        removeformat: ({
            selector: string;
            remove: string;
            split: boolean;
            expand: boolean;
            block_expand: boolean;
            deep: boolean;
            attributes?: undefined;
        } | {
            selector: string;
            attributes: string[];
            remove: string;
            split: boolean;
            expand: boolean;
            deep: boolean;
            block_expand?: undefined;
        } | {
            selector: string;
            attributes: string[];
            split: boolean;
            expand: boolean;
            deep: boolean;
            remove?: undefined;
            block_expand?: undefined;
        })[];
    };
};
export default _default;
