import { Customer} from "./55-购买top问题暴力解法";
import { HeapGreater } from './54-加强堆'


function whosYourDady(arr: number[], op: boolean[], k: number) {
  // 用户映射表
  let map: Map<number, Customer> = new Map();
  // 等待的区域 大根堆
  let cands: HeapGreater<Customer> = new HeapGreater((a, b) => a.buy === b.buy ? a.enterTime - b.enterTime : b.buy - a.buy);
  // 中奖区域 小根堆
  let daddy: HeapGreater<Customer> = new HeapGreater((a, b) => a.buy === b.buy ? a.enterTime - b.enterTime : a.buy - b.buy);
  // 当前有几个中奖
  let daddyLimit: number = k;
  let ans: any[][] = [];

  for (let i = 0; i < arr.length; i++) {
    opreate(i, arr[i], op[i]);
    ans.push(daddy.heap);
  }
  return ans

  // 处理时间点的事件
  function opreate(i: number, id: number, buyOrRetrun: boolean) {
    if (!buyOrRetrun && !map.has(id)) return;
    if (!map.has(id)) {
      map.set(id, new Customer(id, 0, 0));
    }
    let customer = map.get(id)!;
    if (buyOrRetrun) {
      customer.buy++
    } else {
      customer.buy--
    }
    if (customer.buy === 0) {
      map.delete(id)
    }
    if (!findCustomer(cands, customer) && !findCustomer(daddy, customer)) {
      // 既不在得奖区 也不再候选区
      customer.enterTime = i;
      if (daddy.heapSize < daddyLimit) {
        daddy.add(customer)
      } else {
        cands.add(customer)
      }
    } else if (cands.has(customer)) {
      // 在候选区
      if (customer.buy === 0) {
        // 如果数量为0 清除
        cands.remove(customer)
      } else {
        // 重新排序
        cands.regain(customer)
      }
    } else {
      // 在中奖区
      if (customer.buy === 0) {
        daddy.remove(customer)
      } else {
        daddy.regain(customer)
      }
    }
    move(i)
  }

  // 移动
  function move(i: number) {
    if (cands.isEmpty()) return;
    if (daddy.heapSize < daddyLimit) {
      let customer = cands.pop();
      customer.enterTime = i;
      daddy.add(customer);
    } else {
      if (cands.peek().buy > daddy.peek().buy) {
        let daddyC = daddy.pop();
        let candC = cands.pop();
        daddyC.enterTime = i;
        candC.enterTime = i;
        cands.add(daddyC);
        daddy.add(candC);
      }
    }
  }
}


function findCustomer(range: HeapGreater<Customer>, customer: Customer) {
  return range.has(customer)
}
