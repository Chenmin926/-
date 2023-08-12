/**
 * 并归排序的核心就是划分区域然后使其变有序
 * 然后再将两者结合组成最终结果
 * 以下为递归写法 
 * 时间复杂度为O(longn)
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

/**
 * 非递归写法 使用两层while来实现
 * 基本的逻辑为定好步长 然后依然是划区域（左右组）去进行meger比较然后合并
 * 只是这个步长为1,2,4,8的等比数列
 * 那么内层因为要merger 那么就需要找到 l m r三个位置
 * 复杂度为O(n*logn)
 */
function mergerSort1(arr: number[]) {
  if (arr.length <= 1) return [];
  // 步长
  let step: number = 1;
  // 数组的长度 取长度是为了计算步长 而不是取n-1这常见于使用索引
  let n: number = arr.length;
  // 如果步长大于了n 那么始终没有右组了，也就无意义
  while (step < n) {
    let l: number = 0;
    // 内存循环去找m r
    while (l < n) {
      let m: number = 0;
      // 是否能凑够左组的边界情况
      // 有可能划到最后只有左组没有右组 但是左组又凑不够step个
      if (n - l >= step) {
        m = l + step - 1;
      } else {
        m = n - 1;
      }

      // 有可能划到最后只有左组没有右组 那就不要找右组了
      if (m === n - 1) {
        break
      }

      // 找右组的情况
      let r: number = 0;
      // 同理 是否右组也不能凑够step个
      if (n - 1 - m >= step) {
        // 相当于 m+1+step-1
        r = m + step;
      } else {
        r = n - 1;
      }
      // 合并两个区域
      meger(l, m, r);

      // 是否继续下一组
      if (r === n - 1) {
        break;
      } else {
        l = r + 1
      }
    }

    // 步长的计算
    // 需要注意边界 不去做限制的话 那step超过一半的n时 后面都没有右组
    // 且如果还有可能直接比n长 那又是无意义的
    // 为什么是>n/2 不是>=
    // 在java中因为其会向下取整 但是js中不会
    // 如果取整情况 n=17 s的趋势为 1,2,4,8,16
    // 正常情况最后一次merger为1-16 17
    // 如果判断为>= 那么meger到了8 就结束了 不会走到16了
    if (step > (n / 2)) {
      break
    } else {
      step *= 2;
    }
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
mergerSort1(arr)
console.log(arr)