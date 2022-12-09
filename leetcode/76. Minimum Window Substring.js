/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindowOld = function (s, t) {
  // Edge cases
  if (s.length < 1 || t.length < 1 || s.length < t.length) {
    return "";
  }

  const sCounts = Array.from({length: 128}, (_,i) => 0);
  const tCounts = Array.from({length: 128}, (_,i) => 0);

  for (let i = 0; i < t.length; i++) {
    tCounts[t.charCodeAt(i)]++;
  }

  let left = 0, startIdx = undefined, minLength = s.length + 1;
  let tCharsMatched = 0;
  for (let i = 0; i < s.length; i++) {
    sCounts[s.charCodeAt(i)]++;
    if (sCounts[s.charCodeAt(i)] <= tCounts[s.charCodeAt(i)]) {
      tCharsMatched++;
    }
    if (tCharsMatched === t.length) {
      while (sCounts[s.charCodeAt(left)] > tCounts[s.charCodeAt(left)] || tCounts[s.charCodeAt(left)] === 0) {
        if (sCounts[s.charCodeAt(left)] > tCounts[s.charCodeAt(left)]) {
          sCounts[s.charCodeAt(left)]--;
        }
        left++;
      }

      if (minLength > i - left + 1) {
        minLength = i - left + 1;
        startIdx = left;
      }
    }
  }

  if (startIdx === undefined) {
    return "";
  }

  return s.slice(left, left + minLength + 1);
}

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindowOwn = function (s, t) {
  /**
   * Input: s = "ADOBECODEBANC", t = "ABC"
   * Output: "BANC"
   * 
   * Input: s = "a", t = "a"
   * Output: "a"
   * 
   * Input: s = "a", t = "aa"
   * Output: ""
   */
  
  // Edge cases
  if (s.length < 1 || t.length < 1 || s.length < t.length) {
    return "";
  }

  // `t` letter counts 
  const letterFreq = new Array(52);
  for (let i = 0; i < 52; i++) {
    letterFreq[i] = 0;
  }

  const currLetterFreq = [...letterFreq];

  for (let i = 0; i < t.length; i++) {
    letterFreq[charCode(t[i])]++;
  }

  let result = "";
  let left = 0, right = 0;

  // Seek left until first match is found
  while (left < s.length && letterFreq[charCode(s[left])] === 0) {
    left++;
  }

  // Edge case
  if (left === s.length) {
    return "";
  }
  
  // Seek right until all chars are found
  right = left;
  while (right < s.length) {
    // Only consider chars in `t`
    if (letterFreq[charCode(s[right])] > 0) {
      currLetterFreq[charCode(s[right])]++;
    }
    if (isSubsetOf(letterFreq, currLetterFreq)) {
      break;
    }
    right++;
  }

  // Edge case
  if (right === s.length) {
    return "";
  }

  result = s.slice(left, right+1);

  // Valid window found
  // Now slide window, minimizing it
  while (right < s.length) {
    let current = s.slice(left, right+1);

    // shorten from left
    currLetterFreq[charCode(s[left])]--;
    left++;
    while (left < right && letterFreq[charCode(s[left])] === 0) {
      left++;
    }

    current = s.slice(left, right+1);

    if (!isSubsetOf(letterFreq, currLetterFreq)) {
      // lengthen from right only if current is invalid
      right++;
      while (right < s.length) {
        if (letterFreq[charCode(s[right])] > 0) {
          currLetterFreq[charCode(s[right])]++;
        }
        if (isSubsetOf(letterFreq, currLetterFreq)) {
          break;
        }
        right++;
      }
      current = s.slice(left, right+1);

      if (right === s.length) {
        return result;
      }
    }

    // Minimize result length
    if (result.length > (right - left + 1)) {
      result = s.slice(left, right+1);
    }
  }
  return result;
};

const charCode = (s) => {
  const sCharCode = s.charCodeAt(0);
  if (sCharCode >= ("a").charCodeAt(0) && sCharCode <= ("z").charCodeAt(0)) {
    return sCharCode - ("a").charCodeAt(0);
  }
  if (sCharCode >= ("A").charCodeAt(0) && sCharCode <= ("Z").charCodeAt(0)) {
    return sCharCode - ("A").charCodeAt(0) + 26;
  }
  return 0;
}
const isSubsetOf = (letterFreq, currLetterFreq) => {
  for (let i = 0; i < letterFreq.length; i++) {
    if (letterFreq[i] > currLetterFreq[i]) {
      return false;
    }
  }
  return true;
};


/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  const counts = Array.from({length: 128}, _ => 0);

  for (const char of t) {
    counts[char.charCodeAt(0)]++;
  }

  let counter = t.length, left = 0, right = 0, minLen = s.length + 1;
  let resultStart;
  while (right < s.length) {
    // console.log(counts.slice('A'.charCodeAt(0), 'Z'.charCodeAt(0) + 1))
    if (counts[s[right].charCodeAt(0)]) {
      counter--;
    }
    counts[s[right].charCodeAt(0)]--;

    // Minimize window by sliding left
    // When counter is 0, all chars in `t` have been matched in `s`. For common
    // chars, counts[c] <= 0. `<` for repetitions. Eg, BECODEBA
    while (counter === 0) {
      if (minLen > right - left + 1) {
        minLen = right - left + 1;
        resultStart = left;
      }
      counts[s[left].charCodeAt(0)]++;
      // If we lost a char in `t`, increment counter
      if (counts[s[left].charCodeAt(0)]) {
        counter++;
      }
      left++;
    }
    right++;
    /*
    ADOBECODEBANC ABC
    ADOBEC
    BECODEBA
    */
  }

  console.log(minLen)
  return resultStart !== undefined
    ? s.slice(resultStart, resultStart + minLen)
    : "";
}

console.log(minWindow(
  // "ADOBECODEBANC", "ABC" 
  // "a", "aa" 
  // "ADOBECODEBAAACB", "ABC" 
  // "ab", "A"
  // "ab", "a"
  "cabwefgewcwaefgcf", "cae"
))