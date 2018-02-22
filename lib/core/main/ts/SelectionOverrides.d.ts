declare const SelectionOverrides: (editor: any) => {
    showCaret: (direction: any, node: HTMLElement, before: boolean) => Range;
    showBlockCaretContainer: (blockCaretContainer: any) => void;
    hideFakeCaret: () => void;
    destroy: () => void;
};
export default SelectionOverrides;
