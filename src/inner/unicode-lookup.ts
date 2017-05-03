/**
 * @external
 */ /** */
import DataIntervalTree, {Interval} from "node-interval-tree";
import {rawData, RawUnicodeRecord} from "./data/index";
export interface UnicodeCharGroup {
    name : string;
    alias ?: string;
    intervals : Interval[];
    displayName : string;
}

interface UnicodeLookup {
    allBlocks : DataIntervalTree<UnicodeCharGroup>;
    allCategories : DataIntervalTree<UnicodeCharGroup>;
    allScripts : DataIntervalTree<UnicodeCharGroup>;
    blocks : Map<string, UnicodeCharGroup>;
    categories : Map<string, UnicodeCharGroup>;
    scripts : Map<string, UnicodeCharGroup>;
    longCategoryToCode : Map<string, string>;
}

function homogenizeRawStr(str : string) {
    return str.toLowerCase().replace(/_/g, "");
}

const rangeRegex = /(\\\w[1-6a-fA-F]+|.)(?:-(\\\w[1-6a-fA-F]+|.))?/g;

function getCharCode(str : string) {
    if (str.length === 1) {
        return str.charCodeAt(0);
    }
    let hex = str.slice(2);
    return Number.parseInt(hex, 16);
}

function expandIntoRanges(compressedForm : string) {
    let matches = [];
    let x = null;
    while(x = rangeRegex.exec(compressedForm)) {
        matches.push([x[1],x[2] || x[1]])
    }
    let ranges = [];

    for (let match of matches) {
        let start = getCharCode(match[0]);
        let end = getCharCode(match[1]);
        ranges.push({
            low : start,
            high : end
        } as Interval)
    }
    ranges.sort((a, b) => a.low - b.low);
    return ranges;
}

function expandRawRecord(raw : RawUnicodeRecord) {
    let name : string;
    let alias : string;
    let fst = raw[0];
    if (fst.constructor === Array) {
        name = fst[0];
        alias = fst[1];
    } else {
        name = fst as string;
    }
    return {
        name : name,
        alias : alias,
        intervals : expandIntoRanges(raw[1]),
        get displayName() {
            return this.alias || this.name;
        }
    } as UnicodeCharGroup;
}
function buildLookup() {
    let lookup : UnicodeLookup= {
        allBlocks: new DataIntervalTree<UnicodeCharGroup>(),
        allCategories: new DataIntervalTree<UnicodeCharGroup>(),
        allScripts: new DataIntervalTree<UnicodeCharGroup>(),
        blocks: new Map(),
        categories: new Map(),
        scripts: new Map(),
        longCategoryToCode : new Map()
    };
    for (let rawBlock of rawData.blocks) {
        let block = expandRawRecord(rawBlock);
        lookup.blocks.set(homogenizeRawStr(block.name), block);
        for (let interval of block.intervals) {
            lookup.allBlocks.insert(interval.low, interval.high, block);
        }
    }
    for (let rawCategory of rawData.categories) {
        let cat = expandRawRecord(rawCategory);
        let hName = homogenizeRawStr(cat.name);
        lookup.categories.set(hName, cat);
        lookup.longCategoryToCode.set(homogenizeRawStr(cat.alias), hName);
        for (let interval of cat.intervals) {
            lookup.allCategories.insert(interval.low, interval.high, cat);
        }
    }
    for (let rawScript of rawData.scripts) {
        let script = expandRawRecord(rawScript);
        lookup.scripts.set(homogenizeRawStr(script.name), script);
        for (let interval of script.intervals) {
            lookup.allScripts.insert(interval.low, interval.high, script);
        }
    }
    return lookup;
}

export const lookupLoader = (function() {
    let lookup: UnicodeLookup;
    return {
        get lookup() : UnicodeLookup{
            if (lookup) return lookup;
            lookup = buildLookup();
            return lookup;
        }
    }
})();
