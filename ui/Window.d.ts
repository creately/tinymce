/**
 * Creates a new window.
 *
 * @-x-less Window.less
 * @class tinymce.ui.Window
 * @extends tinymce.ui.FloatPanel
 */
interface Window {
    _fullscreen: boolean;
    layoutRect: any;
    moveTo: Function;
    settings: any;
}
declare const Window: any;
export default Window;
