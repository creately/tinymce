/**
 * UiContainer.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2018 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import DOMUtils from 'src/core/main/ts/api/dom/DOMUtils';
import { Editor } from 'src/core/main/ts/api/Editor';

const getUiContainer = (editor: Editor): HTMLElement => {
  return DOMUtils.DOM.select(editor.settings.ui_container)[0];
};

export {
  getUiContainer
};
