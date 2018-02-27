declare const funcs: {
    id(): string;
    create(name: any, attrs: any, children?: any): any;
    createFragment(html: any): any;
    getWindowSize(): any;
    getSize(elm: any): {
        width: any;
        height: any;
    };
    getPos(elm: any, root?: any): any;
    getContainer(): any;
    getViewPort(win?: any): any;
    get(id: any): HTMLElement;
    addClass(elm: any, cls: any): any;
    removeClass(elm: any, cls: any): any;
    hasClass(elm: any, cls: any): any;
    toggleClass(elm: any, cls: any, state: any): any;
    css(elm: any, name: any, value?: any): any;
    getRuntimeStyle(elm: any, name: any): any;
    on(target: any, name: any, callback: any, scope?: any): any;
    off(target: any, name: any, callback: any): any;
    fire(target: any, name: any, args: any): any;
    innerHtml(elm: any, html: any): void;
};
export default funcs;
