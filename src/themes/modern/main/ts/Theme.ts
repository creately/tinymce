/**
 * Theme.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import ThemeManager from 'tinymce/src/core/main/ts/api/ThemeManager';
import ThemeApi from './api/ThemeApi';
import Api from 'tinymce/src/ui/main/ts/Api';
import FormatControls from 'tinymce/src/ui/main/ts/FormatControls';

declare let window: any;

const init = function () {

  Api.registerToFactory();
  Api.appendTo(window.tinymce ? window.tinymce : {});

  ThemeManager.add('modern', function (editor) {
    FormatControls.setup(editor);
    return ThemeApi.get(editor);
  });

}

export default {}
