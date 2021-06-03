export {};

type InferPromise<T> = T extends (() => Promise<infer A>) ? A : never;
type Lift<T> = { [P in keyof T]: string };

type A = InferPromise<() => Promise<string>>;

type ToChain<T> = { [key in keyof T]: () => Chain<InferPromise<T[key]>> };
type T1 = ToChain<H1>;

type Chain<R> = ToChain<R> & { perform: () => Promise<R> };

class H2 {
  async getResult(): Promise<string> {
    return 'yay';
  }
}

class H1 {
  async getH2(): Promise<H2> {
    return new H2();
  }
}


function doChain<R, T extends {getListItem: () => Promise<R>}>(obj: T): Chain<T> {
  // doSmth: () => Promise<R>
  const res = {
    perform: () => obj,
  getListItem: () =>  {perform: () => obj.getListItem()}};
  /*for (const key of Object.getOwnPropertyNames(obj.constructor.prototype)) {
    console.log(key);
    res[key] = res.perform().then(obj => doChain(obj[key]));
    res[key] = doChain()
  }*/
  return <Chain<T>>res;
}

const item = {getPriority: () => Promise.resolve('high')};
const list = {getListItem: () => Promise.resolve(item)};
const chain: {
  getListItem: () => {
    getPriority: () => Chain<string>,
    perform: () => Promise<{getPriority: () => Promise<string>}>
  },
  perform: () => Promise<typeof list>
} = doChain(list);

await chain.getListItem().perform();
await list.getListItem()
 
 doChain(x).perform(); == x


const pp = await (await list.getListItem()).getPriority();
const priority = await chain.getListItem().getPriority().perform();


rr.then(console.log);

//const r = doChainResult(doChainH2(doChainH1())).perform();

//r.then(console.log);

async getItem()

interface Item {
  getPriority(): Promise<string>;
}

Chain<Item> {
  getPriority(): Chain<string>;
  perform(): Promise<Item>;
}

getItem(): Chain<Item> {
  return {
    perform: {
      this.getItem();
    }
  }
}