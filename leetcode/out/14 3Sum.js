/**
 * Returns all the triplets of the array which sum to 0
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    if (nums.length < 3) {
        return [];
    }
    // Sort array first
    nums.sort(function (a, b) { return a - b; });
    /** @type {number[][]} */
    var solSet = [];
    for (var i = 0; i < nums.length - 2;) {
        var j = i + 1;
        var k = nums.length - 1;
        while (j < k) {
            var seekJ = false, seekK = false;
            if (nums[i] + nums[j] + nums[k] === 0) {
                solSet.push([nums[i], nums[j], nums[k]]);
                seekJ = true;
                seekK = true;
            }
            else if (nums[i] + nums[j] + nums[k] < 0) {
                seekJ = true;
            }
            else {
                seekK = true;
            }
            if (seekJ) {
                var currentJ = nums[j];
                while (currentJ === nums[j] && j < k) {
                    j++;
                }
            }
            if (seekK) {
                var currentK = nums[k];
                while (currentK === nums[k] && j < k) {
                    k--;
                }
            }
        }
        var currentI = nums[i];
        while (currentI === nums[i] && i < nums.length - 2) {
            i++;
        }
    }
    return solSet;
};
console.log(threeSum([1, 2, -2, -1]));
// console.log(threeSum([-25,-10,-7,-3,2,4,8,10]));
// console.log(threeSum([-4, -1, -1, 0, 1, 2]));
/*
1, 2, 3
-1, 0, 1, 2, -1, -4
-4, -1, -1, 0, 1, 2
-4, -1, -1, -1, -1, 0, 1, 2, 2
-4, -2, -2, -1, -1, 0, 1, 2, 2
-4, -1, -1, 0, 1, 2, 4


(-4) + (2) + (-1) = -3 < 0
-3 2 -1 = -2 < 0
-2
*/ 
//# sourceMappingURL=14%203Sum.js.map