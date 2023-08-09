export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  // 边界情况，有一条链表为空 无需合并
  if (list1 === null) return list2;
  if (list2 === null) return list1;
  // 取首位最小值的节点
  let head = list1.val <= list2.val ? list1 : list2;
  // 比较指针
  let cur1 = head.next;
  let cur2: ListNode | null = head === list1 ? list2 : list1;
  // 衔接指针
  let pre = head;
  // 两个比较指针没有为空
  while (cur1 && cur2) {
    if (cur1.val <= cur2.val) {
      pre.next = cur1;
      cur1 = cur1.next
    } else {
      pre.next = cur2;
      cur2 = cur2.next
    }
    pre = pre.next
  }
  // 最终剩下的那条链表直接拼接
  pre.next = cur1 ? cur1 : cur2;
  return head;
};