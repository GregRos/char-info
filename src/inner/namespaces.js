"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module char-info
 */ /** */
var unicode_lookup_1 = require("./unicode-lookup");
var categories_1 = require("../defs/categories");
var indicators_1 = require("./indicators");
function homogenizeInputStr(str) {
    return str.toLowerCase().replace(/[_ -,]/g, "");
}
var Codes;
(function (Codes) {
    Codes.a = 'a'.charCodeAt(0);
    Codes.f = 'f'.charCodeAt(0);
    Codes.F = 'F'.charCodeAt(0);
    Codes.z = 'z'.charCodeAt(0);
    Codes.A = 'A'.charCodeAt(0);
    Codes.Z = 'Z'.charCodeAt(0);
    Codes.zero = '0'.charCodeAt(0);
    Codes.nine = '9'.charCodeAt(0);
    Codes.newline = '\n'.charCodeAt(0);
    Codes.maxAscii = 0xff;
    Codes.carriageReturn = '\r'.charCodeAt(0);
    Codes.space = 0x0020;
    Codes.tab = 0x0008;
    Codes.minus = '-'.charCodeAt(0);
    Codes.plus = '+'.charCodeAt(0);
    Codes.decimalPoint = ".".charCodeAt(0);
    Codes.e = Codes.a + 4;
    Codes.E = Codes.A + 4;
    Codes.underscore = "_".charCodeAt(0);
})(Codes || (Codes = {}));
var IndicatorsImpl = (function () {
    function IndicatorsImpl() {
    }
    IndicatorsImpl.prototype.category = function (category) {
        category = homogenizeInputStr(category);
        if (category.length > 3) {
            category = unicode_lookup_1.lookupLoader.lookup.longCategoryToCode.get(category);
        }
        var uGroup = unicode_lookup_1.lookupLoader.lookup.categories.get(category);
        return new indicators_1.BasicCharClassIndicator(uGroup);
    };
    IndicatorsImpl.prototype.script = function (script) {
        script = homogenizeInputStr(script);
        var uGroup = unicode_lookup_1.lookupLoader.lookup.scripts.get(script);
        return new indicators_1.BasicCharClassIndicator(uGroup);
    };
    IndicatorsImpl.prototype.block = function (block) {
        block = homogenizeInputStr(block);
        var uGroup = unicode_lookup_1.lookupLoader.lookup.blocks.get(block);
        return new indicators_1.BasicCharClassIndicator(uGroup);
    };
    return IndicatorsImpl;
}());
/**
 * Provides factory methods for constructing objects that can check if a codepoint is in a unicode group.
 */
exports.Indicators = new IndicatorsImpl();
var categoryGroupWordChars = [categories_1.UnicodeCategory.Letter, categories_1.UnicodeCategory.NumberDecimalDigit, categories_1.UnicodeCategory.PunctuationConnector, categories_1.UnicodeCategory.PunctuationDash];
var CodeInfoImpl = (function () {
    function CodeInfoImpl() {
    }
    CodeInfoImpl.prototype.getScripts = function (code) {
        return unicode_lookup_1.lookupLoader.lookup.allScripts.search(code, code);
    };
    CodeInfoImpl.prototype.getCategories = function (code) {
        return unicode_lookup_1.lookupLoader.lookup.allCategories.search(code, code);
    };
    CodeInfoImpl.prototype.isAscii = function (code) {
        return code >= 0 && code <= Codes.maxAscii;
    };
    CodeInfoImpl.prototype.getBlock = function (code) {
        return unicode_lookup_1.lookupLoader.lookup.allBlocks.search(code, code)[0];
    };
    CodeInfoImpl.prototype.isHex = function (code) {
        return code >= Codes.A && code <= Codes.F || code >= Codes.a && code <= Codes.f || code >= Codes.zero && code <= Codes.nine;
    };
    CodeInfoImpl.prototype.isDecimal = function (code) {
        return code >= Codes.zero && code <= Codes.nine;
    };
    CodeInfoImpl.prototype.isLetter = function (code) {
        return code >= Codes.a && code <= Codes.z || code >= Codes.A && code <= Codes.Z;
    };
    CodeInfoImpl.prototype.isUpper = function (code) {
        return code >= Codes.A && code <= Codes.Z;
    };
    CodeInfoImpl.prototype.isLower = function (code) {
        return code >= Codes.a && code <= Codes.z;
    };
    CodeInfoImpl.prototype.isNewline = function (code) {
        return code === Codes.carriageReturn || code === Codes.newline;
    };
    CodeInfoImpl.prototype.isSpace = function (code) {
        return code === Codes.space || code === Codes.tab;
    };
    CodeInfoImpl.prototype.isBinary = function (code) {
        return code === Codes.zero || code === Codes.zero + 1;
    };
    CodeInfoImpl.prototype.isUniDecimal = function (code) {
        return exports.Indicators.category(categories_1.UnicodeCategory.NumberDecimalDigit).test(code);
    };
    CodeInfoImpl.prototype.isUniLetter = function (code) {
        return exports.Indicators.category(categories_1.UnicodeCategory.Letter).test(code);
    };
    CodeInfoImpl.prototype.isUniLower = function (code) {
        return exports.Indicators.category(categories_1.UnicodeCategory.LetterLowercase).test(code);
    };
    CodeInfoImpl.prototype.isUniUpper = function (code) {
        return exports.Indicators.category(categories_1.UnicodeCategory.LetterUppercase).test(code);
    };
    CodeInfoImpl.prototype.isUniLetterModifier = function (code) {
        return exports.Indicators.category(categories_1.UnicodeCategory.LetterModifier).test(code);
    };
    CodeInfoImpl.prototype.isUniSpace = function (code) {
        return exports.Indicators.category(categories_1.UnicodeCategory.SeparatorSpace).test(code);
    };
    CodeInfoImpl.prototype.isUniNewline = function (code) {
        return exports.Indicators.category(categories_1.UnicodeCategory.Custom_SeparatorVertical).test(code);
    };
    CodeInfoImpl.prototype.isUniWordChar = function (code) {
        return !!exports.CodeInfo.getCategories(code).find(function (cat) { return categoryGroupWordChars.includes(cat.name); });
    };
    CodeInfoImpl.prototype.isWordChar = function (code) {
        return code >= Codes.A && code <= Codes.Z
            || code >= Codes.zero && code <= Codes.nine
            || code >= Codes.a && code <= Codes.z
            || code === Codes.underscore
            || code === Codes.minus;
    };
    CodeInfoImpl.prototype.inBlock = function (code, block) {
        return exports.Indicators.block(block).test(code);
    };
    CodeInfoImpl.prototype.inCategory = function (code, block) {
        return exports.Indicators.category(block).test(code);
    };
    CodeInfoImpl.prototype.inScript = function (code, script) {
        return exports.Indicators.script(script).test(code);
    };
    return CodeInfoImpl;
}());
/**
 * Provides methods for determining if a character codepoint has specific properties.
 */
exports.CodeInfo = new CodeInfoImpl();
var CharInfoImpl = (function () {
    function CharInfoImpl() {
    }
    CharInfoImpl.prototype.getScripts = function (code) {
        return exports.CodeInfo.getScripts(code.charCodeAt(0));
    };
    CharInfoImpl.prototype.getCategories = function (code) {
        return exports.CodeInfo.getCategories(code.charCodeAt(0));
    };
    CharInfoImpl.prototype.isAscii = function (code) {
        return exports.CodeInfo.isAscii(code.charCodeAt(0));
    };
    CharInfoImpl.prototype.getBlock = function (code) {
        return exports.CodeInfo.getBlock(code.charCodeAt(0));
    };
    CharInfoImpl.prototype.isHex = function (code) {
        return exports.CodeInfo.isHex(code.charCodeAt(0));
    };
    CharInfoImpl.prototype.isDecimal = function (code) {
        return exports.CodeInfo.isDecimal(code.charCodeAt(0));
    };
    CharInfoImpl.prototype.isLetter = function (code) {
        return exports.CodeInfo.isLetter(code.charCodeAt(0));
    };
    CharInfoImpl.prototype.isUpper = function (code) {
        return exports.CodeInfo.isUpper(code.charCodeAt(0));
    };
    CharInfoImpl.prototype.isLower = function (code) {
        return exports.CodeInfo.isLower(code.charCodeAt(0));
    };
    CharInfoImpl.prototype.isNewline = function (code) {
        return exports.CodeInfo.isNewline(code.charCodeAt(0));
    };
    CharInfoImpl.prototype.isSpace = function (code) {
        return exports.CodeInfo.isSpace(code.charCodeAt(0));
    };
    CharInfoImpl.prototype.isBinary = function (code) {
        return exports.CodeInfo.isBinary(code.charCodeAt(0));
    };
    CharInfoImpl.prototype.isUniDecimal = function (code) {
        return exports.CodeInfo.isUniDecimal(code.charCodeAt(0));
    };
    CharInfoImpl.prototype.isUniLetter = function (code) {
        return exports.CodeInfo.isUniLetter(code.charCodeAt(0));
    };
    CharInfoImpl.prototype.isUniLower = function (code) {
        return exports.CodeInfo.isUniLower(code.charCodeAt(0));
    };
    CharInfoImpl.prototype.isUniUpper = function (code) {
        return exports.CodeInfo.isUniUpper(code.charCodeAt(0));
    };
    CharInfoImpl.prototype.isUniLetterModifier = function (code) {
        return exports.CodeInfo.isUniLetterModifier(code.charCodeAt(0));
    };
    CharInfoImpl.prototype.isUniSpace = function (code) {
        return exports.CodeInfo.isUniSpace(code.charCodeAt(0));
    };
    CharInfoImpl.prototype.isUniNewline = function (code) {
        return exports.CodeInfo.isUniNewline(code.charCodeAt(0));
    };
    CharInfoImpl.prototype.isUniWordChar = function (code) {
        return exports.CodeInfo.isUniWordChar(code.charCodeAt(0));
    };
    CharInfoImpl.prototype.isWordChar = function (code) {
        return exports.CodeInfo.isWordChar(code.charCodeAt(0));
    };
    CharInfoImpl.prototype.inBlock = function (code, block) {
        return exports.CodeInfo.inBlock(code.charCodeAt(0), block);
    };
    CharInfoImpl.prototype.inCategory = function (code, block) {
        return exports.CodeInfo.inCategory(code.charCodeAt(0), block);
    };
    CharInfoImpl.prototype.inScript = function (code, script) {
        return exports.CodeInfo.inScript(code.charCodeAt(0), script);
    };
    return CharInfoImpl;
}());
/**
 * Provides methods for determining if a character has specific properties.
 */
exports.CharInfo = new CharInfoImpl();
//# sourceMappingURL=namespaces.js.map