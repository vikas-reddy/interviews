/**
 * @returns {number}
 * @param {string} str
 * @param {string} character
 */
const countChars = function (str, character) {
  if (character.length !== 1) {
    return 0;
  }
  /** @type {number[]} */
  const counts = new Array(26);
  counts.fill(0);

  for (let i = 0; i < str.length; i++) {
    // consider lowercase and uppercase as one
    const char = str[i].toLowerCase();

    // only consider letters of the alphabet
    if (/[a-z]/i.test(char)) {
      counts[relativeCharCode(char)]++;
    }
  }

  if (/[a-z]/i.test(character)) {
    return counts[relativeCharCode(character)];
  }
}

/**
 * @returns {number}
 * @param {string} character 
 */
const relativeCharCode = function (character) {
  return character.charCodeAt(0) - 'a'.charCodeAt(0);
}

console.log(
  countChars(
    // "ss ccbbb ddsss obnsd kljsn dg", "3"
    "The quick brown Fox jumps over the lazy dog", ""
  )
)