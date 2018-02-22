export default function (): {
    show: (editor: any, id: any, targetRect: any, toolbars: any) => void;
    showForm: (editor: any, id: any) => void;
    reposition: (editor: any, id: any, targetRect: any) => void;
    inForm: () => boolean;
    hide: () => void;
    focus: () => void;
    remove: () => void;
};
