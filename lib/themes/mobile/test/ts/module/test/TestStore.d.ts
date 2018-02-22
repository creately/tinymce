import { Option } from '@ephox/katamari';
export default function (): {
    adder: (value: any) => () => void;
    adderH: (value: any) => () => Option<boolean>;
    clear: () => void;
    sClear: (value: any, next: any, die: any) => void;
    sAssertEq: (label: any, expected: any) => (value: any, next: any, die: any) => void;
    assertEq: (label: any, expected: any) => void;
    sAssertSortedEq: (label: any, expected: any) => (value: any, next: any, die: any) => void;
};
