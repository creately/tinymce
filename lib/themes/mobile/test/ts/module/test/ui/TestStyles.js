import { Assertions, Chain, UiFinder, Waiter } from '@ephox/agar';
import { Id } from '@ephox/katamari';
import { Attr, Class, Css, Element, Insert, Remove, SelectorFind } from '@ephox/sugar';
var styleClass = Id.generate('ui-test-styles');
var addStyles = function () {
    var link = Element.fromTag('link');
    Attr.setAll(link, {
        rel: 'Stylesheet',
        href: '/project/js/tinymce/skins/lightgray/skin.mobile.min.css',
        type: 'text/css'
    });
    Class.add(link, styleClass);
    var head = Element.fromDom(document.head);
    Insert.append(head, link);
};
var removeStyles = function () {
    var head = Element.fromDom(document.head);
    SelectorFind.descendant(head, '.' + styleClass).each(Remove.remove);
};
var sWaitForToolstrip = function (realm) {
    return Waiter.sTryUntil('Waiting until CSS has loaded', Chain.asStep(realm.element(), [
        UiFinder.cFindIn('.tinymce-mobile-toolstrip'),
        Chain.op(function (toolstrip) {
            if (navigator.userAgent.indexOf('PhantomJS') === -1) {
                Assertions.assertEq('Checking toolstrip is flex', 'flex', Css.get(toolstrip, 'display'));
            }
        })
    ]), 100, 8000);
};
export default {
    addStyles: addStyles,
    removeStyles: removeStyles,
    sWaitForToolstrip: sWaitForToolstrip
};
//# sourceMappingURL=TestStyles.js.map