
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


function pre(head: TreeNode | null) {
  // 栈
  if (head) {
    let stack: TreeNode[] = [];
    stack.push(head);
    while (stack.length) {
      let cur = stack.pop();
      if (cur) {
        console.log('----',cur.val)
      }
      if (cur?.right) {
        stack.push(cur.right)
      }
      if (cur?.left) {
        stack.push(cur.left)
      }
    }
  }
}

function inorderTraversal(root: TreeNode | null): number[] {
  let ans:number[] = []
  if (root) {
    let stack: TreeNode[] = [];
    while (stack.length || root) {
      if (root) {
        stack.push(root);
        root = root.left;
      } else {
        root = stack.pop();
        console.log(root.val);
        root && ans.push(root.val)
        root = root.right
      }
    }
  }
  return ans
};

// 后序遍历
function postorderTraversal(root: TreeNode | null): number[] {
  let ans: number[] = [];
  if (root) {
    let s1: TreeNode[] = [];
    let s2: TreeNode[] = [];
    s1.push(root) 
    while (s1.length) {
      root = s1.pop();
      root && s2.push(root);
      if (root?.left) {
        s1.push(root.left)
      }
      if (root?.right) {
        s1.push(root.right)
      }
    }
    while (s2.length) {
      ans.push(s2.pop().val)
    }
  }
  return ans
};


// 层序遍历
function layer(root: TreeNode | null) {
  if (!root) return
  let queue = [root];
  while (queue.length) {
    let cur = queue.pop();
    console.log(cur.val);
    if (cur.left) {
      queue.push(cur.left)
    }
    cur.right && queue.push(cur.right);
  }
}