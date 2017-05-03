"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module char-info
 */ /** */
const unicode_lookup_1 = require("./unicode-lookup");
const categories_1 = require("../defs/categories");
const indicators_1 = require("./indicators");
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
    Codes.maxAnsi = 0xff;
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
class IndicatorsImpl {
    category(category) {
        category = homogenizeInputStr(category);
        if (category.length > 3) {
            category = unicode_lookup_1.lookupLoader.lookup.longCategoryToCode.get(category);
        }
        let uGroup = unicode_lookup_1.lookupLoader.lookup.categories.get(category);
        return new indicators_1.BasicCharClassIndicator(uGroup);
    }
    script(script) {
        script = homogenizeInputStr(script);
        let uGroup = unicode_lookup_1.lookupLoader.lookup.scripts.get(script);
        return new indicators_1.BasicCharClassIndicator(uGroup);
    }
    block(block) {
        block = homogenizeInputStr(block);
        let uGroup = unicode_lookup_1.lookupLoader.lookup.blocks.get(block);
        return new indicators_1.BasicCharClassIndicator(uGroup);
    }
}
/**
 * Provides factory methods for constructing objects that can check if a codepoint is in a unicode group.
 */
exports.Indicators = new IndicatorsImpl();
const categoryGroupWordChars = [categories_1.UnicodeCategory.Letter, categories_1.UnicodeCategory.NumberDecimalDigit, categories_1.UnicodeCategory.PunctuationConnector, categories_1.UnicodeCategory.PunctuationDash];
class CodeInfoImpl {
    getScripts(code) {
        return unicode_lookup_1.lookupLoader.lookup.allScripts.search(code, code);
    }
    getCategories(code) {
        return unicode_lookup_1.lookupLoader.lookup.allCategories.search(code, code);
    }
    isAscii(code) {
        return code >= 0 && code <= Codes.maxAnsi;
    }
    getBlock(code) {
        return unicode_lookup_1.lookupLoader.lookup.allBlocks.search(code, code)[0];
    }
    isHex(code) {
        return code >= Codes.A && code <= Codes.F || code >= Codes.a && code <= Codes.f || code >= Codes.zero && code <= Codes.nine;
    }
    isDecimal(code) {
        return code >= Codes.zero && code <= Codes.nine;
    }
    isLetter(code) {
        return code >= Codes.a && code <= Codes.z || code >= Codes.A && code <= Codes.Z;
    }
    isUpper(code) {
        return code >= Codes.A && code <= Codes.Z;
    }
    isLower(code) {
        return code >= Codes.a && code <= Codes.z;
    }
    isNewline(code) {
        return code === Codes.carriageReturn || code === Codes.newline;
    }
    isSpace(code) {
        return code === Codes.space || code === Codes.tab;
    }
    isBinary(code) {
        return code === Codes.zero || code === Codes.zero + 1;
    }
    isUniDecimal(code) {
        return exports.Indicators.category(categories_1.UnicodeCategory.NumberDecimalDigit).test(code);
    }
    isUniLetter(code) {
        return exports.Indicators.category(categories_1.UnicodeCategory.Letter).test(code);
    }
    isUniLower(code) {
        return exports.Indicators.category(categories_1.UnicodeCategory.LetterLowercase).test(code);
    }
    isUniUpper(code) {
        return exports.Indicators.category(categories_1.UnicodeCategory.LetterUppercase).test(code);
    }
    isUniLetterModifier(code) {
        return exports.Indicators.category(categories_1.UnicodeCategory.LetterModifier).test(code);
    }
    isUniSpace(code) {
        return exports.Indicators.category(categories_1.UnicodeCategory.SeparatorSpace).test(code);
    }
    isUniNewline(code) {
        return exports.Indicators.category(categories_1.UnicodeCategory.Custom_SeparatorVertical).test(code);
    }
    isUniWordChar(code) {
        return !!exports.CodeInfo.getCategories(code).find(cat => categoryGroupWordChars.includes(cat.name));
    }
    isWordChar(code) {
        return code >= Codes.A && code <= Codes.Z
            || code >= Codes.zero && code <= Codes.nine
            || code >= Codes.a && code <= Codes.z
            || code === Codes.underscore
            || code === Codes.minus;
    }
    inBlock(code, block) {
        return exports.Indicators.block(block).test(code);
    }
    inCategory(code, block) {
        return exports.Indicators.category(block).test(code);
    }
    inScript(code, script) {
        return exports.Indicators.script(script).test(code);
    }
}
/**
 * Provides methods for determining if a character codepoint has specific properties.
 */
exports.CodeInfo = new CodeInfoImpl();
class CharInfoImpl {
    getScripts(code) {
        return exports.CodeInfo.getScripts(code.charCodeAt(0));
    }
    getCategories(code) {
        return exports.CodeInfo.getCategories(code.charCodeAt(0));
    }
    isAscii(code) {
        return exports.CodeInfo.isAscii(code.charCodeAt(0));
    }
    getBlock(code) {
        return exports.CodeInfo.getBlock(code.charCodeAt(0));
    }
    isHex(code) {
        return exports.CodeInfo.isHex(code.charCodeAt(0));
    }
    isDecimal(code) {
        return exports.CodeInfo.isDecimal(code.charCodeAt(0));
    }
    isLetter(code) {
        return exports.CodeInfo.isLetter(code.charCodeAt(0));
    }
    isUpper(code) {
        return exports.CodeInfo.isUpper(code.charCodeAt(0));
    }
    isLower(code) {
        return exports.CodeInfo.isLower(code.charCodeAt(0));
    }
    isNewline(code) {
        return exports.CodeInfo.isNewline(code.charCodeAt(0));
    }
    isSpace(code) {
        return exports.CodeInfo.isSpace(code.charCodeAt(0));
    }
    isBinary(code) {
        return exports.CodeInfo.isBinary(code.charCodeAt(0));
    }
    isUniDecimal(code) {
        return exports.CodeInfo.isUniDecimal(code.charCodeAt(0));
    }
    isUniLetter(code) {
        return exports.CodeInfo.isUniLetter(code.charCodeAt(0));
    }
    isUniLower(code) {
        return exports.CodeInfo.isUniLower(code.charCodeAt(0));
    }
    isUniUpper(code) {
        return exports.CodeInfo.isUniUpper(code.charCodeAt(0));
    }
    isUniLetterModifier(code) {
        return exports.CodeInfo.isUniLetterModifier(code.charCodeAt(0));
    }
    isUniSpace(code) {
        return exports.CodeInfo.isUniSpace(code.charCodeAt(0));
    }
    isUniNewline(code) {
        return exports.CodeInfo.isUniNewline(code.charCodeAt(0));
    }
    isUniWordChar(code) {
        return exports.CodeInfo.isUniWordChar(code.charCodeAt(0));
    }
    isWordChar(code) {
        return exports.CodeInfo.isWordChar(code.charCodeAt(0));
    }
    inBlock(code, block) {
        return exports.CodeInfo.inBlock(code.charCodeAt(0), block);
    }
    inCategory(code, block) {
        return exports.CodeInfo.inCategory(code.charCodeAt(0), block);
    }
    inScript(code, script) {
        return exports.CodeInfo.inScript(code.charCodeAt(0), script);
    }
}
/**
 * Provides methods for determining if a character has specific properties.
 */
exports.CharInfo = new CharInfoImpl();
//# sourceMappingURL=namespaces.js.map