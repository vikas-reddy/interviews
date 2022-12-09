/**
 * @param {number[][]} ranges
 * @param {number} left
 * @param {number} right
 * @return {boolean}
 */
var isCovered = function (ranges, left, right) {
  ranges.sort((a,b) => {
    return (a[0] !== b[0])
      ? a[0] - b[0] // sort by left first
      : a[1] - b[1]; // sort by right next
  });

  /**
   * [[1,2],[3,4],[5,6]]
   * 2,5
   * 2
   * 3
   * 5
   * 7
   */
  let i = 0;
  let current = left;
  while (i < ranges.length && current <= right) {
    const [min, max] = ranges[i];
    if (current < min) {
      return false;
    }
    if (current <= max) {
      current = max + 1;
    }
    i++;
  }
  return (current > right);

  /*
  Working: brute force
  for (let i = left; i <= right; i++) {
    let matchFound = false;
    for (let j = 0; j < ranges.length; j++) {
      const [min, max] = ranges[j];
      if (i >= min && i <= max) {
        matchFound = true;
        break;
      }
    }
    if (!matchFound) {
      return false;
    }
  }
  return true;
  */
};

console.log(
  isCovered([[13,43],[19,20],[32,38],[26,33],[3,38],[16,31],[26,48],[27,43],[12,24]],
  36,
  45)
)