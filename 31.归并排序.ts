/**
 * 并归排序的核心就是划分区域然后使其变有序
 * 然后再将两者结合组成最终结果
 * 以下为递归写法 
 */
function megerSort(arr: number[]) {
  if (arr.length <= 1) return arr

  fn(0, arr.length - 1)

  // 数组的中间值
  function fn(l: number, r: number) {
    // 递归出口 只有一个数了
    if (l === r) return
    // 数组的中间点
    // 为什么需要+l  因为是递归分化问题，那么需要保证每次拿到的mid都是该元素在原始数组中正确的索引
    // 假设l=3 r=5 如果不+l 那么mid就等于1了，显然不对
    let mid: number = l + ((r - l) >> 1);
    // 左侧有序
    fn(l, mid);
    // 右侧有序
    fn(mid + 1, r);
    // 合并两个有序的部分
    meger(l, mid, r)
  }

  function meger(l: number, m: number, r: number) {
    let help: number[] = [];
    // 辅助help数组指针
    let i: number = 0;
    // 两个指针 起始位两个有序部分的l
    let p1 = l;
    let p2 = m + 1;
    // 都不越界的情况 且两者始终不可能同时遍历完
    while (p1 <= m && p2 <= r) {
      help[i++] = arr[p1] <= arr[p2] ? arr[p1++] : arr[p2++]
    }
    // 如果左侧没遍历完
    while (p1 <= m) {
      help[i++] = arr[p1++]
    }
    // 如果左侧没遍历完
    while (p2 <= r) {
      help[i++] = arr[p2++]
    }

    // 将结果赋值到原数组
    for (let i = 0; i < help.length; i++) {
      arr[l + i] = help[i]
    }
  }


}

let arr = [80, 2, 100, -1, 5, 6, 8];
megerSort(arr)
console.log(arr)