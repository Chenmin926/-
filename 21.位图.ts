/**
 * 加法可以拆分为：不进位相加结果+进位信息
 * 而^异或运算就是相当于不进位相加的结果，而&和<<就是各位目前的进位信息。
 * 再将两者结合循环往复直到进位信息为0即是最终结果
 */
function add(a: number, b: number): number {
  let sum: number = a;
  while (b !== 0) {
    // 不进位相加结果
    sum = a ^ b;
    // 进位信息
    b = (a & b) << 1;
    // 结合两者
    a = sum;
  }
  return sum;
}
console.log(add(46, 20))

/**
 * 减去一个数相当于加上这个数的相反数
 * 相当于使用上述add方法加上改数的相反数~a+1
 */
function sub(a: number, b: number): number {
  return add(a, add(~b, 1));
}
console.log(sub(46, 20))

/**
 * 底层相当于用二进制数在做乘法竖式
 */
function multi(a: number, b: number): number {
  let res: number = 0;
  // 结束条件
  while (b !== 0) {
    // 让b去&1可以判断他是a是否不为全0，因为0去&多个位就是各位都数为0
    if ((b & 1) != 0) {
      res = add(res, a);
    }
    a <<= 1;
    // 算完一位后右移 0来补充
    b >>>= 1;
  }
  return res
}
console.log(multi(7, -3))

function div(a: number, b: number): number {
  // 是否都为系统最小值
  if (a === Number.MIN_VALUE && b === Number.MIN_VALUE) return 1;
  if (b === Number.MIN_VALUE) return 0;
  if (a === Number.MIN_VALUE) {
    if (b === -1) return Number.MAX_VALUE;
    // 相当于以下步骤 因为系统最小没有绝对值，所以让他+1从而拥有绝对值c
    // 然后用c去除以b先得到一部分
    // 再用a减去c*b得到与其差值 去除以b得到结果e
    // 将c和e相加就得到了最终的值
    let res = div(sub(a, 1), b);
    return add(res, div(sub(a, multi(res, b)), b))
  }
  let res: number = 0;
  // 不支持负数
  let a1 = Math.abs(a);
  let b1 = Math.abs(b);
  // a/b 因为已经转成了正数 所以从30位开始
  for (let i = 30; i >= 0; i--) {
    // 让a右移不会牵扯到符号位越界情况
    if ((a1 >> i) >= b1) {
      // 将结果的i位标记为1
      res |= (1 << i);
      // a减去b离它最近且小于它的数
      a1 = sub(a1, b1 << i);
    }
  }
  return (a < 0) != (b < 0) ? add(~res, 1) : res;
}
console.log(div(7, -3))