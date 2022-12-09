const LETTER = /^[a-zA-Z]$/;
const NUMBER = /^[0-9]$/;

function tokenize(str) {
  let i = 0;
  const tokens = [];
  while (i < str.length) {
    if (LETTER.test(str[i]) || str[i] === '(' || str[i] === ')') {
      tokens.push(str[i]);
      i++;
    } else {
      let j = i;
      while (NUMBER.test(str[j])) {
        j++;
      }
      tokens.push(parseInt(str.slice(i, j)));
      i = j;
    }
  }
  return tokens;
}

function repeatString(str, times) {
  console.log(str, times)
  const result = [];
  for (let i = 0; i < times; i++) {
    result.push(str);
  }
  return result.join("")
}

/**
 * @param {string} str
 * @returns {string}
 */
function uncompress(str) {
  // Tokenize string. Also parse numbers in it 
  const tokens = tokenize(str);

  // Use stack like we do for math operators
  const stack = [];

  for (const token of tokens) {
    // Repeat string and put the result back
    if (token === ")") {
      const charsToRepeat = [];
      while (stack.length) {
        const char = stack.pop();
        if (char === "(") {
          break;
        }
        charsToRepeat.push(char)
      }
      const repeat = stack.pop();
      stack.push(repeatString(charsToRepeat.reverse().join(""), repeat))
      console.log(stack)
    } else {
      // Push all other chars onto the stack
      stack.push(token);
    }
  }
  return stack.join("");
}

console.log(
  uncompress("xyz3(ab2(c)d1(e))fg")
)
// "3(ab2(c)d14(e))f"
// "3(ab2(c)d14(e))" "f"
// "ab2(c)d14(e)"
// "a" "b" "2(c)" "d" "14(e)"
