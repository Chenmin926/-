/**
 * 快速排序
 * 核心思想在于取一个元素来划分三个区域
 * <区 =区 >区
 */
function quicSort1(arr: number[]) {
  arr = [...arr];
  if (arr.length <= 1) return arr;

  // fn(0, arr.length - 1);
  fn1();
  console.log(arr)

  return arr;

  // 递归写法
  function fn(l: number, r: number) {
    // 递归出口
    // 非有效范围
    // 只有一个数
    if (l >= r) return
    // 等于区域的起始和末尾
    let equalE = splitNum(l, r);
    // 左边区域排序
    fn(l, equalE[0] - 1);
    // 右边区域排序
    fn(equalE[1] + 1, r);
  }

  // 非递归写法
  // 利用栈来取出任务执行
  function fn1() {
    let stack = [];
    stack.push({ l: 0, r: arr.length - 1 });
    while (stack.length) {
      // 取出任务执行
      let job = stack.pop()! as { l: number, r: number };
      let equalE = splitNum(job.l, job.r);
      // 是否有小于的区域
      if (equalE[0] > job.l) {
        stack.push({ l: job.l, r: equalE[0] - 1 });
      }
      // 是否有大于区域
      if (equalE[1] < job.r) {
        stack.push({ l: equalE[1] + 1, r: job.r })
      }
    }
  }


  // 这是一次使得数组根据末尾元素比较做出的分片
  // 比其小的放左边 等于的放中间 大的放右边
  function splitNum(l: number, r: number) {
    // <的右边界 也称长度
    let lessEulqR = l - 1;
    let i = l;
    // >的左边界 默认为最末尾
    let mostR = r;
    // 需要比对的值
    let most = r
    while (i < mostR) {
      if (arr[i] < arr[most]) {
        swap(lessEulqR + 1, i);
        lessEulqR++;
        i++
      } else if (arr[i] > arr[most]) {
        swap(mostR - 1, i);
        mostR--;
      } else {
        i++
      }
    }
    // 最后将自身与>的最左边界互换
    swap(most, mostR)
    // 返回等于区域的范围索引
    return [lessEulqR + 1, mostR]
  }

  function swap(i: number, j: number) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp
  }
}

let arr1 = [7, 1, 3, 5, 4, 5, 1, 4, 2, 4, 2, 4];
console.time()
quicSort1(arr1);
// console.log(arr1)
console.timeEnd()