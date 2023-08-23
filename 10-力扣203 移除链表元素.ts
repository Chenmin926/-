export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

// 改变原有链表
function removeElements(head: ListNode | null, val: number): ListNode | null {
  if (!head) return null;
  let cur: ListNode | null = head;
  // 首部去重
  while (cur) {
    if (cur.val !== val) {
      head = cur
      break
    }
    cur = cur.next
  }
  // 全链表都需去重
  if (!cur) return null
  let pre: any = null
  while (cur) {
    if (cur.val === val) {
      pre.next = cur.next
    } else {
      pre = cur
    }
    cur = cur.next
  }
  return head
};

// 创建新的链表
function removeElements1(head: ListNode | null, val: number): ListNode | null {
  if (!head) return null;
  let start: ListNode | null = null;
  let end: ListNode | null = null;

  while (head) {
    if (head.val !== val) {
      start = new ListNode(head.val);
      end = start;
      head = head.next
      break
    }
    head = head.next
  }
  if (!head && !start) return null
  while (head) {
    if (head.val !== val) {
      end!.next = new ListNode(head.val)
      end = end!.next
    }
    head = head.next
  }

  return start
};