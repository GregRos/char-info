import {UnicodeScript} from "../../lib/internal/names";
import {
    uniIsDecimal, uniGetScripts,
    uniIsLetter,
    uniIsLower, uniIsNewline, uniInScript,
    uniIsSpace,
    uniIsUpper, isLetterCode, isLowerCode, isUpperCode, isHex, isNewline
} from "../../lib";
import {
    isDigit,
    isLetter,
    isLower,
    isSpace,
    isUpper,
    isWordChar
} from "../../lib";
import {isAscii} from "../../lib";
import test, {Macro} from "ava";

type CharCases = {
    true: string[],
    false: string[]
};

const macro: Macro<[(x: any) => boolean, CharCases]> = (t, f, cases) => {
    for (let cr of cases.true) {
        t.true(f(cr), `expected true for ${cr}`);
    }

    for (let cr of cases.false) {
        t.false(f(cr), `expected false for ${cr}`);
    }
};

test("isLetter", macro, isLetter, {
    true: ["G", "g"],
    false: ["4", ""]
});

test("isLower", macro, isLower, {
    true: ["a", "c"],
    false: ["4", "", "A"]
});

test("isUpper", macro, isUpper, {
    true: ["A", "C"],
    false: ["4", "c"]
});


test("isLetter", t => {
    t.true(isLetter("G"));
    t.true(isLetter("g"));
    t.false(isLetter("4"));
    t.true(isLetterCode("G".charCodeAt(0)));
    t.false(isLetterCode("4".charCodeAt(0)));
    t.false(isLetter(""));
});

test("isLower", t => {
    t.false(isLower("G"));
    t.false(isLower("4"));
    t.true(isLower("g"));
    t.false(isLower(""));
    t.true(isLowerCode("g".charCodeAt(0)));

});

test("isUpper", t => {
    t.true(isUpper("G"));
    t.false(isUpper("g"));
    t.false(isUpper("4"));
    t.false(isUpper(""));
    t.false(isUpperCode("4".charCodeAt(0)));
});

test("isSpace", t => {
    t.false(isSpace("G"));
    t.true(isSpace(" "));
    t.true(isSpace("\t"));
    t.false(isSpace("\n"));
    t.false(isSpace("\r"));
    t.false(isSpace(""));
});

test("isDigit - default base", t => {
    t.true(isDigit("4"));
    t.false(isDigit("g"));
    t.false(isDigit(""));
});

test("isDigit - base 4", t => {
    t.true(isDigit("3", 4));
    t.false(isDigit("4", 4));
    t.false(isDigit("a", 4));
    t.false(isDigit("", 4));
});

test("isDigit - base 12", t => {
    t.true(isDigit("3", 13));
    t.true(isDigit("c", 13));
    t.false(isDigit("d", 13));
    t.false(isDigit("", 13));
});

test("isHex", t => {
    t.false(isHex(" "));
    t.false(isHex("g"));
    t.true(isHex("f"));
    t.true(isHex("4"));
    t.true(isHex("0"));
    t.false(isHex(""));
});

test("isWord", t => {
    t.true(isWordChar("a"));
    t.true(isWordChar("4"));
    t.true(isWordChar("_"));
    t.true(isWordChar("-"));
    t.false(isWordChar("+"));
    t.false(isWordChar("("));
    t.false(isWordChar(" "));
    t.false(isWordChar(""));
});

test("isNewLine", t => {
    t.false(isNewline(" "));
    t.true(isNewline("\n"));
    t.true(isNewline("\r"));
    t.false(isNewline("\t"));
    t.false(isNewline("a"));
    t.false(isNewline(""));
});

test("isAscii", t => {
    t.true(isAscii("r"));
    t.true(isAscii(" "));
    t.false(isAscii("ש"));
    t.false(isAscii(""));
});

