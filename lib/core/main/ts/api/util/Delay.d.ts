declare const _default: {
    requestAnimationFrame(callback: any, element?: any): void;
    setTimeout: (callback: any, time?: any) => number;
    setInterval: (callback: any, time?: any) => number;
    setEditorTimeout(editor: any, callback: any, time?: any): number;
    setEditorInterval(editor: any, callback: any, time?: any): any;
    debounce: (callback: any, time?: any) => any;
    throttle: (callback: any, time?: any) => any;
    clearInterval: (id: any) => void;
    clearTimeout: (id: any) => void;
};
export default _default;
