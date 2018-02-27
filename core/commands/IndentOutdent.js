import { Arr } from '@ephox/katamari';
var indentElement = function (dom, command, useMargin, value, unit, element) {
    if (dom.getContentEditable(element) === 'false') {
        return;
    }
    if (element.nodeName !== 'LI') {
        var indentStyleName = useMargin ? 'margin' : 'padding';
        indentStyleName = element.nodeName === 'TABLE' ? 'margin' : indentStyleName;
        indentStyleName += dom.getStyle(element, 'direction', true) === 'rtl' ? 'Right' : 'Left';
        if (command === 'outdent') {
            var styleValue = Math.max(0, parseInt(element.style[indentStyleName] || 0, 10) - value);
            dom.setStyle(element, indentStyleName, styleValue ? styleValue + unit : '');
        }
        else {
            var styleValue = (parseInt(element.style[indentStyleName] || 0, 10) + value) + unit;
            dom.setStyle(element, indentStyleName, styleValue);
        }
    }
};
export var handle = function (editor, command) {
    var settings = editor.settings, dom = editor.dom, selection = editor.selection, formatter = editor.formatter;
    var indentUnit = /[a-z%]+$/i.exec(settings.indentation)[0];
    var indentValue = parseInt(settings.indentation, 10);
    var useMargin = editor.getParam('indent_use_margin', false);
    if (!editor.queryCommandState('InsertUnorderedList') && !editor.queryCommandState('InsertOrderedList')) {
        // If forced_root_blocks is set to false we don't have a block to indent so lets create a div
        if (!settings.forced_root_block && !dom.getParent(selection.getNode(), dom.isBlock)) {
            formatter.apply('div');
        }
        Arr.each(selection.getSelectedBlocks(), function (element) {
            return indentElement(dom, command, useMargin, indentValue, indentUnit, element);
        });
    }
};
//# sourceMappingURL=IndentOutdent.js.map