<template>
<div class="bigbox">
    <!-- 这是商品轮播图 -->
     <!-- 卡片card：商品轮播图 -->
    <div class="mui-card ">
      <!-- <div class="mui-card-header">页眉</div> -->
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!-- 引用轮播图子组件 -->
          <swipe :lunbo="lunbo"></swipe>
        </div>
      </div>
      <!-- <div class="mui-card-footer">页脚</div> -->
    </div>
    <!-- 这是商品购买部分 -->
    <div class="mui-card buybox">
				<div class="mui-card-header">{{GoodsInfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>
                            市场价:<span class='marketpay'>￥{{GoodsInfo.sell_price}}</span> &nbsp;销售价:<span class="nowpay">￥{{GoodsInfo.market_price}}</span>
                        </p>
                        <p>
                            <div>
                                <span class="gray">购买数量:</span>
                                <!-- <h5 class="mui-content-padded">限定最小值和最大值(1~9)</h5>   data-numbox-max='9' -->
                                <div class="mui-numbox" data-numbox-min='1'>
                                    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                                    <input id="test" class="mui-input-numbox" type="number" value="1" />
                                    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
                                </div>
                            </div>
                        </p>
                        <p>
                            <mt-button type='primary'>立即购买</mt-button>
                            <mt-button type='danger'>加入购物车</mt-button>
                        </p> 
					</div>
				</div>
	</div>
    <!-- 这是参数部分 -->
    <div class="mui-card ">
        <div class="mui-card-header">商品参数</div>
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <p>
                    商品货号:{{GoodsInfo.goods_no}}
                </p>
                <p>
                    库存情况:{{GoodsInfo.stock_quantity}}件
                </p>
                <p>
                    上架时间:{{GoodsInfo.add_time|DateFormat}}
                </p>
            </div>
        </div>
       
        <div class="mui-card-footer btn">
            <mt-button plain type="primary" size="large" class="text" @click="getGoodsDesc">图文介绍</mt-button>&nbsp;&nbsp;
            <mt-button plain type="danger" size="large">商品评论</mt-button>
        </div>
    </div>
</div>
   
       
</template>
<script >
import swipe from '../comment/lunbotu.vue';
//引入mui的js文件
import mui from "../../lib/mui/js/mui.js";
console.log(mui);
    export default{
       data(){
            return{
            id:this.$route.params.id,
            lunbo:[],
            GoodsInfo:{}
        }
       },
       components:{
           swipe
       },
       created(){
           this.getLunbo();
           this.getGoodsInfo();
       },
       mounted(){
           //执行这里,说明虚拟dom已经挂载到真实的dom中,这时候,可以用js去操作页面中的dom元素
           //初始化我们的num-box组件 
           mui('.mui-numbox').numbox()
       },
       methods:{
           //获取商品的轮播图信息
           getLunbo(){
               this.$http.get('api/getthumbimages/'+this.id).then(function(res){
                   console.log(res);
                   if(res.body.message.length==0){
                    //    长度为0的时候,没有图片资源,给他新建一个对象;
                       //http://phvbk3pna.bkt.clouddn.com/zhongri1-thumb.jpg
                       //设置默认图片,追加一个对象,在轮播lunbo:[]里面
                       res.body.message.push({
                           img:"http://phvbk3pna.bkt.clouddn.com/zhongri1-thumb.jpg",
                           url:"http://phvbk3pna.bkt.clouddn.com/zhongri1-thumb.jpg"
                       });
                   }else{
                       //由于轮播图子组件swipe中的每个对象需要img个url属性,需要构造这两个数据
                       //有图片,赋值给当前Data的lunbo属性
                       res.body.message.forEach(ele=>{
                           ele.img=ele.src;
                           ele.url=ele.url;
                       });
                      
                   }
                    this.lunbo=res.body.message;
               });
           },
           getGoodsInfo(){
               //获取商品的详情
               this.$http.get('api/getGoodsInfo/'+this.id).then(function(res){
                   if(res.body.status==0){
                       this.GoodsInfo=res.body.message[0];

                   }
               })
           },
           getGoodsDesc(){
               //获取图文跳转的商品图文页面
               this.$router.push('/home/goodsdesc/'+this.id);
           }
       }
    };
</script>

<style lang='scss' spoced>
// 装相关loader器npm i sass-loader node-sass  -D ，sass-loader依赖于node-sass，所以也需要安装
// style只能默认的写css样式,如果要设置对应的css扩展如scss扩展或是less,需要给style便签设置为lang='scss'
// 如果需要支持scss这个扩展,还需要在wepack.config.js中配置参数
.bogbox{
    .buybox{
        .mui-card-content{
            .marketpay{
                text-decoration: line-through;
            }
            .nowpay{
                color: #f00;
                font-weight: bold;
            }
            .gray{
                color: #8f8f94;
            }
            .mui-numbox{
                margin-left: 8px;
            }
        }
    }
    .mui-card{
        .mui-card-footer{
      display: flex;
      justify-content: flex-start;
      .mai{
        margin-right: 5px;
      }
     
    }

     .btn{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .text{
        margin-bottom:5px;
      }
    }
   
    
}
</style>    