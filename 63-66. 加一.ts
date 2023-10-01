function plusOne(digits: number[]): number[] {
  if (!digits.length) return []
  digits.reverse();
  let len = digits.length;

  if (digits[0] + 1 < 10) {
    digits[0] = digits[0] + 1;
    return digits.reverse();
  }

  for (let i = 0; i < len; i++) {
    if (digits[i] + 1 === 10) {
      digits[i] = 0
      continue
    }
    if (digits[i - 1] === 0) {
      let sum = digits[i] + 1; 
      digits[i] = sum;
      if(sum <10) break
    }
  }
  if (digits.at(-1) === 0) {
    digits.push(1)
  }
  return digits.reverse();
};  

console.log(plusOne([1, 9, 9, 9]))
console.log(plusOne([1, 2, 3, 4]))
console.log(plusOne([1, 2, 9, 9]))
console.log(plusOne([9, 9, 9]))
console.log(plusOne([8, 9, 9, 9]))
console.log(plusOne([9, 8, 9]))