const reduce = function (arr, callback, defaultValue = 0) {
    let res = defaultValue;
    for (let i = 0; i < arr.length; i++) {
        res = callback(res, arr[i])
    }
    return res;
}

const map = function (arr, callback) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        res = callback(arr[i])
    }
    return res;
}

const filter = function(arr, callback) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i])) {
            res.push(arr[i]);
        }
    }
    return res;
}

const sort = function (arr, comparatorFn = (a,b) => a-b) {
    const partition = function (lo, hi) {
        const pivot = arr[hi];
        let i = lo - 1;
        for (let j = lo; j <= hi; j++) {
            // if (arr[j] < pivot) {
            if (comparatorFn(pivot, arr[j]) > 0) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
        i++;
        [arr[i], arr[hi]] = [arr[hi], arr[i]];
        return i;
    };

    const quickSort = function (lo, hi) {
        if (lo < hi) {
            const pivotIdx = partition(lo, hi);
            quickSort(lo, pivotIdx - 1);
            quickSort(pivotIdx + 1, hi);
        }
    };

    quickSort(0, arr.length - 1);
    return arr;
}

console.log(sort(
    // [2, 12, 1, 5, 12, 14, 4, 8, 6, 14]
    // [17, 8, 0, 19, 3, 15, 4, 7, 12, 9]
    // [9, 6, 13, 0, 15, 16, 19, 16, 2, 5, 11, 8, 1, 13, 13, 7, 0, 12, 16, 3]
    ['v', 'i', 'k', 'a', 's'], (a,b) => (a > b)
))