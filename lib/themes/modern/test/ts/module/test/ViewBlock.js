import DOMUtils from 'tinymce/core/api/dom/DOMUtils';
export default function () {
    var domElm = DOMUtils.DOM.create('div', {
        style: 'position: absolute; right: 10px; top: 10px;'
    });
    var attach = function (preventDuplicates) {
        if (preventDuplicates && domElm.parentNode === document.body) {
            detach();
        }
        document.body.appendChild(domElm);
    };
    var detach = function () {
        DOMUtils.DOM.remove(domElm);
    };
    var update = function (html) {
        DOMUtils.DOM.setHTML(domElm, html);
    };
    var get = function () {
        return domElm;
    };
    return {
        attach: attach,
        update: update,
        detach: detach,
        get: get
    };
}
//# sourceMappingURL=ViewBlock.js.map