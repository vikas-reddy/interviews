/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  /**
   * Edge cases:
   *  [1], 1 -> []
   *  [1,2], 1 -> [1]
   * 
   * [1,2,3,4,5], 2 -> [1,2,3,5]
   * Go only till 3 (n+1)th element from last
   * Sliding window ends at [3,5], starts at [1,3]
   * i=1, second=1
   * jump
   * i=2, second=2
   * jump
   * i=3, second=3
   * 
   * jump
   * i=4, second=4
   * jump
   * i=5, second=5
   * 
   * [1,2], 1 -> [1]
   * first=1, second=1,i=1
   * first=1, second=2,i=2
   * first=1, second=null,i=3
   * 
   * (first,second): (1,3) -> (2,4) -> (3,5)
   * keep going until second.next === null
   */

  // Nothing to do
  if (!head) {
    return null;
  }

  let first = head, second = head;
  // Make n jumps to create the n-sized window
  let i = 1;
  while (i <= n && second) {
    second = second.next;
    i++;
  }

  // Remove first element
  if (!second) {
    return head.next;
  }

  // Keep sliding the n-sized window
  while (second.next) {
    first = first.next;
    second = second.next;
  }
  first.next = first.next.next;
  return head;
};