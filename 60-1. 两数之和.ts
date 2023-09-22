// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

// 你可以按任意顺序返回答案。

/**
 * 声明一个map来存储数据
 * 遍历数组
 * 求出该树和target的差值
 * 查看map中是否存在 存在即取出 返回
 * 不存在则将该数和它的索引存入map
 */
function twoSum(nums: number[], target: number): number[] {
  if (nums.length < 2) return [];
  if (nums.length === 2) {
    return nums[0] + nums[1] === target ? [0, 1] : [];
  }
  let map: Map<number, number> = new Map();
  for (let i = 0; i < nums.length; i++) {
    let diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff),i]
    } else {
      map.set(nums[i],i)
    }
  }
  return []
};