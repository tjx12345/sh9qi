//引入第三方包 开始
import Vue from 'vue';

//引入组件 开始
import App from './App.vue';
//原来此处都是 Import的写法，现在改为按需加载
//const Foo = resolve => require(['./Foo.vue'], resolve)
const Home = r => require(['./components/home/Home.vue'],r);
const Vip = r => require(['./components/vip/Vip.vue'],r);
const Shopcart = r => require(['./components/shopcart/Shopcart.vue'],r);
const Search = r => require(['./components/search/Search.vue'],r);
const NewsList = r => require(['./components/news/NewsList.vue'],r);
const NewsDetail = r => require(['./components/news/NewsDetail.vue'],r);
const PhotoList = r => require(['./components/photo/PhotoList.vue'],r);
const PhotoDetail = r => require(['./components/photo/PhotoDetail.vue'],r);
const GoodsList = r => require(['./components/goods/GoodsList.vue'],r);
const GoodsDetail = r => require(['./components/goods/GoodsDetail.vue'],r);
const GoodsComment = r => require(['./components/goods/GoodsComment.vue'],r);
const NotFound = r => require(['./components/commons/NotFound.vue'],r);
//引入组件 结束

//全局组件的操作 开始
import NavBar from './components/commons/NavBar.vue';
import Comment from './components/commons/Comment.vue';
import MySwipe from './components/commons/MySwipe.vue';
Vue.component('MySwipe',MySwipe); //<my-swipe url="xxx"></my-swipe>
Vue.component('NavBar',NavBar); //<nav-bar title="xxx"></nav-bar>
Vue.component('Comment',Comment); //<comment cid="xxx"></comment>
//全局组件的操作 结束




//Moment：开始
import Moment from 'moment';
//声明全局过滤器
Vue.filter('convertDate',function(value){  
    return Moment(value).format('YYYY-MM-DD');
});
//Moment：结束

//VuePreview: 开始
import VuePreview from 'vue-preview';
Vue.use(VuePreview);
//VuePreview: 结束

//MintUi: 开始
// import MintUi from 'mint-ui';
// import 'mint-ui/lib/style.css';
// Vue.use(MintUi);

import Header from 'mint-ui/lib/header';
import 'mint-ui/lib/header/style.css';
import Switch from 'mint-ui/lib/switch';
import 'mint-ui/lib/switch/style.css';
import Swipe from 'mint-ui/lib/swipe';
import 'mint-ui/lib/swipe/style.css';
import SwipeItem from 'mint-ui/lib/swipe-item';
import 'mint-ui/lib/swipe-item/style.css';
import Lazyload from 'mint-ui/lib/lazyload';
import 'mint-ui/lib/lazyload/style.css';
import Loadmore from 'mint-ui/lib/loadmore';
import 'mint-ui/lib/loadmore/style.css';
import Indicator from 'mint-ui/lib/indicator';
import 'mint-ui/lib/indicator/style.css';
import Button from 'mint-ui/lib/button';
import 'mint-ui/lib/button/style.css';
Vue.component(Header.name, Header);
Vue.component(Switch.name, Switch);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Button.name, Button);
Vue.use(Lazyload);





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
   //更改默认router-link匹配锚点值后加上的class名，默认值router-link-active  
   linkActiveClass:'mui-active',
   routes:[
        //加入重定向
    { path:'/',redirect:{name:'home'} }, 
    {name:'home',path:'/home',component:Home},//首页
    {name:'vip',path:'/vip',component:Vip}, //vip会员
    {name:'shopcart',path:'/shopcart',component:Shopcart}, //购物车
    {name:'search',path:'/search',component:Search}, //查找
    {name:'news.list',path:'/news/list',component:NewsList},//新闻列表
    {name:'news.detail',path:'/news/detail',component:NewsDetail},//新闻详情
    {name:'photo.list',path:'/photo/list',component:PhotoList},//图文分享
    {name:'photo.detail',path:'/photo/detail/:imgId',component:PhotoDetail},//图片详情
    {name:'goods.list',path:'/goods/list',component:GoodsList}, //商品列表
    {name:'goods.detail',path:'/goods/detail/:goodsId',component:GoodsDetail},//商品详情
    {name:'goods.comment',path:'/goods/comment',component:GoodsComment},//商品评论
    {name:'goods.PhotoDetail',path:'/goods/photo/detail',component:NewsDetail},//商品图文详情


    //404
    {path:'*',component:NotFound},//404组件
   ]
});

//测试全局钩子的操作，应用场景，就是前端的权限控制  开始
// router.beforeEach((to, from, next) => {
//       //假如后台返回 当前用户 只有goods类的权限，说明当前用户就不能进入photo
//       let permissions = 'goods';//假如服务器返回权限
//       console.log('to',to);
//       console.log(to.name.startsWith(permissions));
//       console.log('from',from);
//       //next(); //放行  行为: 1:放行 ,2:不放行 3:重定向
//       if(to.name.startsWith(permissions)){
//           next();
//       }else{
//           alert('您好，您不具备权限访问该页面');
//           next(false);
//       }
// });
//测试全局钩子的操作，应用场景，就是前端的权限控制  结束




//VueRouter: 结束

//Axios: 开始
import Axios from 'axios';
Vue.prototype.$ajax = Axios;
Axios.defaults.baseURL = 'http://182.254.146.100:8899/api/';
//设置loading拦截器
Axios.interceptors.request.use(config=>{
    Indicator.open({//显示loadding图标
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
   return config; 
});
//响应的拦截器
Axios.interceptors.response.use(response=>{
    Indicator.close(); //关闭loadding图标
    return response;
})

//Axios: 结束


//引入第三方包 结束


console.log('更改了代码1');
console.log('此时更改了js代码，通过版本号绕过缓存，但是你看图片')
console.log('修改了main.js,其余图片未改动');
console.log('提取第三方以后，修改了main.js,第三方未改动1');
console.log('提取第三方以后，修改了main.js,第三方未改动2');


new Vue({
    el:'#app',
    router,
    render:c=>c(App)
})