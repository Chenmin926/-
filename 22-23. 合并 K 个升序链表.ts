export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (!lists.length) return null;
  if (lists.length === 1) return lists[0];

  // 封装为优先级队列
  class Queue {
    private data: Array<ListNode | null> = [];
    constructor(data: Array<ListNode | null>) {
      this.data = data.filter(el => el);
      this.sort();
    }

    sort() {
      this.data.sort((a, b) => a!.val - b!.val);
    }

    pop() {
      const node = this.data.shift();
      if (!node) return null
      if (node.next) {
        this.data.push(node.next);
        this.sort();
      }
      return node.val;
    }
  }

  const q1 = new Queue(lists);
  let start: ListNode | null = null;
  let tail: ListNode | null = null;
  let node = q1.pop();
  while (node !== null) {
    if (!start) {
      start = new ListNode(node);
      tail = start;
    } else {
      tail!.next = new ListNode(node);
      tail = tail!.next;
    }
    node = q1.pop();
  }
  return start
};