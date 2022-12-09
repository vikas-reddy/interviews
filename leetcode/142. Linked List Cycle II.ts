/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function detectCycle(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) {
    return null;
  }
  let second = head.next;
  while (second) {
    let first = head; 
    while (second.next !== first && second !== first) {
      first = first.next;
    }
    if (second.next === first) {
      return first;
    }
    second = second.next;
  }
  return null;
};