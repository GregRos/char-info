/**
 * @module char-info
 */ /** */

import {UnicodeCharGroup} from "./unicode-lookup";

export interface StaticIndicators {
    /**
     * Returns an object that can test whether a character is part of the given
     * Unicode block.
     * @param block The block name. Spaces, underscores, dashes, commas, etc.
     *     are ignored.
     */
    block(block: string): CharClassIndicator;

    /**
     * Returns an object that can test whether a character is in the given
     * Unicode category.
     * @param category The category name. May be the short name or the long
     *     name. Spaces, underscores, dashes, etc. are ignored.
     */
    category(category: string): CharClassIndicator;

    /**
     * Returns an object that an test whether a character is in a given Unicode
     * script.
     * @param script The script name. Spaces, underscores, dashes, etc. are
     *     ignored.
     */
    script(script: string): CharClassIndicator;
}

export interface StaticCodeInfo {
    /**
     * Returns all the scripts this codepoint is in.
     * @param code The unicode codepoint
     */
    getScripts(code: number): UnicodeCharGroup[];

    /**
     * Returns all the categories this codepoint is in.
     * @param code The unicode codepoint.
     */
    getCategories(code: number): UnicodeCharGroup[];

    /**
     * Returns the block for this codepoint.
     * @param code The unicode codepoint.
     */
    getBlock(code: number): UnicodeCharGroup;

    /**
     * Checks if the codepoint is an ASCII decimal digit.
     * @param code The codepoint.
     */
    isDecimal(code: number): boolean;

    /**
     * Checks if the codepoint is a Unicode decimal digit, including
     * script-specific forms of decimal digits but not including typographic
     * variants like subscripts and superscripts.
     * @param code The codepoint.
     */
    isUniDecimal(code: number): boolean;

    /**
     * Checks if the codepoint is a hexadecimal digit: [a-fA-F0-9]
     * @param code The codepoint.
     */
    isHex(code: number): boolean;

    /**
     * Checks if the codepoint is 0 or 1.
     * @param code The codepoint.
     */
    isBinary(code: number): boolean;

    /**
     * Determines if this codepoint is part of the ASCII subset of Unicode.
     * @param code The codepoint.
     */
    isAscii(code: number): boolean;

    /**
     * Checks if the codepoint is an ASCII letter: [a-zA-Z]
     * @param code The codepoint.
     */
    isLetter(code: number): boolean;

    /**
     * Checks if the codepoint is a Unicode letter, including letters in
     * different scripts but not including letter-like symbols such as roman
     * numerals.
     * @param code The codepoint.
     */
    isUniLetter(code: number): boolean;

    /**
     * Checks if the codepoint is an ASCII upper-case letter: [A-Z].
     * @param code The codepoint.
     */
    isUpper(code: number): boolean;

    /**
     * Checks if the codepoint is a Unicode upper-case letter, including
     * letters in different scripts. Note that some letters are neither upper-
     * nor lower-case.
     * @param code The codepoint.
     */
    isUniUpper(code: number): boolean;

    /**
     * Checks if the codepoint is an ASCII lower-case letter: [a-z].
     * @param code The codepoint.
     */
    isLower(code: number): boolean;

    /**
     * Checks if the codepoint is a Unicode lower-case letter, including
     * letters in different scripts. Some letters are neither upper- nor
     * lower-case.
     * @param code The codepoint.
     */
    isUniLower(code: number): boolean;

    /**
     * Checks if the codepoint is an ASCII inline space.
     * @param code The codepoint.
     */
    isSpace(code: number): boolean;

    /**
     * Checks if the codepoint is a Unicode inline space, i.e. has the
     * "Separator, Space" category.
     * @param code The codepoint.
     */
    isUniSpace(code: number): boolean;

    /**
     * Checks if the codepoint is a common ASCII line terminator character.
     * Only \r and \n are recognized.
     * @param code The codepoint.
     */
    isNewline(code: number): boolean;

    /**
     * Checks if the codepoint is any of a number of characters that could be
     * considered line terminators, including: U+2029 PARAGRAPH SEPARATOR.
     *
     * This also includes some additional ASCII characters, such as U+000B
     * VERTICAL TAB.
     * @param code The codepoint.
     */
    isUniNewline(code: number): boolean;

    /**
     * Checks if the codepoint could be considered an ASCII word character.
     * This is [0-9a-zA-Z-_].
     * @param code The codepoint
     */
    isWordChar(code: number): boolean;

    /**
     * Checks if the character is any of a number of characters that could be
     * considered a word character.
     * @param code The codepoint
     */
    isUniWordChar(code: number): boolean;

    /**
     * Checks if the codepoint is a Unicode modifier letter.
     * @param code
     */
    isUniLetterModifier(code: number): boolean;

    /**
     * Checks if the given codepoint is part of the given script.
     * @param code The codepoint
     * @param script The script
     */
    inScript(code: number, script: string): boolean;

    /**
     * Checks if the given codepoint is part of the given block.
     * @param code The codepoint.
     * @param block The block.
     */
    inBlock(code: number, block: string): boolean;

    /**
     * Checks if the given codepoint is part of the given category.
     * @param code The codepoint.
     * @param category The category.
     */
    inCategory(code: number, category: string): boolean;
}

export interface StaticCharInfo {
    /**
     * Returns all the scripts this codepoint is in.
     * @param char The unicode codepoint
     */
    getScripts(char: string): UnicodeCharGroup[];

    /**
     * Returns all the categories this codepoint is in.
     * @param char The unicode codepoint.
     */
    getCategories(char: string): UnicodeCharGroup[];

    /**
     * Returns the block for this codepoint.
     * @param char The unicode codepoint.
     */
    getBlock(char: string): UnicodeCharGroup;

    /**
     * Checks if the codepoint is an ASCII decimal digit.
     * @param char The codepoint.
     */
    isDecimal(char: string): boolean;

    /**
     * Checks if the codepoint is a Unicode decimal digit, including
     * script-specific forms of decimal digits but not including typographic
     * variants like subscripts and superscripts.
     * @param char The codepoint.
     */
    isUniDecimal(char: string): boolean;

    /**
     * Checks if the codepoint is a hexadecimal digit: [a-fA-F0-9]
     * @param char The codepoint.
     */
    isHex(char: string): boolean;

    /**
     * Checks if the codepoint is 0 or 1.
     * @param char The codepoint.
     */
    isBinary(char: string): boolean;

    /**
     * Determines if this codepoint is part of the ASCII subset of Unicode.
     * @param char The codepoint.
     */
    isAscii(char: string): boolean;

    /**
     * Checks if the codepoint is an ASCII letter: [a-zA-Z]
     * @param char The codepoint.
     */
    isLetter(char: string): boolean;

    /**
     * Checks if the codepoint is a Unicode letter, including letters in
     * different scripts but not including letter-like symbols such as roman
     * numerals.
     * @param char The codepoint.
     */
    isUniLetter(char: string): boolean;

    /**
     * Checks if the codepoint is an ASCII upper-case letter: [A-Z].
     * @param char The codepoint.
     */
    isUpper(char: string): boolean;

    /**
     * Checks if the codepoint is a Unicode upper-case letter, including
     * letters in different scripts. Note that some letters are neither upper-
     * nor lower-case.
     * @param char The codepoint.
     */
    isUniUpper(char: string): boolean;

    /**
     * Checks if the codepoint is an ASCII lower-case letter: [a-z].
     * @param char The codepoint.
     */
    isLower(char: string): boolean;

    /**
     * Checks if the codepoint is a Unicode lower-case letter, including
     * letters in different scripts. Some letters are neither upper- nor
     * lower-case.
     * @param char The codepoint.
     */
    isUniLower(char: string): boolean;

    /**
     * Checks if the codepoint is an ASCII inline space.
     * @param char The codepoint.
     */
    isSpace(char: string): boolean;

    /**
     * Checks if the codepoint is a Unicode inline space, i.e. has the
     * "Separator, Space" category.
     * @param char The codepoint.
     */
    isUniSpace(char: string): boolean;

    /**
     * Checks if the codepoint is a common ASCII line terminator character.
     * Only \r and \n are recognized.
     * @param char The codepoint.
     */
    isNewline(char: string): boolean;

    /**
     * Checks if the codepoint is any of a string of characters that could be
     * considered line terminators, including: U+2029 PARAGRAPH SEPARATOR.
     *
     * This also includes some additional ASCII characters, such as U+000B
     * VERTICAL TAB.
     * @param char The codepoint.
     */
    isUniNewline(char: string): boolean;

    /**
     * Checks if the codepoint could be considered an ASCII word character.
     * This is [0-9a-zA-Z-_].
     * @param char The codepoint
     */
    isWordChar(char: string): boolean;

    /**
     * Checks if the character is any of a string of characters that could be
     * considered a word character.
     * @param char The codepoint
     */
    isUniWordChar(char: string): boolean;

    /**
     * Checks if the codepoint is a Unicode modifier letter.
     * @param char
     */
    isUniLetterModifier(char: string): boolean;

    /**
     * Checks if the given codepoint is part of the given script.
     * @param char The codepoint
     * @param script The script
     */
    inScript(char: string, script: string): boolean;

    /**
     * Checks if the given codepoint is part of the given block.
     * @param char The codepoint.
     * @param block The block.
     */
    inBlock(char: string, block: string): boolean;

    /**
     * Checks if the given codepoint is part of the given category.
     * @param char The codepoint.
     * @param category The category.
     */
    inCategory(char: string, category: string): boolean;
}

/**
 * An object that can determine if a given codepoint or character is part of
 * some single Unicode group.
 */
export interface CharClassIndicator {
    /**
     * The unicode group for which this object is an indicator for, e.g.
     * "Letter, Titlecase"
     */
    description: string;

    /**
     * Checks if the codepoint is part of the Unicode group.
     * @param char The codepoint.
     */
    test(char: number): boolean;

    test_str(str: string): boolean;
}
