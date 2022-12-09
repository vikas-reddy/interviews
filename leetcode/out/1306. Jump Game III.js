/**
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
var canReach = function (arr, start) {
    /** @type {boolean[]} */
    var cache = new Array(arr.length);
    return canReachRecursive(arr, start, cache);
};
/**
 * @param {number[]} arr
 * @param {number} start
 * @param {boolean[]} cache
 * @return {boolean}
 */
var canReachRecursive = function (arr, start, cache) {
    // Valid start
    if (start < 0 || start >= arr.length) {
        return false;
    }
    // End case
    if (arr[start] === 0) {
        return true;
    }
    // Use memoized results
    if (cache[start] === false) {
        return false;
    }
    cache[start] = false;
    var ret = canReachRecursive(arr, start + arr[start], cache) ||
        canReachRecursive(arr, start - arr[start], cache);
    cache[start] = ret;
    return ret;
};
//# sourceMappingURL=1306.%20Jump%20Game%20III.js.map