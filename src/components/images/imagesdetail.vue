<template>

    <div class="detail">
        <div class="header">
            <h3>{{getImagesInfo.title}}</h3>
            <p class="text">
                <span>发表时间:{{getImagesInfo.add_time|DateFormat}}</span><span class="click">点击:{{getImagesInfo.click}}次</span>    
            </p>
            <hr>
            <div class="content" v-html="getImagesInfo.content"></div>
             <vue-preview :slides="imagesDetail" ></vue-preview>
            <!-- <div class="images-box">
                <li class="image">
                    <img src="http://phvbk3pna.bkt.clouddn.com/xiandaijieyue.jpg" alt="">
                </li>
            </div> -->
        </div>
        <!-- 引入评论子组件 -->
        <comment :id='id'></comment>
    </div>
       
</template>
<script >
//引入评论的子组件
import comment from '../comment/comment.vue';
    export default{
       data(){
            return{
            //接受传送过来的图片的id
            id:this.$route.params.id,
            getImagesInfo:{},
            imagesDetail:[]
            }
       },
       created(){
          
            this.getImgInfo();
            //加载图片的缩略图
            this.getImagesDetail();
           //初始化页面详情数据
       },
       methods:{
             getImgInfo(){
            //获取当前文章id的详情
                this.$http.get('api/getimageInfo/'+this.id).then(function(res){
                    console.log(res);
                    if(res.body.status == 0){
                        this.getImagesInfo = res.body.message[0];
                     }
                });
             
           },
           getImagesDetail(){
            //获取当前图片中的缩略图
            this.$http.get('api/getthumbimages/'+this.id).then(function(res){
                console.log(res);
                if(res.body.status==0){
                    //由于vue_preview插件,需要每个图片设置需要每个图片设置msrc和w和h属性，否则图片出不来
                    //循环数组res.body.message，给每个对象加上三个属性
                    // this.imagesDetail=res.body.message[0];
                    //遍历图片
                    res.body.message.forEach(ele=>{
                       console.log(ele);
                        ele.msrc=ele.src;
                        ele.w = 600;
                         ele.h = 400; 
                    });
                 this.imagesDetail = res.body.message
                }
            });
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
.detail{
    padding: 0;
    margin: 0;
    list-style: none;
    padding:0 10px;
    .header{
        h3{
            color:#25a0fe;
            font-size: 16px;
            text-align: center;
            padding: 10px 0 6px 0;
        }
        .text{
            font-size: 12px;
            color: #888;
            .click{
                float: right;
            }
        }
        .images-box{
            img{
                width: 100%;
            }
        }
        .content{
            font-size: 14px;
            text-indent:2em;
            color: #888;
        }
    }
}
</style>    