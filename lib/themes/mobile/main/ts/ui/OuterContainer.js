import { Behaviour, Container, Gui, GuiFactory, Swapping } from '@ephox/alloy';
import { Fun } from '@ephox/katamari';
import Styles from '../style/Styles';
var READ_ONLY_MODE_CLASS = Fun.constant(Styles.resolve('readonly-mode'));
var EDIT_MODE_CLASS = Fun.constant(Styles.resolve('edit-mode'));
export default function (spec) {
    var root = GuiFactory.build(Container.sketch({
        dom: {
            classes: [Styles.resolve('outer-container')].concat(spec.classes)
        },
        containerBehaviours: Behaviour.derive([
            Swapping.config({
                alpha: READ_ONLY_MODE_CLASS(),
                omega: EDIT_MODE_CLASS()
            })
        ])
    }));
    return Gui.takeover(root);
}
//# sourceMappingURL=OuterContainer.js.map