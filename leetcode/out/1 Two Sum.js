/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    var numIndices = {};
    for (var i = 0; i < nums.length; i++) {
        numIndices[nums[i]] = i;
    }
    for (var i = 0; i < nums.length - 1; i++) {
        var secondNumIdx = numIndices[target - nums[i]];
        if (secondNumIdx && secondNumIdx != i) {
            return [i, secondNumIdx];
        }
    }
    return [];
};
//# sourceMappingURL=1%20Two%20Sum.js.map