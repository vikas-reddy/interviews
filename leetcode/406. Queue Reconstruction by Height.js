/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueueNew = function (people) {
  people.sort((a,b) => {
    if (a[0] !== b[0]) {
      return b[0] - a[0];
    } else {
      return a[1] - b[1];
    }
  });
  /** @type {number[][]} */
  const queue = [];
  people.forEach(person => {
    const [,position] = person;
    queue.splice(position, 0, person);
  });
  return queue;
}

/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function (people) {
  /**
   * people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
   * [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
   * 
   * people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]
   * [[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]
   * 
   * people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
   * [ [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 5, 0 ], [ 5, 2 ], [ 4, 4 ] ] 
   * 
   * 1. Group by k, sort by k
   * [[5,0],[7,0],[6,1],[7,1],[5,2],[4,4]]
   * [[4,0],[5,0],[6,0],[2,2],[3,2],[1,4]]
   * 
   * 1. First element is [lowest h, 0]
   * 2. 
   * 
   * [[7,0],[4,4],[7,1],[6,1],[5,2]]
   * [[5,0]]
   * 
   * [[4,4],[7,1],[6,1],[5,2]]
   * [[5,0],[7,0]]
   * 
   * [[4,4],[7,1],[6,1],[5,2]]
   * [[5,0],[7,0]]
   * 
   * [[4,4],[6,1],[5,2]]
   * [[5,0],[7,0],[7,1]]
   * 
   * [[4,4],[5,2]]
   * [[5,0],[7,0],[6,1],[7,1]]
   * 
   * [[5,2]]
   * [[5,0],[7,0],[6,1],[7,1],[4,4]]
   * 
   * []
   * [[5,0],[7,0],[5,2],[6,1],[7,1],[4,4]]
   */

  /** @type {number[][]} */
  const queue = [];
  const peopleCopy = [...people];
  let i = 0;
  while (peopleCopy.length) {
    // Look for people[i] that can be inserted
    const entry = peopleCopy[i];
    if (canInsertEntry(queue, entry)) {
      // Insert people[i] at its correct location
      insertEntry(queue, entry);
      // Remove the entry
      peopleCopy.splice(i, 1);
    }
    i++;
    if (i >= peopleCopy.length) {
      i = 0;
    }
  }
  return queue;
};

/**
 * @param {number[][]} queue
 * @param {number[]} entry
 * @return {boolean}
 */
var canInsertEntry = function (queue, entry) {
  const [height, position] = entry;
  if (position > queue.length) {
    return false;
  }

  let tallerCount = 0;
  for (let i = 0; i < queue.length; i++) {
    const [heightI, positionI] = queue[i];
    if (heightI >= height) {
      tallerCount++;
    }
  }
  return tallerCount >= position;
}

/**
 * @param {number[][]} queue
 * @param {number[]} entry
 * @return {void}
 */
var insertEntry = function (queue, entry) {
  const [height, position] = entry;

  // Go until height is respected
  let idx = 0;
  let tallerCount = 0;
  while (idx < queue.length && tallerCount < position) {
    if (queue[idx][0] >= height) {
      tallerCount++;
    }
    idx++;
  }

  queue.splice(idx, 0, entry);

  idx++;

  // Reposition smaller entries after idx
  while (idx < queue.length) {
    if (queue[idx][0] <= height && idx-1 >= 0) {
      const temp = queue[idx];
      queue[idx] = queue[idx-1];
      queue[idx-1] = temp;
    }
    idx++;
  }
}

/**
 * 
 * @param {number[]} entry
 * @param {number[][]} queue
 */
var printQueue = function (entry, queue) {
  console.log(
    `(${entry[0]},${entry[1]})`,
    ` ---> `,
    queue.map(e => `(${e[0]},${e[1]})`)
      .join(',')
  );
}

console.log(
  reconstructQueue(
    // [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
    // [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]
    [[9,0],[7,0],[1,9],[3,0],[2,7],[5,3],[6,0],[3,4],[6,2],[5,2]]
  )
)