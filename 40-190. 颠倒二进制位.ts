// 颠倒给定的 32 位无符号整数的二进制位。

// 提示：

// 请注意，在某些语言（如 Java）中，没有无符号整数类型。在这种情况下，输入和输出都将被指定为有符号整数类型，并且不应影响您的实现，因为无论整数是有符号的还是无符号的，其内部的二进制表示形式都是相同的。
// 在 Java 中，编译器使用二进制补码记法来表示有符号整数。因此，在 示例 2 中，输入表示有符号整数 - 3，输出表示有符号整数 - 1073741825。


// 示例 1：

// 输入：n = 00000010100101000001111010011100
// 输出：964176192(00111001011110000010100101000000)
// 解释：输入的二进制串 00000010100101000001111010011100 表示无符号整数 43261596，
//      因此返回 964176192，其二进制表示形式为 00111001011110000010100101000000。

/**
 * 暴力解法，取出每一位按照栈的思想
 * 然后将数组转为二进制字符串 再转成十进制数
 * 时间复杂度为O(n) 空间复杂度为O(n)
 */
function reverseBits1(n: number): number {
  let res: number[] = new Array(32).fill(0);
  // 取出该十进制的二进制数
  for (let i = 0; i < 32; i++) {
    let bit = (n >> i) & 1;
    res[i] = bit;
  }
  return parseInt(res.join(''), 2);
};
reverseBits1(4294967293)
// console.log(first)

/**
 * 优质解法
 * 时间复杂度O(1) 空间复杂度O(1)
 */
function reverseBits2(n: number): number {
  let ans: number = 0;
  for (let i = 0; i < 32; i++) {
    // ans << 1 相当于推进结果的位置
    // n & 1 取出n的最后一位 
    // 将n的最后一位与到ans的末尾
    ans = ans << 1 | (n & 1);
    // 取出了最后一位就要将n的最后一位去掉
    n >>= 1
  }
  // x >>> 0本质上就是保证x有意义（为数字类型），且为正整数，且在无意义的情况下缺省值为0
  return ans >>> 0;
}