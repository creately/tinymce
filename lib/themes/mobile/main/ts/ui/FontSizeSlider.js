import SizeSlider from './SizeSlider';
import ToolbarWidgets from './ToolbarWidgets';
import FontSizes from '../util/FontSizes';
import UiDomFactory from '../util/UiDomFactory';
var sizes = FontSizes.candidates();
var makeSlider = function (spec) {
    return SizeSlider.sketch({
        onChange: spec.onChange,
        sizes: sizes,
        category: 'font',
        getInitialValue: spec.getInitialValue
    });
};
var makeItems = function (spec) {
    return [
        UiDomFactory.spec('<span class="${prefix}-toolbar-button ${prefix}-icon-small-font ${prefix}-icon"></span>'),
        makeSlider(spec),
        UiDomFactory.spec('<span class="${prefix}-toolbar-button ${prefix}-icon-large-font ${prefix}-icon"></span>')
    ];
};
var sketch = function (realm, editor) {
    var spec = {
        onChange: function (value) {
            FontSizes.apply(editor, value);
        },
        getInitialValue: function () {
            return FontSizes.get(editor);
        }
    };
    return ToolbarWidgets.button(realm, 'font-size', function () {
        return makeItems(spec);
    });
};
export default {
    makeItems: makeItems,
    sketch: sketch
};
//# sourceMappingURL=FontSizeSlider.js.map