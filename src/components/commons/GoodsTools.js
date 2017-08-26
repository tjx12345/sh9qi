let goodsTools = {};

//初始化存储商品的对象
// let prods = {88:1};
let prods = JSON.parse(window.localStorage.getItem('prods'))||{};
goodsTools.addOrUpdate = function(goods){  // -> {id:88,num:1  }
   //判断当前id是否存在
   if(prods[goods.id]){  //goods.id -> 88 /89
        prods[goods.id] += goods.num;
   }else{
    //当前id不再对象的key中，也就是没有存储过
        prods[goods.id] = goods.num;
   }
   //要让内存的对象与本地存储保持同步
   this.save(prods);
}
//删除  {88:1,89:2}
goodsTools.deleteProd = function(prodId){
    delete prods[prodId];
    //要让内存的对象与本地存储保持同步
    this.save(prods);
}
//获取数据
goodsTools.getProds = function(id){
  let prods = JSON.parse(window.localStorage.getItem('prods'))||{};
    if(id){
        return prods[id]; //传id返回数量
    }else{
        return prods;
    }
}
// 本地存储prods
goodsTools.save = function(prods){
    window.localStorage.setItem('prods',JSON.stringify(prods)); // [Object:object]
}
// 返回商品总数
goodsTools.getProdCount = function(){
  let sum = 0;
  let prods = this.getProds();

  for(let id in prods){
      sum += prods[id];
  }
  return sum;
}


export default goodsTools; // import xxx from './xxx.js'