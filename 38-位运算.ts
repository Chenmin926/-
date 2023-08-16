// 异或运算
// 不用额外变量交换两个数
let a: number = 10;
let b: number = 20;
// 现在将a=甲 b=乙
a = a ^ b; // a = 甲^乙
b = a ^ b; // b = 甲^乙^乙=甲^0=甲
a = a ^ b; // a = 甲^乙^甲 因为满足交换律 = 甲^甲^乙 = 0^乙 =乙 
console.log(a, b)