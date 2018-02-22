/**
 * Panel.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import DOMUtils from 'tinymce/core/api/dom/DOMUtils';
import Factory from 'tinymce/core/api/ui/Factory';
import Tools from 'tinymce/core/api/util/Tools';
import UiContainer from '../alien/UiContainer';
import Events from '../api/Events';
import Settings from '../api/Settings';
import Layout from '../core/Layout';
import Measure from '../core/Measure';
import Forms from './Forms';
import Toolbar from './Toolbar';
export default function () {
    var panel, currentRect;
    var createToolbars = function (editor, toolbars) {
        return Tools.map(toolbars, function (toolbar) {
            return Toolbar.create(editor, toolbar.id, toolbar.items);
        });
    };
    var hasToolbarItems = function (toolbar) {
        return toolbar.items().length > 0;
    };
    var create = function (editor, toolbars) {
        var items = createToolbars(editor, toolbars).concat([
            Toolbar.create(editor, 'text', Settings.getTextSelectionToolbarItems(editor)),
            Toolbar.create(editor, 'insert', Settings.getInsertToolbarItems(editor)),
            Forms.createQuickLinkForm(editor, hide)
        ]);
        return Factory.create({
            type: 'floatpanel',
            role: 'dialog',
            classes: 'tinymce tinymce-inline arrow',
            ariaLabel: 'Inline toolbar',
            layout: 'flex',
            direction: 'column',
            align: 'stretch',
            autohide: false,
            autofix: true,
            fixed: true,
            border: 1,
            items: Tools.grep(items, hasToolbarItems),
            oncancel: function () {
                editor.focus();
            }
        });
    };
    var showPanel = function (panel) {
        if (panel) {
            panel.show();
        }
    };
    var movePanelTo = function (panel, pos) {
        panel.moveTo(pos.x, pos.y);
    };
    var togglePositionClass = function (panel, relPos) {
        relPos = relPos ? relPos.substr(0, 2) : '';
        Tools.each({
            t: 'down',
            b: 'up',
            c: 'center'
        }, function (cls, pos) {
            panel.classes.toggle('arrow-' + cls, pos === relPos.substr(0, 1));
        });
        if (relPos === 'cr') {
            panel.classes.toggle('arrow-left', true);
            panel.classes.toggle('arrow-right', false);
        }
        else if (relPos === 'cl') {
            panel.classes.toggle('arrow-left', true);
            panel.classes.toggle('arrow-right', true);
        }
        else {
            Tools.each({
                l: 'left',
                r: 'right'
            }, function (cls, pos) {
                panel.classes.toggle('arrow-' + cls, pos === relPos.substr(1, 1));
            });
        }
    };
    var showToolbar = function (panel, id) {
        var toolbars = panel.items().filter('#' + id);
        if (toolbars.length > 0) {
            toolbars[0].show();
            panel.reflow();
            return true;
        }
        return false;
    };
    var repositionPanelAt = function (panel, id, editor, targetRect) {
        var contentAreaRect, panelRect, result, userConstainHandler;
        userConstainHandler = Settings.getPositionHandler(editor);
        contentAreaRect = Measure.getContentAreaRect(editor);
        panelRect = DOMUtils.DOM.getRect(panel.getEl());
        if (id === 'insert') {
            result = Layout.calcInsert(targetRect, contentAreaRect, panelRect);
        }
        else {
            result = Layout.calc(targetRect, contentAreaRect, panelRect);
        }
        if (result) {
            var delta = UiContainer.getUiContainerDelta().getOr({ x: 0, y: 0 });
            var transposedPanelRect = { x: result.rect.x - delta.x, y: result.rect.y - delta.y, w: result.rect.w, h: result.rect.h };
            currentRect = targetRect;
            movePanelTo(panel, Layout.userConstrain(userConstainHandler, targetRect, contentAreaRect, transposedPanelRect));
            togglePositionClass(panel, result.position);
            return true;
        }
        else {
            return false;
        }
    };
    var showPanelAt = function (panel, id, editor, targetRect) {
        showPanel(panel);
        panel.items().hide();
        if (!showToolbar(panel, id)) {
            hide();
            return;
        }
        if (repositionPanelAt(panel, id, editor, targetRect) === false) {
            hide();
        }
    };
    var hasFormVisible = function () {
        return panel.items().filter('form:visible').length > 0;
    };
    var showForm = function (editor, id) {
        if (panel) {
            panel.items().hide();
            if (!showToolbar(panel, id)) {
                hide();
                return;
            }
            var contentAreaRect = void 0, panelRect = void 0, result = void 0, userConstainHandler = void 0;
            showPanel(panel);
            panel.items().hide();
            showToolbar(panel, id);
            userConstainHandler = Settings.getPositionHandler(editor);
            contentAreaRect = Measure.getContentAreaRect(editor);
            panelRect = DOMUtils.DOM.getRect(panel.getEl());
            result = Layout.calc(currentRect, contentAreaRect, panelRect);
            if (result) {
                panelRect = result.rect;
                movePanelTo(panel, Layout.userConstrain(userConstainHandler, currentRect, contentAreaRect, panelRect));
                togglePositionClass(panel, result.position);
            }
        }
    };
    var show = function (editor, id, targetRect, toolbars) {
        if (!panel) {
            Events.fireBeforeRenderUI(editor);
            panel = create(editor, toolbars);
            panel.renderTo().reflow().moveTo(targetRect.x, targetRect.y);
            editor.nodeChanged();
        }
        showPanelAt(panel, id, editor, targetRect);
    };
    var reposition = function (editor, id, targetRect) {
        if (panel) {
            repositionPanelAt(panel, id, editor, targetRect);
        }
    };
    var hide = function () {
        if (panel) {
            panel.hide();
        }
    };
    var focus = function () {
        if (panel) {
            panel.find('toolbar:visible').eq(0).each(function (item) {
                item.focus(true);
            });
        }
    };
    var remove = function () {
        if (panel) {
            panel.remove();
            panel = null;
        }
    };
    var inForm = function () {
        return panel && panel.visible() && hasFormVisible();
    };
    return {
        show: show,
        showForm: showForm,
        reposition: reposition,
        inForm: inForm,
        hide: hide,
        focus: focus,
        remove: remove
    };
}
//# sourceMappingURL=Panel.js.map