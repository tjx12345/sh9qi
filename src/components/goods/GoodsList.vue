<template>
    <div class="tmpl" :style="{height:parentHeight+'px'}">
        <nav-bar title="商品列表"></nav-bar>
    
            <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="autoFill" @bottom-status-change="stateChange" ref="loadmore">
                <ul class="mui-table-view mui-grid-view" ref="ul">
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
        </mt-loadmore>



        
    </div>
</template>
<script>
export default {
    data(){
        return {
            goodsList:[],//商品列表数据
            allLoaded:false,//禁止上拉函数的触发
            autoFill:false,//检测数据是否撑满父盒子的机制，自动调用上拉函数，默认值是true
            parentHeight:0, //父盒子高度
            pageIndex:2, //初始下拉的页码
        }
    },
    created(){
        //发起请求,(默认就是1)
       this.loadmoreFirst();
    },methods:{
        loadmoreFirst(){ //加载第一页的数据
             this.$ajax.get('getgoods?pageindex=1')
            .then(res=>{
                this.goodsList = res.data.message;
            })
            .catch(err=>{
                console.log('获取商品列表失败',err);
            })
        },
        loadmoreByPage(page){ //追加数据
             this.$ajax.get('getgoods?pageindex='+page)
            .then(res=>{
                //判断当前返回的数据是否是10条，是的话 证明后续有数据
                //否则后续无数据，禁止上拉函数的调用
                if(res.data.message.length != 10){
                    this.allLoaded = true; //禁止上拉函数调用
                }
                //将当前数据进行追加
                this.goodsList = this.goodsList.concat(res.data.message);
            })
            .catch(err=>{
                console.log('获取商品列表失败',err);
            })
        },
        loadBottom(){
            this.loadmoreByPage(this.pageIndex); //2 3
            //页码自增
            this.pageIndex++;//3 4

            //获取第2页的数据，直到没有数据了，allLoaded=true

            //通知loading状态结束，进入下一次上拉的过程
            // console.log(this.$refs.loadmore.$data);
            // console.log(this.$refs.ul);
            this.$refs.loadmore.onBottomLoaded();

        },
        stateChange(state){
            // console.log(state);
        },     
    },
    mounted(){//DOM生成，可以操作DOM
            let headerHeight = this.$parent.$refs.n1.$el.offsetHeight;
            let footerHeight = this.$parent.$refs.n2.offsetHeight;
            this.parentHeight = document.documentElement.clientHeight - headerHeight - footerHeight;
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
