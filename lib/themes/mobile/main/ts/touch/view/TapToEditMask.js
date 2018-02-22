import { Behaviour, Button, Container, Memento, Toggling } from '@ephox/alloy';
import { Throttler } from '@ephox/katamari';
import Styles from '../../style/Styles';
import UiDomFactory from '../../util/UiDomFactory';
var sketch = function (onView, translate) {
    var memIcon = Memento.record(Container.sketch({
        dom: UiDomFactory.dom('<div aria-hidden="true" class="${prefix}-mask-tap-icon"></div>'),
        containerBehaviours: Behaviour.derive([
            Toggling.config({
                toggleClass: Styles.resolve('mask-tap-icon-selected'),
                toggleOnExecute: false
            })
        ])
    }));
    var onViewThrottle = Throttler.first(onView, 200);
    return Container.sketch({
        dom: UiDomFactory.dom('<div class="${prefix}-disabled-mask"></div>'),
        components: [
            Container.sketch({
                dom: UiDomFactory.dom('<div class="${prefix}-content-container"></div>'),
                components: [
                    Button.sketch({
                        dom: UiDomFactory.dom('<div class="${prefix}-content-tap-section"></div>'),
                        components: [
                            memIcon.asSpec()
                        ],
                        action: function (button) {
                            onViewThrottle.throttle();
                        },
                        buttonBehaviours: Behaviour.derive([
                            Toggling.config({
                                toggleClass: Styles.resolve('mask-tap-icon-selected')
                            })
                        ])
                    })
                ]
            })
        ]
    });
};
export default {
    sketch: sketch
};
//# sourceMappingURL=TapToEditMask.js.map