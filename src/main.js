//这是项目的入口文件main.js
//注意:如果需要webpack对比js1文件进行打包处理
//引入vue框架 
//下面的安装vue框架,并不是完整的框架
//import Vue from 'vue/dist/vue.js';//第一种引用完整的vuejs  ok
//[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
import Vue from 'vue';//要手动在配置里面修改,让他默认读取vue.js
//导入vuex组件
import Vuex from 'vuex';
//注册到vue中
Vue.use(Vuex);
//引入vuex 实现数据共享
//实时获取本地数据
var cartData=JSON.parse(localStorage.getItem('cartData'))||'[]';
var store=new Vuex.Store({
    //数据共享定义在state(Data)//四个数据,是否是选中状态selected  id商品id  number商品数量 price商品价格 
    state:{
        cartData:cartData//这里的购物车应该从本地存储
    },
    //修改共享数据只能通过mutations this.$store.commit('方法名','唯一的参数')
    mutations:{
        add(state,data){
            //添加商品到共享数据中
            //console.log(data);
            var flag=false;//默认没有相同的商品
            //如果有相同的商品,需要加数量
            state.cartData.forEach(function(item,index){
                //console.log(item,index);
                if(item.id==data.id){
                    // console.log(item.id,data.id);
                    //找到相同商品，数量加data.number个,数字最好转化为整形,不然会拼接成字符串
                    item.number= parseInt(item.number)+parseInt(data.number);
                    flag=true;//找到了相同商品。把标识改为true;

                }
                
            });
            //如果为false,上面循环没有找到相同商品，则添加一个商品
            if(flag==false){
                state.cartData.push(data);
            }          
            //还需要写入到本地存储中
            localStorage.setItem('cartData',JSON.stringify(state.cartData));
        },
        //修改商品的选中状态
        changeSelected(state,obj){
            console.log(obj);
            state.cartData.forEach(function(item,index){
                //找到对应的商品id,修改带过来的状态
                if(item.id==obj.id){
                    item.selected=obj.selected;
                }
            })
            // 更新之后需要同步到本地存储
            localStorage.setItem('cartData',JSON.stringify(state.cartData));
            
        },
        //删除购物车的商品
        del(state,id){
            console.log('id:'+id);
            state.cartData.forEach(function(item,index){
                //找到要删除的商品id
                if(item.id==id){
                    //删除当前id元素 arr.splice(索引,删除的长度) 索引从自己开始删除对应第二个参数的几个值
                    state.cartData.splice(index,1); 
                }
                //同步到本地存储
                localStorage.setItem('cartData',JSON.stringify(state.cartData));
            })
        },
        //改变购物车的商品数量
        changeNumber(state,obj){
            //修改数量
            state.cartData.forEach(function(item,index){
                if(item.id==obj.id){
                    //找到对应的商品id
                    item.number=obj.number;
                }
            });
             //需要同步到本地存储
            localStorage.setItem('cartData',JSON.stringify(state.cartData));
        }

    },
    //用于暴露数据给外面的使用的
    getters:{
        //获取商品数量的总数
        getTotalNumber(state){
            //算出商品的总数
            var totalNumber = 0;
            state.cartData.forEach(function(item,index){
                totalNumber += parseInt(item.number);
            });
            return totalNumber;
        },
        //获取商品的id
        getGoodsIds(state){
            //定义一个空数组
            var ids = [];
            state.cartData.forEach(function(item,index){
                ids.push(item.id);
            });
            //把数组变成字符串
            return ids.join(',');
        },
        //获取购物车商品id和对应数量的对象 {商品id:商品数量}
        getGoodsNumber(state){
            var obj = {};
            //json对象也可以像php数组一样，通过下标也可以访问到具体值
            state.cartData.forEach(function(item,index){
              obj[item.id] = item.number;
            });
            return obj;
          },
          //获取商品的选中状态{商品id:商品选中状态}
          getGoodsSelected(state){
            var obj ={};
            //json对象也可以想php数组一样,通过下标也可以访问到具体值
            state.cartData.forEach(function(item,index){
                obj[item.id]=item.selected;
            });
            return obj;
          },
          //获取购物车选中商品的数量和总价格
          getSelectedGoodsInfo(state){
              var obj={
                  selectedNumber:0,
                  selectedPrice:0
              }
              state.cartData.forEach(function(item,index){
                  //判断是否选中
                  if(item.selected==true){
                      obj['selectedNumber']+=parseInt(item.number);
                      obj['selectedPrice']+=parseInt(item.price)*item.number;

                  }
                  
              })
              return obj;
          }
    }
});
//导入js文件
//import './js/index.js';

//console.log('main.js');
//引入 vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource);
//引入jq 最终webpack会把引进的所有文件都打包到bundle.js里面
//import '../lbs/js/jquery.js';
//导入通过npm下载的jq.js  node方式
//var jquery = $ = require('jquery');
//import $ from 'jquery';
//console.log(import $ from 'jquery');
//导入有赞vant-ui的组件和样式
import Vant from 'vant';
import 'vant/lib/index.css';
//注册有赞到全局
Vue.use(Vant);
//全局导入mintui所有的组件
import MintUI from 'mint-ui';
//导入mint-ui的样式
import 'mint-ui/lib/style.css';
//按需导入我们所需要的组件
//import { Button } from 'mint-ui';
//修改默认组件的名称（）
//Button.name = 'mybutton';
//Vue.component(Button.name, Button);
//把mint-ui注册到全局中
Vue.use(MintUI);


//导入mui的css样式
import './lib/mui/css/mui.css';

//导入扩展字符实体
import './lib/mui/fonts/mui-icons-extra.ttf';

//导入扩展字符实体样式
import './lib/mui/css/icons-extra.css';
//import mui from './lib/mui/js/mui.js';
//导入mui的 lockjs
//import './lib/mui/js/lock.js';
//引入图片预览插件
import VuePreview from 'vue-preview'
//安装到vue身上
Vue.use(VuePreview); 
//导入根组件app.vue
import app from './app.vue';
// //引入tabbar组件
// import home from './components/tabbar/home.vue';
// import cart from './components/tabbar/cart.vue';
// import search from './components/tabbar/search.vue';
// import member from './components/tabbar/member.vue';
// import newslist from './components/news/newslist.vue';
// import newdetail from './components/news/newdetail.vue';
//注册到全局        
//Vue.component(login);
//在webpack推荐使用.vue的形式来创建组件.不再推荐使用component来创建组件
//导入路由
import VueRouter from 'vue-router';
//引入moment模块
import moment from 'moment';
// //手动安装注册VueRouter
 Vue.use(VueRouter);
 //定义一个全局过滤器:
 Vue.filter('DateFormat',function(dateStr,pattern='YYYY-MM-DD HH:mm:ss'){
     return moment(dateStr).format(pattern);
 })


//导入路由模块,获取路由参数
import router from './router.js';
//全局设置ajax请求的根域名
Vue.http.options.root='http://127.0.0.1:3000/';
//创建路由对象
// var router =new VueRouter({
//     //手动安装vuerouter到vue中去
//     routes:[
//         {path:'/',component:home},
//         {path:'/home',component:home},
//         {path:'/member',component:member},
//         {path:'/cart',component:cart},
//         {path:'/search',component:search},
//         {path:'/home/newslist',component:newslist},
//         {path:'/home/newdetail/:id',component:newdetail}
//     ],
//      //点击事件设置为高亮
//      //修改路由匹配到的默认类,修改为mui的类
//      linkActiveClass: 'mui-active'
// });
//创建vue实例
new Vue({
    el:'#app',
  
    render:function(creatElement){
        return creatElement(app);//return的结果是根组件会把el,#app的视图覆盖
    },
    //把路由对象挂载在vm实例身上
    router,
    //把数据共享仓库都vue实例中
    store
    
});

//webpack1结合.vue组件的使用总结
//步骤一 安装.vue组件的loader ,vue-loader vue-template-compilter
//步骤二 修改webpack.config.js 设置vue文件的loader 还需要再plugins加载loaderPlugins插件对象
//步骤三 定义一个后缀为.vue的组件,这个组件有三个部分 模板template要有一个根  逻辑script需要export default暴露样式style
//步骤四 import from +.vue路径 导入即可


