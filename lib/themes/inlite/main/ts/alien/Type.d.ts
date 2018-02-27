declare const _default: {
    isString: (value: any) => value is string;
    isNumber: (value: any) => value is number;
    isBoolean: (value: any) => value is boolean;
    isFunction: (value: any) => value is Function;
    isObject: (value: any) => any;
    isNull: (value: any) => boolean;
    isArray: (value: any) => value is any[];
};
export default _default;
