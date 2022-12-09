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
const currentMatrixScore = function(A) {
    return A.reduce(
        (acc, row) => acc + row.reduce((a, b) => a*2 + b),
        0
    );
};

/**
 * Flip a row
 * @param {number[]} row
 */
const flipRow = function(row) {
    for (let i = 0; i < row.length; i++) {
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
const oneCount = function(A, colIdx) {
    return A.reduce(
        (sum, row) => sum + row[colIdx],
        0
    );  
};

/**
 * Flip 0's and 1's
 * @param {number[][]} A matrix
 * @param {number} colIdx Index of the column
 */
const flipCol = function(A, colIdx) {
    A.forEach(row => {
        row[colIdx] = (row[colIdx] === 0)
            ? 1
            : 0;
    });
};

/**
 * @param {number[][]} A
 * @return {number}
 */
var matrixScore = function(A) {
    if (!A.length) {
        return 0;
    }
    
    const rowsCount = A.length;
    const colsCount = A[0].length;
    
    // Rows flip first to make first elements 1s
    for (const row of A) {
        if (row[0] === 0) {
            flipRow(row);
        }       
    }
    
    // Cols flip next, to maximize 1s
    for (let colIdx = 1; colIdx < colsCount; colIdx++) {
        if (oneCount(A, colIdx) < rowsCount/2) {
            flipCol(A, colIdx);
        }
    }
    
    return currentMatrixScore(A);
};