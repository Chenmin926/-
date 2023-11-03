// 多叉树结构
export class Node {
  val: number;
  children: Node[];
  constructor(val: number, children: Node[]) {
    this.val = val;
    this.children = children
  }
}

// 二叉树结构
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

// 将多叉树转为二叉树
function encode(root: Node) {
  if (root === null) {
    return null;
  }

  // 头结点肯定也是二叉树结构的头结点
  let head = new TreeNode(root.val);
  // 他的所有子节点网它的左树右边界上挂载
  head.left = en(root.children)
  return head
}

function en(list: Node[]) {
  let head = null;
  let cur = null;
  for (let i = 0, len = list.length; i < len; i++) {
    // 将节点转为二叉树形式
    let tNode = new TreeNode(list[i].val)
    // 第一个节点要作为上个节点的左树
    if (!head) {
      head = tNode
    } else {
      // 其他孩子则作为上一个兄弟节点的右子树
      cur.right = tNode
    }
    // 借用此指针完成递归
    cur = tNode;
    // 这是一个深度优先的递归，相当于同一层的兄弟 需要等上一个转换完成以后再继续转下一个
    cur.left = en(list[i].children)
  }
  return head;
}

// 将二叉树转为多叉树
function decode(root: TreeNode) {
  if (!root) return null;
  return new Node(root.val,de(root.left))
}
function de(root: TreeNode): Node[] {
  // 子节点列表
  let children:Node[] = [];

  // 递归函数
  while (root !== null) {
    // 此时也是需要进行深度优先将自身完善
    let cur = new Node(root.val, de(root.left));
    children.push(cur);
    // 自己处理完以后，下一个兄弟进行处理
    root = root.right
  }
  return children
}