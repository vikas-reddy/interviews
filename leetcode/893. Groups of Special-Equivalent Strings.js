/**
 * @param {string[]} words
 * @return {number}
 */
var numSpecialEquivGroups = function (words) {
  const getKey = (word) => {
    const oddChars = Array.from(word).filter((v, idx) => idx % 2 === 1);
    const evenChars = Array.from(word).filter((v, idx) => idx % 2 === 0);
    return oddChars.sort().concat(evenChars.sort()).join("");
  };

  const groupSet = new Set();
  for (const word of words) {
    groupSet.add(getKey(word));
  }
  return groupSet.size;
};