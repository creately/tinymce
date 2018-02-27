/**
 * This class handles the creation of native windows and dialogs. This class can be extended to provide for example inline dialogs.
 *
 * @class tinymce.WindowManager
 * @example
 * // Opens a new dialog with the file.htm file and the size 320x240
 * // It also adds a custom parameter this can be retrieved by using tinyMCEPopup.getWindowArg inside the dialog.
 * tinymce.activeEditor.windowManager.open({
 *    url: 'file.htm',
 *    width: 320,
 *    height: 240
 * }, {
 *    custom_param: 1
 * });
 *
 * // Displays an alert box using the active editors window manager instance
 * tinymce.activeEditor.windowManager.alert('Hello world!');
 *
 * // Displays an confirm box and an alert message will be displayed depending on what you choose in the confirm
 * });
 */
export default function (editor: any): {
    windows: any[];
    open: (args: any, params: any) => any;
    alert: (message: any, callback: any, scope: any) => void;
    confirm: (message: any, callback: any, scope: any) => void;
    close: () => void;
    getParams: () => {};
    setParams: (params: any) => void;
    getWindows: () => any[];
};
