// 实现一个特殊的栈 在基本功能的基础上 再实现返回栈中最小元素的功能
// 要求pop push getMin都是O(1)
// 设计的栈类型可以使用现成的栈结构
class MinStack {
  private stack: number[] = [];
  private minStack: number[] = [];

  push(v: number) {
    this.stack.push(v);
    // 最小栈需要看情况 
    // 如果为空 直接进栈
    if (!this.minStack.length) {
      this.minStack.push(v);
    } else {
      // 需要判断该值是否小于最小栈栈顶值
      // 小于的话该值入栈
      // 否则复制一个栈顶值推入
      let min = this.minStack.at(-1)!;
      this.minStack.push(v < min ? v : min);
    }
  }

  pop() {
    // 两个栈同时推出
    let ans = this.stack.pop();
    this.minStack.pop();
    return ans;
  }

  getMin() {
    return this.minStack.at(-1)!;
  }
}

// 两个栈实现队列
class TwoStackQueue {
  private pushstack: any[] = [];
  private popstack: any[] = [];

  push(v: any) {
    this.pushstack.push(v);
  }

  pop() {
    let ans = null
    this.popisEmpty() && this.setPopData();
    ans = this.popstack.pop();
    return ans
  }

  // 将push栈的数据倒入到pop中
  setPopData() {
    let len = this.pushstack.length;
    if (!len) return
    for (let i = 0; i < len; i++) {
      this.popstack.push(this.pushstack.pop());
    }
  }

  // 判断pop栈是否为空 不为空的话不能到数据
  popisEmpty(): boolean {
    return this.popstack.length === 0;
  }
}

let twoStackQueue = new TwoStackQueue();
twoStackQueue.push(1);
twoStackQueue.push(2);
twoStackQueue.push(3);
console.log(twoStackQueue.pop());
console.log(twoStackQueue.pop());
twoStackQueue.push(4)
console.log(twoStackQueue.pop());
console.log(twoStackQueue.pop());