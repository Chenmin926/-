/**
 * 解题思路
 * 如果是最简单的方式去解题的话，就是一个双循环去记录小和
 * 宏观概念上就是从自身开始从右往左看，左边比自身小的就加起来
 * 但是这样的方式的复杂度明显为O(n^2)
 * 如果使用并归，它的宏观概念就是从左往右看，相当于x去看右侧有序部分上有多少比自己大数
 * 有n个就将自身记录n次到小和上
 * 而使用并归的目的就是他的基本概念 局部有序
 * 自身永远在左组部分，假设右组全部有序了
 * 现在要合并两个部分了，需要去比较两者的时候了
 * 假设自身比较小。那么就需要判断当前p2-r上有几个数是大于自身的
 * 如果自身>= 就不会产生小和，相应的 把右组p2放置进help p2++
 * @returns 
 */
function smallSum(arr: number[]) {
  if (arr.length <= 1) return 0;
  let sum = 0;

  fn(0, arr.length - 1);

  return sum

  function fn(l: number, r: number) {
    if (l === r) return
    // 中间值
    let m = l + ((r - l) >> 1);
    fn(l, m);
    fn(m + 1, r);
    meger(l, m, r);
  }

  function meger(l: number, m: number, r: number) {
    let q1 = l;
    let q2 = m + 1;
    let help = [];
    let index = 0;
    while (q1 <= m && q2 <= r) {
      if (arr[q1] < arr[q2]) {
        sum += arr[q1] * (r - q2 + 1);
        help[index++] = arr[q1++];
      } else {
        help[index++] = arr[q2++];
      }
    }

    while (q1 <= m) {
      help[index++] = arr[q1++];
    }
    while (q2 <= r) {
      help[index++] = arr[q2++];
    }
    for (let i = 0; i < help.length; i++) {
      arr[l + i] = help[i]
    }
  }
}

console.log(smallSum([3, 4, 8, 9]));
console.log(smallSum([5, 1, 8, 6]));

