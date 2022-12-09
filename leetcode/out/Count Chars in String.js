/**
 * @returns {number}
 * @param {string} str
 * @param {string} character
 */
var countChars = function (str, character) {
    if (character.length !== 1) {
        return 0;
    }
    /** @type {number[]} */
    var counts = new Array(26);
    counts.fill(0);
    for (var i = 0; i < str.length; i++) {
        // consider lowercase and uppercase as one
        var char = str[i].toLowerCase();
        // only consider letters of the alphabet
        if (/[a-z]/i.test(char)) {
            counts[relativeCharCode(char)]++;
        }
    }
    if (/[a-z]/i.test(character)) {
        return counts[relativeCharCode(character)];
    }
};
/**
 * @returns {number}
 * @param {string} character
 */
var relativeCharCode = function (character) {
    return character.charCodeAt(0) - 'a'.charCodeAt(0);
};
console.log(countChars(
// "ss ccbbb ddsss obnsd kljsn dg", "3"
"The quick brown Fox jumps over the lazy dog", ""));
//# sourceMappingURL=Count%20Chars%20in%20String.js.map