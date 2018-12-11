<template>

    <div>
        <comment :id="id"></comment>
        
    </div>
       
</template>
<script >
//引入公共的评论的子组件
import comment from '../comment/comment.vue';
    export default{
       data(){
            return{
            id:this.$route.params.id
        }
       },
       components:{
           comment
       }
    };
</script>

<style lang='scss' spoced>
// 装相关loader器npm i sass-loader node-sass  -D ，sass-loader依赖于node-sass，所以也需要安装
// style只能默认的写css样式,如果要设置对应的css扩展如scss扩展或是less,需要给style便签设置为lang='scss'
// 如果需要支持scss这个扩展,还需要在wepack.config.js中配置参数

</style>    