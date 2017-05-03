"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function binarySearchInIntervals(intervals) {
    return function bin(start, end, char) {
        if (start > end)
            return false;
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
 * Basic implementation for the CharClassIndicator, using binary search in an array of ranges.
 */
class BasicCharClassIndicator {
    constructor(_group) {
        this._group = _group;
        let intervals = _group.intervals;
        this._binarySearchInIntervals = binarySearchInIntervals(intervals);
    }
    get description() {
        return this._group.displayName;
    }
    test(char) {
        let intervals = this._group.intervals;
        return this._binarySearchInIntervals(0, intervals.length - 1, char);
    }
    test_str(char) {
        let intervals = this._group.intervals;
        return this.test(char.codePointAt(0));
    }
}
exports.BasicCharClassIndicator = BasicCharClassIndicator;
//# sourceMappingURL=indicators.js.map