declare const _default: {
    cGetFocused: {
        runChain: (value: any, next: any, die: any) => void;
    };
    cGetParent: {
        runChain: (value: any, next: any, die: any) => void;
    };
    sSetFieldValue: (value: any) => (value: any, next: any, die: any) => void;
    sSetFieldOptValue: (optVal: any) => any;
    sWaitForToggledState: (label: any, state: any, realm: any, memento: any) => (value: any, next: any, die: any) => void;
    sClickComponent: (realm: any, memento: any) => (value: any, next: any, die: any) => void;
    sStartEditor: (alloy: any) => (value: any, next: any, die: any) => void;
    sBroadcastState: (realm: any, channels: any, command: any, state: any) => (value: any, next: any, die: any) => void;
};
export default _default;
