export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}


function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  if (head === null) return null
  let start = head;
  let end = getEndNode(start, k);
  // 如果end为null 表示不足k个
  if (end === null) {
    return head;
  }
  // 凑齐了第一组
  head = end;
  // 第一组翻转
  reverseNode(start, end)
  // 上一组翻转后的末尾节点
  let lastEnd = start;
  // 持续翻转剩余节点
  while (lastEnd.next !== null) {
    start = lastEnd.next;
    end = getEndNode(start, k);
    if (end === null) {
      return head
    };
    reverseNode(start, end);
    lastEnd.next = end;
    lastEnd = start
  }
  return head

  /**
   * 找到链表中指定节点
   * @param start 起始节点
   * @param k 个数
   */
  function getEndNode(start: ListNode | null, k: number): ListNode | null {
    while (--k !== 0 && start !== null) {
      start = start.next
    }
    return start
  }

  function reverseNode(start: ListNode, end: ListNode): void {
    end = end.next!
    let pre: ListNode | null = null;
    let cur: ListNode = start;
    let next: ListNode | null = null;
    while (cur !== end) {
      next = cur.next!;
      cur.next = pre;
      pre = cur;
      cur = next;
    }
    start.next = end;
  }
};