const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

/**
 * O((rows*cols)^^2) soln -- DFS
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function (heights) {
  if (heights.length === 0 || heights[0].length === 0) {
    return [];
  }
  // Store dimensions
  const rows = heights.length;
  const cols = heights[0].length;

  const pacificFlow = Array.from({length: rows}, _ => Array(cols).fill(false));
  const atlanticFlow = Array.from({length: rows}, _ => Array(cols).fill(false));
  const visitedPacific = Array.from({length: rows}, _ => Array(cols).fill(false));
  const visitedAtlantic = Array.from({length: rows}, _ => Array(cols).fill(false));

  // Outer rows and cols can flow, by definition
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r === 0 || c === 0) {
        pacificFlow[r][c] = true;
      }
      if (r === rows - 1 || c === cols - 1) {
        atlanticFlow[r][c] = true;
      }
    }
  }

  const results = [];

  const dfs = (r, c, oceanFlow, visited) => {
    if (visited[r][c] || oceanFlow[r][c]) {
      return oceanFlow[r][c];
    }
    
    visited[r][c] = true;
    for (const d of DIRECTIONS) {
      const nextRow = r + d[0];
      const nextCol = c + d[1];

      if (nextRow >= 0 && nextRow < rows &&
        nextCol >= 0 && nextCol < cols &&
        heights[r][c] >= heights[nextRow][nextCol]) {
        oceanFlow[r][c] = oceanFlow[r][c] || dfs(nextRow, nextCol, oceanFlow, visited);
      }
    }
    visited[r][c] = false;
    return oceanFlow[r][c];
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dfs(r, c, pacificFlow, visitedPacific);
      dfs(r, c, atlanticFlow, visitedAtlantic);
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (pacificFlow[r][c] && atlanticFlow[r][c]) {
        results.push([r,c]);
      }
    }
  }
  return results;
};

/**
 * O(rows*cols) soln -- DFS
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function (heights) {
  if (heights.length === 0 || heights[0].length === 0) {
    return [];
  }
  // Store dimensions
  const rows = heights.length;
  const cols = heights[0].length;

  const visitedPacific = Array.from({length: rows}, _ => Array(cols).fill(false));
  const visitedAtlantic = Array.from({length: rows}, _ => Array(cols).fill(false));

  const results = [];

  const dfs = (r, c, visited) => {
    if (visited[r][c]) {
      return;
    }
    
    visited[r][c] = true;
    for (const d of DIRECTIONS) {
      const nextRow = r + d[0];
      const nextCol = c + d[1];

      if (nextRow >= 0 && nextRow < rows &&
        nextCol >= 0 && nextCol < cols &&
        heights[r][c] <= heights[nextRow][nextCol]) {
        dfs(nextRow, nextCol, visited);
      }
    }
  };

  for (let r = 0; r < rows; r++) {
    dfs(r, 0, visitedPacific);
    dfs(r, cols - 1, visitedAtlantic);
  }

  for (let c = 0; c < cols; c++) {
    dfs(0, c, visitedPacific);
    dfs(rows - 1, c, visitedAtlantic);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (visitedPacific[r][c] && visitedAtlantic[r][c]) {
        results.push([r,c]);
      }
    }
  }
  return results;
};

console.log(pacificAtlantic(
  [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
))