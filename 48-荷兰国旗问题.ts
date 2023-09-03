/**
 * 快排的话 就是在荷兰国旗问题上返回等于区间的范围
 * 然后区分左右侧 左侧有序 右侧有序
 * 合并后就是整体排序好了
 * @param arr 
 * @returns 
 */
function sort(arr: number[], l: number, r: number) {
  // 不正确的区间
  // if (l > r) {
  //   return [-1, -1]
  // }
  // if (l === r) {
  //   return [l, r]
  // }

  if (l >= r) return
  // 为了避免找到的目标值在最偏的位置从而使得复杂度变成了O(n^2)
  // 所以直接随机一次目标值 打破这种情况 使得出现概率为1/n 但是这也仅仅是数学期望
  swap(arr, l + Math.floor(Math.random() * (r - l + 1)), r)
  // 正常情况
  let range = holland(arr, l, r);
  sort(arr, l, range[0] - 1)
  sort(arr, range[1] + 1, r);
}


function holland(arr: number[], l: number, r: number) {
  // <区起始位置
  let left = l - 1;
  // >区起始位置
  let right = r + 1;
  // 当前值
  let i = l;
  // 目标 
  let target = arr[r];
  while (i < right) {
    // 小于目标的情况
    // 当前值与小于区一下位置交换 小于区右扩
    if (arr[i] < target) {
      swap(arr, left + 1, i);
      left++;
      i++
    } else if (arr[i] === target) {
      // 等于情况 不做其他处理
      i++
    } else {
      // 大于的情况
      // 与大于区前一位交换位置 大于区左扩 但是当前索引不要动
      // 因为是换过来 所以还要和小于区再进行一次比较
      swap(arr, right - 1, i)
      right--;
    }
  }

  // console.log(arr, [left + 1, right - 1])
  return [left + 1, right - 1]
}

function swap(arr: number[], l: number, r: number) {
  // arr[l] = arr[l] ^ arr[r]
  // arr[r] = arr[l] ^ arr[r]
  // arr[l] = arr[l] ^ arr[r]
  let temp = arr[l];
  arr[l] = arr[r];
  arr[r] = temp
}

// let arr4 = [10, 5, 2, 9, 6, 6, 8, 7, 1, 6]
let arr4 = [1, 2, 3, 4, 5, 6, 7]
sort(arr4, 0, arr4.length - 1)
console.log(arr4)