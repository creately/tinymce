import CaretPosition from './CaretPosition';
declare const create: (root: Node, caretPosition: CaretPosition) => string;
declare const resolve: (root: Node, path: string) => CaretPosition;
export { create, resolve };
