import { SmallHeap } from "./51-小根堆";

function merge(intervals: number[][]): number[][] {
  if (intervals.length <= 1) return intervals;
  let ans: number[][] = [];
  // 排序
  intervals.sort((a, b) => a[0] - b[0]);
  let start = intervals[0][0];
  let end = intervals[0][1];
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] > end) {
      ans.push([start, end]);
      start = intervals[i][0];
      end = intervals[i][1];
    } else {
      if (intervals[i][1] > end) {
        end = intervals[i][1]
      }
    }
  }
  ans.push([start, end]);
  return ans
};
console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]]));
console.log(merge([[1, 4], [4, 5]]));
console.log(merge([[1, 4], [0, 4]]));