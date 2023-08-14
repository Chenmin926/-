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

function inorderTraversal(root: TreeNode | null): number[] {
  if (!root) return []
  let ans: number[] = [];
  fn(root);
  return ans

  function fn(node: TreeNode | null) {
    if (!node) return;
    fn(node.left);
    ans.push(node.val);
    fn(node.right);
  }
};