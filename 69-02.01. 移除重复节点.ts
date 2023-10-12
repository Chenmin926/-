// 编写代码，移除未排序链表中的重复节点。保留最开始出现的节点。

// 示例1:

// 输入：[1, 2, 3, 3, 2, 1]
// 输出：[1, 2, 3]
// 示例2:

// 输入：[1, 1, 1, 1, 2]
// 输出：[1, 2]

export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function removeDuplicateNodes(head: ListNode | null): ListNode | null {
  if (!head) return null;
  let map = {[head.val]:true};
  let cur = head;
  let ans = cur;
  head = head.next
  while (head) {
    if (!map[head.val]) {
      cur.next = new ListNode(head.val);
      cur = cur.next
    }
    map[head.val] = true
    head = head.next
  }
  return ans
};