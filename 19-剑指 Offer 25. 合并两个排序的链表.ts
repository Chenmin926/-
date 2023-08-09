export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  if (!l1 && !l2) return null;
  if (!l1) return l2;
  if (!l2) return l1;

  let start: ListNode | null = null;
  let tail: ListNode | null = null;

  while (l1 && l2) {
    let newNode: ListNode | null = null
    if (l1.val <= l2.val) {
      newNode = new ListNode(l1.val);
      l1 = l1.next;
    } else {
      newNode = new ListNode(l2.val);
      l2 = l2.next;
    }
    if (!start) {
      start = newNode;
      tail = newNode;
    } else {
      tail!.next = newNode;
      tail = tail!.next
    }
  }

  while (l1) {
    tail!.next = new ListNode(l1.val);
    tail = tail!.next
    l1 = l1.next
  }

  while (l2) {
    tail!.next = new ListNode(l2.val);
    tail = tail!.next
    l2 = l2.next
  }

  return start;
};

function mergeTwoLists1(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  // 判断边界
  if (!l1 && !l2) return null;
  if (!l1) return l2;
  if (!l2) return l1;

  // 头部
  let head = l1.val <= l2.val ? l1 : l2;
  // 比较指针
  let cur1: ListNode | null = head.next;
  let cur2: ListNode | null = head === l1 ? l2 : l1;
  // 辅助递增指针
  let tail = head;

  while (cur1 && cur2) {
    if (cur1.val <= cur2.val) {
      tail.next = cur1;
      cur1 = cur1.next
    } else {
      tail.next = cur2;
      cur2 = cur2.next
    }
    tail = tail.next
  }

  tail.next = cur1 || cur2;
  return head;
};