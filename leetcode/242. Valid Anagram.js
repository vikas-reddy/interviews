/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  const letterCounts = new Array(26);
  for (let i = 0; i < 26; i++) {
    letterCounts[i] = 0;
  }

  for (let i = 0; i < s.length; i++) {
    const charIdx = s[i].charCodeAt(0) - ("a").charCodeAt(0);
    letterCounts[charIdx]++;
  }

  for (let i = 0; i < t.length; i++) {
    const charIdx = t[i].charCodeAt(0) - ("a").charCodeAt(0);
    letterCounts[charIdx]--;
  }

  for (let i = 0; i < 26; i++) {
    if(letterCounts[i] !== 0) {
      return false;
    }
  }
  return true;
};