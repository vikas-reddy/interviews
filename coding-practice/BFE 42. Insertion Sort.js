
/**
 * @param {number[]} arr
 */
function insertionSort(arr) {
  // your code here
  for (let i = 1; i < arr.length; i++) {
    // arr[0...i-1] is already sorted
    // Insert arr[i] into the sorted array
    for (let j = i - 1; j >= 0 && arr[j] > arr[i]; j--) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
}