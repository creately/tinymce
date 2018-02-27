export default function (editor: any): {
    get: (name: string) => any;
    register: (name: any, format?: any) => void;
    unregister: (name: string) => {};
};
