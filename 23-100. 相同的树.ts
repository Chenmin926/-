
class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}

// 利用先序遍历左树存储在栈中
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) return false;
  let ans: boolean = true;
  let stack: Array<number | null> = [];

  deep(p);
  deep(q, false);

  function deep(tree: TreeNode | null, isLeft: boolean = true) {
    if (!tree) {
      if (isLeft) {
        stack.push(null);
      } else {
        if (stack.shift() !== null) {
          ans = false;
        }
      }
      return
    };
    if (isLeft) {
      stack.push(tree!.val);
    } else {
      if (stack.shift() !== tree?.val) {
        ans = false;
        return
      }
    }
    deep(tree!.left, isLeft);
    deep(tree!.right, isLeft);
  }

  return ans
};

function isSameTree1(p: TreeNode | null, q: TreeNode | null): boolean {
  // 是否一个为空一个不为空
  if ((p === null) !== (q === null)) {
    return false
  }
  // 两个都为空
  if (p == null && q == null) return true;
  // 都不空
  return p?.val === q?.val && isSameTree1(p!.left, q!.left) && isSameTree1(p!.right, q!.right)
}

// 镜像树
function isSameTree2(p: TreeNode | null, q: TreeNode | null): boolean {
  // 是否一个为空一个不为空
  if ((p === null) !== (q === null)) {
    return false
  }
  // 两个都为空
  if (p == null && q == null) return true;
  // 都不空
  return p?.val === q?.val && isSameTree1(p!.left, q!.right) && isSameTree1(p!.right, q!.left)
}

let p2: TreeNode = new TreeNode(2)
let p: TreeNode = new TreeNode(1, p2)

let q2: TreeNode = new TreeNode(2)
let q: TreeNode = new TreeNode(1, null, q2)
isSameTree(p, q)