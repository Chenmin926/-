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

function binaryTreePaths(root: TreeNode | null): string[] {
  let ans: string[] = []
  if (!root) return ans;
  fn(root, '');
  return ans;
  function fn(node: TreeNode, pre: string) {
    if (!node.left && !node.right) {
      ans.push(pre + node.val)
      return
    }
    pre += node.val + '->';
    if (node?.left) {
      fn(node.left!, pre)
    }
    if (node?.right) {
      fn(node.right!, pre)
    }
  }
};