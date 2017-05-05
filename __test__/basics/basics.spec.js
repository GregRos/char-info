"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var namespaces_1 = require("../../src/inner/namespaces");
var scripts_1 = require("../../src/defs/scripts");
describe("basics", function () {
    describe("Upper-case ASCII letter", function () {
        var char = "G";
        it("is letter", function () {
            expect(namespaces_1.CharInfo.isUniLetter(char)).toBe(true);
            expect(namespaces_1.CharInfo.isLetter(char)).toBe(true);
        });
        it("is not lowercase", function () {
            expect(namespaces_1.CharInfo.isLower(char)).toBe(false);
            expect(namespaces_1.CharInfo.isUniLower(char)).toBe(false);
        });
        it("is uppercase", function () {
            expect(namespaces_1.CharInfo.isUpper(char)).toBe(true);
            expect(namespaces_1.CharInfo.isUniUpper(char)).toBe(true);
        });
        it("is not space", function () {
            expect(namespaces_1.CharInfo.isSpace(char)).toBe(false);
            expect(namespaces_1.CharInfo.isUniSpace(char)).toBe(false);
        });
        it("is not decimal", function () {
            expect(namespaces_1.CharInfo.isDecimal(char)).toBe(false);
            expect(namespaces_1.CharInfo.isUniDecimal(char)).toBe(false);
        });
        it("is ASCII", function () {
            expect(namespaces_1.CharInfo.isAscii(char)).toBe(true);
        });
        it("is latin script", function () {
            expect(namespaces_1.CharInfo.inScript(char, scripts_1.UnicodeScript.Latin));
            expect(namespaces_1.CharInfo.getScripts(char).find(function (x) { return x.name === scripts_1.UnicodeScript.Latin; }));
        });
        it("is common script", function () {
            expect(namespaces_1.CharInfo.inScript(char, scripts_1.UnicodeScript.Common));
            expect(namespaces_1.CharInfo.getScripts(char).find(function (x) { return x.name === scripts_1.UnicodeScript.Common; }));
        });
    });
    describe("newline", function () {
        it("works", function () {
            expect(namespaces_1.CharInfo.isUniNewline("\u2028")).toBe(true);
        });
    });
});
//# sourceMappingURL=basics.spec.js.map