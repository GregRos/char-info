"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module char-info/inner
 * @external
 */ /** */
var node_interval_tree_1 = require("node-interval-tree");
var index_1 = require("./data/index");
function homogenizeRawStr(str) {
    return str.toLowerCase().replace(/_/g, "");
}
var rangeRegex = /(\\\w[0-9a-fA-F]+|[\s\S])(?:-(\\\w[0-9a-fA-F]+|[\s\S]))?/g;
function getCharCode(str) {
    if (str.length === 1) {
        return str.charCodeAt(0);
    }
    var hex = str.slice(2);
    return Number.parseInt(hex, 16);
}
function expandIntoRanges(compressedForm) {
    var matches = [];
    var x = null;
    while (x = rangeRegex.exec(compressedForm)) {
        matches.push([x[1], x[2] || x[1]]);
    }
    var ranges = [];
    for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
        var match = matches_1[_i];
        var start = getCharCode(match[0]);
        var end = getCharCode(match[1]);
        ranges.push({
            low: start,
            high: end
        });
    }
    ranges.sort(function (a, b) { return a.low - b.low; });
    return ranges;
}
function expandRawRecord(raw) {
    var name;
    var alias;
    var fst = raw[0];
    if (fst.constructor === Array) {
        name = fst[0];
        alias = fst[1];
    }
    else {
        name = fst;
    }
    return {
        name: name,
        alias: alias,
        intervals: expandIntoRanges(raw[1]),
        get displayName() {
            return this.alias || this.name;
        }
    };
}
function buildLookup() {
    var lookup = {
        allBlocks: new node_interval_tree_1.default(),
        allCategories: new node_interval_tree_1.default(),
        allScripts: new node_interval_tree_1.default(),
        blocks: new Map(),
        categories: new Map(),
        scripts: new Map(),
        longCategoryToCode: new Map()
    };
    for (var _i = 0, _a = index_1.rawData.blocks; _i < _a.length; _i++) {
        var rawBlock = _a[_i];
        var block = expandRawRecord(rawBlock);
        lookup.blocks.set(homogenizeRawStr(block.name), block);
        for (var _b = 0, _c = block.intervals; _b < _c.length; _b++) {
            var interval = _c[_b];
            lookup.allBlocks.insert(interval.low, interval.high, block);
        }
    }
    for (var _d = 0, _e = index_1.rawData.categories; _d < _e.length; _d++) {
        var rawCategory = _e[_d];
        var cat = expandRawRecord(rawCategory);
        var hName = homogenizeRawStr(cat.name);
        lookup.categories.set(hName, cat);
        lookup.longCategoryToCode.set(homogenizeRawStr(cat.alias), hName);
        for (var _f = 0, _g = cat.intervals; _f < _g.length; _f++) {
            var interval = _g[_f];
            lookup.allCategories.insert(interval.low, interval.high, cat);
        }
    }
    for (var _h = 0, _j = index_1.rawData.scripts; _h < _j.length; _h++) {
        var rawScript = _j[_h];
        var script = expandRawRecord(rawScript);
        lookup.scripts.set(homogenizeRawStr(script.name), script);
        for (var _k = 0, _l = script.intervals; _k < _l.length; _k++) {
            var interval = _l[_k];
            lookup.allScripts.insert(interval.low, interval.high, script);
        }
    }
    return lookup;
}
exports.lookupLoader = (function () {
    var lookup;
    return {
        get lookup() {
            if (lookup)
                return lookup;
            lookup = buildLookup();
            return lookup;
        }
    };
})();
//# sourceMappingURL=unicode-lookup.js.map