export default function (): {
    wrapper: any;
    toolbar: any;
    createGroups: (gs: any) => any;
    setGroups: (gs: any) => void;
    setContextToolbar: (gs: any) => void;
    restoreToolbar: () => void;
    refresh: () => void;
    focus: () => void;
};
