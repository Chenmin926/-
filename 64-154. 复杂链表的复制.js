/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * 额外空间解法
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
  if (!head) return null;
  let cur = head;
  let map = new Map();

  while (cur!==null) {
    map.set(cur, new Node(cur.val));
    cur = cur.next;
  }

  cur = head;
  while (cur!==null) {
    map.get(cur).next = map.get(cur.next)
    map.get(cur).random = map.get(cur.random)
    cur = cur.next
  }

  return map.get(head)
};

/**
 * 不开辟额外空间的写法
 * @param {*} head 
 * @returns 
 */
var copyRandomList2 = function (head) {
  if (!head) return null
  let cur = head
  // 将链表调整为复杂链表
  while (cur !== null) {
    let next = cur.next;
    cur.next = new Node(cur.val);
    cur.next.next = next;
    cur = next;
  }
  cur = head;
  while (cur !== null) {
    let copy = cur.next;
    let next = cur.next.next;
    copy.random = cur.random !=null ? cur.random.next : null;
    cur = next
  }

  let ans = head.next;
  cur = head
  while (cur !== null) {
    let copy = cur.next;
    let next = cur.next.next;
    copy.next = next != null ? next.next : null;
    cur.next = next
    cur = next
  }

  return ans
}