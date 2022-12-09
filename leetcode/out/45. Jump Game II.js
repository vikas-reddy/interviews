/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    /** @type {number[]} */
    var minJumpsCache = new Array(nums.length);
    minJumpsCache[nums.length - 1] = 0;
    for (var i = nums.length - 2; i >= 0; i--) {
        var currentMin = Number.MAX_VALUE;
        for (var j = i + 1; j <= i + nums[i] && j < nums.length; j++) {
            currentMin = Math.min(currentMin, 1 + minJumpsCache[j]);
        }
        minJumpsCache[i] = currentMin;
    }
    return minJumpsCache[0];
};
//# sourceMappingURL=45.%20Jump%20Game%20II.js.map