/*
   Sorted deck: [2,3,5,7,11,13,17]
   1. least element always comes first
   [3, 5, 7, 11, 13, 17]

   []
   17: [17]
   13: [13, 17]
   11: [11, 17, 13]
   7: [7, 13, 11, 17]
   5: [5, 17, 7, 13, 11]
   3: [3, 11, 5, 17, 7, 13]
   2: [2, 13, 3, 11, 5, 17, 7]

   Algo:
   1. Sort the array in decreasing order
   2. Result array = []
   3. Insert the highest element into array
   4. Insert next element, after removing it from the end of the array and putting at position 1
*/
/**
 * @param {number[]} deck
 * @return {number[]}
 */
var deckRevealedIncreasing = function (deck) {
    deck.sort(function (a, b) { return a - b; });
    var result = [];
    var curr;
    while (curr = deck.pop()) {
        var lastElem = result.pop();
        if (lastElem) {
            result.splice(0, 0, lastElem);
        }
        result.splice(0, 0, curr);
    }
    return result;
};
console.log(deckRevealedIncreasing([17, 13, 11, 2, 3, 5, 7]));
console.log(deckRevealedIncreasing([1, 1000]));
//# sourceMappingURL=950.%20Reveal%20Cards%20In%20Increasing%20Order.js.map