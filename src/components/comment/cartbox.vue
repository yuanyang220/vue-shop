
<template>

    <div>
    <div class="mui-numbox" data-numbox-min='1' >
      <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
      <!-- 获取对应商品id的数量 -->
      <input class="mui-numbox-input" type="number" :value="goods_number" @change="changeNumber" ref="number"/>
      <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>
  </div>
       
</template>
<script >
import mui from '../../lib/mui/js/mui.js';
    export default{
       data(){
            return{
               

        }
       },
       mounted(){
           mui('.mui-numbox').numbox();
       },
        props:['goods_number','id']
        ,
        methods:{
            changeNumber(){
                //获取数字输入框的数据,给input绑定一个ref属性.通过this.$refs
                var number = this.$refs.number.value;
                //商品id
                console.log('数量:'+number,"id:"+this.id);
                this.$store.commit('changeNumber',{id:this.id,number:number});

            }
        }
    };
</script>

<style lang='scss' spoced>
// 装相关loader器npm i sass-loader node-sass  -D ，sass-loader依赖于node-sass，所以也需要安装
// style只能默认的写css样式,如果要设置对应的css扩展如scss扩展或是less,需要给style便签设置为lang='scss'
// 如果需要支持scss这个扩展,还需要在wepack.config.js中配置参数

</style>    