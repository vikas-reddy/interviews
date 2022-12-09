/**
 * @param {number[]} arr
 */
function selectionSort(arr) {
  // your code here
  for (let i = 0; i < arr.length - 1; i++) {
    const smallestIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[smallestIdx]) {
        smallestIdx = j;
      }
    }
    [arr[smallestIdx], arr[i]] = [arr[i], arr[smallestIdx]];
  }
}