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
var ListNode = /** @class */ (function () {
    function ListNode(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
    return ListNode;
}());
function detectCycle(head) {
    if (head === null || head.next === null) {
        return null;
    }
    var second = head.next;
    while (second) {
        var first = head;
        while (second.next !== first && second !== first) {
            first = first.next;
        }
        if (second.next === first) {
            return first;
        }
        second = second.next;
    }
    return null;
}
;
//# sourceMappingURL=142.%20Linked%20List%20Cycle%20II.js.map