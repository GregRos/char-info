import {CharInfo} from "../../src/inner/namespaces";
import {UnicodeCategory} from "../../src/defs/categories";
import {UnicodeScript} from "../../src/defs/scripts";

describe("basics", () => {
    describe("Upper-case ASCII letter", () => {
        let char = "G";
        it("is letter", () => {
            expect(CharInfo.isUniLetter(char)).toBe(true);
            expect(CharInfo.isLetter(char)).toBe(true);
        });
        it("is not lowercase", () =>{
            expect(CharInfo.isLower(char)).toBe(false);
            expect(CharInfo.isUniLower(char)).toBe(false);
        });
        it("is uppercase", () => {
            expect(CharInfo.isUpper(char)).toBe(true);
            expect(CharInfo.isUniUpper(char)).toBe(true);
        });
        it("is not space", () => {
            expect(CharInfo.isSpace(char)).toBe(false);
            expect(CharInfo.isUniSpace(char)).toBe(false);
        });
        it("is not decimal",() => {
            expect(CharInfo.isDecimal(char)).toBe(false);
            expect(CharInfo.isUniDecimal(char)).toBe(false);
        });
        it("is ASCII", () => {
            expect(CharInfo.isAscii(char)).toBe(true);
        });
        it("is latin script", () => {
            expect(CharInfo.inScript(char, UnicodeScript.Latin));
            expect(CharInfo.getScripts(char).find(x => x.name === UnicodeScript.Latin));
        });
        it("is common script", () => {
            expect(CharInfo.inScript(char, UnicodeScript.Common));
            expect(CharInfo.getScripts(char).find(x => x.name === UnicodeScript.Common));
        });
    });
    describe("newline", () => {
        it("works", () => {
            expect(CharInfo.isUniNewline("\u2028")).toBe(true);
        })
    })
});