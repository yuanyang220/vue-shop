<template>

   <div>
       <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for='item in getnewslist' :key='item.id'>
					<router-link :to="'/home/newdetail/'+item.id">
                        
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
                            <h4>{{item.title}}</h4>
							<p class='mui-ellipsis'>发布时间:{{item.add_time|DateFormat}}<span>点击{{item.click}}次</span></p>
						</div>
					</router-link>
				</li>
			</ul>
   </div>
       
</template>
<script >
    export default{
        data(){
            return{
                getnewslist:[]
            }
        },
       created(){
           this.getnewsList();
       },
       methods:{
           getnewsList(){
               this.$http.get('api/getnewslist').then(function(res){
                   console.log(res);
                   if(res.body.status==0){
                       this.getnewslist=res.body.message;
                   }   
               })
           }
       }
    }
</script>

<style lang='scss' spoced>
// 装相关loader器npm i sass-loader node-sass  -D ，sass-loader依赖于node-sass，所以也需要安装
// style只能默认的写css样式,如果要设置对应的css扩展如scss扩展或是less,需要给style便签设置为lang='scss'
// 如果需要支持scss这个扩展,还需要在wepack.config.js中配置参数
    .mui-ellipsis{
        color:#26a2ff;
        font-size: 12px;
        span{
            float:right;
        }
    }
</style>    