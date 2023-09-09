class SmallHeap {
  heap: number[] = [];
  size: number = 0;

  isEmpty() {
    return !!this.size
  }

  poll() {
    let res = this.heap[0];
    this.heap[0] = this.heap[this.size-1];
    this.heap[--this.size] = res;
    this.heap.pop();
    this.heapify(0);
    console.log(this.heap,this.size)
    return res
  }

  add(value: number) {
    this.heap.push(value);
    this.size++;
    this.heapinsert(this.size - 1)
    // console.log(this.heap, this.size)
  }

  heapinsert(index: number) {
    let parentIndex: number = Math.floor((index - 1) / 2);
    while (this.heap[index] < this.heap[parentIndex] && parentIndex >= 0) {
      // 两者互换
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }

  heapify(index: number) {
    let smallIndex = (index * 2) + 1;
    while (smallIndex < this.size) {
      // 判断是否有右孩子
      let small = smallIndex + 1 < this.size ? this.heap[smallIndex] < this.heap[smallIndex + 1] ? smallIndex : smallIndex + 1 : smallIndex;
      small = this.heap[index] < this.heap[small] ? index : small;
      if (index === small) break;
      this.swap(index, small);
      index = small;
      smallIndex = (index * 2) + 1;
    }
  }

  swap(i1: number, i2: number) {
    this.heap[i1] = this.heap[i1] ^ this.heap[i2];
    this.heap[i2] = this.heap[i1] ^ this.heap[i2];
    this.heap[i1] = this.heap[i1] ^ this.heap[i2];
  }
}

let s1 = new SmallHeap();
s1.add(8)
s1.add(9)
s1.add(10)
s1.add(7)
s1.poll()
s1.poll()