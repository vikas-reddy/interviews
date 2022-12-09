/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  const isRowValid = function (row) {
    const numPresent = Array(9).fill(false);
    for (let col = 0; col < 9; col++) {
      const entry = board[row][col];
      if (entry === ".") {
        continue;
      }
      if (numPresent[entry - 1]) {
        return false;
      }
      numPresent[entry - 1] = true;
    }
    return true;
  }

  const isColValid = function (col) {
    const numPresent = Array(9).fill(false);
    for (let row = 0; row < 9; row++) {
      const entry = board[row][col];
      if (entry === ".") {
        continue;
      }
      if (numPresent[entry - 1]) {
        return false;
      }
      numPresent[entry - 1] = true;
    }
    return true;
  }

  const isSubBoxValid = function (sbRow, sbCol) {
    const numPresent = Array(9).fill(false);
    for (let r = sbRow * 3; r < sbRow * 3 + 3; r++) {
      for (let c = sbCol * 3; c < sbCol * 3 + 3; c++) {
        const entry = board[r][c];
        if (entry === ".") {
          continue;
        }
        if (numPresent[entry - 1]) {
          return false;
        }
        numPresent[entry - 1] = true;
      }
    }
    return true;
  }

  for (let r = 0; r < 9; r++) {
    if (!isRowValid(r)) {
      // console.log("row", r)
      return false;
    }
  }

  for (let c = 0; c < 9; c++) {
    if (!isColValid(c)) {
      // console.log("col", c)
      return false;
    }
  }

  for (let subRow = 0; subRow < 3; subRow++) {
    for (let subCol = 0; subCol < 3; subCol++) {
      if (!isSubBoxValid(subRow, subCol)) {
        // console.log("subBox", subRow, subCol)
        return false;
      }
    }
  }
  return true;
};

console.log(isValidSudoku(
  /*
  [["5","3",".",".","7",".",".",".","."]
  ,["6",".",".","1","9","5",".",".","."]
  ,[".","9","8",".",".",".",".","6","."]
  ,["8",".",".",".","6",".",".",".","3"]
  ,["4",".",".","8",".","3",".",".","1"]
  ,["7",".",".",".","2",".",".",".","6"]
  ,[".","6",".",".",".",".","2","8","."]
  ,[".",".",".","4","1","9",".",".","5"]
  ,[".",".",".",".","8",".",".","7","9"]]
  */
  [[".",".",".",".","5",".",".","1","."]
  ,[".","4",".","3",".",".",".",".","."]
  ,[".",".",".",".",".","3",".",".","1"]
  ,["8",".",".",".",".",".",".","2","."]
  ,[".",".","2",".","7",".",".",".","."]
  ,[".","1","5",".",".",".",".",".","."]
  ,[".",".",".",".",".","2",".",".","."]
  ,[".","2",".","9",".",".",".",".","."]
  ,[".",".","4",".",".",".",".",".","."]]
))