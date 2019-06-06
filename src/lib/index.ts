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
    isBinary,
    isHex,
    isDecimal,
    isAscii
} from "./inner/ascii-chars"
export {CharClassIndicator} from "./inner/indicators";
