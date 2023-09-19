// 前缀树节点
class Node1 {
  pass: number = 0;
  end: number = 0;
  // 存放的后序节点，现在只假设出现a-z的26个字母
  // 0 a
  // 1 b
  // ...字符与下标一一对应 原理利用=字符-a的ASCII设置为路径
  // nexts[i] === null 路径不存在
  // nexts[] ！== null 路径存在
  nexts: Node1[] = []
}

class Trie1 {
  // 头节点
  root: Node1 = new Node1();
  
  /**
   * 构建路径
   * @param word 字符串 
   * @returns 
   */
  insert(word: string) {
    if (!word) return;
    // 字符转成数组
    let arr = word.split('');
    // 从头节点出发
    let node = this.root;
    // 因为要加新的节点
    node.pass++;
    let path = 0;
    // 遍历字符数组
    for (let i = 0; i < arr.length; i++) {
      // 当前字符属于哪条路径
      path = arr[i].charCodeAt(0) - 'a'.charCodeAt(0)
      // 判断当前节点下对应的路径是否为空
      if (!node.nexts) {
        // 是空的，建立节点
        (node.nexts[path] as Node1) = new Node1();
      }
      // 此时对应路径有了，node位移
      node = node.nexts[path];
      node.pass++
    }
    // 结尾数量发生变化
    node.end++;
  }

  delete(word: string) {
    if (!word) return
    // 确定字符存在树中
    if(!this.search(word)) return
    // 字符串分隔
    let arr = word.split('');
    let node = this.root;
    // 根节点次数必会减少
    node.pass--
    let path = 0
    for (let i = 0; i < arr.length; i++) {
      path = arr[i].charCodeAt(0) - 'a'.charCodeAt(0);
      // 当前节点下的对应路径pass减少
      // 判断它是否pass为0了，为0则表示该路径应该被清除
      if (--node.nexts[path].pass===0) {
        node.nexts[path] = null
        return
      }
      node = node.nexts[path]
    }
    node.end--
  }

  /**
   * 查找前缀出现过的次数
   * @param word 字符
   * @returns 次数
   */
  prefixNumber(word: string): number {
    if (!word) return 0
    // 字符串分隔
    let arr = word.split('');
    let node = this.root;
    let path = 0
    for (let i = 0; i < arr.length; i++) {
      path = arr[i].charCodeAt(0) - 'a'.charCodeAt(0);
      // 如果提前找不到路径了，那么肯定没出现过 
      if (!node.nexts[path]) {
        return 0
      }
      node = node.nexts[path]
    }
    return node.pass
  }

  /**
   * 查找字符出现过多少次
   * @param word 字符
   * @returns 次数
   */
  search(word: string): number {
    if (!word) return 0
    // 字符串分隔
    let arr = word.split('');
    let node = this.root;
    let path = 0
    for (let i = 0; i < arr.length; i++) {
      path = arr[i].charCodeAt(0) - 'a'.charCodeAt(0);
      // 如果提前找不到路径了，那么肯定没出现过 
      if (!node.nexts[path]) {
        return 0
      }
      node = node.nexts[path]
    }
    return node.end
  }
}
