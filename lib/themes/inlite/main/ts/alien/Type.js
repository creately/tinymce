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
var isArray = function (value) { return Array.isArray(value); };
var isNull = function (value) {
    return value === null;
};
var isObject = function (predicate) {
    return function (value) {
        return !isNull(value) && !isArray(value) && predicate(value);
    };
};
var isString = function (value) { return isType('string')(value); };
var isNumber = function (value) { return isType('number')(value); };
var isFunction = function (value) { return isType('function')(value); };
var isBoolean = function (value) { return isType('boolean')(value); };
export default {
    isString: isString,
    isNumber: isNumber,
    isBoolean: isBoolean,
    isFunction: isFunction,
    isObject: isObject(isType('object')),
    isNull: isNull,
    isArray: isArray
};
//# sourceMappingURL=Type.js.map