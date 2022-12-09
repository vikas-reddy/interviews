const ROMAN_SYMBOLS = {
  1000: 'M',
  500: 'D',
  100: 'C',
  50: 'L',
  10: 'X',
  5: 'V',
  1: 'I',
}

/**
 * @param {number} integer
 * @returns {string} str - roman numeral string
 */
function integerToRoman(num) {
  // your code here
  let result = "";

  /** 1 <= d <= 9 */
  const digitToRoman = function (d, units) {
    const [one, five, ten] = [ROMAN_SYMBOLS[units], ROMAN_SYMBOLS[units * 5], ROMAN_SYMBOLS[units * 10]]

    // Nothing to do
    if (d < 1) {
      return ""
    }

    // First three
    if (d <= 3) {
      return one.repeat(d);
    }

    // Combos using V
    if (d <= 8) {
      let res = five
      if (d < 5) {
        res = one + res
      } else {
        res += one.repeat(d - 5)
      }
      return res
    }

    // Nine
    return one + ten
  }

  let units = 1000
  while (num) {
    result += digitToRoman(Math.floor(num / units), units)
    num = num % units
    units = Math.floor(units / 10)
  }

  return result
}

console.log(
  integerToRoman(1994)
)
