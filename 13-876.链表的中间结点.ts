export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function middleNode(head: ListNode | null): ListNode | null {
  if (!head) return null;
  if (!head.next) return head;
  // 快慢指针
  let slow = head;
  let fast: ListNode | null = head;

  while (slow.next && fast?.next) {
    slow = slow.next;
    fast = fast.next.next
  }

  return slow
};