export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

// 将指针指向同一起点
function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  if (!headA || !headB) return null;
  // 获取链表长度
  let haL: number = getLength(headA);
  let hbL: number = getLength(headB);
  let n: number = 0;
  let cur1: ListNode | null = haL >= hbL ? headA : headB;
  let cur2: ListNode | null = cur1 === headA ? headB : headB
  if (haL >= hbL) {
    cur1 = headA;
    cur2 = headB
    n = haL - hbL
  } else {
    cur1 = headB;
    cur2 = headA;
    n = hbL - haL
  }
  while (n) {
    cur1 = cur1?.next;
    n--
  }

  while (cur1 && cur2) {
    if (cur1 === cur2) {
      return cur1
    }
    cur1 = cur1.next;
    cur2 = cur2.next
  }
  return null

  // 获取链表长度辅助函数
  function getLength(head: ListNode | null): number {
    if (!head) return 0
    let n = 0;
    while (head) {
      n++;
      head = head.next
    }
    return n
  }
};

// hash表解法
function getIntersectionNode1(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  if (!headA || !headB) return null;
  const map = new WeakMap();
  while (headA) {
    map.set(headA, headA.val);
    headA = headA.next
  }
  while (headB) {
    if (map.has(headB)) return headB;
    headB = headB.next
  }
  return null
}