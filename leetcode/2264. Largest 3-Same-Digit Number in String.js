/**
 * @param {string} num
 * @return {string}
 */
var largestGoodInteger = function (num) {
  let lgi = null;
  let i = 0;
  while (i < num.length - 2) {
    if (num[i] === num[i+1] && num[i+1] === num[i+2]) {
      if (lgi == null || lgi < parseInt(num[i])) {
        lgi = parseInt(num[i]);
      }
    }
    i++;
  }
  return lgi == null ? "" : `${lgi}${lgi}${lgi}`;
};

console.log(largestGoodInteger(
  // "6777133339"
  // "00000000"
  "2300019"
  // "000002300019"
))