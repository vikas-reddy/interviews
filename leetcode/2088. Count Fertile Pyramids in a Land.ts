/**
 * 1. Look for apexes (pattern 0-1-0)
 * 2. Compute whether a pyramidal or inversal pyramidal plot can be formed using
 *    the apex found
 */
function countPyramids(grid: number[][]): number {
  const rows = grid.length;
  const columns = grid[0] ? grid[0].length : 0;

  let count = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      count += countPyramidsAtApex(grid, rows, columns, i, j);
      count += countInversePyramidsAtApex(grid, rows, columns, i, j);
    }
  }
  return count;
};

function countPyramidsAtApex(grid: number[][], rows: number, columns: number, r: number, c: number): number {
  if (grid[r][c] === 0) {
    return 0;
  }

  let countPyramids = 0;

  for (let row = r + 1; row < rows; row++) {
    const low = c - (row - r);
    const high = c + (row - r);
    const length = (row - r) * 2 + 1;
    // console.log('row:', row, 'low:', low, 'high:', high, 'length:', length);

    let count = 0;
    for (let col = low; col <= high; col++) {
      if (col < 0 || col > columns - 1) {
        break;
      }
      // console.log(`(${row},${col})`);
      if (grid[row][col] === 1) {
        count++;
      }
    }

    if (count === (row - r) * 2 + 1) {
      countPyramids++;
    } else {
      break;
    }
  }
  if (countPyramids > 0) {
    console.log(`(${r},${c})`);
  }
  return countPyramids;
}

function countInversePyramidsAtApex(grid: number[][], rows: number, columns: number, r: number, c: number): number {
  if (grid[r][c] === 0) {
    return 0;
  }

  let countPyramids = 0;

  for (let row = r - 1; row >= 0; row--) {
    const low = c - (r - row);
    const high = c + (r - row);
    const length = (r - row) * 2 + 1;
    // console.log('row:', row, 'low:', low, 'high:', high, 'length:', length);

    let count = 0;
    for (let col = low; col <= high; col++) {
      if (col < 0 || col > columns - 1) {
        break;
      }
      // console.log(`(${row},${col})`);
      if (grid[row][col] === 1) {
        count++;
      }
    }

    if (count === (r - row) * 2 + 1) {
      countPyramids++;
    } else {
      break;
    }
  }
  if (countPyramids > 1) {
    // console.log(`(${r},${c})`);
  }
  return countPyramids;
}

console.log(
  // checkForPyramid([[0,1,1,0],[1,1,1,1]], 2, 4, 0, 0)
  countPyramids(
    // [[0,1,1,0],[1,1,1,1]]
    // [[1,1,1],[1,1,1]]
    [[1,1,1,1,0],[1,1,1,1,1],[1,1,1,1,1],[0,1,0,0,1]]
  )
)