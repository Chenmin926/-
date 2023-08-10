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
 * 搜索树需要左侧最大比自身小 右侧最小比自身大
 * 那么如果树的结构非常庞大 那么就抽象为 左右子树是否为搜索树 然后结合上一步骤 就可以判定整棵树
 * 那么每轮递归需要得到的抽象信息 就是 是否是搜索树 max min 
 * 每一轮都要 max min ？ 这是为了整合性 如果要去直接区分，那么就会变得复杂，索性不如全收集起来。
 */
function isValidBST(root: TreeNode | null): boolean {
  return fn(root)?.isSearch ?? false

  function fn(node: TreeNode | null): { isSearch: boolean, max: number, min: number } | null {
    // 为什么不用 0来作为null节点的val？
    // 如果节点是负数的情况，那么0就会出现异常干扰
    if (!node) return null;
    let leftInfo = fn(node.left);
    let rightInfo = fn(node.right);
    // max min 都默认设置为自身
    let max: number = node.val;
    let min: number = node.val;
    // 已自身作为一个左树或者右树被收纳的角度
    // 如果左树不为空
    if (leftInfo) {
      max = Math.max(leftInfo.max, max);
      min = Math.min(leftInfo.min, min)
    }
    // 右树不为空
    if (rightInfo) {
      max = Math.max(rightInfo.max, max);
      min = Math.min(rightInfo.min, min)
    }

    // 默认为搜索树
    let isSearch: boolean = true;
    // 如果左子树不是搜索树 那么自身也不是
    if (leftInfo && !leftInfo.isSearch) {
      isSearch = false
    }
    // 右子树同理
    if (rightInfo && !rightInfo.isSearch) {
      isSearch = false;
    }

    // 如果左子树的最大值不小于自身
    let leftMaxLessX = !leftInfo ? true : (leftInfo.max < node.val)
    // 右子树则是最小不大于当前
    let rightMinMoreX = !rightInfo ? true : (rightInfo.min > node.val)
    // 如果两者有一个条件不满足 则自身将不是
    if (!leftMaxLessX || !rightMinMoreX) {
      isSearch = false
    }

    return { isSearch, max, min }
  }
};