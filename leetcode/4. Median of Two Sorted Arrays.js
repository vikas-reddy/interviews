/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  const res = mergeArrays(nums1, nums2);
  if (res.length % 2 === 0) {
    return (res[res.length / 2] + res[res.length / 2 - 1]) / 2;
  } else {
    return res[Math.floor(res.length / 2)];
  }
};

/**
 * 
 * @param {number[]} nums1 
 * @param {number[]} nums2 
 * @return {number[]}
 */
var mergeArrays = function (nums1, nums2) {
  const len1 = nums1.length;
  const len2 = nums2.length;
  const res = [];
  let i = 0, j = 0;
  while (i < len1 && j < len2) {
    if (nums1[i] < nums2[j]) {
      res.push(nums1[i]);
      i++;
    } else {
      res.push(nums2[j]);
      j++;
    }
  }
  while (i < len1) {
    res.push(nums1[i]);
    i++;
  }
  while (j < len2) {
    res.push(nums2[j]);
    j++;
  }
  return res;
};

console.log(findMedianSortedArrays(
  [ 2, 5, 7, 9, 11 ],
  [ 3, 4, 8 ],
));