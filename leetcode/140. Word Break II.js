/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function (s, wordDict) {
  const cache = new Map();

  const wordBreakHelper = function (str) {
    if (cache.has(str)) {
      return cache.get(str);
    }
    if (str.length === 0) {
      return [];
    }

    const res = [];
    for (const word of wordDict) {
      if (!str.startsWith(word)) {
        continue;
      }
      if (word.length === str.length) {
        res.push(word);
      } else {
        const rest = wordBreakHelper(str.slice(word.length));
        rest.forEach(restWord => {
          res.push(word + " " + restWord);
        })
      }
    }
    cache.set(str, res);
    return res;
  };

  return wordBreakHelper(s);
};

console.log(wordBreak(
  "catsanddog", ["cat","cats","and","sand","dog"]
))