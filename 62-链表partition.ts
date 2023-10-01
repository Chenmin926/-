export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function fn(head:ListNode,target:number) {
  if (!head) return null
  
  // 小于区
  let sHead:ListNode|null = null;
  let sTail:ListNode|null = null;
  // 等于区
  let mHead:ListNode|null = null;
  let mTail:ListNode|null = null;
  // 大于区
  let bHead:ListNode|null = null;
  let bTail:ListNode|null = null;

  while (head) {
    let next = head.next;
    head.next = null

    if (head.val < target) {
      if (sHead === null) {
        sHead = head;
        sTail = head;
      } else {
        sTail.next = head;
        sTail = sTail.next
      }
    } else if (head.val === target) {
      if (mHead === null) {
        mHead = head;
        mTail = head;
      } else {
        mTail.next = head;
        mTail = mTail.next
      }
    } else {
      if (bHead === null) {
        bHead = head;
        bTail = head;
      } else {
        bTail.next = head;
        bTail = bTail.next
      }
    }

    head = next;
  }

  // 拼接h环节
  // 如果有小于区域
  if (sHead) {
    // 小于区域连接等于区域的头 这一步不论是否有等与区域
    sTail.next = mHead;
    // 下一步的话需要用到等于区域的尾
    // 如果没有等于区，那么就用小于区的尾直接去连大于区的头
    // 有的话就用等于区域的尾去连
    mTail = mTail ? bHead : mTail;
  }

  // 等于区域是否为不为空
  // 这一步判断必须进行，哪怕没有等于区或者存在等于区
  // 如果存在等于区就相当于是一个二次确认的步骤
  if (mTail) {
    mTail.next = bHead
  }
  // 返回 优先判断 小->中->大
  return sHead ? sHead : mHead ? mHead : bHead;
}