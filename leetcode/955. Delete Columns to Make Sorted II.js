/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSizeOld = function (strs) {
  if (strs.length === 0) {
    return 0;
  }
  const len = strs[0].length;
  let deletions = [];

  const compare = (str1, str2, uptoIdx) => {
    let first = Array.from(str1)
      .filter((v, idx) => idx <= uptoIdx && !deletions.includes(idx))
      .join("");
    let second = Array.from(str2)
      .filter((v, idx) => idx <= uptoIdx && !deletions.includes(idx))
      .join("");
    console.log("compare", first, second);

    if (first < second) {
      return -1;
    } else if (first > second) {
      return 1;
    }
    return 0;
  };

  for (let i = 0; i < len; i++) {
    let shouldDelete = false;
    for (let j = 0; j < strs.length - 1; j++) {
      if (compare(strs[j], strs[j+1], i) > 0) {
        shouldDelete = true;
        break;
      }
    }
    if (shouldDelete) {
      deletions.push(i);
    }
  }
  return deletions.length;
};

/**
 * @param {string[]} strs
 * @return {number}
 */
 var minDeletionSize = function(strs) {
  if (strs.length === 0) {
    return 0;
  }
  
  const sorted = Array(strs.length - 1).fill(false);
  let deletions = 0;

  for (let j = 0; j < strs[0].length; j++) {
    let i = 0;
    for (i = 0; i < strs.length - 1; i++) {
      if (!sorted[i] && strs[i][j] > strs[i+1][j]) {
        deletions++;
        break;
      }
    }

    // All strs[*][0..(j)] are sorted
    if (i === strs.length - 1) {
      for (i = 0; i < strs.length - 1; i++) {
        sorted[i] = sorted[i] || strs[i][j] < strs[i+1][j];
      }
    }
  }
  return deletions;
};

console.log(
  minDeletionSize(
    ["ca","bb","ac"]
    // ["xga","xfb","yfa"]
  )
)