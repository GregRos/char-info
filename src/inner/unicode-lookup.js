"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module char-info/inner
 * @external
 */ /** */
const node_interval_tree_1 = require("node-interval-tree");
const index_1 = require("./data/index");
function homogenizeRawStr(str) {
    return str.toLowerCase().replace(/_/g, "");
}
const rangeRegex = /(\\\w[0-9a-fA-F]+|[\s\S])(?:-(\\\w[0-9a-fA-F]+|[\s\S]))?/g;
function getCharCode(str) {
    if (str.length === 1) {
        return str.charCodeAt(0);
    }
    let hex = str.slice(2);
    return Number.parseInt(hex, 16);
}
function expandIntoRanges(compressedForm) {
    let matches = [];
    let x = null;
    while (x = rangeRegex.exec(compressedForm)) {
        matches.push([x[1], x[2] || x[1]]);
    }
    let ranges = [];
    for (let match of matches) {
        let start = getCharCode(match[0]);
        let end = getCharCode(match[1]);
        ranges.push({
            low: start,
            high: end
        });
    }
    ranges.sort((a, b) => a.low - b.low);
    return ranges;
}
function expandRawRecord(raw) {
    let name;
    let alias;
    let fst = raw[0];
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
    let lookup = {
        allBlocks: new node_interval_tree_1.default(),
        allCategories: new node_interval_tree_1.default(),
        allScripts: new node_interval_tree_1.default(),
        blocks: new Map(),
        categories: new Map(),
        scripts: new Map(),
        longCategoryToCode: new Map()
    };
    for (let rawBlock of index_1.rawData.blocks) {
        let block = expandRawRecord(rawBlock);
        lookup.blocks.set(homogenizeRawStr(block.name), block);
        for (let interval of block.intervals) {
            lookup.allBlocks.insert(interval.low, interval.high, block);
        }
    }
    for (let rawCategory of index_1.rawData.categories) {
        let cat = expandRawRecord(rawCategory);
        let hName = homogenizeRawStr(cat.name);
        lookup.categories.set(hName, cat);
        lookup.longCategoryToCode.set(homogenizeRawStr(cat.alias), hName);
        for (let interval of cat.intervals) {
            lookup.allCategories.insert(interval.low, interval.high, cat);
        }
    }
    for (let rawScript of index_1.rawData.scripts) {
        let script = expandRawRecord(rawScript);
        lookup.scripts.set(homogenizeRawStr(script.name), script);
        for (let interval of script.intervals) {
            lookup.allScripts.insert(interval.low, interval.high, script);
        }
    }
    return lookup;
}
exports.lookupLoader = (function () {
    let lookup;
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