import { Option } from '@ephox/katamari';
import { CaretPosition } from 'tinymce/core/caret/CaretPosition';
declare const getClosestCellAbove: (table: HTMLElement, x: number, y: number) => Option<HTMLElement>;
declare const getClosestCellBelow: (table: HTMLElement, x: number, y: number) => Option<HTMLElement>;
declare const findClosestPositionInAboveCell: (table: HTMLElement, pos: CaretPosition) => Option<CaretPosition>;
declare const findClosestPositionInBelowCell: (table: HTMLElement, pos: CaretPosition) => Option<CaretPosition>;
export { getClosestCellAbove, getClosestCellBelow, findClosestPositionInAboveCell, findClosestPositionInBelowCell };
