export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

/**
 * 利用了一个额外的辅助栈
 * 先遍历一次链表，将元素依次进行入栈操作
 * 那么链表尾部就会在栈顶
 * 然后再次从头遍历链表且每次取出栈顶元素与之比较
 * 如果不一样则为false，如果遍历完依旧相同，那么结果为true
 */
function isPalindrome1(head: ListNode): boolean {
  if (!head) return false;
  if (!head.next) return true;
  // 辅助栈
  let stack: number[] = [];
  // 遍历链表进行入栈操作
  let cur = head;
  while (cur) {
    stack.push(cur.val);
    cur = cur.next
  };
  // 再次遍历链表，然后与栈顶进行比较
  while (head) {
    if (head.val === stack.pop()) {
      head = head.next
    } else {
      return false
    }
  }
  return true
}

/**
 * 利用快慢指针找到中点
 * 如果长度n为奇数 n则为中点，为偶数则为上中点
 * 然后翻转中点后的部分
 * 再利用头尾指针一一对比向中靠拢
 * 如果不一致 则ans为false
 * 最后要还原链表 相当于有两次翻转操作
 */
function isPalindrome2(head: ListNode): boolean {
  if (!head) return false;
  if (!head.next) return true;

  // 利用快慢指针找到中点位置
  let n1 = head;
  let n2 = head;
  while (n1.next && n2.next.next) {
    n1 = n1.next;
    n2 = n2.next.next;
  }
  // 此时n1就会指向要找的中点
  // 让中点后的节点翻转
  n2 = n1.next
  // 中点后先指向null
  n1.next = null;
  let n3 = null;
  while (n2) {
    n3 = n2.next;
    n2.next = n1;
    n1 = n2;
    n2 = n3;
  }
  // 此时翻转完成 假设结构为1->2->3->2->1
  // 那么此时就会变成1->2->3<-2<-1
  // 保存翻转后的尾部
  n3 = n1;
  // n2指向头部 此时n1指向末尾部分
  n2 = head;
  let ans = true;
  // 两个指针逐步向中间移动并进行比较
  while (n1 && n2) {
    if (n1.val !== n2.val) {
      ans = false;
    }
    n1 = n1.next;
    n2 = n2.next
  }
  // 还原链表
  n1 = n3.next
  n3.next = n3;
  while (n1) {
    n2.next = n1.next;
    n1.next = n3;
    n3 = n1;
    n1 = n2;
  }
  return ans;
}