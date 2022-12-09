/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  let i = 0;
  while (i < intervals.length && intervals[i][0] < newInterval[0]) {
    i++;
  }

  // Merge new into old
  intervals = [...intervals.slice(0, i), newInterval, ...intervals.slice(i)]

  const result = [];
  for (let i = 0; i < intervals.length; ) {
    let upperLimit = intervals[i][1];
    let j = i + 1;
    while (j < intervals.length && upperLimit >= intervals[j][0]) {
      upperLimit = Math.max(upperLimit, intervals[j][1]);
      j++;
    }
    result.push([intervals[i][0], upperLimit]);
    i = j;
  }
  return result;
};