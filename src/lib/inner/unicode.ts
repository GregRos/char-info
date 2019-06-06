
import {lookup} from "./unicode-lookup";
import {BasicCharClassIndicator, CharClassIndicator} from "./indicators";
import {UnicodeCategory} from "../defs";

function homogenizeInputStr(str: string) {
    return str.toLowerCase().replace(/[_ -,]/g, "");
}

export function uniCategory(category: string): CharClassIndicator {
    category = homogenizeInputStr(category);
    if (category.length > 3) {
        category = lookup.longCategoryToCode.get(category);
    }
    let uGroup = lookup.categories.get(category);
    return new BasicCharClassIndicator(uGroup);
}

export function uniScript(script: string) {
    script = homogenizeInputStr(script);
    let uGroup = lookup.scripts.get(script);
    return new BasicCharClassIndicator(uGroup);
}

export function uniBlock(block: string) {
    block = homogenizeInputStr(block);
    let uGroup = lookup.blocks.get(block);
    return new BasicCharClassIndicator(uGroup);
}

export const uniDecimal = uniCategory(UnicodeCategory.NumberDecimalDigit);

export const uniLetter = uniCategory(UnicodeCategory.Letter);

export const uniLower = uniCategory(UnicodeCategory.LetterLowercase);

export const uniUpper = uniCategory(UnicodeCategory.LetterUppercase);

export const uniSpace = uniCategory(UnicodeCategory.SeparatorSpace);

export const uniNewline = uniCategory(UnicodeCategory.Custom_SeparatorVertical);

export const uniGetCategories = {
    code(code: number) {
        return lookup.allCategories.search(code, code);
    },
    char(char: string) {
        return uniGetCategories.code(char.charCodeAt(0));
    }
};

export const uniGetScripts = {
    code(code: number) {
        return lookup.allScripts.search(code, code);
    },
    char(char: string) {
        return uniGetScripts.code(char.charCodeAt(0));
    }
};

export const uniGetBlock = {
    code(code: number) {
        return lookup.allBlocks.search(code, code)[0];
    },
    char(char: string) {
        return uniGetBlock.code(char.charCodeAt(0));
    }
}
