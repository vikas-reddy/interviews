/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
 var merge = function (intervals) {
  intervals.sort((a,b) => a[0] - b[0]);
  const result = [];
  let i = 0;
  while (i < intervals.length) {
    let j = i + 1;
    let upperLimit = intervals[i][1];
    while (j < intervals.length && intervals[j][0] <= upperLimit) {
      upperLimit = Math.max(upperLimit, intervals[j][1]);
      j++;
    }
    result.push([intervals[i][0], upperLimit]);
    i = j;
  }
  return result;
};