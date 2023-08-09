// 建立map暴力解法
function hasCycle(head: ListNode | null): boolean {
  if (head === null) return false;
  if (!head.next) return false;
  let map = new WeakMap()
  while (head) {
    if (map.has(head)) return true
    map.set(head, head.val)
    head = head.next
  }
  return false
};

// 使用快慢指针
// s每次移动一步，f每次移动两步，如果没有环那么f会先到null
// 如果有环，那么s和f将会相遇
function hasCycle1(head: ListNode | null): boolean {
  if (head === null) return false;
  if (!head.next) return false;
  if (head.next.next === head) return true
  let f = head.next;
  while (f !== head) {
    if (!f || !head) return false
    head = head!.next
    f = f.next?.next
  }
  return false
};