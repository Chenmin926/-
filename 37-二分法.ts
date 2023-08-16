function exist(arr: number[], num: number): boolean {
  console.log(arr, num);
  if (!arr.length) return false;
  // 左侧索引
  let l: number = 0;
  // 右侧索引
  let r: number = arr.length - 1;
  // 中间点
  let m: number = 0;
  // 从两端开始缩小范围
  // 为什么是< 而不是<= 其实两者都没错
  // 只是如果大逻辑是需要两个数才能二分就要选前者 如果是只需要一个数就能二分 那就选后者
  while (l < r) {
    // 如果用l+r/2 当l和r都特别大时可能会出现溢出的情况
    m = l + ((r - l) >> 1);
    if (arr[m] === num) {
      return true;
    }
    if (arr[m] < num) {
      l = m + 1;
    }
    if (arr[m] > num) {
      r = m - 1;
    }
  }
  // 因为使用的< 那么最终有可能剩下一个数没有进行比较
  if (arr[l] === num) return true;
  return false;
}

// 生成测试用例 测试用例是随机长度的有序的数组
function generateTestData(length: number): number[] {
  const arr: number[] = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * length));
  }
  arr.sort((a, b) => a - b);
  return arr;
}
// 测试
// console.log(exist(generateTestData(10), 5));
// console.log(exist(generateTestData(10), 10));
// console.log(exist(generateTestData(10), 1));

// 找出有序数组中>=value的最左位置
function nearestIndex(arr: number[], num: number): number {
  console.log(arr, num);
  if (!arr.length) return -1;
  // 左侧索引
  let l: number = 0;
  // 右侧索引
  let r: number = arr.length - 1;
  // 中间点
  let m: number = 0;
  // 最左位置
  let ans: number = -1;
  while (l <= r) {
    m = l + ((r - l) >> 1);
    if (arr[m] >= num) {
      ans = m;
      r = m - 1
    }
    if (arr[m] < num) {
      l = m + 1;
    }
  }
  return ans;
}
// 生成用于nearestIndex函数的测试用例并进行测试
function generateTestDataForNearestIndex(length: number): number[] {
  const arr: number[] = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * length));
  }
  arr.sort((a, b) => a - b);
  return arr;
}
// 测试
// console.log(nearestIndex(generateTestDataForNearestIndex(10), 5));
// console.log(nearestIndex(generateTestDataForNearestIndex(10), 10));
// console.log(nearestIndex(generateTestDataForNearestIndex(10), 1));

// 寻找局部最小值
// 在给定的数组中 保证相邻的两个数不相等
// 如果i-1>i<i+1 那么如果0<1 那么就是0 n-2>n-1 就是n-1
function localMininum(arr: number[]): number {
  console.log(arr)
  if (!arr.length) return -1;
  let l: number = 0;
  let r: number = arr.length - 1;
  let m: number = 0;
  if (arr[0] < arr[1]) return 0;
  if (arr[r] < arr[r - 1]) return r;
  while (l <= r) {
    m = l + ((r - l) >> 1);
    if (arr[m] < arr[m - 1] && arr[m] < arr[m + 1]) {
      return m;
    }
    if (arr[m - 1] < arr[m]) {
      r = m - 1;
    }
    if (arr[m + 1] < arr[m]) {
      l = m + 1;
    }
  }
  return -1;
}
// 生成用于localMininum的测试用例,要求每两个相邻的数字是不相等且无序的
function generateTestDataForLocalMininum(length: number): number[] {
  const arr: number[] = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * length));
  }
  arr.sort((a, b) => a - b);
  for (let i = 0; i < length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      arr[i]++;
    }
  }
  return arr;
}
// 测试
// 测试

// 测试
console.log(localMininum(generateTestDataForLocalMininum(10)));
console.log(localMininum(generateTestDataForLocalMininum(100)));
console.log(localMininum(generateTestDataForLocalMininum(100)));
