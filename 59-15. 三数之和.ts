// 给你一个整数数组 nums ，判断是否存在三元组[nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请
// 你返回所有和为 0 且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。

function threeSum(nums: number[]): number[][] {
  // 如果长度不>=3
  if (nums.length < 3) return [];
  // 如果刚好是3
  if (nums.length === 3) {
    let sum = nums.reduce((pre, cur) => pre + cur);
    if (sum === 0) return [nums]
    return []
  }
  // 数组进行排序
  nums.sort((a, b) => a - b);
  // 利用双指针进行操作
  let n = nums.length;
  let ans: number[][] = [];
  for (let i = 0; i < n - 2;i++) {
    let num = nums[i];
    // 如果相邻数相同，跳过
    if (i > 0 && num === nums[i - 1]) {
      continue
    }
    // 边界 如果num 和之后两个最小的数相加是>0的，那么说明它和之后的任何数相加都要大>0
    // 哪怕是到了之后的数 结果都是一样，所以使用break直接结束
    if (num + nums[i + 1] + nums[i + 2] > 0) {
      break
    }
    // 如果num和最大的两个相加都是<0 那么它和之后的数相加都是<0的
    // 所以可以跳过开始下一轮
    // 因为num变大 还有机会找到另外两个数相加=0的
    if (num + nums[n - 1] + nums[n - 2] < 0) {
      continue
    }
    // 首尾部指正
    let k = i + 1;
    let j = n - 1;
    while (k < j) {
      let sum = num + nums[j] + nums[k];
      if (sum > 0) {
        j--
      } else if (sum < 0) {
        k++
      } else {
        ans.push([num, nums[k], nums[j]])
        k++;
        // 头尾也需要排除重复
        while (k < j && nums[k] === nums[k - 1]) {
          k++
        }
        j--;
        while (j > k && nums[j] === nums[j + 1]) {
          j--
        }
      }
    }
  }
  return ans;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]))