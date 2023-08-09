export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function deleteNode(head: ListNode | null, val: number): ListNode | null {
  if (!head) return null;
  if (head.val === val) return head.next
  let pre = head;
  let cur: ListNode | null = head;
  while (cur) {
    if (cur.val === val) {
      pre.next = cur.next
      return head
    }
    pre = cur;
    cur = cur.next
  }
  return head
};