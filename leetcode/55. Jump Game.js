/**
 * @param {number[]} nums
 * @return {boolean}
 */
 var canJumpOld = function (nums) {
  if (nums.length === 1) {
    return true;
  }
  for (let i = 0; i <= nums.length - 2; i++) {
    if (nums[i] > 0) {
      continue;
    }
    // nums[i] === 0
    let possibleToSkip = false;
    for (let j = i - 1; j >= 0; j--) {
      if (nums[j] > i - j) {
        possibleToSkip = true;
        break;
      }
    }
    if (!possibleToSkip) {
      return false;
    }
  }
  return true;
};

/*
/**
 * @param {number[]} nums
 * @return {boolean}
 * /
var canJump = function (nums) {
  return canJumpRecursive(nums, 0);
};

/**
 * @param {number[]} nums
 * @param {number} start
 * @return {boolean}
 * /
var canJumpRecursive = function (nums, start) {
  console.log(start);
  if (start === nums.length - 1) {
    return true;
  }
  /** @type {boolean} * /
  let jumpPossible = false;
  for (let i = 1; i <= nums[start]; i++) {
    jumpPossible = jumpPossible || canJumpRecursive(nums, start + i);
  }
  return jumpPossible;
};
*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  const result = Array(nums.length).fill(false);
  result[nums.length - 1] = true;
  for (let j = nums.length - 2; j >= 0; j--) {
    for (let i = 1; i <= nums[j]; i++) {
      if (j + i <= nums.length - 1) {
        result[j] = result[j] || result[j + i];
      }
    }
  }
  return result[0];
}

console.log(
  canJump(
    // [2, 3, 1, 1, 4]
    // [3, 2, 1, 0, 4]
    // [2, 0, 0]
    [0, 1]
  )
)