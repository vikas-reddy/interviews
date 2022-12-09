/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
  /*
  [[1,2],[2,3],[3,4],[1,3]]

  [[1,2],[1,3],[2,3],[3,4]]

  [[1,2],[1,3],[2,3],[3,4]]


  [1,3][3,4],[4,6],[2,5]
  [1,3][2,5][3,4][4.6]
  */

  // Sort by interval beginning
  intervals.sort((a,b) => a[0] - b[0]);

  let count = 0;
  let upperLimit = intervals[0][1];
  for (let i = 1; i < intervals.length; i++) {
    if (upperLimit > intervals[i][0]) {
      count++;
      upperLimit = Math.min(upperLimit, intervals[i][1]);
    } else {
      upperLimit = intervals[i][1];
    }
  }
  return count;
};

console.log(eraseOverlapIntervals(
  [[1,2],[2,3],[3,4],[1,3]]
))