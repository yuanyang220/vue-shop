<template>

    <div class="box">
        <div class="mui-card ">
            
            <!-- <div class="mui-card-header">页眉</div> -->
            <div class="mui-card-content" v-for="(item,index) in goodsList" :key="item.id">
                <div class="mui-card-content-inner haha" >
                <!-- 引用轮播图子组件给切换开关绑定change事件 -->
                <!-- 当开关开着还是关着都会把对应的值双向绑定到$store.getters.getGoodsSelected[item.id] -->
                <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change='changeselected(item.id,$store.getters.getGoodsSelected[item.id])' ></mt-switch>
                <img :src="item.thumb_path" alt="">
                <div>
                    <h3 class="title">{{item.title}}</h3>
                    <div class="info">
                        <span class="price">￥{{item.sell_price}}</span>
                        <!-- 引用组件 type='primary'--> 
                        <numbox :goods_number="$store.getters.getGoodsNumber[item.id]" :id="item.id"></numbox>
                        <mt-button href="javascript:;" class="del"  size="small" @click.prevent='delCartGoods(item.id,index)'>删除</mt-button>
                    </div>
                </div>
                </div>
            </div>
            <!-- <div class="mui-card-footer">页脚</div> -->
        </div>
         <!-- 结算区域 -->
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner jiesuan">
				<div class="info">
                    <p>总计(不含运费)</p>
                    <p class="you">已勾选商品<span class="number">{{$store.getters.getSelectedGoodsInfo['selectedNumber']}}</span>,总价<span class="price">¥{{$store.getters.getSelectedGoodsInfo['selectedPrice']}}</span></p>
                    </div>
                    <mt-button  type="danger" size='normal'>结算</mt-button>
				</div>
			</div>
		</div>
      <hr>
      <p>{{$store.getters.getGoodsNumber}}</p>
      <p>{{$store.getters.getGoodsSelected}}</p>
      <p>{{$store.getters.getSelectedGoodsInfo}}</p>
    </div>
       
</template>
<script >
import numbox from "../comment/cartbox.vue";
import { Toast } from 'vant';
export default{
       data(){
            return{
                //默认显示
                // flag:true,
                goodsList:[]
                
            }
       },
       created(){
        //    初始化购物车商品数据
        this.getGoodsList();
       },
       methods:{
           getGoodsList(){
               var ids =this.$store.getters.getGoodsIds;
               if(ids==""){
                   return;
               }
            //    console.log(this.$store.getters.getGoodsIds);
               this.$http.get('api/getshopcarlist/'+ids).then(function(res){
                //    console.log(res);
                   if(res.body.status==0){
                       this.goodsList=res.body.message;
                       //调用mutations中的方法,把数量同步到本地存储
                       

                   }

               });
               
           },
           //购物车商品的开关切换事件
           changeselected(id,selected){
            //    console.log(id);
            //    console.log(selected);
               //调用mutations中的方法,修改商品的选中状态
            this.$store.commit('changeSelected',{id:id,selected:selected});
           },
           //删除购物车的商品
           delCartGoods(id,index){
               //重新渲染数据,删除goolist的商品.
               this.goodsList.splice(index,1);
               this.$store.commit('del',id);

            //重新渲染数据
            this.getGoodsList();
             Toast('删除成功');
           },

       },
       
       components:{
           numbox
       }
    };
</script>

<style lang='scss' spoced>
// 装相关loader器npm i sass-loader node-sass  -D ，sass-loader依赖于node-sass，所以也需要安装
// style只能默认的写css样式,如果要设置对应的css扩展如scss扩展或是less,需要给style便签设置为lang='scss'
// 如果需要支持scss这个扩展,还需要在wepack.config.js中配置参数
.box{
    .haha{
        display: flex;
        img{
            // border: 1px solid #ccc;
            width: 16%;
            height: 16%;
           
        }
        .title{
            font-size: 13px;
        }
        .info{
            display: flex;
            flex-direction: row;
            justify-content:space-between; 
            .price{
                color: #f00;
                font-weight: bold;
               
            }
            .del{
            margin-left: 4px;
             
            
               
            }
        }
    }
     .jiesuan{
      display: flex;
      justify-content: space-between;
      align-items: center;

      .info {
        display:flex;
        flex-direction: column;
       
        .number{
          color:red;
          font-weight: bold;
        }
        .price{
          color:red;
          font-weight: bold;
        }
      }
    }
}

</style>    