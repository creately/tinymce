import { Option } from '@ephox/katamari';
declare const _default: {
    store: (editor: any) => void;
    storeNative: (editor: any, rng: any) => void;
    readRange: (win: any) => Option<any>;
    restore: (editor: any) => void;
    getRng: (editor: any) => any;
    getBookmark: (root: any) => Option<any>;
    validate: (root: any, bookmark: any) => Option<any>;
};
export default _default;
