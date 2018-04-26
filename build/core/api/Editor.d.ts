import { Selection } from 'tinymce/core/api/dom/Selection';
import SelectionOverrides from 'tinymce/core/SelectionOverrides';
import DOMUtils from 'tinymce/core/api/dom/DOMUtils';
import Schema from 'tinymce/core/api/html/Schema';
import { UndoManager } from 'tinymce/core/api/UndoManager';
import * as EditorContent from 'tinymce/core/EditorContent';
import { ParamTypeMap } from 'tinymce/core/EditorSettings';

export type AnyFunction = (...x: any[]) => any;

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
  constructor(id: string, settings: any, editorManager: any);

  $: any;
  baseURI: any;
  bodyElement: HTMLElement;
  bookmark: any;
  buttons: any;
  composing: boolean;
  container: HTMLElement;
  contentAreaContainer: any;
  contentCSS: any;
  contentDocument: Document;
  contentStyles: any;
  contentWindow: Window;
  contextToolbars: any;
  delegates: any;
  destroyed: boolean;
  documentBaseURI: any;
  documentBaseUrl: string;
  dom: DOMUtils;
  editorCommands: any;
  editorContainer: any;
  editorManager: any;
  editorUpload: any;
  eventRoot?: HTMLElement;
  formatter: any;
  formElement: HTMLElement;
  formEventDelegate: any;
  hasHiddenInput: boolean;
  hasVisual: boolean;
  hidden: boolean;
  id: string;
  iframeElement: any;
  iframeHTML: string;
  initialized: boolean;
  inline: boolean;
  isNotDirty: boolean;
  loadedCSS: any;
  menuItems: any;
  notificationManager: any;
  orgDisplay: string;
  orgVisibility: string;
  parser: any;
  plugins: any;
  quirks: any;
  readonly: boolean;
  removed: boolean;
  rtl: boolean;
  schema: Schema;
  selection: Selection;
  serializer: any;
  settings: Record<string, any>;
  shortcuts: any;
  startContent: string;
  suffix: string;
  targetElm: HTMLElement;
  theme: any;
  undoManager: UndoManager;
  validate: boolean;
  windowManager: any;
  _beforeUnload: AnyFunction;
  _eventDispatcher: any;
  _mceOldSubmit: any;
  _nodeChangeDispatcher: any;
  _pendingNativeEvents: any;
  _selectionOverrides: SelectionOverrides;
  _skinLoaded: boolean;

  addButton(name: string, settings): void;
  addCommand(name: string, callback, scope?: object): void;
  addContextToolbar(predicate, items): void;
  addMenuItem(name: string, settings): void;
  addQueryStateHandler(name: string, callback, scope?: object): void;
  addQueryValueHandler(name: string, callback, scope?: object): void;
  addShortcut(pattern: string, desc: string, cmdFunc, scope?: object): void;
  addSidebar(name: string, settings): void;
  addVisual(elm?): void;
  bindPendingEventDelegates(): void;
  convertURL(url: string, name: string, elm?): string;
  destroy(automatic?: boolean): void;
  execCallback(name: string, ...x: any[]): any;
  execCommand(cmd: string, ui?: boolean, value?: any, args?): any;
  fire(name: string, args?, bubble?: boolean): any;
  focus(skipFocus?: boolean): any;
  getBody(): HTMLElement;
  getContainer(): HTMLElement;
  getContent(args?: EditorContent.GetContentArgs): EditorContent.Content;
  getContentAreaContainer(): HTMLElement;
  getDoc(): Document;
  getElement(): HTMLElement;
  getLang(name: string, defaultVal): any;
  getParam<K extends keyof ParamTypeMap>(name: string, defaultVal: ParamTypeMap[K], type: K): ParamTypeMap[K];
  getParam<T>(name: string, defaultVal: T, type: string): T;
  getParam(name: string, defaultVal?: any, type?: string): any;
  getWin(): Window;
  hasEventListeners(name: string): boolean;
  hide(): void;
  insertContent(content, args?): void;
  isDirty(): boolean;
  isHidden(): boolean;
  load(args?): string;
  nodeChanged(args?): void;
  off(name: string, callback?): any;
  on(name: string, callback, prepend?): any;
  once(name: string, callback): any;
  queryCommandState(cmd: string): boolean;
  queryCommandSupported(cmd: string): boolean;
  queryCommandValue(cmd: string): any;
  remove(): void;
  render(): void;
  save(args?): void;
  setContent(content: EditorContent.Content, args?: EditorContent.SetContentArgs): void;
  setDirty(state: boolean): void;
  setMode(mode: string): void;
  setProgressState(state: boolean, time?: number): void;
  show(): void;
  toggleNativeEvent(name: string, state): void;
  translate(text: string): string;
  unbindAllNativeEvents(): void;
  uploadImages(callback): void;
  _scanForImages(): void;
}
