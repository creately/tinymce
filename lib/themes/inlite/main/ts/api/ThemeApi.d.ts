import { Editor } from 'tinymce/core/api/Editor';
import { InlitePanel } from 'tinymce/themes/inlite/ui/Panel';
declare const _default: {
    get: (editor: Editor, panel: InlitePanel) => {
        renderUI: () => {};
        getNotificationManagerImpl(): {
            open: (args: any, closeCallback: any) => any;
            close: (notification: any) => void;
            reposition: (notifications: any) => void;
            getArgs: (notification: any) => any;
        };
        getWindowManagerImpl(): {
            open: (args: any, params: any, closeCallback: any) => any;
            alert: (message: any, choiceCallback: any, closeCallback: any) => any;
            confirm: (message: any, choiceCallback: any, closeCallback: any) => any;
            close: (window: any) => void;
            getParams: (window: any) => any;
            setParams: (window: any, params: any) => void;
        };
    };
};
export default _default;
