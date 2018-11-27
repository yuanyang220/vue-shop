<template>

    <div>
        <van-tabs v-model="active" color='#26a2ff'>
            <van-tab title="标签 1">内容 1</van-tab>
            <van-tab title="标签 2">内容 2</van-tab>
            <van-tab title="标签 3">内容 3</van-tab>
            <van-tab title="标签 4">内容 4</van-tab>
        </van-tabs>
    </div>
       
</template>
<script >
    export default{
        data() {
            return {
                active: 0,
                cats:[]
            };
        },
        created(){
            this.getCats();
        },
        methods:{
            getCats(){
                this.$http.get('api/getimgcategory').then(function(res){
                    console.log(res);
                    if(res.body.status==0){
                        this.cats=res.body.message;
                    }
                    
                });
            }
        }
    };
</script>

<style lang='scss' spoced>
// 装相关loader器npm i sass-loader node-sass  -D ，sass-loader依赖于node-sass，所以也需要安装
// style只能默认的写css样式,如果要设置对应的css扩展如scss扩展或是less,需要给style便签设置为lang='scss'
// 如果需要支持scss这个扩展,还需要在wepack.config.js中配置参数

</style>    