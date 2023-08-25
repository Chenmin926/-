// 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

// 实现 MinStack 类:

// MinStack() 初始化堆栈对象。
// void push(int val) 将元素val推入堆栈。
// void pop() 删除堆栈顶部的元素。
// int top() 获取堆栈顶部的元素。
// int getMin() 获取堆栈中的最小元素。

export class MinStack {
  private stack: number[] = [];
  private minStack: number[] = [];
  constructor() {

  }

  push(val: number): void {
    this.stack.push(val);
    if (!this.minStack.length) {
      this.minStack.push(val);
    } else {
      let stackTop = this.minStack[this.minStack.length - 1]
      let value = val < stackTop ? val : stackTop;
      this.minStack.push(value);
    }
  }

  pop(): void {
    this.stack.pop();
    this.minStack.pop();
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    return this.minStack[this.minStack.length - 1];
  }
}
const p1 = new MinStack();
p1.push(-2);
p1.push(0);
p1.push(-1);
console.log(p1.getMin())
console.log(p1.top())
p1.pop();
console.log(p1.getMin())