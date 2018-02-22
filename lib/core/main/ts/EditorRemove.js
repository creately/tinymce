import DOMUtils from 'tinymce/core/api/dom/DOMUtils';
import { Option } from '@ephox/katamari';
import Events from 'tinymce/core/api/Events';
var DOM = DOMUtils.DOM;
var restoreOriginalStyles = function (editor) {
    if (editor.orgDisplay) {
        DOM.setStyle(editor.id, 'display', editor.orgDisplay);
    }
};
var safeDestroy = function (x) { return Option.from(x).each(function (x) { return x.destroy(); }); };
var clearDomReferences = function (editor) {
    editor.contentAreaContainer = editor.formElement = editor.container = editor.editorContainer = null;
    editor.bodyElement = editor.contentDocument = editor.contentWindow = null;
    editor.iframeElement = editor.targetElm = null;
    if (editor.selection) {
        editor.selection = editor.selection.win = editor.selection.dom = editor.selection.dom.doc = null;
    }
};
var restoreForm = function (editor) {
    var form = editor.formElement;
    if (form) {
        if (form._mceOldSubmit) {
            form.submit = form._mceOldSubmit;
            form._mceOldSubmit = null;
        }
        DOM.unbind(form, 'submit reset', editor.formEventDelegate);
    }
};
var remove = function (editor) {
    if (!editor.removed) {
        var _selectionOverrides = editor._selectionOverrides, editorUpload = editor.editorUpload;
        var body = editor.getBody();
        var element = editor.getElement();
        if (body) {
            editor.save();
        }
        editor.removed = 1;
        editor.unbindAllNativeEvents();
        // Remove any hidden input
        if (editor.hasHiddenInput && element) {
            DOM.remove(element.nextSibling);
        }
        if (!editor.inline && body) {
            restoreOriginalStyles(editor);
        }
        Events.fireRemove(editor);
        editor.editorManager.remove(editor);
        DOM.remove(editor.getContainer());
        safeDestroy(_selectionOverrides);
        safeDestroy(editorUpload);
        editor.destroy();
    }
};
var destroy = function (editor, automatic) {
    var selection = editor.selection, dom = editor.dom;
    if (editor.destroyed) {
        return;
    }
    // If user manually calls destroy and not remove
    // Users seems to have logic that calls destroy instead of remove
    if (!automatic && !editor.removed) {
        editor.remove();
        return;
    }
    if (!automatic) {
        editor.editorManager.off('beforeunload', editor._beforeUnload);
        // Manual destroy
        if (editor.theme && editor.theme.destroy) {
            editor.theme.destroy();
        }
        safeDestroy(selection);
        safeDestroy(dom);
    }
    restoreForm(editor);
    clearDomReferences(editor);
    editor.destroyed = 1;
};
export { remove, destroy };
//# sourceMappingURL=EditorRemove.js.map