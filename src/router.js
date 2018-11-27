
//导入路由
import VueRouter from 'vue-router';
// //手动安装注册VueRouter
// Vue.use(VueRouter);
//引入tabbar组件
import home from './components/tabbar/home.vue';
import cart from './components/tabbar/cart.vue';
import search from './components/tabbar/search.vue';
import member from './components/tabbar/member.vue';
import newslist from './components/news/newslist.vue';
import newdetail from './components/news/newdetail.vue';
import images from './components/images/images.vue';

var router =new VueRouter({
    //手动安装vuerouter到vue中去
    routes:[
        {path:'/',component:home},
        {path:'/home',component:home},
        {path:'/member',component:member},
        {path:'/cart',component:cart},
        {path:'/search',component:search},
        {path:'/home/newslist',component:newslist},
        {path:'/home/newdetail/:id',component:newdetail},
        {path:'/home/images',component:images}
    ],
     //点击事件设置为高亮
     //修改路由匹配到的默认类,修改为mui的类
     linkActiveClass: 'mui-active'
});

//暴露给外面
export default  router;