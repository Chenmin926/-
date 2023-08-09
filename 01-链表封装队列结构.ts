export class ListNode<T = any> {
  public v: T;
  public next: ListNode<T> | null
  constructor(v: T, next = null) {
    this.v = v;
    this.next = next
  }

}

class NodeQueue {
  private head: ListNode | null = null
  private tail: ListNode | null = null
  private size: number = 0

  public isEmpty(): boolean {
    return this.size === 0
  }

  public getSize(): number {
    return this.size
  }

  public add<T>(n: T) {
    // 创建节点
    const cur: ListNode<T> = new ListNode(n);
    // 队列中没有节点
    if (this.tail === null) {
      this.head = cur;
      this.tail = cur
    } else {
      // 有节点
      this.tail.next = cur;
      this.tail = cur;
    }
    this.size++
  }

  public poll() {
    let ans: any = null;
    // 如果不是空队列
    if (this.head !== null) {
      ans = this.head.v;
      this.head = this.head.next;
      this.size--
    }
    // 队列空了 把末尾指针释放，避免占用内存
    if (this.head === null) {
      this.tail = null
    }
    return ans
  }
}
let nq1 = new NodeQueue();
nq1.add(1)
nq1.add(2)
nq1.add(3)
console.log(nq1.poll())
console.log(nq1.poll())
console.log(nq1.poll())
console.log(nq1.poll())
console.log(nq1.getSize())
