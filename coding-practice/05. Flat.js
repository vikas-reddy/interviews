
// This is a JavaScript coding problem from BFE.dev 
/**
 * @param { Array } arr
 * @param { number } depth
 * @returns { Array }
 */
function flatRecursive(arr, depth = 1) {
  if (arr.constructor !== Array) {
    return arr;
  }
  const result = [];
  const flatten = function (arr1, depth1) {
    for (const item of arr1) {
      if (Array.isArray(item) && depth1 < depth) {
        flatten(item, depth1 + 1);
      } else {
        result.push(item);
      }
    }
  }
  flatten(arr, 0);
  return result;
}

function flat(arr, depth = 1) {
  if (!Array.isArray(arr)) {
    return arr
  }

  return depth >= 0
    ? arr.reduce((acc,item) => acc.concat(flat(item, depth - 1)), [])
    : [arr]
}

/**
 * @param { Array } arr
 * @param { number } depth
 * @returns { Array }
 */
function flat(arr, depth = 1) {
  if (arr.constructor !== Array) {
    return arr;
  }
  const result = [];
  const stack = [];
  stack.push([arr, 0, 1]);

  while (stack.length) {
    let [currArr, startIdx, currDepth] = stack.pop();
    for (let i = startIdx; i < currArr.length; i++) {
      if (Array.isArray(currArr[i]) && currDepth <= depth) {
        stack.push([currArr, i + 1, currDepth]);
        currArr = currArr[i];
        i = -1;
        currDepth = currDepth + 1;
      } else {
        result.push(currArr[i]);
      }
    }
  }

  return result;
}

const arr = [1, [2], [3, [4, [5]]]];

console.log(
flat(arr)
)
// [1, 2, 3, [4]]

console.log(
flat(arr, 1)
)
// [1, 2, 3, [4]]

console.log(
flat(arr, 3)
)
// [1, 2, 3, 4]


