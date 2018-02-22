import { Assertions, Pipeline, Step } from '@ephox/agar';
import { Attachment, Gui } from '@ephox/alloy';
import { Merger } from '@ephox/katamari';
import { DomEvent, Element, Html, Insert, Remove } from '@ephox/sugar';
import TestStore from './TestStore';
var setup = function (createComponent, f, success, failure) {
    var store = TestStore();
    var gui = Gui.create();
    var doc = Element.fromDom(document);
    var body = Element.fromDom(document.body);
    Attachment.attachSystem(body, gui);
    var component = createComponent(store, doc, body);
    gui.add(component);
    Pipeline.async({}, f(doc, body, gui, component, store), function () {
        Attachment.detachSystem(gui);
        success();
    }, function (e) {
        // tslint:disable-next-line:no-console
        console.error(e);
        failure(e);
    });
};
var mSetupKeyLogger = function (body) {
    return Step.stateful(function (_, next, die) {
        var onKeydown = DomEvent.bind(body, 'keydown', function (event) {
            newState.log.push('keydown.to.body: ' + event.raw().which);
        });
        var log = [];
        var newState = {
            log: log,
            onKeydown: onKeydown
        };
        next(newState);
    });
};
var mTeardownKeyLogger = function (body, expected) {
    return Step.stateful(function (state, next, die) {
        Assertions.assertEq('Checking key log outside context (on teardown)', expected, state.log);
        state.onKeydown.unbind();
        next({});
    });
};
var mAddStyles = function (doc, styles) {
    return Step.stateful(function (value, next, die) {
        var style = Element.fromTag('style');
        var head = Element.fromDom(doc.dom().head);
        Insert.append(head, style);
        Html.set(style, styles.join('\n'));
        next(Merger.deepMerge(value, {
            style: style
        }));
    });
};
var mRemoveStyles = Step.stateful(function (value, next, die) {
    Remove.remove(value.style);
    next(value);
});
export default {
    setup: setup,
    mSetupKeyLogger: mSetupKeyLogger,
    mTeardownKeyLogger: mTeardownKeyLogger,
    mAddStyles: mAddStyles,
    mRemoveStyles: mRemoveStyles
};
//# sourceMappingURL=GuiSetup.js.map