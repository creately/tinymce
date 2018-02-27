export default function (editor: any): {
    open: (args: any, params: any, closeCallback: any) => any;
    alert: (message: any, choiceCallback: any, closeCallback: any) => any;
    confirm: (message: any, choiceCallback: any, closeCallback: any) => any;
    close: (window: any) => void;
    getParams: (window: any) => any;
    setParams: (window: any, params: any) => void;
};
