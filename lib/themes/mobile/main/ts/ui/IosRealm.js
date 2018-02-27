import { Replacing } from '@ephox/alloy';
import { Fun, Singleton } from '@ephox/katamari';
import IosWebapp from '../api/IosWebapp';
import Styles from '../style/Styles';
import ScrollingToolbar from '../toolbar/ScrollingToolbar';
import CommonRealm from './CommonRealm';
import Dropup from './Dropup';
import OuterContainer from './OuterContainer';
export default function (scrollIntoView) {
    var alloy = OuterContainer({
        classes: [Styles.resolve('ios-container')]
    });
    var toolbar = ScrollingToolbar();
    var webapp = Singleton.api();
    var switchToEdit = CommonRealm.makeEditSwitch(webapp);
    var socket = CommonRealm.makeSocket();
    var dropup = Dropup.build(function () {
        webapp.run(function (w) {
            w.refreshStructure();
        });
    }, scrollIntoView);
    alloy.add(toolbar.wrapper());
    alloy.add(socket);
    alloy.add(dropup.component());
    var setToolbarGroups = function (rawGroups) {
        var groups = toolbar.createGroups(rawGroups);
        toolbar.setGroups(groups);
    };
    var setContextToolbar = function (rawGroups) {
        var groups = toolbar.createGroups(rawGroups);
        toolbar.setContextToolbar(groups);
    };
    var focusToolbar = function () {
        toolbar.focus();
    };
    var restoreToolbar = function () {
        toolbar.restoreToolbar();
    };
    var init = function (spec) {
        webapp.set(IosWebapp.produce(spec));
    };
    var exit = function () {
        webapp.run(function (w) {
            Replacing.remove(socket, switchToEdit);
            w.exit();
        });
    };
    var updateMode = function (readOnly) {
        CommonRealm.updateMode(socket, switchToEdit, readOnly, alloy.root());
    };
    return {
        system: Fun.constant(alloy),
        element: alloy.element,
        init: init,
        exit: exit,
        setToolbarGroups: setToolbarGroups,
        setContextToolbar: setContextToolbar,
        focusToolbar: focusToolbar,
        restoreToolbar: restoreToolbar,
        updateMode: updateMode,
        socket: Fun.constant(socket),
        dropup: Fun.constant(dropup)
    };
}
//# sourceMappingURL=IosRealm.js.map