/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
 var searchMatrix = function(matrix, target) {
  /**
  Binary search row1 to narrow down columns
  Binary search cols to find the element
  */
  const rows = matrix.length
  const cols = matrix[0].length
  
  const maxCol = binarySearchCol(matrix[0], target, 0, cols - 1, true)
  const minCol = binarySearchCol(matrix[rows - 1], target, 0, cols - 1, false)
  const maxRow = binarySearchRow(matrix, 0, target, 0, rows - 1, true)
  const minRow = binarySearchRow(matrix, cols - 1, target, 0, rows - 1, false)
  // console.log("maxCol", maxCol)
  // console.log("minCol", minCol)
  // console.log("maxRow", maxRow)
  // console.log("minRow", minRow)
  if (minCol < 0 || maxCol > cols - 1 || minRow < 0 || maxRow > rows - 1) {
    return false
  }
  for (let r = minRow; r <= maxRow; r++) {
    const res = binarySearchRowBasic(matrix[r], target, minCol, maxCol)
    if (res) {
      return true
    }
  }
  return false
};

function binarySearchRowBasic(row, target, l, r) {
  while (l <= r) {
      // console.log(row, target, l, r)
      const mid = Math.floor( (l + r) / 2 )
      if (target === row[mid]) {
          return true
      }
      if (target < row[mid]) {
          r = mid - 1
      } else {
          l = mid + 1
      }
  }
  return false
}

function binarySearchCol(row, target, l, r, max = true) {
  while (l < r) {
      console.log("l r", l, r)
      const mid = Math.floor( (l + r) / 2 )

      if (max) {
        if (target > row[r]) {
            return r
        }
        if (target < row[l]) {
            return l - 1
        }
      } else {
        if (target < row[l]) {
          return l
        }
        if (target > row[r]) {
          return r + 1
        }
      }

      if (target === row[mid]) {
          return mid
      }
      if (target < row[mid]) {
          r = mid - 1
      } else {
          l = mid + 1
      }
  }
  return l
}

function binarySearchRow(matrix, col, target, u, d, max = true) {
  while (u < d) {
      console.log("u d", u, d)
      const mid = Math.floor( (u + d) / 2 )

      if (max) {
        if (target > matrix[d][col]) {
            return d
        }
        if (target < matrix[u][col]) {
            return u - 1
        }
      } else {
        if (target < matrix[u][col]) {
          return u
        }
        if (target > matrix[d][col]) {
          return d + 1
        }
      }

      if (target === matrix[mid][col]) {
          return mid
      }
      if (target < matrix[mid][col]) {
          d = mid - 1
      } else {
          u = mid + 1
      }
  }
  return u
}

console.log(searchMatrix(
  // [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]],
  // 22
  [[1,1]],
  0
))