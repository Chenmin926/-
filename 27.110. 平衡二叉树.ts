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
 * 判断是否平衡二叉树 即树中每一颗子树的|左高-右高| <=1 
 * 那么从根节点宏观的去看 只要左树为平衡树 右侧为平衡树 且|左高-右高| <=1 那么该树就是平衡树
 * 所以可以递归的去如此进行判断 当收到所有信息归纳到上一步时就可以得到结果。
 */
function isBalanced(root: TreeNode | null): boolean {
  return fn(root).isBlance

  // 递归函数
  function fn(node: TreeNode | null): { isBlance: boolean, height: number } {
    // 递归的出口 空树 它也是一个特殊的平衡树，且高度为0
    if (!node) return { isBlance: true, height: 0 };
    let leftInfo = fn(node.left);
    let rightInfo = fn(node.right);
    // 树的高度=左树和右树中最高的一侧值 + 自身的1
    let height: number = Math.max(leftInfo.height, rightInfo.height) + 1
    let isBlance: boolean = leftInfo.isBlance && rightInfo.isBlance && Math.abs(leftInfo.height - rightInfo.height) <= 1;
    return { isBlance, height }
  }
};