
// This is a JavaScript coding problem from BFE.dev 

/**
 * @param {Array<any>} list
 * @returns {void}
 */
function moveZeros(list) {
  let l = 0, r = 0;
  while (l < list.length && r < list.length) {
    if (list[l] === 0 && list[r] !== 0) {
      [list[l], list[r]] = [list[r], list[l]];
      l++;
      r++;
    } else if (list[l] !== 0) {
      l++;
      r = l;
    } else if (list[r] === 0) {
      r++;
    }
  }

  // Alternative
  let left = 0;
  for (let right = 0; right < list.length; right++) {
    if (list[right] !== 0) {
      [list[left], list[right]] = [list[right], list[left]];
      left++;
    }
  }
}


const list = [1, 0, 0, 2, 3]
moveZeros(list)
console.log(list) // [1,2,3,0,0]