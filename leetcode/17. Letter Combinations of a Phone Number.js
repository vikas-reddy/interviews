/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  const lettersMap = new Map();
  lettersMap.set("2", ["a","b","c"]);
  lettersMap.set("3", ["d","e","f"]);
  lettersMap.set("4", ["g","h","i"]);
  lettersMap.set("5", ["j","k","l"]);
  lettersMap.set("6", ["m","n","o"]);
  lettersMap.set("7", ["p","q","r","s"]);
  lettersMap.set("8", ["t","u","v"]);
  lettersMap.set("9", ["w","x","y","z"]);

  const digitsArr = Array.from(digits);
  const results = [];
  let result = "";

  const combinations = (arr) => {
    if (arr.length === 0 && result.length) {
      results.push(result);
    }
    if (lettersMap.has(arr[0])) {
      lettersMap.get(arr[0]).forEach(l => {
        result += l;
        combinations(arr.slice(1));
        result = result.slice(0, result.length-1);
      })
    }
  };

  combinations(digitsArr);
  return results;
};