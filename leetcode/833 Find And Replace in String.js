/**
 * @constructor
 * @param {number} index
 * @param {string} source
 * @param {string} target
 */
const IndexSourceTarget = function (index, source, target) {
  this.index = index;
  this.source = source;
  this.target = target;
};

/**
 * @param {string} S
 * @param {number[]} indexes
 * @param {string[]} sources
 * @param {string[]} targets
 * @return {string}
 */
var findReplaceString = function (S, indexes, sources, targets) {

  const sortedIndexes = [], sortedSources = [], sortedTargets = [];

  // Sort indexes
  Array(indexes.length)
    .map((v, i) => new IndexSourceTarget(indexes[i], sources[i], targets[i]))
    .sort((a,b) => a.index - b.index)
    .forEach(ist => {
      sortedIndexes.push(ist.index);
      sortedSources.push(ist.source);
      sortedTargets.push(ist.target);
    });
  

  for (let i = sortedIndexes.length - 1; i >= 0; i--) {
    if (sortedIndexes[i] + sortedSources[i].length > S.length) {
      continue;
    }

    // Check for a match
    let isMatch = false;
    let sourceIdx = 0, stringIdx = sortedIndexes[i];
    while(sourceIdx < sortedSources[i].length && stringIdx < S.length) {
      isMatch = (sortedSources[i][sourceIdx] === S[stringIdx]);
      if (!isMatch) {
        break;
      }
      sourceIdx++, stringIdx++
    }
    
    // Replace source with target
    if (isMatch) {
      const firstPart = S.substring(0, sortedIndexes[i]);
      const substitutedPart = sortedTargets[i];
      const lastPart = S.substring(sortedIndexes[i] + sortedSources[i].length);
      S = firstPart + substitutedPart + lastPart;
    }
  }
  return S;
};

// console.log(findReplaceString("abcd", [0,2], ["a","cde"], ["eee","ffff"]));
// console.log(findReplaceString("abcd", [0,2], ["ab","ec"], ["eee","ffff"]));
// console.log(
//   findReplaceString(
//     "vmokgggqzp",
//     [3, 5, 1],
//     ["kg", "ggq", "mo"],
//     ["s", "so", "bfr"]
//   )
// );
console.log(
  findReplaceString(
    "jjievdtjfb",
    [4, 6, 1],
    ["md", "tjgb", "jf"],
    ["foe", "oov", "e"]
  )
)