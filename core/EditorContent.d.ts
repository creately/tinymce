/**
 * EditorContent.ts
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2018 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { Editor } from 'tinymce/core/api/Editor';
import Node from 'tinymce/core/api/html/Node';
export declare type Content = string | Node;
export interface SetContentArgs {
    format?: string;
    set?: boolean;
    content?: string;
    no_events?: boolean;
}
export interface GetContentArgs {
    format?: string;
    get?: boolean;
    content?: string;
    getInner?: boolean;
    no_events?: boolean;
}
declare const setContent: (editor: Editor, content: Content, args?: SetContentArgs) => Content;
declare const getContent: (editor: Editor, args?: GetContentArgs) => Content;
export { setContent, getContent };
