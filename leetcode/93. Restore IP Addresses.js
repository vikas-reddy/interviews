/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  const results = []
  const curr = []

  function isValidOctet(start, end) {
    const octetStr = s.slice(start, end + 1)
    const octetNum = Number(octetStr)
    return octetNum >= 0 && octetNum <= 255 && octetNum + '' === octetStr
  }

  function riaHelper(idx) {
    if (curr.length === 4) {
      if (idx === s.length) {
        results.push(curr.join("."))
      }
      return
    }

    for (let i = idx; i < s.length && i < idx + 3; i++) {
      if (isValidOctet(idx, i)) {
        curr.push(s.slice(idx, i + 1))
        riaHelper(i + 1)
        curr.pop()
      }
    }
  }

  riaHelper(0)
  return results
};