/**
 * @module char-info
 */ /** */
export {Interval} from "node-interval-tree";

export {
    isDigitCode,
    AsciiCodes,
    isAsciiCode,
    isHexCode,
    isLetterCode,
    isLowerCode,
    isNewlineCode,
    isSpaceCode,
    isUpperCode,
    isWordCharCode,
    isWordChar,
    isUpper,
    isSpace,
    isNewline,
    isLower,
    isLetter,
    isHex,
    isDigit,
    isAscii
} from "./ascii";

export {
    uniGetScripts,
    uniInScript,
    uniIsLower,
    uniIsLetter,
    uniGetCategories,
    uniGetBlock,
    uniCategory,
    uniIsNewline,
    uniInBlock,
    uniIsDecimal,
    uniIsSpace,
    uniIsUpper,
    UnicodeBlock,
    UnicodeCategory,
    UnicodeScript
} from "./unicode";

export {CharClassIndicator} from "./internal/indicator-type";
