import { DomFactory } from '@ephox/alloy';
import { Strings } from '@ephox/katamari';
import Styles from '../style/Styles';
var dom = function (rawHtml) {
    var html = Strings.supplant(rawHtml, {
        prefix: Styles.prefix()
    });
    return DomFactory.fromHtml(html);
};
var spec = function (rawHtml) {
    var sDom = dom(rawHtml);
    return {
        dom: sDom
    };
};
export default {
    dom: dom,
    spec: spec
};
//# sourceMappingURL=UiDomFactory.js.map