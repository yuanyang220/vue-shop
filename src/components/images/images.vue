<template>

    <div>
        <van-tabs v-model="active"  color='#26a2ff'  @click="getImages">
              <!-- <van-tab title="全部"></van-tab> -->
            <van-tab v-for="item in cats"  :key='item.id' :title="item.title"></van-tab>
          
        </van-tabs>
        <!-- 图片 -->
        <div class="imageslist">
            <router-link :to="'/home/imagesdetail/'+item.id"  class="item" v-for="item in images" tag="li" :key='item.id'>
                <img  v-lazy="item.img_url"/>
                <div class="content">
                    <div class="title">{{item.title }}</div >
                    <div class="intro">{{item.zhaiyao }}</div >
                </div>
            </router-link >
        </div>
            
    </div>
       
</template>
<script >
var id = '';
    export default{
        data() {
            return {
                active: 0,
                cats:[],
                images:[]
            };
        },
        created(){
            //分类
            this.getCats();
             //初始化标签页为  全部的图片数据 
            this.getImages(0,'全部');
        },
        methods:{
            getCats(){
                this.$http.get('api/getimgcategory').then(function(res){
                    console.log(res);
                    if(res.body.status==0){
                        this.cats=res.body.message;
                        //给这个数组新增一个id和对应的分类
                        this.cats.unshift({id:0,'title':'全部'});
                    }
                    
                });
            },
            //标签的单击事件
            getImages(index,title){
                //console.log(index);
                //console.log(title);
                // 需要获取分页的分类id,通过下边index进行获取
                //var all =this.cats[index];
               
                // console.log(id);
                //console.log(all);
                
                var id = this.cats.length == 0 ? 0 : this.cats[ index ].id;
                this.$http.get('api/getcatimages/'+id).then(function(res){
                    console.log(res);
                    if(res.body.status==0){
                         this.images=res.body.message;
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
.imageslist{
    padding: 0;
    margin: 0;
    // margin-bottom: 40px;
    padding: 8px 10px 0 10px;
    .item{
        position: relative;
        list-style: none;
       margin-bottom: 8px;
       box-shadow: 0px 0px 5px #aaa;
       background-color: #999;
        img{
            width: 100%;
          
           
        }
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .content{
            
            position: absolute;
            height: 80px;
           
            bottom: 0;
            background-color:rgba(0, 0, 0, 0.4);
            
            
             .title{
                font-size: 14px;
                color: #fff;
                
                
            }
            .intro{
                font-size: 10px;
                color: #fff;
               
            }
        }
       
    }
}
</style>    