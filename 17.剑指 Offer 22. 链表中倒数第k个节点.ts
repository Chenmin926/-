export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function getKthFromEnd(head: ListNode | null, k: number): ListNode | null {
  if (!head) return null
  if (k === 1 && !head.next) return head;
  // 快指针
  let fast: ListNode | null = head;
  while (k && fast) {
    fast = fast.next;
    k--
  }
  if (!fast) return head;
  while (fast) {
    head = head!.next;
    fast = fast.next;
  }
  return head;
};