/**
 * Coords.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import DOMUtils from 'tinymce/core/api/dom/DOMUtils';
import { getUiContainer } from 'tinymce/plugins/contextmenu/core/UiContainer';
var nu = function (x, y) {
    return { x: x, y: y };
};
var transpose = function (pos, dx, dy) {
    return nu(pos.x + dx, pos.y + dy);
};
var fromPageXY = function (e) {
    return nu(e.pageX, e.pageY);
};
var fromClientXY = function (e) {
    return nu(e.clientX, e.clientY);
};
var transposeUiContainer = function (element, pos) {
    if (element && DOMUtils.DOM.getStyle(element, 'position', true) !== 'static') {
        var containerPos = DOMUtils.DOM.getPos(element);
        var dx = containerPos.x - element.scrollLeft;
        var dy = containerPos.y - element.scrollTop;
        return transpose(pos, -dx, -dy);
    }
    else {
        return transpose(pos, 0, 0);
    }
};
var transposeContentAreaContainer = function (element, pos) {
    var containerPos = DOMUtils.DOM.getPos(element);
    return transpose(pos, containerPos.x, containerPos.y);
};
var getPos = function (editor, e) {
    if (editor.inline) {
        return transposeUiContainer(getUiContainer(editor), fromPageXY(e));
    }
    else {
        var iframePos = transposeContentAreaContainer(editor.getContentAreaContainer(), fromClientXY(e));
        return transposeUiContainer(getUiContainer(editor), iframePos);
    }
};
export default {
    getPos: getPos
};
//# sourceMappingURL=Coords.js.map