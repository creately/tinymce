/**
 * WordGetter.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
import UnicodeData from './UnicodeData';
import StringMapper from './StringMapper';
import WordBoundary from './WordBoundary';
var EMPTY_STRING = UnicodeData.EMPTY_STRING;
var WHITESPACE = UnicodeData.WHITESPACE;
var PUNCTUATION = UnicodeData.PUNCTUATION;
var isProtocol = function (word) {
    return word === 'http' || word === 'https';
};
var findWordEnd = function (str, index) {
    var i;
    for (i = index; i < str.length; ++i) {
        var chr = str.charAt(i);
        if (WHITESPACE.test(chr)) {
            break;
        }
    }
    return i;
};
var extractUrl = function (word, str, index) {
    var endIndex = findWordEnd(str, index + 1);
    var peakedWord = str.substring(index + 1, endIndex);
    if (peakedWord.substr(0, 3) === '://') {
        return {
            word: word + peakedWord,
            index: endIndex
        };
    }
    return {
        word: word,
        index: index
    };
};
var doGetWords = function (str, options) {
    var i = 0;
    var map = StringMapper.classify(str);
    var len = map.length;
    var word = [];
    var words = [];
    var chr;
    var includePunctuation;
    var includeWhitespace;
    if (!options) {
        options = {};
    }
    if (options.ignoreCase) {
        str = str.toLowerCase();
    }
    includePunctuation = options.includePunctuation;
    includeWhitespace = options.includeWhitespace;
    // Loop through each character in the classification map and determine
    // whether it precedes a word boundary, building an array of distinct
    // words as we go.
    for (; i < len; ++i) {
        chr = str.charAt(i);
        // Append this character to the current word.
        word.push(chr);
        // If there's a word boundary between the current character and the
        // next character, append the current word to the words array and
        // start building a new word.
        if (WordBoundary.isWordBoundary(map, i)) {
            word = word.join(EMPTY_STRING);
            if (word &&
                (includeWhitespace || !WHITESPACE.test(word)) &&
                (includePunctuation || !PUNCTUATION.test(word))) {
                if (isProtocol(word)) {
                    var obj = extractUrl(word, str, i);
                    words.push(obj.word);
                    i = obj.index;
                }
                else {
                    words.push(word);
                }
            }
            word = [];
        }
    }
    return words;
};
var getWords = function (str, options) {
    return doGetWords(str.replace(/\ufeff/g, ''), options);
};
export default {
    getWords: getWords
};
//# sourceMappingURL=WordGetter.js.map