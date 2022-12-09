class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

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

function addTwoNumbersRecursive(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  if (l1 !== null && l2 !== null) {
    const remainder = Math.floor( (l1.val + l2.val) / 10 ) ;
    const result: ListNode = new ListNode((l1.val + l2.val) % 10, null);
    addTwoNumbersSecondary(l1.next, l2.next, result, remainder);
    return result;
  }
  return null;
};

function addTwoNumbersSecondary(l1: ListNode | null, l2: ListNode | null, result: ListNode | null, remainder: number) {
  if (l1 === null && l2 === null && remainder === 0) {
    return;
  }
  const first = l1 ? l1.val : 0;
  const second = l2 ? l2.val : 0;
  const currentRemainder = Math.floor( (first + second + remainder) / 10 ) ;
  const currentResult: ListNode = new ListNode((first + second + remainder) % 10, null);
  if (result) {
    result.next = currentResult;
  }
  addTwoNumbersSecondary(l1?.next || null, l2?.next || null, currentResult, currentRemainder);
};


function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  let remainder = 0;
  let result: ListNode | null = null;
  let lastInResult: ListNode | null = null;

  while (l1 !== null || l2 !== null || remainder > 0) {
    const first = l1 ? l1.val : 0;
    const second = l2 ? l2.val : 0;
    const currentRemainder = Math.floor( (first + second + remainder) / 10 );
    const currentResult = new ListNode( (first + second + remainder) % 10, null);
    if (!result) {
      result = currentResult;
      lastInResult = currentResult;
    } else if (lastInResult) {
      lastInResult.next = currentResult;
      lastInResult = currentResult;
    }
    remainder = currentRemainder;
    l1 = l1 ? l1.next : null;
    l2 = l2 ? l2.next : null;
  }
  return result;
}