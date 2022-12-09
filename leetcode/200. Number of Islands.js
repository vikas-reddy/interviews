/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  /**
   * Input: grid = [
   *    ["1","1","1","1","0"],
   *    ["1","1","0","1","0"],
   *    ["1","1","0","0","0"],
   *    ["0","0","0","0","0"]
   *  ]
   *  Output: 1

   *  Input: grid = [
   *    ["1","1","0","0","0"],
   *    ["1","1","0","0","0"],
   *    ["0","0","1","0","0"],
   *    ["0","0","0","1","1"]
   *  ]
   *  Output: 3
   */

  const rows = grid.length;
  if (rows < 1) {
    return 0;
  }
  const cols = grid[0].length;

  const visited = new Array(rows);
  for (let r = 0; r < rows; r++) {
    visited[r] = new Array(cols);
  }

  let numIslands = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "0" || grid[r][c] === "1" && visited[r][c]) {
        continue;
      }
      numIslands++;
      // Traverse and mark all reachable 1's
      const stack = [];
      stack.push([r,c]);
      while (stack.length) {
        const [x,y] = stack.pop();
        if (x >= 1 && grid[x-1][y] === "1" && !visited[x-1][y]) {
          visited[x-1][y] = true;
          stack.push([x-1,y]);
        }
        if (x < rows-1 && grid[x+1][y] === "1" && !visited[x+1][y]) {
          visited[x+1][y] = true;
          stack.push([x+1,y]);
        }
        if (y >= 1 && grid[x][y-1] === "1" && !visited[x][y-1]) {
          visited[x][y-1] = true;
          stack.push([x,y-1]);
        }
        if (y < cols-1 && grid[x][y+1] === "1" && !visited[x][y+1]) {
          visited[x][y+1] = true;
          stack.push([x,y+1]);
        }
      }
    }
  }
  return numIslands;
};

console.log(
  numIslands(
    [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]
  )
)