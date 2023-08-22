// 参照位运算中k个数的找法
function singleNumber(nums: number[]): number {
  // 模拟32位的整数 记录每一位上出现了多少次1
  let res: number[] = new Array(32).fill(0);
  // 如果该位上是1则在记录
  for (let j = 0; j < nums.length; j++) {
    for (let i = 0; i < 32; i++) {
      if (((nums[j] >> i) & 1) !== 0) {
        res[i]++
      }
    }
  }
  let ans: number = 0;
  for (let i = 0; i < 32; i++) {
    // 说明出现1次的数在这个位上是1
    if (res[i] % 3) {
      ans |= 1 << i;
    }
  }
  return ans;
};
singleNumber([2, 2, 3, 2])