/**
 * @param {number[][]} moves
 * @return {string}
 */
var tictactoe = function (moves) {
  /**
   * Input: moves = [[0,0],[2,0],[1,1],[2,1],[2,2]]
   * Output: "A"
   */
  const grid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  /** @type {'A' | 'B'} */
  let player = 'A';

  /** @type {'A' | 'B' | 'Draw'} */
  let winner;

  for (const move of moves) {
    grid[move[0]][move[1]] = player;
    player = (player === 'A') ? 'B' : 'A';
  }

  console.log(grid);

  // 8 checks = 3 rows, 3 cols, 2 diagonals

  // 3 rows
  for (const row of grid) {
    if (row[0] && row[0] === row[1] && row[1] === row[2]) {
      return row[0];
    }
  }

  // 3 cols
  for (let c = 0; c < 3; c++) {
    if (grid[0][c] && grid[0][c] === grid[1][c] && grid[1][c] === grid[2][c]) {
      return grid[0][c];
    }
  }

  // Diagonal
  let i = 1;
  while (grid[0][0] && grid[0][0] === grid[i][i] && i < 3) {
    i++;
  }
  if (i === 3) {
    return grid[0][0];
  }

  // Reverse diagonal
  i = 1;
  while (grid[0][2] && grid[0][2] === grid[i][2-i] && i < 3) {
    i++;
  }
  if (i === 3) {
    return grid[0][2];
  }

  if (moves.length === 9) {
    return "Draw";
  }
  return "Pending";
};

console.log(tictactoe(
  // [[0,0],[2,0],[1,1],[2,1],[2,2]]
  // -> [0,0] [1,1] [2,2] -- [2,0] [2,1]
  // [[0,0],[1,1],[0,1],[0,2],[1,0],[2,0]]
  // -> [0,0] [0,1] [1,0] -- [1,1] [0,2] [2,0]
  // [[2,2],[0,2],[1,0],[0,1],[2,0],[0,0]]
  // -> [2,2] [1,0] [2,0] -- [0,2] [0,1] [0,0]
  // -> [1,0] [2,0] [2,2] -- [0,0] [0,1] [0,2]
  //
  // -> Diagonals [0,2] [1,1] [2,0] -- [0,0] [1,1] [2,2]
  // Rows
  //   [0,0] [0,1] [0,2]
  //   [1,0] [1,1] [1,2]
  //   [2,0] [2,1] [2,2]
  // Cols
  //   [0,0] [1,0] [2,0]
  //   [0,1] [1,1] [2,1]
  //   [0,2] [1,2] [2,2]
))

/*
[O,O,O]
[X, , ]
[X, ,X]
*/