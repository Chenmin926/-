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
 * 解题思路
 * 首先结果的判断位置在于叶子节点 而不在于null的空节点，如果某条路径+到叶子节点满足了条件，结果就为true 这也就是递归的出口
 * 如果不是叶子 那么就需要把上一层的和与自身相加 然后递归调用去尝试左右路径
 */
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (!root) return false
  let ans: boolean = false
  fn(root, 0)
  return ans
  function fn(node: TreeNode, pre: number): void {
    // 出口
    if (!node.left && !node.right) {
      if (pre + node.val === targetSum) {
        ans = true
      }
      return
    }
    // 递归调用
    pre += node.val
    // 尝试左侧路径
    if (node.left) {
      fn(node.left, pre)
    }
    // 尝试右侧路径
    if (node.right) {
      fn(node.right, pre)
    }
  }
};