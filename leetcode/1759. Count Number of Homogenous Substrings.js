const MODULO = Math.pow(10, 9) + 7

/**
 * @param {string} s
 * @return {number}
 */
var countHomogenous = function(s) {
    let totalCount = 0
    let charCount = 1
    for (let i = 0; i < s.length; i++) {
        if (i === s.length - 1 || s[i] !== s[i+1]) {
            const currCount = Math.floor( charCount * (charCount + 1) / 2 )
            totalCount += (currCount % MODULO)
            charCount = 1
            continue
        }
        charCount++
    }
    return totalCount
};