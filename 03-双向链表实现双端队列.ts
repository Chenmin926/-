class DoubleNode<T = any> {
  public value: T;
  public last: DoubleNode | null
  public next: DoubleNode | null
  constructor(val: T, last: DoubleNode | null = null, next: DoubleNode | null = null) {
    this.value = val;
    this.last = last;
    this.next = next
  }
}

/**
 * 双端链表，两端都有队列的特性
 */
class MyDeque {
  public head: DoubleNode | null = null;
  public tail: DoubleNode | null = null;
  private size: number = 0;

  public isEmpty(): boolean {
    return this.size === 0
  }

  public getSize(): number {
    return this.size
  }

  public pushHead<T = any>(v: T): void {
    let cur = new DoubleNode(v);
    // 如果没有节点
    if (this.head === null) {
      this.head = cur;
      this.tail = cur;
    } else {
      cur.next = this.head;
      this.head.last = cur
      this.head = cur
    }
    this.size++
  }

  public pollHead(): any {
    let ans = null;
    if (this.head === null) {
      ans = null
    } else {
      ans = this.head.value
      if (!this.head.next) {
        this.head = null
        this.tail = null
      } else {
        this.head.next.last = null;
        this.head = this.head.next
      }
      this.size--
    }
    return ans
  }

  public pushTail<T = any>(v: T): void {
    let cur = new DoubleNode(v)
    if (this.tail === null) {
      this.head = cur;
      this.tail = cur;
    } else {
      this.tail.next = cur;
      cur.last = this.tail
      this.tail = cur
    }
    this.size++
  }

  public pollTail(): any {
    let ans = null;
    if (this.tail === null) {
      ans = null
    } else {
      ans = this.tail.value
      if (!this.tail.last) {
        this.head = null
        this.tail = null
      } else {
        this.tail.last.next = null;
        this.tail = this.tail.last
      }
      this.size--
    }
    return ans
  }
}