export class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}

/**
 * 结题思路
 * 其实该题和上一题的思路大致一致，简单的做法就是在递归的时候传递的不是之前层的累加值，而是传递路径 
 * 然后每次递归时把自身放到路径中（开辟了新数组）
 * 如果到了叶节点 就计算是否符合条件
 * 但是这样的方法非常耗费内存，因为开辟了太多数组
 * 所以以下还是做出了优化 仍然传递累加值，同时传递path 但是始终操作一个path
 * 只是控制了他内部的内容 利用递归的回溯做一个出栈的操作
 */
function pathSum(root: TreeNode | null, targetSum: number): number[][] {
  if (!root) return [];
  let ans: number[][] = [];

  fn(root, [], 0)

  function fn(node: TreeNode, pre: number[], preSum: number) {
    if (!node.left && !node.right) {
      if ((preSum + node.val) === targetSum) {
        // 组成结果
        pre.push(node.val)
        // 开辟了新数组作为结果
        ans.push([...pre])
        // 出栈 避免pre中存在着错误值
        pre.pop()
      }
      return
    }
    preSum += node.val
    // 入栈
    pre.push(node.val)
    if (node.left) {
      fn(node.left, pre, preSum);
    }
    if (node.right) {
      fn(node.right, pre, preSum)
    }
    // 这一步非常重要，它相当于非叶节点的左树右树处理完以后向上回溯时的出栈操作
    // 这样就始终保证path到每个节点时都是正确的
    pre.pop()
  }
  return ans
};