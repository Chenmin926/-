import { detectCycle } from './67-142. 环形链表 II'

export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function getInserctNode(head1: ListNode, head2: ListNode) {
  if (!head1 || !head2) return null;

  // 查找环
  let loop1 = detectCycle(head1);
  let loop2 = detectCycle(head2);

  // 如果两者都没环
  if (!loop1 && !loop2) {
    return noLoop(head1,head2)
  }
  // 都有环
  if (loop1 && loop2) {
    return bothLoop(loop1,loop2)
  }
  // 一个有环 一个无环 绝对不相交
  return null
}

// 两个链表无环的第一个相交节点
function noLoop(head1: ListNode, head2: ListNode) {
  if (head1 === null || head2 === null) {
    return null
  }
  let cur1 = head1;
  let cur2 = head2;
  // 链表的长度
  let n = 0;
  while (cur1.next != null) {
    n++;
    cur1 = cur1.next
  }
  while (cur2.next != null) {
    n--;
    cur2 = cur2.next;
  }
  // 两个while走完的时候，如果n为正数->h1更长，为负数->h2更长
  // 如果末尾不相等，那说明两条链表根本没有相交
  if (cur1 != cur2) {
    return null
  }

  // n 链表1长度减去链表2长度的值
  // 谁长 让cur1指向谁
  cur1 = n > 0 ? head1 : head2;
  cur2 = cur1 === head1 ? head2 : head1;

  // 取n的绝对值
  n = Math.abs(n);
  // 让长的链表先走差值步
  while (n) {
    cur1 = cur1.next;
    n--;
  }
  // 然后两者一起移动，直到两者相等
  while (cur1 !== cur2) {
    cur1 = cur1.next;
    cur2 = cur2.next;
  }
  return cur1;
}

// 两个有环链表的第一个相交节点
function bothLoop(head1: ListNode, head2: ListNode) {
  if(!head1 || !head2) return null
  // 找到两个链表的入环节点
  let loop1 = detectCycle(head1);
  let loop2 = detectCycle(head2);

  let cur1 = null;
  let cur2 = null;
  // 两者入环节点为同一个
  if (loop1 === loop2) {
    cur1 = head1;
    cur2 = head2;
    let n = 0;
    while (cur1 !== loop1) {
      cur1 = cur1.next;
      n++;
    }
    while (cur2 !== loop2) {
      cur2 = cur2.next;
      n--;
    }
    cur1 = n > 0 ? head1 : head2;
    cur2 = cur1 === head1 ? head2 : head1;
    n = Math.abs(n);
    while (n) {
      cur1 = cur1.next;
      n--;
    }
    while (cur1 !== cur2) {
      cur1 = cur1.next;
      cur2 = cur2.next;
    }
    return cur1;
  } else {
    // 两者入环节点不为同一个
    cur1 = loop1.next;
    while (cur1 !== loop1) {
      if (cur1 === loop2) {
        return loop1
      }
      cur1 = cur1.next;
    }
    return null;
  }
}