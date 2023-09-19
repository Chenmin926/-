
export class HeapGreater<T> {
  public heap: T[] = [];
  private hashMap: Map<T, number> = new Map();
  public heapSize: number = 0;
  private comparator: (a:T,b:T)=>number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator
  }

  has(k: T): boolean {
   return this.hashMap.has(k)
  }

  add(value: T) {
    this.heap.push(value);
    this.hashMap.set(value, this.heapSize);
    this.heapInsert(this.heapSize++)
  }

  peek(): T {
    return this.heap[0]
  }

  pop() {
    let ans: T = this.heap[0];
    this.swap(0, this.heapSize - 1);
    this.hashMap.delete(ans);
    this.heap.pop();
    this.heapSize--;
    this.heapify(0);
    return ans
  }

  heapInsert(index: number) {
    while (index && this.comparator(this.heap[index], this.heap[Math.floor((index - 1) / 2)]) < 0) {
      this.swap(index, Math.floor((index - 1) / 2));
      index = Math.floor((index - 1) / 2)
    }
  }

  heapify(index: number) {
    let left = index * 2 + 1;
    while (left < this.heapSize) {
      let best = left + 1 < this.heapSize && this.comparator(this.heap[left + 1], this.heap[left]) < 0 ? left + 1 : left;
      best = this.comparator(this.heap[best], this.heap[index]) < 0 ? best : index;
      if (best === index) {
        break
      }
      this.swap(index, best);
      index = best;
      left = index * 2 + 1;
    }
  }

  regain(value: T) {
    if(!this.hashMap.has(value)) return
    // 拿到在反向索引表中的索引
    let index = this.hashMap.get(value)!;
    // 只会命中一个heapInsert or heapify
    this.heapInsert(index);
    this.heapify(index)
  }

  remove(value: T) {
    if (!this.hashMap.has(value)) return
    let index = this.hashMap.get(value)!;
    // 记录替换者
    let replace = this.heap[this.heapSize - 1];
    // 假设已经将要删除的项和替换者交换了位置
    this.heapSize--;
    this.heap.pop();
    this.hashMap.delete(value)
    // 如果要删除的正好是最后的元素 则无需后序操作
    if (replace === value) return;
    // 对中设置正确位置
    this.heap[index] = replace;
    // 反向索引中设置正确位置
    this.hashMap.set(replace,index)
    this.heapInsert(index);
    this.heapify(index);

  }

  isEmpty(): boolean {
    return !!this.heapSize
  }
  

  swap(i: number, j: number) {
    let iV = this.heap[i];
    let jV = this.heap[j];
    this.heap[i] = jV;
    this.heap[j] = iV;
    this.hashMap.set(iV, j);
    this.hashMap.set(jV, i);
  }
}