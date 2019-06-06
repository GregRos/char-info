export module Codes {
    export const a = "a".charCodeAt(0);
    export const f = "f".charCodeAt(0);
    export const F = "F".charCodeAt(0);
    export const z = "z".charCodeAt(0);
    export const A = "A".charCodeAt(0);
    export const Z = "Z".charCodeAt(0);
    export const zero = "0".charCodeAt(0);
    export const nine = "9".charCodeAt(0);
    export const newline = "\n".charCodeAt(0);
    export const maxAscii = 127;
    export const carriageReturn = "\r".charCodeAt(0);
    export const space = " ".charCodeAt(0);
    export const tab = "\t".charCodeAt(0);
    export const minus = "-".charCodeAt(0);
    export const plus = "+".charCodeAt(0);
    export const decimalPoint = ".".charCodeAt(0);
    export const e = a + 4;
    export const E = A + 4;
    export const underscore = "_".charCodeAt(0);
}

/**
 * Returns true if `code` is a hex character: `[0-9a-fA-F]`.
 * @param code The character code.
 */
export function isHexCode(code: number) {
    return code >= Codes.A && code <= Codes.F || code >= Codes.a && code <=
        Codes.f || code >= Codes.zero && code <= Codes.nine;
}

/**
 * Returns true if `code` is a decimal digit, `[0-9]`.
 * @param code The character code.
 */
export function isDecimalCode(code: number) {
    return code >= Codes.zero && code <= Codes.nine;
}

/**
 * Returns true if `code` is a latin letter, `[a-zA-Z]`.
 * @param code The character code.
 */
export function isLetterCode(code: number) {
    return code >= Codes.a && code <= Codes.z || code >= Codes.A && code <=
        Codes.Z;
}

/**
 * Returns true if `code` is a latin uppercase letter, `[A-Z]`.
 * @param code The character code.
 */
export function isUpperCode(code: number) {
    return code >= Codes.A && code <= Codes.Z;
}

/**
 * Returns true if `code` is a latin lowercase letter, `[a-z]`.
 * @param code The character code.
 */
export function isLowerCode(code: number) {
    return code >= Codes.a && code <= Codes.z;
}

/**
 * Returns true if `code` is an ASCII newline character: `[\r\n]`.
 * @param code The character code.
 */
export function isNewlineCode(code: number) {
    return code === Codes.carriageReturn || code === Codes.newline;
}

/**
 * Returns true if `code` is an ASCII inline space char: `[ \t]`.
 * @param code The character code.
 */
export function isSpaceCode(code: number) {
    return code === Codes.space || code === Codes.tab;
}

/**
 * Returns true if `code` is a word character, which is a digit, a letter,
 * dash or underscore: `[0-9a-zA-Z_-]`.
 * @param code The character code.
 */
export function isWordCharCode(code: number) {
    return code >= Codes.A && code <= Codes.Z
        || code >= Codes.zero && code <= Codes.nine
        || code >= Codes.a && code <= Codes.z
        || code === Codes.underscore
        || code === Codes.minus;
}

/**
 * Returns true if `code` is an ASCII character code.
 * @param code The character code. The char code.
 */
export function isAsciiCode(code: number) {
    return code >= 0 && code <= Codes.maxAscii;
}

