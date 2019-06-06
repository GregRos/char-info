import {
    isHexCode,
    isDecimalCode,
    isBinaryCode,
    isLetterCode,
    isLowerCode,
    isNewlineCode,
    isSpaceCode,
    isUpperCode,
    isWordCharCode,
    isAsciiCode,
} from "./ascii-codes";

export function isHex(char: string) {
    return isHexCode(char.charCodeAt(0));
}

export function isDecimal(char: string) {
    return isDecimalCode(char.charCodeAt(0));
}

export function isLetter(char: string) {
    return isLetterCode(char.charCodeAt(0));
}

export function isUpper(char: string) {
    return isUpperCode(char.charCodeAt(0));
}

export function isLower(char: string) {
    return isLowerCode(char.charCodeAt(0));
}

export function isNewline(char: string) {
    return isNewlineCode(char.charCodeAt(0));
}

export function isSpace(char: string) {
    return isSpaceCode(char.charCodeAt(0));
}

export function isBinary(char: string) {
    return isBinaryCode(char.charCodeAt(0));
}

export function isWordChar(char: string) {
    return isWordCharCode(char.charCodeAt(0));
}

export function isAscii(char: string) {
    return isAsciiCode(char.charCodeAt(0));
}
