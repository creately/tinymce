export default function (): {
    component: any;
    config: any;
    editor: any;
    adder: (value: any) => () => void;
    assertEq: (label: any, expected: any) => void;
    sAssertEq: (label: any, expected: any) => (value: any, next: any, die: any) => void;
    sClear: (value: any, next: any, die: any) => void;
    sPrepareState: (node: any, content: any) => (value: any, next: any, die: any) => void;
};
