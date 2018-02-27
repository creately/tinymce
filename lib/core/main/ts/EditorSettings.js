/**
 * DefaultSettings.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Arr, Fun, Obj, Option, Strings, Struct, Type } from '@ephox/katamari';
import { PlatformDetection } from '@ephox/sand';
import Tools from './api/util/Tools';
var sectionResult = Struct.immutable('sections', 'settings');
var detection = PlatformDetection.detect();
var isTouch = detection.deviceType.isTouch();
var mobilePlugins = ['lists', 'autolink', 'autosave'];
var defaultMobileSettings = { theme: 'mobile' };
var normalizePlugins = function (plugins) {
    var pluginNames = Type.isArray(plugins) ? plugins.join(' ') : plugins;
    var trimmedPlugins = Arr.map(Type.isString(pluginNames) ? pluginNames.split(' ') : [], Strings.trim);
    return Arr.filter(trimmedPlugins, function (item) {
        return item.length > 0;
    });
};
var filterMobilePlugins = function (plugins) {
    return Arr.filter(plugins, Fun.curry(Arr.contains, mobilePlugins));
};
var extractSections = function (keys, settings) {
    var result = Obj.bifilter(settings, function (value, key) {
        return Arr.contains(keys, key);
    });
    return sectionResult(result.t, result.f);
};
var getSection = function (sectionResult, name, defaults) {
    var sections = sectionResult.sections();
    var sectionSettings = sections.hasOwnProperty(name) ? sections[name] : {};
    return Tools.extend({}, defaults, sectionSettings);
};
var hasSection = function (sectionResult, name) {
    return sectionResult.sections().hasOwnProperty(name);
};
var getDefaultSettings = function (id, documentBaseUrl, editor) {
    return {
        id: id,
        theme: 'modern',
        delta_width: 0,
        delta_height: 0,
        popup_css: '',
        plugins: '',
        document_base_url: documentBaseUrl,
        add_form_submit_trigger: true,
        submit_patch: true,
        add_unload_trigger: true,
        convert_urls: true,
        relative_urls: true,
        remove_script_host: true,
        object_resizing: true,
        doctype: '<!DOCTYPE html>',
        visual: true,
        font_size_style_values: 'xx-small,x-small,small,medium,large,x-large,xx-large',
        // See: http://www.w3.org/TR/CSS2/fonts.html#propdef-font-size
        font_size_legacy_values: 'xx-small,small,medium,large,x-large,xx-large,300%',
        forced_root_block: 'p',
        hidden_input: true,
        padd_empty_editor: true,
        render_ui: true,
        indentation: '30px',
        inline_styles: true,
        convert_fonts_to_spans: true,
        indent: 'simple',
        indent_before: 'p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,th,ul,ol,li,dl,dt,dd,area,table,thead,' +
            'tfoot,tbody,tr,section,article,hgroup,aside,figure,figcaption,option,optgroup,datalist',
        indent_after: 'p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,th,ul,ol,li,dl,dt,dd,area,table,thead,' +
            'tfoot,tbody,tr,section,article,hgroup,aside,figure,figcaption,option,optgroup,datalist',
        entity_encoding: 'named',
        url_converter: editor.convertURL,
        url_converter_scope: editor,
        ie7_compat: true
    };
};
var getExternalPlugins = function (overrideSettings, settings) {
    var userDefinedExternalPlugins = settings.external_plugins ? settings.external_plugins : {};
    if (overrideSettings && overrideSettings.external_plugins) {
        return Tools.extend({}, overrideSettings.external_plugins, userDefinedExternalPlugins);
    }
    else {
        return userDefinedExternalPlugins;
    }
};
var combinePlugins = function (forcedPlugins, plugins) {
    return [].concat(normalizePlugins(forcedPlugins)).concat(normalizePlugins(plugins));
};
var processPlugins = function (isTouchDevice, sectionResult, defaultOverrideSettings, settings) {
    var forcedPlugins = normalizePlugins(defaultOverrideSettings.forced_plugins);
    var plugins = normalizePlugins(settings.plugins);
    var platformPlugins = isTouchDevice && hasSection(sectionResult, 'mobile') ? filterMobilePlugins(plugins) : plugins;
    var combinedPlugins = combinePlugins(forcedPlugins, platformPlugins);
    return Tools.extend(settings, {
        plugins: combinedPlugins.join(' ')
    });
};
var isOnMobile = function (isTouchDevice, sectionResult) {
    var isInline = sectionResult.settings().inline; // We don't support mobile inline yet
    return isTouchDevice && hasSection(sectionResult, 'mobile') && !isInline;
};
var combineSettings = function (isTouchDevice, defaultSettings, defaultOverrideSettings, settings) {
    var sectionResult = extractSections(['mobile'], settings);
    var extendedSettings = Tools.extend(
    // Default settings
    defaultSettings, 
    // tinymce.overrideDefaults settings
    defaultOverrideSettings, 
    // User settings
    sectionResult.settings(), 
    // Sections
    isOnMobile(isTouchDevice, sectionResult) ? getSection(sectionResult, 'mobile', defaultMobileSettings) : {}, 
    // Forced settings
    {
        validate: true,
        content_editable: sectionResult.settings().inline,
        external_plugins: getExternalPlugins(defaultOverrideSettings, sectionResult.settings())
    });
    return processPlugins(isTouchDevice, sectionResult, defaultOverrideSettings, extendedSettings);
};
var getEditorSettings = function (editor, id, documentBaseUrl, defaultOverrideSettings, settings) {
    var defaultSettings = getDefaultSettings(id, documentBaseUrl, editor);
    return combineSettings(isTouch, defaultSettings, defaultOverrideSettings, settings);
};
var get = function (editor, name) {
    return Option.from(editor.settings[name]);
};
var getFiltered = function (predicate, editor, name) { return Option.from(editor.settings[name]).filter(predicate); };
var getString = Fun.curry(getFiltered, Type.isString);
var getParamObject = function (value) {
    var output = {};
    if (typeof value === 'string') {
        Arr.each(value.indexOf('=') > 0 ? value.split(/[;,](?![^=;,]*(?:[;,]|$))/) : value.split(','), function (value) {
            value = value.split('=');
            if (value.length > 1) {
                output[Tools.trim(value[0])] = Tools.trim(value[1]);
            }
            else {
                output[Tools.trim(value[0])] = Tools.trim(value);
            }
        });
    }
    else {
        output = value;
    }
    return output;
};
var getParam = function (editor, name, defaultVal, type) {
    var value = name in editor.settings ? editor.settings[name] : defaultVal;
    if (type === 'hash') {
        return getParamObject(value);
    }
    else if (type === 'string') {
        return getFiltered(Type.isString, editor, name).getOr(defaultVal);
    }
    else if (type === 'number') {
        return getFiltered(Type.isNumber, editor, name).getOr(defaultVal);
    }
    else if (type === 'boolean') {
        return getFiltered(Type.isBoolean, editor, name).getOr(defaultVal);
    }
    else if (type === 'object') {
        return getFiltered(Type.isObject, editor, name).getOr(defaultVal);
    }
    else if (type === 'array') {
        return getFiltered(Type.isArray, editor, name).getOr(defaultVal);
    }
    else if (type === 'function') {
        return getFiltered(Type.isFunction, editor, name).getOr(defaultVal);
    }
    else {
        return value;
    }
};
export { getEditorSettings, get, getString, getParam, combineSettings };
//# sourceMappingURL=EditorSettings.js.map