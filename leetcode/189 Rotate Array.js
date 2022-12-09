/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    const rows = matrix.length;
    if (rows === 0) {
        return;
    }
    const cols = matrix[0].length;
    if (cols === 0 || cols !== rows) {
        return;
    }
    const n = rows;
   
    let r, c;
    for (r = 1; r <= n/2; r++) {
        for (c = r; c <= n-r; c++) {
            /*
            r/c
            c/n-r+1
            n-r+1/n-c+1
            n-c+1/r
            
            r/c c/a
            b/r a/b
            */
            const ri = r - 1;
            const ci = c - 1;
            const a = n-r;
            const b = n-c;
            console.log(`r: ${r}, c: ${c}, a: ${a}, b: ${b}`);
            const temp = matrix[ri][ci];
            matrix[ri][ci] = matrix[b][ri];
            matrix[b][ri] = matrix[a][b];
            matrix[a][b] = matrix[ci][a];
            martix[ci][a] = temp;
        }
    }
    
    /*
    r: 1 ... n/2
    c: r ... n-r

    3
    1 to 1.5
    1 -> 1, 2
    
    4
    1 to 2
    1 -> 1, 2, 3
    2 -> 2
    
    5
    1 to 2.5
    1 -> 1, 2, 3, 4
    2 -> 2, 3
    
    1 2 3 4 5
    2 3 4 5 1
    3 4 5 1 2
    4 5 1 2 3
    5 1 2 3 4

    1 2 3 4
    2 3 4 1
    3 4 1 2
    4 1 2 3
    
    1 2 3
    4 5 6
    7 8 9
    n=3    
    1/1, 1/3, 3/3, 3/1
    1/2, 2/3, 3/2, 2/1
    2/2

    n=4
    1/1, 1/4, 4/4, 4/1
    1/2, 2/4, 4/3, 3/1
    1/3, 3/4, 4/2, 2/1
    2/2, 2/3, 3/3, 3/2
    
    n=5
    1/1, 1/5, 5/5, 5/1
    1/2, 2/5, 5/4, 4/1
    1/3, 3/5, 5/3, 3/1
    1/4, 4/5, 5/2, 2/1
    2/2, 2/4, 4/4, 4/2
    2/3, 3/4, 4/3, 3/2
    3/3
    */
};

const arr = [[1,2,3],[4,5,6],[7,8,9]];
console.log(arr);
rotate(arr);
console.log(arr);
