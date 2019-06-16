import {
    UnicodeCategory,
    uniInCategory,
    uniIsLower,
    uniIsUpper
} from "../../lib";
import test from "ava";



test("category - punctuation", t => {
    let uniPunctuation = uniInCategory(UnicodeCategory.Punctuation);
    t.false(uniPunctuation.char(""));
    t.true(uniPunctuation.char(","));
    t.true(uniPunctuation.char("׆"));
    t.true(uniPunctuation.char("؟"));
    t.true(uniPunctuation.char("§"));
    t.false(uniPunctuation.char("a"));
});

test("category - uppercase", t => {
    let uniUpper = uniIsUpper;
    t.true(uniUpper.char("A"));
    t.true(uniUpper.char("Ę"));
    t.true(uniUpper.char("Ц"));
    t.false(uniUpper.char("a"));
    t.false(uniUpper.char("4"));
    t.false(uniUpper.char(" "));
});
