/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function (s) {
  const toCharCode = c => c.charCodeAt(0) - ("a").charCodeAt(0);

  const lastIndex = Array.from({length: 26}, _ => []);
  for (let i = 0; i < s.length; i++) {
    lastIndex[toCharCode(s[i])] = i;
  }

  const charUsed = Array(26).fill(false);
  const res = [];
  for (let i = 0; i < s.length; i++) {
    const currChar = toCharCode(s[i]);
    if (charUsed[currChar]) {
      continue;
    }
    // Keep popping out (remove from end) larger chars from result as long as we
    // know they can be added later
    while (
      res.length &&
      res[res.length-1] > currChar &&
      i < lastIndex[res[res.length-1]]
    ) {
      charUsed[res.pop()] = false;
    }
    res.push(currChar);
    charUsed[currChar] = true;
  }

  return res.map(c => String.fromCharCode(("a").charCodeAt(0) + c)).join("");
};

console.log(removeDuplicateLetters(
  "cbacdcbc"
  // "cdadabcc"
  // "abcd"
  // "ecbacba"
));