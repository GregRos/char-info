import {
    isHexCode,
    isDecimalCode,
    isLetterCode,
    isLowerCode,
    isNewlineCode,
    isSpaceCode,
    isUpperCode,
    isWordCharCode,
    isAsciiCode,
} from "./ascii-codes";

/**
 * Returns true if `char` begins with a hex character: `[a-fA-F0-9]`.
 * @param char A string representing a character.
 */
export function isHex(char: string) {
    return isHexCode(char.charCodeAt(0));
}

/**
 * Returns true if `char` is a digit: `[0-9]`.
 * @param char A string representing a character.
 */
export function isDecimal(char: string) {
    return isDecimalCode(char.charCodeAt(0));
}

/**
 * Returns true if `char` begins with a latin letter: `[A-Za-z]`.
 * @param char A string representing a character.
 */
export function isLetter(char: string) {
    return isLetterCode(char.charCodeAt(0));
}


/**
 * Returns true if `char` begins with an uppercase latin letter: `[A-Z]`.
 * @param char A string representing a character.
 */
export function isUpper(char: string) {
    return isUpperCode(char.charCodeAt(0));
}

/**
 * Returns true if `char` begins with a lowercase latin letter: `[a-z]`.
 * @param char A string representing a character.
 */
export function isLower(char: string) {
    return isLowerCode(char.charCodeAt(0));
}

/**
 * Returns true if `char` begins with a newline: `[\r\n]`.
 * @param char A string representing a character.
 */
export function isNewline(char: string) {
    return isNewlineCode(char.charCodeAt(0));
}

/**
 * Returns true if `char` begins with an inline space: `[ \t]`.
 * @param char A string representing a character.
 */
export function isSpace(char: string) {
    return isSpaceCode(char.charCodeAt(0));
}

/**
 * Returns true if `char` begins with a word char: a letter, digit, underscore,
 * or dash: `[a-zA-Z0-9_-].
 * @param char A string representing a character.
 */
export function isWordChar(char: string) {
    return isWordCharCode(char.charCodeAt(0));
}

/**
 * Returns true if `char` begins with an ASCII character.
 * @param char A string representing a character.
 */
export function isAscii(char: string) {
    return isAsciiCode(char.charCodeAt(0));
}
