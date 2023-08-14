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

function minDepth(root: TreeNode | null): number {
  let ans: number = 0;
  if (!root) return ans;
  fn(root, 0);
  return ans

  function fn(node: TreeNode, pre: number) {
    if (!node.left && !node.right) {
      let sum = pre + 1;
      console.log('sum---', sum, ans)
      if (!ans || (sum < pre)) {
        ans = sum;
      }
      return
    }
    pre += 1;
    node?.left && fn(node.left!, pre);
    node?.right && fn(node.right!, pre);
  }
};