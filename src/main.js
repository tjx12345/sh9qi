//引入第三方包 开始
import Vue from 'vue';

//引入组件 开始
import App from './App.vue';
import Home from './components/home/Home.vue'
import Vip from './components/vip/Vip.vue';
import Shopcart from './components/shopcart/Shopcart.vue';
import Search from './components/search/Search.vue';
import NewsList from './components/news/NewsList.vue';
import NewsDetail from './components/news/NewsDetail.vue';
import PhotoList from './components/photo/PhotoList.vue';
//引入组件 结束

//全局组件的操作 开始
import NavBar from './components/commons/NavBar.vue';
Vue.component('NavBar',NavBar); //<nav-bar></nav-bar>
//全局组件的操作 结束




//Moment：开始
import Moment from 'moment';
//声明全局过滤器
Vue.filter('convertDate',function(value){  
    return Moment(value).format('YYYY-MM-DD');
});
//Moment：结束



//MintUi: 开始
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUi);
//MintUi: 结束

// Mui: 开始
import './static/libs/mui-master/dist/css/mui.css';
// Mui: 结束

// 引入全局的css
import './static/css/global.css';



//VueRouter: 开始
import VueRouter from 'vue-router';
Vue.use(VueRouter);
let router = new VueRouter({
   routes:[
        //加入重定向
    { path:'/',redirect:{name:'home'} }, 
    {name:'home',path:'/home',component:Home},//首页
    {name:'vip',path:'/vip',component:Vip}, //vip会员
    {name:'shopcart',path:'/shopcart',component:Shopcart}, //购物车
    {name:'search',path:'/search',component:Search}, //查找
    {name:'news.list',path:'/news/list',component:NewsList},//新闻列表
    {name:'news.detail',path:'/news/detail',component:NewsDetail},//新闻详情
    {name:'photo.list',path:'/photo/list',component:PhotoList}//图文分享

   ]
})
//VueRouter: 结束

//Axios: 开始
import Axios from 'axios';
Vue.prototype.$ajax = Axios;
Axios.defaults.baseURL = 'http://182.254.146.100:8899/api/';
//Axios: 结束


//引入第三方包 结束


new Vue({
    el:'#app',
    router,
    render:c=>c(App)
})