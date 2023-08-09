export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  if (!head) return null;
  if (!head.next) return head;
  let pre: ListNode | null = null;
  while (head) {
    let next: ListNode | null = head.next;
    head.next = pre;
    pre = head;
    head = next
  }
  return pre
};