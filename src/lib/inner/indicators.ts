/**
 * @module char-info/inner
 */  /** */
import {UnicodeCharGroup} from "./unicode-lookup";
import {Interval} from "node-interval-tree";

function binarySearchInIntervals(intervals: Interval[]) {
    return function bin(start: number, end: number, char: number) {
        if (start > end) return false;
        let mid = (start + end) >> 1;
        let midInterval = intervals[mid];
        if (midInterval.low > char) {
            return bin(start, mid - 1, char);
        }
        if (midInterval.high < char) {
            return bin(mid + 1, end, char);
        }
        return true;
    };
}

/**
 * An object that can determine if a given codepoint or character is part of
 * some single Unicode group.
 */
export interface CharClassIndicator {
    /**
     * Checks if the codepoint is part of the Unicode group.
     * @param char The codepoint.
     */
    code(char: number): boolean;

    char(str: string): boolean;
}

/**
 * Basic implementation for the CharClassIndicator, using binary search in an
 * array of ranges.
 */
export class BasicCharClassIndicator implements CharClassIndicator {
    _binarySearchInIntervals: (
        start: number, end: number, char: number) => boolean;

    constructor(private _group: UnicodeCharGroup) {
        let intervals = _group.intervals;
        this._binarySearchInIntervals = binarySearchInIntervals(intervals);
    }

    code(char: number) {
        let intervals = this._group.intervals;
        return this._binarySearchInIntervals(0, intervals.length - 1, char);
    }

    char(char: string) {
        let intervals = this._group.intervals;
        return this.code(char.codePointAt(0));
    }
}
