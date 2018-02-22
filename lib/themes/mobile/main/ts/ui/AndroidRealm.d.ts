export default function (scrollIntoView: any): {
    system: any;
    element: any;
    init: (spec: any) => void;
    exit: () => void;
    setToolbarGroups: (rawGroups: any) => void;
    setContextToolbar: (rawGroups: any) => void;
    focusToolbar: () => void;
    restoreToolbar: () => void;
    updateMode: (readOnly: any) => void;
    socket: any;
    dropup: any;
};
