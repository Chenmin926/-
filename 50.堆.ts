// 使用数组来构建一个大根堆
class bigHeap{
  heap: number[] = [];

  add(num: number) {
    this.heap.push(num)
    let length = this.heap.length;
    length && this.heapInsert(length - 1)
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