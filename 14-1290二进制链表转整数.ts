export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function getDecimalValue(head: ListNode | null): number {
  if (!head?.next) {
    return head?.val as number
  }
  // 存放数据的arr
  let arr: number[] = [];
  let ans: number = 0;
  while (head) {
    arr.unshift(head.val);
    head = head.next
  }
  for (let i = 0; i < arr.length; i++) {
    ans += arr[i] * Math.pow(2, i);
  }
  return ans
}; 