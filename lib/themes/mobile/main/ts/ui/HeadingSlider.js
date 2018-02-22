import { Arr } from '@ephox/katamari';
import { Compare, Element, Node, TransformFind } from '@ephox/sugar';
import UiDomFactory from '../util/UiDomFactory';
import SizeSlider from './SizeSlider';
import ToolbarWidgets from './ToolbarWidgets';
var headings = ['p', 'h3', 'h2', 'h1'];
var makeSlider = function (spec) {
    return SizeSlider.sketch({
        category: 'heading',
        sizes: headings,
        onChange: spec.onChange,
        getInitialValue: spec.getInitialValue
    });
};
var sketch = function (realm, editor) {
    var spec = {
        onChange: function (value) {
            editor.execCommand('FormatBlock', null, headings[value].toLowerCase());
        },
        getInitialValue: function () {
            var node = editor.selection.getStart();
            var elem = Element.fromDom(node);
            return TransformFind.closest(elem, function (e) {
                var nodeName = Node.name(e);
                return Arr.indexOf(headings, nodeName);
            }, function (e) {
                return Compare.eq(e, Element.fromDom(editor.getBody()));
            }).getOr(0);
        }
    };
    return ToolbarWidgets.button(realm, 'heading', function () {
        return [
            UiDomFactory.spec('<span class="${prefix}-toolbar-button ${prefix}-icon-small-heading ${prefix}-icon"></span>'),
            makeSlider(spec),
            UiDomFactory.spec('<span class="${prefix}-toolbar-button ${prefix}-icon-large-heading ${prefix}-icon"></span>')
        ];
    });
};
export default {
    sketch: sketch
};
//# sourceMappingURL=HeadingSlider.js.map