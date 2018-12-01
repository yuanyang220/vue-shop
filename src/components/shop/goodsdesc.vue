<template>

    <div class="content">
        <p class="title">
           {{info.title}}
        </p>
        <hr>
        <dir class="news" v-html="info.content">
           
        </dir>
    </div>
       
</template>
<script >
    export default{
       data(){
            return{
            id:this.$route.params.id,
            info:{}
        }
       },
       created(){
           this.getInfo();
       },
       methods:{
           getInfo(){
               this.$http.get('api/getgoodsdesc/'+this.id).then(function(res){
                   console.log(res);
                   if(res.body.status==0){
                       this.info=res.body.message[0];
                   }
                   
               })
           }
       }
    };
</script>

<style lang='scss' spoced>
// 装相关loader器npm i sass-loader node-sass  -D ，sass-loader依赖于node-sass，所以也需要安装
// style只能默认的写css样式,如果要设置对应的css扩展如scss扩展或是less,需要给style便签设置为lang='scss'
// 如果需要支持scss这个扩展,还需要在wepack.config.js中配置参数
.content{
    padding:12px 8px 0 8px;
    .title{
        color:#25a0fe;
        font-weight: bold;
        font-size: 18px; 
        text-align: center;
    }
    .news{
        padding: 0;
        /deep/ img{
            width: 100%;
        }
    }
}
</style>    