/**
 * @param {string} s
 * @param {number[]} shifts
 * @return {string}
 */
 var shiftingLetters = function(s, shifts) {
  // Turn shifts into a suffix sum array. shifts[i] = shifts[i] + shifts[i+1] + ... + shifts[n-1]
  shifts[shifts.length - 1] %= 26
  for (let i = shifts.length - 2; i >= 0; i--) {
      shifts[i] = (shifts[i] + shifts[i+1]) % 26
  }
  
  const sChars = s.split("")
  for (let i = 0; i < sChars.length; i++) {
      sChars[i] = toChar( (charCode(sChars[i]) + shifts[i]) % 26 )
  }
  return sChars.join("")
};

function charCode(char) {
  return char.charCodeAt(0) - ("a").charCodeAt(0)
}

function toChar(n) {
  return String.fromCharCode(("a").charCodeAt(0) + n)
}