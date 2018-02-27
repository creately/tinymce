import { Editor } from 'tinymce/core/api/Editor';
interface SelectionOverrides {
    showCaret: (direction: number, node: Element, before: boolean, scrollIntoView?: boolean) => Range;
    showBlockCaretContainer: (blockCaretContainer: Element) => void;
    hideFakeCaret: () => void;
    destroy: () => void;
}
declare const SelectionOverrides: (editor: Editor) => SelectionOverrides;
export default SelectionOverrides;
