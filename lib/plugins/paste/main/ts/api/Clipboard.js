import { registerEventsAndFilters, pasteHtml, pasteText, pasteImageData, getDataTransferItems, hasContentType, hasHtmlOrText } from '../core/Clipboard';
import { PasteBin } from '../core/PasteBin';
export var Clipboard = function (editor, pasteFormat) {
    var pasteBin = PasteBin(editor);
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