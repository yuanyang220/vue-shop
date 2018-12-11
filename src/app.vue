<template>
    <div class="app">
        <!-- header -->
        <mt-header fixed title="商城">
            <span slot="left" v-show="flag">
                    <mt-button icon="back" @click="goBack">返回</mt-button>
            </span>
        </mt-header>        
        <!-- 主体部分 -->
        
        <!-- 底部tabar -->
            <nav class="mui-bar mui-bar-tab">
                <router-link class="mui-tab-item" to="/home">
                    <span class="mui-icon mui-icon-home"></span>
                    <span class="mui-tab-label">首页</span>
                </router-link>
                <router-link class="mui-tab-item" to="/member">
                    <span class="mui-icon mui-icon-contact"></span>
                    <span class="mui-tab-label">会员</span>
                </router-link>
                <router-link class="mui-tab-item" to="/cart">
                <!-- <span class="mui-badge">9</span> -->
                    <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">{{$store.getters.getTotalNumber}}</span></span>
                    <span class="mui-tab-label">购物车</span>
                </router-link>
                <router-link class="mui-tab-item" to="/search">
                    <span class="mui-icon mui-icon-search"></span>
                    <span class="mui-tab-label">搜索</span>
                </router-link>
            </nav>
       <router-view></router-view>
    </div>
</template>
<script >
import mui from "./lib/mui/js/mui.js";
mui('body').on('tap','a',function(){document.location.href=this.href;});
export default{
    data(){
        return{
            flag:false ///控制返回按钮的显示和隐藏
            
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        }
    },
   //使用watch来监听路由对象
    watch:{
      '$route':function(a,b){
        // newValue这是新的路由对象
        // oldValue这是旧的路由对象
        console.log(a,b);
        //如果newValue.path == /home，把flag设置为false,否则为true
        if(a.path == '/home'){
          this.flag = false;
        }else{
          this.flag = true;
        }
      }
    }

}
</script>

<style lang='scss' spoced>
// 装相关loader器npm i sass-loader node-sass  -D ，sass-loader依赖于node-sass，所以也需要安装
// style只能默认的写css样式,如果要设置对应的css扩展如scss扩展或是less,需要给style便签设置为lang='scss'
// 如果需要支持scss这个扩展,还需要在wepack.config.js中配置参数
.app{
    padding-top:40px;
    padding-bottom:50px;
}
  
</style>    