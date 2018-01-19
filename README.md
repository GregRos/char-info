# char-info
![Travic CI](https://travis-ci.org/GregRos/char-info.svg?branch=master)
![Codecov](https://codecov.io/gh/GregRos/char-info/branch/master/graph/badge.svg)
![NPM](https://badge.fury.io/js/char-info.svg)

[API Documentation](https://gregros.github.io/char-info/)

A library that gives you information about individual Unicode characters. You can use for stuff like:

1. Find out what language a character is in, such as Greek (α), Latin (a), Hebrew (א), and so on.
2. Whether it's a kind of punctuation, digit, letter, emoji, spacing mark, or something else
3. What Unicode character block it inhabits
4. If it's upper-case or lower-case

That can be used for sanitizing input, parsing special characters, detecting languages, converting between encodings, etc. The library only supports characters in the BMP. There are no plans to expanding it beyond the BMP.

It's bundled with some basic Unicode information that originally came from the Unicode Character Database, so it's kind of heavy even though it's API is small. The information is processed into a tree-like data structure that's used to lookup characters. The package can also be used to get info about regular ASCII characters, which circumvents the lookup tree.

It also provides a list of Unicode groupings and their names, including lists of categories, blocks, and scripts. This is also reflected in the library's type definition files.

## Usage
This package has 3 objects for getting information about characters:

1. `CharInfo`, takes strings with length 1 as arguments. Example functions include `CharInfo.isUniLetter`, `CharInfo.inScript`, etc.

2. `CodeInfo`, takes numbers (assumed to be character codes) as parameters. Example functions include `CodeInfo.isUniLetter`, `CodeInfo.inScript`, etc.

3. `Indicators`, which returns indicator objects that test if a character/code is in a specific Unicode group. You can get one for categories, blocks, and scripts.

See more in the API documentation.

## Examples 
It's pretty simple to use. Here are some examples testing if letters have certain properties:

	import {CharInfo, CodeInfo, Indicators, UnicodeScript} from 'char-info';
	let a = CharInfo.isUniLetter("א");
	let b = CharInfo.inScript("א", UnicodeScript.Hebrew);
	let indicator = Indicators.script(UnicodeScript.Cyrilic);
	let c = indicator.test("v");
	let d = CodeInfo.isUniUpper("A".charCodeAt(0));