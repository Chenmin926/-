// 请你仅使用两个队列实现一个后入先出（LIFO）的栈，并支持普通栈的全部四种操作（push、top、pop 和 empty）。

// 实现 MyStack 类：

// void push(int x) 将元素 x 压入栈顶。
// int pop() 移除并返回栈顶元素。
// int top() 返回栈顶元素。
// boolean empty() 如果栈是空的，返回 true ；否则，返回 false 。

class MyStack {
  private pushQueue: number[] = [];
  private popQueue: number[] = [];
  constructor() {

  }

  push(x: number): void {
    this.pushQueue.push(x);
  }

  pop(): number {
    let pushlength = this.pushQueue.length - 1
    for (let i = 0; i < pushlength; i++) {
      this.popQueue.push(this.pushQueue.shift()!);
    }
    let ans: number = this.pushQueue.shift()!;
    let poplength = this.popQueue.length
    for (let i = 0; i < poplength; i++) {
      this.pushQueue.push(this.popQueue.shift()!);
    }
    return ans
  }

  top(): number {
    return this.pushQueue.at(-1)!
  }


  empty(): boolean {
    return !this.popQueue.length && !this.pushQueue.length;
  }
}
var obj = new MyStack()
obj.push(1)
obj.push(2)
obj.push(3)
console.log(obj.pop())
console.log(obj.pop())
console.log(obj.pop())
// var param_3 = obj.top()
// var param_4 = obj.empty()
