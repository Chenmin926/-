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

function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;
  // 最大深度就是看左树和由树谁最大，然后加上自身
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};