export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}


function swapPairs(head: ListNode | null): ListNode | null {
  if (head === null) return null;
  if (head.next === null) return head
  let start = head;
  head = start.next;
  // 交换第一组
  reversNode(start);
  let lastEnd = start;

  while (lastEnd.next) {
    start = lastEnd.next;
    if (!start.next) {
      return head
    }
    let end = start.next
    reversNode(start)
    lastEnd.next = end
    lastEnd = start
  }
  return head



  function reversNode(start: ListNode): void {
    let end = start.next?.next;
    let next = start.next
    start.next = end!
    next!.next = start
  }
};

let n4 = new ListNode(4);
let n3 = new ListNode(3, n4);
let n2 = new ListNode(2, n3);
let n1 = new ListNode(1, n2);
console.log(swapPairs(n1))