/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  var calcArea = (a, b) => Math.min(height[a],height[b]) * (b-a);
  let left = 0, right = height.length - 1;
  let area = 0;
  while (left < right) {
    area = Math.max(area, calcArea(left, right));
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return area;
};

/**
 * @param {number[]} height
 * @return {number}
 */
var maxAreaOld = function (height) {
  var calcArea = (a, b) => Math.min(height[a],height[b]) * (b-a);
  let left = 0, right = height.length - 1;
  let area = 0;
  while (left < right) {
    area = Math.max(area, calcArea(left, right));
    let biggerAreaFound = false;
    if (height[left] < height[right]) {
      for (let ptr = left + 1; ptr < right; ptr++) {
        if (height[ptr] > height[left]) {
          left = ptr;
          biggerAreaFound = true;
          break;
        }
      }
    } else {
      for (let ptr = right - 1; ptr > left; ptr--) {
        if (height[ptr] > height[right]) {
          right = ptr;
          biggerAreaFound = true;
          break;
        }
      }
    }
    if (!biggerAreaFound) {
      break;
    }
  }
  return area;
};

console.log(
  maxArea(
    [1, 17, 16, 11, 14, 2, 15, 6, 14, 1]
  )
)

/**
 * [0,1,2,3,4,5,6,7,8,9]
 * left <-----------> right
 * min(arr[left], arr[right]) * (right - left)
 * 
 * min(a,b) * dist
 * a * dist vs (a+1) * (dist - 1)
 * a * dist vs  a*dist - 1 + dist - a
 * a * dist vs  a*dist + dist - (a + 1)
 * min of dist = 1
 * min of a = 0
 * so, (a+1) * (dist-1) is always greater than a*dist
 */