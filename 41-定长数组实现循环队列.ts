class ringQueue {
  private start: number = 0;
  private end: number = 0;
  // 使用size来进行解耦 用它来判断当前队列是否满了
  // 避免使用start or end去做更多更复杂得事
  private size: number = 0;
  private queue: any[] = [];
  private limit: number = 0;
  constructor(size: number = 5) {
    this.queue = new Array(size);
    this.limit = size;
  }

  push(value: any) {
    // 如果队列满了
    if (this.size == this.limit) {
      throw new Error("队列已满");
    }
    this.size++;
    this.queue[this.end] = value;;
    this.end = this.nextIndex(this.end);
  }

  pop() {
    // 队列是否空了
    if (!this.size) {
      throw new Error("队列为空");
    }
    this.size--;
    let ans = this.queue[this.start];
    this.start = this.nextIndex(this.start);
    return ans;
  }

  // 
  private nextIndex(index: number): number {
    return index < this.limit - 1 ? index + 1 : 0;
  }
}