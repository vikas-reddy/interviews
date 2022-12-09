/**
 * @param {number[]} houses
 * @param {number} k
 * @return {number}
 */
var minDistance = function (houses, k) {
    houses.sort(function (a, b) { return a - b; });
    var n = houses.length;
    var medianDistances = new Array(n);
    for (var i = 0; i < n; i++) {
        medianDistances[i] = medianDistances[i] || new Array(n);
        for (var j = i; j < n; j++) {
            medianDistances[i][j] = medianDistances[i][j] || 0;
            var midIdx = Math.floor((i + j) / 2);
            for (var m = i; m <= j; m++) {
                medianDistances[i][j] += Math.abs(houses[midIdx] - houses[m]);
            }
        }
    }
    return minDistanceRec(houses, 0, k, medianDistances);
};
/**
 * @param {number[]} houses
 * @param {number} start
 * @param {number} k
 * @param {number[][]} medianDistances
 * @return {number}
 */
var minDistanceRec = function (houses, start, k, medianDistances) {
    if (k === 1 && start === houses.length - 1) {
        return 0;
    }
    if (k === 0 || start === houses.length - 1) {
        return Number.MAX_VALUE;
    }
    var currentMin = Number.MAX_VALUE;
    for (var i = start; i < houses.length; i++) {
        console.log("medianDist[".concat(start, "][").concat(i, "] = ").concat(medianDistances[start][i]));
        currentMin = Math.min(currentMin, medianDistances[start][i] + minDistanceRec(houses, i + 1, k - 1, medianDistances));
    }
    return currentMin;
};
console.log(minDistance(
// [1,4,8,10,20], 3
[2, 3, 5, 12, 18], 2
// [7, 4, 6, 1], 1
));
//# sourceMappingURL=1478.%20Allocate%20Mailboxes.js.map