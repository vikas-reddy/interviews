/**
 * @param {number[][]} grid1
 * @param {number[][]} grid2
 * @return {number}
 */
var countSubIslands = function (grid1, grid2) {
  // Traverse through all elements of grid2
  // If a 1 is encountered, do a DFS and mark
  // all 1s of that island as visited.
  // While doing so, if a 1 is encountered without
  // a grid1 counterpart, mark it as not a sub-island
  const rows = grid1.length
  const cols = grid1[0].length

  const visited = Array.from({ length: rows }, () => {
    return Array(cols).fill(false)
  })

  let subIslands = 0
  let isInvalidSubIsland = false

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) {
      return
    }
    if (grid2[r][c] !== 1 || visited[r][c]) {
      return
    }
    if (grid1[r][c] !== 1) {
      isInvalidSubIsland = true
    }

    visited[r][c] = true
    dfs(r, c + 1)
    dfs(r + 1, c)
    dfs(r, c - 1)
    dfs(r - 1, c)
    visited[r][c] = false
    // Do not traverse the same island again
    grid2[r][c] = 2
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid2[r][c] === 1) {
        isInvalidSubIsland = false
        console.log("r,c", r, c, isInvalidSubIsland)
        dfs(r, c)
        if (!isInvalidSubIsland) {
          console.log("r,c", r, c, isInvalidSubIsland)
          subIslands++
        }
      }
    }
  }
  console.log(grid2)
  return subIslands
};

console.log(
  countSubIslands(
    // [[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]],
    // [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]
    [[1,0,1,0,1],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1],[1,0,1,0,1]],
    [[0,0,0,0,0],[1,1,1,1,1],[0,1,0,1,0],[0,1,0,1,0],[1,0,0,0,1]]
  )
)