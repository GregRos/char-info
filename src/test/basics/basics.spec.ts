import {UnicodeScript} from "../../lib/internal/names";
import {
    uniIsDecimal, uniGetScripts,
    uniIsLetter,
    uniIsLower, uniIsNewline, uniInScript,
    uniIsSpace,
    uniIsUpper
} from "../../lib";
import {isDigit, isLetter, isLower, isSpace, isUpper} from "../../lib";
import {isAscii} from "../../lib";

describe("basics", () => {
    describe("Upper-case ASCII letter", () => {
        let char = "G";
        it("is letter", () => {
            expect(uniIsLetter.char(char)).toBe(true);
            expect(isLetter(char)).toBe(true);
        });
        it("is not lowercase", () => {
            expect(isLower(char)).toBe(false);
            expect(uniIsLower.char(char)).toBe(false);
        });
        it("is uppercase", () => {
            expect(isUpper(char)).toBe(true);
            expect(uniIsUpper.char(char)).toBe(true);
        });
        it("is not space", () => {
            expect(isSpace(char)).toBe(false);
            expect(uniIsSpace.char(char)).toBe(false);
        });
        it("is not decimal", () => {
            expect(isDigit(char)).toBe(false);
            expect(uniIsDecimal.char(char)).toBe(false);
        });
        it("is ASCII", () => {
            expect(isAscii(char)).toBe(true);
        });
        it("is latin script", () => {
            expect(uniInScript(UnicodeScript.Latin).char(char));
            expect(uniGetScripts.char(char).find(x => x.name === UnicodeScript.Latin));
        });
        it("is common script", () => {
            expect(uniInScript(UnicodeScript.Common).char(char));
            expect(uniGetScripts.char(char).find(x => x.name === UnicodeScript.Common));
        });
    });
    describe("newline", () => {
        it("works", () => {
            expect(uniIsNewline.char("\u2028")).toBe(true);
        });
    });
});
