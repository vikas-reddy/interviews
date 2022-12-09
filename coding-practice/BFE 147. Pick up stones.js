/** 
 * @param {number} n
 * @return {'A' | 'B' | null}
 */
 function canWinStonePicking(n) {
  if (n < 1) {
    return null
  }
  switch (n) {
    case 1: return 'B'
    case 2: return 'A'
    case 3: return 'A'
    case 4: return 'B'
    default:
      const option1 = canWinStonePicking(n-1)
      const option2 = canWinStonePicking(n-2)
      if (option1 === 'B' || option2 === 'B') {
        return 'A'
      } else {
        return 'B'
      }
  }
}

console.log(
  canWinStonePicking(100)
)
