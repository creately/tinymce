import { WindowManagerImpl } from 'tinymce/ui/WindowManagerImpl';
import { Serializer } from 'tinymce/core/api/dom/Serializer';
import { Schema } from 'tinymce/core/api/html/Schema';
import { DomParser } from 'tinymce/core/api/html/DomParser';
import { NotificationManagerImpl } from 'tinymce/ui/NotificationManagerImpl';
import { Formatter } from 'tinymce/plugins/textpattern/core/Formatter';
import { DOMUtils } from 'tinymce/core/api/dom/DOMUtils';
import { URI } from 'tinymce/core/api/util/URI';
import { DomQuery } from 'tinymce/core/api/dom/DomQuery';
import { EditorManager } from 'tinymce/core/api/EditorManager';
import { Settings } from 'tinymce/core/api/Settings';
import { Selection } from 'tinymce/core/api/dom/Selection';
import SelectionOverrides from 'tinymce/core/SelectionOverrides';
/**
 * Include the base event class documentation.
 *
 * @include ../../../../../tools/docs/tinymce.Event.js
 */
/**
 * This class contains the core logic for a TinyMCE editor.
 *
 * @class tinymce.Editor
 * @mixes tinymce.util.Observable
 * @example
 * // Add a class to all paragraphs in the editor.
 * tinymce.activeEditor.dom.addClass(tinymce.activeEditor.dom.select('p'), 'someclass');
 *
 * // Gets the current editors selection as text
 * tinymce.activeEditor.selection.getContent({format: 'text'});
 *
 * // Creates a new editor instance
 * var ed = new tinymce.Editor('textareaid', {
 *     some_setting: 1
 * }, tinymce.EditorManager);
 *
 * ed.render();
 */
export interface Editor {
    selection: Selection;
    _selectionOverrides: SelectionOverrides;
    [key: string]: any;
}
/**
 * Include Editor API docs.
 *
 * @include ../../../../../tools/docs/tinymce.Editor.js
 */
/**
 * Constructs a editor instance by id.
 *
 * @constructor
 * @method Editor
 * @param {String} id Unique id for the editor.
 * @param {Object} settings Settings for the editor.
 * @param {tinymce.EditorManager} editorManager EditorManager instance.
 */
export class Editor {
  constructor(id: string, settings: Settings, editorManager: EditorManager);

  $: DomQuery;

  baseURI: URI;

  contentCSS: string[];

  contentStyles: string[];

  documentBaseURI: URI;

  dom: DOMUtils;

  formatter: Formatter;

  id: string;

  initialized: boolean;

  notificationManager: any;

  parser: DomParser;

  schema: Schema;

  selection: Selection;

  serializer: Serializer;

  settings: Settings;

  theme: any;

  undoManager: any;

  windowManager: any;

  addButton(name: string, settings: {}): void;

  addCommand(name: string, callback: (ui: boolean, value: {}) => boolean, scope?: {}): void;

  addContextToolbar(predicate: () => void, items: string): void;

  addMenuItem(name: string, settings: {}): void;

  addQueryStateHandler(name: string, callback: () => boolean, scope?: {}): void;

  addQueryValueHandler(name: string, callback: () => {}, scope?: {}): void;

  addShortcut(pattern: string, desc: string, cmdFunc: string, sc?: {}): boolean;

  addSidebar(name: string, settings: {}): void;

  addVisual(elm?: Element): void;

  convertURL(url: string, name: string, elm: string): string;

  destroy(automatic?: boolean): void;

  execCallback(name: string): {};

  execCommand(cmd: string, ui: boolean, value?: any, args?: {}): void;

  focus(skipFocus: boolean): void;

  getBody(): HTMLBodyElement;

  getContainer(): Element;

  getContent(args?: {}): string;

  getContentAreaContainer(): Element;

  getDoc(): Document;

  getElement(): Element;

  getLang(name: string, defaultVal?: string): void;

  getParam(name: string, defaultVal?: string, type?: string): string;

  getWin(): Window;

  hasEventListeners(name: string): boolean;

  hide(): void;

  init(): void;

  insertContent(content: string, args?: {}): void;

  isDirty(): boolean;

  isHidden(): boolean;

  load(args?: {}): string;

  nodeChanged(args?: {}): void;

  queryCommandState(cmd: string): boolean;

  queryCommandSupported(cmd: string): boolean;

  queryCommandValue(cmd: string): {};

  remove(): void;

  render(): void;

  save(args: {}): string;

  setContent(content: string, args?: {}): string;

  setDirty(state: boolean): void;

  setMode(mode: string): void;

  setProgressState(state: boolean, time: number): boolean;

  show(): void;

  translate(text: string): string;

  uploadImages(callback: () => void): Promise<any>;
}

