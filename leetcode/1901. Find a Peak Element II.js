/**
 * @param {number[][]} mat
 * @return {number[]}
 */
var findPeakGrid = function (mat) {
  const rows = mat.length
  const cols = mat[0].length

  let u = 0, d = rows - 1
  while (u < d) {
    const m1 = (u + d) >> 1
    const m2 = m1 + 1
    if (Math.max(...mat[m1]) < Math.max(...mat[m2])) {
      u = m2
    } else {
      d = m1
    }
  }
  const r = u
  const c = mat[r].indexOf(Math.max(...mat[r]))
  return [r, c]
};
