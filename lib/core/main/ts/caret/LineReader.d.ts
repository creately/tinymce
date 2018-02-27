/**
 * LineReader.ts
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2018 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import { CaretPosition } from './CaretPosition';
import { Option } from '@ephox/katamari';
export declare enum BreakType {
    Br = 0,
    Block = 1,
    Wrap = 2,
    Eol = 3,
}
export interface LineInfo {
    positions: CaretPosition[];
    breakType: BreakType;
    breakAt: Option<CaretPosition>;
}
declare const findClosestHorizontalPositionFromPoint: (positions: CaretPosition[], x: number) => Option<CaretPosition>;
declare const findClosestHorizontalPosition: (positions: CaretPosition[], pos: CaretPosition) => Option<CaretPosition>;
declare const getPositionsUntilPreviousLine: (scope: HTMLElement, start: CaretPosition) => LineInfo;
declare const getPositionsUntilNextLine: (scope: HTMLElement, start: CaretPosition) => LineInfo;
declare const isAtFirstLine: (scope: HTMLElement, pos: CaretPosition) => boolean;
declare const isAtLastLine: (scope: HTMLElement, pos: CaretPosition) => boolean;
declare const getPositionsAbove: (scope: HTMLElement, start: CaretPosition) => CaretPosition[];
declare const getPositionsBelow: (scope: HTMLElement, start: CaretPosition) => CaretPosition[];
declare const getFirstLinePositions: (scope: HTMLElement) => CaretPosition[];
declare const getLastLinePositions: (scope: HTMLElement) => CaretPosition[];
declare const getClosestPositionAbove: (scope: HTMLElement, pos: CaretPosition) => Option<CaretPosition>;
declare const getClosestPositionBelow: (scope: HTMLElement, pos: CaretPosition) => Option<CaretPosition>;
export { getPositionsUntilPreviousLine, getPositionsUntilNextLine, isAtFirstLine, isAtLastLine, getPositionsAbove, getPositionsBelow, findClosestHorizontalPosition, findClosestHorizontalPositionFromPoint, getFirstLinePositions, getLastLinePositions, getClosestPositionAbove, getClosestPositionBelow };
