"use strict";

const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
const FRESH = 1;
const ROTTEN = 2;

/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  // Calculate initial counts
  const typeCount = function (type) {
    let res = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j] === type) {
          res++;
        }
      }
    }
    return res;
  };

  const freshCount = typeCount(FRESH);
  let rottenCount = typeCount(ROTTEN);
  const totalCount = freshCount + rottenCount;

  const infect = function () {
    const visited = Array.from({length: rows}, _ => Array(cols).fill(false));
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j] !== ROTTEN || visited[i][j]) {
          continue;
        }
        for (const d of DIRECTIONS) {
          const nextRow = i + d[0];
          const nextCol = j + d[1];
          if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
            continue;
          }
          if (!visited[nextRow][nextCol] && grid[nextRow][nextCol] === FRESH) {
            visited[nextRow][nextCol] = true;
            grid[nextRow][nextCol] = ROTTEN;
            rottenCount++;
          }
          visited[i][j] = true;
        }
      }
    }
  };

  let minutes = 0;

  while (rottenCount < totalCount) {
    const prevCount = rottenCount;
    infect();
    const afterCount = rottenCount;
    if (afterCount === prevCount) {
      return -1;
    }
    minutes++;
  }
  return minutes;
};

console.log(orangesRotting(
  // [[2,1,1],[1,1,0],[0,1,1]]
  // [[2,1,1],[0,1,1],[1,0,1]]
  [[0,1]]
))