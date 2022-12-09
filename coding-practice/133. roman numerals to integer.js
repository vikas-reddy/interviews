const ROMAN_NUMBERS = {
  'M': 1000,
  'D': 500,
  'C': 100,
  'L': 50,
  'X': 10,
  'V': 5,
  'I': 1,
}

/**
 * @param {string} str - roman numeral string
 * @returns {number} integer
 */
function romanToInteger(str) {
  // your code here
  
  let prev = 0;
  return str.split('').reverse()
    .reduce((res, char) => {
      const curr = ROMAN_NUMBERS[char]
      res = res + (curr < prev ? -curr : curr)
      prev = curr
      return res
    }, 0)
}

console.log(
  romanToInteger("MCMXCIII")
)