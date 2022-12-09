/**
 * @param {string} s
 * @return {number}
 */
var maxUniqueSplit = function (s) {
  const results = []
  let maxCount = 0

  function musHelper(startIdx) {
    // base case
    if (startIdx === s.length) {
      maxCount = Math.max(maxCount, results.length)
      return
    }

    // other
    let endIdx = startIdx
    while (endIdx < s.length) {
      const subStr = s.slice(startIdx, endIdx + 1)
      let possible = false
      if (!results.includes(subStr)) {
        results.push(subStr)
        possible = musHelper(endIdx + 1)
        results.pop()
      }
      endIdx++
    }
  }
  musHelper(0)
  return maxCount
};