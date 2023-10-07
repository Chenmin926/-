
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}


function partition(head: ListNode | null, x: number): ListNode | null {
  if (!head) return null;
  let sStart: ListNode | null = null;
  let sEnd: ListNode | null = null;
  let bStart: ListNode | null = null;
  let bEnd: ListNode | null = null;

  while (head) {
    let next = head.next;
    head.next = null;
    if (head.val < x) {
      if (sStart === null) {
        sStart = head;
        sEnd = head
      } else {
        sEnd.next = head;
        sEnd = sEnd.next
      }
    } else {
      if (bStart === null) {
        bStart = head;
        bEnd = head
      } else {
        bEnd.next = head;
        bEnd = bEnd.next
      }
    }
    head = next
  }
  if (sStart === null) {
    return bStart
  }
  sEnd.next = bStart;
  return sStart
};