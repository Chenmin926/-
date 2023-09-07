// 使用数组来构建一个大根堆
class bigHeap{
  heap: number[] = [];
  heapSize: number = 0;

  add(num: number) {
    this.heap.push(num)
    this.heapSize++;
    this.heapSize && this.heapInsert(this.heapSize - 1)
    console.log(this.heap)
  }

  heapInsert(index: number) {
    let parentIndex = Math.floor((index - 1) / 2)
    // 找到结点合适的位置
    while (this.heap[index] > this.heap[parentIndex] && parentIndex>=0) {
      this.swap(index, parentIndex);
      index = parentIndex
      parentIndex = Math.floor((parentIndex - 1) / 2)
    }
  }

  poll() {
    if(!this.heapSize) return
    let res = this.heap[0]
    this.heap[0] = this.heap[this.heapSize - 1];
    this.heap[this.heapSize - 1] = res;
    this.heap.pop()
    this.heapSize--;
    this.heapify(0);
    console.log(res,this.heap)
    return res
  }

  heapify(index: number) {
    // 左孩子索引
    let left = (2 * index) + 1;
    // 左孩子不越界
    while (left < this.heapSize) {
      // 判断是否有右孩子 有的话比较两者
      let largest = left + 1 < this.heapSize ? this.heap[left] < this.heap[left + 1] ? left + 1 : left : left;
      // 判断较大孩子是否比父亲大
      largest = this.heap[largest] > this.heap[index] ? largest : index;
      // 自身已经比较大孩子大 不需要继续往下找
      if (largest === index) {
        break;
      }
      // 有比自己大的孩子
      this.swap(index, largest);
      index = largest;
      left = (index * 2) + 1;
    }
  }

  swap(i1: number, i2: number) {
    this.heap[i1] = this.heap[i1] ^ this.heap[i2];
    this.heap[i2] = this.heap[i1] ^ this.heap[i2];
    this.heap[i1] = this.heap[i1] ^ this.heap[i2];
  }
}

let b1 = new bigHeap();
b1.add(10)
b1.add(8)
b1.add(9)
b1.add(11)
b1.poll()
b1.poll()