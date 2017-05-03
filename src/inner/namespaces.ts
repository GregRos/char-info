/**
 * @module char-info
 */ /** */
import {lookupLoader, UnicodeCharGroup} from './unicode-lookup';
import {UnicodeCategory} from '../defs/categories';
import {BasicCharClassIndicator} from "./indicators";
import {CharClassIndicator, StaticCharInfo, StaticCodeInfo, StaticIndicators} from "./abstract";

function homogenizeInputStr(str : string) {
    return str.toLowerCase().replace(/[_ -,]/g, "");
}

module Codes {
   export const a = 'a'.charCodeAt(0);
   export const f = 'f'.charCodeAt(0);
   export const F = 'F'.charCodeAt(0);
   export const z = 'z'.charCodeAt(0);
   export const A = 'A'.charCodeAt(0);
   export const Z = 'Z'.charCodeAt(0);
   export const zero = '0'.charCodeAt(0);
   export const nine = '9'.charCodeAt(0);
   export const newline = '\n'.charCodeAt(0);
   export const maxAnsi = 0xff;
   export const carriageReturn = '\r'.charCodeAt(0);
   export const space = 0x0020;
   export const tab = 0x0008;
   export const minus = '-'.charCodeAt(0);
   export const plus = '+'.charCodeAt(0);
   export const decimalPoint = ".".charCodeAt(0);
   export const e = a + 4;
   export const E = A + 4;
   export const underscore = "_".charCodeAt(0);
}

/**
 * Provides factory methods for constructing objects that can check if a codepoint is in a unicode group.
 */
export const Indicators : StaticIndicators = new (class IndicatorsImpl implements StaticIndicators {

    category(category : string) : CharClassIndicator {
        category = homogenizeInputStr(category);
        if (category.length > 3) {
            category = lookupLoader.lookup.longCategoryToCode.get(category);
        }
        let uGroup = lookupLoader.lookup.categories.get(category);
        return new BasicCharClassIndicator(uGroup);
    }

    script(script : string) {
        script = homogenizeInputStr(script);
        let uGroup = lookupLoader.lookup.scripts.get(script);
        return new BasicCharClassIndicator(uGroup);
    }

    block(block : string) {
        block = homogenizeInputStr(block);
        let uGroup = lookupLoader.lookup.blocks.get(block);
        return new BasicCharClassIndicator(uGroup);
    }
})();

const categoryGroupWordChars = [UnicodeCategory.Letter, UnicodeCategory.NumberDecimalDigit, UnicodeCategory.PunctuationConnector, UnicodeCategory.PunctuationDash];


/**
 * Provides methods for determining if a character codepoint has specific properties.
 */
export const CodeInfo  = new (class CodeInfoImpl implements StaticCodeInfo{

    getScripts(code : number) : UnicodeCharGroup[] {
        return lookupLoader.lookup.allScripts.search(code, code);
    }

    getCategories(code : number) {
        return lookupLoader.lookup.allCategories.search(code, code);
    }

    isAscii(code : number) {
        return code >= 0 && code <= Codes.maxAnsi;
    }


    getBlock(code : number) {
        return lookupLoader.lookup.allBlocks.search(code, code)[0];
    }

    isHex(code : number) {
        return code >= Codes.A && code <= Codes.F || code >= Codes.a && code <= Codes.f || code >= Codes.zero && code <= Codes.nine;
    }

    isDecimal(code : number) {
        return code >= Codes.zero && code <= Codes.nine;
    }

    isLetter(code : number) {
        return code >= Codes.a && code <= Codes.z || code >= Codes.A && code <= Codes.Z;
    }

    isUpper(code : number) {
        return code >= Codes.A && code <= Codes.Z;
    }

    isLower(code : number) {
        return code >= Codes.a && code <= Codes.z;
    }

    isNewline(code : number) {
        return code === Codes.carriageReturn || code === Codes.newline;
    }

    isSpace(code : number) {
        return code === Codes.space || code === Codes.tab;
    }

    isBinary(code : number) {
        return code === Codes.zero || code === Codes.zero + 1;
    }

    isUniDecimal(code : number) {
        return Indicators.category(UnicodeCategory.NumberDecimalDigit).test(code);
    }
    isUniLetter(code : number) {
        return Indicators.category(UnicodeCategory.Letter).test(code);
    }
    isUniLower(code : number) {
        return Indicators.category(UnicodeCategory.LetterLowercase).test(code);
    }

    isUniUpper(code : number) {
        return Indicators.category(UnicodeCategory.LetterUppercase).test(code);
    }

    isUniLetterModifier(code : number) {
        return Indicators.category(UnicodeCategory.LetterModifier).test(code)
    }

    isUniSpace(code : number) {
        return Indicators.category(UnicodeCategory.SeparatorSpace).test(code)
    }

    isUniNewline(code : number) {
        return Indicators.category(UnicodeCategory.Custom_SeparatorVertical).test(code)
    }

    isUniWordChar(code : number) {
        return !!CodeInfo.getCategories(code).find(cat => categoryGroupWordChars.includes(cat.name));
    }

    isWordChar(code : number) {
        return code >= Codes.A && code <= Codes.Z
            || code >= Codes.zero && code <= Codes.nine
            || code >= Codes.a && code <= Codes.z
            || code === Codes.underscore
            || code === Codes.minus;
    }

    inBlock(code : number, block : string) {
        return Indicators.block(block).test(code);
    }

    inCategory(code : number, block : string) {
        return Indicators.category(block).test(code);
    }

    inScript(code : number, script : string) {
        return Indicators.script(script).test(code);
    }
})() as StaticCodeInfo;

/**
 * Provides methods for determining if a character has specific properties.
 */
export const CharInfo  = new (class CharInfoImpl implements StaticCharInfo{
    getScripts(code : string) : UnicodeCharGroup[] {
        return CodeInfo.getScripts(code.charCodeAt(0));
    }

    getCategories(code : string) {
        return CodeInfo.getCategories(code.charCodeAt(0));
    }

    isAscii(code : string) {
        return CodeInfo.isAscii(code.charCodeAt(0));
    }


    getBlock(code : string) {
        return CodeInfo.getBlock(code.charCodeAt(0));
    }

    isHex(code : string) {
        return CodeInfo.isHex(code.charCodeAt(0));
    }

    isDecimal(code : string) {
        return CodeInfo.isDecimal(code.charCodeAt(0));
    }

    isLetter(code : string) {
        return CodeInfo.isLetter(code.charCodeAt(0));
    }

    isUpper(code : string) {
        return CodeInfo.isUpper(code.charCodeAt(0));
    }

    isLower(code : string) {
        return CodeInfo.isLower(code.charCodeAt(0));
    }

    isNewline(code : string) {
        return CodeInfo.isNewline(code.charCodeAt(0));
    }

    isSpace(code : string) {
        return CodeInfo.isSpace(code.charCodeAt(0));
    }

    isBinary(code : string) {
        return CodeInfo.isBinary(code.charCodeAt(0));
    }

    isUniDecimal(code : string) {
        return CodeInfo.isUniDecimal(code.charCodeAt(0));
    }
    isUniLetter(code : string) {
        return CodeInfo.isUniLetter(code.charCodeAt(0));
    }
    isUniLower(code : string) {
        return CodeInfo.isUniLower(code.charCodeAt(0));
    }

    isUniUpper(code : string) {
        return CodeInfo.isUniUpper(code.charCodeAt(0));
    }

    isUniLetterModifier(code : string) {
        return CodeInfo.isUniLetterModifier(code.charCodeAt(0));
    }

    isUniSpace(code : string) {
        return CodeInfo.isUniSpace(code.charCodeAt(0));
    }

    isUniNewline(code : string) {
        return CodeInfo.isUniNewline(code.charCodeAt(0));
    }

    isUniWordChar(code : string) {
        return CodeInfo.isUniWordChar(code.charCodeAt(0));
    }

    isWordChar(code : string) {
        return CodeInfo.isWordChar(code.charCodeAt(0));
    }

    inBlock(code : string, block : string) {
        return CodeInfo.inBlock(code, block);
    }

    inCategory(code : string, block : string) {
        return CodeInfo.inCategory(code, block);
    }

    inScript(code : string, script : string) {
        return CodeInfo.inScript(code, script);
    }
})() as StaticCharInfo;
