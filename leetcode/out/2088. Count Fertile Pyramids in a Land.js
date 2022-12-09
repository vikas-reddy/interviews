/**
 * 1. Look for apexes (pattern 0-1-0)
 * 2. Compute whether a pyramidal or inversal pyramidal plot can be formed using
 *    the apex found
 */
function countPyramids(grid) {
    var rows = grid.length;
    var columns = grid[0] ? grid[0].length : 0;
    var count = 0;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            count += countPyramidsAtApex(grid, rows, columns, i, j);
            count += countInversePyramidsAtApex(grid, rows, columns, i, j);
        }
    }
    return count;
}
;
function countPyramidsAtApex(grid, rows, columns, r, c) {
    if (grid[r][c] === 0) {
        return 0;
    }
    var countPyramids = 0;
    for (var row = r + 1; row < rows; row++) {
        var low = c - (row - r);
        var high = c + (row - r);
        var length_1 = (row - r) * 2 + 1;
        // console.log('row:', row, 'low:', low, 'high:', high, 'length:', length);
        var count = 0;
        for (var col = low; col <= high; col++) {
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
        }
        else {
            break;
        }
    }
    if (countPyramids > 0) {
        console.log("(".concat(r, ",").concat(c, ")"));
    }
    return countPyramids;
}
function countInversePyramidsAtApex(grid, rows, columns, r, c) {
    if (grid[r][c] === 0) {
        return 0;
    }
    var countPyramids = 0;
    for (var row = r - 1; row >= 0; row--) {
        var low = c - (r - row);
        var high = c + (r - row);
        var length_2 = (r - row) * 2 + 1;
        // console.log('row:', row, 'low:', low, 'high:', high, 'length:', length);
        var count = 0;
        for (var col = low; col <= high; col++) {
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
        }
        else {
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
[[1, 1, 1, 1, 0], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [0, 1, 0, 0, 1]]));
//# sourceMappingURL=2088.%20Count%20Fertile%20Pyramids%20in%20a%20Land.js.map