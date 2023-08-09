export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

// 翻转了链表 然后进行对比 耗时太长
function isPalindrome(head: ListNode | null): boolean {
  if (!head?.next) return true
  let cur1 = head;
  let revers = reverseList(head);
  console.log('cur1', cur1);
  console.log('revers', revers)
  while (cur1) {
    if (cur1.val !== revers?.val) {
      return false
    }
    cur1 = cur1.next!;
    revers = revers.next
  }
  return true

  function reverseList(head: ListNode | null): ListNode | null {
    if (!head) return null
    if (!head.next) return head;
    let tail = new ListNode(head.val);
    head = head.next
    while (head) {
      let n = new ListNode(head.val);
      n.next = tail;
      tail = n;
      head = head.next
    }
    return tail
  };
};

// 将链表值放入数组然后进行比较
function isPalindrome1(head: ListNode | null): boolean {
  if (!head?.next) return true;
  let arr: any[] = [];
  while (head) {
    arr.push(head.val);
    head = head.next
  }
  return arr.join('') === arr.reverse().join('')
}

// 快慢指针找到分隔部分 翻转尾部 然后对比是否为回文
function isPalindrome2(head: ListNode | null): boolean {
  if (!head || !head.next) return true;

  let firstEnd = endOfFirstHalf(head);
  let secondStart = reverseList(firstEnd!.next);
  // 判断是否回文
  let p1: ListNode | null = head;
  let p2: ListNode | null = secondStart;
  let res: boolean = true;
  while (res && p2) {
    if (p1?.val !== p2.val) {
      res = false
    }
    p1 = p1!.next;
    p2 = p2.next
  }
  // 链表还原
  firstEnd.next = reverseList(secondStart);
  return res

  // 慢指针一次一步 快指针一次两步
  function endOfFirstHalf(head: ListNode | null): ListNode {
    let slow = head;
    let fast = head;
    while (slow?.next && fast?.next?.next) {
      slow = slow.next;
      fast = fast.next.next
    }
    return slow as ListNode
  }

  // 翻转链表
  function reverseList(head: ListNode | null): ListNode | null {
    if (!head) return null
    if (!head.next) return head;
    let pre = null;
    while (head) {
      let next: any = head.next;
      head.next = pre;
      pre = head
      head = next
    }
    return pre
  };
}

