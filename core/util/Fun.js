/**
 * Fun.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
/**
 * Functional utility class.
 *
 * @private
 * @class tinymce.util.Fun
 */
var slice = [].slice;
var constant = function (value) {
    return function () {
        return value;
    };
};
var negate = function (predicate) {
    return function (x) {
        return !predicate(x);
    };
};
var compose = function (f, g) {
    return function (x) {
        return f(g(x));
    };
};
var or = function () {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
    var args = slice.call(arguments);
    return function (x) {
        for (var i = 0; i < args.length; i++) {
            if (args[i](x)) {
                return true;
            }
        }
        return false;
    };
};
var and = function () {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
    var args = slice.call(arguments);
    return function (x) {
        for (var i = 0; i < args.length; i++) {
            if (!args[i](x)) {
                return false;
            }
        }
        return true;
    };
};
var curry = function (fn) {
    var x = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        x[_i - 1] = arguments[_i];
    }
    var args = slice.call(arguments);
    if (args.length - 1 >= fn.length) {
        return fn.apply(this, args.slice(1));
    }
    return function () {
        var tempArgs = args.concat([].slice.call(arguments));
        return curry.apply(this, tempArgs);
    };
};
var noop = function () {
};
export default {
    constant: constant,
    negate: negate,
    and: and,
    or: or,
    curry: curry,
    compose: compose,
    noop: noop
};
//# sourceMappingURL=Fun.js.map