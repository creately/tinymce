export default function (): {
    create: (o: any, blob?: any, base64?: any, filename?: any) => {
        id: () => any;
        name: () => any;
        filename: () => any;
        blob: () => any;
        base64: () => any;
        blobUri: () => any;
        uri: () => any;
    };
    add: (blobInfo: any) => void;
    get: (id: any) => any;
    getByUri: (blobUri: any) => any;
    findFirst: (predicate: any) => any;
    removeByUri: (blobUri: any) => void;
    destroy: () => void;
};
