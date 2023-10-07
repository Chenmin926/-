
export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function detectCycle(head: ListNode | null): ListNode | null {
  if (!head || !head.next || !head.next.next) return null;

  // 快慢指针
  let fast: ListNode  = head.next.next;
  let slow: ListNode = head.next;
  
  // 第一次追赶
  while (fast !== slow) {
    if (fast.next === null || fast.next.next === null) {
      return null
    }
    fast = fast.next.next;
    slow = slow.next
  }
  // 走到这一步说明有环
  fast = head;
  while (fast !== slow) {
    slow = slow.next;
    fast = fast.next
  }
  return fast
};