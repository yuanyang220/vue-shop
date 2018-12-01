<template>
<div class="shoplist">
       <router-link class="list" :to="'/home/goodsdetail/'+item.id" v-for="item in goodslist" :key="item.id" tag="div">
       <!-- 使用图片懒加载功能 -->
           <img v-lazy="item.img_url" alt="">
           <p class="title">{{item.title}}</p>
           <div class="glay">
               <span class="nowprice">￥{{item.sell_price}}</span> 
               <span class="oriprice">￥{{item.market_price}}</span>
               <div class="bottom">
                   <span class="hot">热卖中</span>
                   <span class="number">剩{{item.stock_quantity}}件</span>
               </div>
           </div>
       </router-link>
        <!-- 点击加载更多 -->
    <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>
</div>
   
       
</template>
<script >
    export default{
       data(){
            return{
            goodslist:[],
            //默认第一页
            pageindex:1
            }
       },
       created(){
           this.getGoodslist();
       },
       methods:{
           getGoodslist(){
               this.$http.get('api/getgoods?pageindex='+this.pageindex).then(function(res){
                   console.log(res);
                   if(res.body.status==0){
                       //对商品进行拼接,如果不凭借,则会加在后面的会覆盖前面的商品内容 concat......数组拼接
                       this.goodslist=this.goodslist.concat(res.body.message);
                   }
                   
               })
           },
        loadMore(){
                //把当前页码需要++
                this.pageindex ++ ;
                this.getGoodslist();
            }
       }
    };
</script>

<style lang='scss' spoced>
// 装相关loader器npm i sass-loader node-sass  -D ，sass-loader依赖于node-sass，所以也需要安装
// style只能默认的写css样式,如果要设置对应的css扩展如scss扩展或是less,需要给style便签设置为lang='scss'
// 如果需要支持scss这个扩展,还需要在wepack.config.js中配置参数
     .shoplist{
        //设置弹性布局
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 6px 6px;
        margin-bottom: 40px;
        .list{
            width: 49%;
            margin-bottom: 6px;
            padding: 4px;
            box-shadow: 0px 0px 5px #ccc;
            border-radius: 3px;
            //弹性布局,上下垂直布局,并且上下吸底.对齐
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            img{
                width: 100%;
            }
            img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
            }
            .title{
                color: #000;
                font-size: 15px;
                font-weight: bold;
                text-align: center;
            }
            .glay{
                background-color: #ededed;
                // height: 50px;
                .nowprice{
                    color: #f00;
                    font-weight: bold;
                    font-size: 12px;
                }
                .oriprice{
                    color: #999;
                    font-size: 12px;
                    text-decoration: line-through;
                    margin-left: 10px;

                }
            }
            .bottom{
                font-size: 12px;
                color: #999;
                .number{
                    float: right;
                }
            }
        }
    }   

</style>    