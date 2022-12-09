const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
]

/**
* @param {character[][]} board
* @return {void} Do not return anything, modify board in-place instead.
*/
var solve = function(board) {
  const rows = board.length
  const cols = board[0].length
  
  const visited = Array.from({length: rows}, (_,i) => {
      return Array(cols).fill(false)
  })    
  
  // Capture region
  function dfsCapture(r, c) {
      if (r < 0 || r >= rows || c < 0 || c >= cols) {
          return
      }
      if (visited[r][c] || board[r][c] === "X") {
          return
      }
      visited[r][c] = true
      for (const dir of DIRECTIONS) {
          const nextRow = r + dir[0]
          const nextCol = c + dir[1]
          dfsCapture(nextRow, nextCol)
      }
      board[r][c] = "X"
      visited[r][c] = false
  }
  
  function dfsMarkVisited(r, c) {
      if (r < 0 || r >= rows || c < 0 || c >= cols ||
          board[r][c] === "X" ||
          visited[r][c]) {
          return
      }
      visited[r][c] = true
      for (const dir of DIRECTIONS) {
          const nextRow = r + dir[0]
          const nextCol = c + dir[1]
          dfsMarkVisited(nextRow, nextCol)
      }
  }
  
  for (let c = 0; c < cols; c++) {
      dfsMarkVisited(0, c)
      dfsMarkVisited(rows - 1, c)
  }
  for (let r = 1; r < rows - 1; r++) {
      dfsMarkVisited(r, 0)
      dfsMarkVisited(r, cols - 1)
  }
  
  for (let r = 1; r < rows - 1; r++) {
      for (let c = 1; c < cols - 1; c++) {
          if (board[r][c] === "O" && !visited[r][c]) {
              dfsCapture(r, c)
          }
      }
  }
};