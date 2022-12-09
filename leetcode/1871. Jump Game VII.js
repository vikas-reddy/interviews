/**
 * @param {string} s
 * @param {number} minJump
 * @param {number} maxJump
 * @return {boolean}
 */
var canReach = function (s, minJump, maxJump) {
  const dp = Array(s.length).fill(false)
  dp[0] = true
  let reachableIndexesInWindow = 0

  for (let i = 1; i < s.length; i++) {
    if (i >= minJump && dp[i - minJump]) {
      reachableIndexesInWindow++
    }
    if (i >= maxJump + 1 && dp[i - (maxJump + 1)]) {
      reachableIndexesInWindow--
    }
    dp[i] = reachableIndexesInWindow > 0 && s[i] === "0"
  }
  return dp[s.length - 1]
};