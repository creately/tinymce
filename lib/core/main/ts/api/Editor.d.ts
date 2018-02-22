import { Selection } from 'tinymce/core/api/dom/Selection';
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
export declare const Editor: (id: any, settings: any, editorManager: any) => void;
