// 颠倒给定的 32 位无符号整数的二进制位。

// 提示：

// 请注意，在某些语言（如 Java）中，没有无符号整数类型。在这种情况下，输入和输出都将被指定为有符号整数类型，并且不应影响您的实现，因为无论整数是有符号的还是无符号的，其内部的二进制表示形式都是相同的。
// 在 Java 中，编译器使用二进制补码记法来表示有符号整数。因此，在 示例 2 中，输入表示有符号整数 - 3，输出表示有符号整数 - 1073741825。


// 示例 1：

// 输入：n = 00000010100101000001111010011100
// 输出：964176192(00111001011110000010100101000000)
// 解释：输入的二进制串 00000010100101000001111010011100 表示无符号整数 43261596，
//      因此返回 964176192，其二进制表示形式为 00111001011110000010100101000000。

function reverseBits(n: number): number {
  let res: number[] = new Array(32).fill(0);
  // 取出该十进制的二进制数
  for (let i = 0; i < 32; i++) {
    let bit = (n >> i) & 1;
    res[i] = bit;
  }
  let ans: number = 0;
  res.reverse();
  let right: number = 32;
  for (let i = 31; i; i--) {
    ans |= res[i] << right;
    right--;
  }
  let res1: number[] = new Array(32).fill(0);
  for (let i = 0; i < 32; i++) {
    let bit = (ans >> i) & 1;
    res1[i] = bit;
  }
  console.log(res, res1, ans, res1[31], res[32]);
  return ans
};
reverseBits(4294967293)
// console.log(first)