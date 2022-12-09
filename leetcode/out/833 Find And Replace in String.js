/**
 * @constructor
 * @param {number} index
 * @param {string} source
 * @param {string} target
 */
var IndexSourceTarget = function (index, source, target) {
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
    var sortedIndexes = [], sortedSources = [], sortedTargets = [];
    // Sort indexes
    Array(indexes.length)
        .map(function (v, i) { return new IndexSourceTarget(indexes[i], sources[i], targets[i]); })
        .sort(function (a, b) { return a.index - b.index; })
        .forEach(function (ist) {
        sortedIndexes.push(ist.index);
        sortedSources.push(ist.source);
        sortedTargets.push(ist.target);
    });
    for (var i = sortedIndexes.length - 1; i >= 0; i--) {
        if (sortedIndexes[i] + sortedSources[i].length > S.length) {
            continue;
        }
        // Check for a match
        var isMatch = false;
        var sourceIdx = 0, stringIdx = sortedIndexes[i];
        while (sourceIdx < sortedSources[i].length && stringIdx < S.length) {
            isMatch = (sortedSources[i][sourceIdx] === S[stringIdx]);
            if (!isMatch) {
                break;
            }
            sourceIdx++, stringIdx++;
        }
        // Replace source with target
        if (isMatch) {
            var firstPart = S.substring(0, sortedIndexes[i]);
            var substitutedPart = sortedTargets[i];
            var lastPart = S.substring(sortedIndexes[i] + sortedSources[i].length);
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
console.log(findReplaceString("jjievdtjfb", [4, 6, 1], ["md", "tjgb", "jf"], ["foe", "oov", "e"]));
//# sourceMappingURL=833%20Find%20And%20Replace%20in%20String.js.map