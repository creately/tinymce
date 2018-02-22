export default function (win: any, frame: any): {
    update: () => void;
    isActive: () => boolean;
    destroy: () => void;
    clear: () => void;
};
