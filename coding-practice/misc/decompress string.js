/**
 * Given abcd[0xFF, 1, 2]xy, you need to output: abcdcxy. The additional 'c'
 * between 'd' and 'x' comes from: O = 2, means you need to move 2 chars
 * backward from 'd' (inclusive), which land us at 'c', and L = 1, menas we take
 * 1 char, which is 'c'. Thus we end up with abcdcxy.
 * 
 * Given abcd[0xFF, 1, 2]xy[0xFF, 3, 3], you need to output abcdcxycxy.
 */

const LETTER = /^[a-zA-Z]$/;

function getComparessionDetails(str) {
  const matches = str.match(/\[0xFF, ?([0-9]+), ? ([0-9]+)\]/);
  return [matches[1], matches[2]];
}

function decompress(str) {
  const result = [];
  for (let i = 0; i < str.length; i++) {
    if (LETTER.test(str[i])) {
      result.push(str[i]);
    } else if (str[i] === "[") {
      const j = i;
      while (str[j] !== "]") {
        j++;
      }
      const [L, O] = getComparessionDetails(str.slice(i, j))
      result.push(str.slice(result.length - 1 - O, result.length - 1 - O + L))
      i = j;
    }
  }
}

console.log(decompress(
  "abcd[0xFF, 1, 2]xy[0xFF, 3, 3]"
))