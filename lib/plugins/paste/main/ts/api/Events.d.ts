/**
 * Events.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Editor } from 'tinymce/core/api/Editor';
declare const _default: {
    firePastePreProcess: (editor: Editor, html: string, internal: boolean, isWordHtml: boolean) => any;
    firePastePostProcess: (editor: Editor, node: HTMLElement, internal: boolean, isWordHtml: boolean) => any;
    firePastePlainTextToggle: (editor: Editor, state: boolean) => any;
    firePaste: (editor: Editor, ieFake: boolean) => any;
};
export default _default;
