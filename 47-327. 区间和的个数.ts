function countRangeSum(nums: number[], lower: number, upper: number): number {
  if (!nums?.length) return 0;
  // 前缀和数组
  let sumArr = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    sumArr.push(nums[i] + sumArr[i - 1]);
  }

  return count(0, sumArr.length - 1)

  function count(l: number, r: number): number {
    if (l === r) {
      // 找到了子数组 0-l的原始数组
      // 因为此时的l它是用在sumArr上的，如果sumArr[l]符合条件 它代表的是原始arr[0-l]是符合条件的
      if (sumArr[l] >= lower && sumArr[l] <= upper) return 1;
      // 不符合条件就0
      return 0
    }

    // 范围上不止一个位置
    let m = l + ((r - l) >> 1);
    // 左侧达标
    let left = count(l, m);
    // 右侧达标
    let right = count(m + 1, r);
    let megerNum = meger(l, m, r);
    return left + right + megerNum;
  }

  function meger(l: number, m: number, r: number) {
    let ans = 0
    // 不进行meger操作 但是对于右组中的每个数x 都要去求左组中有多少个数
    // 落在了[x-uppler,x-lower]上
    let windowL = l;
    let windowR = l;
    // [windowL,windowR)
    for (let i = m + 1; i <= r; i++) {
      // 将原来的[lower,upper]=>转化为了前缀和数组x求[x-upper,x-lower]
      let min = sumArr[i] - upper;
      let max = sumArr[i] - lower;
      // 请x之前有多少组是符合[x-upper,x-lower]的
      while (windowR <= m && sumArr[windowR] <= max) {
        windowR++;
      }
      while (windowL <= m && sumArr[windowL] < min) {
        windowL++
      }
      ans += windowR - windowL
    }

    // 正常meger
    let help = [];
    let i = 0;
    let p1 = l;
    let p2 = m + 1;
    while (p1 <= m && p2 <= r) {
      help[i++] = sumArr[p1] <= sumArr[p2] ? sumArr[p1++] : sumArr[p2++];
    }
    while (p1 <= m) {
      help[i++] = sumArr[p1++];
    }
    while (p2 <= r) {
      help[i++] = sumArr[p2++];
    }
    for (let i = 0; i < help.length; i++) {
      sumArr[l + i] = help[i];
    }
    return ans
  }
};