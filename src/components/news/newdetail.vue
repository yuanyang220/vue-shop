<template>
    <div class='new-content'>
        <h2 class="title">{{newdetail.title}}</h2>
        <p class="color">
            <span>发表时间:{{newdetail.add_time |DateFormat}}</span>
             <span class="click">点击人数{{newdetail.click}}次</span>
        </p>
        <hr/>
        <div v-html='newdetail.content'> </div>

        <!-- 这里是评论区的部分 -->
         <!-- 评论区域 引入公共的评论的子组件 -->
        <!-- 父给子传值传值：属性绑定机制 -->
         <comment :id="id"></comment>
        <!-- <h4>发表评论</h4>
        <textarea placeholder="请输入要BB的内容(最多吐槽120字)" ></textarea>
        <mt-button type="primary" size="large" class="content">发表评论</mt-button>
        <div class='huise'>第一楼用户:11111111111111111111111111111111</div>
        <div>dededdedeedededdddededdeded</div>
        <div class='huise'>第二楼用户:11111111111111111111111111111111</div>
        <div>dededdedeedededdddededdeded</div>
         <div class='huise'>第二楼用户:11111111111111111111111111111111</div>
        <div>dededdedeedededdddededdeded</div> -->
    </div> 
</template>
<script >
 //引入评论的子组件
import comment from '../comment/comment.vue'
export default{
    data(){
        return{
            //把当前文章的id进行保存起来
            //注意:在模板中获取参数,不要this,再script中回去要加this
            id:this.$route.params.id,
            newdetail:{}
        }
    },
        created(){
            this.getnewdetail();
        },
        methods:{
            getnewdetail(){
                this.$http.get('api/getnew/'+this.id).then(function(res){
                    console.log(res.body.message[0]);
                      if(res.body.status==0){
                          this.newdetail=res.body.message[0]; 
                      }
                });
            }

        },
        //注册组件
        components:{
             comment
        }        
        
}
</script>

<style lang='scss' spoced>
// 装相关loader器npm i sass-loader node-sass  -D ，sass-loader依赖于node-sass，所以也需要安装
// style只能默认的写css样式,如果要设置对应的css扩展如scss扩展或是less,需要给style便签设置为lang='scss'
// 如果需要支持scss这个扩展,还需要在wepack.config.js中配置参数
.new-content{
    padding: 0 10px;
    //padding-bottom:50px;
    .title{
        font-size: 16px;
        color: red;
        padding-top: 20px;
        padding-bottom: 10px
        
        }
    .color{
            color:#25a0fe; 
            .click{
                float: right;
            }
    }
    h4{
        margin-bottom:10px;
    }
    .content{
        padding:0;
        margin-bottom: 0;
    }
    .huise{
        background-color:#ccc;
        margin-top: 5px;
    }
}
</style>    