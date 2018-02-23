/**
 * Keyboard.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import DOMUtils from 'src/core/main/ts/api/dom/DOMUtils';
import EditorManager from 'src/core/main/ts/api/EditorManager';
import Env from 'src/core/main/ts/api/Env';
import Delay from 'src/core/main/ts/api/util/Delay';
import Tools from 'src/core/main/ts/api/util/Tools';
import VK from 'src/core/main/ts/api/util/VK';
import Settings from '../api/Settings';

const DOM = DOMUtils.DOM;

const tabCancel = function (e) {
  if (e.keyCode === VK.TAB && !e.ctrlKey && !e.altKey && !e.metaKey) {
    e.preventDefault();
  }
};

const setup = function (editor) {
  function tabHandler(e) {
    let x, el, v, i;

    if (e.keyCode !== VK.TAB || e.ctrlKey || e.altKey || e.metaKey || e.isDefaultPrevented()) {
      return;
    }

    function find(direction) {
      el = DOM.select(':input:enabled,*[tabindex]:not(iframe)');

      function canSelectRecursive(e) {
        return e.nodeName === 'BODY' || (e.type !== 'hidden' &&
          e.style.display !== 'none' &&
          e.style.visibility !== 'hidden' && canSelectRecursive(e.parentNode));
      }

      function canSelect(el) {
        return /INPUT|TEXTAREA|BUTTON/.test(el.tagName) && EditorManager.get(e.id) && el.tabIndex !== -1 && canSelectRecursive(el);
      }

      Tools.each(el, function (e, i) {
        if (e.id === editor.id) {
          x = i;
          return false;
        }
      });
      if (direction > 0) {
        for (i = x + 1; i < el.length; i++) {
          if (canSelect(el[i])) {
            return el[i];
          }
        }
      } else {
        for (i = x - 1; i >= 0; i--) {
          if (canSelect(el[i])) {
            return el[i];
          }
        }
      }

      return null;
    }

    v = Tools.explode(Settings.getTabFocus(editor));

    if (v.length === 1) {
      v[1] = v[0];
      v[0] = ':prev';
    }

    // Find element to focus
    if (e.shiftKey) {
      if (v[0] === ':prev') {
        el = find(-1);
      } else {
        el = DOM.get(v[0]);
      }
    } else {
      if (v[1] === ':next') {
        el = find(1);
      } else {
        el = DOM.get(v[1]);
      }
    }

    if (el) {
      const focusEditor = EditorManager.get(el.id || el.name);

      if (el.id && focusEditor) {
        focusEditor.focus();
      } else {
        Delay.setTimeout(function () {
          if (!Env.webkit) {
            window.focus();
          }

          el.focus();
        }, 10);
      }

      e.preventDefault();
    }
  }

  editor.on('init', function () {
    if (editor.inline) {
      // Remove default tabIndex in inline mode
      DOM.setAttrib(editor.getBody(), 'tabIndex', null);
    }

    editor.on('keyup', tabCancel);

    if (Env.gecko) {
      editor.on('keypress keydown', tabHandler);
    } else {
      editor.on('keydown', tabHandler);
    }
  });
};

export default {
  setup
};