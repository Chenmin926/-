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

