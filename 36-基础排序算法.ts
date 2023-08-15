// 冒泡排序
// 即使数据情况良好 但是依然不会使得其复杂度变简单
function bubbleSor(arr: number[]) {
  if (arr.length <= 1) return
  for (let i = arr.length - 1; i; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
      }
    }
  }
}

// 选择排序
function checkSort(arr: number[]) {
  if (arr.length <= 1) return arr;
  // 0 - n-1位置上找最小 放到0位置上
  // 1 - n-2位置上找最小 放到1位置上
  // 2 - n-3位置上找最小 放到2位置上 以此类推
  for (let j = 0; j < arr.length; j++) {
    let minIndex: number = j;
    for (let i = j + 1; i < arr.length; i++) {
      if (arr[i] < arr[minIndex]) {
        minIndex = i;
      }
    }
    swap(arr, j, minIndex)
  }

  console.log(arr)
}

// 插入排序
// 在好的数据情况下 可以做到O(n)
function insertSort(arr: number[]) {
  if (arr.length <= 2) return;
  // 0~0 范围有序
  // 0~1 范围有序
  // 0~2 范围有序 依次类推
  // for (let i = 1; i < arr.length; i++) {
  //   let j = i;
  //   let temp = arr[i];
  //   while (arr[j - 1] > temp && j) {
  //     arr[j] = arr[j - 1]
  //     j--;
  //   }
  //   arr[j] = temp
  // }

  for (let i = 1; i < arr.length; i++) {
    for (let j = i - 1; arr[j] > arr[j + 1] && j >= 0; j--) {
      swap(arr, j, j + 1)
    }
  }

}

// let arr2 = [1, 2, 4, -1, -2];
// insertSort(arr2)
console.log(renderNumberArr(5, 100))

function swap(arr: number[], i: number, j: number) {
  let temp: number = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// 对数器函数
function test() {
  // 测试次数
  let testNum = 1000;
  // 执行测试
  let ans: boolean = true
  for (let i = 0; i < testNum; i++) {
    let arr1 = renderNumberArr(100, 1000);
    let arr2 = [...arr1];
    // 使用自己写的方法
    insertSort(arr1);
    // 标准的方法
    arr2.sort((a, b) => a - b);
    // 检验结果
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        console.log('Error!!')
        ans = false
        break
      }
    }
  }
  console.log(ans)
}
test()

// 生成指定长度的随机数值数组
function renderNumberArr(maxLength: number, maxValue: number): number[] {
  if (maxLength === 0) return [];
  let ans: number[] = new Array(maxLength);
  for (let i = 0; i < ans.length; i++) {
    let value: number = Math.floor(Math.random() * maxValue) - Math.floor(Math.random() * maxValue)
    ans[i] = value
  }
  return ans
}