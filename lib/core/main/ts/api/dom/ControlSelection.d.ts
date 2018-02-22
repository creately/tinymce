import { Selection } from './Selection';
interface ControlSelection {
    isResizable: (elm: Element) => boolean;
    showResizeRect: (elm: Element) => void;
    hideResizeRect: () => void;
    updateResizeRect: (evt: Event) => void;
    destroy: () => void;
}
declare const ControlSelection: (selection: Selection, editor: any) => ControlSelection;
export default ControlSelection;
