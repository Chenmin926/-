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

// 其实是一个广度优先的概念
function levelOrderBottom(root: TreeNode | null): number[][] {
  if (!root) return [];
  let ans: number[][] = [];
  // 使用队列实现
  let queue: TreeNode[] = [root];
  // 如果队列不为空 证明树没有被遍历完
  while (queue.length) {
    // 当前层有多少节点
    let size: number = queue.length;
    // 每一层的结果
    let nums: number[] = [];
    // 根据当前层节点数量进行相应操作
    for (let i = 0; i < size; i++) {
      // 取出头节点
      let node: TreeNode = queue.shift()!
      // 将其具体值添加到结果中
      nums.push(node.val);
      // 如果有左右节点则添加到队列中以待下次操作
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    ans.unshift(nums)
  }

  return ans
};