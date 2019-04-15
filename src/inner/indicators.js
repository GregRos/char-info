"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function binarySearchInIntervals(intervals) {
    return function bin(start, end, char) {
        if (start > end)
            return false;
        var mid = (start + end) >> 1;
        var midInterval = intervals[mid];
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
 * Basic implementation for the CharClassIndicator, using binary search in an
 * array of ranges.
 */
var BasicCharClassIndicator = (function () {
    function BasicCharClassIndicator(_group) {
        this._group = _group;
        var intervals = _group.intervals;
        this._binarySearchInIntervals = binarySearchInIntervals(intervals);
    }
    Object.defineProperty(BasicCharClassIndicator.prototype, "description", {
        get: function () {
            return this._group.displayName;
        },
        enumerable: true,
        configurable: true
    });
    BasicCharClassIndicator.prototype.test = function (char) {
        var intervals = this._group.intervals;
        return this._binarySearchInIntervals(0, intervals.length - 1, char);
    };
    BasicCharClassIndicator.prototype.test_str = function (char) {
        var intervals = this._group.intervals;
        return this.test(char.codePointAt(0));
    };
    return BasicCharClassIndicator;
}());
exports.BasicCharClassIndicator = BasicCharClassIndicator;
//# sourceMappingURL=indicators.js.map