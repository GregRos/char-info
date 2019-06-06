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

export function isHexCode(code: number) {
    return code >= Codes.A && code <= Codes.F || code >= Codes.a && code <=
        Codes.f || code >= Codes.zero && code <= Codes.nine;
}

export function isDecimalCode(code: number) {
    return code >= Codes.zero && code <= Codes.nine;
}

export function isLetterCode(code: number) {
    return code >= Codes.a && code <= Codes.z || code >= Codes.A && code <=
        Codes.Z;
}

export function isUpperCode(code: number) {
    return code >= Codes.A && code <= Codes.Z;
}

export function isLowerCode(code: number) {
    return code >= Codes.a && code <= Codes.z;
}

export function isNewlineCode(code: number) {
    return code === Codes.carriageReturn || code === Codes.newline;
}

export function isSpaceCode(code: number) {
    return code === Codes.space || code === Codes.tab;
}

export function isBinaryCode(code: number) {
    return code === Codes.zero || code === Codes.zero + 1;
}

export function isWordCharCode(code: number) {
    return code >= Codes.A && code <= Codes.Z
        || code >= Codes.zero && code <= Codes.nine
        || code >= Codes.a && code <= Codes.z
        || code === Codes.underscore
        || code === Codes.minus;
}

export function isAsciiCode(code: number) {
    return code >= 0 && code <= Codes.maxAscii;
}

