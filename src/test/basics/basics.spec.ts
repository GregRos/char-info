import {UnicodeScript} from "../../lib/defs";
import {
    uniDecimal, uniGetScripts,
    uniLetter,
    uniLower, uniNewline, uniScript,
    uniSpace,
    uniUpper
} from "../../lib/unicode";
import {isDecimal, isLetter, isLower, isSpace, isUpper} from "../../lib";
import {isAscii} from "../../lib/ascii-chars";

describe("basics", () => {
    describe("Upper-case ASCII letter", () => {
        let char = "G";
        it("is letter", () => {
            expect(uniLetter.char(char)).toBe(true);
            expect(isLetter(char)).toBe(true);
        });
        it("is not lowercase", () => {
            expect(isLower(char)).toBe(false);
            expect(uniLower.char(char)).toBe(false);
        });
        it("is uppercase", () => {
            expect(isUpper(char)).toBe(true);
            expect(uniUpper.char(char)).toBe(true);
        });
        it("is not space", () => {
            expect(isSpace(char)).toBe(false);
            expect(uniSpace.char(char)).toBe(false);
        });
        it("is not decimal", () => {
            expect(isDecimal(char)).toBe(false);
            expect(uniDecimal.char(char)).toBe(false);
        });
        it("is ASCII", () => {
            expect(isAscii(char)).toBe(true);
        });
        it("is latin script", () => {
            expect(uniScript(UnicodeScript.Latin).char(char));
            expect(uniGetScripts.char(char).find(x => x.name === UnicodeScript.Latin));
        });
        it("is common script", () => {
            expect(uniScript(UnicodeScript.Common).char(char));
            expect(uniGetScripts.char(char).find(x => x.name === UnicodeScript.Common));
        });
    });
    describe("newline", () => {
        it("works", () => {
            expect(uniNewline.char("\u2028")).toBe(true);
        });
    });
});
