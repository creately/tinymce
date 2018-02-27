import { Behaviour, Button, Container, GuiFactory, Replacing, Swapping } from '@ephox/alloy';
import UiDomFactory from '../util/UiDomFactory';
var makeEditSwitch = function (webapp) {
    return GuiFactory.build(Button.sketch({
        dom: UiDomFactory.dom('<div class="${prefix}-mask-edit-icon ${prefix}-icon"></div>'),
        action: function () {
            webapp.run(function (w) {
                w.setReadOnly(false);
            });
        }
    }));
};
var makeSocket = function () {
    return GuiFactory.build(Container.sketch({
        dom: UiDomFactory.dom('<div class="${prefix}-editor-socket"></div>'),
        components: [],
        containerBehaviours: Behaviour.derive([
            Replacing.config({})
        ])
    }));
};
var showEdit = function (socket, switchToEdit) {
    Replacing.append(socket, GuiFactory.premade(switchToEdit));
};
var hideEdit = function (socket, switchToEdit) {
    Replacing.remove(socket, switchToEdit);
};
var updateMode = function (socket, switchToEdit, readOnly, root) {
    var swap = (readOnly === true) ? Swapping.toAlpha : Swapping.toOmega;
    swap(root);
    var f = readOnly ? showEdit : hideEdit;
    f(socket, switchToEdit);
};
export default {
    makeEditSwitch: makeEditSwitch,
    makeSocket: makeSocket,
    updateMode: updateMode
};
//# sourceMappingURL=CommonRealm.js.map