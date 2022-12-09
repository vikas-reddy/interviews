function knapsack(weights, profits, capacity) {
    var cache = new Array(capacity + 1);
    for (var i = 0; i < capacity + 1; i++) {
        cache[i] = new Array(weights.length);
    }
    return knapsackRecursive(weights, profits, capacity, 0, cache);
}
function knapsackRecursive(weights, profits, capacity, startIdx, cache) {
    var len = weights.length;
    if (capacity <= 0 || startIdx >= len) {
        return 0;
    }
    if (cache[capacity][startIdx] !== undefined) {
        return cache[capacity][startIdx];
    }
    var minWithoutElement = knapsackRecursive(weights, profits, capacity, startIdx + 1, cache);
    var minWithElement = 0;
    if (weights[startIdx] <= capacity) {
        minWithElement = profits[startIdx] + knapsackRecursive(weights, profits, capacity - weights[startIdx], startIdx + 1, cache);
    }
    cache[capacity][startIdx] = Math.max(minWithoutElement, minWithElement);
    return cache[capacity][startIdx];
}
console.log(knapsack([2, 3, 1, 4], [4, 5, 3, 7], 5));
//# sourceMappingURL=knapsack.js.map