/**
 * Type.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
var isType = function (type) {
    return function (value) {
        return typeof value === type;
    };
};
var isArray = function (value) {
    return Array.isArray(value);
};
var isNull = function (value) {
    return value === null;
};
var isObject = function (predicate) {
    return function (value) {
        return !isNull(value) && !isArray(value) && predicate(value);
    };
};
export default {
    isString: isType('string'),
    isNumber: isType('number'),
    isBoolean: isType('boolean'),
    isFunction: isType('function'),
    isObject: isObject(isType('object')),
    isNull: isNull,
    isArray: isArray
};
//# sourceMappingURL=Type.js.map