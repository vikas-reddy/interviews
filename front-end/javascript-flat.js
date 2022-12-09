const arr = [1, 2, [3], [[4, 5, [6]]]];

const flat = function (array, depth) {
  depth = (depth === undefined ? 1 : depth);
  const result = [];
  let currentDepth = 0;
  const flatHelper = function (arr) {
    for (const element of arr) {
      if (Array.isArray(element)) {
        currentDepth++;
        if (currentDepth <= depth) {
          flatHelper(element);
          currentDepth--;
        } else {
          result.push(element)
        }
      } else {
        result.push(element);
      }
    }
  }
  flatHelper(array);
  return result;
};

// map() followed by flat()
const flatMap = function (array, callback) {
  const result = [];
  let currentDepth = 0;
  const flatMapHelper = function (arr) {
    for (let element of arr) {
      const r = (currentDepth < 1 ? callback(element) : element);
      if (Array.isArray(r) && currentDepth < 2) {
        currentDepth++;
        flatMapHelper(r);
        currentDepth--;
      } else {
        result.push(r);
      }
    }
  }
  flatMapHelper(array);
  return result;
};

console.log("arr: ", arr);
console.log("arr.flatMap: ", arr.flatMap(x => [x]));
console.log("flatMap(array)", flatMap(arr, x => [x]));