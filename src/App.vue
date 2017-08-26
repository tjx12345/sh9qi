<template>
    <div>
        <mt-header title="上海9期信息管理系统" ref="n1"></mt-header>
        <!-- 留坑 -->
        <!-- 过渡效果,mode 先当前元素离开，再进新元素 -->
        <transition name="main" mode="out-in">
            <router-view></router-view>
        </transition>
        <nav class="mui-bar mui-bar-tab" ref="n2">
            <router-link :to="{name:'home'}" class="mui-tab-item" >
                <span class="mui-icon icon-shouye"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link :to="{name:'vip'}" class="mui-tab-item" >
                <span class="mui-icon icon-huiyuan1"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link :to="{name:'shopcart'}"  class="mui-tab-item" >
                <span class="mui-icon icon-gouwuche-white-copy"><span class="mui-badge">{{num}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link :to="{name:'search'}" class="mui-tab-item" >
                <span class="mui-icon icon-work-search"></span>
                <span class="mui-tab-label">查找</span>
            </router-link>
        </nav>
    </div>
</template>
<script>
//引入字体css
import './static/css/iconfont.css';
//引入vuebus
import Connector from './components/commons/Connector.js';
//引入操作商品CRUD的对象
import GoodsTools from './components/commons/GoodsTools.js';

    export default {
        data(){
            return {
                num:GoodsTools.getProdCount(),
            }
        },
        created(){
            //监听
            Connector.$on('changeShopcart',(num)=>{
                // console.log('出发了更改小球');
                // console.log(this);
                this.num += num;
            });
             //监听改变总数
            Connector.$on('changeShopcart2',(num)=>{
                this.num = num;
            });
        }
    }
</script>
<style scoped>
   /*@import url('./static/css/iconfont.css');*/ 
.main-enter-active, .main-leave-active {
transition: opacity .5s
}
.main-enter, .main-leave-to  {
  opacity: 0
}
</style>