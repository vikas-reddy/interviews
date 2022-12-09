/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfFour = function (n) {
    while (n) {
        if (n === 1) {
            return true;
        }
        else if (n & 3) {
            return false;
        }
        n = n >> 2;
    }
    return false;
};
//# sourceMappingURL=342.%20Power%20of%20Four.js.map