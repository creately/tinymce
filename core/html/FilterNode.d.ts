/**
 * FilterNode.ts
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2018 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import Node from '../api/html/Node';
import { ParserFilter } from '../api/html/DomParser';
declare const filter: (nodeFilters: ParserFilter[], attributeFilters: ParserFilter[], node: Node) => void;
export { filter };
