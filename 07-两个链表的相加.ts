export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}


function getListLength(head: ListNode | null): number {
  let length: number = 0;
  while (head) {
    length++;
    head = head.next
  }
  return length
}

function sumNode(head1: ListNode | null, head2: ListNode | null): ListNode {
  let h1Length = getListLength(head1);
  let h2Length = getListLength(head2);
  let l = h1Length >= h2Length ? head1 : head2;
  let s = l === head1 ? head2 : head1;
  let curL = l;
  let curS = s;
  let lastL = null;
  let carry = 0;
  let sum = 0;

  // l、s都不为空
  while (curS) {
    sum = (curS.val + curL!.val + carry) % 10;
    carry = Math.floor((curS.val + curL!.val + carry) / 10);
    curL!.val = sum;
    lastL = curL;
    curL = curL!.next;
    curS = curS.next
  }

  // s空 l不空
  while (curL) {
    sum = (curL?.val + carry) % 10;
    carry = Math.floor((curL?.val + carry) / 10);
    curL.val = sum;
    lastL = curL;
    curL = curL.next
  }

  // s、l都为空 但是还有进位
  if (carry) {
    lastL!.next = new ListNode(carry)
  }

  return l as ListNode
}

let l4 = new ListNode(3);
let l3 = new ListNode(4, l4);
let l2 = new ListNode(6, l3);
let l1 = new ListNode(1, l2);

let s3 = new ListNode(7);
let s2 = new ListNode(9, s3);
let s1 = new ListNode(7, s2);

(function () {
  let res = sumNode(l1, s1);
  while (res) {
    console.log(res.val);
    res = res.next!
  }
})()