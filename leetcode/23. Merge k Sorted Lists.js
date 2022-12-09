/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  let result = null, resultTail = null;
  // Note that this while loop runs forever
  while (true) {
    let minHeadIdx = -1, minHeadVal = Number.MAX_SAFE_INTEGER;

    // Find the smallest head
    for (let i = 0; i < lists.length; i++) {
      if (lists[i] && lists[i].val < minHeadVal) {
        minHeadVal = lists[i].val;
        minHeadIdx = i;
      }
    }

    // Break, if there are no lists to merge
    if (minHeadIdx === -1) {
      break;
    }

    const minNode = lists[minHeadIdx];
    lists[minHeadIdx] = lists[minHeadIdx].next;

    // A little efficiency gain by maintaining the tail pointer of the
    // result list
    if (resultTail) {
      resultTail.next = minNode;
      minNode.next = null
      resultTail = minNode;
    } else {
      result = minNode;
      resultTail = minNode;
      resultTail.next = null;
    }
  }
  return result;
};