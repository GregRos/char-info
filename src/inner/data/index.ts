/**
 * @external
 * @module char-info/inner/data
 */ /** */
import _blocks = require("./block.ranges");
import _cats = require("./category.ranges");
import _scripts = require("./script.ranges");

export type RawUnicodeName = string | [string, string];

export type RawUnicodeRecord = [RawUnicodeName, string];

export const rawData = {
    blocks: _blocks as RawUnicodeRecord[],
    categories: _cats as RawUnicodeRecord[],
    scripts: _scripts as RawUnicodeRecord[]
};
