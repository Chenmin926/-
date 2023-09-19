// 用户类
export class Customer {
  id: number;
  buy: number;
  // 进入某一个区域的时间
  enterTime: number;

  constructor(id: number, buy: number, enterTime: number) {
    this.id = id;
    this.buy = buy;
    this.enterTime = enterTime
  }
}

function getTopList(arr: number[], op: boolean[], k: number) {
  // 用户映射表
  let map: Map<number, Customer> = new Map();
  // 等待的区域
  let cands: Customer[] = [];
  // 中奖区域
  let daddy: Customer[] = [];
  // 返回结果，每个时间的中奖区域 一个二维的数组
  let ans: any[][] = [];

  // 遍历时间点
  for (let i = 0; i < arr.length; i++) {
    // 取出id
    let id = arr[i];
    // 当前时间点进行的操作是什么
    let byOrReturn = op[i];
    // 分情况进行判断
    // 是否之前就没买过 并且是一个退货错做 是走忽略
    if (!map.has(id) && !byOrReturn) {
      // 证明中奖名单是不需要变动的，就还是上一次的
      ans.push([...daddy])
      continue;
    }
    // 接下来会命中的逻辑
    // 之前购买数为0 此时买货
    // 之前购买数>0 此时买货
    // 之前购买数>0 此时退货
    // 之前没买过 先创建好对应的对象 之后再去调整购买信息
    if (!map.has(id)) {
      map.set(id,new Customer(id,0,0))
    }
    const customer = map.get(id)!;
    // 如果是退货
    if (!byOrReturn) {
      customer.buy--
    } else {
      // 买货
      customer.buy++
    }
    // 如果此时购买数量为0了 则需要删除客户
    if (customer.buy === 0) {
      map.delete(id)
    }

    // 进入区域进行调整
    // 如果两个区域都没有当前id
    if (!findCustomer(cands, id) && !findCustomer(daddy, id)) {
      customer.enterTime = i;
      // 如果中奖区没满
      if (daddy.length < k) {
        daddy.push(customer)
      } else {
        // 中奖区满了，先进候选区
        cands.push(customer)
      }
    }

    // 得奖区和候选区此时进行清理 清理buy为0的
    cands = cands.filter(el => el.buy);
    daddy = daddy.filter(el => el.buy);
    // 两个区域都要进行排序
    // 候选区 buy多>enterTime早优先 因为后序要按照此顺序进入中奖区
    cands.sort((a, b) => a.buy === b.buy ? a.enterTime - b.enterTime : b.buy - a.buy);
    // 中奖区的排序 buy少>enterTime早优先 按此顺序要淘汰
    daddy.sort((a, b) => a.buy === b.buy ? a.enterTime - b.enterTime : a.buy - b.buy);
    // 移动
    move(cands, daddy, k, i);
    ans.push(daddy)
  }

  return ans
}

export function findCustomer(arr: Customer[], id: number):boolean {
  return !!arr.find(el => el.id===id)
}

function move(cands: Customer[], daddy: Customer[], k: number, i: number) {
  // 如果此时候选区没人了
  if (!cands.length) return;
  // 中奖区未满
  if (daddy.length < k) {
    // 候选区的第一个要进入
    let customer = cands.shift()!;
    customer.enterTime = i;
    daddy.push(customer);
  } else {
    // 中奖区满了
    // 候选区的第一个购买数量是否大于中奖区的第一个
    if (cands[0].buy > daddy[0].buy) {
      // 两者位置互换
      let canCustom = cands.shift()!;
      let dadyCustom = daddy.shift()!;
      canCustom.enterTime = i;
      dadyCustom.enterTime = i;
      daddy.push(canCustom);
      cands.push(dadyCustom)
    }
  }
}