// 异或运算
// 不用额外变量交换两个数
let a: number = 10;
let b: number = 20;
// 现在将a=甲 b=乙
a = a ^ b; // a = 甲^乙
b = a ^ b; // b = 甲^乙^乙=甲^0=甲
a = a ^ b; // a = 甲^乙^甲 因为满足交换律 = 甲^甲^乙 = 0^乙 =乙 
console.log(a, b)

// 一个数组中只有一个数出现了奇数次，其他数都是偶数次，找到这个奇数次的数。
let arr3 = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 1];
let result = 0;
for (let i = 0; i < arr3.length; i++) {
  result ^= arr3[i];
}
console.log(result)

// 一个数组中有两个数出现了奇数次 其余数都是偶数次 找出这两个数
function findTowNum(arr: number[]): number[] {
  // 假设出现奇数次的两个数为 a，b
  // 首先依然是用一个变量去遍历异或 那么结果就会为a^b
  let eor: number = 0;
  arr.forEach(num => {
    eor ^= num;
  });
  // 此时eor肯定!=0 
  // 且起始的时候就知道a != b 所以a,b的二进制位上肯定有一位是不相同的
  // 那么就去取eor最右侧的1
  let rightOne: number = eor & (~eor + 1);
  // 这时候可以把数组中的数分为大概两类
  // 一类是rightOne位置上为1的数 一类是不为1
  // 而a b必然在这两类中是分开的
  let ans1: number = 0;
  arr.forEach(num => {
    // 此时取出一类
    if ((num & rightOne) != 0) {
      // 排除掉这类中出现的偶数次数 那么剩下的就是a | b
      ans1 ^= num;
    }
  });
  // 那么这是另一个结果就很好取了
  let ans2: number = eor ^ ans1;
  return [ans1, ans2]
}
// 测试上面findTowNum函数的实现是否符合结果
console.log(findTowNum([1, 1, 2, 2, 4, 4, 1, 5, 5, 10, 10, 5, 20, 20]))