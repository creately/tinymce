/**
 * This class enables you to send XMLHTTPRequests cross browser.
 * @class tinymce.util.XHR
 * @mixes tinymce.util.Observable
 * @static
 * @example
 * // Sends a low level Ajax request
 * tinymce.util.XHR.send({
 *    url: 'someurl',
 *    success: function(text) {
 *       console.debug(text);
 *    }
 * });
 *
 * // Add custom header to XHR request
 * tinymce.util.XHR.on('beforeSend', function(e) {
 *     e.xhr.setRequestHeader('X-Requested-With', 'Something');
 * });
 */
declare const XHR: any;
export default XHR;
