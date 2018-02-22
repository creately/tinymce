import { registerEventsAndFilters, pasteHtml, pasteText, pasteImageData, getDataTransferItems, hasContentType, hasHtmlOrText } from '../core/Clipboard';
import { PasteBin } from '../core/PasteBin';
import Settings from './Settings';
export var Clipboard = function (editor) {
    var pasteBin = PasteBin(editor);
    var pasteFormat = Settings.isPasteAsTextEnabled(editor) ? 'text' : 'html';
    editor.on('preInit', function () { return registerEventsAndFilters(editor, pasteBin, pasteFormat); });
    return {
        pasteFormat: pasteFormat,
        pasteHtml: function (html, internalFlag) { return pasteHtml(editor, html, internalFlag); },
        pasteText: function (text) { return pasteText(editor, text); },
        pasteImageData: function (e, rng) { return pasteImageData(editor, e, rng); },
        getDataTransferItems: getDataTransferItems,
        hasHtmlOrText: hasHtmlOrText,
        hasContentType: hasContentType
    };
};
//# sourceMappingURL=Clipboard.js.map