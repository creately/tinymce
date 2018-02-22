/**
 * SplitButton.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import DomQuery from 'tinymce/core/api/dom/DomQuery';
import DomUtils from './DomUtils';
import MenuButton from './MenuButton';
/**
 * Creates a split button.
 *
 * @-x-less SplitButton.less
 * @class tinymce.ui.SplitButton
 * @extends tinymce.ui.Button
 */
export default MenuButton.extend({
    Defaults: {
        classes: 'widget btn splitbtn',
        role: 'button'
    },
    /**
     * Repaints the control after a layout operation.
     *
     * @method repaint
     */
    repaint: function () {
        var self = this;
        var elm = self.getEl();
        var rect = self.layoutRect();
        var mainButtonElm, menuButtonElm;
        self._super();
        mainButtonElm = elm.firstChild;
        menuButtonElm = elm.lastChild;
        DomQuery(mainButtonElm).css({
            width: rect.w - DomUtils.getSize(menuButtonElm).width,
            height: rect.h - 2
        });
        DomQuery(menuButtonElm).css({
            height: rect.h - 2
        });
        return self;
    },
    /**
     * Sets the active menu state.
     *
     * @private
     */
    activeMenu: function (state) {
        var self = this;
        DomQuery(self.getEl().lastChild).toggleClass(self.classPrefix + 'active', state);
    },
    /**
     * Renders the control as a HTML string.
     *
     * @method renderHtml
     * @return {String} HTML representing the control.
     */
    renderHtml: function () {
        var self = this;
        var id = self._id;
        var prefix = self.classPrefix;
        var image;
        var icon = self.state.get('icon');
        var text = self.state.get('text');
        var settings = self.settings;
        var textHtml = '', ariaPressed;
        image = settings.image;
        if (image) {
            icon = 'none';
            // Support for [high dpi, low dpi] image sources
            if (typeof image !== 'string') {
                image = window.getSelection ? image[0] : image[1];
            }
            image = ' style="background-image: url(\'' + image + '\')"';
        }
        else {
            image = '';
        }
        icon = settings.icon ? prefix + 'ico ' + prefix + 'i-' + icon : '';
        if (text) {
            self.classes.add('btn-has-text');
            textHtml = '<span class="' + prefix + 'txt">' + self.encode(text) + '</span>';
        }
        ariaPressed = typeof settings.active === 'boolean' ? ' aria-pressed="' + settings.active + '"' : '';
        return ('<div id="' + id + '" class="' + self.classes + '" role="button"' + ariaPressed + ' tabindex="-1">' +
            '<button type="button" hidefocus="1" tabindex="-1">' +
            (icon ? '<i class="' + icon + '"' + image + '></i>' : '') +
            textHtml +
            '</button>' +
            '<button type="button" class="' + prefix + 'open" hidefocus="1" tabindex="-1">' +
            // (icon ? '<i class="' + icon + '"></i>' : '') +
            (self._menuBtnText ? (icon ? '\u00a0' : '') + self._menuBtnText : '') +
            ' <i class="' + prefix + 'caret"></i>' +
            '</button>' +
            '</div>');
    },
    /**
     * Called after the control has been rendered.
     *
     * @method postRender
     */
    postRender: function () {
        var self = this, onClickHandler = self.settings.onclick;
        self.on('click', function (e) {
            var node = e.target;
            if (e.control === this) {
                // Find clicks that is on the main button
                while (node) {
                    if ((e.aria && e.aria.key !== 'down') || (node.nodeName === 'BUTTON' && node.className.indexOf('open') === -1)) {
                        e.stopImmediatePropagation();
                        if (onClickHandler) {
                            onClickHandler.call(this, e);
                        }
                        return;
                    }
                    node = node.parentNode;
                }
            }
        });
        delete self.settings.onclick;
        return self._super();
    }
});
//# sourceMappingURL=SplitButton.js.map