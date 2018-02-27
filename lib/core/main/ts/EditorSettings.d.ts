/**
 * DefaultSettings.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Option } from '@ephox/katamari';
declare const combineSettings: (isTouchDevice: any, defaultSettings: any, defaultOverrideSettings: any, settings: any) => any;
declare const getEditorSettings: (editor: any, id: any, documentBaseUrl: any, defaultOverrideSettings: any, settings: any) => any;
declare const get: (editor: any, name: any) => Option<any>;
declare const getString: any;
declare const getParam: (editor: any, name: string, defaultVal?: any, type?: string) => any;
export { getEditorSettings, get, getString, getParam, combineSettings };
