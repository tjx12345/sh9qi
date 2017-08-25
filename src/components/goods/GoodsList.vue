<template>
    <div class="tmpl">
        <nav-bar title="商品列表"></nav-bar>
        <ul class="mui-table-view mui-grid-view">
            <li  v-for="goods in goodsList" :key="goods.id" class="mui-table-view-cell mui-media mui-col-xs-6">
                <a>
                    <img class="mui-media-object" :src="goods.img_url">
                    <div class="mui-media-body">{{goods.title}}</div>
                    <div class="desc">
                        <div class="sell">
                            <span>￥{{goods.sell_price}}</span>
                            <s>￥{{goods.market_price}}</s>
                        </div>
                        <div class="detail">
                            <div class="hot">
                                热卖中
                            </div>
                            <div class="count">
                                剩{{goods.stock_quantity}}件
                            </div>
                        </div>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            goodsList:[],//商品列表数据
        }
    },
    created(){
        //发起请求,(默认就是1)
        this.$ajax.get('getgoods?pageindex=1')
        .then(res=>{
            this.goodsList = res.data.message;
        })
        .catch(err=>{
            console.log('获取商品列表失败',err);
        })
    }
}


</script>
<style scoped>
.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
}

.sell > span {
    float: left;
    color: red;
    text-align: left;
}

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}


/*撑开，去除浮动没有的高度*/

.detail {
    overflow: hidden;
}

.desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
    height: 200px;
}
</style>
