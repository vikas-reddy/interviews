const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
]

/**
* @param {number[][]} mat
* @return {number[][]}
*/
var updateMatrix = function (mat) {
  const rows = mat.length
  const cols = mat[0].length

  const queue = []

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (mat[r][c] === 0) {
        queue.push([r, c])
      } else {
        mat[r][c] = -1
      }
    }
  }

  while (queue.length) {
    const [r, c] = queue.shift()
    for (const dir of DIRECTIONS) {
      const nextR = r + dir[0]
      const nextC = c + dir[1]
      if (nextR < 0 || nextR >= rows || nextC < 0 || nextC >= cols) {
        continue
      }
      if (mat[nextR][nextC] !== -1) {
        continue
      }
      mat[nextR][nextC] = mat[r][c] + 1
      queue.push([nextR, nextC])
    }
  }

  return mat
};

console.log(
  updateMatrix(
    [
      [0,0,1,0,1,1,1,0,1,1],
      [1,1,1,1,0,1,1,1,1,1],
      [1,1,1,1,1,0,0,0,1,1],
      [1,0,1,0,1,1,1,0,1,1],
      [0,0,1,1,1,0,1,1,1,1],
      [1,0,1,1,1,1,1,1,1,1],
      [1,1,1,1,0,1,0,1,0,1],
      [0,1,0,0,0,1,0,0,1,1],
      [1,1,1,0,1,1,0,1,0,1],
      [1,0,1,1,1,0,1,1,1,0]]
  )
)