/**
 * @param {string[]} queries
 * @param {string} pattern
 * @return {boolean[]}
 */
var camelMatchRegex = function (queries, pattern) {
  const words = pattern.match(/([A-Z]{0,1}[a-z]*)/g).filter(s => s.length > 0);
  console.log(words);
  const regexStr = words.map(word => {
    const [, first, lowerCaseLetters] = word.match(/^([A-Z]{0,1})([a-z]*)$/);
    let res = `${first}[a-z]*`;
    lowerCaseLetters.split("").forEach(lowerCaseLetter => {
      res += `${lowerCaseLetter}[a-z]*`
    });
    return res;
  }).join("");
  console.log(regexStr);
  const regex = new RegExp(`^[a-z]*${regexStr}[a-z]*$`);
  
  return queries.map(query => regex.test(query));
};

/**
 * @param {string[]} queries
 * @param {string} pattern
 * @return {boolean[]}
 */
var camelMatch = function (queries, pattern) {
  const isUpperCase = (char) => {
    return char.charCodeAt(0) >= ("A").charCodeAt(0) && 
      char.charCodeAt(0) <= ("Z").charCodeAt(0);
  };

  const queryMatch = function (query) {
    let q = 0;
    let p = 0;
    for (q = 0; q < query.length; q++) {
      if (p < pattern.length && pattern[p] === query[q]) {
        p++;
      } else if (isUpperCase(query[q])) {
        return false;
      }
    }
    return p === pattern.length;
  }
  return queries.map(query => queryMatch(query));
};

console.log(camelMatch(
  [/*"FooBar",*/"FooBarTest"/*,"FootBall","FrameBuffer","ForceFeedBack"*/], "FB"
  // ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], "FoBa"
  // ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], "FoBaT"
  // ["CompetitiveProgramming","CounterPick","ControlPanel"], "CooP"
  // ["aksvbjLiknuTzqon","ksvjLimflkpnTzqn","mmkasvjLiknTxzqn","ksvjLiurknTzzqbn","ksvsjLctikgnTzqn","knzsvzjLiknTszqn"], "ksvjLiknTzqn"
  // ["uAxaqlzahfialcezsLfj","cAqlzyahaslccezssLfj","AqlezahjarflcezshLfj","AqlzofahaplcejuzsLfj","tAqlzahavslcezsLwzfj","AqlzahalcerrzsLpfonj","AqlzahalceaczdsosLfj","eAqlzbxahalcezelsLfj"], "AqlzahalcezsLfj"
))