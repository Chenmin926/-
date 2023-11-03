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

// 先序 序列化   
function preSerial(node: TreeNode) {
  let ans: number[] = [];
  pres(node,ans)
  function pres(node: TreeNode, ans: number[]) {
    if (!node) {
      ans.push(null);
    } else {
      ans.push(node.val);
      pres(node.left, ans);
      pres(node.right, ans);
    }
  }
}

// 先序 反序列化
function preBySerial(list: number[]):TreeNode|null {
  if (!list.length) return null;

  return preb(list);
  function preb(list: number[]): TreeNode | null {
    // 按照先序取出节点
    let val = list.shift();
    if (val === null) {
      return null
    }
    // 创建节点
    let node = new TreeNode(val);
    node.left = preb(list);
    node.right = preb(list);
    return node;
  }
}

// 层序 序列化
function levelSerial(node: TreeNode): number[] {
  if (!node) return [null];
  let ans: number[] = [];

  ans.push(node.val);
  let queue = [node];

  while (queue.length) {
    let cur = queue.shift();
    if (cur.left) {
      ans.push(cur.left.val);
      queue.push(cur.left)
    } else {
      ans.push(null)
    }
    if (cur.right) {
      ans.push(cur.right.val);
      queue.push(cur.right)
    } else {
      ans.push(null)
    }
  }
}

function generateNode(val: null|number) {
  if (val === null) return null
  return new TreeNode(val)
}

// 层序 反序列化
function levelBySerial(list: number[]):any {
  if (!list.length) return null;
  // 取出第一个头节点
  let head = generateNode(list.shift());
  // 同样利用队列来反序列化
  let queue = [];
  // 避免接收到的序列化结果为[null]这种边界
  if (head !== null) {
    queue.push(head)
  }
  
  // 辅助节点变量
  let node = null;
  while (queue.length) {
    // 取出对头节点
    node = queue.shift();
    // 按同样原有序列化的顺序来构建
    node.left = generateNode(list.shift());
    node.right = generateNode(list.shift());
    // 回到序列化的处理方式，如果有左节点 让他进队列
    // 这一步不会让null节点进入队列，但是会消费掉它
    if (node.left) {
      queue.push(node.left)
    }
    if (node.right) {
      queue.push(node.right)
    }
  }
}