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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  // 边界条件
  if (!preorder || !inorder || preorder.length !== inorder.length) return null

  // 建立map避免每次要去先序数组中查找
  let map: Record<string, number> = {};
  inorder.forEach((n, i) => map[n] = i)

  return fn(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1)

  // 递归函数
  // 有一棵树 先序结果为pre[l1...r1] 中序结果为in[l2...r2]
  function fn(pre: number[], l1: number, r1: number, ins: number[], l2: number, r2: number): TreeNode | null {
    // 可能出现左树或者右树为空
    if (l1 > r1) return null;
    // 新建节点
    let node: TreeNode = new TreeNode(pre[l1]);
    // 只有一个节点的情况
    if (l1 === r1) return node;
    // 寻找当前节点在先序遍历时的位置索引
    let find = map[pre[l1]];
    // 左右树赋值
    // 找到在中序中的位置后可以发现其左侧等量的数n其实就是它的左树
    // 那么在先序中其实就等于 它自身+n 那么就是他在先序中左树范围的边界
    // 而这个边界是如何来的? find-l2
    node.left = fn(pre, l1 + 1, l1 + find - l2, ins, l2, find - 1);
    node.right = fn(pre, l1 + find - l2 + 1, r1, ins, find + 1, r2)
    return node
  }
};