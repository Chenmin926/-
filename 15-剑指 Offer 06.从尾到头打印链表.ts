export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function reversePrint(head: ListNode | null): number[] {
  if (!head) return [0]
  let ans: number[] = [];
  while (head) {
    ans.unshift(head.val)
    head = head.next
  }
  return ans
};