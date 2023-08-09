export class ListNode<T = any> {
  public v: T;
  public next: ListNode<T> | null
  constructor(v: T, next = null) {
    this.v = v;
    this.next = next
  }
}

class NodeStack {
  private head: ListNode | null = null
  private size: number = 0;

  public isEmpty(): boolean {
    return this.size === 0;
  }

  public getSize(): number {
    return this.size
  }

  public add<T = any>(value: T) {
    let cur = new ListNode<T>(value)
    cur.next = this.head;
    this.head = cur;
  }

  public poll(): any {
    let ans = null;
    if (this.head === null) {
      ans = null
    } else {
      ans = this.head.v
      this.head = this.head.next;
    }
    return ans
  }
}

let nq1 = new NodeStack();
nq1.add(1)
nq1.add(2)
nq1.add(3)
console.log(nq1.poll())
console.log(nq1.poll())
console.log(nq1.poll())