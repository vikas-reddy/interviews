/**
 * @param {number[][]} grid
 * @return {number}
 */
var gridGame = function(grid) {
    const n = grid[0].length
    
    // Creating suffix sums
    for (let c = n - 2; c >= 0; c--) {
        grid[0][c] += grid[0][c+1]
        grid[1][c] += grid[1][c+1]
    }
    
    // Robot A can choose to go to row 2 once at one index
    // Choose such an index such that what'll be left for
    // robot B is minimized
    let secondMin = Number.MAX_SAFE_INTEGER
    for (let c = n - 1; c >= 0; c--) {
        const b1 = (c === n - 1 ? 0 : grid[0][c+1])
        const b2 = grid[1][0] - grid[1][c]
        if (b1 > 0 && b2 > 0) {
            secondMin = Math.min(secondMin, Math.max(b1, b2))
        } else {
            secondMin = Math.min(secondMin, b1 + b2)
        }
        
    }
    return secondMin
};