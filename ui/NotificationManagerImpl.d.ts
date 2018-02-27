export default function (editor: any): {
    open: (args: any, closeCallback: any) => any;
    close: (notification: any) => void;
    reposition: (notifications: any) => void;
    getArgs: (notification: any) => any;
};
