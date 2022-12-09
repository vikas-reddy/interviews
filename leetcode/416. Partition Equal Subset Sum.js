/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartitionRecursive = function (nums) {
  const sum = nums.reduce((a,b) => a + b, 0);
  if (sum % 2) {
    return false;
  }
  const targetSubsetSum = sum / 2;

  // Find whether a subset can be created with a `target` subsum
  const canPartitionHelper = function (idx, target) {
    console.log(idx, target);
    if (target === 0) {
      return true;
    }
    if (idx === nums.length) {
      return false;
    }

    let result = false;

    // Include nums[idx] in sum
    if (nums[idx] <= target) {
      result = canPartitionHelper(idx + 1, target - nums[idx]);
    }

    // Do not include nums[idx]
    result = result || canPartitionHelper(idx + 1, target);
    return result
  };
  return canPartitionHelper(0, targetSubsetSum);
};


/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartitionDP1 = function (nums) {
  const sum = nums.reduce((a,b) => a + b, 0);
  if (sum % 2) {
    return false;
  }

  const targetSubsetSum = sum / 2;
  const res = Array.from({length: nums.length + 1}, (_,i) => {
    return Array(targetSubsetSum + 1).fill(false);
  })
  res[0][0] = true;

  for (let i = 1; i <= nums.length; i++) {
    for (let t = 0; t <= targetSubsetSum; t++) {
      if (t >= nums[i]) {
        res[i][t] = res[i-1][t - nums[i]];
      }
      res[i][t] = res[i][t] || res[i-1][t];
    }
  }
  return res[nums.length][targetSubsetSum];
};

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((a,b) => a + b, 0);
  if (sum % 2) {
    return false;
  }

  const targetSubsetSum = sum / 2;
  let resRow = Array(targetSubsetSum + 1).fill(false);
  resRow[0] = true;

  for (let i = 1; i <= nums.length; i++) {
    for (let t = 0; t <= targetSubsetSum; t++) {
      if (t >= nums[i]) {
        resRow[t] = resRow[t - nums[i]] || resRow[t];
      }
    }
  }
  return resRow[targetSubsetSum];
};

console.log(canPartition(
  [1,5,11,5]
  // [1,2,3,6]
  // [1,2,3,8]
  // [2,1,0]
))