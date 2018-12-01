<template>

<div class='home-lunbo'>
    <!-- <h1>home组件</h1> -->
    <!-- <mt-swipe :auto="1000">
        <mt-swipe-item v-for="item in lunbo" :key='item.url'>
            <img :src="item.img">
        </mt-swipe-item>
    </mt-swipe> -->
    <!-- 轮播图 -->
    <swipe :lunbo='lunbo'></swipe>
       <!-- 九宫格部分主体部分  -->
    <!-- 首页的九宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/images">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </router-link>
        </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/shoplist">
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
         </router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
         <img src="../../images/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a></li>
      
    </ul>
</div>



       
</template>
<script >
import swipe from '../comment/lunbotu.vue';
export default{
    data(){
        return{
            lunbo:[]
        }
    },
    created(){
        //此生命周期函数,会在当前组件data和methods属性准备好之后才会执行此函数
        //不可以用beforeCreated中去调用函数getLunbo,因为此函数中methods没有准备好
        this.getLunbo();
    },
    methods:{
        getLunbo(){
            this.$http.get('api/getlunbo').then(function(res){
                console.log(res.body.message);
                if(res.body.status==0){
                    this.lunbo=res.body.message;
                }
            });
        }
    },
    components:{
        swipe
    }
}
</script>

<style lang='scss' spoced>
// 装相关loader器npm i sass-loader node-sass  -D ，sass-loader依赖于node-sass，所以也需要安装
// style只能默认的写css样式,如果要设置对应的css扩展如scss扩展或是less,需要给style便签设置为lang='scss'
// 如果需要支持scss这个扩展,还需要在wepack.config.js中配置参数
    .home-lunbo{
    //    .mint-swipe{
    //        height:200px;
             
    //    }
    //     img{
    //             height: 100%;
    //             width: 100%;

    //         }  
        .mui-grid-9{
            background-color: #fff;
            .mui-col-sm-3{
                border: none;
               .mui-media-body{
                   font-size: 14px;
               }
               img{
                   width:50%;
               }
            }
           
        }      
    }

</style>    