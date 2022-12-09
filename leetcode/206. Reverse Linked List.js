/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseListIterative = function (head) {
  let res = null;
  while (head) {
    const temp = head.next;
    head.next = res;
    res = head;
    head = temp;
  }
  return res;
};

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseListRecursive = function (head) {
  let res = null;
  var rlRecHelper = function (h) {
    if (!h) {
      return res;
    }
    const temp = h.next;
    h.next = res;
    res = h;
    rlRecHelper(temp);
  };
  rlRecHelper(head);
  return res;
};