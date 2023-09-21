function radixSort(arr: number[]) {
  // if (arr.length < 2) {
  //   return 
  // }
  let length = arr.length
  // 最大多少位
  let bits = maxbits(arr);
  // 辅助数组
  let help: number[] = [];
  // 最多多少位就需要进出桶多少位
  // 按照个十百千...的顺序
  for (let d = 1; d <= bits; d++) {
    // 准备一个辅助空间，长度为10
    // count[0] 表示当前位是0的数有多少个
    // count[1] 表示当前位是0-1也可以说<=1的数有多少个
    // ...以此类推
    let count: number[] = Array(10).fill(0)
    // 计算每个数在当前位上是什么
    for (let i = 0; i < length; i++) {
      let j = getDigit(arr[i], d);
      count[j]++;
    }
    // 变成累加和,以bits为结束，因为超过bits的话就是无意义的数了
    for (let i = 1; i < 10; i++) {
      count[i] = count[i] + count[i-1]
    }
    // 从右往左遍历arr，进行一个进出桶的操作
    for (let i = length - 1; i >= 0; i--) {
      // 当前数d位置上的数 用来去找累加和中的位置
      let j = getDigit(arr[i], d) 
      // 如果累加和为6，那么说明0-5位置上都是<=j
      // 又因为从后往前遍历，所以当前数应该放在5位置上
      help[count[j] - 1] = arr[i]
      // 5位置被放置了数，那么对应范围要缩小一位
      count[j]--
    }
    // console.log(help)
    // help中的数据拷贝回来
    for (let i = 0; i < length; i++) {
      arr[i] = help[i]
    }
  }

  console.log(arr)
}

/**
 * 从数组中获取最大位数的数
 * @param arr 整数数组
 * @returns 
 */
function maxbits(arr: number[]) {
  // 最大数
  let max = Number.MIN_VALUE;
  for (let i = 0; i < arr.length; i++) {
    max = Math.max(arr[i],max)
  }
  let ans = 0;
  while (max) {
    // 每个位置有数则++
    ans++;
    max = Math.floor(max/10);
  }
  return ans
}

function getDigit(num: number, d: number) {
  if (d === 1) {
    return num %10
  }
  --d
  return Math.floor(num / 10**d) % 10
}

// 
radixSort([103, 13, 27, 25, 17, 9])
