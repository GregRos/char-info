/**
 * @module char-info
 */ /** */
export {Interval} from "node-interval-tree";

export {
    isWordChar,
    isUpper,
    isSpace,
    isNewline,
    isLower,
    isLetter,
    isHex,
    isDecimal,
    isAscii
} from "./ascii-chars";

export {
    uniGetScripts,
    uniScript,
    uniLower,
    uniLetter,
    uniGetCategories,
    uniGetBlock,
    uniCategory,
    uniNewline,
    uniBlock,
    uniDecimal,
    uniSpace,
    uniUpper,
    UnicodeBlock,
    UnicodeCategory,
    UnicodeScript
} from "./unicode";

export {CharClassIndicator} from "./inner/indicators";
