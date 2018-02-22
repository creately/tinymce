import { Fun } from '@ephox/katamari';
var prefix = 'tinymce-mobile';
var resolve = function (p) {
    return prefix + '-' + p;
};
export default {
    resolve: resolve,
    prefix: Fun.constant(prefix)
};
//# sourceMappingURL=Styles.js.map