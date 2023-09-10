import { SmallHeap } from "./51-小根堆";

function line(m: number[][]) {
  let ans = 0;
  // 按照起始位置排序
  m.sort((a, b) => a[0] - b[0]);
  // 小根堆 放每一条线段的结尾数值
  let heap = new SmallHeap();
  for (let i = 0; i < m.length; i++) {
    // 把小根堆中小于当前项起始位置的都弹出
    while (!heap.isEmpty() && heap.peek()! <= m[i][0]) {
      heap.poll();
    }
    // 将当前结尾线段加入
    heap.add(m[i][1]);
    // 获取当前线段的结果
    ans = Math.max(ans, heap.size);
  }
  return ans;
}