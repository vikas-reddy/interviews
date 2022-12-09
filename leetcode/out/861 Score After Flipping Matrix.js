/*
[
    [0,0,1,1],   1011  1111  1111  1111
    [1,0,1,0],   0010  0110  1001  1001
    [1,1,0,0]    0100  0000  0000  1111
    
    0011
    1010
    1100
    
    1100
    1010
    1100
    
    1110
    1000
    1110
    
    1111
    1001
    1111
]
*/
/**
 * Score of the current matrix
 * @param {number[][]} A
 */
var currentMatrixScore = function (A) {
    return A.reduce(function (acc, row) { return acc + row.reduce(function (a, b) { return a * 2 + b; }); }, 0);
};
/**
 * Flip a row
 * @param {number[]} row
 */
var flipRow = function (row) {
    for (var i = 0; i < row.length; i++) {
        row[i] = (row[i] === 0)
            ? 1
            : 0;
    }
};
/**
 * Number of 1s in a column
 * @param {number[][]} A matrix
 * @param {number} colIdx Index of the column
 */
var oneCount = function (A, colIdx) {
    return A.reduce(function (sum, row) { return sum + row[colIdx]; }, 0);
};
/**
 * Flip 0's and 1's
 * @param {number[][]} A matrix
 * @param {number} colIdx Index of the column
 */
var flipCol = function (A, colIdx) {
    A.forEach(function (row) {
        row[colIdx] = (row[colIdx] === 0)
            ? 1
            : 0;
    });
};
/**
 * @param {number[][]} A
 * @return {number}
 */
var matrixScore = function (A) {
    if (!A.length) {
        return 0;
    }
    var rowsCount = A.length;
    var colsCount = A[0].length;
    // Rows flip first to make first elements 1s
    for (var _i = 0, A_1 = A; _i < A_1.length; _i++) {
        var row = A_1[_i];
        if (row[0] === 0) {
            flipRow(row);
        }
    }
    // Cols flip next, to maximize 1s
    for (var colIdx = 1; colIdx < colsCount; colIdx++) {
        if (oneCount(A, colIdx) < rowsCount / 2) {
            flipCol(A, colIdx);
        }
    }
    return currentMatrixScore(A);
};
//# sourceMappingURL=861%20Score%20After%20Flipping%20Matrix.js.map