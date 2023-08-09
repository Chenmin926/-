export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

// 暴力map解法
function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (!head) return null;

  let map = new Map();
  let start: ListNode | null = null;
  let tail: ListNode | null = null;

  while (head) {
    if (map.has(head.val)) {
      map.set(head.val, map.get(head.val) + 1)
    } else {
      map.set(head.val, 1)
    }
    head = head.next
  }

  map.forEach((v, k) => {
    if (v === 1) {
      if (!start && !tail) {
        start = new ListNode(k);
        tail = start
      } else {
        tail!.next = new ListNode(k);
        tail = tail!.next
      }
    }
  });

  return start
};

function deleteDuplicates1(head: ListNode | null): ListNode | null {
  if (!head) return null;

  // 辅助节点 因为有可能头结点就重复了需要删除
  let dummy = new ListNode(0, head);
  let cur = dummy;
  while (cur.next && cur.next.next) {
    if (cur.next.val === cur.next.next.val) {
      const x = cur.next.val;
      while (cur.next && cur.next.val === x) {
        cur.next = cur.next.next;
      }
    } else {
      cur = cur.next;
    }
  }
  return dummy.next
}